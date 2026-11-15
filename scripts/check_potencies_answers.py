#!/usr/bin/env python3
"""Independently recalculate the numeric exercises using exact Python fractions."""
import ast
import json
from collections import Counter
from fractions import Fraction
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / '3eso/matematicas/potencies/exercicis.js'
text = DATA.read_text(encoding='utf-8')
questions = json.loads(text.split('window.POTENCIES_EXERCISES = ', 1)[1].rsplit(';', 1)[0])


def exact_root(value, index):
    sign = -1 if value < 0 else 1
    assert sign == 1 or index % 2, 'No real even root of a negative number'
    value = abs(value)
    low, high = 0, value + 1
    while low + 1 < high:
        middle = (low + high) // 2
        if middle ** index <= value:
            low = middle
        else:
            high = middle
    assert low ** index == value, 'Root is not exact'
    return sign * low


def calculate(expression):
    def visit(node):
        if isinstance(node, ast.Constant):
            return Fraction(str(node.value))
        if isinstance(node, ast.UnaryOp):
            return -visit(node.operand) if isinstance(node.op, ast.USub) else visit(node.operand)
        if isinstance(node, ast.BinOp):
            a, b = visit(node.left), visit(node.right)
            if isinstance(node.op, ast.Add):
                return a + b
            if isinstance(node.op, ast.Sub):
                return a - b
            if isinstance(node.op, ast.Mult):
                return a * b
            if isinstance(node.op, ast.Div):
                return a / b
            if isinstance(node.op, ast.Pow):
                return Fraction(exact_root(a.numerator, b.denominator),
                                exact_root(a.denominator, b.denominator)) ** b.numerator
        raise ValueError(f'Unsupported arithmetic in {expression}')
    return visit(ast.parse(expression.replace('^', '**'), mode='eval').body)


assert len(questions) == len({q['id'] for q in questions}) == 106
assert set(q['group'] for q in questions) == {'signes', 'propietats', 'negatius', 'combinades', 'racionals', 'arrels'}
assert sum(q['page'] is not None for q in questions) == 98
assert sum(q['priority'] for q in questions) == 20
assert sum(q['level'] == 'Alt' for q in questions) == 48
root_values = {'√9': '3', '⁴√16': '2', '√4': '2', '³√27': '3', '³√(-27)': '-3', 'Quin valor té √0?': '0'}
checked = 0
for question in questions:
    assert question['hint'] and question['steps'] and question['ref'], question['id']
    if question['page'] is not None:
        assert 1 <= question['page'] <= 19, question['id']
    if question['mode'] == 'choice':
        assert question['answer'] in question['choices'], question['id']
        assert len(set(question['choices'])) == len(question['choices']), question['id']
        continue
    expression = question['expression']
    expected = Fraction(root_values[expression]) if expression in root_values else calculate(expression)
    assert calculate(question['answer']) == expected, (question['id'], expected, question['answer'])
    checked += 1

# Regressions for incorrect worked answers in the supplied notes.
by_expression = {q['expression']: q for q in questions}
for expression, correct in [
    ('-2^0', '-1'),
    ('(2/3)^-2*(2/3)^3', '2/3'),
    ('(2/3)^2*(2/3)^-3', '3/2'),
    ('(2/3)^-2*(2/3)^-3', '243/32'),
    ('(15/7*(21/5)^2*(-1)*(2/3))^3', '-2000376/125'),
    ('((2^-4*4^3)^2*5*5^0)/(100^2*(5^-2)^-3)', '1/1953125'),
]:
    q = by_expression[expression]
    assert calculate(q['answer']) == Fraction(correct), q['id']
    assert q['priority'], q['id']

assert DATA.parent.joinpath('index.html').is_file()
assert ROOT.joinpath('sources/matematicas/potencies/mates-potencias.pdf').is_file()
print(f'OK: {checked} numeric answers recalculated exactly, source references and six topic groups.')
print('Coverage:', dict(Counter(q['group'] for q in questions)))
