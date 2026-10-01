import { readdir, readFile } from 'node:fs/promises';
import { resolve, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brands, regions, services, guides } from './data.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const dist = join(root, 'dist');
const htmlFiles = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (file.endsWith('.html') && !file.endsWith('404.html')) htmlFiles.push(file);
  }
}
await walk(dist);

const entities = { '&amp;':'&', '&lt;':'<', '&gt;':'>', '&quot;':'"', '&#39;':'\'', '&nbsp;':' ' };
const decode = text => text.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, m => entities[m] || m);
const strip = html => decode(html.replace(/<script\b[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const familyOf = path => {
  const p = path.replaceAll('\\', '/');
  if (p === '/index.html') return 'Homepage';
  if (/\/servis\//.test(p)) return 'Marka × bölge';
  if (/\/(hizmetler|bolgeler|markalar|bilgi-merkezi)\/index\.html$/.test(p)) return 'Dizinler';
  if (/\/hizmetler\/[^/]+\.html$/.test(p)) return 'Hizmet detayları';
  if (/\/bolgeler\/[^/]+\.html$/.test(p)) return 'Bölge detayları';
  if (/\/markalar\/[^/]+\.html$/.test(p)) return 'Marka detayları';
  if (/\/bilgi-merkezi\/[^/]+\.html$/.test(p)) return 'Rehber detayları';
  if (/\/hakkimizda\.html$/.test(p)) return 'Hakkımızda';
  if (/\/iletisim\.html$/.test(p)) return 'İletişim';
  return 'Diğer';
};
const variables = [
  ...brands.map(x=>({name:x.name,type:'BRAND'})),
  ...regions.map(x=>({name:x.name,type:'REGION'})),
  ...services.map(x=>({name:x.name,type:'SERVICE'})),
  ...guides.map(x=>({name:x.title,type:'GUIDE'}))
].sort((a,b)=>b.name.length-a.name.length);
const norm = text => {
  let value = text.toLocaleLowerCase('tr');
  for (const {name,type} of variables) value = value.replaceAll(name.toLocaleLowerCase('tr'), ` {${type}} `);
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').replace(/[^a-z0-9{}]+/g,' ').replace(/\s+/g,' ').trim();
};
const families = new Map();
const titles = new Map(), descriptions = new Map(), titleLengths=[], descriptionLengths=[];
const records = [];
for (const file of htmlFiles) {
  const html = await readFile(file,'utf8');
  const path = '/' + relative(dist,file).replaceAll('\\','/');
  const family = familyOf(path);
  const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] || html;
  const text = strip(main);
  const signature = norm(text);
  const mainLinks=[...main.matchAll(/\bhref="(\/[^"?#]*)(?:[?#][^"]*)?"/g)].map(x=>x[1]);
  const allLinks=[...html.matchAll(/\bhref="(\/[^"?#]*)(?:[?#][^"]*)?"/g)].map(x=>x[1]);
  const record = { path, family, text, signature, words: text.split(/\s+/).filter(Boolean).length, h2: [...main.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map(x=>strip(x[1])), mainLinks, allLinks };
  records.push(record);
  if (!families.has(family)) families.set(family,[]);
  families.get(family).push(record);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '';
  const desc = html.match(/<meta name="description" content="([^"]*)"/i)?.[1] || '';
  titles.set(title,(titles.get(title)||0)+1);
  descriptions.set(desc,(descriptions.get(desc)||0)+1);
  titleLengths.push(title.length); descriptionLengths.push(desc.length);
}

console.log(`Content baseline: ${records.length} indexable HTML pages`);
console.log(`Duplicate titles: ${[...titles.values()].filter(n=>n>1).reduce((a,n)=>a+n-1,0)}; duplicate descriptions: ${[...descriptions.values()].filter(n=>n>1).reduce((a,n)=>a+n-1,0)}`);
console.log('| Page family | Pages | Normalized distinct bodies | Duplicate normalized pages | Median words | Under 180 words | |');
console.log('|---|---:|---:|---:|---:|---:|');
for (const [name, pages] of families) {
  const signatures = new Set(pages.map(p=>p.signature));
  const wordCounts = pages.map(p=>p.words).sort((a,b)=>a-b);
  const median = wordCounts[Math.floor(wordCounts.length/2)] || 0;
  const thin = pages.filter(p=>p.words<180).length;
  console.log(`| ${name} | ${pages.length} | ${signatures.size} | ${pages.length-signatures.size} | ${median} | ${thin} |`);
}
const normalizedGroup = records.filter(x=>x.family==='Marka × bölge').reduce((groups,p)=>groups.set(p.signature,(groups.get(p.signature)||0)+1),new Map());
console.log(`Matrix page normalized signature groups: ${normalizedGroup.size}; largest group: ${Math.max(0,...normalizedGroup.values())}`);
console.log(`Title lengths: min ${Math.min(...titleLengths)}, max ${Math.max(...titleLengths)}, outside 30–65 chars ${titleLengths.filter(n=>n<30||n>65).length}; description lengths: min ${Math.min(...descriptionLengths)}, max ${Math.max(...descriptionLengths)}, outside 80–170 chars ${descriptionLengths.filter(n=>n<80||n>170).length}`);
const repeatedHeadings = records.flatMap(p=>p.h2).reduce((m,h)=>m.set(h,(m.get(h)||0)+1),new Map());
console.log('Most repeated H2 headings:');
for (const [heading,count] of [...repeatedHeadings].sort((a,b)=>b[1]-a[1]).slice(0,12)) console.log(`- ${count}x ${heading}`);

const routeToFile = route => route==='/'?'/index.html':route.endsWith('/')?`${route}index.html`:route;
const recordByPath = new Map(records.map(p=>[p.path,p]));
const graph = new Map(records.map(p=>[p.path,p.allLinks.map(routeToFile).filter(dest=>recordByPath.has(dest))]));
const depth = new Map([['/index.html',0]]), queue=['/index.html'];
while(queue.length){const page=queue.shift();for(const dest of graph.get(page)||[]){if(!depth.has(dest)){depth.set(dest,depth.get(page)+1);queue.push(dest)}}}
const orphans=records.filter(p=>!depth.has(p.path));
const maxDepth=Math.max(0,...depth.values());
const counts=records.map(p=>p.mainLinks.length);
const over100=records.filter(p=>p.mainLinks.length>100);
const noContext=records.filter(p=>p.mainLinks.length===0);
console.log(`Internal graph: ${records.length-orphans.length}/${records.length} pages reachable; orphan pages ${orphans.length}; max crawl depth ${maxDepth}; pages without main-content links ${noContext.length}; pages with >100 main links ${over100.length}; max main links/page ${Math.max(...counts)}`);
for(const page of orphans.slice(0,15))console.log(`ORPHAN ${page.path}`);
const lowContent=records.filter(p=>p.words<180);
console.log(`Pages under 180 main-content words: ${lowContent.length}${lowContent.length?` (${lowContent.map(p=>`${p.path} [${p.family}]`).join(', ')})`:''}`);
for (const file of htmlFiles) {
  const path='/' + relative(dist,file).replaceAll('\\','/');
  const html=await readFile(file,'utf8');
  const title=html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||'';
  const desc=html.match(/<meta name="description" content="([^"]*)"/i)?.[1]||'';
  if(title.length<30||title.length>65)console.log(`TITLE LENGTH ${title.length}: ${path} — ${title}`);
  if(desc.length<80||desc.length>170)console.log(`DESCRIPTION LENGTH ${desc.length}: ${path} — ${desc}`);
}
