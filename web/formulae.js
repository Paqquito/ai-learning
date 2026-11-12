// Authored MathML: rendered natively, no external script or HTML from course text.
const id=s=>`<mi>${s}</mi>`,num=s=>`<mn>${s}</mn>`,op=s=>`<mo>${s}</mo>`;
const row=(...s)=>`<mrow>${s.join('')}</mrow>`,frac=(a,b)=>`<mfrac>${a}${b}</mfrac>`;
const norm=s=>row(op('‖'),id(s),op('‖'));
const matrix=rows=>row(op('['),`<mtable>${rows.map(r=>`<mtr>${r.map(n=>`<mtd>${num(n)}</mtd>`).join('')}</mtr>`).join('')}</mtable>`,op(']'));
const definitions={
 cosine:{label:'Similarité cosinus de deux vecteurs non nuls',body:row(id('cos'),op('('),id('u'),op(','),id('v'),op(')'),op('='),frac(row(id('u'),op('·'),id('v')),row(norm('u'),norm('v'))))},
 dot:{label:'Produit scalaire : somme des produits des coordonnées',body:row(id('u'),op('·'),id('v'),op('='),'<munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover>','<msub><mi>u</mi><mi>i</mi></msub>','<msub><mi>v</mi><mi>i</mi></msub>')},
 norm:{label:'Norme euclidienne : racine de la somme des carrés',body:row(norm('u'),op('='),'<msqrt><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><msubsup><mi>u</mi><mi>i</mi><mn>2</mn></msubsup></msqrt>')},
 matrix:{label:'Le vecteur deux un multiplié par la matrice un trois quatre zéro donne six six',body:row(matrix([[2,1]]),matrix([[1,3],[4,0]]),op('='),matrix([[6,6]]))},
 precision:{label:'Précision égale vrais positifs divisés par vrais positifs plus faux positifs',body:row(id('Précision'),op('='),frac(id('VP'),row(id('VP'),op('+'),id('FP'))))},
 recall:{label:'Rappel égal vrais positifs divisés par vrais positifs plus faux négatifs',body:row(id('Rappel'),op('='),frac(id('VP'),row(id('VP'),op('+'),id('FN'))))},
 f1:{label:'F1 égale deux fois vrais positifs sur deux fois vrais positifs plus faux positifs plus faux négatifs',body:row(id('F1'),op('='),frac(row(num(2),id('VP')),row(num(2),id('VP'),op('+'),id('FP'),op('+'),id('FN'))))}
};
export function formulaHTML(name){const f=definitions[name];if(!f)throw new Error('Formule inconnue : '+name);return `<div class="math-equation" tabindex="0" role="group" aria-label="${f.label}"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block">${f.body}</math></div>`;}
