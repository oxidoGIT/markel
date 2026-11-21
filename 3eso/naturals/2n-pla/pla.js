(() => {
  'use strict';
  const questions = window.NATURALS_EXERCISES;
  const key = 'markel-3eso-naturals-2n-pla-v1';
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’'·.,;!?-]/g,' ').replace(/\s+/g,' ').trim().replace(/^(?:l |el |la |els |les |un |una )/,'');
  const correct = (q,value) => q.options ? String(q.answer) === String(value) : q.answers.some(answer => normalize(answer) === normalize(value));
  let saved = {};
  let storageAvailable = true;
  try {
    const value = JSON.parse(localStorage.getItem(key) || '{}');
    if (value && typeof value === 'object' && !Array.isArray(value)) saved = value;
  } catch { storageAvailable = false; }
  const storageNote = document.querySelector('#storage-note');
  function save() {
    try { localStorage.setItem(key,JSON.stringify(saved)); }
    catch { storageAvailable = false; }
    storageNote.textContent = storageAvailable ? 'El progrés es desa en aquest navegador.' : 'El progrés es conserva mentre aquesta pàgina sigui oberta; el navegador no permet desar-lo.';
  }
  function source(q) {
    const file = q.extra ? 'naturals_aparell_excretor_pagina_addicional.pdf#page=1' : `naturals_original_solo_maquetacion.pdf#page=${q.page}`;
    return `<a class="source-link" href="../../../sources/naturals/2n-pla/${file}">${q.extra ? 'Apunts addicionals · pàg. 1 (amb els aclariments de la teoria)' : `Apunts originals · pàg. ${q.page}`}</a>`;
  }
  function feedback(form,q,passed) {
    const output = form.querySelector('.feedback');
    output.className = `feedback ${passed ? 'correct' : 'incorrect'}`;
    output.textContent = passed ? `Correcte! ${q.explanation}` : `Encara no. ${q.hint} Pots tornar-ho a provar.`;
    form.classList.toggle('done',passed);
  }
  function updateProgress() {
    const count = questions.filter(q => saved[q.id]?.checked && correct(q,saved[q.id].value)).length;
    document.querySelector('#progress').value = count;
    document.querySelector('#progress-label').textContent = `${count} de ${questions.length} exercicis completats`;
  }
  function readValue(form,q) {
    return q.options ? form.querySelector('input:checked')?.value ?? '' : form.elements.answer.value;
  }
  document.querySelectorAll('.practice').forEach(section => {
    const grid = document.createElement('div');
    grid.className = 'exercise-grid';
    questions.filter(q => q.topic === section.dataset.topic).forEach(q => {
      const number = questions.indexOf(q) + 1;
      const form = document.createElement('form');
      form.className = 'exercise';
      form.id = `ex-${q.id}`;
      const visual = q.visual ? `<p class="visual-prompt" aria-label="Esquema de l’exercici">${q.visual.map(part => `<span${part.includes('?') ? ' class="blank"' : ''}>${esc(part)}</span>`).join(' <span aria-hidden="true">→</span> ')}</p>` : '';
      form.innerHTML = `<p class="level">${String(number).padStart(2,'0')} · ${esc(q.level)}</p><fieldset><legend>${esc(q.prompt)}</legend>${visual}${q.options ? `<div class="options">${q.options.map((option,i) => `<label><input type="radio" name="answer" value="${i}" required><span>${esc(option)}</span></label>`).join('')}</div>` : `<label class="typed-label">La teva resposta<input name="answer" type="text" autocomplete="off" spellcheck="false" maxlength="150" required aria-describedby="feedback-${q.id}"></label>`}</fieldset><div class="actions"><button type="submit">Comprova</button></div><details class="hint"><summary>Necessito una pista</summary><p>${esc(q.hint)}</p></details><p class="feedback" id="feedback-${q.id}" role="status"></p>${source(q)}`;
      const previous = saved[q.id];
      if (previous && typeof previous.value === 'string') {
        if (q.options) {
          const input = [...form.querySelectorAll('input')].find(input => input.value === previous.value);
          if (input) input.checked = true;
        } else form.elements.answer.value = previous.value;
        if (previous.checked && previous.value.trim()) feedback(form,q,correct(q,previous.value));
      }
      form.addEventListener('submit',event => {
        event.preventDefault();
        const value = readValue(form,q).trim();
        if (!value) {
          form.querySelector('.feedback').textContent = 'Escriu una resposta o tria una opció abans de comprovar.';
          return;
        }
        const passed = correct(q,value);
        saved[q.id] = {value,checked:true};
        feedback(form,q,passed);
        save();
        updateProgress();
      });
      form.addEventListener('input',() => {
        saved[q.id] = {value:readValue(form,q),checked:false};
        form.classList.remove('done');
        form.querySelector('.feedback').textContent = '';
        save();
        updateProgress();
      });
      grid.append(form);
    });
    section.append(grid);
  });
  document.querySelector('#reset').addEventListener('click',() => {
    saved = {};
    document.querySelectorAll('form.exercise').forEach(form => {
      form.reset();
      form.classList.remove('done');
      form.querySelector('.feedback').textContent = '';
      form.querySelectorAll('details').forEach(detail => { detail.open = false; });
    });
    save();
    updateProgress();
  });
  document.querySelector('#progress').max = questions.length;
  document.querySelector('#progress-panel').hidden = false;
  save();
  updateProgress();
})();
