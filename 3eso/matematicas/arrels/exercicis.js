(() => {
  'use strict';
  // rN(...) represents an Nth root in the shared MathML renderer.
  const exercises = [];
  function add(group, level, page, ref, expression, answer, hint, steps, options = {}) {
    const {choices = null, priority = false, prompt} = options;
    exercises.push({
      id: 'arrel-' + (exercises.length + 1), group, level, page, ref, expression,
      answer, hint, steps, priority, prompt, mode: choices ? 'choice' : 'number',
      choices: choices ? [answer, ...choices] : null
    });
  }

  const toRoot = 'Escriu la potència en forma d’arrel.';
  const toPower = 'Escriu l’arrel com una potència de la mateixa base.';
  const roleHint = 'L’índex de l’arrel correspon al denominador de l’exponent.';
  add('conversions', 'Inicial', 1, 'Exemple de conversió', '5^(3/4)', 'r4(5^3)', roleHint,
    ['El 4 indica l’arrel quarta i el 3 eleva el 5 al cub.'], {prompt: toRoot, choices: ['r3(5^4)', 'r4(3^5)']});
  add('conversions', 'Inicial', 1, 'Exemple de conversió', 'r2(2^3)', '2^(3/2)', roleHint,
    ['Si l’índex no està escrit, és 2. L’exponent del radicand és 3.'], {prompt: toPower, choices: ['2^(2/3)', '3^(2/2)']});
  add('conversions', 'Inicial', null, 'Complement · Numerador 1', '9^(1/2)', 'r2(9)', roleHint,
    ['El 2 és l’índex i el numerador 1 deixa el 9 amb exponent 1.'], {prompt: toRoot, choices: ['r9(2)', 'r2(9^2)']});
  add('conversions', 'Inicial', null, 'Complement · Numerador 1', 'r3(8)', '8^(1/3)', roleHint,
    ['En 8 hi ha un exponent 1 implícit. El 3 passa al denominador.'], {prompt: toPower, choices: ['8^(3/1)', '3^(1/8)']});
  add('conversions', 'Mitjà', 1, 'Exponent negatiu', '7^(-2/5)', 'r5((1/7)^2)',
    'Reescriu la base com el seu invers abans de convertir.', ['7^(−2/5) = (1/7)^(2/5).', 'El 5 dona l’índex i el 2 queda com a exponent.'],
    {prompt: 'Quin radical amb radicand positiu representa aquesta potència?', choices: ['r5(7^2)', 'r2((1/7)^5)']});
  add('conversions', 'Mitjà', 1, 'Exponent negatiu dins l’arrel', 'r3(5^(-7))', '5^(-7/3)', roleHint,
    ['El −7 es conserva al numerador i el 3 es posa al denominador. També es pot escriure (1/5)^(7/3).'],
    {prompt: toPower, priority: true, choices: ['5^(7/3)', '5^(-3/7)']});
  add('conversions', 'Mitjà', null, 'Complement · De la notació al càlcul', '8^(-2/3)', '1/4',
    'L’arrel cúbica de 8 és exacta. Què canvia si l’exponent és negatiu?', ['³√8 = 2.', '2⁻² = 1/2² = 1/4.']);

  const signHint = 'Mira si l’índex és parell o senar i després mira el signe del radicand.';
  add('signes', 'Inicial', 2, 'Taula de signes', 'r2(4)', '2', signHint,
    ['√4 designa l’arrel principal, 2. L’equació x² = 4 sí que té dues solucions.'], {priority: true});
  add('signes', 'Inicial', 2, 'Taula de signes', 'r2(-4)', 'No té valor real', signHint,
    ['El quadrat de qualsevol nombre real és zero o positiu.'], {choices: ['-2', '2']});
  add('signes', 'Inicial', 2, 'Taula de signes', 'r3(27)', '3', signHint, ['3³ = 27.']);
  add('signes', 'Inicial', 2, 'Taula de signes', 'r3(-27)', '-3', signHint, ['(−3)³ = −27.']);
  add('signes', 'Inicial', 1, 'Arrel i solucions', 'x^2=4', '−2 i 2', 'Quins dos nombres tenen quadrat 4?',
    ['Tant (−2)² com 2² donen 4. La pregunta demana totes les solucions de l’equació.'],
    {prompt: 'Quines són totes les solucions reals?', choices: ['2', '-2']});

  const sumHint = 'Agrupa només els termes que tenen el mateix índex i radicand.';
  add('sumes', 'Inicial', 2, 'Exemple de suma', '3*r2(3)+5*r2(3)', '8*r2(3)', sumHint,
    ['Suma 3 + 5 i conserva √3.'], {choices: ['8*r2(6)', '15*r2(3)']});
  add('sumes', 'Inicial', 2, 'Radicals semblants', 'r3(2^2)', '3*r3(2^2)', sumHint,
    ['L’índex és 3 i el radicand és 2². El coeficient 3 pot canviar.'],
    {prompt: 'Quin radical és semblant al de l’enunciat?', choices: ['5*r2(2)', '-7*r2(2)']});
  add('sumes', 'Mitjà', 3, 'Exemple amb dos radicals', '5*r2(2)-3*r2(3)+(1/2)*r2(2)+5*r2(3)', '(11/2)*r2(2)+2*r2(3)', sumHint,
    ['Amb √2, suma 5 + 1/2 = 11/2.', 'Amb √3, suma −3 + 5 = 2.'],
    {choices: ['(11/2)*r2(2)+8*r2(3)', '5*r2(2)+(5/2)*r2(3)']});
  add('sumes', 'Mitjà', 3, 'Exercici 1a', '-2*r2(7)+5*r2(7)-8*r2(7)+3*r2(7)-5*r2(7)+7*r2(7)', '0', sumHint,
    ['Els coeficients positius sumen 15. Els negatius sumen −15.', 'El coeficient final és 0. Simplifica 0·√7 a 0.'], {priority: true});
  add('sumes', 'Alt', 3, 'Exercici 1b', 'r2(3)/3-2*r2(2)+7*r2(2)-r2(2)/6', '(2*r2(3)+29*r2(2))/6', sumHint,
    ['Escriu √3/3 com 2√3/6 i mantén aquest terme separat.', 'Amb √2, −12/6 + 42/6 − 1/6 = 29/6.'],
    {priority: true, choices: ['(2*r2(3)+31*r2(2))/6', '(r2(3)+29*r2(2))/6']});
  add('sumes', 'Alt', 3, 'Exercici 1c', '5*r2(11)-3*r2(17)-4*r2(11)-9*r2(11)+8*r2(17)', '-8*r2(11)+5*r2(17)', sumHint,
    ['Amb √11, 5 − 4 − 9 = −8.', 'Amb √17, −3 + 8 = 5.'],
    {priority: true, choices: ['-18*r2(11)+5*r2(17)', '-8*r2(11)-5*r2(17)']});

  const sameIndex = 'Multiplica els coeficients a fora i els radicands a dins.';
  const commonIndex = 'Busca un índex comú. Multiplica cada exponent pel mateix factor que el seu índex.';
  add('productes', 'Inicial', 3, 'Exemple amb el mateix índex', 'r2(2)*r2(3)', 'r2(6)', sameIndex,
    ['Mantén l’índex 2 i multiplica 2·3 = 6.'], {choices: ['r4(6)', 'r2(5)']});
  add('productes', 'Alt', 3, 'Exemple amb lletres', 'r2(2*a^2*b/c^3)*r2(2*c^3/b)', '2*a', sameIndex,
    ['A dins de l’arrel, b i c³ es cancel·len i queda 4a².', 'Com que a > 0, √(4a²) = 2a.'],
    {prompt: 'Simplifica amb a, b i c positives.', choices: ['4*a', '2*a^2']});
  add('productes', 'Mitjà', 4, 'Exercici 2a', '2*r2(1/4)*7*r2(3)', '7*r2(3)', sameIndex,
    ['√(1/4) = 1/2, de manera que el primer factor val 1.', '14√(3/4) és equivalent i se simplifica a 7√3.'],
    {prompt: 'Quina és la forma més simple?', priority: true, choices: ['14*r2(3)', '7*r2(3/4)']});
  add('productes', 'Alt', 4, 'Exercici 2b', 'r2(4*a^2*b)*r2(a^2*b^3/(16*c))', 'a^2*b^2/(2*r2(c))', sameIndex,
    ['Multiplica els radicands: 4a⁴b⁴/(16c) = a⁴b⁴/(4c).', 'Extreu les potències parelles: a²b² a dalt i 2√c a baix.'],
    {prompt: 'Simplifica amb a, b i c positives.', priority: true, choices: ['a^2*b/(2*r2(c))', 'a^2*b^2/(4*c)']});
  add('productes', 'Mitjà', 4, 'Exercici 2c', '5*r3(8)*7*r3(27)', '210', sameIndex,
    ['³√8 = 2 i ³√27 = 3.', '5·2·7·3 = 210.']);
  add('productes', 'Alt', 4, 'Exercici 2d', '(r2(2*a)/r3(5*c))*(r2(14*a)/r3(5*c^2))', '(2*a*r2(7))/(c*r3(25))',
    'Agrupa les arrels quadrades al numerador i les cúbiques al denominador.',
    ['A dalt, √(28a²) = 2a√7.', 'A baix, ³√(25c³) = c·³√25.'],
    {prompt: 'Simplifica amb a i c positives.', choices: ['(2*a*r2(7))/(c*r2(25))', '(a*r2(7))/(c*r3(25))']});
  add('productes', 'Mitjà', 4, 'Exemple amb índex diferent', 'r3(2)*r4(3)', 'r12(2^4*3^3)', commonIndex,
    ['mcm(3, 4) = 12.', 'Reescriu 1/3 com 4/12 i 1/4 com 3/12; multiplica els radicands.'],
    {prompt: 'Expressa el producte amb un únic radical.', choices: ['r7(6)', 'r12(2^3*3^4)']});
  add('productes', 'Alt', 4, 'Producte de tres radicals', 'r2(2*a)*r3(a^2)*r5(2^3*a)', '2*a*r30(2^3*a^11)', commonIndex,
    ['Porta els índexs a 30 amb els factors 15, 10 i 6.', 'Els exponents de 2 i a són 33 i 41. Extreu 2·a i deixa els residus 3 i 11.'],
    {prompt: 'Simplifica amb a positiva i extreu els factors que puguis.', choices: ['r30(2^33*a^41)', '2*a*r30(2^3*a^10)']});

  const divisionHint = 'Amb el mateix índex, divideix els radicands. El denominador ha de ser diferent de zero.';
  add('divisions', 'Inicial', 5, 'Exemple amb el mateix índex', 'r2(8)/r2(2)', '2', divisionHint, ['8/2 = 4 i √4 = 2.']);
  add('divisions', 'Mitjà', 5, 'Exemple amb lletres', 'r2(4*a^2*b^3)/r2(2*a*b^3)', 'r2(2*a)', divisionHint,
    ['Cancel·la b³ i simplifica 4a²/(2a) = 2a.'], {prompt: 'Simplifica amb a i b positives.', choices: ['r2(2*a^2)', '2*r2(a)']});
  add('divisions', 'Alt', 5, 'Exemple amb índex diferent', 'r3(2^2)/r5(2^3)', 'r15(2)', commonIndex,
    ['mcm(3, 5) = 15.', 'A dalt tens 2^10 i a baix 2^9 dins de l’arrel quinzena. Resta els exponents.'],
    {prompt: 'Expressa el quocient amb un únic radical.', choices: ['r15(2^19)', 'r8(2)']});
  add('divisions', 'Alt', 6, 'Primer quocient combinat', '(r2(2)*r3(5^2)*r2(5))/(r5(3)*r2(2^2)*r3(5))', 'r30(5^25/(2^15*3^6))', commonIndex,
    ['mcm(2, 3, 5) = 30. Per a la base 5, suma 20 + 15 i resta 10.', 'Per a la base 2, fes 15 − 30; el 3 només és al denominador, amb exponent 6.'],
    {prompt: 'Expressa el quocient amb un únic radical d’índex 30.', priority: true, choices: ['r30(5^35/(2^15*3^6))', 'r30(5^25*2^15/3^6)']});
  add('divisions', 'Alt', 6, 'Segon quocient combinat', '(r3(810)*r2(3)*r4(7^2))/(r3(5^2)*r2(2)*r3(7))', '3*r6(3^5*7/(5^2*2))',
    'Descompon 810 i simplifica primer l’arrel quarta de 7².',
    ['810 = 2·3⁴·5 i ⁴√(7²) = √7. Ara l’índex comú mínim és 6.', 'Dins de l’arrel queda 3^11·7/(5²·2). Extreu 3^6 per obtenir el factor 3.'],
    {prompt: 'Simplifica i extreu tots els factors possibles.', choices: ['r6(3^11*7/(5^2*2))', '3*r6(3^5*7/(5*2))']});

  const extractHint = 'Divideix l’exponent de cada factor per l’índex: el quocient surt i el residu es queda a dins.';
  add('factors', 'Mitjà', 6, 'Exemple d’extracció', 'r3(a^7*b^3*c)', 'a^2*b*r3(a*c)', extractHint,
    ['7 = 3·2 + 1 i 3 = 3·1 + 0. El factor c té exponent 1 i es queda a dins.'],
    {prompt: 'Extreu tots els factors possibles amb a, b i c positives.', choices: ['a^3*b*r3(a*c)', 'a^2*b*r3(b*c)']});
  add('factors', 'Alt', 6, 'Extracció en una fracció', 'r2(3^7*5^2*a^3/(b^2*c^3))', '(3^3*5*a/(b*c))*r2(3*a/c)', extractHint,
    ['A dalt extreu 3³·5·a, i a baix extreu b·c.', 'El residu és 3a al numerador i c al denominador.'],
    {prompt: 'Extreu tots els factors possibles amb a, b i c positives.', choices: ['(3^3*5*a/(b*c))*r2(3*a)', '(3^2*5*a/(b*c))*r2(3*a/c)']});
  add('factors', 'Mitjà', null, 'Complement · Introducció d’un factor', '3*r2(2)', 'r2(18)',
    'Eleva el coeficient a l’índex abans de posar-lo dins de l’arrel.', ['3²·2 = 18.'],
    {prompt: 'Introdueix el 3 dins del radical.', choices: ['r2(6)', 'r2(36)']});
  add('factors', 'Alt', 7, 'Exemple d’introducció', '2*a*b^2*r5(2^4*a)', 'r5(2^9*a^6*b^10)',
    'Tot factor que entra a l’arrel cinquena s’eleva a 5.', ['Entren 2⁵, a⁵ i b^10.', 'Multiplica pel radicand que ja hi havia, 2⁴·a, i suma exponents de la mateixa base.'],
    {prompt: 'Introdueix tots els factors dins del radical amb a i b positives.', choices: ['r5(2^9*a^5*b^10)', 'r5(2^8*a^6*b^7)']});

  window.MATH_PRACTICE = {
    exercises,
    storageKey: 'markel-3eso-arrels-v1',
    sourcePdf: '../../../sources/matematicas/arrels/raels-potencies-exponent-racional.pdf',
    topics: {
      conversions: 'De potència a arrel i a l’inrevés',
      signes: 'Arrels i signes',
      sumes: 'Suma i resta',
      productes: 'Multiplicació',
      divisions: 'Divisió',
      factors: 'Extreu o introdueix factors'
    },
    feedback: {
      conversions: 'Comprova l’índex de l’arrel, el numerador i el signe de l’exponent.',
      signes: 'Revisa la paritat de l’índex i què et demanen: el valor del radical o les solucions.',
      sumes: 'Agrupa els radicals semblants i opera només els coeficients.',
      productes: 'Revisa els índexs i quins factors són dins o fora del radical.',
      divisions: 'Iguala els índexs si cal i revisa els factors del denominador.',
      factors: 'Comprova què passa amb cada exponent quan entra o surt del radical.'
    }
  };
})();
