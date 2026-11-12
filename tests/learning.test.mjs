import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {loadContent,renderMarkdown} from '../scripts/content.mjs';
import {gradeQuiz,validateProgress,emptyProgress} from '../web/state.js';
import {progressView,practice} from '../web/views.js';

const data=await loadContent(fileURLToPath(new URL('..',import.meta.url)));

test('Les fiches et leurs prérequis forment un parcours exploitable',()=>{
 const visited=new Set();
 for(const id of data.path){const lesson=data.lessons.find(l=>l.id===id);assert.ok(lesson.prerequisites.every(p=>visited.has(p)),`Prérequis avant ${id}`);assert.ok(lesson.html.includes('<h2>'));assert.ok(lesson.html.includes('https://'));assert.ok(lesson.links.every(link=>data.lessons.some(l=>l.id===link)));visited.add(id);}
 assert.equal(visited.size,data.lessons.length);assert.equal(data.domains.length,16);
 assert.ok(data.lessons.every(l=>!data.domains.some(d=>d.id===l.id)),'Les nœuds de domaines et de cours doivent être distincts');
});
test('Le QCM corrige les résultats réels et bloque les réponses incomplètes',()=>{
 const correct=Object.fromEntries(data.quiz.questions.map(q=>[q.id,q.answer]));
 assert.equal(gradeQuiz(data.quiz.questions,correct),data.quiz.questions.length);
 const wrong=Object.fromEntries(data.quiz.questions.map(q=>[q.id,(q.answer+1)%q.options.length]));
 assert.equal(gradeQuiz(data.quiz.questions,wrong),0);
 delete correct.q1;assert.throws(()=>gradeQuiz(data.quiz.questions,correct),/toutes les questions/);
 assert.throws(()=>gradeQuiz(data.quiz.questions,{...wrong,q1:99}));
});
test('Un export de progression peut être relu sans perte',()=>{
 const saved={...emptyProgress(),read:['systeme'],attempts:[{score:3,total:6,date:'2026-11-12T12:00:00.000Z'}],caseDraft:'Mon architecture\nModèle → validation'};
 assert.deepEqual(validateProgress(JSON.parse(JSON.stringify(saved)),data.path),saved);
});
test('Un import invalide ne doit pas devenir une progression',()=>{
 assert.throws(()=>validateProgress(null,data.path));
 assert.throws(()=>validateProgress({...emptyProgress(),read:['inconnu']},data.path));
 assert.throws(()=>validateProgress({...emptyProgress(),attempts:[{score:99,total:6,date:'2026-11-12'}]},data.path));
 assert.throws(()=>validateProgress({...emptyProgress(),caseDraft:'x'.repeat(50001)},data.path));
 assert.throws(()=>validateProgress({...emptyProgress(),attempts:[{score:1,total:6,date:'incorrect'}]},data.path));
});
test('Le rendu échappe le HTML et refuse les liens de cours inconnus',()=>{
 const html=renderMarkdown('# Test\n\n<script>alert(1)</script>\n\n[bad](javascript:alert)\n\n[[Comprendre un LLM]]',data.lessons);
 assert.ok(!html.includes('<script>'));assert.ok(!html.includes('href="javascript:'));assert.ok(html.includes('href="#learn/llm"'));
 assert.throws(()=>renderMarkdown('[[Cours absent]]',data.lessons),/Lien inconnu/);
 assert.throws(()=>renderMarkdown('```\ncode',data.lessons),/non fermé/);
});
test('Le schéma illustrant le cours existe et comporte une alternative textuelle',async()=>{
 const svg=await readFile(new URL('../AI Learning/Assets/circuit.svg',import.meta.url),'utf8');
 assert.ok(svg.includes('<title'));assert.ok(svg.includes('<desc'));assert.ok(data.lessons[0].html.includes('src="./assets/circuit.svg"'));
});

test('Les nouveaux exercices ont un corrigé replié et leurs illustrations existent',async()=>{
 for(const lesson of data.lessons.slice(6)){
  assert.ok(lesson.html.includes('<details class="correction">'),lesson.id);
  assert.ok(!lesson.html.includes('<details class="correction" open'),lesson.id);
  for(const match of lesson.html.matchAll(/src="\.\/assets\/([^"]+)"/g)){
   const svg=await readFile(new URL('../AI Learning/Assets/'+match[1],import.meta.url),'utf8');
   assert.ok(svg.includes('<title')&&svg.includes('<desc'),match[1]);
  }
 }
 const html=renderMarkdown('> [!answer]- Repères de correction\n> Une **réponse**.\n\n## La suite\n\nTexte visible.',data.lessons);
 assert.match(html,/<strong>réponse<\/strong>/);
 assert.ok(html.indexOf('</details>')<html.indexOf('<h2>La suite</h2>'));
});

test('Les résultats historiques survivent à l’extension du quiz sans devenir le record actuel',()=>{
 const saved={...emptyProgress(),read:['llm'],caseDraft:'Mon travail',attempts:[{score:6,total:6,date:'2026-11-12T12:00:00Z'}]};
 const restored=validateProgress(saved,data.path,data.quiz.questions.length);
 assert.deepEqual(restored,saved);
 assert.ok(progressView(data,restored).includes('6 / 6'));
 assert.ok(progressView(data,restored).includes('<strong>—</strong><span>meilleur résultat au quiz actuel'));
 restored.attempts.push({score:10,total:14,date:'2026-11-12T14:00:00Z'});
 assert.ok(progressView(data,restored).includes('<strong>10/14</strong>'));
 assert.throws(()=>validateProgress({...saved,attempts:[{score:7,total:6,date:'2026-11-12'}]},data.path,14));
 assert.ok(practice(data).includes('14 questions'));
});
