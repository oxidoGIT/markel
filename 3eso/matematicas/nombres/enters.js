"use strict";
(() => {
  const lesson = window.LESSON_PRACTICE;
  const exercises = lesson?.exercises || window.INTEGER_EXERCISES;
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const signed = n => String(n).replace("-", "−");
  const key = lesson?.storageKey || "markel-3eso-enters-practice-v2";
  let memoryOnly = false;
  let saved;
  try { saved = JSON.parse(localStorage.getItem(key) || "null"); } catch { memoryOnly = true; }
  const records = {};
  for (const ex of exercises) {
    const old = saved?.records?.[ex.id];
    records[ex.id] = {
      answers: Array.isArray(old?.answers) ? old.answers.map(v => String(v).slice(0,200)) : [],
      hints: Number.isInteger(old?.hints) ? Math.max(0, Math.min(old.hints, ex.hints.length)) : 0,
      consulted: old?.consulted === true,
      solved: old?.solved === true,
      attempts: Number.isInteger(old?.attempts) ? Math.max(0, old.attempts) : 0
    };
  }
  let current = exercises.findIndex(ex => ex.id === saved?.current);
  if (current < 0) current = 0;
  let level = exercises[current].level;
  const levels = lesson?.levels || ["Fonaments", "Càlcul", "Combinades", "Àlgebra i reptes"];
  const pending = () => $("#pending-only").checked;
  const candidates = () => exercises.map((ex,i) => i).filter(i => exercises[i].level === level && (!pending() || !records[exercises[i].id].solved));
  const activeList = () => [...new Set([...candidates(), ...(current >= 0 && exercises[current].level === level ? [current] : [])])].sort((a,b) => a-b);
  function persist() {
    try { localStorage.setItem(key, JSON.stringify({ records, current:exercises[current]?.id })); }
    catch { memoryOnly = true; }
    $("#storage-note").textContent = memoryOnly ? "El navegador no permet desar el progrés. Pots continuar en aquesta sessió." : "";
  }
  function updateProgress() {
    const solved = Object.values(records).filter(r => r.solved).length;
    const viewed = Object.values(records).filter(r => r.consulted && !r.solved).length;
    $("#progress-label").textContent = `${solved} de ${exercises.length} resolts`;
    $("#progress").value = solved;
    $("#assisted-label").textContent = `${viewed} solucions consultades`;
    persist();
  }
  function stateLabel(r) { return r.solved ? "Resolt" : r.consulted ? "Solució consultada" : "Pendent"; }
  function renderMap() {
    const list = activeList();
    $("#exercise-map").innerHTML = list.map(i => {
      const ex = exercises[i], r = records[ex.id];
      return `<button type="button" data-index="${i}" data-state="${r.solved ? "solved" : r.consulted ? "consulted" : "pending"}" aria-current="${i === current}" aria-label="Exercici ${ex.number}: ${stateLabel(r)}" title="${stateLabel(r)}">${ex.number}${r.solved ? " ✓" : r.consulted ? " ·" : ""}</button>`;
    }).join("");
    const position = list.indexOf(current);
    $("#previous").disabled = position <= 0;
    $("#next").disabled = position < 0 || position >= list.length - 1;
    $("#position").textContent = current >= 0 ? `${position + 1} / ${list.length} · ${levels[level]}` : "Cap exercici pendent en aquest nivell";
  }
  function pointPlot() {
    if (lesson?.visual) return lesson.visual(exercises[current]);
    const ticks = Array.from({length:17},(_,i) => { const v=i-8,x=40+i*37.5; return `<path d="M${x} 59v12" stroke="currentColor"/>${v%2 === 0 ? `<text x="${x}" y="94" text-anchor="middle">${signed(v)}</text>` : ""}`; }).join("");
    return `<div class="number-figure"><svg viewBox="0 0 680 116" role="img" aria-label="Punt A en una recta graduada de menys vuit a vuit, amb una marca per unitat"><path d="M30 65H650" stroke="currentColor"/>${ticks}<circle cx="152.5" cy="65" r="5" fill="#17634c"/><text x="152.5" y="38" text-anchor="middle" fill="#17634c" font-weight="bold">A</text></svg></div>`;
  }
  function renderExercise(focus = false) {
    document.querySelector(`input[name=level][value="${level}"]`).checked = true;
    if (current < 0) {
      $("#exercise-host").innerHTML = '<div class="exercise-stage"><h3>Nivell completat</h3><p>Tots els exercicis d’aquest nivell estan resolts. Pots continuar en un altre nivell o desmarcar «Només pendents» per repassar-los.</p></div>';
      renderMap(); return;
    }
    const ex = exercises[current], r = records[ex.id];
    let answer;
    if (ex.choices) {
      answer = `<fieldset class="choices"><legend class="sr-only">Tria una resposta</legend>${ex.choices.map((choice,i) => `<label><input type="radio" name="response" value="${esc(choice)}" ${r.answers[0] === choice ? "checked" : ""}><span>${esc(choice)}</span></label>`).join("")}</fieldset>`;
    } else {
      const labels = ex.labels || [ex.type === "ordered" ? "Nombres ordenats (separats per comes)" : ex.type === "set" ? "Totes les solucions (separades per comes)" : "Resultat"];
      answer = `<div class="answer-fields">${labels.map((label,i) => `<label>${esc(label)}<input type="text" name="response-${i}" autocomplete="off" spellcheck="false" maxlength="200" value="${esc(r.answers[i] || "")}" aria-describedby="feedback"></label>`).join("")}</div>`;
    }
    $("#exercise-host").innerHTML = `<article class="exercise-stage" aria-labelledby="exercise-title"><div class="exercise-meta"><span>Exercici ${ex.number} / ${exercises.length}</span><span id="exercise-state">${stateLabel(r)}</span></div><h3 id="exercise-title" tabindex="-1">${esc(ex.title)}</h3><p class="exercise-prompt">${esc(ex.prompt)}</p>${ex.visual ? pointPlot() : ""}<form id="answer-form">${answer}<div class="actions"><button type="submit" class="primary">Comprova</button><button type="button" id="hint-button">Pista</button><button type="button" id="solution-button">Veure la solució</button></div></form><p id="feedback" class="feedback" role="status"></p><div id="hint-box" class="hint-box" hidden></div><div id="solution-box" class="solution-box" hidden><h4>Resolució</h4><ol>${ex.steps.map(step => `<li>${esc(step)}</li>`).join("")}</ol></div></article>`;
    const read = () => ex.choices ? [$("#answer-form input:checked")?.value || ""] : [...document.querySelectorAll("#answer-form input")].map(input => input.value);
    $("#answer-form").addEventListener("input", () => { r.answers = read(); persist(); $("#feedback").textContent = ""; });
    $("#answer-form").addEventListener("submit", event => {
      event.preventDefault(); r.answers = read();
      if (r.answers.some(value => !value.trim())) { feedback("Completa la resposta abans de comprovar-la.", "error"); return; }
      r.attempts++;
      if ((lesson?.checker || window.IntegerAnswers).check(ex,r.answers)) {
        if (!r.consulted) r.solved = true;
        feedback(r.solved ? (r.hints ? "Correcte. Resolt amb pistes." : "Correcte. Ben resolt.") : "Correcte. Aquest exercici consta com a consultat perquè ja n’has vist la solució.", "ok");
        $("#solution-box").hidden = false;
      } else feedback(ex.error, "error");
      $("#exercise-state").textContent = stateLabel(r);
      updateProgress(); renderMap();
    });
    function showHints() {
      $("#hint-box").hidden = r.hints === 0;
      $("#hint-box").innerHTML = ex.hints.slice(0,r.hints).map((hint,i) => `<p><strong>Pista ${i+1}.</strong> ${esc(hint)}</p>`).join("");
      $("#hint-button").disabled = r.hints >= ex.hints.length;
      $("#hint-button").textContent = r.hints ? "Una altra pista" : "Pista";
    }
    $("#hint-button").addEventListener("click", () => { r.hints = Math.min(r.hints+1,ex.hints.length); showHints(); persist(); });
    $("#solution-button").addEventListener("click", () => {
      r.consulted = true;
      $("#solution-box").hidden = false;
      $("#exercise-state").textContent = stateLabel(r);
      if (!r.solved) feedback("Solució consultada. No compta com a exercici resolt.", "hint");
      updateProgress(); renderMap();
    });
    showHints();
    if (r.solved || r.consulted) $("#solution-box").hidden = false;
    renderMap(); persist();
    if (focus) $("#exercise-title").focus({ preventScroll:true });
  }
  function feedback(message,kind) { $("#feedback").textContent=message; $("#feedback").dataset.kind=kind; }
  $("#exercise-map").addEventListener("click", event => {
    const target = event.target.closest("button[data-index]");
    if (target) { current = Number(target.dataset.index); renderExercise(true); }
  });
  for (const input of document.querySelectorAll("input[name=level]")) input.addEventListener("change", () => { level=Number(input.value); current=candidates()[0] ?? -1; renderExercise(); });
  $("#pending-only").addEventListener("change", () => { current=candidates()[0] ?? -1; renderExercise(); });
  for (const [selector,delta] of [["#previous",-1],["#next",1]]) $(selector).addEventListener("click", () => { const list=activeList(); const next=list[list.indexOf(current)+delta]; if (next !== undefined) { current=next; renderExercise(true); } });
  $("#reset-open").addEventListener("click", () => {
    $("#reset-dialog").returnValue = "cancel";
    $("#reset-dialog").showModal();
  });
  $("#reset-dialog").addEventListener("close", () => {
    if ($("#reset-dialog").returnValue !== "reset") return;
    for (const r of Object.values(records)) Object.assign(r,{ answers:[],hints:0,consulted:false,solved:false,attempts:0 });
    current=0; level=0; $("#pending-only").checked=false; updateProgress(); renderExercise(); $("#reset-open").focus();
  });
  function updateLine() {
    const aInput=$("#start"),bInput=$("#operand");
    const a=Number(aInput.value),b=Number(bInput.value);
    if ([aInput,bInput].some(input => input.value === "") || !Number.isInteger(a) || !Number.isInteger(b) || Math.abs(a)>8 || Math.abs(b)>8) {
      $("#lab-error").textContent="Tria dos enters entre −8 i 8."; $("#lab-plot").innerHTML=""; $("#lab-result").textContent=""; return;
    }
    $("#lab-error").textContent="";
    const subtract=$("#operation").value === "subtract", delta=subtract ? -b : b, end=a+delta;
    const lo=Math.min(-4,a-2,end-2),hi=Math.max(4,a+2,end+2);
    const x = n => 40+(n-lo)/(hi-lo)*600;
    const ticks=Array.from({length:hi-lo+1},(_,i) => { const n=lo+i; return `<path d="M${x(n)} 80v10" stroke="#7f9690"/>${n%2 === 0 ? `<text x="${x(n)}" y="113" text-anchor="middle">${signed(n)}</text>` : ""}`; }).join("");
    const direction=delta>0 ? "cap a la dreta" : "cap a l’esquerra";
    const sentence=`${signed(a)} ${subtract ? "−" : "+"} (${signed(b)}) = ${signed(end)}. ${delta ? `Desplaçament de ${Math.abs(delta)} unitats ${direction}.` : "El punt no es mou."}`;
    $("#lab-plot").innerHTML=`<svg viewBox="0 0 680 145" role="img" aria-label="${esc(sentence)}"><text x="40" y="19" fill="#245da1">Inici: ${signed(a)}</text><text x="640" y="19" text-anchor="end" fill="#17634c">Final: ${signed(end)}</text><path d="M30 85H650" stroke="currentColor"/>${ticks}<circle cx="${x(a)}" cy="85" r="6" fill="#fff" stroke="#245da1" stroke-width="3"/><circle cx="${x(end)}" cy="85" r="4" fill="#17634c"/>${delta ? `<path d="M${x(a)} 70V45H${x(end)}V68" fill="none" stroke="#17634c" stroke-width="2"/><path d="M${x(end)-5} 61l5 7 5-7" fill="none" stroke="#17634c" stroke-width="2"/>` : ""}</svg>`;
    $("#lab-result").textContent=sentence;
  }
  if (!lesson) {
    for (const selector of ["#start","#operand","#operation"]) $(selector).addEventListener("input",updateLine);
    updateLine();
  } else lesson.init?.();
  $("#practice-app").hidden=false;
  renderExercise(); updateProgress();
})();
