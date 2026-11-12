import {esc} from './views.js';
export function mountGraph(data){
 const svg=document.querySelector('#knowledge-graph'),detail=document.querySelector('#graph-detail');
 let zoom=1,pan={x:0,y:0},drag=null,moved=false;
 const shorten=s=>s.replace('Matériel et infrastructure','Infrastructure').replace('Informatique et réseaux','Informatique / réseau').replace('Modèles et architectures','Modèles').replace('Entraînement et adaptation','Adaptation').replace('Production et exploitation','Production').replace('Sécurité et gouvernance','Sécurité').replace('Agents et intégrations','Agents / intégration').replace('Évaluation et fiabilité','Évaluation');
 const positions=new Map();
 data.domains.forEach((d,i)=>{const a=(i/data.domains.length)*Math.PI*2-Math.PI/2;positions.set(d.id,{x:480+345*Math.cos(a),y:320+245*Math.sin(a)});});
 data.lessons.forEach((l,i)=>{const a=(i/data.lessons.length)*Math.PI*2-Math.PI/2;positions.set(l.id,{x:480+150*Math.cos(a),y:320+125*Math.sin(a)});});
 function transform(){svg.querySelector('#graph-scene')?.setAttribute('transform',`translate(${480+pan.x} ${320+pan.y}) scale(${zoom}) translate(-480 -320)`);}
 function select(key){
  svg.querySelectorAll('[data-node]').forEach(n=>n.classList.toggle('selected',n.dataset.node===key));
  const lesson=data.lessons.find(l=>l.id===key);
  if(lesson){detail.innerHTML=`<p class="eyebrow">FICHE DISPONIBLE</p><h2>${esc(lesson.title)}</h2><p>${esc(lesson.summary)}</p><p class="hint">${lesson.minutes} min · introduction</p><a class="button" href="#learn/${lesson.id}">Ouvrir la fiche →</a><h3>Reliée à</h3>${lesson.links.map(id=>{const l=data.lessons.find(l=>l.id===id);return `<p><a href="#learn/${id}">${esc(l.title)} ↗</a></p>`;}).join('')}`;}
  else {const d=data.domains.find(d=>d.id===key),lessons=data.lessons.filter(l=>l.domain===key);detail.innerHTML=`<p class="eyebrow">DOMAINE · ${lessons.length?'COUVERTURE PARTIELLE':'À RÉDIGER'}</p><h2>${esc(d.title)}</h2><ul>${d.topics.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>${lessons.map(l=>`<p><a href="#learn/${l.id}">${esc(l.title)} ↗</a></p>`).join('')||'<p class="hint">Ces sujets sont inventoriés. Leurs cours seront ajoutés progressivement.</p>'}`;}
 }
 function draw(){
  const available=document.querySelector('#graph-filter').value==='available';
  const domains=data.domains.filter(d=>!available||data.lessons.some(l=>l.domain===d.id));
  const edge=(a,b,kind)=>{const p=positions.get(a),q=positions.get(b);return `<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" class="${kind}"/>`;};
  const edges=new Set();
  const links=data.lessons.flatMap(l=>[edge(l.domain,l.id,'domain-edge'),...l.links.filter(id=>{const k=[id,l.id].sort().join(':');if(edges.has(k))return false;edges.add(k);return true;}).map(id=>edge(l.id,id,'lesson-edge'))]).join('');
  const nodes=[...domains.map(d=>({...d,type:'domain'})),...data.lessons.map(l=>({...l,type:'lesson'}))];
  svg.innerHTML=`<g id="graph-scene"><g class="graph-lines">${links}</g>${nodes.map(n=>{const p=positions.get(n.id);return `<g class="graph-node ${n.type}" data-node="${n.id}" transform="translate(${p.x} ${p.y})" tabindex="0" role="button" aria-label="${esc(n.title)} : ${n.type==='domain'?'domaine':'fiche disponible'}"><title>${esc(n.title)}</title>${n.type==='domain'?'<circle r="9"/>':'<rect x="-8" y="-8" width="16" height="16" rx="3" transform="rotate(45)"/>'}<text y="27" text-anchor="middle">${esc(shorten(n.title))}</text></g>`;}).join('')}</g>`;
  svg.querySelectorAll('[data-node]').forEach(node=>{node.addEventListener('click',()=>{if(!moved)select(node.dataset.node);});node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(node.dataset.node);}});});transform();
 }
 document.querySelector('#graph-filter').addEventListener('change',draw);
 document.querySelector('#zoom-in').addEventListener('click',()=>{zoom=Math.min(3,zoom+.2);transform();});
 document.querySelector('#zoom-out').addEventListener('click',()=>{zoom=Math.max(.6,zoom-.2);transform();});
 document.querySelector('#zoom-reset').addEventListener('click',()=>{zoom=1;pan={x:0,y:0};transform();});
 svg.addEventListener('pointerdown',e=>{moved=false;if(e.target.closest('[data-node]'))return;drag={x:e.clientX,y:e.clientY,pan:{...pan}};svg.setPointerCapture(e.pointerId);});
 svg.addEventListener('pointermove',e=>{if(!drag)return;const rect=svg.getBoundingClientRect(),factor=Math.max(960/rect.width,640/rect.height);moved=Math.abs(e.clientX-drag.x)+Math.abs(e.clientY-drag.y)>4;pan={x:drag.pan.x+(e.clientX-drag.x)*factor,y:drag.pan.y+(e.clientY-drag.y)*factor};transform();});
 const stop=()=>drag=null;svg.addEventListener('pointerup',stop);svg.addEventListener('pointercancel',stop);draw();
}
