const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const progress = {new:'Por aprender',learning:'En progreso',mastered:'Dominio mantenido'};
const outcome = {correct:'Correcto',incorrect:'Seguiremos repasándolo',needs_review:'Pendiente de revisión',retry:'Prueba otra vez',withdrawn:'Ejercicio retirado'};
export class StudyUI {
  constructor({rpc,run,saved,notify,getState,getRole,operation}) { Object.assign(this,{rpc,run,saved,notify,getState,getRole,operation}); this.data=null; this.editing=false; this.drafts=new Map(); }
  remember(form) { this.drafts.set(form.dataset.exercise,new FormData(form).get('answer')||''); this.editing=true; }
  clear() { this.data=null; this.editing=false; this.drafts.clear(); document.querySelector('#study-dialog')?.remove(); }
  render() {
    const data=this.data, admin=this.getRole()==='admin', state=this.getState();
    const heading=`<div class="page-heading"><div><div class="eyebrow">UN POCO CADA DÍA</div><h1>${admin?'Preparar estudio':'Estudiar'}</h1><p>${admin?'Publica ejercicios revisados y acompaña su progreso.':'Una sesión corta, con un final claro.'}</p></div></div>`;
    if (!data) return heading+'<p>Actualizando el estudio…</p>';
    const units=data.units;
    const catalogue=`<section><div class="section-title"><h2>Temas y repasos</h2>${admin?'<button class="button primary" data-study="publish">＋ Preparar ejercicio</button>':''}</div>${units.map(u=>`<article class="class-card"><h3>${esc(u.title)}</h3><p class="help">${esc(state.subjects.find(s=>s.id===u.subject_id)?.name)}${u.school_plan?' · '+esc(u.school_plan):''}</p><p>${esc(progress[u.progress])} · ${u.exerciseCount} ejercicios${u.dueOn?' · Próximo repaso: '+esc(u.dueOn):''}</p><p class="help">${u.explained?'Explicado en clase':'Aún no confirmado como explicado'} · ${u.evaluable?'Evaluable confirmado':'Sin temario de examen confirmado'}${u.deadline?' · '+esc(u.deadline)+(u.deadline_confirmed?' · Fecha confirmada':' · Fecha provisional'):''}</p>${admin?`<div class="card-actions"><button class="text-button" data-study="publish" data-unit="${esc(u.id)}">Añadir ejercicio</button><button class="text-button" data-study="unit" data-unit="${esc(u.id)}">Actualizar tema</button></div>`:''}</article>`).join('') || `<div class="large-empty"><h2>${admin?'Prepara el primer tema':'Aún no hay temas para estudiar'}</h2><p>${admin?'Añade un ejercicio basado en los apuntes y revisa la solución antes de publicarlo.':'Los ejercicios aparecerán cuando estén preparados y revisados.'}</p></div>`}</section>`;
    if (admin) return heading+`<section>${data.reviews.length?'<h2>Respuestas que necesitan tu revisión</h2>':''}${data.reviews.map(a=>`<article class="class-card"><h3>${esc(a.prompt)}</h3><p class="study-text">Respuesta: ${esc(a.answer)}</p><details><summary>Criterio de corrección</summary><p class="study-text">${esc(a.solution)}</p></details><button class="button secondary" data-study="review" data-attempt="${esc(a.id)}">Revisar respuesta</button></article>`).join('')}</section>`+catalogue+`<section><h2>Ejercicios publicados</h2>${data.exercises.filter(e=>!e.retired).map(e=>`<details class="mini-card"><summary>${esc(e.prompt)}</summary><p class="study-text">Solución o criterio: ${esc(e.kind==='choice'?e.choices[Number(e.solution)]:e.solution)}</p><p class="study-text">${esc(e.explanation)}</p><button class="text-button" data-study="retire" data-exercise="${esc(e.id)}">Retirar ejercicio</button></details>`).join('')}</section>`;
    const history=(data.history||[]).length ? `<section><h2>Respuestas anteriores</h2>${data.history.map(a=>`<details class="mini-card"><summary>${esc(a.title)} · ${esc(outcome[a.outcome])} · ${esc(a.date)}</summary><p class="study-text">${esc(a.prompt)}</p><p class="study-text">Tu respuesta: ${esc(a.answer)}</p><p class="study-text">${esc(a.feedback||a.explanation||'Pendiente de revisión familiar.')}</p></details>`).join('')}</section>` : '';
    const session=data.session;
    if (!session) return heading+`<section class="day-banner"><div><span class="banner-label">TU SESIÓN DE HOY</span><h2>Un objetivo, paso a paso</h2><p>Deberes y exámenes confirmados, dificultades y repasos pendientes.</p><label>Tiempo disponible <select id="study-minutes"><option value="20">20 minutos</option><option value="10">10 minutos</option><option value="30">30 minutos</option></select></label><button class="button secondary" data-study="start" ${units.some(u=>u.explained&&u.exerciseCount)?'':'disabled'}>Preparar mi sesión</button></div></section>`+catalogue+history;
    const pending=session.items.filter(i=>i.status==='pending'), current=pending[0], completed=session.items.length-pending.length;
    let sessionHTML=`<section class="day-banner"><div><span class="banner-label">TU SESIÓN DE HOY · HASTA ${session.minutes} MINUTOS</span><h2>${current?'Vamos con el siguiente':'Por hoy, terminado'}</h2><p>${completed} de ${session.items.length} actividades completadas.${current?'':' Puedes dejarlo aquí; no añadiremos más ejercicios hoy.'}</p></div></section>`;
    if (current) sessionHTML+=`<article class="class-card"><p class="help">${esc(current.title)} · ${esc(current.reason)}</p><h2 class="study-text">${esc(current.prompt)}</h2><form data-study-answer data-session="${esc(session.id)}" data-exercise="${esc(current.exerciseId)}" data-version="${session.version}">${current.kind==='choice'?`<fieldset class="study-choices"><legend>Elige una respuesta</legend>${current.choices.map((c,i)=>`<label><input type="radio" name="answer" value="${i}" ${this.drafts.get(current.exerciseId)===String(i)?'checked':''} required> ${esc(c)}</label>`).join('')}</fieldset>`:`<label for="study-answer">Tu respuesta</label><textarea id="study-answer" name="answer" rows="3" maxlength="4000" required ${current.kind==='number'?'inputmode="decimal"':''}>${esc(this.drafts.get(current.exerciseId)||'')}</textarea>`}${current.kind==='open'?'<p class="help">Esta respuesta la revisará la cuenta familiar.</p>':''}${current.hint?`<p class="study-feedback study-text">Pista: ${esc(current.hint)}</p>`:''}<div class="card-actions"><button class="button primary">Comprobar respuesta</button><button type="button" class="button secondary" data-study="hint">Necesito una pista</button></div><p class="inline-error" data-study-error role="alert"></p></form></article>`;
    sessionHTML+=session.items.filter(i=>i.status!=='pending').map(i=>`<article class="class-card"><h3>${esc(i.title)} · ${esc(outcome[i.outcome]||'Completado')}</h3><p class="study-text">${esc(i.prompt)}</p>${i.answer?`<p class="study-text">Tu respuesta: ${esc(i.kind==='choice'?i.choices[Number(i.answer)]:i.answer)}</p>`:''}${i.solution?`<p class="study-text">Solución: ${esc(i.solution)}</p>`:''}<p class="study-text">${esc(i.feedback||i.explanation||'La respuesta está guardada.')}</p></article>`).join('');
    return heading+sessionHTML+catalogue+history;
  }
  dialog(title,body,onSubmit) {
    document.querySelector('#study-dialog')?.remove();
    const d=document.createElement('dialog');d.id='study-dialog';d.setAttribute('aria-label',title);
    d.innerHTML=`<form id="study-form"><div class="dialog-top"><h2>${esc(title)}</h2><button type="button" class="icon-button" data-close-study aria-label="Cerrar">×</button></div>${body}<p class="inline-error" id="study-form-error" role="alert"></p><div class="dialog-actions"><button type="button" class="button secondary" data-close-study>Cancelar</button><button class="button primary">${title==='Revisar respuesta'?'Guardar revisión':title==='Actualizar tema'?'Guardar tema':'Publicar ejercicio'}</button></div></form>`;
    document.body.append(d);d.showModal();d.querySelector('[data-close-study]').focus();
    d.querySelectorAll('[data-close-study]').forEach(b=>b.onclick=()=>d.close());
    d.querySelector('form').onsubmit=e=>{e.preventDefault();this.run(async()=>{
      const button=d.querySelector('button[type="submit"],.dialog-actions .primary');button.disabled=true;
      try {await onSubmit(new FormData(e.target));d.close();this.editing=false;await this.saved();}
      catch(error) {d.querySelector('#study-form-error').textContent=error.message;}
      finally {button.disabled=false;}
    });};
  }
  unitFields(u={}) {
    return `<label class="checkbox-label"><input type="checkbox" name="explained" ${u.explained?'checked':''}>Confirmado como explicado en clase</label><label class="checkbox-label"><input type="checkbox" name="evaluable" ${u.evaluable?'checked':''}>Confirmado como evaluable</label><label>Fecha de entrega o examen (si se conoce)<input type="date" name="deadline" value="${esc(u.deadline||'')}"></label><label>Tipo<select name="deadlineKind"><option value="none">Sin fecha de entrega o examen</option><option value="homework" ${u.deadline_kind==='homework'?'selected':''}>Entrega o deberes</option><option value="exam" ${u.deadline_kind==='exam'?'selected':''}>Examen</option></select></label><label class="checkbox-label"><input type="checkbox" name="deadlineConfirmed" ${u.deadline_confirmed?'checked':''}>La fecha está confirmada</label>`;
  }
  fields(f) {return {explained:f.has('explained'),evaluable:f.has('evaluable'),deadline:f.get('deadline'),deadlineKind:f.get('deadlineKind'),deadlineConfirmed:f.has('deadlineConfirmed')};}
  publish(unitId) {
    const state=this.getState(),unit=this.data.units.find(u=>u.id===unitId);
    this.dialog('Preparar ejercicio',`${unit?`<p>Tema: ${esc(unit.title)}</p>`:`<label>Asignatura<select name="subjectId" required>${state.subjects.filter(s=>s.trackingEnabled!==false).map(s=>`<option value="${esc(s.id)}">${esc(s.name)}</option>`).join('')}</select></label><label>Tema o concepto<input name="title" maxlength="160" required></label><label>Plan escolar (opcional)<input name="schoolPlan" maxlength="160" placeholder="Nombre del plan, si se conoce"></label><label>Apuntes de origen (opcional)<select name="materialId"><option value="">Sin asociar</option>${state.materials.map(m=>`<option value="${esc(m.id)}">${esc(state.subjects.find(s=>s.id===m.subjectId)?.name)} · ${esc(m.note.slice(0,70)||m.date)}</option>`).join('')}</select></label>${this.unitFields()}`}
    <label>Enunciado<textarea name="prompt" rows="3" maxlength="4000" required></textarea></label><label>Tipo de respuesta<select name="kind" id="exercise-kind"><option value="exact">Respuesta corta inequívoca</option><option value="number">Número</option><option value="choice">Opciones</option><option value="open">Respuesta abierta con revisión familiar</option></select></label><p class="help" id="answer-help">En respuestas cortas solo se ignoran mayúsculas y espacios. Usa revisión familiar si admite distintas formas válidas.</p><div id="choices-fields" hidden><label>Opciones (una por línea, entre 2 y 6)<textarea name="choices" rows="4"></textarea></label><label>Número de la opción correcta<input name="correctChoice" type="number" min="1" max="6" value="1"></label></div><div id="solution-fields"><label id="solution-label">Respuesta correcta<textarea name="solution" maxlength="2000" rows="2"></textarea></label></div><div id="tolerance-fields" hidden><label>Margen numérico permitido<input name="tolerance" type="number" min="0" max="1000000" step="any" value="0"></label></div><label>Pista (opcional)<textarea name="hint" maxlength="2000" rows="2"></textarea></label><label>Explicación después de responder<textarea name="explanation" maxlength="4000" rows="3" required></textarea></label><label>Minutos orientativos<input name="minutes" type="number" min="1" max="15" value="4" required></label><label class="checkbox-label"><input name="reviewed" type="checkbox" required>He revisado el enunciado, la solución y la explicación; autorizo publicarlo.</label>`,async f=>{
      const kind=f.get('kind');
      const content={...this.fields(f),subjectId:f.get('subjectId'),title:f.get('title'),schoolPlan:f.get('schoolPlan'),materialId:f.get('materialId'),prompt:f.get('prompt'),kind,
        choices:kind==='choice'?f.get('choices').split('\n').map(s=>s.trim()).filter(Boolean):[],solution:kind==='choice'?String(Number(f.get('correctChoice'))-1):f.get('solution'),tolerance:kind==='number'?Number(f.get('tolerance')):0,hint:f.get('hint'),explanation:f.get('explanation'),minutes:Number(f.get('minutes')),reviewed:f.has('reviewed')};
      const payload={p_student:state.studentId,p_unit:unitId||null,p_content:content};
      await this.rpc('tm_study_publish',{...payload,p_operation:this.operation(JSON.stringify(payload))});
    });
    const d=document.querySelector('#study-dialog');d.querySelector('#exercise-kind').onchange=e=>{
      const k=e.target.value;d.querySelector('#choices-fields').hidden=k!=='choice';d.querySelector('#solution-fields').hidden=k==='choice';d.querySelector('#tolerance-fields').hidden=k!=='number';
      d.querySelector('#solution-label').firstChild.textContent=k==='open'?'Criterio de corrección':'Respuesta correcta';
      d.querySelector('[name="solution"]').required=k!=='choice';
    };d.querySelector('[name="solution"]').required=true;
  }
  async action(button) {
    const state=this.getState(),action=button.dataset.study;
    if (action==='publish') return this.publish(button.dataset.unit);
    if (action==='unit') {
      const u=this.data.units.find(u=>u.id===button.dataset.unit);
      return this.dialog('Actualizar tema',`<p>${esc(u.title)}</p>${this.unitFields(u)}`,async f=>this.rpc('tm_study_unit',{p_student:state.studentId,p_unit:u.id,p_settings:this.fields(f)}));
    }
    if (action==='review') {
      const a=this.data.reviews.find(a=>a.id===button.dataset.attempt);
      return this.dialog('Revisar respuesta',`<p class="study-text">${esc(a.prompt)}</p><p class="study-text">${esc(a.answer)}</p><label>Valoración<select name="correct"><option value="true">Correcta según el criterio</option><option value="false">Necesita reforzarse</option></select></label><label>Comentario para el alumno<textarea name="feedback" required maxlength="2000" rows="3"></textarea></label>`,async f=>{
        const payload={p_student:state.studentId,p_attempt:a.id,p_correct:f.get('correct')==='true',p_feedback:f.get('feedback')};
        await this.rpc('tm_study_review',{...payload,p_operation:this.operation(JSON.stringify(payload))});
      });
    }
    this.run(async()=>{
      if (action==='start') {const data=await this.rpc('tm_study_start',{p_student:state.studentId,p_minutes:Number(document.querySelector('#study-minutes').value)});if(!data.session)this.notify('No hay actividades pendientes para hoy.');}
      if (action==='hint') return this.respond(document.querySelector('[data-study-answer]'),true);
      if (action==='retire') await this.rpc('tm_study_retire',{p_student:state.studentId,p_exercise:button.dataset.exercise});
      this.editing=false;await this.saved();
    });
  }
  async respond(form,hint=false) {
    const payload={p_student:this.getState().studentId,p_session:form.dataset.session,p_version:Number(form.dataset.version),p_exercise:form.dataset.exercise,p_answer:hint?'':new FormData(form).get('answer'),p_hint:hint};
    try {if(hint)this.remember(form);await this.rpc('tm_study_respond',{...payload,p_operation:this.operation(JSON.stringify(payload))});if(!hint)this.drafts.delete(form.dataset.exercise);this.editing=false;await this.saved();}
    catch(e) {
      if(e.code==='TM409') {
        this.remember(form);this.editing=false;await this.saved();this.notify('La sesión ha cambiado en otro dispositivo. Revisa el estado actualizado antes de responder.');
      } else form.querySelector('[data-study-error]').textContent=e.message;
    }
  }
}
