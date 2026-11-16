import {prepareFiles} from './lib/files.mjs';

const results=document.querySelector('#camera-results'),status=document.querySelector('#camera-status');
const error=document.querySelector('#camera-error'),clear=document.querySelector('#clear-camera');
const inputs=[document.querySelector('#camera'),document.querySelector('#attachments')];
let files=[],urls=[];
function release(){for(const url of urls)URL.revokeObjectURL(url);urls=[];}
function render(){
  release();results.replaceChildren();clear.hidden=!files.length;
  status.textContent=files.length?`${files.length} archivo${files.length===1?'':'s'} seleccionado${files.length===1?'':'s'}. No se ha enviado nada.`:'Todavía no has seleccionado ningún archivo.';
  for(const f of files){
    const card=document.createElement('article');card.className='camera-result';
    const name=document.createElement('p');name.textContent=`${f.name} · ${Math.ceil(f.size/1024)} KB`;card.append(name);
    if(f.type.startsWith('image/')){
      const image=document.createElement('img');image.alt=`Vista previa de ${f.name}`;
      const url=URL.createObjectURL(f.blob);urls.push(url);image.src=url;
      image.addEventListener('error',()=>{image.hidden=true;const note=document.createElement('p');note.className='help';note.textContent='Archivo seleccionado. Este navegador no puede mostrar la vista previa de este formato.';card.append(note);},{once:true});
      card.append(image);
    }
    results.append(card);
  }
}
for(const input of inputs)input.addEventListener('change',async()=>{
  const selected=[...input.files];input.value='';if(!selected.length)return;
  error.textContent='';for(const item of inputs)item.disabled=true;clear.disabled=true;
  try{files=await prepareFiles([...files.map(f=>f.blob),...selected]);render();}
  catch(e){error.textContent=e.message;}
  finally{for(const item of inputs)item.disabled=false;clear.disabled=false;}
});
clear.addEventListener('click',()=>{files=[];error.textContent='';render();});
window.addEventListener('pagehide',()=>{files=[];release();results.replaceChildren();status.textContent='Prueba vacía. Vuelve a seleccionar una imagen.';clear.hidden=true;});
