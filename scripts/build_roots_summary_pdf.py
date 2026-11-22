"""Build the one-page Unit 2b formula sheet (ReportLab + vector MathText)."""
from pathlib import Path
import os
os.environ.setdefault('MPLCONFIGDIR', '/tmp/markel-roots-matplotlib')
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from matplotlib.textpath import TextPath
from matplotlib.path import Path as MplPath
from matplotlib.font_manager import FontProperties

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'sources/matematicas/arrels/resum-teoria-unitat-2b.pdf'
FONTS = Path(os.environ.get('MATH_PDF_FONT_DIR', '/System/Library/Fonts/Supplemental'))
for name, file in [('Sans','Arial.ttf'),('Sans-Bold','Arial Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(FONTS / file)))
pdfmetrics.registerFontFamily('Sans',normal='Sans',bold='Sans-Bold')
W,H = A4
M,GAP = 30,12
CW = W-2*M
COL = (CW-GAP)/2
BLUE,INK,MUTED,LINE,PALE,RED = map(HexColor,['#2a6084','#243440','#50616e','#cfdee8','#f2f7fa','#9c4438'])
c = canvas.Canvas(str(OUTPUT),pagesize=A4,pageCompression=1)
c.setTitle('Unitat 2b - Arrels: resum de teoria')
c.setAuthor('Matemàtiques - 3r ESO')
c.setSubject('Potències amb exponent racional i operacions amb radicals')
c.setKeywords('arrels, radicals, exponent racional, formulari, 3r ESO, català')
styles = {name:ParagraphStyle(name,fontName='Sans',fontSize=size,leading=leading,textColor=color)
          for name,size,leading,color in [('body',9.3,12.4,INK),('small',8.1,10.6,MUTED),('label',9.3,12,BLUE)]}
active_card = None
mathfont=FontProperties(family='STIXGeneral',math_fontfamily='stix')


def text(s,x,y,size=10,font='Sans',color=INK,align='left'):
    c.setFillColor(color);c.setFont(font,size)
    {'left':c.drawString,'right':c.drawRightString,'center':c.drawCentredString}[align](x,H-y,s)


def paragraph(s,x,y,width,style='body',limit=None):
    p=Paragraph(s,styles[style]);_,height=p.wrap(width,H)
    if limit is not None: assert y+height <= limit, (s,y+height,limit)
    p.drawOn(c,x,H-y-height)
    return y+height


def formula(s,x,y,width=COL-22,size=15,color=INK):
    """Draw math outlines as vector paths; y is the top of the visible formula."""
    path=TextPath((0,0),'$'+s+'$',size=size,prop=mathfont)
    bb=path.get_extents()
    scale=min(1,width/bb.width)
    assert size*scale >= 10.5, (s,size*scale)
    if active_card is not None:
        assert y+bb.height*scale <= active_card[3]-3, (s,y+bb.height*scale,active_card)
    c.saveState();c.setFillColor(color)
    c.translate(x+(width-bb.width*scale)/2,H-y-bb.height*scale)
    c.scale(scale,scale);c.translate(-bb.x0,-bb.y0)
    out=c.beginPath();current=(0,0)
    for pts,code in path.iter_segments(curves=True):
        if code == MplPath.MOVETO:
            out.moveTo(*pts);current=tuple(pts)
        elif code == MplPath.LINETO:
            out.lineTo(*pts);current=tuple(pts)
        elif code == MplPath.CURVE3:
            control=pts[:2];end=pts[2:]
            c1=[current[i]+2*(control[i]-current[i])/3 for i in (0,1)]
            c2=[end[i]+2*(control[i]-end[i])/3 for i in (0,1)]
            out.curveTo(*c1,*c2,*end);current=tuple(end)
        elif code == MplPath.CURVE4:
            out.curveTo(*pts);current=tuple(pts[-2:])
        elif code == MplPath.CLOSEPOLY:
            out.close()
    c.drawPath(out,fill=1,stroke=0);c.restoreState()
    return y+bb.height*scale


def section(n,title,y):
    c.setFillColor(BLUE);c.roundRect(M,H-y-16,25,16,4,fill=1,stroke=0)
    text(n,M+12.5,y+11.5,9,'Sans-Bold',white,'center')
    text(title,M+35,y+12,11.5,'Sans-Bold',INK)


def card(x,y,width,height,label):
    global active_card
    active_card = (x,y,width,y+height)
    c.setFillColor(PALE);c.setStrokeColor(LINE);c.setLineWidth(.5)
    c.roundRect(x,H-y-height,width,height,6,fill=1,stroke=1)
    text(label,x+11,y+17,9.7,'Sans-Bold',BLUE)
    return x+11,width-22


# Header and common domain. Conditions keep the formulas simple and unambiguous.
c.setFillColor(BLUE);c.rect(M,H-81,4,51,fill=1,stroke=0)
text('ARRELS',M+16,53,29,'Sans-Bold')
text('Potències amb exponent racional',M+17,75,12,color=BLUE)
text('3r ESO · Unitat 2b',W-M,41,10,'Sans-Bold',align='right')
text('Full de fórmules i repàs',W-M,59,9,color=MUTED,align='right')
paragraph('En les fórmules amb lletres: <b>a, b i k positius</b>; índexs enters ≥ 2. '
          'm enter. Els denominadors no poden ser zero.',M,91,CW,'small',115)

section('01','Què és una arrel? Parts i signes',120)
x,w=card(M,144,COL,105,'Índex, radicand i coeficient')
formula(r'k\,\sqrt[n]{a}=k\cdot a^{1/n}',x,174,w,17)
paragraph('<b>k</b>: coeficient · <b>n</b>: índex · <b>a</b>: radicand.<br/>'
          'L’arrel de a, elevada a n, dona a.<br/>Si no s’escriu l’índex, és 2.',x,205,w,'body',245)
x,w=card(M+COL+GAP,144,COL,105,'En els nombres reals')
paragraph('<b>Índex parell:</b> radicand ≥ 0; arrel principal ≥ 0.<br/>'
          '<b>Índex senar:</b> conserva el signe del radicand.',x,169,w,'body',201)
formula(r'\sqrt{4}=2\quad\sqrt[3]{-27}=-3',x,203,w,13)
paragraph('√(−4) no té valor real. Totes les arrels de 0 valen 0.',x,231,w,'small',246)

section('02','De potència a radical i a l’inrevés',262)
x,w=card(M,286,COL,94,'El denominador és l’índex')
formula(r'a^{m/n}=\sqrt[n]{a^m}=(\sqrt[n]{a})^m',x,314,w,17)
paragraph('Numerador m: exponent. Denominador n: índex.',x,344,w,'small',355)
formula(r'5^{3/4}=\sqrt[4]{5^3}\qquad\sqrt{2^3}=2^{3/2}',x,360,w,11.8)
x,w=card(M+COL+GAP,286,COL,94,'Exponent negatiu: pren l’invers')
formula(r'a^{-m/n}=\frac{1}{a^{m/n}}=\sqrt[n]{\left(\frac{1}{a}\right)^m}',x,312,w,16)
formula(r'8^{-2/3}=\frac{1}{(\sqrt[3]{8})^2}=\frac{1}{4}',x,348,w,14)

section('03','Operacions amb radicals',394)
x,w=card(M,418,COL,121,'Suma i resta: només radicals semblants')
paragraph('Han de tenir el mateix índex i el mateix radicand. Opera els coeficients i conserva el radical.',x,443,w,'body',474)
formula(r'p\,\sqrt[n]{a}+q\,\sqrt[n]{a}=(p+q)\sqrt[n]{a}',x,478,w,14)
formula(r'3\sqrt{3}+5\sqrt{3}=8\sqrt{3}',x,508,w,14)
x,w=card(M+COL+GAP,418,COL,121,'Producte i quocient: mateix índex')
formula(r'\sqrt[n]{a}\cdot\sqrt[n]{b}=\sqrt[n]{ab}',x,447,w,16)
formula(r'\frac{\sqrt[n]{a}}{\sqrt[n]{b}}=\sqrt[n]{\frac{a}{b}}',x,477,w,16)
paragraph('Opera els coeficients a fora i els radicands a dins.',x,519,w,'small',536)

section('04','Si els índexs són diferents',552)
x,w=card(M,576,CW,75,'1. Calcula el mcm.  2. Reescriu els radicals.  3. Opera.')
paragraph('Si multipliques l’índex per un nombre, multiplica també per aquest nombre tots els exponents del radicand.',x,599,w,'body',627)
formula(r'\sqrt[3]{2}\cdot\sqrt[4]{3}=\sqrt[12]{2^4\cdot3^3}\qquad\frac{\sqrt[3]{2^2}}{\sqrt[5]{2^3}}=\sqrt[15]{\frac{2^{10}}{2^9}}=\sqrt[15]{2}',x,618,w,13)

section('05','Extreure i introduir factors',664)
x,w=card(M,688,COL,87,'Extreure: divideix exponent entre índex')
paragraph('Quocient: exponent que surt.<br/>Residu: exponent que queda a dins.',x,714,w,'body',741)
formula(r'\sqrt[3]{a^7b^3c}=a^2b\sqrt[3]{ac}',x,747,w,14)
x,w=card(M+COL+GAP,688,COL,87,'Introduir: eleva el factor a l’índex')
formula(r'k\,\sqrt[n]{a}=\sqrt[n]{k^na}',x,717,w,15)
formula(r'3\sqrt{2}=\sqrt{3^2\cdot2}=\sqrt{18}',x,749,w,14)

# A short correction addresses the source's root/equation ambiguity.
paragraph('<b>Compte:</b> √4 = 2; en canvi, x² = 4 té les solucions −2 i 2. '
          'En general, √(a + b) ≠ √a + √b.',M,787,CW,'small',809)
c.setStrokeColor(LINE);c.line(M,26,W-M,26)
text('Resum dels apunts de la unitat 2b · Convencions de signe revisades',M,H-15,7.4,color=MUTED)
text('1 / 1',W-M,H-15,7.4,color=MUTED,align='right')
c.linkURL('https://oxidogit.github.io/markel/3eso/matematicas/arrels/',(M,10,W-M,25),relative=0,thickness=0)
c.showPage();c.save()
print(OUTPUT)
