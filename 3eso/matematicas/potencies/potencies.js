(() => {
  'use strict';
  const unit = window.MATH_PRACTICE || {};
  const exercises = unit.exercises || window.POTENCIES_EXERCISES || [];
  const key = unit.storageKey || 'markel-3eso-potencies-v1';
  const topics = unit.topics || {signes: 'Signes i casos especials', propietats: 'Propietats i factors', negatius: 'Exponents negatius i fraccions', combinades: 'Operacions combinades', racionals: 'Exponents racionals', arrels: 'Arrels'};
  const sourcePdf = unit.sourcePdf || '../../../sources/matematicas/potencies/mates-potencias.pdf';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const supers = {'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-','⁺':'+'};
  function normalize(s) {
    return String(s).trim().replace(/[−–]/g, '-').replace(/[·×]/g, '*').replace(/[÷:]/g, '/')
      .replace(/,/g, '.').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+/g, v => '^(' + [...v].map(c => supers[c]).join('') + ')');
  }
  // Small arithmetic grammar: no eval, functions, property access or executable input.
  function parse(source) {
    const s = normalize(source);
    if (s.length > 350 || /\d\s+\d/.test(s)) throw Error('format');
    const tokens = s.match(/r(?:[1-9]\d|[2-9])|\d+(?:\.\d+)?|[abcmnpxy]|[()+*/^=\-]/g) || [];
    if (tokens.join('') !== s.replace(/\s/g, '') || tokens.length > 220) throw Error('format');
    let i = 0;
    const take = t => tokens[i] === t && (++i, true);
    function atom() {
      if (take('(')) {
        const v = sum();
        if (!take(')')) throw Error('parentheses');
        return {t:'bracket', a:v};
      }
      const v = tokens[i++];
      if (/^r\d+$/.test(v || '')) {
        if (!take('(')) throw Error('radicand');
        const a = sum();
        if (!take(')')) throw Error('parentheses');
        return {t:'root', a, index:Number(v.slice(1))};
      }
      if (/^\d+(\.\d+)?$/.test(v || '')) return {t:'num', v};
      if (/^[abcmnpxy]$/.test(v || '')) return {t:'var', v};
      throw Error('number');
    }
    function power() {
      const a = atom();
      return take('^') ? {t:'pow', a, b:unary()} : a;
    }
    function unary() {
      if (take('-')) return {t:'neg', a:unary()};
      if (take('+')) return unary();
      return power();
    }
    function product() {
      let a = unary();
      while (tokens[i] === '*' || tokens[i] === '/') {
        const t = tokens[i++] === '*' ? 'mul' : 'div';
        a = {t, a, b:unary()};
      }
      return a;
    }
    function sum() {
      let a = product();
      while (tokens[i] === '+' || tokens[i] === '-') {
        const t = tokens[i++] === '+' ? 'add' : 'sub';
        a = {t, a, b:product()};
      }
      return a;
    }
    const a = sum();
    if (i !== tokens.length) throw Error('format');
    return a;
  }
  const abs = n => n < 0n ? -n : n;
  function fraction(n, d = 1n) {
    if (!d) throw Error('zero');
    if (String(abs(n)).length > 2000 || String(abs(d)).length > 2000) throw Error('large');
    if (d < 0n) { n = -n; d = -d; }
    let a = abs(n), b = d;
    while (b) [a,b] = [b,a%b];
    return {n:n/a, d:d/a};
  }
  function evaluate(v) {
    if (v.t === 'bracket') return evaluate(v.a);
    if (v.t === 'num') {
      const [a,b = ''] = v.v.split('.');
      return fraction(BigInt(a+b), 10n ** BigInt(b.length));
    }
    if (v.t === 'neg') { const a = evaluate(v.a); return fraction(-a.n,a.d); }
    const a = evaluate(v.a), b = evaluate(v.b);
    if (v.t === 'add') return fraction(a.n*b.d+b.n*a.d,a.d*b.d);
    if (v.t === 'sub') return fraction(a.n*b.d-b.n*a.d,a.d*b.d);
    if (v.t === 'mul') return fraction(a.n*b.n,a.d*b.d);
    if (v.t === 'div') return fraction(a.n*b.d,a.d*b.n);
    if (v.t === 'pow') {
      if (b.d !== 1n || abs(b.n) > 100n || (a.n === 0n && b.n <= 0n)) throw Error('exponent');
      if (b.n < 0n) return fraction(a.d ** -b.n,a.n ** -b.n);
      return fraction(a.n ** b.n,a.d ** b.n);
    }
    throw Error('format');
  }
  function strip(v) { return v.t === 'bracket' ? strip(v.a) : v; }
  function scalar(v) {
    v = strip(v);
    return v.t === 'num' || (v.t === 'neg' && scalar(v.a)) || (v.t === 'div' && scalar(v.a) && scalar(v.b));
  }
  function singlePower(v) {
    v = strip(v);
    return v.t === 'pow' && scalar(v.a) && scalar(v.b) && evaluate(v.b).d === 1n;
  }
  function containsSum(v) {
    return v.t === 'add' || v.t === 'sub' || (v.a && containsSum(v.a)) || (v.b && containsSum(v.b));
  }
  function check(q, input) {
    if (q.mode === 'choice') return String(input) === q.answer;
    try {
      const tree = parse(input);
      if (containsSum(tree) || (q.mode === 'power' && !singlePower(tree))) return false;
      const a = evaluate(tree), b = evaluate(parse(q.answer));
      return a.n === b.n && a.d === b.d;
    } catch { return false; }
  }
  function mathNode(v) {
    const a = () => mathNode(v.a), b = () => mathNode(v.b);
    if (v.t === 'num') return `<mn>${esc(v.v.replace('.',','))}</mn>`;
    if (v.t === 'var') return `<mi>${v.v}</mi>`;
    if (v.t === 'bracket') return `<mrow><mo>(</mo>${a()}<mo>)</mo></mrow>`;
    if (v.t === 'neg') return `<mrow><mo>−</mo>${a()}</mrow>`;
    if (v.t === 'root') {
      return v.index === 2 ? `<msqrt>${a()}</msqrt>` : `<mroot>${a()}<mn>${v.index}</mn></mroot>`;
    }
    if (v.t === 'pow') return `<msup>${a()}${mathNode(strip(v.b))}</msup>`;
    if (v.t === 'div') return `<mfrac>${mathNode(strip(v.a))}${mathNode(strip(v.b))}</mfrac>`;
    return `<mrow>${a()}<mo>${{mul:'·',add:'+',sub:'−'}[v.t]}</mo>${b()}</mrow>`;
  }
  function formula(s) {
    try {
      const pieces = s.split('=');
      const label = /r\d+\(/.test(s) ? '' : ` aria-label="${esc(s)}"`;
      return `<math xmlns="http://www.w3.org/1998/Math/MathML" displaystyle="true"${label}><mrow>${pieces.map(p => mathNode(parse(p))).join('<mo>=</mo>')}</mrow></math>`;
    } catch { return esc(s); }
  }
  window.PotenciesAnswers = {check, parse, evaluate, singlePower};
  // Expose the checker independently for the source-answer verification script.
  if (typeof document === 'undefined') return;
  document.querySelectorAll('[data-math]').forEach(n => { n.innerHTML = formula(n.dataset.math); });
  const container = document.querySelector('#exercises');
  let saved = {};
  let storageAvailable = true;
  function storageNote() {
    document.querySelector('#storage-note').textContent = storageAvailable ? 'El progrés es desa en aquest navegador.' : 'El navegador no permet desar el progrés. Pots continuar practicant durant aquesta visita.';
  }
  try {
    const raw = JSON.parse(localStorage.getItem(key) || '{}');
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) saved = raw;
  } catch { storageAvailable = false; }
  const solved = new Set(exercises.filter(q => saved[q.id]?.done && check(q,saved[q.id]?.value)).map(q => q.id));
  const cards = new Map();
  function save() {
    try { localStorage.setItem(key,JSON.stringify(saved)); }
    catch { storageAvailable = false; }
    storageNote();
  }
  function updateProgress() {
    document.querySelector('#progress-label').textContent = `${solved.size} de ${exercises.length} exercicis completats`;
    const priorities = exercises.filter(q => q.priority);
    document.querySelector('#priority-label').textContent = `${priorities.filter(q => solved.has(q.id)).length}/${priorities.length} prioritaris fets`;
    const bar = document.querySelector('#progress-bar');
    bar.max = exercises.length; bar.value = solved.size;
  }
  function source(q) {
    return q.page ? `<a class="exercise__source" href="${esc(sourcePdf)}#page=${q.page}" target="_blank" rel="noopener">PDF · pàg. ${q.page} · ${esc(q.ref)} ↗</a>` : `<span class="exercise__source">${esc(q.ref)}</span>`;
  }
  const groupFeedback = unit.feedback || {
    signes: 'Revisa els parèntesis, el signe i si l’exponent és parell o senar.',
    propietats: 'Comprova si toca sumar, restar o multiplicar els exponents. Escriu primer totes les bases iguals.',
    negatius: 'Revisa la inversió de les bases i els signes dels exponents. Restar un exponent negatiu és sumar-lo.',
    combinades: 'Revisa l’ordre de les operacions i els signes abans de sumar.',
    racionals: 'Comprova què indica el numerador i què indica el denominador de l’exponent.',
    arrels: 'Distingeix el valor de l’arrel principal de les solucions d’una equació.'
  };
  exercises.forEach((q, index) => {
    const card = document.createElement('article');
    card.className = 'exercise'; card.id = q.id; card.dataset.topic = q.group;
    const prompt = esc(q.prompt || (q.mode === 'choice' ? 'Tria la resposta correcta.' : q.mode === 'power' ? 'Simplifica i escriu una única potència.' : 'Calcula i simplifica el resultat.'));
    const order = q.choices?.map((_,i) => (i + index % q.choices.length) % q.choices.length);
    const choices = q.choices ? order.map(i => `<label><input type="radio" name="${q.id}" value="${i}"><span>${formula(q.choices[i])}</span></label>`).join('') : `<label class="input-label" for="answer-${q.id}">La teva resposta<input id="answer-${q.id}" type="text" maxlength="200" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${q.mode === 'power' ? 'base^exponent' : 'Enter, fracció o potències'}"></label>`;
    card.innerHTML = `<div class="exercise__top"><span class="exercise__number">Exercici ${String(index+1).padStart(3,'0')}</span><span class="exercise__tag">${esc(q.level)}</span>${q.priority ? '<span class="priority">Repàs prioritari</span>' : ''}</div><h3>${topics[q.group]}</h3><p class="exercise__prompt">${prompt}</p><div class="exercise__formula">${formula(q.expression)}</div>${source(q)}<form class="exercise-form"><div class="answer">${choices}</div>${q.mode === 'power' ? '<p class="exercise__format">Format: base^exponent. El resultat ha de ser una única potència.</p>' : ''}<div class="exercise__actions"><button type="submit" class="button">Comprova</button><button type="button" class="button button--soft hint" aria-expanded="false" aria-controls="hint-${q.id}">Pista</button><button type="button" class="button button--ghost solution" aria-expanded="false" aria-controls="solution-${q.id}">Solució</button></div></form><p class="feedback" role="status"></p><p class="feedback feedback--hint" id="hint-${q.id}" hidden>${esc(q.hint)}</p><div class="explanation" id="solution-${q.id}" hidden><strong>Resposta: ${formula(q.answer)}</strong><ol>${q.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol></div>`;
    const field = card.querySelector('input[type=text]');
    function value() {
      if (field) return field.value;
      const radio = card.querySelector('input:checked');
      return radio ? q.choices[Number(radio.value)] : '';
    }
    function remember() {
      saved[q.id] = {value:value(),done:solved.has(q.id)}; save();
    }
    const prev = saved[q.id]?.value;
    if (typeof prev === 'string') {
      if (field) field.value = prev;
      else {
        const i = q.choices.indexOf(prev);
        if (i >= 0) card.querySelector(`input[value="${i}"]`).checked = true;
      }
    }
    if (solved.has(q.id)) card.classList.add('exercise--done');
    card.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();
      const feedback = card.querySelector('.feedback');
      if (!value().trim()) { feedback.className = 'feedback feedback--hint'; feedback.textContent = 'Escriu o tria una resposta abans de comprovar-la.'; return; }
      const correct = check(q,value());
      feedback.className = `feedback feedback--${correct ? 'ok' : 'error'}`;
      feedback.textContent = correct ? 'Correcte! Revisa els passos de la resolució.' : `Encara no. ${groupFeedback[q.group]}${q.mode === 'power' ? ' Cal una única potència amb exponent enter.' : ''}`;
      if (correct) {
        solved.add(q.id); card.classList.add('exercise--done'); showSolution(true);
      }
      remember(); updateProgress();
      // Keep the feedback and worked solution visible in the pending view.
      // The next filter change refreshes which completed cards are hidden.
      if (!document.querySelector('#pending-only').checked) applyFilters();
    });
    card.querySelectorAll('input').forEach(input => input.addEventListener('change',remember));
    const hintButton = card.querySelector('.hint'), hint = card.querySelector(`#hint-${q.id}`);
    hintButton.addEventListener('click', () => { hint.hidden = !hint.hidden; hintButton.setAttribute('aria-expanded',String(!hint.hidden)); });
    const solutionButton = card.querySelector('.solution'), solution = card.querySelector('.explanation');
    function showSolution(show) {
      solution.hidden = !show;
      solution.classList.toggle('explanation--visible',show);
      solutionButton.setAttribute('aria-expanded',String(show));
      solutionButton.textContent = show ? 'Amaga la solució' : 'Solució';
    }
    solutionButton.addEventListener('click', () => showSolution(solution.hidden));
    container.appendChild(card); cards.set(q.id,card);
  });
  const filters = document.querySelector('#filters');
  function applyFilters() {
    const topic = document.querySelector('#topic').value, difficulty = document.querySelector('#difficulty').value;
    const priority = document.querySelector('#priority-only').checked, pending = document.querySelector('#pending-only').checked;
    let visible = 0;
    exercises.forEach(q => {
      const show = (topic === 'all' || q.group === topic) && (difficulty === 'all' || q.level === difficulty) && (!priority || q.priority) && (!pending || !solved.has(q.id));
      cards.get(q.id).hidden = !show;
      if (show) visible++;
    });
    document.querySelector('#visible-count').textContent = `${visible} de ${exercises.length} exercicis visibles · ${exercises.filter(q => q.level === 'Alt').length} de dificultat alta en total`;
    document.querySelector('#empty').hidden = visible !== 0;
  }
  filters.addEventListener('change',applyFilters);
  filters.addEventListener('reset', () => { setTimeout(applyFilters,0); });
  document.querySelectorAll('[data-topic]').forEach(link => {
    if (link.tagName !== 'A') return;
    link.addEventListener('click', () => {
      filters.reset(); document.querySelector('#topic').value = link.dataset.topic; applyFilters();
    });
  });
  const reset = document.querySelector('#reset-progress');
  let resetArmed = false;
  reset.addEventListener('click', () => {
    if (!resetArmed) { resetArmed = true; reset.textContent = 'Confirma: esborra totes les respostes i el progrés'; return; }
    solved.clear(); saved = {}; save();
    cards.forEach(card => {
      card.classList.remove('exercise--done');
      card.querySelectorAll('input').forEach(input => { if (input.type === 'radio') input.checked = false; else input.value = ''; });
      const feedback = card.querySelector('.feedback'); feedback.textContent = '';
      const hint = card.querySelector('[id^="hint-"]'); hint.hidden = true;
      const solution = card.querySelector('.explanation'); solution.hidden = true; solution.classList.remove('explanation--visible');
      card.querySelector('.hint').setAttribute('aria-expanded','false');
      const button = card.querySelector('.solution'); button.setAttribute('aria-expanded','false'); button.textContent = 'Solució';
    });
    resetArmed = false; reset.textContent = 'Esborra el progrés'; updateProgress(); applyFilters();
  });
  updateProgress(); storageNote(); applyFilters();
})();
