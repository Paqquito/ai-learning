// Small, deterministic teaching models. No inference service is called.
export function cosine2D(angleA,angleB,lengthB=1){
 return lengthB===0?null:Math.cos((angleA-angleB)*Math.PI/180);
}
export function weightGiB(billions,bits){return billions*1e9*bits/8/2**30;}
export const toolSteps=[
 ['Demande','L’utilisateur demande le statut du ticket T-42. Son identité est vérifiée par l’application.'],
 ['Proposition','Le modèle propose lire_ticket({ticket_id: "T-42"}). Il ne consulte encore aucun ticket.'],
 ['Validation','Le runtime vérifie le schéma des arguments et les droits de cet utilisateur sur T-42.'],
 ['Exécution','Le serveur appelle l’API métier avec une identité autorisée et une permission de lecture seule.'],
 ['Restitution','Le résultat validé revient au modèle, qui formule la réponse. La trace conserve les métadonnées utiles.']
];
const controls=(text)=>`<p class="lab-prompt">${text}</p>`;
export function labHTML(kind){
 if(kind==='vectors')return `<section class="interactive-lab" data-lab="vectors" aria-label="Laboratoire de similarité"><h3>Fais tourner les vecteurs</h3>${controls('Prédis le score avant de déplacer les curseurs. Que se passe-t-il à 90° d’écart ?')}<div class="lab-split"><svg viewBox="0 0 320 300" role="img" aria-label="Deux vecteurs dans le plan"><defs><marker id="vector-arrow-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#245b48"/></marker><marker id="vector-arrow-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#285b82"/></marker></defs><path d="M25 150H295M160 15V285" stroke="#a6b5aa"/><circle cx="160" cy="150" r="100" fill="none" stroke="#d6ddd5" stroke-dasharray="4 5"/><line data-vector="a" x1="160" y1="150" x2="260" y2="150" stroke="#245b48" stroke-width="4" marker-end="url(#vector-arrow-a)"/><line data-vector="b" x1="160" y1="150" x2="210" y2="63.4" stroke="#285b82" stroke-width="4" marker-end="url(#vector-arrow-b)"/><text x="275" y="174">x</text><text x="172" y="28">y</text></svg><div class="lab-inputs"><label>Angle de u (vert)<input name="angle-a" type="range" min="0" max="360" value="0"><output data-value="angle-a">0°</output></label><label>Angle de v (bleu)<input name="angle-b" type="range" min="0" max="360" value="60"><output data-value="angle-b">60°</output></label><label>Longueur de v<input name="length-b" type="range" min="0" max="1.2" step="0.1" value="1"><output data-value="length-b">1</output></label><div class="lab-result" role="status" aria-live="polite"></div></div></div><p class="hint">u a une longueur de 1. La direction détermine le cosinus ; un vecteur nul rend la formule indéfinie. Cette géométrie en 2D illustre une opération, pas le sens d’un embedding réel.</p></section>`;
 if(kind==='memory')return `<section class="interactive-lab" data-lab="memory" aria-label="Estimation de mémoire"><h3>Construis un budget mémoire</h3>${controls('Observe la place occupée par les poids, puis ajoute une réserve. Ce calcul ne prédit pas la vitesse ni la qualité du modèle.')}<div class="lab-inputs memory-inputs"><label>Paramètres (milliards)<input name="parameters" type="number" min="0.1" max="1000" step="0.1" value="8"></label><label>Bits par poids<select name="bits"><option value="4">4 bits</option><option value="8">8 bits</option><option value="16">16 bits</option><option value="32">32 bits</option></select></label><label>Capacité disponible (GiB)<input name="capacity" type="number" min="1" max="4096" step="1" value="12"></label><label>Réserve hypothétique (GiB)<input name="reserve" type="number" min="0" max="4096" step="0.5" value="2"></label></div><div class="lab-result" role="status" aria-live="polite"></div><p class="hint">Poids théoriques = paramètres × bits / 8. 1 GiB = 2³⁰ octets. La réserve est une hypothèse à remplacer par des mesures : métadonnées de quantification, cache KV, activations et runtime. Les 12 GiB sont un scénario, pas une mesure de ta RTX 4070.</p></section>`;
 if(kind==='tools')return `<section class="interactive-lab" data-lab="tools" aria-label="Simulation d’un appel d’outil"><h3>Un appel d’outil, étape par étape</h3>${controls('Le modèle propose une action. Observe le moment où l’application décide de l’autoriser.')}<label>Scénario <select name="scenario"><option value="allowed">Utilisateur autorisé sur T-42</option><option value="denied">Utilisateur sans accès à T-42</option></select></label><ol class="tool-timeline">${toolSteps.map(([name],i)=>`<li data-step="${i}"><span>${i+1}</span>${name}</li>`).join('')}</ol><div class="lab-result" role="status" aria-live="polite"></div><div class="lab-actions"><button type="button" class="button secondary" data-action="back">Étape précédente</button><button type="button" class="button" data-action="next">Étape suivante</button></div><p class="hint">Simulation déterministe : aucune API n’est appelée et aucun modèle ne s’exécute. Le refus est imposé par le serveur, indépendamment du texte produit par le modèle.</p></section>`;
 throw new Error('Laboratoire inconnu : '+kind);
}
export function mountLabs(root){
 for(const lab of root.querySelectorAll('[data-lab]')){
  const output=lab.querySelector('.lab-result');
  if(lab.dataset.lab==='vectors'){
   const update=()=>{const a=+lab.querySelector('[name=angle-a]').value,b=+lab.querySelector('[name=angle-b]').value,len=+lab.querySelector('[name=length-b]').value;
    for(const [key,angle,length] of [['a',a,1],['b',b,len]]){const line=lab.querySelector(`[data-vector=${key}]`);line.setAttribute('x2',160+100*length*Math.cos(angle*Math.PI/180));line.setAttribute('y2',150-100*length*Math.sin(angle*Math.PI/180));}
    for(const [name,value] of [['angle-a',a+'°'],['angle-b',b+'°'],['length-b',len.toFixed(1)]])lab.querySelector(`[data-value="${name}"]`).textContent=value;
    const c=cosine2D(a,b,len);output.textContent=c===null?'Cosinus indéfini : v est nul.':`Similarité cosinus : ${c.toFixed(3).replace('-0.000','0.000')} · produit scalaire : ${(c*len).toFixed(3)}`;
   };lab.addEventListener('input',update);update();
  }else if(lab.dataset.lab==='memory'){
   const update=()=>{if([...lab.querySelectorAll('input')].some(i=>!i.value||!i.checkValidity())){output.textContent='Renseigne des valeurs dans les limites indiquées.';return;}
    const p=+lab.querySelector('[name=parameters]').value,b=+lab.querySelector('[name=bits]').value,c=+lab.querySelector('[name=capacity]').value,r=+lab.querySelector('[name=reserve]').value,w=weightGiB(p,b),remaining=c-w-r;
    output.innerHTML=`<strong>${w.toFixed(2)} GiB de poids théoriques</strong><p>Avec la réserve : ${(w+r).toFixed(2)} / ${c} GiB. ${remaining>=0?`Marge arithmétique : ${remaining.toFixed(2)} GiB. Cela ne garantit pas que le modèle s’exécute.`:`Dépassement : ${(-remaining).toFixed(2)} GiB. Ce budget ne tient pas dans la capacité choisie.`}</p>`;
   };lab.addEventListener('input',update);lab.addEventListener('change',update);update();
  }else{
   let step=0;const scenario=lab.querySelector('[name=scenario]'),back=lab.querySelector('[data-action=back]'),next=lab.querySelector('[data-action=next]');
   const update=()=>{const denied=scenario.value==='denied',max=denied?2:4;step=Math.min(step,max);lab.querySelectorAll('[data-step]').forEach((el,i)=>{el.toggleAttribute('data-current',i===step);el.toggleAttribute('data-complete',i<step);el.toggleAttribute('data-blocked',denied&&step===2&&i>2);});output.textContent=denied&&step===2?'Accès refusé sur T-42. Aucun appel à l’API métier. Le runtime renvoie une erreur contrôlée et n’envoie aucun contenu du ticket au modèle.':toolSteps[step][1];back.disabled=step===0;next.disabled=step===max;};
   back.addEventListener('click',()=>{step--;update();});next.addEventListener('click',()=>{step++;update();});scenario.addEventListener('change',()=>{step=0;update();});update();
  }
 }
}
