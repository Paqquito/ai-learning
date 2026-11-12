import {esc} from './views.js';

export function graphEdges(lessons){
 const seen=new Set(),edges=[];
 for(const l of lessons)for(const id of l.links){
  const key=[l.id,id].sort().join(':');
  if(id!==l.id&&!seen.has(key)){seen.add(key);edges.push([l.id,id]);}
 }
 return edges;
}

// Seeded positions + spring attraction + repulsion + label-box collision.
// Static settling avoids continuous animation and motion sensitivity.
export function layoutGraph(lessons,edges){
 const nodes=lessons.map((l,i)=>({...l,x:600+350*Math.cos(i*2.399),y:400+260*Math.sin(i*2.399),vx:0,vy:0}));
 const map=new Map(nodes.map(n=>[n.id,n]));
 for(let step=0;step<500;step++){
  for(const n of nodes){n.vx+=(600-n.x)*.002;n.vy+=(400-n.y)*.002;}
  for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
   const a=nodes[i],b=nodes[j],dx=b.x-a.x||.01,dy=b.y-a.y||.01,d2=Math.max(100,dx*dx+dy*dy),dist=Math.sqrt(d2),force=6500/d2;
   a.vx-=dx/dist*force;b.vx+=dx/dist*force;a.vy-=dy/dist*force;b.vy+=dy/dist*force;
   const ox=180-Math.abs(dx),oy=84-Math.abs(dy);
   if(ox>0&&oy>0){
    if(ox<oy){const f=Math.sign(dx)*ox*.09;a.vx-=f;b.vx+=f;}
    else{const f=Math.sign(dy)*oy*.09;a.vy-=f;b.vy+=f;}
   }
  }
  for(const [from,to] of edges){const a=map.get(from),b=map.get(to);if(!a||!b)continue;
   const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1,f=(d-215)*.003;
   a.vx+=dx/d*f;b.vx-=dx/d*f;a.vy+=dy/d*f;b.vy-=dy/d*f;
  }
  for(const n of nodes){n.vx*=.65;n.vy*=.65;n.x=Math.max(100,Math.min(1100,n.x+n.vx));n.y=Math.max(40,Math.min(730,n.y+n.vy));}
 }
 return map;
}
const labels={
 chunking:'Découpage documentaire',hybride:'Recherche hybride',metriques:'Précision et rappel',injection:'Prompt injection',
 reseaux:'Réseaux et DNS','http-tls':'HTTP et TLS',auth:'Identités et droits','contrat-outil':'Contrat des outils',reprises:'Reprises et files',contexte:'Budget de contexte',
 systeme:'Du modèle au système',llm:'Comprendre un LLM',workflow:'Workflow ou agent',harness:'Le rôle du harness',mcp:'Situer MCP',evaluation:'Évaluer une intégration',
 api:'API de modèle',materiel:'CPU, GPU, RAM et VRAM',memoire:'Mémoire et quantification',outils:'Appeler des outils','rag-doc':'Embeddings et RAG',graphe:'Graphe de données',
 confidentialite:'Données confidentielles','choix-modele':'Choisir un modèle',vecteurs:'Vecteurs et matrices',apprentissage:'Gradients et apprentissage',
 transformer:'Transformer et attention',moe:'Modèles MoE',jepa:'JEPA',lora:'Fine-tuning et LoRA',docker:'Docker et services IA',extensions:'MCP, skills et plugins',audit:'Audit de processus',observabilite:'Observabilité'
};
function wrap(text){const lines=[''];for(const word of text.split(' ')){const i=lines.length-1;if(lines[i].length+word.length>21&&lines[i])lines.push(word);else lines[i]+=(lines[i]?' ':'')+word;}return lines;}

export function mountGraph(data,initial){
 const svg=document.querySelector('#knowledge-graph'),detail=document.querySelector('#graph-detail');
 const edges=graphEdges(data.lessons),positions=layoutGraph(data.lessons,edges);
 let zoom=1,pan={x:0,y:0},drag=null,moved=false,selected=null,visible=new Set(data.lessons.map(l=>l.id));
 function transform(){svg.querySelector('#graph-scene')?.setAttribute('transform',`translate(${600+pan.x} ${400+pan.y}) scale(${zoom}) translate(-600 -400)`);}
 function highlight(){
  const neighbors=new Set(selected?[selected,...edges.filter(e=>e.includes(selected)).flat()]:[]);
  svg.querySelectorAll('[data-node]').forEach(n=>{n.classList.toggle('selected',n.dataset.node===selected);n.classList.toggle('faded',!!selected&&!neighbors.has(n.dataset.node));n.setAttribute('aria-pressed',String(n.dataset.node===selected));});
  svg.querySelectorAll('[data-edge]').forEach(n=>{n.classList.toggle('active',n.dataset.edge.split(':').includes(selected));n.classList.toggle('faded',!!selected&&!n.dataset.edge.split(':').includes(selected));});
 }
 function select(id){
  selected=id;highlight();const l=data.lessons.find(l=>l.id===id);if(!l)return;
  const neighbors=[...new Set(edges.filter(e=>e.includes(id)).flat())].filter(key=>key!==id);
  detail.innerHTML=`<div><p class="eyebrow">${esc(data.domains.find(d=>d.id===l.domain).title)}</p><h2>${esc(l.title)}</h2><p>${esc(l.summary)}</p><a class="button" href="#learn/${id}">Ouvrir la fiche →</a></div><div><h3>${neighbors.length} connexions</h3><div class="connection-links">${neighbors.map(key=>`<a href="#learn/${key}">${esc(data.lessons.find(l=>l.id===key).title)}</a>`).join('')}</div></div>`;
 }
 function updateGeometry(){
  for(const node of svg.querySelectorAll('[data-node]')){const p=positions.get(node.dataset.node);node.setAttribute('transform',`translate(${p.x} ${p.y})`);}
  for(const line of svg.querySelectorAll('[data-edge]')){const [a,b]=line.dataset.edge.split(':').map(key=>positions.get(key));for(const [k,v] of Object.entries({x1:a.x,y1:a.y,x2:b.x,y2:b.y}))line.setAttribute(k,v);}
 }
 function draw(){
  const filter=document.querySelector('#graph-filter').value,focus=new Set(data.lessons.filter(l=>filter==='all'||l.domain===filter).map(l=>l.id));
  visible=new Set([...focus,...edges.filter(e=>e.some(id=>focus.has(id))).flat()]);
  const nodes=data.lessons.filter(l=>visible.has(l.id));
  svg.innerHTML=`<g id="graph-scene"><g class="graph-lines">${edges.filter(e=>e.every(id=>visible.has(id))).map(e=>`<line class="lesson-edge" data-edge="${e.join(':')}"/>`).join('')}</g>${nodes.map(l=>`<g class="graph-node lesson" data-node="${l.id}" tabindex="0" role="button" aria-label="${esc(l.title)}" aria-pressed="false"><title>${esc(l.title)}</title><circle r="${6+Math.min(5,edges.filter(e=>e.includes(l.id)).length*.4)}"/><text text-anchor="middle">${wrap(labels[l.id]||l.title).map((s,i)=>`<tspan x="0" y="${25+i*19}">${esc(s)}</tspan>`).join('')}</text></g>`).join('')}</g>`;
  svg.querySelectorAll('[data-node]').forEach(n=>{
   n.addEventListener('click',()=>{if(!moved)select(n.dataset.node);});
   n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(n.dataset.node);}});
  });
  document.querySelector('#graph-count').textContent=`${nodes.length} cours visibles${filter==='all'?'':' : domaine et voisins directs'}. Les intitulés longs sont abrégés ; leur titre complet apparaît dans le détail.`;
  if(selected&&!visible.has(selected)){selected=null;detail.innerHTML='<p>Sélectionne une fiche dans ce domaine.</p>';}
  updateGeometry();transform();highlight();
 }
 document.querySelector('#graph-filter').addEventListener('change',draw);
 document.querySelector('#zoom-in').addEventListener('click',()=>{zoom=Math.min(3,zoom+.25);transform();});
 document.querySelector('#zoom-out').addEventListener('click',()=>{zoom=Math.max(.5,zoom-.25);transform();});
 document.querySelector('#zoom-reset').addEventListener('click',()=>{zoom=1;pan={x:0,y:0};selected=null;transform();highlight();detail.innerHTML='<h2>Vue recentrée</h2><p>Sélectionne une fiche pour explorer ses connexions.</p>';});
 const point=e=>{const p=new DOMPoint(e.clientX,e.clientY);return p.matrixTransform(svg.getScreenCTM().inverse());};
 svg.addEventListener('pointerdown',e=>{if(e.button!==0)return;moved=false;const p=point(e),id=e.target.closest('[data-node]')?.dataset.node;drag={p,id,pan:{...pan},origin:id?{...positions.get(id)}:null};svg.setPointerCapture(e.pointerId);});
 svg.addEventListener('pointermove',e=>{
  if(!drag)return;const p=point(e),dx=p.x-drag.p.x,dy=p.y-drag.p.y;moved=moved||Math.abs(dx)+Math.abs(dy)>5;
  if(drag.id){const n=positions.get(drag.id);n.x=drag.origin.x+dx/zoom;n.y=drag.origin.y+dy/zoom;updateGeometry();}
  else{pan={x:drag.pan.x+dx,y:drag.pan.y+dy};transform();}
 });
 svg.addEventListener('pointerup',()=>{if(drag?.id&&!moved)select(drag.id);drag=null;});
 svg.addEventListener('pointercancel',()=>drag=null);
 draw();if(initial&&positions.has(initial))select(initial);
}
