import test from 'node:test';
import assert from 'node:assert/strict';
import {loadContent,renderMarkdown} from '../scripts/content.mjs';
import {fileURLToPath} from 'node:url';
import {cosine2D,weightGiB,labHTML} from '../web/labs.js';
import {nextReview,reviewQueue,lessonPractice} from '../web/reading.js';
import {emptyProgress,validateProgress} from '../web/state.js';
const data=await loadContent(fileURLToPath(new URL('..',import.meta.url)));

test('Les simulations respectent leurs limites mathématiques et leurs unités',()=>{
 assert.ok(Math.abs(cosine2D(0,90))<1e-10);assert.equal(cosine2D(0,180),-1);
 assert.equal(cosine2D(20,20,0),null);assert.equal(cosine2D(0,60,.5),cosine2D(0,60,1));
 assert.ok(Math.abs(weightGiB(8,4)-3.72529029846)<1e-9);
 assert.equal(weightGiB(8,8),2*weightGiB(8,4));assert.throws(()=>labHTML('unknown'));
});
test('Les formules sont structurées, le code reste inerte et les liens avec apostrophe fonctionnent',()=>{
 const md=':::formula cosine\n\n:::formula matrix\n\n```json\n{"unsafe":"<script>alert(1)</script>"}\n```\n\n[[Concevoir un contrat d\'outil et un schéma JSON]]';
 const html=renderMarkdown(md,data.lessons);
 assert.match(html,/<mfrac>/);assert.match(html,/<mtable>/);assert.ok(html.includes('href="#learn/contrat-outil"'));
 assert.ok(!html.includes('<script>'));assert.ok(html.includes('&lt;script&gt;'));assert.ok(html.includes('copy-code'));
 assert.throws(()=>renderMarkdown(':::formula unknown',data.lessons));
});
test('Les anciens exports restent lisibles et les brouillons/révisions sont validés',()=>{
 const old={version:1,read:['llm'],attempts:[{score:25,total:30,date:'2026-11-12'},{score:28,total:34,date:'2026-11-12'}],caseDraft:''};
 const restored=validateProgress(old,data.path,data.quiz.questions.length);
 assert.deepEqual(restored.notes,{});assert.deepEqual(restored.reviews,{});assert.equal(restored.attempts[0].total,30);assert.equal(restored.attempts[1].total,34);
 const now=new Date('2026-11-12T12:00:00Z');restored.notes.llm='Poids ≠ contexte';restored.reviews.llm=nextReview(false,now);
 assert.equal(restored.reviews.llm.due,'2026-11-13T12:00:00.000Z');assert.equal(nextReview(true,now).due,'2026-11-19T12:00:00.000Z');
 assert.deepEqual(validateProgress(restored,data.path,data.quiz.questions.length),restored);
 assert.match(reviewQueue(data,restored,Date.parse('2026-11-14')),/1 notion à revoir/);
 assert.throws(()=>validateProgress({...restored,notes:{unknown:'test'}},data.path));
 assert.throws(()=>validateProgress({...restored,reviews:{llm:{date:'bad',due:'bad',correct:true}}},data.path));
 assert.throws(()=>validateProgress({...restored,notes:{llm:'x'.repeat(12001)}},data.path));
});
test('Chaque cours dispose de sa question et les trois modèles ont une pratique progressive',()=>{
 for(const l of data.lessons){const html=lessonPractice(data,l,emptyProgress());assert.ok(html.includes('lesson-quiz'));assert.ok(html.includes('lesson-draft'));}
 for(const id of ['llm','vecteurs','confidentialite','chunking','hybride','metriques','injection','reranking','reponse-sourcee','jeu-reference','eval-rag','extraction','validation-humaine']){
  const l=data.lessons.find(l=>l.id===id);assert.ok(l.question&&l.takeaway&&l.recall,id);assert.ok(l.exerciseCount>=2,id);assert.ok(l.html.includes('figure-open'),id);
 }
 assert.ok(data.lessons.find(l=>l.id==='vecteurs').html.includes('data-lab="vectors"'));
 assert.ok(data.lessons.find(l=>l.id==='memoire').html.includes('data-lab="memory"'));
 assert.ok(data.lessons.find(l=>l.id==='outils').html.includes('data-lab="tools"'));
});
