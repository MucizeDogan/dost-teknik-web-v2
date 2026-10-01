import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brandRegionPairs } from './data.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const file = resolve(root, 'REFERENCE-SEO-MAP.md');
let md = await readFile(file, 'utf8');
md = md.replace(/^\| ([^|]+) \| `(\/hizmetler\/[^`]+)` \|[^\r\n]*$/gm, '| $1 | `$2` | `$2` |');
const start = md.indexOf('## Marka × Bölge — tam doğrulanmış href envanteri');
if (start >= 0) md = md.slice(0,start).trimEnd();
const rows = brandRegionPairs.map(({brand,region,verifiedFrom})=>{
  const source = `/servis/${region.slug}/${brand.slug}-servisi.html`;
  const evidence = verifiedFrom==='brand'?`/markalar/${brand.slug}-servisi.html`:`/bolgeler/${region.slug}-klima-servisi.html`;
  return `| ${region.name} | ${brand.name} | ${evidence} | ${source} | ${source} |`;
}).join('\n');
md += `\n\n## Marka × Bölge — tam doğrulanmış href envanteri\n\nAşağıdaki ${brandRegionPairs.length.toLocaleString('en-US')} yol, 1.140 gerçek anchor href'i (60 marka sayfası × 19 bölge) ile Cevat Şakir bölge sayfasında görülen 36 gerçek marka href'inin birleşimidir. Kanıt sütununda kaynağın anchor'ı bulunduğu HTML sayfası yer alır. Sütun sırası bölge, marka, kanıt sayfası, referans hedefi, Dost Teknik eşlemesidir. Kalıptan yeni kombinasyon çıkarılmamıştır.\n\n| Bölge | Marka | Kanıt sayfası | Referans URL | Dost Teknik URL |\n| --- | --- | --- | --- | --- |\n${rows}\n`;
await writeFile(file, md);
console.log(`Reference map updated with ${brandRegionPairs.length} href-verified brand/region URLs.`);
