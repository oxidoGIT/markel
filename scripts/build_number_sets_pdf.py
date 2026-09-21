"""Create the introductory number-set guide, with vector inclusion diagrams."""
from pathlib import Path
import os
import re
from math import sqrt, pi
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "sources/matematicas/nombres/guia-conjunts-numerics.pdf"
FONTS = Path(os.environ.get("MATH_PDF_FONT_DIR", "/System/Library/Fonts/Supplemental"))
for name, file in [
    ("Text", "Times New Roman.ttf"), ("Text-Bold", "Times New Roman Bold.ttf"),
    ("Text-Italic", "Times New Roman Italic.ttf"), ("Sans", "Arial.ttf"),
    ("Sans-Bold", "Arial Bold.ttf"),
]:
    pdfmetrics.registerFont(TTFont(name, str(FONTS / file)))
symbol_font = Path(os.environ.get("MATH_SYMBOL_FONT", str(
    Path.home() / ".cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/poppler/fonts/DejaVuSans.ttf"
)))
pdfmetrics.registerFont(TTFont("Symbols", str(symbol_font)))
pdfmetrics.registerFontFamily("Text", normal="Text", bold="Text-Bold", italic="Text-Italic")
pdfmetrics.registerFontFamily("Sans", normal="Sans", bold="Sans-Bold")
W, H = A4
M, CW = 42, W-84
INK, TEAL, BLUE, LINE = map(HexColor, ["#243b45", "#00858a", "#245da1", "#c7d8dc"])
styles = {
    "body": ParagraphStyle("body", fontName="Text", fontSize=11, leading=14.5, textColor=INK),
    "small": ParagraphStyle("small", fontName="Sans", fontSize=9, leading=12.2, textColor=INK),
    "heading": ParagraphStyle("heading", fontName="Sans-Bold", fontSize=12.2, leading=16, textColor=TEAL),
}
c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
c.setTitle("Els conjunts numèrics: N, Z, Q i R")
c.setAuthor("Matemàtiques - 3r ESO")
c.setSubject("Guia general de la unitat: inclusions, tipus, exemples i utilitat dels nombres")


def symbols(s):
    return re.sub(r"[ℕℤℚℝ⊂∈∉∪∩∅√≈]", lambda m: '<font name="Symbols">'+m[0]+'</font>', s)


def para(s, y, style="body", x=M, width=CW, gap=7):
    p = Paragraph(symbols(s), styles[style])
    _, h = p.wrap(width, H)
    p.drawOn(c, x, H-y-h)
    return y+h+gap


def text(s, x, y, size=9, color=INK, align="left", font="Sans"):
    if re.search(r"[ℕℤℚℝ⊂∈∉∪∩∅√≈]", s):
        font = "Symbols"
    c.setFont(font, size)
    c.setFillColor(color)
    {"left": c.drawString, "center": c.drawCentredString, "right": c.drawRightString}[align](x, H-y, s)


def line(x1, y1, x2, y2, color=LINE, weight=0.7):
    c.setStrokeColor(color)
    c.setLineWidth(weight)
    c.line(x1, H-y1, x2, H-y2)


def box(x, y, w, h, fill, stroke=LINE):
    c.setFillColor(HexColor(fill))
    c.setStrokeColor(stroke)
    c.setLineWidth(0.8)
    c.rect(x, H-y-h, w, h, stroke=1, fill=1)


def heading(s, y):
    return para(s, y+5, "heading")


def table(rows, widths, y):
    t = Table([[Paragraph(symbols(str(s)), styles["small"]) for s in row] for row in rows], colWidths=widths)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), HexColor("#edf5f5")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -1), 0.5, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    _, h = t.wrap(CW, H)
    t.drawOn(c, M, H-y-h)
    return y+h+12


def start(subtitle):
    text("MATEMÀTIQUES  ·  3r ESO  ·  UNITAT 1: NOMBRES", M, 35, 8.5, TEAL, font="Sans-Bold")
    text("Els conjunts numèrics", M, 68, 24, font="Text")
    text(subtitle, M, 88, 10)
    line(M, 101, W-M, 101, TEAL, 1)
    return 114


def finish(n, y):
    assert y < 786, (n, y)
    line(M, 798, W-M, 798)
    text("Guia general · Tipus de nombres i relacions entre conjunts", M, 816, 8)
    text(f"{n} / 3", W-M, 816, 8, align="right")
    print(f"Page {n}: content ends at {y:.1f} pt")
    c.showPage()


y = start("Un mapa per entendre N, Z, Q i R")
y = para("Els conjunts numèrics no són calaixos independents. Cada ampliació conserva els nombres "
         "anteriors i n'afegeix de nous per resoldre altres problemes. <b>Un nombre pot pertànyer "
         "a diversos conjunts alhora.</b>", y)
y = heading("1. El mapa d'inclusions", y)
top = y
box(M, top, CW, 220, "#f7f9fa", INK)
text("ℝ · REALS", M+12, top+22, 13, font="Sans-Bold")
box(M+12, top+36, 316, 171, "#edf5f5", TEAL)
text("ℚ · RACIONALS", M+24, top+57, 12, TEAL)
text("També hi ha: 1/2, -7/3, 0,25, 0,333...", M+24, top+76, 9)
box(M+24, top+89, 235, 106, "#e3eeee", TEAL)
text("ℤ · ENTERS", M+36, top+109, 11, TEAL)
text("S'hi afegeixen els negatius: -1, -2, -3...", M+36, top+126, 8.5)
box(M+36, top+137, 160, 46, "#d2e5e3", TEAL)
text("ℕ · NATURALS", M+46, top+155, 10.5, TEAL)
text("0, 1, 2, 3, 4, ...", M+46, top+173, 10)
box(M+342, top+36, CW-354, 171, "#eef3fa", BLUE)
text("IRRACIONALS", M+352, top+59, 10.5, BLUE, font="Sans-Bold")
text("ℝ \\ ℚ", M+352, top+82, 12, BLUE)
text("√2, π, -√3", M+352, top+108, 12, BLUE)
para("Són reals, però no es poden expressar com un quocient d'enters.", top+122,
     "small", x=M+352, width=CW-374, gap=0)
y = top+237
text("ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ", W/2, y+12, 17, TEAL, "center")
y += 27
y = para("<b>⊂ vol dir «és un subconjunt propi de»:</b> tots els nombres del conjunt petit són al gran, "
         "però no a l'inrevés. Per exemple, 3 és natural, enter, racional i real; -2 és enter, racional "
         "i real, però no natural. Els irracionals són la part de ℝ que queda fora de ℚ.", y)
y = heading("2. Què aporta cada conjunt i per a què serveix?", y)
y = table([
    ["<b>Conjunt</b>", "<b>Quins nombres conté?</b>", "<b>Ús habitual</b>"],
    ["ℕ · Naturals", "0, 1, 2, 3... Quantitats enteres no negatives.", "Comptar: 24 alumnes, 0 objectes."],
    ["ℤ · Enters", "Naturals i enters negatius.", "Expressar un origen i un sentit: -4 °C, deutes, plantes."],
    ["ℚ · Racionals", "a/b, amb a i b enters i b ≠ 0. També els enters: 5 = 5/1.", "Repartir i comparar proporcions: 3/4 de litre, 25% = 1/4."],
    ["ℝ · Reals", "Tots els racionals i tots els irracionals.", "Situar punts a la recta i descriure longituds, temps i magnituds contínues."],
], [85, 213, CW-298], y)
y = para("<b>Convenció sobre el zero.</b> En aquesta guia, 0 ∈ ℕ. Alguns llibres comencen ℕ en 1; "
         "cal mirar la convenció utilitzada. En qualsevol cas, 0 pertany a ℤ, ℚ i ℝ.", y, "small")
finish(1, y)

y = start("Subtipus bàsics i maneres d'escriure un mateix nombre")
y = heading("3. Dins dels enters: signe i divisibilitat", y)
y = para("Els enters es divideixen en <b>negatius, zero i positius</b>. El zero no és positiu ni negatiu. "
         "Una altra classificació és la paritat: un enter <b>parell</b> és múltiple de 2 (-4, 0, 6); "
         "un <b>imparell</b> no ho és (-3, 1, 7). Aquestes classificacions es creuen: -4 és negatiu i parell.", y)
y = heading("4. Fraccions i tipus de decimals", y)
y = para("Un racional és qualsevol nombre que es pot escriure com <b>a/b</b>, amb a i b enters i b ≠ 0. "
         "La fracció i el decimal poden representar exactament el mateix valor: "
         "<b>3/4 = 0,75 = 75%</b>. Canviar l'escriptura no canvia el conjunt.", y)
y = table([
    ["<b>Expressió decimal</b>", "<b>Com es reconeix?</b>", "<b>Exemple equivalent</b>"],
    ["Exacta", "Es pot escriure amb un nombre finit de decimals. Els enters també en tenen una.", "0,125 = 1/8<br/>4 = 4,0 = 4/1"],
    ["Periòdica pura", "El bloc mínim que es repeteix comença just després de la coma.", "0,333... = 1/3<br/>Període: 3."],
    ["Periòdica mixta", "Abans del període hi ha una part decimal que no es repeteix: l'anteperíode.", "0,1666... = 1/6<br/>Anteperíode: 1.<br/>Període: 6."],
    ["Infinita no periòdica", "No acaba ni repeteix cap bloc indefinidament a partir d'un punt. És irracional.", "√2 = 1,414213...<br/>π = 3,141592..."],
], [111, 235, CW-346], y)
y = para("En els exemples periòdics, els punts suspensius indiquen que el bloc escrit es repeteix per "
         "sempre. No es pot deduir un període només perquè coincideixin unes quantes xifres. "
         "<b>Els racionals tenen expressió decimal exacta o periòdica; els irracionals, infinita no periòdica.</b>", y)
y = heading("5. Les fraccions també es poden classificar", y)
y = para("Per a fraccions positives: una fracció <b>pròpia</b> té numerador menor que el denominador "
         "(3/4 &lt; 1); una <b>impròpia</b> té numerador igual o més gran (7/4 &gt; 1, 4/4 = 1). "
         "Si el numerador és múltiple del denominador, la fracció representa un enter: 8/4 = 2.", y)
y = para("Les fraccions <b>equivalents</b> tenen el mateix valor: 6/8 = 3/4. La fracció 3/4 és "
         "<b>irreductible</b>: numerador i denominador no tenen cap divisor comú més gran que 1.", y)
y = heading("6. Per què necessitem els irracionals?", y)
top = y
sx, sy, side = M+8, top+8, 85
box(sx, sy, side, side, "#f4f7fa", BLUE)
line(sx, sy+side, sx+side, sy, TEAL, 1.5)
text("1", sx+side/2, sy+side+15, 9, align="center")
text("1", sx+side+10, sy+side/2, 9)
text("√2", sx+side/2-12, sy+side/2-7, 11, TEAL)
right = M+128
end = para("En un quadrat de costat 1, el teorema de Pitàgores dona "
           "<b>d² = 1² + 1² = 2</b>; per tant, la diagonal mesura <b>√2</b>. "
           "Aquesta longitud existeix, però no és cap fracció d'enters.", top, x=right, width=CW-128)
end = para("El nombre <b>π</b> relaciona la longitud d'una circumferència amb el seu diàmetre: "
           "<b>L = π · d</b>. Per calcular usem aproximacions, però √2 ≠ 1,41 i π ≠ 3,14.", end,
           x=right, width=CW-128)
y = max(top+115, end)+6
y = para("<b>No totes les arrels són irracionals:</b> √9 = 3 és natural. Classifica el valor, no el símbol.", y, "small")
finish(2, y)

y = start("Comparar, classificar i interpretar la recta real")
y = heading("7. Un mateix valor pot tenir diverses pertinences", y)
y = para("<b>∈</b> vol dir «pertany a». Per exemple, -4 ∈ ℤ i -4 ∈ ℚ, perquè -4 = -4/1. "
         "Quan et demanen el conjunt <b>més petit</b>, tria el primer de la cadena ℕ, ℤ, ℚ, ℝ "
         "que contingui el valor.", y)
y = table([
    ["<b>Nombre</b>", "<b>ℕ</b>", "<b>ℤ</b>", "<b>ℚ</b>", "<b>ℝ</b>", "<b>Conjunt més petit / motiu</b>"],
    ["0", "Sí", "Sí", "Sí", "Sí", "ℕ, segons la convenció de la guia."],
    ["7", "Sí", "Sí", "Sí", "Sí", "ℕ: és un enter no negatiu."],
    ["-4", "No", "Sí", "Sí", "Sí", "ℤ: és negatiu, però enter."],
    ["3/4", "No", "No", "Sí", "Sí", "ℚ: és racional, però no enter."],
    ["-0,12", "No", "No", "Sí", "Sí", "ℚ: -0,12 = -12/100 = -3/25."],
    ["√9", "Sí", "Sí", "Sí", "Sí", "ℕ: √9 = 3."],
    ["√2", "No", "No", "No", "Sí", "ℝ: és irracional."],
    ["π", "No", "No", "No", "Sí", "ℝ: és irracional."],
], [59, 32, 32, 32, 32, CW-187], y)
y = heading("8. Tots conviuen a la mateixa recta", y)
y = para("Cada nombre real correspon a un punt de la recta i cada punt, a un real. "
         "Els irracionals no van «després» dels racionals: estan intercalats. "
         "Entre dos reals diferents sempre hi ha racionals i irracionals.", y)
ay = y+40
x = lambda value: M+25+(value+2)/5.5*(CW-50)
line(x(-2)-10, ay, x(3.5)+6, ay, INK, 1)
line(x(3.5)+6, ay, x(3.5), ay-3, INK, 1)
line(x(3.5)+6, ay, x(3.5), ay+3, INK, 1)
for i in range(-2, 4):
    line(x(i), ay-3, x(i), ay+3, INK)
    text(str(i), x(i), ay+19, 9, align="center")
for value, label, color, up in [(-2, "-2", TEAL, 21), (-0.5, "-1/2", TEAL, 21),
                                (0, "0", TEAL, 21), (sqrt(2), "√2", BLUE, 21),
                                (pi, "π", BLUE, 21)]:
    c.setFillColor(color)
    c.circle(x(value), H-ay, 3.1, fill=1, stroke=0)
    text(label, x(value), ay-up, 10, color, "center")
y = ay+33
y = para("√2 ≈ 1,414 i π ≈ 3,142 indiquen on situar-los en el dibuix. "
         "La posició dibuixada és aproximada; el nombre representat és exacte.", y, "small")
y = heading("9. Tres ampliacions que resolen tres límits", y)
y = table([
    ["<b>Problema</b>", "<b>Què passa?</b>", "<b>Ampliació útil</b>"],
    ["3 - 5 = -2", "El resultat no és natural.", "De ℕ a ℤ: podem restar."],
    ["1 : 4 = 1/4", "El resultat no és enter.", "De ℤ a ℚ: podem repartir (divisor no nul)."],
    ["Diagonal del quadrat unitat: √2", "La longitud no és racional.", "De ℚ a ℝ: incloem també longituds irracionals."],
], [137, 160, CW-297], y)
y = para("<b>No confonguis valor i escriptura.</b> 6/3 és natural perquè val 2; 2,0 també. "
         "Un decimal infinit pot ser racional si és periòdic. I cap d'aquests conjunts permet dividir "
         "entre zero. ℝ és el conjunt més ampli que treballem en aquesta unitat.", y)
finish(3, y)
c.save()
print(OUT)
