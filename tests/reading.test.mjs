import test from 'node:test';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {loadContent,renderMarkdown} from '../scripts/content.mjs';
import {layoutGraph,graphEdges} from '../web/graph.js';
import {lesson,curriculum} from '../web/learning-views.js';
import {emptyProgress,validateProgress} from '../web/state.js';
import {pathSections} from '../web/learning-views.js';
import {caseView} from '../web/views.js';

const data=await loadContent(fileURLToPath(new URL('..',import.meta.url)));

test('Le nouveau lot est accessible dans le parcours et préserve les scores sur 24 questions',()=>{
 const previous={...emptyProgress(),read:['llm'],attempts:[{score:20,total:24,date:'2026-11-12T12:00:00Z'}]};
 assert.deepEqual(validateProgress(previous,data.path,data.quiz.questions.length),previous);
 const route=pathSections(data,previous);
 for(const l of data.lessons){
  assert.ok(route.includes(`href="#learn/${l.id}"`),l.id);
  assert.ok(data.quiz.questions.some(q=>q.lessonId===l.id),l.id);
 }
 for(const id of ['reseaux','http-tls','auth','contrat-outil','reprises','contexte']){
  const l=data.lessons.find(l=>l.id===id);
  assert.ok(l.html.includes('class="lesson-image"'),id);
  for(const type of ['abstract','warning','tip'])assert.ok(l.html.includes('callout-'+type),id+' '+type);
 }
});

test('Chaque exercice a son corrigé et chaque section sa destination de navigation',()=>{
 for(const l of data.lessons){
  assert.ok(l.exerciseCount>0,l.id);
  assert.equal((l.html.match(/<details class="correction">/g)||[]).length,l.exerciseCount,l.id);
  for(const section of l.toc)assert.ok(l.html.includes(`id="${section.id}"`));
  const view=lesson(data,emptyProgress(),l.id);
  assert.ok(view.includes(`href="#learn/${l.id}/${l.toc[0].id}"`));
  assert.ok(view.includes(`href="#curriculum/${l.domain}"`));
 }
});

test('Callouts, formules et tableaux conservent leur structure et échappent les entrées',()=>{
 const html=renderMarkdown('> [!formula] <img src=x onerror=alert(1)>\n> a *b*\n>\n> seconde formule\n\n| Nom | Valeur |\n| --- | --- |\n| <script> | **2** |\n\n> [!answer]- Corrigé\n> réponse\n>\n> suite\n\n## Après',data.lessons);
 assert.ok(!html.includes('<img'));assert.ok(!html.includes('<script>'));
 assert.match(html,/<em>b<\/em>/);assert.match(html,/<th scope="col">Nom<\/th>/);
 assert.ok(html.includes('<strong>2</strong>'));
 assert.ok(html.indexOf('seconde formule')<html.indexOf('</aside>'));
 assert.ok(html.indexOf('<p>suite</p>')<html.indexOf('</details>'));
 assert.ok(html.indexOf('</details>')<html.indexOf('<h2>Après</h2>'));
});

test('Le programme distingue tous les cours rédigés des cours prévus',()=>{
 assert.equal(data.roadmap.domains.length,data.domains.length);
 const titles=[...data.lessons.map(l=>l.title),...data.roadmap.domains.flatMap(d=>d.courses.map(c=>c.title))];
 assert.equal(new Set(titles).size,titles.length,'Intitulés dupliqués');
 const view=curriculum(data,emptyProgress());
 assert.ok(view.includes(`${titles.length} COURS INVENTORIÉS`));
 for(const l of data.lessons)assert.ok(view.includes(`href="#learn/${l.id}"`));
 assert.ok(data.caseStudy.correction.length>=data.caseStudy.deliverables.length);
 assert.ok(caseView(data,emptyProgress()).includes('Dévoiler la correction du laboratoire'));
 assert.ok(data.caseStudy.dataset.every(d=>d.reason));
 assert.ok(data.quiz.questions.every(q=>q.explanations.every(e=>e.trim().length>20)));
});

test('Le sommaire conserve les apostrophes sans double échappement',()=>{
 const view=lesson(data,emptyProgress(),'vecteurs');
 assert.ok(!view.includes('&amp;#39;'));
 assert.ok(view.includes('plutôt qu&#39;une longueur'));
});

test('Le graphe ne fabrique aucun lien et répartit ses nœuds de façon reproductible',()=>{
 const edges=graphEdges(data.lessons),positions=layoutGraph(data.lessons,edges);
 assert.equal(positions.size,data.lessons.length);
 assert.equal(new Set(edges.map(e=>e.slice().sort().join(':'))).size,edges.length);
 for(const [a,b] of edges)assert.ok(data.lessons.find(l=>l.id===a).links.includes(b)||data.lessons.find(l=>l.id===b).links.includes(a));
 assert.deepEqual(positions,layoutGraph(data.lessons,edges));
 for(const p of positions.values())assert.ok(Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.x>=100&&p.x<=1100&&p.y>=40&&p.y<=730);
 const nodes=[...positions.values()];
 for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++)assert.ok(Math.hypot(nodes[i].x-nodes[j].x,nodes[i].y-nodes[j].y)>30,'Nœuds superposés');
});
