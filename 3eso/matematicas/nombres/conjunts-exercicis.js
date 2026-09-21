"use strict";
window.SET_EXERCISES = [
  {
    "id": "count",
    "title": "Comptar objectes",
    "prompt": "Una classe té 24 alumnes. Quin és el conjunt més petit de la cadena N, Z, Q, R que conté 24?",
    "answers": [
      "N"
    ],
    "hints": [
      "Distingeix el conjunt més petit de tots els conjunts als quals pertany."
    ],
    "steps": [
      "24 és un enter no negatiu: és natural.",
      "També pertany a Z, Q i R, però el conjunt més petit de la cadena és N."
    ],
    "error": "Un natural també és enter, racional i real; aquí demanem el conjunt més petit.",
    "choices": [
      "Z",
      "Q",
      "N",
      "R"
    ],
    "number": 1,
    "level": 0
  },
  {
    "id": "debt",
    "title": "Un saldo negatiu",
    "prompt": "Un compte té un saldo de −8 €. Quin és el conjunt més petit de N, Z, Q, R que conté −8?",
    "answers": [
      "Z"
    ],
    "hints": [
      "El signe negatiu impedeix que sigui natural, però no que sigui enter."
    ],
    "steps": [
      "−8 és enter i no és natural.",
      "També és racional (−8 = −8/1) i real."
    ],
    "error": "Ser negatiu no vol dir ser irracional.",
    "choices": [
      "N",
      "Z",
      "Q",
      "R"
    ],
    "number": 2,
    "level": 0
  },
  {
    "id": "membership",
    "title": "Totes les pertinences",
    "prompt": "A quins dels quatre conjunts pertany el nombre 7?",
    "answers": [
      "N, Z, Q i R"
    ],
    "hints": [
      "Un conjunt inclòs en un altre en conserva tots els elements."
    ],
    "steps": [
      "7 pertany a N; com que N ⊂ Z ⊂ Q ⊂ R, pertany als quatre.",
      "En particular, 7 = 7/1 és racional."
    ],
    "error": "No et quedis només amb el conjunt més petit: es demanen totes les pertinences.",
    "choices": [
      "Només N",
      "N i Z, però no Q",
      "Q i R, però no N",
      "N, Z, Q i R"
    ],
    "number": 3,
    "level": 0
  },
  {
    "id": "zero",
    "title": "El zero",
    "prompt": "Segons la convenció de la guia, quina afirmació sobre 0 és correcta?",
    "answers": [
      "És natural, enter, racional i real; no és positiu ni negatiu."
    ],
    "hints": [
      "La guia inclou el zero dins de N. Revisa separadament el signe."
    ],
    "steps": [
      "En aquesta guia, N comença en 0.",
      "0 també és enter, racional (0 = 0/1) i real; no és positiu ni negatiu."
    ],
    "error": "La pertinença a N depèn de la convenció indicada, però zero mai no és positiu ni negatiu.",
    "choices": [
      "És positiu perquè és natural.",
      "És natural, enter, racional i real; no és positiu ni negatiu.",
      "No pertany a cap conjunt.",
      "És enter però no racional."
    ],
    "number": 4,
    "level": 0
  },
  {
    "id": "map",
    "title": "Reconstrueix el mapa",
    "prompt": "Els rectangles representen els quatre conjunts N, Z, Q i R. Escriu la lletra del conjunt que correspon a A, B, C i D.",
    "answers": [
      "R",
      "Q",
      "Z",
      "N"
    ],
    "hints": [
      "El rectangle més petit representa el conjunt que està inclòs en tots els altres."
    ],
    "steps": [
      "D = N; C = Z; B = Q; A = R.",
      "La cadena és N ⊂ Z ⊂ Q ⊂ R."
    ],
    "error": "Segueix la inclusió dels rectangles, no l’ordre alfabètic de les lletres.",
    "visual": "sets",
    "labels": [
      "A",
      "B",
      "C",
      "D"
    ],
    "kind": "sets",
    "number": 5,
    "level": 0
  },
  {
    "id": "minimum",
    "title": "Quin conjunt és suficient?",
    "prompt": "Per a cada nombre, escriu el conjunt més petit de la cadena N, Z, Q, R.",
    "answers": [
      "Z",
      "Q",
      "R"
    ],
    "hints": [
      "Un enter negatiu continua sent enter. Un decimal finit es pot escriure com una fracció."
    ],
    "steps": [
      "−12 és enter: Z.",
      "0,125 = 1/8 és racional i no enter: Q.",
      "π és irracional: dels quatre conjunts, només pertany a R."
    ],
    "error": "Classifica el valor: signe negatiu, decimals i irracionalitat són propietats diferents.",
    "labels": [
      "−12",
      "0,125",
      "π"
    ],
    "kind": "sets",
    "number": 6,
    "level": 1
  },
  {
    "id": "irrational",
    "title": "Fora de Q, dins de R",
    "prompt": "Quin nombre és irracional?",
    "answers": [
      "√2"
    ],
    "hints": [
      "No totes les arrels són irracionals: simplifica-les quan sigui possible."
    ],
    "steps": [
      "√2 no es pot expressar com una fracció d’enters.",
      "√9 = 3 és natural; −0,12 = −3/25 i 1/3 són racionals."
    ],
    "error": "Tenir una arrel o decimals no basta per ser irracional.",
    "choices": [
      "√9",
      "−0,12",
      "√2",
      "1/3"
    ],
    "number": 7,
    "level": 1
  },
  {
    "id": "infinity",
    "title": "Infinit no vol dir irracional",
    "prompt": "El nombre 0,333… repeteix el 3 indefinidament. Quina conclusió és correcta?",
    "answers": [
      "És racional perquè és igual a 1/3."
    ],
    "hints": [
      "Diferencia infinit periòdic d’infinit no periòdic."
    ],
    "steps": [
      "0,333… = 1/3, amb el 3 repetit per sempre.",
      "Els decimals periòdics són racionals encara que tinguin infinites xifres."
    ],
    "error": "El que diferencia els irracionals és la manca de període, no només la infinitud.",
    "choices": [
      "És irracional perquè no s’acaba.",
      "És natural perquè només hi apareix el 3.",
      "No és real.",
      "És racional perquè és igual a 1/3."
    ],
    "number": 8,
    "level": 1
  },
  {
    "id": "fraction",
    "title": "Una part de la unitat",
    "prompt": "Quina descripció correspon a 3/4?",
    "answers": [
      "És racional i real, però no enter ni natural."
    ],
    "hints": [
      "Compara el valor de la fracció amb 0 i 1."
    ],
    "steps": [
      "3/4 = 0,75 queda entre 0 i 1, sense ser cap dels dos.",
      "És racional perquè és un quocient d’enters amb denominador no nul."
    ],
    "error": "Una fracció no sempre és un nombre no enter, però 3/4 sí que ho és.",
    "choices": [
      "És enter perquè 3 i 4 són enters.",
      "És irracional perquè no és enter.",
      "És racional i real, però no enter ni natural.",
      "Només pertany a R, no a Q."
    ],
    "number": 9,
    "level": 1
  },
  {
    "id": "parity",
    "title": "Dues classificacions alhora",
    "prompt": "Com es classifica −4 segons el signe i la paritat?",
    "answers": [
      "Negatiu i parell"
    ],
    "hints": [
      "Un nombre és parell si és un múltiple enter de 2."
    ],
    "steps": [
      "−4 és negatiu i −4 = 2 · (−2), de manera que és parell.",
      "Signe i paritat són classificacions diferents que es poden combinar."
    ],
    "error": "Els nombres negatius també poden ser parells.",
    "choices": [
      "Negatiu i imparell",
      "Positiu i parell",
      "Negatiu i parell",
      "No té paritat perquè és negatiu"
    ],
    "number": 10,
    "level": 1
  },
  {
    "id": "pure",
    "title": "Reconèixer el període",
    "prompt": "En 0,272727… el bloc 27 es repeteix per sempre. Quin tipus de decimal és?",
    "answers": [
      "Periòdic pur"
    ],
    "hints": [
      "Fixa’t en si la repetició comença immediatament després de la coma."
    ],
    "steps": [
      "El bloc 27 comença a la primera xifra decimal.",
      "És periòdic pur, amb període mínim 27; per tant, és racional."
    ],
    "error": "Compta on comença el període, no quantes xifres té.",
    "choices": [
      "Exacte",
      "Periòdic pur",
      "Periòdic mixt",
      "Infinit no periòdic"
    ],
    "number": 11,
    "level": 2
  },
  {
    "id": "mixed",
    "title": "Anteperíode i període",
    "prompt": "En 5,127777… el 7 es repeteix indefinidament. Escriu l’anteperíode i el període mínim.",
    "answers": [
      "12",
      "7"
    ],
    "hints": [
      "L’anteperíode és decimal: no inclou el 5 de la part entera."
    ],
    "steps": [
      "Després de la coma apareix 12 abans de començar la repetició del 7.",
      "Anteperíode: 12; període mínim: 7. És periòdic mixt."
    ],
    "error": "No incloguis la part entera ni cap repetició sobrera al període mínim.",
    "labels": [
      "Anteperíode",
      "Període mínim"
    ],
    "kind": "digits",
    "number": 12,
    "level": 2
  },
  {
    "id": "finite",
    "title": "Demostra que és racional",
    "prompt": "Escriu −0,12 com una fracció irreductible amb denominador positiu.",
    "answers": [
      "-3",
      "25"
    ],
    "hints": [
      "Primer expressa les centèsimes com una fracció i simplifica-la."
    ],
    "steps": [
      "−0,12 = −12/100.",
      "Divideix numerador i denominador entre 4: −3/25. No tenen cap divisor comú més gran que 1."
    ],
    "error": "Es demana la fracció irreductible, amb el signe al numerador.",
    "labels": [
      "Numerador",
      "Denominador"
    ],
    "kind": "integers",
    "number": 13,
    "level": 2
  },
  {
    "id": "fraction-types",
    "title": "Pròpia, impròpia o entera?",
    "prompt": "Quina classificació és correcta?",
    "answers": [
      "3/4 és pròpia; 7/4 és impròpia; 8/4 representa un enter."
    ],
    "hints": [
      "Compara numerador i denominador; després calcula si la divisió és exacta."
    ],
    "steps": [
      "3 < 4, per tant 3/4 és pròpia i menor que 1.",
      "7 > 4, per tant 7/4 és impròpia. 8/4 = 2: també és impròpia, però representa un enter."
    ],
    "error": "La forma de fracció no impedeix que el valor sigui enter.",
    "choices": [
      "Les tres són pròpies.",
      "8/4 és irracional perquè té denominador.",
      "3/4 és pròpia; 7/4 és impròpia; 8/4 representa un enter.",
      "7/4 és natural perquè és més gran que 1."
    ],
    "number": 14,
    "level": 2
  },
  {
    "id": "same-value",
    "title": "Tres escriptures, un valor",
    "prompt": "Quina relació hi ha entre 3/4, 0,75 i 75%?",
    "answers": [
      "Són el mateix racional no enter."
    ],
    "hints": [
      "Expressa el percentatge com una fracció sobre 100."
    ],
    "steps": [
      "75% = 75/100 = 3/4 = 0,75.",
      "Les tres expressions representen el mateix valor i tenen les mateixes pertinences: Q i R."
    ],
    "error": "Un canvi d’escriptura no canvia el nombre ni el conjunt al qual pertany.",
    "choices": [
      "Són el mateix racional no enter.",
      "El percentatge és natural i els altres no.",
      "0,75 és irracional perquè té coma.",
      "Són tres valors diferents."
    ],
    "number": 15,
    "level": 2
  },
  {
    "id": "nonperiodic",
    "title": "Un patró que no és un període",
    "prompt": "Construïm 0,101001000100001… afegint cada vegada un zero més entre dos uns. Quin tipus de nombre és?",
    "answers": [
      "Irracional: és infinit i no periòdic."
    ],
    "hints": [
      "Una regla de construcció no és necessàriament un bloc que es repeteix."
    ],
    "steps": [
      "Els blocs de zeros són cada vegada més llargs: no hi ha cap període fix que es repeteixi per sempre.",
      "És un decimal infinit no periòdic, per tant irracional i real."
    ],
    "error": "Per ser periòdic cal repetir un bloc fix, no simplement seguir una regla.",
    "choices": [
      "Periòdic pur: el període és 10.",
      "Exacte: només fa servir zeros i uns.",
      "Racional: qualsevol patró és un període.",
      "Irracional: és infinit i no periòdic."
    ],
    "number": 16,
    "level": 3
  },
  {
    "id": "root",
    "title": "Corregeix una afirmació",
    "prompt": "En Marc diu: «√16 és irracional perquè té una arrel». Quina és la correcció adequada?",
    "answers": [
      "√16 = 4; és natural i també enter, racional i real."
    ],
    "hints": [
      "Calcula el valor abans de classificar l’expressió."
    ],
    "steps": [
      "√16 = 4.",
      "El símbol d’arrel no determina el conjunt: 4 pertany a N, Z, Q i R."
    ],
    "error": "No classifiquis només per l’aspecte de l’expressió.",
    "choices": [
      "Té raó: totes les arrels són irracionals.",
      "√16 = 4; és natural i també enter, racional i real.",
      "√16 només és real, perquè 16 és positiu.",
      "√16 = −4; només és enter."
    ],
    "number": 17,
    "level": 3
  },
  {
    "id": "line",
    "title": "Racionals i irracionals a la recta",
    "prompt": "A representa −1/2, B representa √2 i C representa π. Quins punts corresponen a nombres irracionals?",
    "answers": [
      "B i C"
    ],
    "hints": [
      "La posició a la dreta o a l’esquerra de zero no determina si un nombre és racional."
    ],
    "steps": [
      "A és racional perquè és una fracció d’enters.",
      "B i C són irracionals. Tots tres pertanyen a R i es poden situar a la mateixa recta."
    ],
    "error": "Un nombre positiu no és necessàriament racional; un de negatiu tampoc no és necessàriament irracional.",
    "visual": "line",
    "choices": [
      "Només A",
      "A i B",
      "B i C",
      "Cap: tots els punts de la recta són racionals."
    ],
    "number": 18,
    "level": 3
  },
  {
    "id": "uses",
    "title": "Tria el conjunt necessari",
    "prompt": "Per a cada quantitat, escriu el conjunt més petit de N, Z, Q, R que en conté el valor exacte.",
    "answers": [
      "N",
      "Z",
      "Q",
      "R"
    ],
    "hints": [
      "Pensa en el valor exacte, no només en el tipus de situació."
    ],
    "steps": [
      "24 alumnes: N, perquè és un recompte enter no negatiu.",
      "Saldo de −8 €: Z. 3/4 L: Q, perquè no és enter.",
      "Diagonal d’un quadrat de costat 1: √2, que és irracional; entre els quatre conjunts, cal R."
    ],
    "error": "Les longituds poden ser racionals o irracionals. Aquí es demana el valor exacte de cada cas.",
    "labels": [
      "24 alumnes",
      "Saldo de −8 €",
      "3/4 L",
      "Diagonal d’un quadrat de costat 1"
    ],
    "kind": "sets",
    "number": 19,
    "level": 3
  },
  {
    "id": "final",
    "title": "Classificació final",
    "prompt": "Escriu el conjunt més petit de N, Z, Q, R per a cada expressió. Si no defineix cap nombre real, escriu «cap».",
    "answers": [
      "N",
      "Z",
      "Q",
      "R",
      "cap"
    ],
    "hints": [
      "Simplifica fraccions i arrels abans de decidir.",
      "Revisa especialment el denominador de l’última expressió."
    ],
    "steps": [
      "6/3 = 2: N. −√9 = −3: Z.",
      "0,1666… (es repeteix el 6) = 1/6: Q.",
      "√2: R, perquè és irracional.",
      "6/0 no està definit: cap. Cap dels quatre conjunts permet dividir entre zero."
    ],
    "error": "Una expressió pot representar un conjunt més petit del que sembla, o no estar definida.",
    "labels": [
      "6/3",
      "−√9",
      "0,1666… (el 6 es repeteix)",
      "√2",
      "6/0"
    ],
    "kind": "sets",
    "number": 20,
    "level": 3
  }
];

window.SetAnswers = {
  normalize(value) {
    return String(value).trim().normalize("NFKC").replace(/[−–]/g, "-").toLowerCase();
  },
  check(exercise, values) {
    if (values.length !== exercise.answers.length) return false;
    return values.every((value, i) => {
      const actual = this.normalize(value);
      const expected = this.normalize(exercise.answers[i]);
      if (exercise.kind === "integers") return /^[+-]?\d+$/.test(actual) && Number(actual) === Number(expected);
      return actual === expected;
    });
  }
};
window.LESSON_PRACTICE = {
  exercises: window.SET_EXERCISES,
  checker: window.SetAnswers,
  storageKey: "markel-3eso-conjunts-practice-v1",
  levels: ["Conjunts", "Classificació", "Representacions", "Raonament"],
  visual(exercise) {
    if (exercise.visual === "sets") return '<div class="number-figure sets-figure"><svg viewBox="0 0 600 250" role="img" aria-label="Quatre rectangles encaixats: A conté B, B conté C i C conté D."><rect x="10" y="10" width="580" height="230" fill="#f3f7fa" stroke="#245da1"/><rect x="30" y="55" width="435" height="170" fill="#edf5f1" stroke="#17634c"/><rect x="50" y="100" width="310" height="110" fill="#dcece4" stroke="#17634c"/><rect x="70" y="145" width="170" height="50" fill="#c8dfd1" stroke="#17634c"/><g font-size="24" fill="#202d29"><text x="28" y="40">A</text><text x="48" y="85">B</text><text x="68" y="130">C</text><text x="88" y="177">D</text></g></svg></div>';
    const x = value => 35 + (value + 1) / 5 * 530;
    const ticks = [-1,0,1,2,3,4].map(n => `<path d="M${x(n)} 60v12" stroke="#586660"/><text x="${x(n)}" y="98" text-anchor="middle">${n}</text>`).join("");
    const points = [[-.5,"A"],[Math.SQRT2,"B"],[Math.PI,"C"]].map(([n,label]) => `<circle cx="${x(n)}" cy="66" r="5" fill="#245da1"/><text x="${x(n)}" y="37" text-anchor="middle" fill="#245da1">${label}</text>`).join("");
    return `<div class="number-figure sets-figure"><svg viewBox="0 0 600 115" role="img" aria-label="Recta amb A a menys un mig, B a arrel de dos i C a pi; posicions dibuixades aproximades."><path d="M25 66H580" stroke="#202d29"/><g font-size="21">${ticks}${points}</g></svg></div>`;
  }
};
