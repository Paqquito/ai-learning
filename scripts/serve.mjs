import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {build,root} from './build.mjs';
await build();
const base=path.join(root,'dist'),port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'};
let buildQueue=Promise.resolve();
const server=http.createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(pathname==='/'||pathname==='/index.html'){buildQueue=buildQueue.then(build,build);await buildQueue;}
  const target=path.resolve(base,'.'+(pathname==='/'?'/index.html':pathname));
  if(!target.startsWith(base+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
  if(!(await stat(target)).isFile())throw new Error('Not a file');
  res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(await readFile(target));
 }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Ressource indisponible. Vérifier le chemin et la compilation.');}
});
server.listen(port,'127.0.0.1',()=>console.log(`AI Learning : http://127.0.0.1:${port}`));
