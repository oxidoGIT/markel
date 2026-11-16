import {driveDay,driveInbox} from './lib/drive.mjs';
import {processingBundle} from './lib/reports.mjs';
import { deliveryInbox, latestDeliveries } from './lib/deliveries.mjs';
import { StudyUI } from './lib/study.mjs';
import { PrivateClient, validateConfig } from './lib/client.mjs';
import { sha256, madridDate } from './lib/files.mjs';

const $ = s => document.querySelector(s);
const escape = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const dateLabel = d => new Intl.DateTimeFormat('es-ES', { weekday:'short', day:'numeric', month:'short', timeZone:'Europe/Madrid' }).format(new Date(`${d}T12:00:00Z`));
const views = { today:'Mi día', materials:'Mis materiales', schedule:'Mi horario', study:'Estudiar', family:'Vista familiar' };
let client, state, context, deliveryData, processingData, driveData, busy = false, syncing, currentDate = madridDate(), liveDate = true, driveDraft = {}, driveUpdating = false, driveOperation, toastTimer;
const study = new StudyUI({rpc:(name,body)=>client.rpc(name,body),run,saved:afterSave,notify:toast,getState:()=>state,getRole:()=>context?.role,operation});
const operations = new Map();
const channel = typeof BroadcastChannel === 'function' ? new BroadcastChannel('tutor-private') : null;
function toast(message) { $('#toast').textContent = message; $('#toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').hidden = true, 8000); }
function operation(key) { if (!operations.has(key)) operations.set(key, crypto.randomUUID()); return operations.get(key); }
function clearPrivate() {
  study.clear(); state = null; context = null; deliveryData=null; processingData=null; driveData=null; driveDraft={}; driveUpdating=false; driveOperation=null; currentDate=madridDate(); liveDate=true; operations.clear();
  $('#main').replaceChildren(); $('#profile').replaceChildren();
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
function today() {
  return heading(`Hola, ${state.displayName}`, 'Los apuntes se suben desde Drive. Aquí confirmas que has terminado.')+
    `<div class="toolbar"><label class="date-picker">Consultar día<input id="school-date" type="date" value="${escape(state.date)}" max="${madridDate()}"></label><p class="private-note">Inicio del seguimiento: ${escape(dateLabel(state.startsOn))}.</p></div>`+
    driveDay(driveData,state,context.role,driveDraft,driveUpdating,madridDate());
}
function materials() {
  return heading('Mis materiales', 'Copias privadas de los PDF recogidos de Drive y su estado de procesamiento.') +
    (state.materials.length ? `<div class="material-grid">${[...state.materials].reverse().map(m => `<article class="material-card"><div class="card-heading">${badge(subject(m.subjectId))}<h3>${escape(subject(m.subjectId).name)}</h3></div><p>Recibido ${escape(dateLabel(madridDate(new Date(m.createdAt))))} · ${escape(({queued:'Pendiente de procesar',processing:'En análisis',processed:'Procesado',activities_generated:'Actividades preparadas',needs_review:'Pendiente de revisión',failed:'No se pudo procesar'})[m.state]||'Estado por comprobar')}</p>${m.coveredDates?.length?`<p class="help">Clases de referencia: ${escape(datesLabel(m.coveredDates))}</p>`:""}<p class="material-note">${escape(m.note)}</p><ul class="file-list">${m.files.map(f => `<li><span>${escape(f.name)}<small>${Math.ceil(f.size / 1024)} KB</small></span><button class="text-button" data-action="download" data-material="${escape(m.id)}" data-hash="${f.hash}">Descargar</button></li>`).join('')}</ul></article>`).join('')}</div>` : '<div class="large-empty"><h2>Aquí irán tus apuntes</h2><p>Aparecerán cuando se recojan los PDF de tu entrega de Drive.</p></div>');
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
    driveInbox(driveData,state.subjects) + deliveryInbox(deliveryData,state.subjects,processingData) +
    '<section class="mini-card"><h2>Copia privada completa</h2><p>Incluye registros y archivos. Guárdala en una carpeta privada.</p><button class="button primary" data-action="backup">Descargar copia</button><p class="help">La recuperación se realiza desde la administración, comprobando los archivos antes de restaurar los registros.</p></section>' +
    `<section class="mini-card"><h2>Últimas acciones</h2><ul class="activity-list">${state.logs.slice(-12).reverse().map(l => `<li><span>${({drive_submitted:'Entrega de Drive confirmada',drive_imported:'PDF recogidos de Drive',drive_configured:'Carpetas de Drive preparadas',material_received:'Material recibido',check_confirmed:'Clase confirmada',day_delivered:'Entrega del día enviada',processing_authorized:'Análisis autorizado',report_saved:'Informe guardado',study_published:'Ejercicio publicado'})[l.action]||'Cambio guardado'}</span><time>${escape(new Date(l.at).toLocaleString('es-ES', {timeZone:'Europe/Madrid'}))}</time></li>`).join('')}</ul></section>`;
}
function render() {
  if (!state || !context) return;
  let view = location.hash.slice(1) in views ? location.hash.slice(1) : 'today';
  if (view === 'family' && context.role !== 'admin') view = 'today';
  $('#family-link').hidden = context.role !== 'admin';
  const waiting=latestDeliveries(deliveryData).filter(d=>!d.acknowledged_at).length+(driveData?.submissions||[]).filter(d=>['pending','importing'].includes(d.state)).length;
  $('#family-link').textContent='⌂ Vista familiar'+(waiting?' · '+waiting:'');
  document.querySelectorAll('[data-view]').forEach(l => { l.classList.toggle('active', l.dataset.view === view); if (l.dataset.view === view) l.setAttribute('aria-current','page'); else l.removeAttribute('aria-current'); });
  $('#breadcrumb').textContent = views[view];
  $('#nav-count').textContent = (driveData?.submissions||[]).some(d=>d.school_date===state.date)?'✓':'';
  $('#profile').textContent = context.role === 'admin' ? 'Cuenta familiar' : state.displayName;
  if (!(view==='study' && study.editing && $('#main [data-study-answer]')) && !(view==='today' && $('#drive-form')?.contains(document.activeElement))) $('#main').innerHTML = view==='study' ? study.render() : ({today,materials,schedule,family})[view]();
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
      if(liveDate)currentDate=madridDate();
      const requestedDate = currentDate;
      const next = await client.rpc('tm_load', { p_student: context.studentId, p_date: requestedDate });
      const [studyData, history, nextDelivery, nextProcessing, nextDrive] = await Promise.all([client.rpc('tm_study_load', {p_student:context.studentId}),client.rpc('tm_study_history', {p_student:context.studentId}),client.rpc('tm_delivery_load',{p_student:context.studentId,p_date:requestedDate}),context.role==='admin'?client.rpc('tm_processing_load',{p_student:context.studentId}):Promise.resolve(null),client.rpc('tm_drive_load',{p_student:context.studentId})]);
      studyData.history=history;
      state = next; driveData=nextDrive; study.data=studyData; deliveryData=nextDelivery; processingData=nextProcessing; context.role = next.role; render();
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
  const b=e.target.closest('[data-action]');if(!b||!state)return;
  if(b.dataset.action==='new-drive'){if(!busy){driveUpdating=true;driveDraft={};driveOperation=null;render();}return;}
  run(async()=>{
    if(b.dataset.action==='processing-export'&&context.role==='admin'){
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
    } else if (b.dataset.action === 'download') {
      const f = state.materials.find(m => m.id === b.dataset.material)?.files.find(f => f.hash === b.dataset.hash);
      if (!f) throw new Error('No se encuentra el archivo.');
      const blob = await client.download(f.path);
      if (await sha256(await blob.arrayBuffer()) !== f.hash) throw new Error('El archivo no supera la comprobación de integridad.');
      download(blob, f.name);
    } else if (b.dataset.action === 'backup' && context.role === 'admin') await backup();
  });
});
function rememberDrive(form){driveDraft={confirmed:form.elements.confirmed.checked,note:form.elements.note.value,missing:[...form.querySelectorAll('[name="missing"]:checked')].map(x=>x.value)};}
document.addEventListener('input',e=>{const form=e.target.closest('#drive-form');if(form)rememberDrive(form);});
document.addEventListener('submit',e=>{
 const form=e.target.closest('#drive-form');if(!form)return;e.preventDefault();rememberDrive(form);
 run(async()=>{if(context.role!=='student')return;const payload={p_student:state.studentId,p_missing:driveDraft.missing,p_note:driveDraft.note,p_confirmed:driveDraft.confirmed};
  const signature=JSON.stringify([madridDate(),payload]);if(driveOperation?.signature!==signature)driveOperation={signature,id:crypto.randomUUID()};
  const controls=[...form.querySelectorAll('button,input,textarea')];controls.forEach(x=>x.disabled=true);
  try{await client.rpc('tm_drive_submit',{...payload,p_operation:driveOperation.id});driveDraft={};driveUpdating=false;driveOperation=null;document.activeElement?.blur();await afterSave();toast('Confirmado. Tu familia recibirá el aviso para pedir el procesamiento.');}finally{controls.forEach(x=>x.disabled=false);}
 });
});
document.addEventListener('change',e=>{if(e.target.id==='school-date')run(async()=>{const previous=currentDate,wasLive=liveDate;currentDate=e.target.value;liveDate=currentDate===madridDate();try{await refresh();}catch(error){currentDate=previous;liveDate=wasLive;render();throw error;}});});
$('#refresh').onclick=()=>run(refresh);
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
window.addEventListener('beforeunload', e => { if (study.editing || document.querySelector('#study-dialog[open]') || (driveDraft.note||driveDraft.confirmed||driveDraft.missing?.length)) { e.preventDefault(); e.returnValue = ''; } });
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
