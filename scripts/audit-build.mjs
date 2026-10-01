import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { knownUrls, site, services, regions, brands, guides, brandRegionPairs } from './data.mjs';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const dist=join(root,'dist');
const expectedOrigin=(process.env.SITE_URL||site.siteUrl).replace(/\/$/,'');
async function files(dir){const out=[];for(const entry of await readdir(dir,{withFileTypes:true})){const p=join(dir,entry.name);if(entry.isDirectory())out.push(...await files(p));else out.push(p)}return out}
const all=await files(dist), htmlFiles=all.filter(x=>x.endsWith('.html')&&!x.endsWith('404.html'));
const errors=[],titles=new Map(),descriptions=new Map(),canonicals=new Set(),sitemapText=await readFile(join(dist,'sitemap.xml'),'utf8');
let whatsappCtas=0;
for(const file of htmlFiles){
 const html=await readFile(file,'utf8'), rel=file.slice(dist.length).replaceAll('\\','/');
 const title=html.match(/<title>(.*?)<\/title>/i)?.[1];
 const desc=html.match(/<meta name="description" content="(.*?)">/i)?.[1];
 const h1=(html.match(/<h1\b/gi)||[]).length;
 const canonical=html.match(/<link rel="canonical" href="(.*?)">/i)?.[1];
 if(!title)errors.push(`${rel}: missing title`);else if(titles.has(title))errors.push(`${rel}: duplicate title with ${titles.get(title)}`);else titles.set(title,rel);
 if(!desc)errors.push(`${rel}: missing meta description`);else if(descriptions.has(desc))errors.push(`${rel}: duplicate meta description with ${descriptions.get(desc)}`);else descriptions.set(desc,rel);
 if(h1!==1)errors.push(`${rel}: expected one H1, found ${h1}`);
 if(!canonical)errors.push(`${rel}: missing canonical`);else {try {const parsed=new URL(canonical);if(parsed.protocol!=='https:'||parsed.origin!==expectedOrigin)errors.push(`${rel}: invalid canonical host/protocol ${canonical}`);if(canonicals.has(canonical))errors.push(`${rel}: duplicate canonical ${canonical}`);else canonicals.add(canonical)}catch{errors.push(`${rel}: malformed canonical ${canonical}`)}}
 for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){try{JSON.parse(match[1])}catch{errors.push(`${rel}: invalid JSON-LD`)}}
 for(const match of html.matchAll(/<a\b(?=[^>]*\bhref="https:\/\/wa\.me\/)[^>]*>[\s\S]*?<\/a>/gi)){
   whatsappCtas++;
   const preceding=html.slice(Math.max(0,match.index-1400),match.index);
   const contactRowHasIcon=rel==='/iletisim.html'&&match[0].includes('Hazır servis mesajı oluştur')&&preceding.includes('icon-whatsapp');
   if(!match[0].includes('icon-whatsapp')&&!contactRowHasIcon)errors.push(`${rel}: WhatsApp link missing WhatsApp brand icon`);
   if(match[0].includes('icon-chat'))errors.push(`${rel}: generic chat icon used for WhatsApp`);
 }
 for(const match of html.matchAll(/\bhref="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){
   const href=match[1];if(href.startsWith('//'))continue;
   const target=join(dist,href.replace(/^\//,''));
   const candidates=href==='/'?[join(dist,'index.html')]:href.endsWith('/')?[join(target,'index.html')]:[target];
   let exists=false;for(const candidate of candidates){try{if((await stat(candidate)).isFile()){exists=true;break}}catch{}}
   if(!exists)errors.push(`${rel}: broken local link ${href}`);
 }
 for(const match of html.matchAll(/\bsrc="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){
   const target=join(dist,match[1].replace(/^\//,''));
   try {if(!(await stat(target)).isFile())errors.push(`${rel}: missing asset ${match[1]}`)}catch{errors.push(`${rel}: missing asset ${match[1]}`)}
 }
 for(const img of html.matchAll(/<img\b([^>]*)>/gi)){if(!/\balt="[^"]*"/i.test(img[1]))errors.push(`${rel}: image without alt`)}
}
const sitemapLocs=[...sitemapText.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1].replaceAll('&amp;','&'));
const sitemapSet=new Set(sitemapLocs);
const sitemapCount=sitemapLocs.length;
if(sitemapCount!==htmlFiles.length)errors.push(`sitemap count ${sitemapCount} differs from pages ${htmlFiles.length}`);
if(sitemapSet.size!==sitemapCount)errors.push('duplicate URL in sitemap');
for(const canonical of canonicals)if(!sitemapSet.has(canonical))errors.push(`canonical missing from sitemap ${canonical}`);
for(const loc of sitemapSet)if(!canonicals.has(loc))errors.push(`sitemap URL has no page canonical ${loc}`);
if(sitemapText.includes('/404.html'))errors.push('404 listed in sitemap');
if(sitemapCount!==new Set(knownUrls).size)errors.push(`page count differs from URL data (${new Set(knownUrls).size})`);
if(brandRegionPairs.length!==1176)errors.push(`verified matrix count changed: ${brandRegionPairs.length}`);
const spread=(items,count)=>Array.from({length:count},(_,i)=>items[Math.floor(i*(items.length-1)/(count-1))]);
const sampleRoutes=['/','/hizmetler/','/bolgeler/','/markalar/','/bilgi-merkezi/','/hakkimizda.html','/iletisim.html','/bolgeler/islamhaneleri-klima-servisi.html','/markalar/arcelik-servisi.html','/servis/islamhaneleri/arcelik-servisi.html','/bilgi-merkezi/klima-neden-sogutmaz.html',...spread(services,5).map(x=>x.url),...spread(regions,10).map(x=>x.url),...spread(brands,10).map(x=>x.url),...spread(brandRegionPairs,30).map(x=>`/servis/${x.region.slug}/${x.brand.slug}-servisi.html`),...spread(guides,10).map(x=>x.url)];
for(const route of sampleRoutes){const expected=route==='/'?join(dist,'index.html'):route.endsWith('/')?join(dist,route.replace(/^\//,'')+'index.html'):join(dist,route.replace(/^\//,''));try{if(!(await stat(expected)).isFile())errors.push(`sample route missing ${route}`)}catch{errors.push(`sample route missing ${route}`)}}
const home=await readFile(join(dist,'index.html'),'utf8');
if(!home.includes('Hemen Ara')||!home.includes('WhatsApp'))errors.push('homepage mobile dual CTA missing');
const mobileBar=home.match(/<div class="mobile-actions"[\s\S]*?<\/div>/)?.[0]||'';
if(!mobileBar.includes(`href="tel:+${site.phoneDigits}"`)||!mobileBar.includes(`href="https://wa.me/${site.phoneDigits}"`))errors.push('mobile sticky bar destinations are incorrect');
if(!mobileBar.includes('aria-label="Dost Teknik\'i hemen ara"')||!mobileBar.includes('aria-label="Dost Teknik\'e WhatsApp ile ulaş"'))errors.push('mobile sticky bar accessibility labels missing');
if(!home.includes('aria-expanded="false"')||!home.includes('aria-controls="primary-nav"'))errors.push('menu disclosure semantics missing');
const robots=await readFile(join(dist,'robots.txt'),'utf8');
if(!robots.includes(`Sitemap: ${expectedOrigin}/sitemap.xml`))errors.push('robots sitemap reference mismatch');
if(!/^User-agent:\s*\*\s*\r?\nAllow:\s*\/\s*\r?\n/m.test(robots))errors.push('robots does not allow crawling');
if(/^Disallow:\s*\/\s*$/m.test(robots))errors.push('robots blocks the entire site');
const notFound=await readFile(join(dist,'404.html'),'utf8');
if(!/<meta name="robots" content="noindex,follow">/.test(notFound))errors.push('404 must be noindex,follow');
if(/<link rel="canonical"/.test(notFound))errors.push('404 should not publish a canonical');
if(/<script type="application\/ld\+json">/.test(notFound))errors.push('404 should not emit business/article structured data');
const contact=await readFile(join(dist,'iletisim.html'),'utf8');
const contactSchemas=[...contact.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x=>JSON.parse(x[1]));
const localBusiness=contactSchemas.find(x=>x['@type']==='HVACBusiness');
if(site.mapsUrl.trim()){
 try { if(new URL(site.mapsUrl.trim()).protocol!=='https:'||localBusiness?.hasMap!==new URL(site.mapsUrl.trim()).href)errors.push('LocalBusiness hasMap does not match valid HTTPS mapsUrl'); }
 catch { errors.push('mapsUrl must be a valid HTTPS URL'); }
}
if(site.latitude.trim()&&site.longitude.trim()&&(!localBusiness?.geo||Number(localBusiness.geo.latitude)!==Number(site.latitude)||Number(localBusiness.geo.longitude)!==Number(site.longitude)))errors.push('LocalBusiness geo does not match configured coordinates');
if(!site.mapsUrl.trim()&&!site.placeId.trim()&&!site.latitude.trim()&&!site.longitude.trim()&&!site.mapsEmbedApiKey.trim()&&!process.env.MAPS_EMBED_API_KEY){
 if(contact.includes('<iframe'))errors.push('Maps iframe rendered while embed config is empty');
 if(contact.includes('Haritada Görüntüle')||contact.includes('Google’da Görüntüle'))errors.push('Maps/Profile CTA rendered without corresponding configuration');
 if(localBusiness?.hasMap||localBusiness?.geo)errors.push('LocalBusiness emits empty-config Maps schema');
}
if(site.address.trim()&&!/href="https:\/\/www\.google\.com\/maps\/dir\/\?api=1&amp;destination=/.test(contact))errors.push('directions CTA missing verified business-address destination');
if(all.some(file=>/dist[\\/]assets[\\/]images[\\/]DostTeknik_.*\.(?:jpg|jpeg)$/i.test(file)))errors.push('original JPEG source copied into dist');
console.log(`HTML pages ${htmlFiles.length}; titles ${titles.size}; descriptions ${descriptions.size}; canonicals ${canonicals.size}; sitemap URLs ${sitemapCount}; WhatsApp CTAs ${whatsappCtas}; checked sample routes ${sampleRoutes.length}; errors ${errors.length}`);
if(errors.length){for(const e of errors.slice(0,60))console.log(`ERROR ${e}`);process.exitCode=1}
