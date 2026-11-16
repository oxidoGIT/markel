// One card per subject, irrespective of how many school dates remain unreviewed.
export function subjectGroups(state) {
  return state.subjects.filter(s=>s.trackingEnabled!==false).flatMap(s=>{
    const history=state.checks.filter(c=>c.subjectId===s.id&&c.date<=state.date).sort((a,b)=>a.date.localeCompare(b.date));
    if(!history.length)return [];
    let checks=history.filter(c=>['pending','material_pending'].includes(c.state)||(c.date===state.date&&c.state==='new_content_received'));
    if(!checks.length){const last=[...history].reverse().find(c=>c.state==='new_content_received');if(last)checks=[last];}
    const waiting=checks.filter(c=>['pending','material_pending'].includes(c.state));
    const status=checks.some(c=>c.state==='material_pending')?'material_pending':checks.some(c=>c.state==='pending')?'pending':checks.length?'new_content_received':history.at(-1).state;
    return [{subjectId:s.id,checks,waiting,status,last:history.at(-1),canConfirm:checks.length>0&&checks.every(c=>c.state==='pending')}];
  });
}
export const checkVersions=g=>g.checks.map(c=>({id:c.id,version:c.version})).sort((a,b)=>a.id.localeCompare(b.id));
