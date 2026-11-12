import {mkdir,copyFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadContent} from './content.mjs';
export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export async function build(){
  const data=await loadContent(root),dist=path.join(root,'dist');
  await mkdir(path.join(dist,'assets'),{recursive:true});
  for(const file of ['index.html','style.css','app.js','views.js','graph.js','state.js'])await copyFile(path.join(root,'web',file),path.join(dist,file));
  for(const file of ['circuit.svg','memoire.svg','outils.svg','rag.svg'])await copyFile(path.join(root,'AI Learning/Assets',file),path.join(dist,'assets',file));
  await writeFile(path.join(dist,'content.json'),JSON.stringify(data));
  return data;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const d=await build();console.log(`Build OK : ${d.lessons.length} cours, ${d.domains.length} domaines, ${d.quiz.questions.length} questions.`);}
