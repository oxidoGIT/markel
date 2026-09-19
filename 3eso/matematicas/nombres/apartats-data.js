function e(level, title, prompt, answer, hint, explanation, options, alternatives) {
  return { level, title, prompt, answer, hint, explanation, options, alternatives };
}

window.NOMBRES_APARTATS = [
  {
    id: "enters",
    number: "1",
    file: "apartat-1-nombres-enters.html",
    title: "Nombres enters",
    subtitle: "Ordre, valor absolut i càlcul amb signes",
    intro: "Els nombres enters amplien els naturals perquè permeten expressar quantitats negatives. En aquest apartat cal dominar la recta numèrica, el valor absolut i les operacions amb signes.",
    theory: [
      { title: "Conjunt ℤ", text: "El conjunt dels enters inclou els naturals, el zero i els negatius: ..., -3, -2, -1, 0, 1, 2, 3... Serveixen per representar deutes, temperatures sota zero, plantes subterrànies o variacions negatives." },
      { title: "Ordre a la recta", text: "A la recta numèrica, un nombre és més gran si queda més a la dreta. Això és especialment important amb negatius: -3 és més gran que -8 perquè és més a prop del zero." },
      { title: "Valor absolut", text: "El valor absolut |a| és la distància del nombre a fins al zero. Sempre és positiu o zero. Per exemple, |-12| = 12 i |12| = 12." },
      { title: "Operacions amb signes", text: "En sumes i restes, convé pensar en guanys i pèrdues. En productes i divisions, signes iguals donen resultat positiu i signes diferents donen resultat negatiu." }
    ],
    examples: [
      { title: "Ordenar enters", steps: ["Situa mentalment els nombres a la recta.", "Compara de més esquerra a més dreta.", "-12 < -5 < -1 < 0 < 4."] },
      { title: "Càlcul amb signes", steps: ["Primer resol parèntesis: -4 - (7 - 12) = -4 - (-5).", "Restar un negatiu és sumar.", "El resultat és 1."] }
    ],
    exercises: [
      e("Bàsic", "Ordena de menor a major", "Ordena: -4, 7, 0, -9.", "-9 < -4 < 0 < 7", "Els més negatius queden més a l'esquerra.", "A la recta: -9, -4, 0, 7.", null, ["-9<-4<0<7"]),
      e("Bàsic", "Compara negatius", "Quin és més gran?", "-3", "El més gran és el que queda més a la dreta.", "-3 és més gran que -11.", ["-3", "-11", "-30", "-101"]),
      e("Bàsic", "Valor absolut", "Calcula |-18|.", "18", "És la distància fins al zero.", "|-18| = 18."),
      e("Bàsic", "Suma d'enters", "Calcula -8 + 13.", "5", "Guanyes 13 i perds 8.", "-8 + 13 = 5."),
      e("Bàsic", "Resta d'enters", "Calcula 6 - 14.", "-8", "Restar 14 a 6 et porta vuit unitats sota zero.", "6 - 14 = -8."),
      e("Mitjà", "Suma amb diversos termes", "Calcula -7 + 12 - 9 + 4.", "0", "Agrupa positius i negatius.", "12 + 4 = 16 i -7 - 9 = -16, total 0."),
      e("Mitjà", "Parèntesis", "Calcula -5 - (-12).", "7", "Restar un nombre negatiu equival a sumar.", "-5 - (-12) = -5 + 12 = 7."),
      e("Mitjà", "Producte de signes", "Calcula (-6) · 8.", "-48", "Signes diferents donen negatiu.", "6 · 8 = 48 i el signe és negatiu."),
      e("Mitjà", "Quocient de signes", "Calcula (-72) : (-9).", "8", "Signes iguals donen positiu.", "72 : 9 = 8."),
      e("Mitjà", "Expressió amb parèntesis", "Calcula 4 · (-3 + 8).", "20", "Resol primer el parèntesi.", "-3 + 8 = 5 i 4 · 5 = 20."),
      e("Mitjà", "Distància a la recta", "Quina distància hi ha entre -6 i 9?", "15", "Resta el menor al major.", "9 - (-6) = 15."),
      e("Mitjà", "Temperatura", "La temperatura passa de -4 °C a 7 °C. Quants graus puja?", "11", "Calcula la diferència entre final i inicial.", "7 - (-4) = 11."),
      e("Alt", "Operació combinada", "Calcula -3 · (8 - 15) + 4.", "25", "Primer parèntesi, després producte.", "8 - 15 = -7; -3 · (-7) = 21; 21 + 4 = 25."),
      e("Alt", "Doble parèntesi", "Calcula 18 - [7 - (3 - 11)].", "3", "Comença pel parèntesi interior.", "3 - 11 = -8; 7 - (-8) = 15; 18 - 15 = 3."),
      e("Alt", "Producte i suma", "Calcula (-5) · (-4) - 3 · 9.", "-7", "Resol els productes abans de restar.", "20 - 27 = -7."),
      e("Alt", "Divisions encadenades", "Calcula (-96) : 8 : (-3).", "4", "Opera d'esquerra a dreta.", "(-96) : 8 = -12 i -12 : (-3) = 4."),
      e("Alt", "Equació mental", "Quin enter x compleix x - 9 = -14?", "-5", "Afegeix 9 als dos costats.", "x = -14 + 9 = -5."),
      e("Alt", "Valor absolut compost", "Calcula | -6 - 9 |.", "15", "Primer calcula dins del valor absolut.", "-6 - 9 = -15 i |-15| = 15."),
      e("Alt", "Ordena resultats", "Quin resultat és menor?", "-16", "Calcula o compara cada expressió.", "-4 · 4 = -16, que és el menor.", ["-4 · 4", "-18 : -2", "7 - 10", "-2 + 1"]),
      e("Alt", "Repte de signes", "Calcula -2 · [5 - 3 · (-4)].", "-34", "Primer el producte dins del claudàtor.", "3 · (-4) = -12; 5 - (-12) = 17; -2 · 17 = -34.")
    ]
  },
  {
    id: "decimals",
    number: "2",
    file: "apartat-2-nombres-decimals.html",
    title: "Nombres decimals",
    subtitle: "Classificació, comparació i càlcul decimal",
    intro: "Els decimals representen parts de la unitat. Cal saber llegir-los, ordenar-los, operar-hi i reconèixer si són exactes, periòdics o no periòdics.",
    theory: [
      { title: "Parts d'un decimal", text: "Un decimal té part entera i part decimal. Les dècimes, centèsimes i mil·lèsimes indiquen parts cada vegada més petites de la unitat." },
      { title: "Decimals exactes", text: "Un decimal exacte té un nombre finit de xifres decimals, com 0,75 o -13,408." },
      { title: "Decimals periòdics", text: "Un decimal periòdic té xifres infinites que es repeteixen. Si el període comença just després de la coma és pur; si abans hi ha anteperíode és mixt." },
      { title: "Comparar decimals", text: "Per comparar decimals, iguala mentalment el nombre de xifres decimals afegint zeros a la dreta. 2,5 = 2,500, per tant es pot comparar amb 2,48 o 2,507." }
    ],
    examples: [
      { title: "Comparació", steps: ["Compara 3,08 i 3,102.", "Escriu 3,080 i 3,102.", "Com que 080 < 102, tenim 3,08 < 3,102."] },
      { title: "Operació decimal", steps: ["Calcula 4,25 · 0,6.", "Multiplica 425 · 6 = 2550.", "Hi ha tres xifres decimals en total, resultat 2,550 = 2,55."] }
    ],
    exercises: [
      e("Bàsic", "Part decimal", "Quina és la xifra de les centèsimes en 48,372?", "7", "Dècimes, centèsimes, mil·lèsimes.", "En 48,372, el 3 són dècimes, el 7 centèsimes i el 2 mil·lèsimes."),
      e("Bàsic", "Decimal exacte", "Quin nombre és decimal exacte?", "2,75", "Un decimal exacte s'acaba.", "2,75 té dues xifres decimals.", ["2,75", "1,333...", "0,272727...", "π"]),
      e("Bàsic", "Periòdic pur", "Quin nombre és periòdic pur?", "4,121212...", "El període comença just després de la coma.", "En 4,121212... es repeteix 12 des del primer decimal.", ["4,121212...", "4,31212...", "2,5", "3,101001000..."]),
      e("Bàsic", "Compara", "Escriu el signe correcte: 2,4 __ 2,35.", ">", "Pensa 2,40 i 2,35.", "2,40 és més gran que 2,35."),
      e("Bàsic", "Ordena", "Ordena de menor a major: 1,2; 1,02; 1,22.", "1,02 < 1,2 < 1,22", "Afegeix zeros: 1,20.", "1,02 < 1,20 < 1,22.", null, ["1,02<1,2<1,22"]),
      e("Mitjà", "Suma decimal", "Calcula 13,45 + 2,8.", "16,25", "Alinea les comes.", "13,45 + 2,80 = 16,25.", null, ["16.25"]),
      e("Mitjà", "Resta decimal", "Calcula 20 - 7,36.", "12,64", "Escriu 20,00.", "20,00 - 7,36 = 12,64.", null, ["12.64"]),
      e("Mitjà", "Producte decimal", "Calcula 3,2 · 1,5.", "4,8", "32 · 15 = 480 i hi ha dues xifres decimals.", "3,2 · 1,5 = 4,80 = 4,8.", null, ["4.8"]),
      e("Mitjà", "Divisió decimal", "Calcula 6,3 : 0,9.", "7", "Multiplica divisor i dividend per 10.", "63 : 9 = 7."),
      e("Mitjà", "Decimal mixt", "El nombre 5,127777... és:", "periòdic mixt", "Hi ha una xifra abans del període.", "L'anteperíode és 12 i el període és 7.", ["periòdic mixt", "periòdic pur", "exacte", "enter"]),
      e("Mitjà", "Escala decimal", "Quants mil·lèsims són 0,407?", "407", "0,407 són 407 parts de mil.", "0,407 = 407/1000."),
      e("Mitjà", "Problema", "Un cable fa 2,75 m i un altre 1,8 m. Quina longitud sumen?", "4,55", "Suma 2,75 + 1,80.", "2,75 + 1,80 = 4,55 m.", null, ["4.55"]),
      e("Alt", "Combinada", "Calcula 4,5 · (2,4 - 1,6).", "3,6", "Primer parèntesi.", "2,4 - 1,6 = 0,8; 4,5 · 0,8 = 3,6.", null, ["3.6"]),
      e("Alt", "Comparació fina", "Quin és més gran?", "0,9091", "Compara xifra a xifra.", "0,9091 és més gran que 0,9090.", ["0,9091", "0,909", "0,90099", "0,90899"]),
      e("Alt", "Expressió decimal", "Calcula 12,6 : 0,3 - 5,5.", "36,5", "Primer la divisió.", "12,6 : 0,3 = 42; 42 - 5,5 = 36,5.", null, ["36.5"]),
      e("Alt", "Mitjana", "La mitjana de 3,2; 4,8 i 5,5 és?", "4,5", "Suma i divideix entre 3.", "(3,2 + 4,8 + 5,5)/3 = 13,5/3 = 4,5.", null, ["4.5"]),
      e("Alt", "Decimal periòdic", "En 7,0343434..., quin és l'anteperíode?", "0", "L'anteperíode és la part decimal que no es repeteix abans del període.", "Després de la coma hi ha 0 i després es repeteix 34."),
      e("Alt", "Producte per potència de 10", "Calcula 0,0475 · 1000.", "47,5", "Mou la coma tres llocs a la dreta.", "0,0475 · 1000 = 47,5.", null, ["47.5"]),
      e("Alt", "Divisió per potència de 10", "Calcula 583,2 : 100.", "5,832", "Mou la coma dos llocs a l'esquerra.", "583,2 : 100 = 5,832.", null, ["5.832"]),
      e("Alt", "Repte decimal", "Calcula (0,75 + 1,25) · (3,6 : 0,9).", "8", "Resol cada parèntesi.", "0,75 + 1,25 = 2; 3,6 : 0,9 = 4; 2 · 4 = 8.")
    ]
  },
  {
    id: "errors",
    number: "3",
    file: "apartat-3-aproximacions-errors.html",
    title: "Aproximacions i errors",
    subtitle: "Truncament, arrodoniment, error absolut i relatiu",
    intro: "Aproximar és substituir un nombre per un altre més còmode. El preu és que cometem un error, i cal saber mesurar-lo.",
    theory: [
      { title: "Truncament", text: "Truncar és tallar les xifres a partir d'una posició sense mirar la xifra següent. 12,987 truncat a les dècimes és 12,9." },
      { title: "Arrodoniment", text: "Arrodonir és mirar la xifra següent. Si és 5 o més, augmentem la xifra conservada. Si és menor que 5, es manté." },
      { title: "Per defecte i per excés", text: "Una aproximació és per defecte si queda per sota del valor real i per excés si queda per sobre." },
      { title: "Errors", text: "L'error absolut és Ea = |valor real - aproximació|. L'error relatiu és Er = Ea / valor real i permet comparar aproximacions de magnituds diferents." }
    ],
    examples: [
      { title: "Nota aproximada", steps: ["Valor real: 8,65. Aproximació: 9.", "Ea = |8,65 - 9| = 0,35.", "Er = 0,35 / 8,65 ≈ 0,0405."] },
      { title: "Cota d'error", steps: ["Si 200 000 està arrodonit a les centenes de miler, el valor real podria baixar fins a 150 000.", "La cota de l'error absolut és 50 000.", "La cota relativa és 50 000 / 200 000 = 0,25."] }
    ],
    exercises: [
      e("Bàsic", "Trunca a dècimes", "Trunca 18,742 a les dècimes.", "18,7", "Talla després de les dècimes.", "18,742 truncat a dècimes és 18,7.", null, ["18.7"]),
      e("Bàsic", "Trunca a centèsimes", "Trunca 3,999 a les centèsimes.", "3,99", "No arrodoneixis.", "Les centèsimes són el segon decimal: 3,99.", null, ["3.99"]),
      e("Bàsic", "Arrodoneix a dècimes", "Arrodoneix 18,742 a les dècimes.", "18,7", "La centèsima és 4.", "Com que 4 < 5, la dècima no puja.", null, ["18.7"]),
      e("Bàsic", "Arrodoneix a centèsimes", "Arrodoneix 3,999 a les centèsimes.", "4,00", "La mil·lèsima és 9.", "3,999 arrodonit a centèsimes és 4,00.", null, ["4", "4,0", "4.00"]),
      e("Bàsic", "Per excés o defecte", "Aproximar 7,81 per 7,8 és:", "per defecte", "Compara 7,8 amb 7,81.", "7,8 és menor que 7,81.", ["per defecte", "per excés", "exacte", "impossible"]),
      e("Mitjà", "Error absolut", "Valor real 12,6 i aproximació 13. Calcula Ea.", "0,4", "Fes |12,6 - 13|.", "Ea = 0,4.", null, ["0.4"]),
      e("Mitjà", "Error relatiu", "Valor real 50 i aproximació 48. Calcula Er.", "0,04", "Primer Ea = 2.", "Er = 2/50 = 0,04.", null, ["0.04", "4%"]),
      e("Mitjà", "Percentatge d'error", "Si Er = 0,025, quin percentatge d'error és?", "2,5%", "Multiplica per 100.", "0,025 · 100 = 2,5%.", null, ["2,5", "2.5%", "2.5"]),
      e("Mitjà", "Xifres significatives", "Quantes xifres significatives té 0,004508?", "4", "No comptis zeros inicials.", "Les xifres significatives són 4, 5, 0 i 8."),
      e("Mitjà", "Arrodoniment significatiu", "Arrodoneix 0,004508 a 2 xifres significatives.", "0,0045", "Conserva 4 i 5; la xifra següent és 0.", "El resultat és 0,0045.", null, ["0.0045"]),
      e("Mitjà", "Cota simple", "Si 3,7 és un arrodoniment a les dècimes, la cota màxima de l'error absolut és:", "0,05", "La meitat d'una dècima.", "Quan s'arrodoneix a dècimes, l'error és menor o igual que 0,05.", ["0,05", "0,1", "0,5", "5"]),
      e("Mitjà", "Aproximació millor", "Quina aproximació de 10,28 té menor error?", "10,3", "Calcula distàncies al valor real.", "|10,28 - 10,3| = 0,02, menor que la resta.", ["10,3", "10,2", "10", "11"]),
      e("Alt", "Error absolut compost", "Una longitud real és 2,438 m i s'aproxima per 2,44 m. Calcula Ea.", "0,002", "Resta els dos valors.", "Ea = |2,438 - 2,44| = 0,002 m.", null, ["0.002"]),
      e("Alt", "Error relatiu decimal", "Amb valor real 2,438 i aproximació 2,44, calcula Er aproximat a 4 decimals.", "0,0008", "Divideix 0,002 entre 2,438.", "0,002/2,438 ≈ 0,0008.", null, ["0.0008"]),
      e("Alt", "Comparar errors", "Error A: Ea=3 en valor real 300. Error B: Ea=2 en valor real 50. Quin és millor?", "A", "Compara errors relatius.", "A: 3/300=0,01. B: 2/50=0,04. A és millor."),
      e("Alt", "Interval possible", "Si 47,2 és arrodonit a dècimes, quin és el menor valor real possible?", "47,15", "La frontera inferior és 0,05 menys.", "47,2 - 0,05 = 47,15.", null, ["47.15"]),
      e("Alt", "Interval possible 2", "Si 47,2 és arrodonit a dècimes, quin és el major valor real abans de canviar a 47,3?", "47,25", "La frontera superior és 47,25, sense incloure-la estrictament.", "A partir de 47,25 s'arrodoniria a 47,3.", null, ["47.25"]),
      e("Alt", "Truncament i error", "Trunca 9,876 a centèsimes i calcula Ea.", "0,006", "El truncament és 9,87.", "Ea = |9,876 - 9,87| = 0,006.", null, ["0.006"]),
      e("Alt", "Arrodoniment i error", "Arrodoneix 9,876 a centèsimes i calcula Ea.", "0,004", "L'arrodoniment és 9,88.", "Ea = |9,876 - 9,88| = 0,004.", null, ["0.004"]),
      e("Alt", "Repte", "Una població real de 248 700 s'aproxima per 200 000. Calcula l'error relatiu aproximat a 3 decimals.", "0,196", "Ea = 48 700.", "48 700/248 700 ≈ 0,196.", null, ["0.196"])
    ]
  }
];

window.NOMBRES_APARTATS.push(
  {
    id: "fraccions-concepte",
    number: "4",
    file: "apartat-4-fraccions-concepte.html",
    title: "Fraccions: concepte i representació",
    subtitle: "Tipus de fraccions, equivalència, ordre i nombres mixtos",
    intro: "Una fracció pot representar una divisió, una part d'una unitat o un operador sobre una quantitat. En aquest apartat es treballa sobretot la comprensió i manipulació bàsica.",
    theory: [
      { title: "Fracció com a divisió", text: "La fracció a/b indica a dividit entre b, amb b diferent de zero. El numerador compta parts i el denominador indica en quantes parts iguals dividim la unitat." },
      { title: "Tipus de fraccions", text: "És pròpia si el numerador és més petit que el denominador, impròpia si és més gran i equivalent a enter si el numerador és múltiple del denominador." },
      { title: "Nombre mixt", text: "Una fracció impròpia es pot escriure com un nombre mixt: 17/5 = 3 2/5, perquè 17 = 5 · 3 + 2." },
      { title: "Equivalència i ordre", text: "Multiplicar o dividir numerador i denominador pel mateix nombre no canvia el valor. Per ordenar fraccions, podem passar-les a denominador comú." }
    ],
    examples: [
      { title: "De fracció impròpia a mixta", steps: ["Divideix 23 entre 6.", "Quocient 3 i residu 5.", "23/6 = 3 5/6."] },
      { title: "Comparar", steps: ["Compara 3/4 i 5/6.", "Denominador comú 12: 3/4 = 9/12 i 5/6 = 10/12.", "Per tant, 3/4 < 5/6."] }
    ],
    exercises: [
      e("Bàsic", "Fracció pròpia", "Quina fracció és pròpia?", "3/8", "Numerador més petit que denominador.", "3 < 8.", ["3/8", "9/5", "12/4", "7/7"]),
      e("Bàsic", "Fracció impròpia", "Quina fracció és impròpia?", "11/6", "Numerador més gran que denominador.", "11 > 6.", ["2/9", "3/5", "11/6", "4/4"]),
      e("Bàsic", "Equivalent a enter", "Quina fracció és un nombre enter?", "18/6", "El numerador és múltiple del denominador.", "18/6 = 3.", ["18/6", "17/6", "6/18", "5/2"]),
      e("Bàsic", "Simplifica", "Simplifica 12/18.", "2/3", "Divideix per 6.", "12/18 = 2/3."),
      e("Bàsic", "Amplifica", "Amplifica 3/5 per 4.", "12/20", "Multiplica numerador i denominador per 4.", "3/5 = 12/20."),
      e("Mitjà", "Nombre mixt", "Escriu 17/5 com a nombre mixt.", "3 2/5", "17 = 5 · 3 + 2.", "17/5 = 3 2/5."),
      e("Mitjà", "Mixt a fracció", "Escriu 4 3/7 com a fracció impròpia.", "31/7", "Multiplica 4 · 7 i suma 3.", "4 3/7 = (4 · 7 + 3)/7 = 31/7."),
      e("Mitjà", "Compara", "Escriu el signe: 5/8 __ 3/4.", "<", "3/4 = 6/8.", "5/8 < 6/8."),
      e("Mitjà", "Ordena", "Ordena: 1/2, 2/3, 3/4.", "1/2 < 2/3 < 3/4", "Denominador comú 12.", "6/12 < 8/12 < 9/12.", null, ["1/2<2/3<3/4"]),
      e("Mitjà", "Fracció d'un nombre", "Calcula 3/4 de 120.", "90", "Divideix per 4 i multiplica per 3.", "120 : 4 = 30; 30 · 3 = 90."),
      e("Mitjà", "Part total", "Si 2/5 d'una quantitat són 18, quina és la quantitat total?", "45", "Un cinquè val 9.", "2/5 són 18, així 1/5 és 9 i 5/5 és 45."),
      e("Mitjà", "Equivalent", "Troba x: 4/7 = x/35.", "20", "35 és 7 · 5.", "x = 4 · 5 = 20."),
      e("Alt", "Simplificació alta", "Simplifica 126/210.", "3/5", "Divideix pel màxim comú divisor.", "MCD(126,210)=42; 126/210=3/5."),
      e("Alt", "Compara negatives", "Escriu el signe: -3/5 __ -7/10.", ">", "Passa a dècims.", "-3/5 = -6/10, i -6/10 és més gran que -7/10."),
      e("Alt", "Ordena amb negatius", "Ordena: -1/2, -3/4, 1/4.", "-3/4 < -1/2 < 1/4", "En negatius, el de valor absolut més gran és menor.", "-0,75 < -0,5 < 0,25.", null, ["-3/4<-1/2<1/4"]),
      e("Alt", "Mixt negatiu", "Escriu -19/4 com a nombre mixt.", "-4 3/4", "19/4 = 4 3/4 i conserva el signe negatiu.", "-19/4 = -4 3/4."),
      e("Alt", "Fracció equivalent reduïda", "Troba una fracció equivalent a 45/60 amb denominador 4.", "3/4", "Primer simplifica.", "45/60 = 3/4."),
      e("Alt", "Escala", "En un mapa, 3/8 del camí són 24 km. Quant fa tot el camí?", "64", "Divideix 24 entre 3 i multiplica per 8.", "1/8 són 8 km; 8/8 són 64 km."),
      e("Alt", "Comparació múltiple", "Quina és la fracció més gran?", "7/9", "Compara amb decimals o denominador comú.", "7/9 ≈ 0,777..., és la més gran.", ["7/9", "5/7", "3/4", "11/15"]),
      e("Alt", "Repte", "Troba x: 6/x = 9/12.", "8", "Simplifica 9/12 = 3/4.", "6/x = 3/4, per tant 3x = 24 i x = 8.")
    ]
  },
  {
    id: "fraccions-operacions",
    number: "5",
    file: "apartat-5-fraccions-operacions.html",
    title: "Fraccions: operacions",
    subtitle: "Suma, resta, producte, quocient i operacions combinades",
    intro: "Operar amb fraccions exigeix ordre: denominador comú per sumar i restar, producte directe per multiplicar, inversa per dividir i jerarquia d'operacions en expressions combinades.",
    theory: [
      { title: "Suma i resta", text: "Només es poden sumar o restar directament fraccions amb el mateix denominador. Si no el tenen, cal reduir-les a comú denominador." },
      { title: "Producte", text: "Multipliquem numerador per numerador i denominador per denominador. Després simplifiquem." },
      { title: "Quocient", text: "Dividir per una fracció equival a multiplicar per la seva inversa: a/b : c/d = a/b · d/c." },
      { title: "Combinades", text: "Primer parèntesis, després productes i quocients d'esquerra a dreta, i finalment sumes i restes." }
    ],
    examples: [
      { title: "Suma", steps: ["2/5 + 3/10", "2/5 = 4/10.", "4/10 + 3/10 = 7/10."] },
      { title: "Combinada", steps: ["1/2 + 3 · (-2/3)", "Primer producte: 3 · (-2/3) = -2.", "1/2 - 2 = -3/2."] }
    ],
    exercises: [
      e("Bàsic", "Suma igual denominador", "Calcula 3/8 + 2/8.", "5/8", "Suma numeradors.", "3/8 + 2/8 = 5/8."),
      e("Bàsic", "Resta igual denominador", "Calcula 7/9 - 4/9.", "1/3", "Resta numeradors i simplifica.", "3/9 = 1/3."),
      e("Bàsic", "Suma diferent denominador", "Calcula 1/2 + 1/3.", "5/6", "Denominador comú 6.", "3/6 + 2/6 = 5/6."),
      e("Bàsic", "Producte", "Calcula 2/5 · 3/4.", "3/10", "Multiplica i simplifica.", "6/20 = 3/10."),
      e("Bàsic", "Quocient", "Calcula 2/3 : 4/5.", "5/6", "Multiplica per 5/4.", "2/3 · 5/4 = 10/12 = 5/6."),
      e("Mitjà", "Suma amb enter", "Calcula 2 + 3/5.", "13/5", "2 = 10/5.", "10/5 + 3/5 = 13/5."),
      e("Mitjà", "Resta amb negatiu", "Calcula -1/2 - 3/4.", "-5/4", "Denominador comú 4.", "-2/4 - 3/4 = -5/4."),
      e("Mitjà", "Producte negatiu", "Calcula (-3/7) · (14/9).", "-2/3", "Simplifica factors creuats.", "(-3 · 14)/(7 · 9) = -42/63 = -2/3."),
      e("Mitjà", "Divisió negativa", "Calcula 5/6 : (-10/9).", "-3/4", "Multiplica per -9/10.", "5/6 · (-9/10) = -45/60 = -3/4."),
      e("Mitjà", "Parèntesi", "Calcula (1/3 + 1/6) · 4.", "2", "Primer suma dins del parèntesi.", "1/3 + 1/6 = 1/2; 1/2 · 4 = 2."),
      e("Mitjà", "Combinada curta", "Calcula 1/2 + 3/4 · 2.", "2", "Primer el producte.", "3/4 · 2 = 3/2; 1/2 + 3/2 = 2."),
      e("Mitjà", "Repartiment", "Tres cinquens de 45 menys un terç de 45 és:", "12", "Calcula les dues parts.", "3/5 de 45 = 27 i 1/3 de 45 = 15; diferència 12."),
      e("Alt", "Combinada 1", "Calcula 1/2 + 3 · (-2/3) + 1/3 : 5.", "-43/30", "Productes i divisions abans de sumar.", "1/3 : 5 = 1/15; 1/2 - 2 + 1/15 = -43/30."),
      e("Alt", "Combinada 2", "Calcula (2/3 - 5/6) : (-1/4).", "2/3", "Primer parèntesi.", "2/3 - 5/6 = -1/6; (-1/6) : (-1/4) = 4/6 = 2/3."),
      e("Alt", "Combinada 3", "Calcula 1 - [2/5 + 3/10].", "3/10", "Suma dins del claudàtor.", "2/5 + 3/10 = 7/10; 1 - 7/10 = 3/10."),
      e("Alt", "Fracció complexa", "Calcula (3/4)/(9/10).", "5/6", "És una divisió de fraccions.", "3/4 · 10/9 = 30/36 = 5/6."),
      e("Alt", "Equació amb fraccions", "Resol x + 2/3 = 5/6.", "1/6", "Resta 2/3 als dos costats.", "5/6 - 4/6 = 1/6."),
      e("Alt", "Equació producte", "Resol (3/5)x = 12.", "20", "Divideix per 3/5.", "x = 12 · 5/3 = 20."),
      e("Alt", "Operació llarga", "Calcula 2/3 + 5/6 - 7/12.", "11/12", "Denominador comú 12.", "8/12 + 10/12 - 7/12 = 11/12."),
      e("Alt", "Repte", "Calcula [1/2 - (2/3 : 4/9)] · (-3/5).", "3/5", "Primer la divisió interior.", "2/3 : 4/9 = 3/2; 1/2 - 3/2 = -1; -1 · (-3/5) = 3/5.")
    ]
  }
);

window.NOMBRES_APARTATS.push(
  {
    id: "fraccions-decimals",
    number: "6",
    file: "apartat-6-fraccions-decimals.html",
    title: "Fraccions i decimals",
    subtitle: "Pas entre fraccions, decimals exactes i decimals periòdics",
    intro: "Les fraccions i els decimals són dues formes d'escriure els mateixos nombres racionals. La clau és saber passar d'una forma a l'altra i reconèixer el tipus de decimal.",
    theory: [
      { title: "De fracció a decimal", text: "Divideix numerador entre denominador. Si la fracció irreductible té denominador amb només factors 2 i 5, el decimal és exacte. Si apareixen altres factors, és periòdic." },
      { title: "Decimal exacte a fracció", text: "El numerador és el nombre sense coma i el denominador és 10, 100, 1000... segons les xifres decimals. Després es simplifica." },
      { title: "Periòdic pur", text: "Si el període comença just després de la coma, es multiplica per 10, 100... per desplaçar un període i es resta l'equació original." },
      { title: "Periòdic mixt", text: "Si hi ha anteperíode, es multiplica una vegada per eliminar la part no periòdica i una altra per al període; després es resten les dues expressions." }
    ],
    examples: [
      { title: "Decimal exacte", steps: ["2,57 té dues xifres decimals.", "2,57 = 257/100.", "Com que no es pot simplificar, queda 257/100."] },
      { title: "Periòdic pur", steps: ["N = 3,212121...", "100N = 321,212121...", "99N = 318, per tant N = 318/99 = 106/33."] }
    ],
    exercises: [
      e("Bàsic", "Fracció a decimal", "Calcula 3/4 en decimal.", "0,75", "Divideix 3 entre 4.", "3/4 = 0,75.", null, ["0.75"]),
      e("Bàsic", "Fracció a decimal 2", "Calcula 7/2 en decimal.", "3,5", "Divideix 7 entre 2.", "7/2 = 3,5.", null, ["3.5"]),
      e("Bàsic", "Classifica", "1/8 dona un decimal...", "exacte", "El denominador 8 només té factor 2.", "1/8 = 0,125.", ["exacte", "periòdic pur", "periòdic mixt", "no periòdic"]),
      e("Bàsic", "Classifica 2", "2/3 dona un decimal...", "periòdic pur", "El denominador 3 no té factors 2 ni 5.", "2/3 = 0,666...", ["periòdic pur", "exacte", "enter", "no periòdic"]),
      e("Bàsic", "Decimal a fracció", "Escriu 0,4 com a fracció irreductible.", "2/5", "0,4 = 4/10.", "4/10 = 2/5.", null, ["4/10"]),
      e("Mitjà", "Decimal exacte", "Escriu 2,35 com a fracció irreductible.", "47/20", "2,35 = 235/100.", "235/100 = 47/20.", null, ["235/100"]),
      e("Mitjà", "Decimal negatiu", "Escriu -3,26 com a fracció irreductible.", "-163/50", "-3,26 = -326/100.", "-326/100 = -163/50."),
      e("Mitjà", "Periòdic pur", "Escriu 0,777... com a fracció.", "7/9", "N = 0,777...; 10N = 7,777...", "9N = 7, així N = 7/9."),
      e("Mitjà", "Periòdic pur 2", "Escriu 13,222... com a fracció.", "119/9", "N = 13,222...; 10N = 132,222...", "9N = 119, així N = 119/9."),
      e("Mitjà", "Periòdic mixt", "Escriu 0,1666... com a fracció.", "1/6", "És 0,1 amb període 6.", "10N=1,666... i 100N=16,666...; 90N=15, N=1/6."),
      e("Mitjà", "Denominador", "La fracció irreductible 7/40 dona decimal exacte?", "sí", "40 = 2^3 · 5.", "Només hi ha factors 2 i 5."),
      e("Mitjà", "Denominador 2", "La fracció irreductible 5/12 dona decimal exacte?", "no", "12 té factor 3.", "Com que apareix 3, el decimal és periòdic."),
      e("Alt", "Periòdic pur llarg", "Escriu 0,272727... com a fracció irreductible.", "3/11", "Període 27.", "0,272727... = 27/99 = 3/11."),
      e("Alt", "Periòdic mixt llarg", "Escriu 2,1555... com a fracció irreductible.", "97/45", "Anteperíode 1, període 5.", "(215 - 21)/90 = 194/90 = 97/45."),
      e("Alt", "Periòdic mixt 2", "Escriu 3,8121212... com a fracció irreductible.", "629/165", "Anteperíode 8, període 12.", "(3812 - 38)/990 = 3774/990 = 629/165."),
      e("Alt", "Classifica fracció", "655/14 dona un decimal...", "periòdic mixt", "14 = 2 · 7.", "Com que té factor 2 i també 7, és periòdic mixt.", ["periòdic mixt", "exacte", "periòdic pur", "enter"]),
      e("Alt", "Classifica fracció 2", "365/11 dona un decimal...", "periòdic pur", "11 no té factors 2 ni 5.", "365/11 = 33,1818...", ["periòdic pur", "periòdic mixt", "exacte", "no periòdic"]),
      e("Alt", "Troba denominador", "Quin denominador garanteix decimal exacte?", "80", "Només pot tenir factors 2 i 5.", "80 = 2^4 · 5.", ["80", "18", "21", "42"]),
      e("Alt", "Operació amb generatrius", "Calcula 0,5 + 0,333... com a fracció.", "5/6", "0,5 = 1/2 i 0,333... = 1/3.", "1/2 + 1/3 = 5/6."),
      e("Alt", "Repte", "Calcula 1,2 + 0,272727... com a fracció irreductible.", "81/55", "1,2 = 6/5 i 0,272727... = 3/11.", "6/5 + 3/11 = 66/55 + 15/55 = 81/55.")
    ]
  },
  {
    id: "reals",
    number: "7",
    file: "apartat-7-nombres-reals.html",
    title: "Nombres reals",
    subtitle: "Racionals, irracionals, aproximacions i representació",
    intro: "Els nombres reals agrupen els racionals i els irracionals. En 3r ESO cal reconèixer-los, comparar-los i aproximar-los amb criteri.",
    theory: [
      { title: "Racionals", text: "Són els que es poden expressar com una fracció. Inclouen naturals, enters, fraccions i decimals exactes o periòdics." },
      { title: "Irracionals", text: "No es poden expressar com una fracció. Tenen decimals infinits no periòdics. Exemples: π, √2, √3 i molts decimals construïts sense període." },
      { title: "Reals", text: "La unió dels racionals i irracionals forma el conjunt dels reals, ℝ. Són els nombres que podem situar sobre la recta real." },
      { title: "Arrels i aproximació", text: "Algunes arrels són exactes, com √16 = 4. Les no exactes s'aproximen o es representen geomètricament amb triangles rectangles." }
    ],
    examples: [
      { title: "Classificar", steps: ["-5 és enter i racional.", "0,121212... és racional perquè és periòdic.", "√7 és irracional perquè 7 no és quadrat perfecte."] },
      { title: "Comparar", steps: ["Compara √5 i 2,3.", "√5 ≈ 2,236.", "Com que 2,236 < 2,3, tenim √5 < 2,3."] }
    ],
    exercises: [
      e("Bàsic", "Classifica", "Quin nombre és irracional?", "√2", "Busca decimal infinit no periòdic.", "√2 és irracional.", ["√2", "3/4", "-5", "0,25"]),
      e("Bàsic", "Racional", "0,454545... és racional?", "sí", "Els decimals periòdics són racionals.", "Es pot escriure com a fracció."),
      e("Bàsic", "Arrel exacta", "Calcula √49.", "7", "7 · 7 = 49.", "√49 = 7."),
      e("Bàsic", "Arrel no exacta", "√20 és racional?", "no", "20 no és quadrat perfecte.", "√20 = 2√5 i √5 és irracional."),
      e("Bàsic", "Conjunt", "A quin conjunt pertanyen tots els nombres racionals i irracionals?", "ℝ", "És el conjunt dels reals.", "Racionals ∪ irracionals = reals.", null, ["R", "reals"]),
      e("Mitjà", "Aproxima", "Aproxima √2 per defecte amb dues xifres decimals.", "1,41", "√2 ≈ 1,4142.", "Per defecte a centèsimes és 1,41.", null, ["1.41"]),
      e("Mitjà", "Aproxima per excés", "Aproxima √2 per excés amb dues xifres decimals.", "1,42", "Ha de quedar per sobre de 1,4142.", "1,42 és la centèsima per excés.", null, ["1.42"]),
      e("Mitjà", "Compara", "Escriu el signe: √3 __ 1,8.", "<", "√3 ≈ 1,732.", "1,732 < 1,8."),
      e("Mitjà", "Compara 2", "Escriu el signe: √10 __ 3,1.", ">", "√10 ≈ 3,162.", "3,162 > 3,1."),
      e("Mitjà", "Error absolut", "Aproxima π per 3,14. Calcula Ea amb π≈3,1416.", "0,0016", "Resta 3,1416 - 3,14.", "Ea = 0,0016.", null, ["0.0016"]),
      e("Mitjà", "Ordena", "Ordena de menor a major: √2, 1,5, 4/3.", "4/3 < √2 < 1,5", "4/3≈1,333 i √2≈1,414.", "1,333 < 1,414 < 1,5.", null, ["4/3<√2<1,5", "4/3<sqrt2<1,5"]),
      e("Mitjà", "Quadrats perfectes", "Quin és el quadrat perfecte entre 40 i 50?", "49", "7^2 = 49.", "49 és quadrat perfecte."),
      e("Alt", "Simplifica arrel", "Simplifica √72 en la forma a√b.", "6√2", "72 = 36 · 2.", "√72 = √36 · √2 = 6√2.", null, ["6sqrt2", "6 arrel de 2"]),
      e("Alt", "Producte d'arrels", "Calcula √8 · √2.", "4", "Multiplica dins d'una sola arrel.", "√8 · √2 = √16 = 4."),
      e("Alt", "Comparació exacta", "Quin és més gran, √45 o 6,6?", "√45", "Compara quadrats: 6,6^2 = 43,56.", "45 > 43,56, per tant √45 > 6,6."),
      e("Alt", "Interval d'arrel", "Entre quins enters consecutius està √30?", "5 i 6", "5^2=25 i 6^2=36.", "25 < 30 < 36, així √30 és entre 5 i 6.", null, ["5,6", "entre 5 i 6"]),
      e("Alt", "Error relatiu", "Aproxima √5 per 2,24 i calcula Ea amb √5≈2,2361.", "0,0039", "Resta 2,24 - 2,2361.", "Ea = 0,0039.", null, ["0.0039"]),
      e("Alt", "Racionalitza idea", "Quin decimal no és racional?", "0,101001000100001...", "No hi ha període fix.", "És infinit no periòdic.", ["0,101001000100001...", "0,333...", "2,75", "-8"]),
      e("Alt", "Operació real", "Calcula √50 / √2.", "5", "Divideix dins l'arrel.", "√50 / √2 = √25 = 5."),
      e("Alt", "Repte", "Ordena: √7, 2,64, 8/3.", "2,64 < √7 < 8/3", "√7≈2,6458 i 8/3≈2,666.", "2,64 < 2,6458 < 2,666.", null, ["2,64<√7<8/3", "2.64<sqrt7<8/3"])
    ]
  },
  {
    id: "intervals",
    number: "8",
    file: "apartat-8-intervals-semirectes.html",
    title: "Intervals i semirectes",
    subtitle: "Notació algebraica, recta real, unions i interseccions",
    intro: "Els intervals descriuen conjunts infinits de nombres reals de manera compacta. La dificultat és controlar bé parèntesis, claudàtors i desigualtats.",
    theory: [
      { title: "Intervals oberts", text: "(a, b) representa tots els nombres entre a i b sense incloure a ni b. En llenguatge algebraic: a < x < b." },
      { title: "Intervals tancats", text: "[a, b] inclou els extrems. En llenguatge algebraic: a ≤ x ≤ b." },
      { title: "Semioberts", text: "[a, b) inclou a però no b; (a, b] no inclou a però sí b." },
      { title: "Semirectes", text: "Descriuen nombres més grans o més petits que un extrem. L'infinit sempre s'escriu amb parèntesi: (2, +∞), (-∞, 5]." },
      { title: "Unió i intersecció", text: "La unió ajunta conjunts. La intersecció conserva només la part comuna." }
    ],
    examples: [
      { title: "Desigualtat a interval", steps: ["-5 ≤ x < -1.", "Inclou -5, no inclou -1.", "Interval: [-5, -1)."] },
      { title: "Intersecció", steps: ["(3, 8) ∩ (4, 9).", "La part comuna comença després de 4 i acaba abans de 8.", "Resultat: (4, 8)."] }
    ],
    exercises: [
      e("Bàsic", "Desigualtat a interval", "Escriu x > 3 com a interval.", "(3,+∞)", "No inclou 3 i va cap a l'infinit positiu.", "x > 3 és (3, +∞).", null, ["(3,∞)", "(3,+infinito)", "(3, +∞)"]),
      e("Bàsic", "Desigualtat a interval 2", "Escriu x ≤ 2 com a interval.", "(-∞,2]", "Inclou el 2.", "x ≤ 2 és (-∞, 2].", null, ["(-∞, 2]"]),
      e("Bàsic", "Interval a desigualtat", "Escriu [1,4) com a desigualtat.", "1 ≤ x < 4", "Claudàtor inclou, parèntesi no.", "[1,4) significa 1 ≤ x < 4.", null, ["1<=x<4"]),
      e("Bàsic", "Obert o tancat", "L'interval (-2,5) és:", "obert", "Té parèntesis als dos costats.", "No inclou cap extrem.", ["obert", "tancat", "semirecta", "semiobert"]),
      e("Bàsic", "Inclou extrem", "El nombre 3 pertany a [3,7)?", "sí", "El claudàtor inclou el 3.", "3 pertany a [3,7)."),
      e("Mitjà", "No pertinença", "El nombre 7 pertany a [3,7)?", "no", "El parèntesi no inclou el 7.", "7 no pertany a [3,7)."),
      e("Mitjà", "Interval", "Escriu -5 < x ≤ -4 com a interval.", "(-5,-4]", "Parèntesi a -5, claudàtor a -4.", "Resultat: (-5, -4].", null, ["(-5, -4]"]),
      e("Mitjà", "Semirecta", "Escriu x ≥ -2 com a interval.", "[-2,+∞)", "Inclou -2 i va cap a +∞.", "x ≥ -2 és [-2, +∞).", null, ["[-2,∞)", "[-2, +∞)"]),
      e("Mitjà", "Unió solapada", "Calcula [−3,5] ∪ [3,6).", "[-3,6)", "Els intervals se solapen.", "La unió cobreix des de -3 inclòs fins a 6 no inclòs.", null, ["[-3, 6)"]),
      e("Mitjà", "Intersecció", "Calcula (3,8) ∩ (4,9).", "(4,8)", "Part comuna.", "Comú: més gran que 4 i més petit que 8.", null, ["(4, 8)"]),
      e("Mitjà", "Unió separada", "Calcula [-1,0) ∪ (3,5).", "[-1,0)∪(3,5)", "No es poden ajuntar en un sol interval.", "Són dos trams separats.", null, ["[-1,0)U(3,5)", "[-1, 0) ∪ (3, 5)"]),
      e("Mitjà", "Intersecció buida", "Calcula (1,2) ∩ [3,4].", "∅", "No tenen punts comuns.", "Els intervals estan separats.", null, ["buit", "conjunt buit"]),
      e("Alt", "Desigualtat doble", "Escriu com a interval: -2 ≤ 3x + 1 < 10.", "[-1,3)", "Resta 1 i divideix per 3.", "-3 ≤ 3x < 9, així -1 ≤ x < 3.", null, ["[-1, 3)"]),
      e("Alt", "Inequació", "Resol 2x - 5 > 7 com a interval.", "(6,+∞)", "Afegeix 5 i divideix per 2.", "2x > 12, x > 6.", null, ["(6,∞)", "(6, +∞)"]),
      e("Alt", "Inequació negativa", "Resol -3x ≤ 12 com a interval.", "[-4,+∞)", "En dividir per -3, canvia el signe.", "x ≥ -4.", null, ["[-4,∞)", "[-4, +∞)"]),
      e("Alt", "Sistema", "Resol x > -1 i x ≤ 5 com a interval.", "(-1,5]", "Intersecció de dues condicions.", "Cal complir totes dues: (-1,5].", null, ["(-1, 5]"]),
      e("Alt", "Sistema 2", "Resol x < 0 o x ≥ 4 com a interval.", "(-∞,0)∪[4,+∞)", "És una unió de dues semirectes.", "x és menor que 0 o com a mínim 4.", null, ["(-∞,0)U[4,+∞)", "(-∞, 0) ∪ [4, +∞)"]),
      e("Alt", "Entorn", "Escriu E(2,5) com a interval.", "(-3,7)", "E(c,r) = (c-r, c+r).", "2-5=-3 i 2+5=7."),
      e("Alt", "Entorn reduït", "Escriu E*(−3,2) com a unió d'intervals.", "(-5,-3)∪(-3,-1)", "És l'entorn sense el centre.", "E(-3,2)=(-5,-1), traient -3 queda (-5,-3)∪(-3,-1).", null, ["(-5,-3)U(-3,-1)", "(-5, -3) ∪ (-3, -1)"]),
      e("Alt", "Repte", "Calcula ([−2,4) ∩ (1,7]) ∪ {5}.", "(1,4)∪{5}", "Primer la intersecció.", "La intersecció és (1,4). Després s'afegeix el punt 5.", null, ["(1, 4) ∪ {5}", "(1,4)U{5}"])
    ]
  }
);
