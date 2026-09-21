const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const context = { window: {} };
const root = path.join(__dirname, "../3eso/matematicas/nombres");
for (const file of ["enters-data.js", "decimals-data.js", "conjunts-exercicis.js"]) {
  vm.runInNewContext(fs.readFileSync(path.join(root, file), "utf8"), context);
}
const { DECIMAL_EXERCISES: questions, DecimalAnswers: checker } = context.window;
const expected = [
  ["7"], ["6", "0.04", "0.002"], ["2,5"], ["2,75"], ["0", "34"], ["−2,35"],
  ["-0.51", "-0.5", "0.05", "0.5"], ["0.17"], ["16.25"], ["12.64"], ["2.55"],
  ["12"], ["47.5", "5.832"], ["-1.95"], ["0.0032"], ["21"], ["3.6"], ["36.5"],
  ["-5"], ["1.14"], ["2"], ["0.7"], ["1,2 : 0,03"], ["4.5"], ["4.14"],
  ["-0.3", "0.4"], ["6"], ["3"], ["2"], ["16"], ["3.4"], ["-12.45"]
];
assert.equal(questions.length, 32);
assert.equal(new Set(questions.map(q => q.id)).size, 32);
questions.forEach((q, i) => {
  assert.deepEqual(Array.from(q.answers), expected[i], q.id);
  assert.equal(q.level, Math.floor(i / 8));
  assert(checker.check(q, expected[i]), q.id);
  assert(!checker.check(q, expected[i].map(() => "99999")), q.id);
  assert(!checker.check(q, []), q.id);
  if (q.choices) assert(q.choices.includes(q.answers[0]), q.id);
  else assert(checker.check(q, expected[i].map(v => v.replace(".", ","))), q.id);
  assert(q.hints.length && q.steps.length && q.error, q.id);
});
for (const [input, output] of [
  ["  +003,4000  ", "3.4"], ["−0,003200", "-0.0032"], ["-0.000", "0"],
  ["", null], ["1 2", null], ["2+3", null], ["1,2.3", null],
  ["NaN", null], ["Infinity", null], ["1e2", null], ["0,0001", "0.0001"]
]) assert.equal(checker.canonical(input), output, input);
assert(!checker.check(questions[4], ["0", "034"]));
assert(!checker.check(questions[14], ["0.032"]));
assert(!checker.check(questions[14], ["0.00320000000001"]));
const integers = context.window.INTEGER_EXERCISES;
for (const q of integers) {
  const values = q.type ? [q.answers.join(",")] : q.answers.map(String);
  assert(context.window.IntegerAnswers.check(q, values), q.id);
}
console.log("OK: 32 decimal answer keys, decimal input edge cases, 32 integer regressions.");
const { SET_EXERCISES: sets, SetAnswers: setChecker } = context.window;
const setExpected = [
  ["N"], ["Z"], ["N, Z, Q i R"],
  ["És natural, enter, racional i real; no és positiu ni negatiu."],
  ["R","Q","Z","N"], ["Z","Q","R"], ["√2"], ["És racional perquè és igual a 1/3."],
  ["És racional i real, però no enter ni natural."], ["Negatiu i parell"],
  ["Periòdic pur"], ["12","7"], ["-3","25"],
  ["3/4 és pròpia; 7/4 és impròpia; 8/4 representa un enter."],
  ["Són el mateix racional no enter."], ["Irracional: és infinit i no periòdic."],
  ["√16 = 4; és natural i també enter, racional i real."], ["B i C"],
  ["N","Z","Q","R"], ["N","Z","Q","R","cap"]
];
assert.equal(sets.length, 20);
assert.equal(new Set(sets.map(q => q.id)).size, 20);
sets.forEach((q,i) => {
  assert.deepEqual(Array.from(q.answers), setExpected[i], q.id);
  assert.equal(q.level, Math.floor(i/5));
  assert(setChecker.check(q, setExpected[i]), q.id);
  assert(!setChecker.check(q, q.answers.map(() => "incorrecte")), q.id);
  assert(!setChecker.check(q, []), q.id);
  assert(q.hints.length && q.steps.length && q.error, q.id);
  if (q.choices) assert(q.choices.includes(q.answers[0]));
});
assert(setChecker.check(sets[4], ["ℝ","ℚ","ℤ","ℕ"]));
assert(setChecker.check(sets[5], [" z ","q","r"]));
assert(setChecker.check(sets[12], ["−3","+25"]));
assert(!setChecker.check(sets[12], ["-12","100"]));
assert(!setChecker.check(sets[11], ["12","77"]));
assert(!setChecker.check(sets[19], ["N","Z","Q","R","R"]));
console.log("OK: 20 guide exercises, four levels, classifications and input edge cases.");
