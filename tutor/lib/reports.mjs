import {sha256} from './files.mjs';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const fields={received:'Recibido',topics:'Se está trabajando',exercises:'Ejercicios',progress:'Cómo va',focus:'Centrarse en'};
export function reportForDelivery(data,id){return data?.reports?.find(r=>r.delivery_id===id);}
export function processingControls(data,id){
 const r=reportForDelivery(data,id),run=data?.runs?.find(r=>r.delivery_id===id);
 const notices=(data?.notices||[]).filter(n=>n.delivery_id===id);
 const mail=notices.length?`<p class="help">Correo: ${notices.map(n=>`${n.kind==='report'?'informe':'aviso'} ${({pending:'pendiente',sending:'envío iniciado; comprobar antes de repetir',sent:'enviado',uncertain:'por comprobar; no se reenviará automáticamente'})[n.state]||'pendiente'}`).join(' · ')}.</p>`:'';
 if(r)return `<section class="report-summary"><h4>Informe del asistente</h4><dl>${Object.entries(fields).map(([key,label])=>`<dt>${label}</dt><dd>${esc(r.result.summary[key])}</dd>`).join('')}</dl><p class="help">Ejercicios preparados: ${r.exercise_ids.length} · ${new Date(r.created_at).toLocaleString('es-ES',{timeZone:'Europe/Madrid'})}${run?.state==='needs_review'?' · Hay documentación por revisar':''}.</p></section>${mail}`;
 return `<p class="help">${run?'Preparación en curso. Puedes recuperar los documentos si la sesión se interrumpió.':'El análisis espera tu orden. Pídeme en este chat que procese la entrega cuando estés listo.'}</p><div class="toolbar"><button class="button secondary" data-action="processing-export" data-id="${esc(id)}">Preparar para procesar</button></div>${mail}`;
}
export async function processingBundle(bundle,download){
 if(bundle?.format!=='tutor-processing-bundle'||bundle.version!==1)throw new Error('La entrega no es válida.');
 const metadata=new Map();let total=0;
 for(const m of bundle.delivery.snapshot.materials)for(const f of m.files){if(!metadata.has(f.hash)){metadata.set(f.hash,f);total+=f.size;}}
 if(total>28*1024*1024)throw new Error('La entrega requiere recuperación administrativa por su tamaño.');
 const files=[];
 for(const f of metadata.values()){
  const bytes=new Uint8Array(await (await download(f.path)).arrayBuffer());
  if(bytes.length!==f.size||await sha256(bytes)!==f.hash)throw new Error('Un archivo no supera la comprobación de integridad.');
  let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
  files.push({...f,data:btoa(binary)});
 }
 return {...bundle,files};
}
export function resultPayload(doc,studentId,deliveryId){
 if(doc?.format!=='tutor-processing-result'||doc.version!==1||doc.studentId!==studentId||doc.deliveryId!==deliveryId||!doc.worker||!doc.fingerprint||!doc.result)throw new Error('El informe no corresponde a esta entrega.');
 return {p_student:studentId,p_delivery:deliveryId,p_worker:doc.worker,p_fingerprint:doc.fingerprint,p_result:doc.result};
}
