const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const context = { window: {} };
const root = path.join(__dirname, "../3eso/matematicas/nombres");
for (const file of ["enters-data.js", "decimals-data.js"]) {
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
