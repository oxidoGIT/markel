const unitatTecnologia = {
  source: '../../../sources/tecnologia/2n-pla/materials-per-a-la-construccio.pdf',
  sourceLabel: 'Unitat de Tecnologia'
};
const dossierTecnologia = {
  source: '../../../sources/tecnologia/2n-pla/materiales-construccion-teoria.pdf',
  sourceLabel: 'Dossier de teoria'
};

window.PLA_ESTUDI = {
  key: 'markel-3eso-tecnologia-2n-pla-v1',
  source: '../../../sources/tecnologia/2n-pla/tecnologia-2n-pla-original.pdf',
  questions: [
    {
      id: 'obra-1', topic: 'obra', level: 'Bàsic', page: 10,
      prompt: 'El terreny és ple d’herbes i matolls. Com s’anomena l’operació de retirar-los?',
      answers: ['desbrossada', 'desbrossament', 'desbrossar'],
      hint: 'Pensa en l’acció de treure la brossa vegetal abans de començar l’obra.',
      explanation: 'La desbrossada retira la vegetació del terreny. Si hi ha runa, es fa el desenrunament.'
    },
    {
      id: 'terreny-runa', topic: 'obra', level: 'Aplicació', ...unitatTecnologia, page: 4,
      prompt: 'Ja s’ha enderrocat un mur vell, però encara hi ha runa al solar. Quina operació toca?',
      options: ['Demolició', 'Desenrunament', 'Cobriment d’aigües'], answer: 1,
      hint: 'La feina consisteix a retirar el material que ha deixat l’enderroc.',
      explanation: 'El desenrunament retira la runa. L’anivellació deixa el terreny al nivell necessari.'
    },
    {
      id: 'obra-2', topic: 'obra', level: 'Aplicació', ...unitatTecnologia, page: 4,
      prompt: 'Quina fase falta en l’esquema?',
      visual: ['Preparació del terreny', '?', 'Elevació de l’estructura'],
      options: ['Pavimentació', 'Fonamentació', 'Col·locació de les instal·lacions'], answer: 1,
      hint: 'Abans de fer els pilars cal construir la base que els aguantarà.',
      explanation: 'La fonamentació, o cimentació, és la fase en què es construeix la base de l’edifici.'
    },
    {
      id: 'fonaments-funcio', topic: 'fonaments', level: 'Bàsic', ...unitatTecnologia, page: 4,
      prompt: 'Quina funció fan els fonaments?',
      options: ['Transmeten les càrregues de l’edifici al terreny', 'Separen les habitacions', 'Evacuen la pluja de la teulada'], answer: 0,
      hint: 'Són la base de l’edifici i normalment es troben sota terra.',
      explanation: 'Els fonaments reben les càrregues de l’edifici i les transmeten al terreny.'
    },
    {
      id: 'obra-3', topic: 'fonaments', level: 'Aplicació', ...unitatTecnologia, page: 4,
      prompt: 'La capa superficial del terreny és tova i la capa que pot suportar la càrrega és molt més avall. Quin element és més adequat?',
      options: ['Una sabata superficial', 'Una placa d’una planta', 'Pilons de formigó armat'], answer: 2,
      hint: 'Quin element pot transmetre la càrrega a més profunditat?',
      explanation: 'Els pilons transmeten la càrrega a capes més profundes. Les sabates reparteixen la càrrega a poca profunditat.'
    },
    {
      id: 'fonaments-material', topic: 'materials-fonaments', level: 'Bàsic', ...unitatTecnologia, page: 4,
      prompt: 'De quin material solen ser les sabates i els pilons segons la unitat?',
      answers: ['formigó armat', 'de formigó armat', 'formigó amb armadura d’acer', 'formigó amb acer'],
      hint: 'És un formigó que incorpora una armadura.',
      explanation: 'La unitat indica que les sabates i les pilonades són generalment de formigó armat.'
    },
    {
      id: 'fonaments-traccio', topic: 'materials-fonaments', level: 'Aplicació', ...dossierTecnologia, page: 7,
      prompt: 'Quin element del formigó armat ajuda sobretot a resistir la tracció?',
      options: ['L’aigua de la barreja', 'Les barnilles d’acer', 'La sorra'], answer: 1,
      hint: 'Busca la part que forma l’armadura.',
      explanation: 'Les barnilles d’acer resisteixen bé la tracció, és a dir, els esforços que estiren el material.'
    },
    {
      id: 'petris-1', topic: 'petris', level: 'Bàsic', ...dossierTecnologia, page: 2,
      prompt: 'El granit extret de la pedrera es talla per fer un taulell. Com el classifiques?',
      options: ['Petri transformat', 'Petri natural', 'Aglutinant'], answer: 1,
      hint: 'Tallar el bloc canvia la forma del granit. El tall deixa la mateixa roca?',
      explanation: 'El granit és un petri natural. El tall li dona forma i es conserva la mateixa roca.'
    },
    {
      id: 'petris-proces', topic: 'petris', level: 'Aplicació', ...dossierTecnologia, page: 4,
      prompt: 'En quin cas s’obté un material transformat d’origen petri?',
      visual: ['Matèria primera mineral', 'Procés de fabricació', '?'],
      options: ['Tallar una llosa de pissarra', 'Separar sorra i grava per mides', 'Coure calcària amb argila per fabricar ciment'], answer: 2,
      hint: 'Busca el procés que dona un material nou a partir de la matèria mineral.',
      explanation: 'La cocció de la matèria primera és un pas per fabricar ciment. Tallar o classificar només canvia la forma o la mida.'
    },
    {
      id: 'petris-2', topic: 'exemples-petris', level: 'Bàsic', ...unitatTecnologia, page: 2,
      prompt: 'Quin nom reben la sorra i la grava quan s’empren com a fragments de roca en morters i formigons?',
      answers: ['àrids', 'àrid', 'materials àrids'],
      hint: 'El terme agrupa grans i fragments de diferents mides.',
      explanation: 'Els àrids inclouen la sorra fina i la grava, de mida més grossa.'
    },
    {
      id: 'petris-3', topic: 'exemples-petris', level: 'Aplicació', ...dossierTecnologia, page: 2,
      prompt: 'Per cobrir una teulada et cal una roca impermeable que es pugui separar en làmines. Quina tries?',
      options: ['Pissarra', 'Marbre', 'Grava'], answer: 0,
      hint: 'La seva estructura laminar és una de les pistes principals.',
      explanation: 'La pissarra és impermeable i es pot separar en làmines, útils en cobertes i revestiments.'
    },
    {
      id: 'petris-terratzo', topic: 'exemples-petris', level: 'Aplicació', ...dossierTecnologia, page: 8,
      prompt: 'Quin producte per a paviments es fabrica unint fragments de pedra, sovint marbre, amb ciment?',
      answers: ['terratzo', 'terrasso', 'terrazo'],
      hint: 'A les peces sovint es veuen els fragments de pedra.',
      explanation: 'El terratzo és un compost. Reuneix fragments de pedra i ciment en una sola peça.'
    },
    {
      id: 'aglutinants-1', topic: 'aglutinants', level: 'Bàsic', ...dossierTecnologia, page: 3,
      prompt: 'Quin procés té lloc quan la pasta d’un aglutinant amb aigua passa a estat sòlid?',
      answers: ['presa', 'forjat', 'fraguat', 'enduriment', 'solidificació'],
      hint: 'Pensa en el que observem quan la pasta comença a quedar ferma.',
      explanation: 'Aquest procés s’anomena presa o forjat. La pasta es torna rígida i pot unir materials.'
    },
    {
      id: 'aglutinants-2', topic: 'aglutinants', level: 'Aplicació', ...dossierTecnologia, page: 3,
      prompt: 'Vols fabricar una motllura fina per al sostre. Quin tipus de guix indiquen els apunts?',
      options: ['Guix negre', 'Escaiola', 'Guix amb perlita'], answer: 1,
      hint: 'El guix més fi dels apunts serveix per fer peces decoratives.',
      explanation: 'L’escaiola és un guix molt fi que es fa servir per fer motllures i plaques.'
    },
    {
      id: 'aglutinants-3', topic: 'aglutinants', level: 'Aplicació', ...dossierTecnologia, page: 4,
      prompt: 'Quin tipus de calç pot endurir-se fins i tot sota l’aigua?',
      answers: ['calç hidràulica', 'hidràulica'],
      hint: 'L’adjectiu del nom està relacionat amb l’aigua.',
      explanation: 'La calç hidràulica pot endurir-se en ambients humits o sota l’aigua.'
    },
    {
      id: 'conglomerants-1', topic: 'conglomerants', level: 'Bàsic', ...dossierTecnologia, page: 5,
      prompt: 'Quina mescla del quadre correspon a un morter de ciment?',
      options: ['Ciment i grava', 'Ciment, sorra i aigua', 'Ciment, sorra, grava i aigua'], answer: 1,
      hint: 'Pensa en la mescla que es posa entre maons i en quin àrid hi ha.',
      explanation: 'El morter de ciment porta ciment, sorra i aigua. El formigó de l’exemple també porta grava.'
    },
    {
      id: 'conglomerants-encofrat', topic: 'conglomerants', level: 'Aplicació', ...unitatTecnologia, page: 2,
      prompt: 'Com s’anomena el motlle on s’aboca el formigó fresc?',
      answers: ['encofrat', 'motlle d’encofrat'],
      hint: 'El formigó fresc pren la forma d’aquest motlle fins que s’endureix.',
      explanation: 'L’encofrat dona forma al formigó fresc mentre pren i guanya rigidesa.'
    },
    {
      id: 'conglomerants-3', topic: 'conglomerants', level: 'Aplicació', ...dossierTecnologia, page: 7,
      prompt: 'Quin formigó dels apunts té bombolles que ajuden a aïllar una coberta?',
      options: ['Formigó reforçat amb fibres', 'Formigó en massa', 'Formigó cel·lular'], answer: 2,
      hint: 'El seu nom fa pensar en les petites cel·les d’aire de la mescla.',
      explanation: 'Les bombolles del formigó cel·lular afavoreixen l’aïllament tèrmic i acústic.'
    },
    {
      id: 'ceramica-1', topic: 'ceramica', level: 'Bàsic', page: 12,
      prompt: 'Quina parella pertany a les peces ceràmiques per fer parets i forjats, segons l’exercici?',
      options: ['Rajola vidriada i sòcol', 'Maó i revoltó', 'Teula àrab i teula plana'], answer: 1,
      hint: 'Busca una peça per fer murs i una peça que es col·loca entre biguetes.',
      explanation: 'El maó s’utilitza en parets. El revoltó ceràmic es col·loca entre les biguetes d’un forjat.'
    },
    {
      id: 'ceramica-2', topic: 'ceramica', level: 'Aplicació', ...unitatTecnologia, page: 3,
      prompt: 'A la paret de la dutxa vols un recobriment fàcil de netejar i amb una cara esmaltada impermeable. Quina peça és la més adequada?',
      options: ['Totxana', 'Teula romana', 'Rajola vidriada'], answer: 2,
      hint: 'Quina peça està pensada per recobrir i protegir la paret?',
      explanation: 'La capa vitrificada de la rajola ofereix una superfície impermeable i adequada per al recobriment.'
    },
    {
      id: 'ceramica-4', topic: 'ceramica', level: 'Aplicació', ...dossierTecnologia, page: 9,
      prompt: 'Quin tipus de maó triaries per revestir l’interior d’un forn?',
      answers: ['maó refractari', 'maons refractaris', 'refractari', 'refractaris'],
      hint: 'L’ús requereix suportar temperatures elevades.',
      explanation: 'Els maons refractaris resisteixen molt bé la calor i es fan servir en forns i xemeneies.'
    },
    {
      id: 'altres-1', topic: 'altres', level: 'Bàsic', ...dossierTecnologia, page: 12,
      prompt: 'Quin termoplàstic dels apunts es fa servir en tubs de clavegueram i en marcs?',
      answers: ['PVC', 'P.V.C.', 'policlorur de vinil', 'clorur de polivinil'],
      hint: 'El seu nom més habitual a l’obra són tres lletres.',
      explanation: 'El PVC s’utilitza en tubs i accessoris per a conduccions, així com en marcs i revestiments.'
    },
    {
      id: 'altres-2', topic: 'altres', level: 'Aplicació', ...dossierTecnologia, page: 11,
      prompt: 'Quin producte del vidre s’utilitza com a aïllant tèrmic en els apunts?',
      options: ['Vidre pla', 'Llana de vidre', 'Vidre imprès'], answer: 1,
      hint: 'Pensa en una capa fibrosa, com les mantes d’aïllament.',
      explanation: 'La llana de vidre ajuda a frenar el pas de la calor. El vidre pla es fa servir en finestres i façanes.'
    },
    {
      id: 'altres-3', topic: 'altres', level: 'Aplicació', ...unitatTecnologia, page: 3,
      prompt: 'Quina combinació de metall i ús coincideix amb els apunts?',
      options: ['Coure per fer els pilars principals', 'Alumini per fer les armadures de formigó', 'Acer per fer bigues i coure per a instal·lacions d’aigua'], answer: 2,
      hint: 'Distingeix l’estructura de l’edifici de les conduccions que hi passen.',
      explanation: 'L’acer s’utilitza en bigues i pilars. El coure apareix en instal·lacions d’aigua, gas i calefacció.'
    }
  ],
  cards: [
    {
      id: 'targeta-obra-1', topic: 'obra', page: 10,
      question: 'En un solar hi ha mates, un mur vell i un desnivell. Què faries abans de posar els fonaments?',
      answer: 'Faria la desbrossada, la demolició del mur, el desenrunament i l’anivellació del terreny.'
    },
    {
      id: 'targeta-obra-2', topic: 'fonaments', ...unitatTecnologia, page: 4,
      question: 'Quina funció tenen els fonaments? Quan triaries una sabata i quan et caldrien pilons?',
      answer: 'Transmeten la càrrega al terreny. Una sabata la reparteix sobre una base ampla a poca profunditat. Els pilons transmeten la càrrega a capes més profundes.'
    },
    {
      id: 'targeta-materials-fonaments', topic: 'materials-fonaments', ...unitatTecnologia, page: 2,
      question: 'De què està fet el formigó armat dels fonaments i què hi aporta l’acer?',
      answer: 'El formigó conté ciment, aigua, sorra i grava, i resisteix bé la compressió. Les barnilles d’acer de l’armadura ajuden a resistir la tracció.'
    },
    {
      id: 'targeta-petris', topic: 'petris', ...dossierTecnologia, page: 4,
      question: 'Un bloc tallat de granit i el ciment procedeixen de matèries minerals. Per què pertanyen a dos grups diferents?',
      answer: 'El granit tallat conserva la mateixa roca. El ciment és un producte transformat que s’obté a partir d’una barreja cuita de calcària i argila.'
    },
    {
      id: 'targeta-aglutinants', topic: 'aglutinants', ...dossierTecnologia, page: 3,
      question: 'Què és un aglutinant? Descriu la presa i digues-ne tres exemples.',
      answer: 'És un material que, amb aigua, forma una pasta emmotllable i que pot unir altres materials quan s’endureix. Aquest pas s’anomena presa o forjat. En són exemples el guix, la calç i el ciment.'
    },
    {
      id: 'targeta-conglomerants-1', topic: 'conglomerants', ...dossierTecnologia, page: 6,
      question: 'Quina mescla faries servir per unir maons i quina per fer un fonament? Compara’n els ingredients.',
      answer: 'Per unir maons, morter de ciment, amb sorra, ciment i aigua. Per fer el fonament, formigó, amb ciment, aigua, sorra i grava.'
    },
    {
      id: 'targeta-ceramica', topic: 'ceramica', page: 12,
      question: 'Classifica un revoltó, una rajola vidriada i una teula àrab. Quina funció fa cadascun en un habitatge?',
      answer: 'El revoltó ceràmic es col·loca entre biguetes del forjat. La rajola vidriada recobreix superfícies. La teula àrab forma part de la coberta i ajuda a evacuar la pluja.'
    },
    {
      id: 'targeta-altres', topic: 'altres', ...dossierTecnologia, page: 11,
      question: 'Quins materials dels apunts poden fer la part transparent d’una finestra, un tub de clavegueram i una capa d’aïllament tèrmic?',
      answer: 'El vidre pla deixa passar la llum a la finestra, el PVC es fa servir en tubs de clavegueram i la llana de vidre ajuda a reduir les pèrdues de calor.'
    }
  ]
};
