import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderMarkdown(source, lessons) {
  const titles = new Map(lessons.map(l => [l.title, l.id]));
  function inline(text) {
    return escapeHtml(text)
      .replace(/!\[([^\]]*)\]\(\.\.\/Assets\/([a-zA-Z0-9_.-]+)\)/g, '<img class="lesson-image" alt="$1" src="./assets/$2" loading="lazy">')
      .replace(/\[\[([^\]]+)\]\]/g, (_, title) => {
        if (!titles.has(title)) throw new Error(`Lien inconnu : ${title}`);
        return `<a href="#learn/${titles.get(title)}">${title}</a>`;
      })
      .replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }
  let output = [], paragraph = [], list = [], code = null, correction = null;
  const closeCorrection = () => { output.push(`<details class="correction"><summary>Dévoiler les repères de correction</summary>${renderMarkdown(correction.join('\n'),lessons)}</details>`);correction=null; };
  const flush = () => { if (paragraph.length) output.push(`<p>${inline(paragraph.join(' '))}</p>`); paragraph=[]; if(list.length) output.push(`<ul>${list.map(s=>`<li>${inline(s)}</li>`).join('')}</ul>`);list=[]; };
  for (const line of source.split(/\r?\n/)) {
    if(correction!==null){if(line.startsWith('> ')){correction.push(line.slice(2));continue;}closeCorrection();}
    if(code===null&&line==='> [!answer]- Repères de correction'){flush();correction=[];continue;}
    if(line.startsWith('```')) { if(code !== null){output.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);code=null;}else{flush();code=[];}continue; }
    if(code!==null){code.push(line);continue;}
    const heading=line.match(/^(#{1,3}) (.+)$/);
    if(heading){flush();if(heading[1].length!==1)output.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`);continue;}
    if(!line.trim()){flush();continue;}
    if(line.startsWith('- ')){if(paragraph.length)flush();list.push(line.slice(2));}else{if(list.length)flush();paragraph.push(line);}
  }
  if(code!==null) throw new Error('Bloc de code non fermé');
  if(correction!==null)closeCorrection();
  flush();return output.join('\n');
}
export async function loadContent(root) {
  const vault=path.join(root,'AI Learning');
  const readJson=async name=>JSON.parse(await readFile(path.join(vault,name),'utf8'));
  const catalog=await readJson('catalog.json'),quiz=await readJson('quiz.json'),caseStudy=await readJson('case.json');
  const ids=new Set(catalog.lessons.map(l=>l.id)),domains=new Set(catalog.domains.map(d=>d.id));
  if(ids.size!==catalog.lessons.length)throw new Error('Identifiants de cours dupliqués');
  const lessons=await Promise.all(catalog.lessons.map(async l=>{
    if(!domains.has(l.domain)||l.prerequisites.some(p=>!ids.has(p)))throw new Error(`Métadonnées invalides : ${l.id}`);
    const resolved=path.resolve(vault,l.file);
    if(!resolved.startsWith(path.resolve(vault)+path.sep))throw new Error('Chemin de cours interdit');
    const md=await readFile(resolved,'utf8');
    const links=[...md.matchAll(/\[\[([^\]]+)\]\]/g)].map(m=>catalog.lessons.find(x=>x.title===m[1])?.id);
    return {...l,html:renderMarkdown(md,catalog.lessons),links:[...new Set(links)]};
  }));
  if(catalog.path.some(id=>!ids.has(id)))throw new Error('Parcours invalide');
  if(new Set(quiz.questions.map(q=>q.id)).size!==quiz.questions.length)throw new Error('Questions dupliquées');
  for(const q of quiz.questions)if(!ids.has(q.lessonId)||!Number.isInteger(q.answer)||q.answer<0||q.answer>=q.options.length||q.explanations.length!==q.options.length)throw new Error(`Question invalide : ${q.id}`);
  return {domains:catalog.domains,lessons,path:catalog.path,quiz,caseStudy};
}
