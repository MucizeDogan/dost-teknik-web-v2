import { services, regions, brands, guides, brandRegionPairs } from './data.mjs';
const origin=process.env.PREVIEW_URL||'http://127.0.0.1:4173';
const routes=['/','/hizmetler/','/bolgeler/','/markalar/','/bilgi-merkezi/','/hakkimizda.html','/iletisim.html','/bolgeler/islamhaneleri-klima-servisi.html','/servis/islamhaneleri/arcelik-servisi.html',...services.slice(0,3).map(x=>x.url),...regions.slice(0,5).map(x=>x.url),...brands.slice(0,5).map(x=>x.url),...brandRegionPairs.slice(0,5).map(x=>`/servis/${x.region.slug}/${x.brand.slug}-servisi.html`),...guides.slice(0,5).map(x=>x.url)];
const errors=[];
for(const route of [...new Set(routes)]){
  try{
    const response=await fetch(new URL(route,origin));
    const body=await response.text();
    if(response.status!==200)errors.push(`${route}: HTTP ${response.status}`);
    if(!body.includes('<h1')||body.includes('Cannot GET'))errors.push(`${route}: missing heading or routing fallback text`);
  }catch(error){errors.push(`${route}: ${error.message}`)}
}
for(const asset of ['/assets/site.css','/assets/site.js','/assets/images/dost-teknik-logo.webp','/assets/images/dost-teknik-isletme-dis.webp','/assets/images/dost-teknik-isletme-ici.webp']){
  try{const response=await fetch(new URL(asset,origin));if(response.status!==200)errors.push(`${asset}: HTTP ${response.status}`)}catch(error){errors.push(`${asset}: ${error.message}`)}
}
const notFound=await fetch(new URL('/this-path-should-not-exist.html',origin));
if(notFound.status!==404)errors.push(`unknown route: expected 404, got ${notFound.status}`);
console.log(`HTTP route checks ${new Set(routes).size}; assets 5; unknown route ${notFound.status}; errors ${errors.length}`);
if(errors.length){for(const error of errors)console.log(`ERROR ${error}`);process.exitCode=1}
