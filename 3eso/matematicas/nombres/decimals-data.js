"use strict";

window.DECIMAL_EXERCISES = [
  {
    "id": "place",
    "title": "El valor d’una xifra",
    "prompt": "Quina és la xifra de les centèsimes en 48,372?",
    "answers": [
      "7"
    ],
    "hints": [
      "Compta les posicions des de la coma: dècimes, centèsimes, mil·lèsimes."
    ],
    "steps": [
      "El 3 ocupa les dècimes; el 7, les centèsimes; el 2, les mil·lèsimes.",
      "La xifra demanada és 7 i el seu valor és 0,07."
    ],
    "error": "No confonguis la xifra amb el seu valor posicional.",
    "level": 0,
    "number": 1
  },
  {
    "id": "decompose",
    "title": "Descompon el nombre",
    "prompt": "Completa: 6,042 = unitats + centèsimes + mil·lèsimes. Escriu el valor de cada part.",
    "answers": [
      "6",
      "0.04",
      "0.002"
    ],
    "hints": [
      "El zero de les dècimes manté el 4 a la posició de les centèsimes."
    ],
    "steps": [
      "6 unitats = 6; 4 centèsimes = 0,04; 2 mil·lèsimes = 0,002.",
      "6 + 0,04 + 0,002 = 6,042."
    ],
    "error": "Cada posició val una desena part de l’anterior.",
    "labels": [
      "Valor de les unitats",
      "Valor de les centèsimes",
      "Valor de les mil·lèsimes"
    ],
    "level": 0,
    "number": 2
  },
  {
    "id": "zeros",
    "title": "Zeros que no canvien el valor",
    "prompt": "Quin nombre és igual a 2,500?",
    "answers": [
      "2,5"
    ],
    "hints": [
      "Els zeros finals de la part decimal es poden eliminar."
    ],
    "steps": [
      "2,500 = 2,50 = 2,5.",
      "No es pot eliminar un zero que separa dues xifres significatives."
    ],
    "error": "Només els zeros al final de la part decimal es poden suprimir sense canviar el valor.",
    "choices": [
      "2,5",
      "2,05",
      "2,005",
      "25"
    ],
    "level": 0,
    "number": 3
  },
  {
    "id": "exact",
    "title": "Un decimal finit",
    "prompt": "Quin nombre és decimal exacte?",
    "answers": [
      "2,75"
    ],
    "hints": [
      "Un decimal exacte té una expressió amb un nombre finit de xifres decimals."
    ],
    "steps": [
      "2,75 té dues xifres decimals.",
      "Els altres nombres tenen infinites xifres en les expressions indicades."
    ],
    "error": "Distingeix un decimal que s’acaba d’un desenvolupament infinit.",
    "choices": [
      "2,75",
      "1,333… (el 3 es repeteix)",
      "0,272727… (el 27 es repeteix)",
      "π"
    ],
    "level": 0,
    "number": 4
  },
  {
    "id": "period",
    "title": "Anteperíode i període",
    "prompt": "En 7,0343434… es repeteix el bloc 34 indefinidament. Escriu l’anteperíode i el període mínim.",
    "answers": [
      "0",
      "34"
    ],
    "hints": [
      "L’anteperíode és la part decimal anterior a la repetició; no inclou la part entera."
    ],
    "steps": [
      "El primer decimal és 0 i no forma part del bloc que es repeteix.",
      "Anteperíode: 0. Període mínim: 34. És un decimal periòdic mixt."
    ],
    "error": "El 7 és la part entera. Busca on comença la repetició estable.",
    "labels": [
      "Anteperíode",
      "Període mínim"
    ],
    "level": 0,
    "number": 5
  },
  {
    "id": "negative",
    "title": "Comparar decimals negatius",
    "prompt": "Quin nombre és més gran?",
    "answers": [
      "−2,35"
    ],
    "hints": [
      "Entre dos negatius, és més gran el que queda més a prop de zero."
    ],
    "steps": [
      "−2,53 < −2,5 < −2,405 < −2,35.",
      "El nombre més gran és −2,35."
    ],
    "error": "Compara els valors absoluts i inverteix l’ordre perquè tots són negatius.",
    "choices": [
      "−2,35",
      "−2,5",
      "−2,405",
      "−2,53"
    ],
    "level": 0,
    "number": 6
  },
  {
    "id": "order",
    "title": "Ordena amb signes i zeros",
    "prompt": "Ordena de menor a major: 0,5; −0,5; 0,05; −0,51.",
    "answers": [
      "-0.51",
      "-0.5",
      "0.05",
      "0.5"
    ],
    "hints": [
      "Els negatius van abans dels positius. Compara −0,51 amb −0,50."
    ],
    "steps": [
      "−0,51 < −0,50 < 0,05 < 0,50.",
      "Els zeros finals no canvien el valor."
    ],
    "error": "Revisa primer l’ordre dels negatius i després el valor de les dècimes.",
    "labels": [
      "1r (el més petit)",
      "2n",
      "3r",
      "4t (el més gran)"
    ],
    "level": 0,
    "number": 7
  },
  {
    "id": "point",
    "title": "Una centèsima a cada marca",
    "prompt": "Quina coordenada té A en aquesta recta?",
    "answers": [
      "0.17"
    ],
    "hints": [
      "Entre 0,10 i 0,20 hi ha deu trams iguals."
    ],
    "steps": [
      "Cada tram val 0,01.",
      "A és set trams després de 0,10: 0,10 + 0,07 = 0,17."
    ],
    "error": "Cada marca avança una centèsima, no una dècima.",
    "visual": true,
    "level": 0,
    "number": 8
  },
  {
    "id": "sum",
    "title": "Suma amb comes alineades",
    "prompt": "13,45 + 2,8",
    "answers": [
      "16.25"
    ],
    "hints": [
      "Escriu 2,8 com 2,80."
    ],
    "steps": [
      "13,45 + 2,80 = 16,25."
    ],
    "error": "Alinea unitats amb unitats i dècimes amb dècimes.",
    "level": 1,
    "number": 9
  },
  {
    "id": "subtract",
    "title": "Resta d’un enter",
    "prompt": "20 − 7,36",
    "answers": [
      "12.64"
    ],
    "hints": [
      "Escriu 20 com 20,00."
    ],
    "steps": [
      "20,00 − 7,36 = 12,64.",
      "Comprovació: 12,64 + 7,36 = 20."
    ],
    "error": "Afegeix zeros decimals al 20 abans de restar.",
    "level": 1,
    "number": 10
  },
  {
    "id": "product",
    "title": "Situa la coma del producte",
    "prompt": "4,25 · 0,6",
    "answers": [
      "2.55"
    ],
    "hints": [
      "Multiplica com si fossin enters i compta totes les xifres decimals dels factors."
    ],
    "steps": [
      "425 · 6 = 2550.",
      "Hi ha 2 + 1 = 3 xifres decimals: 2,550 = 2,55."
    ],
    "error": "El producte ha de ser menor que 4,25 perquè multipliques per 0,6.",
    "level": 1,
    "number": 11
  },
  {
    "id": "division",
    "title": "Un divisor petit",
    "prompt": "0,72 : 0,06",
    "answers": [
      "12"
    ],
    "hints": [
      "Multiplica dividend i divisor pel mateix nombre fins que el divisor sigui enter."
    ],
    "steps": [
      "0,72 : 0,06 = 72 : 6 = 12.",
      "Comprovació: 12 · 0,06 = 0,72."
    ],
    "error": "Canvia alhora el dividend i el divisor, no només un dels dos.",
    "level": 1,
    "number": 12
  },
  {
    "id": "scale",
    "title": "Potències de deu",
    "prompt": "Calcula les dues operacions.",
    "answers": [
      "47.5",
      "5.832"
    ],
    "hints": [
      "Multiplicar per 1000 augmenta tres ordres; dividir per 100 disminueix dos ordres."
    ],
    "steps": [
      "0,0475 · 1000 = 47,5.",
      "583,2 : 100 = 5,832."
    ],
    "error": "Comprova si el resultat ha d’augmentar o disminuir.",
    "labels": [
      "0,0475 · 1000",
      "583,2 : 100"
    ],
    "level": 1,
    "number": 13
  },
  {
    "id": "signed",
    "title": "Suma de signes diferents",
    "prompt": "−3,75 + 1,8",
    "answers": [
      "-1.95"
    ],
    "hints": [
      "Compara els valors absoluts i conserva el signe del més gran."
    ],
    "steps": [
      "3,75 − 1,80 = 1,95.",
      "El valor absolut més gran és el del negatiu: −1,95."
    ],
    "error": "Les regles de signes són les mateixes que amb els enters.",
    "level": 1,
    "number": 14
  },
  {
    "id": "small-product",
    "title": "Centèsimes per centèsimes",
    "prompt": "0,08 · 0,04",
    "answers": [
      "0.0032"
    ],
    "hints": [
      "8 · 4 = 32. Quantes xifres decimals hi ha entre els dos factors?"
    ],
    "steps": [
      "Hi ha quatre xifres decimals en total.",
      "32 amb quatre decimals és 0,0032."
    ],
    "error": "Falten zeros si la part decimal té menys de quatre xifres.",
    "level": 1,
    "number": 15
  },
  {
    "id": "quotient",
    "title": "Transforma la divisió",
    "prompt": "2,52 : 0,12",
    "answers": [
      "21"
    ],
    "hints": [
      "Multiplica els dos nombres per 100."
    ],
    "steps": [
      "2,52 : 0,12 = 252 : 12 = 21.",
      "21 · 0,12 = 2,52."
    ],
    "error": "El quocient no canvia si multipliques tots dos nombres pel mateix factor no nul.",
    "level": 1,
    "number": 16
  },
  {
    "id": "brackets",
    "title": "Primer el parèntesi",
    "prompt": "4,5 · (2,4 − 1,6)",
    "answers": [
      "3.6"
    ],
    "hints": [
      "Calcula la resta abans del producte."
    ],
    "steps": [
      "2,4 − 1,6 = 0,8.",
      "4,5 · 0,8 = 3,60 = 3,6."
    ],
    "error": "No multipliquis abans de resoldre el parèntesi.",
    "level": 2,
    "number": 17
  },
  {
    "id": "priority",
    "title": "Divisió abans que resta",
    "prompt": "12,6 : 0,3 − 5,5",
    "answers": [
      "36.5"
    ],
    "hints": [
      "La divisió té prioritat sobre la resta."
    ],
    "steps": [
      "12,6 : 0,3 = 126 : 3 = 42.",
      "42 − 5,5 = 36,5."
    ],
    "error": "Primer calcula 12,6 : 0,3; no restis al divisor.",
    "level": 2,
    "number": 18
  },
  {
    "id": "negative-quotient",
    "title": "Un resultat negatiu",
    "prompt": "(−1,2 + 0,45) : 0,15",
    "answers": [
      "-5"
    ],
    "hints": [
      "Calcula el parèntesi i després aplica la regla de signes a la divisió."
    ],
    "steps": [
      "−1,20 + 0,45 = −0,75.",
      "−0,75 : 0,15 = −75 : 15 = −5."
    ],
    "error": "El dividend és negatiu i el divisor positiu.",
    "level": 2,
    "number": 19
  },
  {
    "id": "combined",
    "title": "Suma, producte i resta",
    "prompt": "3,6 − (0,8 + 1,25) · 1,2",
    "answers": [
      "1.14"
    ],
    "hints": [
      "Resol el parèntesi i multiplica el seu resultat per 1,2."
    ],
    "steps": [
      "0,8 + 1,25 = 2,05.",
      "2,05 · 1,2 = 2,46.",
      "3,60 − 2,46 = 1,14."
    ],
    "error": "La resta exterior és l’última operació.",
    "level": 2,
    "number": 20
  },
  {
    "id": "chain",
    "title": "Operacions de la mateixa prioritat",
    "prompt": "4,8 : 0,6 · 0,25",
    "answers": [
      "2"
    ],
    "hints": [
      "Divisió i producte es fan d’esquerra a dreta."
    ],
    "steps": [
      "4,8 : 0,6 = 8.",
      "8 · 0,25 = 2."
    ],
    "error": "No agrupis 0,6 · 0,25: no hi ha un parèntesi que ho indiqui.",
    "level": 2,
    "number": 21
  },
  {
    "id": "nested",
    "title": "Parèntesis encaixats",
    "prompt": "2,5 − [1,2 − 0,4 · (3,5 − 5)]",
    "answers": [
      "0.7"
    ],
    "hints": [
      "Comença per 3,5 − 5 i conserva el signe negatiu."
    ],
    "steps": [
      "3,5 − 5 = −1,5; 0,4 · (−1,5) = −0,6.",
      "1,2 − (−0,6) = 1,8.",
      "2,5 − 1,8 = 0,7."
    ],
    "error": "Restar un producte negatiu equival a sumar-ne el valor absolut.",
    "level": 2,
    "number": 22
  },
  {
    "id": "reason",
    "title": "Multiplicar no sempre augmenta",
    "prompt": "Quina expressió té el resultat més gran?",
    "answers": [
      "1,2 : 0,03"
    ],
    "hints": [
      "Calcula els dos resultats; 0,03 és menor que 1."
    ],
    "steps": [
      "1,2 · 0,03 = 0,036.",
      "1,2 : 0,03 = 120 : 3 = 40.",
      "Per tant, el quocient és més gran."
    ],
    "error": "Amb nombres positius, multiplicar per un nombre menor que 1 disminueix el valor.",
    "choices": [
      "1,2 : 0,03",
      "1,2 · 0,03",
      "Tenen el mateix resultat"
    ],
    "level": 2,
    "number": 23
  },
  {
    "id": "mean",
    "title": "Mitjana de tres valors",
    "prompt": "Calcula la mitjana de 3,2; 4,8 i 5,5.",
    "answers": [
      "4.5"
    ],
    "hints": [
      "Suma els tres valors i reparteix el total en tres parts iguals."
    ],
    "steps": [
      "3,2 + 4,8 + 5,5 = 13,5.",
      "13,5 : 3 = 4,5."
    ],
    "error": "La mitjana ha de quedar entre el valor mínim i el màxim.",
    "level": 2,
    "number": 24
  },
  {
    "id": "substitute",
    "title": "Substitució amb decimals",
    "prompt": "Calcula −0,4x + 1,5(2 − x) quan x = −0,6.",
    "answers": [
      "4.14"
    ],
    "hints": [
      "Substitueix cada x per (−0,6), inclòs el signe."
    ],
    "steps": [
      "−0,4 · (−0,6) + 1,5 · [2 − (−0,6)].",
      "0,24 + 1,5 · 2,6 = 0,24 + 3,9 = 4,14."
    ],
    "error": "El primer producte és positiu i 2 − (−0,6) és 2,6.",
    "level": 3,
    "number": 25
  },
  {
    "id": "reduce",
    "title": "Distributiva i termes semblants",
    "prompt": "Escriu −0,5(1,2x − 0,8) + 0,3x en la forma ax + b.",
    "answers": [
      "-0.3",
      "0.4"
    ],
    "hints": [
      "Distribueix −0,5 sobre els dos termes del parèntesi."
    ],
    "steps": [
      "−0,6x + 0,4 + 0,3x = −0,3x + 0,4.",
      "a = −0,3; b = 0,4."
    ],
    "error": "El producte dels dos negatius dona el terme independent positiu.",
    "labels": [
      "Coeficient a",
      "Terme independent b"
    ],
    "level": 3,
    "number": 26
  },
  {
    "id": "equation",
    "title": "Equació decimal",
    "prompt": "Resol 0,4x + 1,7 = 4,1.",
    "answers": [
      "6"
    ],
    "hints": [
      "Resta 1,7 als dos membres i divideix entre el coeficient de x."
    ],
    "steps": [
      "0,4x = 2,4; x = 2,4 : 0,4 = 6.",
      "Comprovació: 0,4 · 6 + 1,7 = 4,1."
    ],
    "error": "Cal dividir per 0,4, no multiplicar-hi.",
    "labels": [
      "x"
    ],
    "level": 3,
    "number": 27
  },
  {
    "id": "both",
    "title": "Incògnites als dos membres",
    "prompt": "Resol 1,2(x − 0,5) = 0,3x + 2,1.",
    "answers": [
      "3"
    ],
    "hints": [
      "Desenvolupa el parèntesi i agrupa les x en un membre."
    ],
    "steps": [
      "1,2x − 0,6 = 0,3x + 2,1.",
      "0,9x = 2,7; x = 3.",
      "Comprovació: 1,2 · 2,5 = 0,9 + 2,1 = 3."
    ],
    "error": "La distributiva també multiplica −0,5 per 1,2.",
    "labels": [
      "x"
    ],
    "level": 3,
    "number": 28
  },
  {
    "id": "inverse",
    "title": "Desfés una divisió",
    "prompt": "Resol x : 0,25 − 1,8 = 6,2.",
    "answers": [
      "2"
    ],
    "hints": [
      "Primer suma 1,8 als dos membres; després desfés la divisió."
    ],
    "steps": [
      "x : 0,25 = 8; x = 8 · 0,25 = 2.",
      "Comprovació: 2 : 0,25 − 1,8 = 8 − 1,8 = 6,2."
    ],
    "error": "Per desfer la divisió entre 0,25, multiplica per 0,25.",
    "labels": [
      "x"
    ],
    "level": 3,
    "number": 29
  },
  {
    "id": "cups",
    "title": "Quantes racions?",
    "prompt": "Amb 2,4 L de suc omplim gots de 0,15 L, sense pèrdues. Quants gots complets obtenim?",
    "answers": [
      "16"
    ],
    "hints": [
      "Divideix la quantitat total per la capacitat de cada got."
    ],
    "steps": [
      "2,4 : 0,15 = 240 : 15 = 16.",
      "16 · 0,15 = 2,4 L: no en sobra."
    ],
    "error": "La pregunta demana el nombre de gots, no els litres.",
    "level": 3,
    "number": 30
  },
  {
    "id": "purchase",
    "title": "Dos preus i un canvi",
    "prompt": "Compres 1,25 kg a 3,60 €/kg i 0,75 kg a 2,80 €/kg. Pagues amb 10 €. Quin canvi reps?",
    "answers": [
      "3.4"
    ],
    "hints": [
      "Calcula el cost de cada producte, suma’ls i resta el total de 10."
    ],
    "steps": [
      "1,25 · 3,60 = 4,50 €; 0,75 · 2,80 = 2,10 €.",
      "Total: 6,60 €. Canvi: 10 − 6,60 = 3,40 €."
    ],
    "error": "No sumis els preus per quilogram: cada preu multiplica una quantitat diferent.",
    "level": 3,
    "number": 31
  },
  {
    "id": "final",
    "title": "Repte final",
    "prompt": "−{2,4 − [0,75 − 1,5 · (0,4 − 1,2)]} + 0,84 : (−0,07)",
    "answers": [
      "-12.45"
    ],
    "hints": [
      "Resol de dins cap a fora. Calcula la divisió separadament.",
      "El claudàtor val 1,95 i la divisió val −12."
    ],
    "steps": [
      "0,4 − 1,2 = −0,8; 1,5 · (−0,8) = −1,2.",
      "0,75 − (−1,2) = 1,95; 2,4 − 1,95 = 0,45.",
      "El menys exterior dona −0,45. A més, 0,84 : (−0,07) = −12.",
      "−0,45 − 12 = −12,45."
    ],
    "error": "Conserva el menys exterior fins al final i comprova el signe del quocient.",
    "level": 3,
    "number": 32
  }
];

// Compare finite decimals exactly, without floating-point rounding or evaluating input.
window.DecimalAnswers = {
  canonical(value) {
    const s = String(value).trim().replace(/[−–]/g, "-");
    if (!/^[+-]?\d+(?:[.,]\d+)?$/.test(s)) return null;
    const negative = s.startsWith("-");
    const [whole, fraction = ""] = s.replace(/^[+-]/, "").replace(",", ".").split(".");
    const integer = whole.replace(/^0+(?=\d)/, "");
    const tail = fraction.replace(/0+$/, "");
    return (negative && (integer !== "0" || tail) ? "-" : "") + integer + (tail ? "." + tail : "");
  },
  check(exercise, values) {
    if (values.length !== exercise.answers.length) return false;
    if (exercise.choices) return values[0] === exercise.answers[0];
    if (exercise.id === "period") return values.every((value, i) => String(value).trim() === exercise.answers[i]);
    return values.every((value, i) => {
      const actual = this.canonical(value);
      return actual !== null && actual === this.canonical(exercise.answers[i]);
    });
  }
};
