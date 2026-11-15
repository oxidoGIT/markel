const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const date=d=>new Intl.DateTimeFormat('es-ES',{day:'numeric',month:'long',timeZone:'Europe/Madrid'}).format(new Date(d+'T12:00:00Z'));
const states={pending:'Por confirmar',material_pending:'Falta material',new_content_received:'Novedades guardadas',confirmed_no_additional:'Nada más',class_cancelled:'No hubo clase'};
export function deliveryPanel(data,role,startsOn){
  if(!data)return '';
  if(role==='admin')return '';
  if(!data.available)return `<section class="mini-card"><h2>Entrega del día</h2><p>El envío diario estará disponible desde el ${esc(date(startsOn))}, al empezar el seguimiento.</p></section>`;
  const p=data.preview,empty=!p.materials&&!p.pendingChecks&&!p.awaitingMaterial;
  // Confirmations with no new material are still a valid daily handoff.
  const canClose=(!empty||data.canClose)&&!data.currentIsSent;
  return `<section class="mini-card delivery-panel"><h2>${data.currentIsSent?'Entrega enviada':'¿Has terminado por hoy?'}</h2><p>Materiales: ${p.materials} · Archivos guardados: ${p.files}.</p>${p.pendingChecks||p.awaitingMaterial?`<p class="help">Clases por confirmar: ${p.pendingChecks}. Con material por traer: ${p.awaitingMaterial}. Tu familia verá esos pendientes.</p>`:''}
  ${data.currentIsSent?'<p>Tu familia ya puede revisar esta entrega.</p>':`<p>${data.latestId?'Hay cambios desde el último envío. Envía la actualización cuando termines.':'Cuando hayas guardado todo, envía la entrega a tu vista familiar.'}</p><button class="button primary" data-action="close-day" ${canClose?'':'disabled'}>${data.latestId?'Enviar actualización':'He terminado por hoy'}</button>`}</section>`;
}
export function latestDeliveries(data){
  const days=new Set();return (data?.deliveries||[]).filter(d=>{if(days.has(d.school_date))return false;days.add(d.school_date);return true;});
}
export function deliveryInbox(data,subjects){
  const deliveries=latestDeliveries(data);
  return `<section class="delivery-inbox"><div class="section-title"><h2>Entregas recibidas</h2><span>${deliveries.filter(d=>!d.acknowledged_at).length} por revisar</span></div>${deliveries.map(d=>{
    const s=d.snapshot,subject=id=>subjects.find(x=>x.id===id)?.name||id;
    return `<article class="class-card"><div class="card-heading"><h3>${esc(date(d.school_date))} · Entrega ${d.revision}</h3><span class="status">${d.acknowledged_at?'Revisada':'Nueva entrega'}</span></div><p>Materiales: ${s.materials.length} · Archivos: ${s.materials.reduce((n,m)=>n+m.files.length,0)}</p><p class="help">Clases por confirmar: ${s.pendingChecks} · Con material pendiente: ${s.awaitingMaterial}</p><details><summary>Ver lo recibido y los pendientes</summary><ul class="delivery-checks">${s.checks.map(c=>`<li>${esc(subject(c.subjectId))} · ${esc(date(c.date))} · ${esc(states[c.state]||c.state)}</li>`).join('')}</ul>${s.materials.map(m=>`<div class="delivery-material"><strong>${esc(subject(m.subjectId))}</strong><p class="study-text">${esc(m.note||'Archivo adjunto')}</p><ul class="file-list">${m.files.map(f=>`<li><span>${esc(f.name)}<small>${Math.ceil(f.size/1024)} KB</small></span><button class="text-button" data-action="delivery-download" data-delivery="${esc(d.id)}" data-material="${esc(m.id)}" data-hash="${esc(f.hash)}">Descargar</button></li>`).join('')}</ul></div>`).join('')||'<p>La entrega no incluye material nuevo.</p>'}</details><p class="help">El procesamiento y el informe esperan tu orden. Revisar la entrega no inicia la generación.</p>${!d.acknowledged_at?`<button class="button secondary" data-action="acknowledge-delivery" data-id="${esc(d.id)}">Marcar como revisada</button>`:''}</article>`;
  }).join('')||'<div class="empty-card">Aquí aparecerá la entrega cuando se pulse «He terminado por hoy» desde la cuenta del alumno.</div>'}</section>`;
}
