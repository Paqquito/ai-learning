import { readFile } from 'node:fs/promises';
import path from 'node:path';
import {formulaHTML} from '../web/formulae.js';
import {labHTML} from '../web/labs.js';

export const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function codeHTML(source,language='text'){
 const supported=['json','python','javascript','bash','text'];
 const lang=supported.includes(language)?language:'text';
 // A small lexical accent for teaching snippets, not a language parser.
 const tokens=/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[^\n]*|\b(?:const|let|return|if|else|for|in|import|from|def|print|True|False|None|true|false|null)\b|\b\d+(?:\.\d+)?\b)/g;
 let html='',last=0;
 if(lang==='text')html=escapeHtml(source);else{
  for(const match of source.matchAll(tokens)){html+=escapeHtml(source.slice(last,match.index));const token=match[0],kind=/^["']/.test(token)?'string':token.startsWith('#')?'comment':/^\d/.test(token)?'number':'keyword';html+=`<span class="syntax-${kind}">${escapeHtml(token)}</span>`;last=match.index+token.length;}
  html+=escapeHtml(source.slice(last));
 }
 return `<div class="code-block"><div class="code-toolbar"><span>${lang}</span><button type="button" class="copy-code">Copier le code</button></div><pre tabindex="0"><code>${html}</code></pre></div>`;
}
export function renderMarkdown(source, lessons) {
  const titles = new Map(lessons.map(l => [escapeHtml(l.title), l.id]));
  function inline(text) {
    return escapeHtml(text)
      .replace(/!\[([^\]]*)\]\(\.\.\/Assets\/([a-zA-Z0-9_.-]+)\)/g, '<img class="lesson-image" alt="$1" src="./assets/$2" loading="lazy">')
      .replace(/\[\[([^\]]+)\]\]/g, (_, title) => {
        if (!titles.has(title)) throw new Error(`Lien inconnu : ${title}`);
        return `<a href="#learn/${titles.get(title)}">${title}</a>`;
      })
      .replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
  }
  let output = [], paragraph = [], list = [], code = null, codeLanguage='text', correction = null, calloutType = 'answer', calloutTitle = '', table = [];
  const closeCorrection = () => {
    const body=renderMarkdown(correction.join('\n'),lessons);
    output.push(calloutType==='answer'
      ? `<details class="correction"><summary>Dévoiler le corrigé expliqué</summary>${body}</details>`
      : `<aside class="callout callout-${calloutType}"><p class="callout-title">${escapeHtml(calloutTitle)}</p>${body}</aside>`);
    correction=null;
  };
  const closeTable = () => {
    if(!table.length)return;
    const cells=line=>line.trim().replace(/^\||\|$/g,'').split('|').map(s=>s.trim());
    const rows=table.map(cells),head=rows.shift();
    if(rows[0]?.every(c=>/^:?-{3,}:?$/.test(c)))rows.shift();
    output.push(`<div class="table-scroll" tabindex="0" role="region" aria-label="Tableau du cours"><table><thead><tr>${head.map(c=>`<th scope="col">${inline(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
    table=[];
  };
  const flush = () => { if (paragraph.length) output.push(`<p>${inline(paragraph.join(' '))}</p>`); paragraph=[]; if(list.length) output.push(`<ul>${list.map(s=>`<li>${inline(s)}</li>`).join('')}</ul>`);list=[]; };
  for (const line of source.split(/\r?\n/)) {
    if(correction!==null){if(/^>( |$)/.test(line)){correction.push(line.slice(2));continue;}closeCorrection();}
    const callout=code===null&&line.match(/^> \[!(answer|abstract|tip|warning|example|formula)\]-?\s*(.*)$/);
    if(callout){flush();closeTable();correction=[];calloutType=callout[1];calloutTitle=callout[2];continue;}
    if(code===null&&line.trim().startsWith('|')){flush();table.push(line);continue;}
    closeTable();
    if(line.startsWith('```')) { if(code !== null){output.push(codeHTML(code.join('\n'),codeLanguage));code=null;}else{flush();code=[];codeLanguage=line.slice(3).trim();}continue; }
    if(code!==null){code.push(line);continue;}
    const extension=line.match(/^:::(formula|lab) ([a-z-]+)$/);
    if(extension){flush();output.push(extension[1]==='formula'?formulaHTML(extension[2]):labHTML(extension[2]));continue;}
    const figure=line.match(/^!\[([^\]]*)\]\(\.\.\/Assets\/([a-zA-Z0-9_.-]+)\)$/);
    if(figure){flush();output.push(`<figure class="course-figure"><button type="button" class="figure-open" aria-label="Agrandir le schéma"><img class="lesson-image" alt="${escapeHtml(figure[1])}" src="./assets/${figure[2]}" loading="lazy"><span>Agrandir le schéma</span></button></figure>`);continue;}
    const heading=line.match(/^(#{1,3}) (.+)$/);
    if(heading){flush();if(heading[1].length!==1)output.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`);continue;}
    if(!line.trim()){flush();continue;}
    if(line.startsWith('- ')){if(paragraph.length)flush();list.push(line.slice(2));}else{if(list.length)flush();paragraph.push(line);}
  }
  if(code!==null) throw new Error('Bloc de code non fermé');
  if(correction!==null)closeCorrection();
  flush();closeTable();return output.join('\n');
}
export async function loadContent(root) {
  const vault=path.join(root,'AI Learning');
  const readJson=async name=>JSON.parse(await readFile(path.join(vault,name),'utf8'));
  const catalog=await readJson('catalog.json'),quiz=await readJson('quiz.json'),caseStudy=await readJson('case.json'),roadmap=await readJson('roadmap.json');
  const ids=new Set(catalog.lessons.map(l=>l.id)),domains=new Set(catalog.domains.map(d=>d.id));
  if(ids.size!==catalog.lessons.length)throw new Error('Identifiants de cours dupliqués');
  const lessons=await Promise.all(catalog.lessons.map(async l=>{
    if(!domains.has(l.domain)||l.prerequisites.some(p=>!ids.has(p)))throw new Error(`Métadonnées invalides : ${l.id}`);
    const resolved=path.resolve(vault,l.file);
    if(!resolved.startsWith(path.resolve(vault)+path.sep))throw new Error('Chemin de cours interdit');
    const md=await readFile(resolved,'utf8');
    const links=[...md.matchAll(/\[\[([^\]]+)\]\]/g)].map(m=>catalog.lessons.find(x=>x.title===m[1])?.id);
    const exercises=md.split(/^## /m).filter(section=>/^(Exercice|Expérience|Passer à l'action)/.test(section));
    if(!exercises.length||exercises.some(section=>!section.includes('> [!answer]-')))throw new Error(`Exercice sans corrigé : ${l.id}`);
    const toc=[];
    const html=renderMarkdown(md,catalog.lessons).replace(/<h2>(.*?)<\/h2>/g,(_,title)=>{
      const sectionId=`section-${toc.length+1}`;
      const plainTitle=title.replace(/<[^>]*>/g,'').replace(/&(amp|lt|gt|quot|#39);/g,(_,entity)=>({amp:'&',lt:'<',gt:'>',quot:'"','#39':"'"}[entity]));
      toc.push({id:sectionId,title:plainTitle});
      const kind=/Exercice|Expérience|action/.test(title)?'exercise':/Sources?|documentaire/.test(title)?'sources':/sauras|Objectifs/.test(title)?'objectives':'concept';
      return `<h2 id="${sectionId}" class="section-${kind}" tabindex="-1"><span class="section-number" aria-hidden="true">${String(toc.length).padStart(2,'0')}</span>${title}</h2>`;
    });
    return {...l,html,toc,exerciseCount:exercises.length,links:[...new Set(links)]};
  }));
  if(catalog.path.some(id=>!ids.has(id)))throw new Error('Parcours invalide');
  if(new Set(quiz.questions.map(q=>q.id)).size!==quiz.questions.length)throw new Error('Questions dupliquées');
  for(const q of quiz.questions)if(!ids.has(q.lessonId)||!Number.isInteger(q.answer)||q.answer<0||q.answer>=q.options.length||q.explanations.length!==q.options.length)throw new Error(`Question invalide : ${q.id}`);
  for(const d of roadmap.domains){
    if(!domains.has(d.id)||!d.courses.length)throw new Error('Domaine du programme invalide');
    for(const c of d.courses)if(c.lessonId&&!ids.has(c.lessonId))throw new Error('Cours du programme inconnu');
  }
  return {domains:catalog.domains,lessons,path:catalog.path,quiz,caseStudy,roadmap};
}
