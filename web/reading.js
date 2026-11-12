import {esc} from './views.js';
import {mountLabs} from './labs.js';
const PREF_KEY='ai-learning-reading-v1';
export function readingControls(){return `<div class="reading-controls" aria-label="Réglages de lecture"><label>Taille du texte<select id="reading-size"><option value="normal">Standard</option><option value="large">Confort</option><option value="compact">Compact</option></select></label><label>Alignement<select id="reading-align"><option value="justify">Justifié</option><option value="left">À gauche</option></select></label><button class="button secondary" id="reading-focus" aria-pressed="false">Mode lecture</button></div>`;}
export function lessonPractice(data,l,p){
 const q=data.quiz.questions.find(q=>q.lessonId===l.id);if(!q)return '';
 const recall=l.recall||'Sans relire le cours, explique la notion principale et donne un exemple de son utilisation dans une intégration IA.';
 return `<section class="lesson-practice" id="practice-section" tabindex="-1"><h2>À toi de reconstruire</h2><p>Ferme mentalement le cours et essaie de répondre avant de consulter les corrigés.</p><label for="lesson-draft">${esc(recall)}</label><textarea id="lesson-draft" rows="4" maxlength="12000" placeholder="Mon explication, mon raisonnement…">${esc(p.notes?.[l.id]||'')}</textarea><p class="hint" id="lesson-draft-status" role="status">Brouillon personnel enregistré dans ce navigateur, inclus dans l’export de progression.</p><details class="recall-answer"><summary>Comparer avec les repères du cours</summary><p>${esc(l.takeaway||l.summary)}</p><p>Vérifie les termes utilisés, les conditions et les limites. Ce brouillon n’est pas corrigé automatiquement : utilise les exercices du cours pour détailler le raisonnement.</p></details><form id="lesson-quiz"><fieldset><legend>${esc(q.prompt)}</legend>${q.options.map((o,i)=>`<label class="quick-choice"><input type="radio" name="answer" value="${i}" required> <span>${esc(o)}</span></label>`).join('')}</fieldset><button class="button" type="submit">Vérifier ma réponse</button><div id="lesson-feedback" role="status" aria-live="polite"></div></form><p class="hint">Une réponse juste ne suffit pas à démontrer la maîtrise. Reviens sur un exemple différent après un délai.</p><p><a href="#practice">Ouvrir l’entraînement complet →</a></p></section>`;
}
export function reviewQueue(data,p,now=Date.now()){
 const reviews=Object.entries(p.reviews||{}).sort((a,b)=>Date.parse(a[1].due)-Date.parse(b[1].due));
 if(!reviews.length)return '';
 const due=reviews.filter(([,r])=>Date.parse(r.due)<=now),list=(due.length?due:reviews).slice(0,6);
 return `<section class="review-queue"><h2>${due.length?`${due.length} notion${due.length>1?'s':''} à revoir`:'Tes prochaines révisions'}</h2><p>Les questions de fin de fiche alimentent ce carnet. Les délais de 1 ou 7 jours sont des repères simples, pas une mesure de maîtrise.</p><ul>${list.map(([id,r])=>`<li><a href="#learn/${id}/practice-section">${esc(data.lessons.find(l=>l.id===id).title)}</a><span>${Date.parse(r.due)<=now?'À revoir':new Date(r.due).toLocaleDateString('fr-FR',{timeZone:'UTC'})}</span></li>`).join('')}</ul><p class="hint">Suivi local à ce navigateur. Exporte ta progression pour la transférer ; aucune notification n’est envoyée.</p></section>`;
}
export function nextReview(correct,now=new Date()){
 return {date:now.toISOString(),due:new Date(now.getTime()+(correct?7:1)*86400000).toISOString(),correct};
}
let readingEvents=null,scrollFrame=0;
export function cleanupReading(){readingEvents?.abort();readingEvents=null;cancelAnimationFrame(scrollFrame);scrollFrame=0;document.querySelector('#figure-dialog')?.remove();document.body.classList.remove('reading-focus');}
export function mountReading(root,data,l,p,save,notify){
 if(!l)return;
 let pref={size:'normal',align:'justify',focus:false};
 try{const v=JSON.parse(localStorage.getItem(PREF_KEY));if(v){if(['normal','large','compact'].includes(v.size))pref.size=v.size;if(['justify','left'].includes(v.align))pref.align=v.align;pref.focus=v.focus===true;}}catch{}
 const size=root.querySelector('#reading-size'),align=root.querySelector('#reading-align'),focus=root.querySelector('#reading-focus');
 const apply=()=>{root.dataset.readingSize=pref.size;root.dataset.readingAlign=pref.align;document.body.classList.toggle('reading-focus',pref.focus);size.value=pref.size;align.value=pref.align;focus.setAttribute('aria-pressed',String(pref.focus));focus.textContent=pref.focus?'Quitter le mode lecture':'Mode lecture';};
 const remember=()=>{apply();try{localStorage.setItem(PREF_KEY,JSON.stringify(pref));}catch{notify('Réglages appliqués pour cette page ; leur sauvegarde est indisponible.');}};
 size.addEventListener('change',()=>{pref.size=size.value;remember();});align.addEventListener('change',()=>{pref.align=align.value;remember();});focus.addEventListener('click',()=>{pref.focus=!pref.focus;remember();});apply();
 const toc=root.querySelector('.lesson-toc-details');if(toc)toc.open=!matchMedia('(max-width:1100px)').matches;
 const headings=[...root.querySelectorAll('.prose h2[id],#practice-section')];
 const updateCurrent=()=>{const current=headings.filter(h=>h.getBoundingClientRect().top<180).at(-1)||headings[0];root.querySelectorAll('.lesson-toc nav a').forEach(a=>{if(a.hash.endsWith('/'+current?.id))a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});};
 readingEvents=new AbortController();
 window.addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;updateCurrent();});},{passive:true,signal:readingEvents.signal});updateCurrent();
 const dialog=document.createElement('dialog');dialog.id='figure-dialog';dialog.setAttribute('aria-labelledby','figure-title');dialog.innerHTML='<div class="figure-dialog-toolbar"><h2 id="figure-title">Schéma en grand format</h2><button type="button" class="button secondary" id="figure-size" aria-pressed="false">Agrandir encore</button><button type="button" class="button" id="figure-close">Fermer</button></div><div class="figure-stage"><img alt=""></div><p id="figure-description"></p>';document.body.append(dialog);
 let opener;
 root.querySelectorAll('.figure-open').forEach(button=>button.addEventListener('click',()=>{opener=button;const img=button.querySelector('img'),expanded=dialog.querySelector('img');expanded.src=img.src;expanded.alt=img.alt;dialog.querySelector('#figure-description').textContent=img.alt;dialog.classList.remove('figure-enlarged');dialog.querySelector('#figure-size').setAttribute('aria-pressed','false');dialog.querySelector('#figure-size').textContent='Agrandir encore';dialog.showModal();dialog.querySelector('#figure-close').focus();}));
 dialog.querySelector('#figure-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>opener?.focus());dialog.querySelector('#figure-size').addEventListener('click',e=>{const zoom=dialog.classList.toggle('figure-enlarged');e.currentTarget.setAttribute('aria-pressed',String(zoom));e.currentTarget.textContent=zoom?'Adapter à la fenêtre':'Agrandir encore';});
 root.querySelectorAll('.copy-code').forEach(b=>b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(b.closest('.code-block').querySelector('code').textContent);notify('Code copié.');}catch{notify('Copie indisponible. Sélectionne le code pour le copier manuellement.');}}));
 root.querySelector('#lesson-draft')?.addEventListener('input',e=>{p.notes[l.id]=e.target.value;root.querySelector('#lesson-draft-status').textContent=save()?'Brouillon enregistré dans ce navigateur.':'Sauvegarde indisponible : copie ton brouillon avant de quitter.';});
 const q=data.quiz.questions.find(q=>q.lessonId===l.id),form=root.querySelector('#lesson-quiz');
 form?.addEventListener('submit',e=>{e.preventDefault();if(form.dataset.graded)return;const answer=new FormData(form).get('answer');if(answer===null)return;const choice=Number(answer);if(!Number.isInteger(choice)||!q.options[choice])return;const correct=choice===q.answer;p.reviews[l.id]=nextReview(correct);const saved=save();form.dataset.graded='true';form.querySelectorAll('input').forEach(i=>i.disabled=true);form.querySelector('button').hidden=true;
  const feedback=root.querySelector('#lesson-feedback');feedback.innerHTML=`<strong>${correct?'Bonne réponse.':'À revoir.'}</strong><p>${esc(q.explanations[choice])}</p><p><b>Réponse attendue :</b> ${esc(q.options[q.answer])}</p><details><summary>Comprendre toutes les propositions</summary><ul>${q.options.map((o,i)=>`<li><strong>${esc(o)}</strong> — ${esc(q.explanations[i])}</li>`).join('')}</ul></details><p class="hint">${saved?`Révision ajoutée au carnet dans ${correct?'7 jours':'1 jour'}.`:'La réponse est corrigée, mais la sauvegarde a échoué.'}</p><button type="button" class="button secondary" id="retry-lesson">Réessayer</button>`;
  root.querySelector('#retry-lesson').addEventListener('click',()=>{delete form.dataset.graded;form.reset();form.querySelectorAll('input').forEach(i=>i.disabled=false);form.querySelector('button').hidden=false;feedback.innerHTML='';form.querySelector('input').focus();});
 });
 mountLabs(root);
}
