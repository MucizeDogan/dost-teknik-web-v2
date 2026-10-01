import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const webRoot = join(projectRoot, 'dist');
const types = {
  '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8',
  '.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml'
};

createServer(async (request,response)=>{
  if (!['GET','HEAD'].includes(request.method||'')) { response.writeHead(405); response.end('Method not allowed'); return; }
  try {
    const pathname = decodeURIComponent(new URL(request.url||'/', 'http://localhost').pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    let file = resolve(webRoot,relative);
    if (!file.startsWith(webRoot + sep) && file !== join(webRoot,'index.html')) { response.writeHead(403); response.end('Forbidden'); return; }
    try { if ((await stat(file)).isDirectory()) file=join(file,'index.html'); }
    catch { if (!extname(file)) file=join(file,'index.html'); }
    const contents=await readFile(file);
    response.writeHead(200,{'Content-Type':types[extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache'});
    response.end(request.method==='HEAD'?undefined:contents);
  } catch {
    try { response.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}); response.end(await readFile(join(webRoot,'404.html'))); }
    catch { response.writeHead(404); response.end('Not found'); }
  }
}).listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log(`Dost Teknik preview at http://127.0.0.1:${process.env.PORT||4173}`));
