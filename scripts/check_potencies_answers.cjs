const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = {window:{}};
const root = path.join(__dirname,'../3eso/matematicas/potencies');
for (const file of ['exercicis.js','potencies.js']) vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),context);
const questions = context.window.POTENCIES_EXERCISES;
const checker = context.window.PotenciesAnswers;
for (const q of questions) {
  assert(checker.check(q,q.answer),q.id);
  assert(!checker.check(q,''),q.id);
  assert(!checker.check(q,'999999999'),q.id);
  if (q.choices) for (const wrong of q.choices.filter(c=>c!==q.answer)) assert(!checker.check(q,wrong),q.id);
}
const number = answer => ({mode:'number',answer});
const power = answer => ({mode:'power',answer});
for (const [answer,input] of [
  ['32','2⁵'],['-1','−1'],['1/4','2/8'],['3/10','0,3'],['0.16','0,16'],
  ['10000/81','(10/3)^4'],['-729','(-9)^3'],['-1','-2^0']
]) assert(checker.check(number(answer),input),input);
assert(checker.check(power('2^12'),'4^6'));
assert(checker.check(power('(2/3)^15'),'(3/2)^-15'));
assert(checker.check(power('5^-9'),'5⁻⁹'));
for (const input of ['4096','2^7*2^5','(2^4)^3']) assert(!checker.check(power('2^12'),input),input);
for (const input of ['NaN','Infinity','1/0','0^0','2^10000000','2**5','3 2','Math.pow(2,5)','globalThis','32+0']) assert(!checker.check(number('32'),input),input);
assert(!checker.check(number('1'),'-2^0'));
assert(!checker.check(number('81'),'-9^2'));
assert(!checker.check(number('2'),'±2'));
assert(!checker.check(number('1/4'),'0.25000000000001'));
console.log('OK: 106 question keys, all distractors, equivalent fractions/powers, signs and input limits.');
