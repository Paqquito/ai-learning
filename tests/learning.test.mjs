import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {loadContent,renderMarkdown} from '../scripts/content.mjs';
import {gradeQuiz,validateProgress,emptyProgress} from '../web/state.js';

const data=await loadContent(fileURLToPath(new URL('..',import.meta.url)));

test('Les fiches et leurs prérequis forment un parcours exploitable',()=>{
 const visited=new Set();
 for(const id of data.path){const lesson=data.lessons.find(l=>l.id===id);assert.ok(lesson.prerequisites.every(p=>visited.has(p)),`Prérequis avant ${id}`);assert.ok(lesson.html.includes('<h2>'));assert.ok(lesson.html.includes('https://'));assert.ok(lesson.links.every(link=>data.lessons.some(l=>l.id===link)));visited.add(id);}
 assert.equal(visited.size,data.lessons.length);assert.equal(data.domains.length,16);
});
test('Le QCM corrige les résultats réels et bloque les réponses incomplètes',()=>{
 const correct=Object.fromEntries(data.quiz.questions.map(q=>[q.id,q.answer]));
 assert.equal(gradeQuiz(data.quiz.questions,correct),6);
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
