import {emptyProgress,validateProgress,gradeQuiz,STORAGE_KEY} from './state.js';
import * as baseViews from './views.js';
import * as learningViews from './learning-views.js';
const views={...baseViews,...learningViews};
import {mountGraph} from './graph.js';

const main=document.querySelector('main'),toast=document.querySelector('#toast');
let data,progress=emptyProgress(),toastTimer;
function notify(message){clearTimeout(toastTimer);toast.textContent=message;toast.hidden=false;toastTimer=setTimeout(()=>toast.hidden=true,6000);}
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(progress));return true;}catch{notify('Sauvegarde locale indisponible. Exporte tes résultats avant de fermer cette page.');return false;}}
function download(name,value){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function on(id,event,handler){document.getElementById(id)?.addEventListener(event,handler);}
function render(){
 const [rawPage,id,section]=location.hash.slice(1).split('/');
 const page=rawPage||'home';
 const nav=page==='learn'?'curriculum':page;
 const routeKey=page+'/'+(id||'');
 if(page==='learn'&&main.dataset.route===routeKey&&section){jumpTo(section);return;}
 main.dataset.route=routeKey;
 document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===nav)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 const menu=document.querySelector('#menu-toggle');
 menu.setAttribute('aria-expanded','false');document.querySelector('.sidebar').classList.remove('menu-open');
 menu.textContent='Menu · '+(document.querySelector('[data-nav][aria-current]')?.textContent.trim().replace(/^\S+\s/,'')||'Navigation');
 if(page==='home'||!page)main.innerHTML=views.home(data,progress);
 else if(page==='library')main.innerHTML=views.library(data,progress);
 else if(page==='learn')main.innerHTML=views.lesson(data,progress,id);
 else if(page==='practice')main.innerHTML=views.practice(data);
 else if(page==='case')main.innerHTML=views.caseView(data,progress);
 else if(page==='progress')main.innerHTML=views.progressView(data,progress);
 else if(page==='graph')main.innerHTML=views.graphView(data);
 else if(page==='curriculum')main.innerHTML=views.curriculum(data,progress);
 else main.innerHTML=views.notFound();
 document.title=`${main.querySelector('h1')?.textContent||'Atlas'} · AI Learning`;
 main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});
 if(page==='graph')mountGraph(data,id);
 if(page==='curriculum'&&id){const group=document.getElementById('domain-'+id);if(group){group.open=true;group.scrollIntoView();}}
 if(page==='home'){const list=main.querySelector('.two-columns .lesson-list');if(list)list.outerHTML=views.pathSections(data,progress);}
 if(page==='learn'&&section)jumpTo(section);
 on('justify-text','change',e=>main.querySelector('.prose')?.classList.toggle('justified',e.target.checked));
 const filter=()=>{document.querySelector('#library-results').innerHTML=views.libraryResults(data,progress,document.querySelector('#search').value,document.querySelector('#domain-filter').value);};
 on('search','input',filter);on('domain-filter','change',filter);
 on('mark-read','click',e=>{const key=e.currentTarget.dataset.id;progress.read=progress.read.includes(key)?progress.read.filter(x=>x!==key):[...progress.read,key];save();e.currentTarget.textContent=progress.read.includes(key)?'Retirer la marque « lu »':'Marquer comme lu';notify(progress.read.includes(key)?'Lecture enregistrée. Passe à la pratique pour vérifier ta compréhension.':'Marque de lecture retirée.');});
 bindQuiz();bindCase();bindProgress();
}
function jumpTo(section){const target=document.getElementById(section);if(target&&main.contains(target)){target.scrollIntoView({block:'start'});target.focus({preventScroll:true});}}
function bindQuiz(){
 on('quiz-form','submit',e=>{
  e.preventDefault();const form=e.currentTarget;if(form.dataset.graded)return;
  const answers=Object.fromEntries([...new FormData(form)].map(([k,v])=>[k,Number(v)])),status=document.querySelector('#quiz-status');
  let score;try{score=gradeQuiz(data.quiz.questions,answers);}catch(err){status.className='result error';status.textContent=err.message;status.focus();return;}
  form.dataset.graded='true';form.querySelectorAll('input').forEach(i=>i.disabled=true);form.querySelector('[type=submit]').hidden=true;document.querySelector('#retry-quiz').hidden=false;
  for(const q of data.quiz.questions){const feedback=document.querySelector(`#feedback-${q.id}`);feedback.hidden=false;feedback.innerHTML=`<strong>${answers[q.id]===q.answer?'Bonne réponse.':'À revoir.'} Réponse attendue : ${String.fromCharCode(65+q.answer)}.</strong><ul>${q.options.map((o,i)=>`<li><b>${String.fromCharCode(65+i)}${i===answers[q.id]?' · ton choix':''}</b> — ${views.esc(q.explanations[i])}</li>`).join('')}</ul><a href="#learn/${q.lessonId}">Revoir la notion ↗</a>`;}
  progress.attempts.push({score,total:data.quiz.questions.length,date:new Date().toISOString()});progress.attempts=progress.attempts.slice(-1000);save();
  status.className='result';status.textContent=`${score} / ${data.quiz.questions.length} — ${score===data.quiz.questions.length?'Les bases sont comprises. Essaie maintenant le cas pratique.':'Chaque erreur est une piste : les explications sont sous chaque question.'}`;status.focus();
 });
 on('retry-quiz','click',()=>{render();document.querySelector('input[type=radio]')?.focus();});
}
function bindCase(){
 on('case-draft','input',e=>{progress.caseDraft=e.target.value;document.querySelector('#draft-status').textContent=save()?'Brouillon enregistré dans ce navigateur.':'Sauvegarde indisponible : copie ou exporte ton brouillon.';});
 on('copy-case','click',async()=>{const c=data.caseStudy,text=`Cas ${c.id} : ${c.title}\n\n${c.brief}\n\nContraintes\n${c.constraints.join('\n')}\n\nMa proposition\n${progress.caseDraft||'(À compléter)'}\n\nGrille\n${c.rubric.map(r=>r.title+' : '+r.text).join('\n')}\n\nAide-moi à évaluer mon raisonnement et à comprendre mes erreurs.`;try{await navigator.clipboard.writeText(text);notify('Contexte et proposition copiés. Tu peux les coller dans notre échange.');}catch{download('discussion-cas.json',{text});notify('Presse-papiers indisponible : le contexte a été téléchargé.');}});
 on('download-data','click',()=>download('demandes-synthetiques.json',data.caseStudy.dataset.map(({id,text})=>({id,text}))));
}
function bindProgress(){
 on('export-progress','click',()=>download('ai-learning-progression.json',progress));
 on('import-progress','change',async e=>{
  const file=e.target.files[0];if(!file)return;
  try{if(file.size>200000)throw new Error('Fichier trop volumineux (200 Ko maximum).');const next=validateProgress(JSON.parse(await file.text()),data.lessons.map(l=>l.id),data.quiz.questions.length);if(!confirm('Remplacer la progression de ce navigateur par ce fichier ? Exporte d’abord tes résultats si tu veux les conserver.'))return;progress=next;const saved=save();render();if(saved)notify('Progression importée.');}
  catch(err){notify(`Import impossible : ${err.message}`);}finally{e.target.value='';}
 });
}
async function start(){
 try{const response=await fetch('./content.json');if(!response.ok)throw new Error('Contenus indisponibles');data=await response.json();
  try{const stored=localStorage.getItem(STORAGE_KEY);if(stored)progress=validateProgress(JSON.parse(stored),data.lessons.map(l=>l.id),data.quiz.questions.length);}catch{notify('Progression locale non lisible. Les cours restent accessibles ; importe une sauvegarde si tu en as une.');}
  render();on('menu-toggle','click',e=>{const expanded=e.currentTarget.getAttribute('aria-expanded')!=='true';e.currentTarget.setAttribute('aria-expanded',String(expanded));document.querySelector('.sidebar').classList.toggle('menu-open',expanded);});window.addEventListener('hashchange',()=>{if(location.hash==='#main'){main.focus();return;}render();});
 }catch{main.innerHTML='<div class="empty"><h1>Impossible de charger les cours</h1><p>Vérifie que le site est servi avec npm run dev, puis recharge la page.</p><button class="button" id="reload">Réessayer</button></div>';on('reload','click',()=>location.reload());}
}
start();
