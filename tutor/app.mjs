import {subjectGroups, checkVersions} from './lib/subjects.mjs';
import {processingBundle} from './lib/reports.mjs';
import { deliveryPanel, deliveryInbox, latestDeliveries } from './lib/deliveries.mjs';
import { StudyUI } from './lib/study.mjs';
import { PrivateClient, validateConfig } from './lib/client.mjs';
import { prepareFiles, sha256, madridDate } from './lib/files.mjs';

const $ = s => document.querySelector(s);
const escape = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const dateLabel = d => new Intl.DateTimeFormat('es-ES', { weekday:'short', day:'numeric', month:'short', timeZone:'Europe/Madrid' }).format(new Date(`${d}T12:00:00Z`));
const labels = { pending:'Por confirmar', confirmed_no_additional:'Nada más · confirmado', class_cancelled:'No hubo clase', material_pending:'Falta material', new_content_received:'Novedades guardadas' };
const views = { today:'Mi día', materials:'Mis materiales', schedule:'Mi horario', study:'Estudiar', family:'Vista familiar' };
let client, state, context, deliveryData, processingData, busy = false, syncing, currentDate = madridDate(), files = [], draft, toastTimer;
const study = new StudyUI({rpc:(name,body)=>client.rpc(name,body),run,saved:afterSave,notify:toast,getState:()=>state,getRole:()=>context?.role,operation});
const operations = new Map();
const channel = typeof BroadcastChannel === 'function' ? new BroadcastChannel('tutor-private') : null;
function toast(message) { $('#toast').textContent = message; $('#toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').hidden = true, 8000); }
function operation(key) { if (!operations.has(key)) operations.set(key, crypto.randomUUID()); return operations.get(key); }
function clearPrivate() {
  study.clear(); state = null; context = null; deliveryData=null; processingData=null; files = []; draft = null; operations.clear();
  $('#content-dialog').close(); $('#content-form').reset(); $('#selected-files').replaceChildren();
  $('#main').replaceChildren(); $('#profile').replaceChildren(); $('#form-error').textContent = '';
  $('#dialog-title').textContent = 'Añadir material'; $('#dialog-subtitle').textContent = '';
  $('#workspace').hidden = true; $('#access').hidden = false; $('#password').value = '';
}
function showLogin(message = '') {
  clearPrivate(); $('#access-error').textContent = message;
  $('#access-description').textContent = 'Entra con tu cuenta autorizada.';
  $('#login-form').hidden = false;
}
const subject = id => state.subjects.find(s => s.id === id);
const tracked = c => subject(c.subjectId)?.trackingEnabled !== false;
function heading(title, text) { return `<div class="page-heading"><div><div class="eyebrow">TU ESPACIO PRIVADO</div><h1>${escape(title)}</h1><p class="muted">${escape(text)}</p></div></div>`; }
const subjectColor = s => ['blue','green','orange','purple','pink'].includes(s?.color) ? s.color : 'green';
function badge(s) { return `<span class="subject-icon ${subjectColor(s)}">${escape(s.short)}</span>`; }
const datesLabel = checks => [...new Set(checks.map(c=>c.date))].map(dateLabel).join(' · ');
function card(g) {
  const s=subject(g.subjectId),editable=state.date===madridDate()&&state.date>=state.startsOn&&state.date<=state.endsOn;
  const done=!g.waiting.length, id=escape(g.subjectId);
  return `<article class="class-card ${done?'is-done':''}"><div class="card-heading">${badge(s)}<div class="subject-title"><h3>${escape(s.name)}</h3><span>${g.waiting.length?'Clases por revisar: '+escape(datesLabel(g.waiting)):'Última clase: '+escape(dateLabel(g.last.date))}</span></div><span class="status">${labels[g.status]}</span></div>
  ${g.waiting.length>1?'<p class="help">Sube juntos los apuntes acumulados de esta asignatura. No hace falta repartirlos por días.</p>':''}
  ${g.checks.some(c=>c.sessions.some(t=>t.alternationGroup))?'<p class="help">Incluye una franja alterna: revisa si hay novedades de esta asignatura.</p>':''}
  ${editable&&g.checks.length?`<div class="card-actions"><button class="button primary" data-action="content" data-id="${id}">${done?'＋ Añadir material':'＋ Subir material'}</button>${g.canConfirm?`<button class="button secondary" data-action="confirm" data-id="${id}" data-state="confirmed_no_additional">Nada nuevo en estas fechas</button><button class="text-button" data-action="confirm" data-id="${id}" data-state="class_cancelled">No hubo clase en estas fechas</button>`:''}</div>`:''}</article>`;
}
function today() {
  const groups=subjectGroups(state),waiting=groups.filter(g=>g.waiting.length),done=groups.filter(g=>!g.waiting.length);
  return heading(`Hola, ${state.displayName}`, 'Una subida por asignatura, con todos los apuntes que tengas pendientes.') +
    `<div class="toolbar"><label class="date-picker">Consultar día<input id="school-date" type="date" value="${escape(state.date)}" max="${madridDate()}"></label><p class="private-note">Inicio del seguimiento: ${escape(dateLabel(state.startsOn))}. ${state.date<state.startsOn?'Todavía no hay clases que confirmar.':state.date!==madridDate()?'Consulta del historial. Para subir material, vuelve a la fecha de hoy.':''}</p></div>` +
    `<section class="day-banner"><div><span class="banner-label">TU ENTREGA</span><h2>Todo junto por asignatura</h2><p>Pueden ser apuntes de hoy o de varios días. Al terminar, envía una sola entrega con todo.</p></div></section>` +
    (waiting.length?`<section><h2>Asignaturas por revisar</h2>${waiting.map(card).join('')}</section>`:'') +
    (done.length?`<section><h2>Asignaturas revisadas</h2>${done.map(card).join('')}</section>`:'') +
    (!groups.length?'<div class="empty-card">No hay comprobaciones para esta fecha.</div>':'') +
    deliveryPanel(deliveryData,context.role,state.startsOn);
}
function materials() {
  return heading('Mis materiales', 'Los apuntes recibidos quedan separados de su procesamiento.') +
    (state.materials.length ? `<div class="material-grid">${[...state.materials].reverse().map(m => `<article class="material-card"><div class="card-heading">${badge(subject(m.subjectId))}<h3>${escape(subject(m.subjectId).name)}</h3></div><p>Recibido ${escape(dateLabel(madridDate(new Date(m.createdAt))))} · ${m.state === 'queued' ? 'Pendiente de procesar' : escape(m.state)}</p><p class="help">Clases de referencia: ${escape(datesLabel(m.coveredDates?.length?m.coveredDates:[{date:m.date}]))}</p><p class="material-note">${escape(m.note)}</p><ul class="file-list">${m.files.map(f => `<li><span>${escape(f.name)}<small>${Math.ceil(f.size / 1024)} KB</small></span><button class="text-button" data-action="download" data-material="${escape(m.id)}" data-hash="${f.hash}">Descargar</button></li>`).join('')}</ul></article>`).join('')}</div>` : '<div class="large-empty"><h2>Aquí irán tus apuntes</h2><p>Puedes añadir notas y archivos desde «Mi día».</p></div>');
}
function schedule() {
  const times = [...new Set(state.schedule.map(s => `${s.start}–${s.end}`))].sort();
  return heading('Mi horario', 'Las clases repetidas de una asignatura se revisan una sola vez por día.') +
    `<div class="table-container"><table><caption>Horario semanal · Europe/Madrid</caption><thead><tr><th>Hora</th>${['Lunes','Martes','Miércoles','Jueves','Viernes'].map(d => `<th>${d}</th>`).join('')}</tr></thead><tbody>${times.map(t => `<tr><th>${t}</th>${[1,2,3,4,5].map(d => `<td>${state.schedule.filter(s => s.weekday === d && `${s.start}–${s.end}` === t).map(s => `<span class="schedule-subject ${subjectColor(subject(s.subjectId))}">${escape(subject(s.subjectId).name)}${subject(s.subjectId).trackingEnabled === false ? ' · Sin seguimiento' : ''}${s.alternationGroup ? ' · Alterna' : ''}</span>`).join('') || '<span class="muted">---</span>'}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` +
    `<section class="mini-card"><h2>Calendario</h2><ul>${state.holidays.map(h => `<li>${escape(dateLabel(h.date))} · ${escape(h.label)}</li>`).join('')}</ul></section>`;
}
function family() {
  if (context.role !== 'admin') return heading('Acceso restringido', 'Esta vista corresponde a la cuenta familiar.');
  return heading('Vista familiar', 'Seguimiento privado de clases y materiales.') +
    `<div class="stats-grid"><div class="stat"><span>Clases confirmadas</span><strong>${state.checks.filter(c => tracked(c) && c.state !== 'pending').length}</strong></div><div class="stat"><span>Materiales recibidos</span><strong>${state.materials.length}</strong></div><div class="stat"><span>Pendientes de procesar</span><strong>${state.materials.filter(m => m.state === 'queued').length}</strong></div></div>` +
    deliveryInbox(deliveryData,state.subjects,processingData) +
    '<section class="mini-card"><h2>Copia privada completa</h2><p>Incluye registros y archivos. Guárdala en una carpeta privada.</p><button class="button primary" data-action="backup">Descargar copia</button><p class="help">La recuperación se realiza desde la administración, comprobando los archivos antes de restaurar los registros.</p></section>' +
    `<section class="mini-card"><h2>Últimas acciones</h2><ul class="activity-list">${state.logs.slice(-12).reverse().map(l => `<li><span>${({material_received:'Material recibido',check_confirmed:'Clase confirmada',day_delivered:'Entrega del día enviada',processing_authorized:'Análisis autorizado',report_saved:'Informe guardado',study_published:'Ejercicio publicado'})[l.action]||'Cambio guardado'}</span><time>${escape(new Date(l.at).toLocaleString('es-ES', {timeZone:'Europe/Madrid'}))}</time></li>`).join('')}</ul></section>`;
}
function render() {
  if (!state || !context) return;
  let view = location.hash.slice(1) in views ? location.hash.slice(1) : 'today';
  if (view === 'family' && context.role !== 'admin') view = 'today';
  $('#family-link').hidden = context.role !== 'admin';
  const waiting=latestDeliveries(deliveryData).filter(d=>!d.acknowledged_at).length;
  $('#family-link').textContent='⌂ Vista familiar'+(waiting?' · '+waiting:'');
  document.querySelectorAll('[data-view]').forEach(l => { l.classList.toggle('active', l.dataset.view === view); if (l.dataset.view === view) l.setAttribute('aria-current','page'); else l.removeAttribute('aria-current'); });
  $('#breadcrumb').textContent = views[view];
  $('#nav-count').textContent = subjectGroups(state).filter(g=>g.waiting.length).length || '✓';
  $('#profile').textContent = context.role === 'admin' ? 'Cuenta familiar' : state.displayName;
  if (!(view==='study' && study.editing && $('#main [data-study-answer]'))) $('#main').innerHTML = view==='study' ? study.render() : ({today,materials,schedule,family})[view]();
  $('#access').hidden = true; $('#workspace').hidden = false;
}
async function refresh() {
  if (!client?.session) return;
  if (syncing) return syncing;
  syncing = (async () => {
    $('#sync-state').textContent = 'Actualizando…';
    try {
      if (!context) {
        const contexts = await client.rpc('tm_context');
        if (contexts.length !== 1) throw new Error('Esta cuenta todavía no tiene un espacio asignado.');
        context = contexts[0];
      }
      const requestedDate = currentDate;
      const next = await client.rpc('tm_load', { p_student: context.studentId, p_date: requestedDate });
      const [studyData, history, nextDelivery, nextProcessing] = await Promise.all([client.rpc('tm_study_load', {p_student:context.studentId}),client.rpc('tm_study_history', {p_student:context.studentId}),client.rpc('tm_delivery_load',{p_student:context.studentId,p_date:requestedDate}),context.role==='admin'?client.rpc('tm_processing_load',{p_student:context.studentId}):Promise.resolve(null)]);
      studyData.history=history;
      state = next; study.data=studyData; deliveryData=nextDelivery; processingData=nextProcessing; context.role = next.role; render();
      $('#sync-state').textContent = `Actualizado ${new Date().toLocaleTimeString('es-ES', {hour:'2-digit',minute:'2-digit'})}`;
    } catch (error) {
      if (!state || error.status === 403 || error.code === '42501') { client.clear(); showLogin(error.message); }
      else $('#sync-state').textContent = 'No se pudo actualizar';
      throw error;
    } finally { syncing = null; }
  })();
  return syncing;
}
async function run(fn) {
  if (busy) return;
  busy = true; document.body.classList.add('saving');
  try {
    // Complete a read already in flight before writing from the visible version.
    if (syncing) await syncing.catch(() => {});
    if (client?.session && state) await fn();
  } catch (e) { toast(e.message); }
  finally { busy = false; document.body.classList.remove('saving'); }
}
async function afterSave() {
  channel?.postMessage({kind:'changed', user:client.session?.user?.id});
  try { await refresh(); toast('Guardado y actualizado.'); }
  catch { toast('El servidor ha guardado el cambio. Falta actualizar la pantalla; pulsa «Actualizar».'); }
}
function fileList() {
  $('#selected-files').innerHTML = files.map((f,i) => `<li><span>${escape(f.name)}</span><button type="button" class="text-button" data-remove="${i}">Quitar</button></li>`).join('');
}
function openContent(id) {
  const group=subjectGroups(state).find(g=>g.subjectId===id);
  if(!group?.checks.length||state.date!==madridDate())return;
  draft = {subjectId:id,checks:checkVersions(group),date:state.date,studentId:state.studentId};
  $('#refresh-draft').hidden = true;
  files = []; $('#content-form').reset(); fileList(); $('#form-error').textContent = '';
  $('#dialog-title').textContent = subject(id).name;
  $('#dialog-subtitle').textContent = `Una subida con todos los apuntes acumulados. Clases de referencia: ${datesLabel(group.checks)}.`;
  $('#content-dialog').showModal(); $('#note').focus();
}
function download(blob, name) {
  const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
async function backup() {
  const snapshot = await client.rpc('tm_backup', { p_student:state.studentId });
  let total = 0; const contents = [];
  for (const f of snapshot.files) {
    total += f.size;
    if (total > 28 * 1024 * 1024) throw new Error('La copia supera el tamaño de descarga en el navegador. Utiliza la copia administrativa.');
    const blob = await client.download(f.path), bytes = new Uint8Array(await blob.arrayBuffer());
    if (bytes.length !== f.size || await sha256(bytes) !== f.hash) throw new Error('Un archivo no supera la comprobación de integridad.');
    let binary = ''; for (let i=0;i<bytes.length;i+=8192) binary += String.fromCharCode(...bytes.subarray(i,i+8192));
    contents.push({...f,data:btoa(binary)});
  }
  download(new Blob([JSON.stringify({...snapshot,files:contents})], {type:'application/json'}), `copia-privada-${madridDate()}.json`);
  toast('Copia preparada con registros y archivos verificados. Comprueba la descarga.');
}
document.addEventListener('input', e => { const form=e.target.closest('[data-study-answer]');if(form)study.remember(form); });
document.addEventListener('submit', e => { const form=e.target.closest('[data-study-answer]');if(form){e.preventDefault();run(()=>study.respond(form));} });
document.addEventListener('click', e => {
  const studyButton=e.target.closest('[data-study]'); if(studyButton && state && !busy){study.action(studyButton);return;}
  const remove = e.target.closest('[data-remove]');
  if (remove && !busy) { files.splice(Number(remove.dataset.remove),1); fileList(); return; }
  const b = e.target.closest('[data-action]'); if (!b || !state) return;
  if (b.dataset.action === 'content') { if (!busy) openContent(b.dataset.id); return; }
  run(async () => {
    if (b.dataset.action === 'close-day') {
      if(context.role!=='student'||!deliveryData?.available) return;
      try {
        const payload={p_student:state.studentId,p_date:state.date,p_fingerprint:deliveryData.fingerprint};
        await client.rpc('tm_delivery_close',{...payload,p_operation:operation(JSON.stringify(payload))});
        await afterSave();toast('Entrega enviada a tu vista familiar.');
      } catch(error) {if(error.code==='TM409'){await refresh();toast('La entrega ha cambiado en otro dispositivo. Revisa el resumen actualizado y vuelve a enviar.');}else throw error;}
    } else if(b.dataset.action==='processing-export'&&context.role==='admin'){
      const bundle=await client.rpc('tm_processing_claim',{p_student:state.studentId,p_delivery:b.dataset.id,p_worker:operation('processing:'+b.dataset.id)});
      const complete=await processingBundle(bundle,path=>client.download(path));
      download(new Blob([JSON.stringify(complete)],{type:'application/json'}),'entrega-privada-'+b.dataset.id+'.json');
      await afterSave();toast('Entrega preparada. Los documentos están verificados; el análisis se realiza por tu orden en este chat.');
    } else if(b.dataset.action==='acknowledge-delivery'&&context.role==='admin') {
      await client.rpc('tm_delivery_acknowledge',{p_student:state.studentId,p_delivery:b.dataset.id});await afterSave();
    } else if(b.dataset.action==='delivery-download'&&context.role==='admin') {
      const f=deliveryData?.deliveries.find(d=>d.id===b.dataset.delivery)?.snapshot.materials.find(m=>m.id===b.dataset.material)?.files.find(f=>f.hash===b.dataset.hash);
      if(!f)throw new Error('No se encuentra el archivo de la entrega.');
      const blob=await client.download(f.path);
      if(blob.size!==f.size||await sha256(await blob.arrayBuffer())!==f.hash)throw new Error('El archivo no supera la comprobación de integridad.');
      download(blob,f.name);
    } else if (b.dataset.action === 'confirm') {
      const g=subjectGroups(state).find(g=>g.subjectId===b.dataset.id);
      if(!g?.canConfirm||state.date!==madridDate())return;
      const payload={p_student:state.studentId,p_date:state.date,p_subject:g.subjectId,p_checks:checkVersions(g),p_state:b.dataset.state};
      try {await client.rpc('tm_subject_confirm',{...payload,p_operation:operation(JSON.stringify(payload))});}
      catch(error){if(error.code==='TM409'){await refresh();toast('La asignatura ha cambiado en otro dispositivo. Revisa las fechas actualizadas antes de confirmar.');return;}throw error;}
      await afterSave();
    } else if (b.dataset.action === 'download') {
      const f = state.materials.find(m => m.id === b.dataset.material)?.files.find(f => f.hash === b.dataset.hash);
      if (!f) throw new Error('No se encuentra el archivo.');
      const blob = await client.download(f.path);
      if (await sha256(await blob.arrayBuffer()) !== f.hash) throw new Error('El archivo no supera la comprobación de integridad.');
      download(blob, f.name);
    } else if (b.dataset.action === 'backup' && context.role === 'admin') await backup();
  });
});
$('#content-form').addEventListener('submit', e => {
  e.preventDefault(); run(async () => {
    $('#save-content').disabled = true; $('#form-error').textContent = '';
    try {
      const prepared = await prepareFiles(files), uploaded = [];
      if (!$('#note').value.trim() && !prepared.length && !$('#later').checked) throw new Error('Añade una nota, un archivo o indica que lo traerás después.');
      for (const file of prepared) {
        $('#form-error').textContent = `Subiendo ${file.name}…`;
        uploaded.push(await client.upload(draft.studentId,file));
      }
      const payload = {p_student:draft.studentId,p_date:draft.date,p_subject:draft.subjectId,p_checks:draft.checks,p_note:$('#note').value,p_files:uploaded,p_later:$('#later').checked};
      await client.rpc('tm_subject_receive', {...payload,p_operation:operation(JSON.stringify(payload))});
      $('#content-dialog').close(); $('#content-form').reset(); files = []; draft = null; fileList(); await afterSave();
    } catch (error) {
      $('#form-error').textContent = error.message;
      if (error.code === 'TM409') {
        $('#form-error').textContent += ' Pulsa «Actualizar»; después podrás revisar la asignatura y reenviar el borrador.';
        draft.conflict = true;
        $('#refresh-draft').hidden = false;
      }
    } finally { $('#save-content').disabled = false; }
  });
});
document.addEventListener('change', e => {
  if (['attachments','camera'].includes(e.target.id) && !busy) { files.push(...e.target.files); fileList(); e.target.value = ''; }
  if (e.target.id === 'school-date') run(async () => {
    const previous = currentDate; currentDate = e.target.value;
    try { await refresh(); } catch (error) { currentDate = previous; render(); throw error; }
  });
});
for (const id of ['cancel-dialog','close-dialog']) $(`#${id}`).onclick = () => { if (!busy) { $('#content-dialog').close(); $('#content-form').reset(); files = []; draft = null; fileList(); } };
$('#content-dialog').addEventListener('cancel', e => { if (busy) e.preventDefault(); });
async function refreshDraft() {
  await refresh();
  if (draft?.conflict) {
    const g=subjectGroups(state).find(g=>g.subjectId===draft.subjectId);
    if(g?.checks.length&&draft.date===state.date&&state.date===madridDate()) {
      draft.checks=checkVersions(g);draft.conflict=false;
      $('#dialog-subtitle').textContent=`Una subida con todos los apuntes acumulados. Clases de referencia: ${datesLabel(g.checks)}.`;
      $('#refresh-draft').hidden=true;
      $('#form-error').textContent='Asignatura actualizada. Revisa las fechas y el borrador antes de guardar.';
    } else $('#form-error').textContent='Este conjunto ya está cerrado o ha cambiado el día. El borrador sigue aquí para que puedas copiarlo.';
  }
}
$('#refresh').onclick = () => run(refreshDraft);
$('#refresh-draft').onclick = () => run(refreshDraft);
$('#signout').onclick = async () => {
  const user = client.session?.user?.id; clearPrivate();
  const out = client.signOut(); showLogin(); channel?.postMessage({kind:'signout',user}); await out;
};
$('#login-form').addEventListener('submit', async e => {
  e.preventDefault(); $('#login-button').disabled = true; $('#access-error').textContent = '';
  try { await client.signIn($('#email').value.trim(),$('#password').value); $('#password').value = ''; await refresh(); }
  catch (error) { $('#access-error').textContent = error.message; }
  finally { $('#login-button').disabled = false; }
});
function connection() { $('#connection-warning').hidden = navigator.onLine; }
function backgroundRefresh() { if (!document.hidden && !busy && client?.session) refresh().catch(() => {}); }
window.addEventListener('online', () => { connection(); backgroundRefresh(); });
window.addEventListener('offline', connection);
window.addEventListener('focus', backgroundRefresh);
document.addEventListener('visibilitychange', backgroundRefresh);
window.addEventListener('pageshow', backgroundRefresh);
window.addEventListener('hashchange', () => {study.editing=false;render();});
channel && (channel.onmessage = e => {
  if (!client?.session || e.data.user !== client.session.user?.id) return;
  if (e.data.kind === 'signout') { client.clear(); showLogin(); }
  else backgroundRefresh();
});
window.addEventListener('beforeunload', e => { if (study.editing || document.querySelector('#study-dialog[open]') || (draft && ($('#note').value || files.length || $('#later').checked))) { e.preventDefault(); e.returnValue = ''; } });
setInterval(backgroundRefresh, 20000);
connection();
try {
  const config = validateConfig(await (await fetch('./config.json', {cache:'no-store'})).json());
  client = new PrivateClient(config, {onExpired:() => showLogin('La sesión ha caducado. Vuelve a entrar.')});
  showLogin(); if (client.session) await refresh();
} catch (error) {
  $('#access-description').textContent = 'Este espacio todavía no está disponible.';
  $('#access-error').textContent = error.message;
}
