const apartats = window.NOMBRES_APARTATS || [];
const currentId = document.body.dataset.apartat;
const apartat = apartats.find((item) => item.id === currentId);
const app = document.querySelector("#app");

function html(strings, ...values) {
  return strings.map((s, i) => s + (values[i] ?? "")).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalize(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replaceAll("−", "-")
    .replaceAll("≤", "<=")
    .replaceAll("≥", ">=")
    .replaceAll(" ", "")
    .replaceAll("·", "*")
    .replaceAll("infinito", "∞")
    .replaceAll("infinity", "∞")
    .replaceAll("+∞", "∞")
    .replaceAll("u", "∪")
    .replaceAll("∩", "∩");
}

function acceptedAnswers(exercise) {
  return [exercise.answer, ...(exercise.alternatives || [])].map(normalize);
}

function renderChoice(exercise, index) {
  return exercise.options.map((option, optionIndex) => {
    const id = `exercise-${index}-${optionIndex}`;
    return html`<label for="${id}"><input id="${id}" type="radio" name="exercise-${index}" value="${escapeHtml(option)}"> <span>${escapeHtml(option)}</span></label>`;
  }).join("");
}

function renderText(index) {
  return html`<input type="text" autocomplete="off" inputmode="text" aria-label="Resposta de l'exercici ${index + 1}" placeholder="Escriu la resposta">`;
}

function render() {
  if (!apartat) {
    app.innerHTML = "<main><p>No s'ha trobat aquest apartat.</p></main>";
    return;
  }

  const currentIndex = apartats.findIndex((item) => item.id === apartat.id);
  const previous = apartats[currentIndex - 1];
  const next = apartats[currentIndex + 1];
  const pdfHref = `../../../sources/matematicas/nombres/${apartat.file.replace(".html", ".pdf")}`;

  app.innerHTML = html`
    <header class="hero">
      <div class="hero__inner">
        <a class="back" href="index.html">← Arbre de la unitat</a>
        <p class="eyebrow">Matemàtiques · 3r ESO · Unitat 1 · Apartat ${apartat.number}</p>
        <h1>${escapeHtml(apartat.title)}</h1>
        <p class="hero__intro">${escapeHtml(apartat.intro)}</p>
        <nav class="section-nav" aria-label="Navegació de l'apartat">
          <a href="#teoria">Teoria</a>
          <a href="#exemples">Exemples</a>
          <a href="#practica">Exercicis</a>
        </nav>
        <a class="pdf-callout" href="${pdfHref}" target="_blank" rel="noopener">Obre el PDF de teoria completa</a>
        <div class="progress">
          <div><span id="progress-label">0 exercicis completats</span><strong id="score-label">0 punts</strong></div>
          <div class="progress__track"><span id="progress-bar"></span></div>
          <button class="reset-progress" id="reset-progress" type="button">Esborra el progrés</button>
        </div>
      </div>
    </header>
    <main>
      <div class="crumbs">
        <a href="../index.html">Matemàtiques</a>
        <span>›</span>
        <a href="index.html">Unitat 1 · Nombres</a>
        <span>›</span>
        <strong>${escapeHtml(apartat.title)}</strong>
      </div>

      <section class="unit-section" id="teoria">
        <p class="eyebrow">Teoria desenvolupada</p>
        <h2>${escapeHtml(apartat.subtitle)}</h2>
        <div class="theory-grid">
          ${apartat.theory.map((block) => html`
            <article class="theory-card">
              <h3>${escapeHtml(block.title)}</h3>
              <p>${escapeHtml(block.text)}</p>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="unit-section" id="exemples">
        <p class="eyebrow">Exemples guiats</p>
        <h2>Com es treballa</h2>
        <div class="example-grid">
          ${apartat.examples.map((example) => html`
            <article class="example">
              <h3>${escapeHtml(example.title)}</h3>
              <ol>${example.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="unit-section" id="practica">
        <p class="eyebrow">Pràctica graduada</p>
        <h2>Exercicis autocorregibles</h2>
        <p class="level__intro">Els exercicis passen de càlcul directe a manipulació i problemes. Escriu les fraccions com <span class="formula">a/b</span> i els intervals sense por als símbols: també s'accepten algunes variants equivalents.</p>
        <div class="exercise-grid">
          ${apartat.exercises.map((exercise, index) => html`
            <article class="exercise" data-index="${index}">
              <div class="exercise__top">
                <span class="exercise__number">Exercici ${index + 1}</span>
                <span class="exercise__tag">${escapeHtml(exercise.level)}</span>
              </div>
              <h3 class="exercise__title">${escapeHtml(exercise.title)}</h3>
              <p class="exercise__prompt">${escapeHtml(exercise.prompt)}</p>
              <div class="answer">${exercise.options ? renderChoice(exercise, index) : renderText(index)}</div>
              <div class="exercise__actions">
                <button class="button check" type="button">Comprova</button>
                <button class="button button--soft hint" type="button">Pista</button>
                <button class="button button--ghost solution" type="button">Solució</button>
              </div>
              <p class="feedback" role="status"></p>
              <div class="explanation">${escapeHtml(exercise.explanation)}</div>
            </article>
          `).join("")}
        </div>
      </section>

      <nav class="pager" aria-label="Apartat anterior i següent">
        ${previous ? `<a href="${previous.file}">← ${escapeHtml(previous.title)}</a>` : `<a href="index.html">← Arbre de la unitat</a>`}
        ${next ? `<a href="${next.file}">${escapeHtml(next.title)} →</a>` : `<a href="index.html">Arbre de la unitat →</a>`}
      </nav>
    </main>
  `;
}

function wireExercises() {
  const storageKey = `markel-3eso-nombres-${apartat.id}`;
  const cards = Array.from(document.querySelectorAll(".exercise"));
  const progressLabel = document.querySelector("#progress-label");
  const scoreLabel = document.querySelector("#score-label");
  const progressBar = document.querySelector("#progress-bar");
  const resetButton = document.querySelector("#reset-progress");
  let solved = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));

  function feedback(card, type, text) {
    const node = card.querySelector(".feedback");
    node.className = `feedback feedback--${type}`;
    node.textContent = text;
  }

  function updateProgress() {
    const done = solved.size;
    const total = cards.length;
    progressLabel.textContent = `${done} de ${total} exercicis completats`;
    scoreLabel.textContent = `${done} punts`;
    progressBar.style.width = `${(done / total) * 100}%`;
    localStorage.setItem(storageKey, JSON.stringify([...solved]));
  }

  function getValue(card, exercise) {
    if (exercise.options) return card.querySelector("input:checked")?.value || "";
    return card.querySelector("input[type='text']").value;
  }

  cards.forEach((card) => {
    const index = Number(card.dataset.index);
    const exercise = apartat.exercises[index];
    if (solved.has(index)) {
      card.classList.add("exercise--done");
      feedback(card, "ok", "Ja completat.");
    }
    card.querySelector(".check").addEventListener("click", () => {
      const value = normalize(getValue(card, exercise));
      if (!value) {
        feedback(card, "error", "Escriu o tria una resposta.");
        return;
      }
      if (acceptedAnswers(exercise).includes(value)) {
        solved.add(index);
        card.classList.add("exercise--done");
        feedback(card, "ok", "Correcte.");
        card.querySelector(".explanation").classList.add("explanation--visible");
        updateProgress();
      } else {
        feedback(card, "error", "Encara no. Revisa els signes, simplifica o comprova la notació.");
      }
    });
    card.querySelector(".hint").addEventListener("click", () => feedback(card, "hint", exercise.hint));
    card.querySelector(".solution").addEventListener("click", () => {
      feedback(card, "hint", `Solució: ${exercise.answer}`);
      card.querySelector(".explanation").classList.add("explanation--visible");
    });
  });

  resetButton.addEventListener("click", () => {
    solved = new Set();
    localStorage.removeItem(storageKey);
    cards.forEach((card) => {
      card.classList.remove("exercise--done");
      card.querySelector(".feedback").className = "feedback";
      card.querySelector(".feedback").textContent = "";
      card.querySelector(".explanation").classList.remove("explanation--visible");
      card.querySelectorAll("input").forEach((input) => {
        if (input.type === "radio") input.checked = false;
        if (input.type === "text") input.value = "";
      });
    });
    updateProgress();
  });

  updateProgress();
}

render();
if (apartat) wireExercises();
