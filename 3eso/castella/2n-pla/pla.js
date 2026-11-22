(() => {
  'use strict';
  const questions = window.CASTELLA_EXERCISES;
  const cards = window.CASTELLA_CARDS;
  const key = 'markel-3eso-castella-2n-pla-v1';
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const normalize = value => String(value).normalize('NFC').toLowerCase().replace(/\s+/g,' ').trim();
  const correct = (q,value) => q.options ? String(q.answer) === String(value) : q.answers.some(answer => normalize(answer) === normalize(value));
  const sourceName = item => item.source === 'resumen' ? 'Resumen' : 'Apuntes y ejercicios';
  const sourceUrl = item => `../../../sources/castella/2n-pla/${item.source === 'resumen' ? 'resumen' : 'apuntes-y-ejercicios'}.pdf#page=${item.page}`;
  const isObject = value => value && typeof value === 'object' && !Array.isArray(value);
  let saved = {exercises:{},cards:{}};
  let storageAvailable = true;
  try {
    const value = JSON.parse(localStorage.getItem(key) || '{}');
    if (isObject(value?.exercises)) saved.exercises = value.exercises;
    if (isObject(value?.cards)) saved.cards = value.cards;
  } catch { storageAvailable = false; }
  function save() {
    try { localStorage.setItem(key,JSON.stringify(saved)); }
    catch { storageAvailable = false; }
    $('#storage-note').textContent = storageAvailable ? 'El progreso se guarda en este navegador.' : 'El progreso se conserva mientras esta página permanezca abierta.';
  }
  function feedback(form,q,passed) {
    const output = form.querySelector('.feedback');
    output.className = `feedback ${passed ? 'correct' : 'incorrect'}`;
    output.textContent = passed ? `¡Correcto! ${q.explanation}` : `Todavía no. ${q.hint} Puedes volver a intentarlo.`;
    form.classList.toggle('done',passed);
  }
  function updateProgress() {
    const count = questions.filter(q => saved.exercises[q.id]?.checked && correct(q,saved.exercises[q.id].value)).length;
    $('#progress').value = count;
    $('#progress-label').textContent = `${count} de ${questions.length} ejercicios completados`;
  }
  function readValue(form,q) {
    return q.options ? form.querySelector('input:checked')?.value ?? '' : form.elements.answer.value;
  }
  document.querySelectorAll('.practice').forEach(section => {
    const grid = document.createElement('div');
    grid.className = 'exercise-grid';
    questions.filter(q => q.topic === section.dataset.topic).forEach(q => {
      const form = document.createElement('form');
      form.className = 'exercise';
      form.id = `ex-${q.id}`;
      const visual = q.visual ? `<p class="visual-prompt" aria-label="Esquema del ejercicio">${q.visual.map(part => `<span${part.includes('?') ? ' class="blank"' : ''}>${esc(part)}</span>`).join(' <span aria-hidden="true">→</span> ')}</p>` : '';
      form.innerHTML = `<p class="level">${String(questions.indexOf(q) + 1).padStart(2,'0')} · ${esc(q.level)}</p><fieldset><legend>${esc(q.prompt)}</legend>${visual}${q.options ? `<div class="options">${q.options.map((option,i) => `<label><input type="radio" name="answer" value="${i}" required aria-describedby="feedback-${q.id}"><span>${esc(option)}</span></label>`).join('')}</div>` : `<label class="typed-label">Tu respuesta<input name="answer" type="text" autocomplete="off" spellcheck="false" maxlength="150" required aria-describedby="feedback-${q.id}"></label>`}</fieldset><div class="actions"><button type="submit">Comprobar</button></div><details class="hint"><summary>Ver una pista</summary><p>${esc(q.hint)}</p></details><p class="feedback" id="feedback-${q.id}" role="status"></p><a class="source-link" href="${sourceUrl(q)}">${sourceName(q)} · pág. ${q.page}</a>`;
      const previous = saved.exercises[q.id];
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
        if (!value) return;
        saved.exercises[q.id] = {value,checked:true};
        feedback(form,q,correct(q,value));
        save();
        updateProgress();
      });
      form.addEventListener('input',() => {
        saved.exercises[q.id] = {value:readValue(form,q),checked:false};
        form.classList.remove('done');
        form.querySelector('.feedback').textContent = '';
        save();
        updateProgress();
      });
      grid.append(form);
    });
    section.append(grid);
  });

  let deck = [...cards];
  let position = 0;
  function selectedCards() {
    return cards.filter(card => ($('#card-topic').value === 'all' || card.topic === $('#card-topic').value) && (!$('#only-review').checked || saved.cards[card.id] !== 'known'));
  }
  function renderCard(focus = false) {
    const known = cards.filter(card => saved.cards[card.id] === 'known').length;
    const review = cards.filter(card => saved.cards[card.id] === 'review').length;
    $('#card-progress').textContent = `${known} de ${cards.length} tarjetas dominadas · ${review} por repasar · ${cards.length - known - review} sin valorar`;
    const card = deck[position];
    $('#card-empty').hidden = Boolean(card);
    $('#reveal').hidden = !card;
    $('#card-answer').hidden = true;
    $('#card-assessment').hidden = true;
    $('#reveal').setAttribute('aria-expanded','false');
    $('#previous').disabled = deck.length < 2;
    $('#next').disabled = deck.length < 2;
    $('#shuffle').disabled = deck.length < 2;
    $('#card-position').textContent = card ? `Tarjeta ${position + 1} de ${deck.length}` : 'Repaso completado';
    $('#card-question').textContent = card ? card.question : 'No quedan tarjetas pendientes';
    $('#card-rating').textContent = card ? ({known:'Ya me lo sé',review:'Necesito repasar'}[saved.cards[card.id]] || 'Sin valorar') : '';
    $('#card-answer-text').textContent = card?.answer || '';
    if (card) {
      $('#card-source').href = sourceUrl(card);
      $('#card-source').textContent = `${sourceName(card)} · pág. ${card.page}`;
    } else $('#card-source').removeAttribute('href');
    if (focus) $('#card-question').focus();
  }
  function filterCards() {
    deck = selectedCards();
    position = 0;
    renderCard();
  }
  $('#card-topic').addEventListener('change',filterCards);
  $('#only-review').addEventListener('change',filterCards);
  $('#reveal').addEventListener('click',() => {
    if (!deck.length) return;
    $('#card-answer').hidden = false;
    $('#card-assessment').hidden = false;
    $('#reveal').hidden = true;
    $('#reveal').setAttribute('aria-expanded','true');
    $('#card-answer').focus();
  });
  function rateCard(rating) {
    const card = deck[position];
    if (!card || $('#card-assessment').hidden) return;
    saved.cards[card.id] = rating;
    save();
    if ($('#only-review').checked && rating === 'known') {
      deck.splice(position,1);
      if (position >= deck.length) position = 0;
    } else position = (position + 1) % deck.length;
    renderCard(true);
  }
  $('#review').addEventListener('click',() => rateCard('review'));
  $('#known').addEventListener('click',() => rateCard('known'));
  $('#previous').addEventListener('click',() => {
    if (deck.length) position = (position - 1 + deck.length) % deck.length;
    renderCard(true);
  });
  $('#next').addEventListener('click',() => {
    if (deck.length) position = (position + 1) % deck.length;
    renderCard(true);
  });
  $('#shuffle').addEventListener('click',() => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i],deck[j]] = [deck[j],deck[i]];
    }
    position = 0;
    renderCard(true);
  });
  $('#reset').addEventListener('click',() => {
    saved = {exercises:{},cards:{}};
    document.querySelectorAll('form.exercise').forEach(form => {
      form.reset();
      form.classList.remove('done');
      form.querySelector('.feedback').textContent = '';
      form.querySelectorAll('details').forEach(detail => { detail.open = false; });
    });
    $('#card-topic').value = 'all';
    $('#only-review').checked = false;
    filterCards();
    save();
    updateProgress();
  });
  $('#progress').max = questions.length;
  $('#progress-panel').hidden = false;
  $('#flashcard-app').hidden = false;
  save();
  updateProgress();
  renderCard();
})();
