# Dost Teknik — final kalite ve yayın öncesi denetimi

Tarih: 2026-10-01
Kapsam: var olan static generator üzerinde tasarım, içerik, SEO, dönüşüm ve QA iyileştirmeleri. URL mimarisi ve sayfa kapsamı korundu; production deploy edilmedi.

## 1. Executive summary

Mevcut proje sıfırdan yazılmadı. 1.318 indekslenebilir URL ve 1.176 kaynakla doğrulanmış marka×bölge eşleşmesi korunurken hizmet ve rehber içerikleri merkezi olarak ilişkilendirildi; landing page, rehber, dizin, iletişim ve marka/bölge deneyimi güçlendirildi. Tam statik, içerik-benzerliği, HTTP routing ve tarayıcı responsive kontrolleri tamamlandı. Sonuçların sınırları ve benzerlik riski [CONTENT-QUALITY-AUDIT.md](CONTENT-QUALITY-AUDIT.md) içinde ölçümleriyle yer alır.

## 2. SEO hardening

- **Teknik SEO:** tüm 1.318 indexable HTML sayfasında title, meta description, bir H1, unique self-canonical, sosyal paylaşım metadata, breadcrumb ve geçerli JSON-LD kontrol edildi.
- **Local SEO:** NAP, saat, Instagram kullanıcı adı, alan adı, harita/profil/koordinat alanları merkezi `site` config'inden gelir. LocalBusiness adresi merkezi adres parçalarına bağlıdır. Saatlere gün eklenmedi; haftalık kapsam işletme tarafından teyit edilmelidir.
- **Programmatic SEO:** mevcut hizmet, bölge, marka ve marka×bölge URL kalıpları değişmedi. Marka×bölge sayfalarına servis talebi hazırlık listesi, süreç, kategori seçimi, rehber ve sayfa bağlantıları, bağlamsal WhatsApp mesajı eklendi. Kaynak eşleşme sayısı değişmedi.
- **Title/meta:** 1.318 benzersiz title ve description. Title 30–65, description 82–164 karakter.
- **Schema:** JSON-LD parse kontrolü hatasız. Hizmet detaylarında `Service`; işletme ve breadcrumb verileri merkezî config'ten. Marka×bölge sayfalarındaki generic FAQ structured data çıkarıldı. Yorum, rating, yetkili servis, açılış günü veya koordinat uydurulmadı.
- **Sitemap/robots:** sitemap 1.318 canonical URL; 404 sitemap dışı ve `noindex,follow`. robots sitemap host'u ile eşleşiyor ve root'u engellemiyor. `https://example.com` placeholder olduğundan production canonical/sitemap henüz kullanıma hazır değildir.

## 3. Content quality

- **Hizmetler (15):** konuya özgü belirtiler, talep öncesi bilgi, ilişkilendirilmiş rehberler, hizmet bağlantıları ve farklı SSS'ler. Normalize edilmiş gövde imzaları 15/15 farklı.
- **Bölgeler (35):** kapsam, kullanıcı hazırlığı, yakın/diğer sayfalar ve talep akışı geliştirildi; hatalı otomatik Türkçe lokatif ek kullanımı kaldırıldı. Normalize gövde imzası 3 grup; template benzerliği sürüyor.
- **Markalar (60):** alfabetik/aranabilir marka directory ve daha kapsamlı marka landing page'leri. Doğrulanmış cihaz yetkinliği yok; bu nedenle generic servis kapsamı ve bağımsız servis açıklaması kullanılır. Normalize gövde imzası 1 grup; marka sayfaları anlamlı ölçüde benzersiz değildir.
- **Marka×bölge (1.176):** kullanıcı niyetini destekleyen talep listesi, süreç, servis kategorileri, kılavuzlar, dahili linkler ve prefilling. 1.140 sayfa aynı normalize imza; 36 sayfa kaynak eşleşme kökeni ifadesiyle ikinci imza. Bu yüksek programmatic similarity riski açıkça korunmuştur; ad/spinning ile saklanmamıştır.
- **Rehberler (25):** 25 farklı normalize imza, konuya göre kısa yanıt, güvenli kontrol, servis çağırma eşiği ve ilişkilendirilmiş hizmet/rehber bağlantısı.
- Önce/sonra word count, repeated block, thin page ve normalizasyon metodolojisi ayrıntısı [CONTENT-QUALITY-AUDIT.md](CONTENT-QUALITY-AUDIT.md) içinde. İki kısa dizin (`/bolgeler/`, `/markalar/`) navigasyon amaçlıdır; 180 kelime eşiği altında başka sayfa yoktur.

## 4. Design / UX

- **Homepage:** mevcut bölümler korunup koyu/aydınlık section ritmi, servis özeti, gerçek işletme fotoğrafı, işletme anlatımı, süreç, marka/bölge, rehber, SSS ve CTA bileşimi güçlendirildi.
- **Dizinler:** klima/beyaz eşya hizmet grupları, öne çıkan Turgutreis ile tam bölge listesi, alfabetik 60 marka ve marka filtresi, rehber kategorileri.
- **İç şablonlar:** hizmet/rehber detayları konuya özgü içerik ve bağlamsal bağlantı; region/brand landing page'lerinde güvenli NAP ve kapsam dili.
- **Mobile/desktop:** 320, 360, 375, 390, 414, 430, 768, 1024, 1280, 1366, 1440 ve 1920 CSS piksel genişliklerinde ana sayfa, hizmet dizini/detayı, bölge detayı, marka detayı, marka×bölge, rehber, hakkında, iletişim ve 404 için overflow kontrolü yapıldı; yatay taşma görülmedi. Mobil drawer ve Escape ile kapanma, marka filtresi ve 60 linkin DOM'da kalması kontrol edildi.
- **Icons/imagery:** emoji olmayan inline SVG; üç orijinal fotoğraf dosyası repo'da korundu, sayfa çıktılarında WebP kullanılır. Hero crop konumlandırması düzenlendi; kaynak fotoğrafın tabelası gerçek işletme görünümünün parçasıdır ve görsel değiştirilmedi.

## 5. Conversion

- `tel:` ve WhatsApp eylemleri merkezî telefon numarasına bağlıdır.
- Hizmet, bölge, marka, rehber ve iletişim sayfalarındaki WhatsApp CTA'ları sayfa bağlamına göre taslak mesajla açılır.
- Mobil sabit CTA'da Ara + WhatsApp; desktop header'da görünür iletişim CTA'ları.
- İletişim sayfasında telefon, WhatsApp, adres, çalışma saati, hazırlık listesi ve görüşme akışı bulunur.
- Tarayıcıda bağlantı hedefleri doğrulandı; dışarıya arama yapılmadı ve WhatsApp mesajı gönderilmedi. Gerçek cihazda prelaunch kontrolü gerekir.

## 6. Internal linking

- Ana/dizin hub'ları, hizmet↔rehber ve rehber↔rehber bağlantıları merkezî mapping'lerle oluşturulur. Marka/bölge/ilişkili sayfalar konuya göre bağlanır.
- Content graph: 1.318/1.318 sayfa erişilebilir, orphan 0, maksimum crawl derinliği 3, ana içerikte linki olmayan sayfa 0, 100'den çok ana içerik linki olan sayfa 0, sayfa başına tepe 82.
- Eşleşme olmayan tahmini marka×bölge URL'leri eklenmedi; yalnızca tanımlı/verilmiş URL eşleşmeleri korunur.

## 7. Performance

- Üretim görselleri WebP, boyut ve `alt` nitelikleri tanımlı; ana hero öncelikli, ikincil fotoğraflar lazy-load.
- Harici font veya runtime UI framework yüklemesi yok; analytics ID boşsa analytics yüklenmez.
- Lighthouse/PageSpeed, gerçek cihaz CPU/network ve Core Web Vitals ölçümü alınmadı; skor veya hız iddiası yoktur.

## 8. Accessibility

- Skip link, semantik heading, alt metin, menü disclosure durumu, klavye ile drawer aç/kapatma, Escape ve aramaya `aria-live` durum metni doğrulandı.
- Static audit tüm img'lerde alt metin ve her sayfada tek H1 kontrol etti.
- Tam WCAG audit veya ekran okuyucu testi yapılmadı; prod öncesi gerçek cihaz/AT kontrolü önerilen checklist'te yer alır.

## 9. Build results

- `npm install`: başarılı, 0 güvenlik açığı raporlandı; ek runtime dependency yok.
- `npm run build`: başarılı, 1.318 indexlenebilir URL; 1.176 marka×bölge.

## 10. Audit results

- `npm run audit`: tüm HTML, metadata, canonical, sitemap, robots, 404, JSON-LD, local link ve asset kontrolleri; ayrıca 5 hizmet, 10 bölge, 10 marka, 30 marka×bölge ve 10 rehber URL örneklemi.
- `npm run audit:content`: tüm HTML sayfaları, imza grupları, kelime, başlık, tekrar ve internal link graph denetimi.
- `npm run audit:http`: aynı deterministik sayfa ailesi örneklemi HTTP üzerinden; 5 statik asset ve bilinmeyen route 404 kontrolü.
- Son çalıştırmanın gerçek sayaçları sonuç mesajına ve bu dosyaya eklendi; testler build'den sonra tekrar alınmıştır.

## 11. Page count

**1.318 indexlenebilir HTML/sitemap URL**: 15 hizmet, 35 bölge, 60 marka, 25 rehber, 1.176 kaynakla doğrulanmış marka×bölge ve ana/dizin/kurumsal sayfalar. `404.html` bu sayıya ve sitemap'e dahil değildir. Sayfa sayısı ve source eşleşmeleri değişmedi.

## 12. Files changed

- Generator/data: `scripts/data.mjs`, `scripts/build.mjs`
- QA: `scripts/audit-build.mjs`, `scripts/audit-http.mjs`, yeni `scripts/audit-content.mjs`, `package.json`
- UI: `assets/site.css`, `assets/site.js`, `dist/` generated output
- Docs: `README.md`, `SEO-SETUP.md`, `FINAL-AUDIT.md`, yeni `CONTENT-QUALITY-AUDIT.md`, yeni `FINAL-PRELAUNCH-CHECKLIST.md`
- Dev routing: `.vscode/settings.json`
- Görsel asıllar korunmuştur; dağıtım çıktısında WebP varyantları kullanılır.

## 13. Prelaunch items

Gerçek domain/canonical/sitemap/robots, Search Console, Google Business Profile/Maps/koordinat, Instagram profil URL'si, haftanın günlerini içeren çalışma saati teyidi, gerçek telefon/WhatsApp cihaz testi, prod 404, gerçek telefon UX, favicon/OG paylaşım testi ve istenirse analytics henüz işletme/yayın ortamında doğrulanmadı. Ayrıntılı kontrol kutuları [FINAL-PRELAUNCH-CHECKLIST.md](FINAL-PRELAUNCH-CHECKLIST.md) içindedir.

## 14. Known limitations

- `https://example.com` bilerek placeholder olarak kalır; production'a bu haliyle dağıtmayın.
- Marka sayfaları 60 farklı metinsel içerik sunmuyor; doğrulanmış cihaz/servis yetkinliği verisi yok. Marka×bölge grubunda 1.140/1.176 sayfa aynı normalize metin imzasını taşıyor. İkinci gruba düşen 36 sayfanın farkı kaynak eşleşme provenans ifadesidir. Bu ciddi kalite fırsatı işletme verisi gerektirir.
- Çalışma saati aralığının haftanın hangi günlerini kapsadığı, Maps/GBP URL'si, koordinat ve Instagram profili kaynağı verilmediğinden uydurulmadı.
- Rakip sayfalar yalnızca açık web'de UX/içerik kategorilerini benchmark etmek için incelendi; rakip iddiaları veya içerikleri kopyalanmadı.
- Production deploy, gerçek cihaz, Lighthouse/Core Web Vitals, Search Console ve gerçek WhatsApp/telefon görüşmesi yapılmadı.
