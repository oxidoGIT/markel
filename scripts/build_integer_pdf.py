"""Build the three-page integer chapter with vector diagrams and embedded fonts."""
from pathlib import Path
import os
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "sources/matematicas/nombres/apartat-1-nombres-enters.pdf"
FONTS = Path(os.environ.get("MATH_PDF_FONT_DIR", "/System/Library/Fonts/Supplemental"))
for name, filename in [
    ("Text", "Times New Roman.ttf"), ("Text-Bold", "Times New Roman Bold.ttf"),
    ("Text-Italic", "Times New Roman Italic.ttf"), ("Sans", "Arial.ttf"),
    ("Sans-Bold", "Arial Bold.ttf"),
]:
    pdfmetrics.registerFont(TTFont(name, str(FONTS / filename)))
pdfmetrics.registerFontFamily("Text", normal="Text", bold="Text-Bold", italic="Text-Italic")
pdfmetrics.registerFontFamily("Sans", normal="Sans", bold="Sans-Bold")
W, H = A4
M = 42
CW = W - 2 * M
INK, TEAL, BLUE = map(HexColor, ["#243b45", "#00858a", "#245da1"])
LINE, PALE = map(HexColor, ["#c7d8dc", "#edf5f5"])
styles = {
    "body": ParagraphStyle("body", fontName="Text", fontSize=11, leading=14.3, textColor=INK),
    "small": ParagraphStyle("small", fontName="Sans", fontSize=9, leading=12, textColor=INK),
    "heading": ParagraphStyle("heading", fontName="Sans-Bold", fontSize=12.3, leading=16, textColor=TEAL),
    "math": ParagraphStyle("math", fontName="Text-Bold", fontSize=12, leading=16, textColor=INK),
}
c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
c.setTitle("Apartat 1. Nombres enters")
c.setAuthor("Matemàtiques - 3r ESO")
c.setSubject("Teoria, exemples resolts i representacions dels nombres enters")


def para(text, y, style="body", x=M, width=CW, gap=6):
    p = Paragraph(text, styles[style])
    _, height = p.wrap(width, H)
    p.drawOn(c, x, H - y - height)
    return y + height + gap


def text(label, x, y, size=9, color=INK, align="left", font="Sans"):
    c.setFillColor(color)
    c.setFont(font, size)
    method = {"left": c.drawString, "center": c.drawCentredString, "right": c.drawRightString}[align]
    method(x, H-y, label)


def line(x1, y1, x2, y2, color=LINE, weight=0.7):
    c.setStrokeColor(color)
    c.setLineWidth(weight)
    c.line(x1, H-y1, x2, H-y2)


def arrow(x1, y, x2, color=TEAL):
    line(x1, y, x2, y, color, 1.3)
    direction = 1 if x2 > x1 else -1
    line(x2, y, x2-direction*5, y-3, color, 1.3)
    line(x2, y, x2-direction*5, y+3, color, 1.3)


def axis(y, lo, hi, marks=(), labels=None):
    x = lambda n: M + 24 + (n-lo)/(hi-lo)*(CW-48)
    arrow(x(lo)-9, y, x(hi)+9, INK)
    for n in range(lo, hi+1):
        line(x(n), y-3, x(n), y+3, INK)
        if labels is None or n in labels:
            text(str(n), x(n), y+16, 8.5, align="center")
    for n, color in marks:
        c.setFillColor(color)
        c.circle(x(n), H-y, 3.2, fill=1, stroke=0)
    return x


def movement(y, a, b, label, lo=-8, hi=8):
    text(label, M, y, 10.2, TEAL, font="Sans-Bold")
    ay = y + 39
    x = axis(ay, lo, hi, [(a, BLUE), (b, TEAL)], labels=range(lo, hi+1, 2))
    line(x(a), ay-5, x(a), ay-18, BLUE)
    line(x(b), ay-5, x(b), ay-18, TEAL)
    arrow(x(a), ay-18, x(b))
    text("inici", x(a), ay-25, 8, BLUE, "center")
    text("final", x(b), ay-25, 8, TEAL, "center")
    return ay + 25


def table(rows, widths, y):
    cells = [[Paragraph(str(s), styles["small"]) for s in row] for row in rows]
    t = Table(cells, colWidths=widths)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PALE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -1), 0.5, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    _, height = t.wrap(CW, H)
    t.drawOn(c, M, H-y-height)
    return y + height + 12


def heading(label, y):
    return para(label, y+5, "heading", gap=7)


def start(subtitle):
    text("MATEMÀTIQUES  ·  3r ESO  ·  UNITAT 1: NOMBRES", M, 35, 8.5, TEAL, font="Sans-Bold")
    text("Apartat 1. Nombres enters", M, 68, 23, font="Text")
    text(subtitle, M, 88, 10, color=INK)
    line(M, 101, W-M, 101, TEAL, 1)
    return 114


def finish(page, y):
    assert y <= 786, f"Page {page} overflows: {y:.1f}"
    line(M, 798, W-M, 798)
    text("Nombres enters · Teoria i exemples resolts", M, 816, 8)
    text(f"{page} / 3", W-M, 816, 8, align="right")
    print(f"Page {page}: content ends at {y:.1f} pt; limit 786 pt")
    c.showPage()


y = start("Conjunt Z, ordre, oposat i distància")
y = heading("1. Els enters i la recta numèrica", y)
y = para("Els <b>nombres enters</b> formen el conjunt <b>Z = {..., -3, -2, -1, 0, 1, 2, 3, ...}</b>. "
         "Inclouen els enters positius, els negatius i el zero, que <b>no és positiu ni negatiu</b>. "
         "Permeten expressar quantitats a banda i banda d'un origen: -4 °C és una temperatura sota zero; "
         "un saldo de -8 € representa un deute de 8 €.", y)
y = para("A la recta es fixa l'origen, el sentit positiu i una unitat de longitud. Els enters consecutius "
         "estan separats per la mateixa distància. El valor creix cap a la dreta.", y)
x = axis(y+31, -8, 8, [(-6, BLUE), (0, INK), (4, TEAL)], labels=range(-8, 9, 2))
text("negatius", x(-4), y+13, 9, BLUE, "center")
text("positius", x(4), y+13, 9, TEAL, "center")
y += 66
y = heading("2. Comparar i ordenar", y)
y = para("Un enter és més gran que un altre si queda més a la dreta. Tot positiu és més gran que zero "
         "i qualsevol negatiu. Entre negatius, és més gran el que és més a prop de zero: <b>-3 &gt; -8</b>.", y)
y = para("<b>Exemple.</b> Per ordenar -4, 7, 0 i -9, col·loquem primer els negatius, després el zero "
         "i finalment el positiu:<br/><b>-9 &lt; -4 &lt; 0 &lt; 7</b>.", y)
y = heading("3. Oposat i valor absolut: dues idees diferents", y)
y = para("L'<b>oposat</b> de <i>a</i> és -<i>a</i>: compleix <b>a + (-a) = 0</b>. Els nombres 5 i -5 són "
         "simètrics respecte del zero. El zero és el seu propi oposat.", y)
y = para("El <b>valor absolut</b>, |a|, és la distància d'a al zero. Per això mai no és negatiu. "
         "Si a és positiu o zero, |a| = a; si a és negatiu, |a| = -a. Així, |-5| = 5 i |5| = 5.", y)
y = table([
    ["<b>Nombre a</b>", "<b>Oposat -a</b>", "<b>Valor absolut |a|</b>"],
    ["5", "-5", "5"], ["-5", "5", "5"], ["0", "0", "0"],
], [CW/3]*3, y)
y = heading("4. Distància i canvi amb signe", y)
y = para("La distància entre a i b és <b>|b - a|</b> i no depèn de l'ordre dels punts. "
         "El canvi d'a fins a b és <b>b - a</b>: el signe indica el sentit del desplaçament.", y)
x = axis(y+30, -6, 9, [(-6, BLUE), (0, INK), (9, TEAL)], labels=[-6, -3, 0, 3, 6, 9])
arrow(x(0), y+9, x(-6), BLUE)
arrow(x(9), y+9, x(0), TEAL)
text("6 unitats", (x(-6)+x(0))/2, y+2, 8.5, BLUE, "center")
text("9 unitats", (x(0)+x(9))/2, y+2, 8.5, TEAL, "center")
y += 60
y = para("<b>Exemple.</b> De 9 a -6, el canvi és -6 - 9 = <b>-15</b>. La distància recorreguda és "
         "|-15| = <b>15 unitats</b>: 9 fins al zero i 6 més fins a -6.", y)
finish(1, y)

y = start("Sumes, restes, productes i divisions")
y = heading("5. Sumar i restar: operar amb signes", y)
y = para("<b>Mateix signe:</b> suma els valors absoluts i conserva el signe comú: "
         "(-8) + (-5) = -13. <b>Signes diferents:</b> resta el valor absolut menor del major i conserva "
         "el signe del de valor absolut més gran: -8 + 13 = 5. Si són oposats, la suma és zero.", y)
y = para("<b>Restar és sumar l'oposat: a - b = a + (-b).</b> Aquesta regla serveix tant si b és positiu "
         "com si és negatiu. En -5 - (-3), el primer menys indica una resta i el segon, el signe de -3.", y)
y = movement(y+7, -3, 2, "Sumar un positiu: -3 + 5 = 2")
y = movement(y, 2, -5, "Restar un positiu: 2 - 7 = 2 + (-7) = -5")
y = movement(y, -5, -2, "Restar un negatiu: -5 - (-3) = -5 + 3 = -2")
y = para("<b>Agrupar ajuda.</b> La suma és commutativa i associativa: es pot canviar l'ordre i "
         "l'agrupació dels sumands. Interpreta primer les restes com sumes d'oposats: "
         "<b>-7 + 12 - 9 + 4 = (12 + 4) - (7 + 9) = 0</b>. La resta no és commutativa: "
         "5 - 2 = 3, però 2 - 5 = -3.", y)
y = heading("6. Multiplicar i dividir", y)
y = para("Opera amb els valors absoluts i determina el signe: <b>signes iguals, resultat positiu; "
         "signes diferents, resultat negatiu</b>. La taula s'aplica a nombres no nuls.", y)
y = table([
    ["<b>Signes dels dos nombres</b>", "<b>Producte</b>", "<b>Quocient exacte</b>"],
    ["+ i +", "6 · 8 = 48", "72 : 9 = 8"],
    ["+ i -", "6 · (-8) = -48", "72 : (-9) = -8"],
    ["- i +", "(-6) · 8 = -48", "(-72) : 9 = -8"],
    ["- i -", "(-6) · (-8) = 48", "(-72) : (-9) = 8"],
], [CW*0.38, CW*0.31, CW*0.31], y)
y = para("<b>Per què menys per menys dona més?</b> Per la distributiva, "
         "0 = (-3) · [4 + (-4)] = -12 + (-3) · (-4). Per tant, (-3) · (-4) ha de valer 12.", y)
y = para("En un producte de factors no nuls, un nombre <b>parell de factors negatius</b> dona positiu; "
         "un nombre imparell, negatiu. Si hi ha un factor zero, el producte és zero.", y)
y = para("<b>Atenció al zero i al conjunt.</b> 0 : 5 = 0, però <b>no es pot dividir entre zero</b>, "
         "ni tan sols 0 : 0. La divisió de dos enters no sempre és entera: 5 : 2 = 2,5. "
         "En canvi, la suma, la resta i el producte d'enters sempre són enters.", y)
finish(2, y)

y = start("Jerarquia, propietats i exemples de càlcul algebraic")
y = heading("7. La jerarquia de les operacions", y)
y = table([
    ["<b>Prioritat</b>", "<b>Què es resol?</b>", "<b>En quin ordre?</b>"],
    ["1", "Parèntesis i claudàtors", "De dins cap a fora."],
    ["2", "Productes i divisions", "Mateixa prioritat: d'esquerra a dreta."],
    ["3", "Sumes i restes", "Mateixa prioritat: d'esquerra a dreta."],
], [52, 186, CW-238], y)
y = para("<b>Exemple clau.</b> 24 : 6 · 2 = 4 · 2 = <b>8</b>, no 24 : 12. "
         "Productes i divisions comparteixen nivell. També "
         "(-96) : 8 : (-3) = -12 : (-3) = <b>4</b>.", y)
y = heading("8. Distributiva i eliminació de parèntesis", y)
y = para("La distributiva multiplica <b>tots els termes</b> del parèntesi: "
         "<b>a(b + c) = ab + ac</b>. Per exemple, -3(x - 4) = -3x + 12. "
         "Un menys davant d'un parèntesi equival a multiplicar per -1: "
         "<b>-(a - b) = -a + b</b>.", y)
y = para("Només s'agrupen termes semblants. Així, <b>-2(3x - 4) + 5x = -6x + 8 + 5x = -x + 8</b>. "
         "El 8 no es pot sumar al coeficient de x. Amb x = -3, les dues expressions valen 11.", y)
y = heading("9. Exemples resolts, sense saltar passos", y)
y = para("<b>A. Un producte dins d'un claudàtor</b>", y, gap=3)
y = para("-2 · [5 - 3 · (-4)]<br/>"
         "= -2 · [5 - (-12)] <i>(primer, el producte interior)</i><br/>"
         "= -2 · 17 <i>(restar un negatiu és sumar)</i><br/>"
         "= <b>-34</b>.", y)
y = para("<b>B. Parèntesis encaixats i un menys exterior</b>", y, gap=3)
y = para("18 - [7 - (3 - 11)]<br/>"
         "= 18 - [7 - (-8)] <i>(resolem el parèntesi més interior)</i><br/>"
         "= 18 - 15 <i>(el claudàtor val 15)</i><br/>"
         "= <b>3</b>.", y)
y = para("<b>C. Una equació amb coeficient negatiu</b>", y, gap=3)
y = para("Per resoldre <b>-3x + 5 = 20</b>, resta 5 als dos membres: -3x = 15. "
         "Divideix tots dos membres entre -3: <b>x = -5</b>. "
         "Comprovació: -3 · (-5) + 5 = 15 + 5 = 20.", y)
y = heading("10. Errors que cal evitar", y)
y = table([
    ["<b>Error</b>", "<b>Raonament correcte</b>"],
    ["Aplicar la regla del producte a una suma.", "(-3) + (-4) = -7, però (-3) · (-4) = 12."],
    ["Confondre oposat i valor absolut.", "Per a 6, l'oposat és -6 i el valor absolut és 6."],
    ["Canviar només un signe del parèntesi.", "-(5 - 8) = -5 + 8 = 3."],
], [CW*0.46, CW*0.54], y)
y = para("<b>Abans d'acabar:</b> revisa signes i prioritat, comprova que el resultat té sentit "
         "i verifica'l amb una operació inversa o substituint la solució.", y, "small", gap=3)
finish(3, y)
c.save()
print(OUT)
