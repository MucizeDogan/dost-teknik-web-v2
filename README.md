# Dost Teknik web sitesi

Turgutreis merkezli Dost Teknik için Türkçe, statik ve GitHub Pages uyumlu klima/beyaz eşya servis sitesi. URL kapsamı erişilebilir referans HTML bağlantılarından çıkarılmıştır; özgün metin ve tasarım kullanır.

## Gereksinimler ve çalıştırma

- Node.js 20+
- Ek runtime bağımlılığı yok

```powershell
npm install
npm run build
npm run audit
npm run audit:content
```

Üretim dosyaları `dist/` altına yazılır. GitHub Pages için `dist` içeriğini site köküne dağıtın. Build her çalıştığında `dist` baştan oluşturulur.

`npm run audit` generated HTML, metadata, canonical, JSON-LD, local links/assets, sitemap, robots, 404 ve temsilî URL örneklerini kontrol eder. `npm run audit:content` her sayfa ailesinde normalize içerik imzaları, kelime sayısı, title/description tekrarları, H2 tekrarları ve iç link erişilebilirliğini raporlar. `npm run audit:http` önizleme server'ı açıkken temsili route'ları, asset'leri ve bilinmeyen route'un 404 durumunu HTTP ile doğrular.

Arayüz mobil önceliklidir; mobilde sabit Ara ve WhatsApp aksiyonları bulunur. Navigasyon dar/tablet ekranlarda klavyeyle erişilebilir drawer olarak açılır. Sayfa URL'leri ve self-canonical yapısı korunmuştur.

### Yerel geliştirme ve root-relative routing

Production URL'leri `/hizmetler/` gibi kökten başlar; bunları relative URL'ye çevirmeyin. VS Code'da **Live Server** kullanırken workspace kökünde `Go Live` deyin: [`.vscode/settings.json`](.vscode/settings.json) Live Server document root'unu `dist/` olarak ayarlar. Önce `npm run build` çalışmış olmalı. Bu ayar sayesinde `/hizmetler/`, `/bolgeler/` ve diğer clean routes doğru HTML dosyasına gider.

Live Server uzantısı olmadan yerel önizleme:

```powershell
npm run preview
```

Bu komut önce build alır ve `http://127.0.0.1:4173` adresinde `dist/` içeriğini gerçek directory/index + `.html` yollarıyla sunar. Ayrı bir terminalde örnek route kontrolü `npm run audit:http` ile yapılabilir (önizleme sunucusunun çalışıyor olması gerekir).

## Config

Merkezi işletme ve SEO ayarları `scripts/data.mjs` içindeki `site` nesnesindedir: site adı, telefon, adres, saat, Instagram kullanıcı adı, alan adı, Analytics, harita, Google Business Profile ve koordinat alanları.

`site.siteUrl` şimdilik `https://example.com` placeholder değeridir. Yayına almadan önce gerçek HTTPS alan adınızla değiştirin. Build sırasında ortam değişkeni de kullanabilirsiniz:

```powershell
$env:SITE_URL = 'https://gercek-alan-adiniz.com'
npm run build
```

Gerçek alan adı; canonical, sitemap, robots, Open Graph ve LocalBusiness schema'ya yansır.

## Görseller

`assets/images/` içinde verilen üç orijinal JPEG korunur. `scripts/optimize-images.py` ile oluşturulan WebP türevleri sayfalarda kullanılır. Görsel dönüşümünü tekrarlamak için Python ve Pillow gerekir; normal build Python kullanmaz.

## Yeni sayfa ekleme

- **Hizmet:** `services` listesine ad, slug ve özgün açıklama ekleyin.
- **Bölge:** `regions` listesine ad ve kaynak URL slug'ı ekleyin.
- **Marka:** `brands` listesine adı ekleyin; marka slug'ı Türkçe harflerden normalleştirilir.
- **Rehber:** `guides` listesine başlık, slug ve özgün özet ekleyin.
- **Marka×bölge:** `brandRegionPairs` yalnızca referans HTML'de tam href'i görülmüş kombinasyonları içerir. URL şablonundan yeni eşleşme varsaymayın.

Generator `scripts/build.mjs` sayfa şablonları, metadata, JSON-LD, sitemap ve robots dosyalarını üretir. Stil `assets/site.css`, menü davranışı `assets/site.js` içindedir.

Hizmet↔rehber ve rehber↔rehber ilişkileri `serviceDetails` / `guideDetails` mapping'lerinde tutulur. Marka×bölge sayfaları yalnızca `brandRegionPairs` veri kümesindeki kaynakla doğrulanmış eşleşmelerden oluşturulur. İçerik-benzerliği ölçüm yöntemi, sonuçlar ve kalan programmatic similarity riski [CONTENT-QUALITY-AUDIT.md](CONTENT-QUALITY-AUDIT.md) dosyasındadır. Yayına çıkıştan önce [FINAL-PRELAUNCH-CHECKLIST.md](FINAL-PRELAUNCH-CHECKLIST.md) maddelerini tamamlayın.

## Google Maps / Google Business Profile Setup

Maps ve profil değerleri `scripts/data.mjs` içindeki `site` config'inde tek yerde tutulur: `mapsUrl`, `businessProfileUrl`, `placeId`, `latitude`, `longitude`, `mapsEmbedApiKey`. Şu an bu alanlar boştur; boşken iframe, Haritada Görüntüle ve profil CTA'sı üretilmez. İletişim sayfasındaki **Yol Tarifi Al** bağlantısı doğrulanmış işletme adresinden oluşturulur; gerçek Place ID eklendiğinde `destination_place_id` de kullanır.

Yayın hazırlığı:

1. Gerçek domaini alın, siteyi deploy edin ve HTTPS'i doğrulayın.
2. Google Business Profile oluşturup işletme doğrulamasını tamamlayın; bu site kodu profil oluşturmaz.
3. Google Maps'te gerçek işletme konumunu kontrol edin; doğrudan harita URL'sini, mümkünse Place ID'yi ve doğru koordinatları alın.
4. Google Cloud'da **Maps Embed API**'yi etkinleştirip API key oluşturun. Key'i HTTP referrer ile production alan adınıza kısıtlayın ve yalnızca gerekli API kullanımına izin verin. Embed API key'i tarayıcıdaki iframe URL'sinde görünür; referrer restriction uygulayın.
5. `scripts/data.mjs` içindeki diğer doğrulanmış Maps alanlarını doldurun. Embed key'i repoya commit etmeyin; build ortamında `MAPS_EMBED_API_KEY` environment secret olarak verin. Lokal deneme için `site.mapsEmbedApiKey` alanını kullanabilirsiniz, ancak gerçek anahtarı kaynak kontrolüne eklemeyin.
6. `npm run build`, `npm run audit`, `npm run audit:content` ve önizleme açıkken `npm run audit:http` çalıştırın; sonra deploy edin.

Maps Embed API key varsa iletişim sayfası Place ID'yi, yoksa doğrulanmış koordinat/adresi kullanarak lazy iframe üretir. Gerçek `mapsUrl`, Place ID veya koordinat varsa **Haritada Görüntüle**; gerçek profil URL'si varsa **Google’da Görüntüle** gösterilir. Schema `geo` yalnızca geçerli iki koordinatla, `hasMap` ise yalnızca gerçek `mapsUrl` ile eklenir. Yorum alanı varsayılan olarak bulunmaz; yalnızca gerçek ve yayımlama izni alınmış değerlendirmeler ekleyin. Sahte puan/yorum schema'sı kullanılmaz.

Kurulum adımları için [SEO-SETUP.md](SEO-SETUP.md), URL dökümü için [SEO-PAGE-INVENTORY.md](SEO-PAGE-INVENTORY.md) ve karşılaştırma için [REFERENCE-COMPARISON.md](REFERENCE-COMPARISON.md) dosyalarına bakın.
