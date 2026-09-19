const exercises = [
  {
    tag: "enters",
    title: "Ordena enters",
    prompt: "Quin és el nombre més gran?",
    type: "choice",
    options: ["-2", "-8", "-15", "-21"],
    answer: "-2",
    hint: "A la recta numèrica, el nombre més gran és el que queda més a la dreta.",
    explanation: "-2 és més a prop del zero i queda més a la dreta que -8, -15 i -21."
  },
  {
    tag: "enters",
    title: "Valor absolut",
    prompt: "Escriu el valor absolut de -13.",
    type: "text",
    answer: "13",
    hint: "El valor absolut és la distància al zero.",
    explanation: "|-13| = 13 perquè la distància entre -13 i 0 és 13."
  },
  {
    tag: "decimals",
    title: "Classifica el decimal",
    prompt: "El nombre 4,252525... és:",
    type: "choice",
    options: ["decimal periòdic pur", "decimal exacte", "decimal no periòdic", "nombre enter"],
    answer: "decimal periòdic pur",
    hint: "El bloc 25 es repeteix des del primer decimal.",
    explanation: "És periòdic pur perquè el període comença just després de la coma."
  },
  {
    tag: "aproximacions",
    title: "Arrodoniment",
    prompt: "Arrodoneix 587,654 a les dècimes.",
    type: "text",
    answer: "587,7",
    alternatives: ["587.7"],
    hint: "Mira la xifra de les centèsimes.",
    explanation: "La xifra de les centèsimes és 5, per tant la dècima puja de 6 a 7."
  },
  {
    tag: "aproximacions",
    title: "Truncament",
    prompt: "Trunca 32,56789 a les centèsimes.",
    type: "text",
    answer: "32,56",
    alternatives: ["32.56"],
    hint: "No arrodoneixis: talla després de les centèsimes.",
    explanation: "Les centèsimes són el 6. La resta de xifres s'eliminen: 32,56."
  },
  {
    tag: "errors",
    title: "Error absolut",
    prompt: "Si el valor real és 8,65 i l'aproximació és 9, quin és l'error absolut?",
    type: "text",
    answer: "0,35",
    alternatives: ["0.35"],
    hint: "Calcula |8,65 - 9|.",
    explanation: "Ea = |8,65 - 9| = 0,35."
  },
  {
    tag: "fraccions",
    title: "Fracció pròpia",
    prompt: "Quina d'aquestes fraccions és pròpia?",
    type: "choice",
    options: ["2/5", "5/3", "9/4", "8/2"],
    answer: "2/5",
    hint: "En una fracció pròpia, el numerador és més petit que el denominador.",
    explanation: "2/5 és pròpia perquè 2 < 5."
  },
  {
    tag: "fraccions",
    title: "Nombre mixt",
    prompt: "Escriu 9/4 com a nombre mixt. Fes servir el format 2 1/4.",
    type: "text",
    answer: "2 1/4",
    hint: "Divideix 9 entre 4: quocient 2 i residu 1.",
    explanation: "9 = 4 · 2 + 1, per això 9/4 = 2 1/4."
  },
  {
    tag: "operacions",
    title: "Suma de fraccions",
    prompt: "Calcula 1/3 + 2/5 i simplifica.",
    type: "text",
    answer: "11/15",
    hint: "El denominador comú de 3 i 5 és 15.",
    explanation: "1/3 = 5/15 i 2/5 = 6/15. La suma és 11/15."
  },
  {
    tag: "operacions",
    title: "Producte de fraccions",
    prompt: "Calcula (-2/5) · (35/4) i simplifica.",
    type: "text",
    answer: "-7/2",
    hint: "Multiplica numeradors i denominadors, i després simplifica.",
    explanation: "(-2 · 35)/(5 · 4) = -70/20 = -7/2."
  },
  {
    tag: "operacions",
    title: "Divisió de fraccions",
    prompt: "Calcula 4/7 : 8/21 i simplifica.",
    type: "text",
    answer: "3/2",
    hint: "Multiplica per la inversa de la segona fracció.",
    explanation: "4/7 : 8/21 = 4/7 · 21/8 = 84/56 = 3/2."
  },
  {
    tag: "decimal-fraccio",
    title: "Fracció a decimal",
    prompt: "9/25 dona un decimal...",
    type: "choice",
    options: ["exacte", "periòdic pur", "periòdic mixt", "no periòdic"],
    answer: "exacte",
    hint: "25 només té factor primer 5.",
    explanation: "9/25 = 0,36, i el decimal s'acaba."
  },
  {
    tag: "decimal-fraccio",
    title: "Decimal exacte a fracció",
    prompt: "Escriu 2,3 com a fracció irreductible.",
    type: "text",
    answer: "23/10",
    hint: "Hi ha una xifra decimal, per tant el denominador és 10.",
    explanation: "2,3 = 23/10."
  },
  {
    tag: "decimal-fraccio",
    title: "Periòdic pur a fracció",
    prompt: "Escriu 3,212121... com a fracció irreductible.",
    type: "text",
    answer: "106/33",
    hint: "Si N = 3,212121..., compara 100N i N.",
    explanation: "100N = 321,212121... i N = 3,212121..., així 99N = 318 i N = 318/99 = 106/33."
  },
  {
    tag: "reals",
    title: "Racional o irracional",
    prompt: "Quin nombre és irracional?",
    type: "choice",
    options: ["√2", "0,25", "7/3", "-4"],
    answer: "√2",
    alternatives: ["sqrt2", "arrel de 2"],
    hint: "Busca el que no es pot expressar com una fracció.",
    explanation: "√2 és irracional: té decimals infinits no periòdics."
  },
  {
    tag: "reals",
    title: "Aproximació per defecte",
    prompt: "Aproxima π per defecte amb tres xifres decimals.",
    type: "text",
    answer: "3,141",
    alternatives: ["3.141"],
    hint: "Per defecte significa quedar-se per sota del valor real.",
    explanation: "π ≈ 3,141592..., així que per defecte amb tres decimals és 3,141."
  },
  {
    tag: "intervals",
    title: "Notació d'interval",
    prompt: "Escriu amb notació d'interval: -5 < x ≤ -4.",
    type: "text",
    answer: "(-5,-4]",
    alternatives: ["(-5, -4]"],
    hint: "Parèntesi si no s'inclou, claudàtor si s'inclou.",
    explanation: "-5 no s'inclou i -4 sí, per tant és (-5, -4]."
  },
  {
    tag: "intervals",
    title: "Semirecta",
    prompt: "Quina notació correspon a x > 3?",
    type: "choice",
    options: ["(3, +∞)", "[3, +∞)", "(-∞, 3)", "(-∞, 3]"],
    answer: "(3, +∞)",
    hint: "No inclou el 3 i avança cap als nombres més grans.",
    explanation: "x > 3 és la semirecta oberta (3, +∞)."
  },
  {
    tag: "intervals",
    title: "Intersecció",
    prompt: "Calcula (3, 8) ∩ (4, 9).",
    type: "text",
    answer: "(4,8)",
    alternatives: ["(4, 8)"],
    hint: "La intersecció és només la part comuna.",
    explanation: "Els nombres comuns són més grans que 4 i més petits que 8: (4, 8)."
  },
  {
    tag: "recreatives",
    title: "Detecta el truc",
    prompt: "Simplificar 26 666 / 66 665 esborrant sisos és un mètode vàlid sempre?",
    type: "choice",
    options: ["No, només pot donar coincidències curioses", "Sí, sempre funciona", "Sí, però només amb nombres parells", "Només funciona amb decimals exactes"],
    answer: "No, només pot donar coincidències curioses",
    hint: "Una igualtat pot sortir bé per casualitat sense justificar un procediment general.",
    explanation: "És una curiositat recreativa: que funcioni en alguns casos no converteix el procediment en una regla matemàtica."
  }
];

const storageKey = "markel-3eso-nombres-progress";
const grid = document.querySelector("#exercise-grid");
const template = document.querySelector("#exercise-template");
const progressLabel = document.querySelector("#progress-label");
const scoreLabel = document.querySelector("#score-label");
const progressBar = document.querySelector("#progress-bar");
const resetButton = document.querySelector("#reset-progress");

let solved = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));

function normalize(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*/g, ",")
    .replace(/\s*\/\s*/g, "/")
    .replace(/\s*∞\s*/g, "∞");
}

function acceptedAnswers(exercise) {
  return [exercise.answer, ...(exercise.alternatives || [])].map(normalize);
}

function updateProgress() {
  const total = exercises.length;
  const done = solved.size;
  progressLabel.textContent = `${done} de ${total} exercicis completats`;
  scoreLabel.textContent = `${done} punts`;
  progressBar.style.width = `${(done / total) * 100}%`;
  localStorage.setItem(storageKey, JSON.stringify([...solved]));
}

function markFeedback(feedback, type, text) {
  feedback.className = `feedback feedback--${type}`;
  feedback.textContent = text;
}

function renderAnswer(container, exercise, index) {
  if (exercise.type === "choice") {
    exercise.options.forEach((option, optionIndex) => {
      const id = `exercise-${index}-${optionIndex}`;
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="exercise-${index}" value="${option}" id="${id}"> <span>${option}</span>`;
      container.append(label);
    });
    return;
  }

  const input = document.createElement("input");
  input.type = "text";
  input.autocomplete = "off";
  input.inputMode = "text";
  input.placeholder = "Escriu la resposta";
  container.append(input);
}

function getAnswer(card, exercise) {
  if (exercise.type === "choice") {
    return card.querySelector("input:checked")?.value || "";
  }
  return card.querySelector("input[type='text']").value;
}

function renderExercises() {
  exercises.forEach((exercise, index) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.dataset.index = index;
    node.querySelector(".exercise__number").textContent = `Exercici ${index + 1}`;
    node.querySelector(".exercise__tag").textContent = exercise.tag;
    node.querySelector(".exercise__title").textContent = exercise.title;
    node.querySelector(".exercise__prompt").textContent = exercise.prompt;
    const answer = node.querySelector(".answer");
    const feedback = node.querySelector(".feedback");
    const explanation = node.querySelector(".explanation");
    explanation.textContent = exercise.explanation;
    renderAnswer(answer, exercise, index);

    if (solved.has(index)) {
      node.classList.add("exercise--done");
      markFeedback(feedback, "ok", "Ja completat.");
    }

    node.querySelector(".check").addEventListener("click", () => {
      const value = normalize(getAnswer(node, exercise));
      if (!value) {
        markFeedback(feedback, "error", "Escriu o tria una resposta.");
        return;
      }
      if (acceptedAnswers(exercise).includes(value)) {
        solved.add(index);
        node.classList.add("exercise--done");
        markFeedback(feedback, "ok", "Correcte.");
        explanation.classList.add("explanation--visible");
        updateProgress();
      } else {
        markFeedback(feedback, "error", "Encara no. Revisa el concepte i torna-ho a provar.");
      }
    });

    node.querySelector(".hint").addEventListener("click", () => {
      markFeedback(feedback, "hint", exercise.hint);
    });

    node.querySelector(".solution").addEventListener("click", () => {
      markFeedback(feedback, "hint", `Solució: ${exercise.answer}`);
      explanation.classList.add("explanation--visible");
    });

    grid.append(node);
  });
}

resetButton.addEventListener("click", () => {
  solved = new Set();
  localStorage.removeItem(storageKey);
  document.querySelectorAll(".exercise").forEach((card) => {
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

renderExercises();
updateProgress();
