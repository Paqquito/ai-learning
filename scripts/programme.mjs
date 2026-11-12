import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Generate the Obsidian-friendly programme from the same inventory as the web app.
const vault=fileURLToPath(new URL('../AI Learning/',import.meta.url));
const catalog=JSON.parse(await readFile(path.join(vault,'catalog.json'),'utf8'));
const roadmap=JSON.parse(await readFile(path.join(vault,'roadmap.json'),'utf8'));
const planned=roadmap.domains.reduce((n,d)=>n+d.courses.length,0);
const sections=catalog.domains.map(d=>`## ${d.title}\n\n${[
  ...catalog.lessons.filter(l=>l.domain===d.id).map(l=>`- Disponible (introduction) : [[${l.title}]]`),
  ...roadmap.domains.find(r=>r.id===d.id).courses.map(c=>`- À rédiger : ${c.title}`)
].join('\n')}`);
await writeFile(path.join(vault,'Programme.md'),`# Programme de la base IA\n\n${catalog.lessons.length+planned} cours inventoriés : ${catalog.lessons.length} introductions disponibles et ${planned} cours à rédiger. Mis à jour le ${roadmap.updated}.\n\n${roadmap.principle}\n\nCe catalogue vise une couverture large des métiers Applied AI, Forward Deployed, Harness et Infrastructure AI Engineer. Il ne prétend pas épuiser un domaine en évolution. Une fiche introductive ne remplace pas un cours avancé ou un laboratoire.\n\n## Comment apprendre\n\n- Intégrer : suivre les cours disponibles dans l'ordre proposé, puis résoudre le cas support.\n- Auditer : étudier les processus, l'évaluation, le coût et l'architecture cible.\n- Adapter : approfondir mathématiques, entraînement, fine-tuning et infrastructure.\n- Pour chaque nouveau cours : objectifs, explication, représentation visuelle utile, exemple résolu, exercice et corrigé masqué, sources datées.\n- Pour chaque laboratoire : données synthétiques, prérequis matériels, étapes, résultats attendus, correction et critères de réussite.\n\n${sections.join('\n\n')}\n\n## Études de cas et laboratoires\n\n${roadmap.cases.map((c,i)=>`- ${i===0?'Disponible (cas introductif)':'À construire'} : ${c}`).join('\n')}\n`);
console.log(`Programme : ${catalog.lessons.length+planned} cours, ${roadmap.cases.length} cas.`);
