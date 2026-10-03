# SEO ve Üretim Kurulumu

## 1. Gerçek alan adını ayarlayın

`scripts/data.mjs` içindeki `site.siteUrl` değerini gerçek, HTTPS alan adınızla değiştirin. Şu an `https://example.com` örnek placeholder'dır. Bu ayar canonical, sitemap, robots, Open Graph ve LocalBusiness schema URL'lerini üretir. Alternatif olarak build sırasında `SITE_URL=https://gercek-domaininiz` ortam değişkeni sağlayın.

## 2. Build ve GitHub Pages

Node.js 20 veya üstü gerekir. `npm install` ek bağımlılık indirmez; proje build'i Node standart modüllerini kullanır.

```powershell
npm install
npm run build
```

GitHub deposunda Pages kaynağını GitHub Actions veya `dist` dağıtımını alacak workflow olarak ayarlayın. `dist/.nojekyll` oluşturulur; site kök dizinine göre `/assets` ve SEO yolları kullanır. Özel alan adını GitHub Pages ayarlarına ekleyin ve HTTPS'i etkinleştirin.

## 3. Search Console

1. Üretim URL öneki veya alan adı mülkünü doğrulayın.
2. `https://GERCEK-ALAN-ADI/sitemap.xml` sitemap'ini gönderin.
3. URL Denetleme aracıyla ana sayfa, bir hizmet, bölge, marka ve marka×bölge sayfasını kontrol edin.
4. Canlı URL testinde canonical, robots erişimi, mobil görünüm ve yapılandırılmış veriyi kontrol edin.

Sitemap 1.318 indekslenebilir URL içerir; `404.html` listeye dahil değildir.

## 4. Google Maps / Google Business Profile

`scripts/data.mjs` içindeki `site` nesnesinde aşağıdaki tek-merkez alanlar başlangıçta boştur; gerçek işletme konumu/profili doğrulanana kadar boş bırakın:

```js
mapsUrl: '',
businessProfileUrl: '',
placeId: '',
latitude: '',
longitude: '',
mapsEmbedApiKey: ''
```

Google Business Profile oluşturma/doğrulama işlemi Google tarafında yapılır; generator profil veya Place ID oluşturmaz. Profildeki ad, telefon, adres ve saatleri aşağıdaki değerlerle tutarlı hale getirin:

- İşletme: Dost Teknik
- Telefon: +90 534 889 51 48
- Adres: Akçaalan Mahallesi Zübeyde Hanım Caddesi No:30/2, Bodrum/Muğla
- Saat: 09:00–20:00 (gün kapsamını işletme teyit etmelidir)

Gerçek hizmet yarıçapını profil alan ayarlarında işletme durumuna uygun biçimde belirtin; sanal ofis veya gerçekte bulunmayan lokasyon eklemeyin.

Kurulum sırası: gerçek domaini satın alıp HTTPS ile deploy edin; Business Profile oluşturup doğrulayın; Maps'te konumu teyit edip işletmenin gerçek Maps URL'sini, mümkünse Place ID'sini ve koordinatlarını alın; Google Cloud'da Maps Embed API'yi etkinleştirin ve API key üretin. API key'i HTTP referrer ile production domainine kısıtlayın, yalnızca gereken API'ye izin verin. Embed API key tarayıcı iframe URL'sinde görünür olduğundan onu gizli bir sunucu anahtarı gibi değerlendirmeyin; referrer restriction zorunludur.

`mapsUrl`, `businessProfileUrl`, `placeId`, `latitude` ve `longitude` değerlerini `site` config'te tutun. API key'i production build'de `MAPS_EMBED_API_KEY` environment secret'ta verin; `site.mapsEmbedApiKey` local fallback olarak boş kalabilir. Gerçek key'i README'ye, başka belgelere veya git geçmişine commit etmeyin. CI/CD'de GitHub Actions secret gibi güvenli bir build secret kullanın.

Maps URL doluysa (veya Place ID/koordinatlarla Maps arama adresi üretilebiliyorsa) İletişim'de **Haritada Görüntüle** gösterilir; profile URL varsa **Google’da Görüntüle** gösterilir. **Yol Tarifi Al** doğrulanmış merkezi adresle oluşturulur ve Place ID girildiyse `destination_place_id` eklenir. API key olduğunda yalnızca İletişim sayfasında `loading="lazy"` Maps Embed iframe üretilir (Place ID öncelikli, sonra koordinat/adres). Schema `hasMap` değerini gerçek `mapsUrl`'den, `geo` değerlerini yalnızca doğrulanmış geçerli koordinatlardan alır.

## 5. Analytics ve sosyal hesap

`site.analyticsId` boş olduğu sürece analytics kodu eklenmez. Kullanılacaksa izin/yasal bilgilendirme yükümlülüklerini tamamlayın ve doğrulanmış ID girin. Instagram bağlantısı `https://www.instagram.com/teknik.dost/` profilini açar; ekranda kısa `Instagram · @teknik.dost` metni görünür.

## 6. İçerik bakımı

- Yeni hizmet/bölge/marka/rehber eklerken `scripts/data.mjs` listesini güncelleyin.
- Marka×bölge sayfası eklemek için gerçek kaynak HTML anchor'ını kaydedin ve yalnızca o href eşleşmesini `brandRegionPairs` kaynağına dahil edin; yalnızca URL örüntüsünden kombinasyon üretmeyin.
- Yeni müşteri yorumu ancak gerçek izinli yorum olarak doğrulandıktan sonra yayımlansın; varsayılan olarak değerlendirme puanı veya yorum schema'sı yoktur.
- Build'i tekrar çalıştırarak `dist` klasörünü yeniden üretin.

## 7. Son kalite kontrolleri

```powershell
npm run build
npm run audit
npm run audit:content
npm run preview
```

`npm run audit` tüm üretilen sayfalardaki metadata, canonical, JSON-LD, yerel bağlantı/asset, sitemap, robots ve 5 hizmet / 10 bölge / 10 marka / 30 marka×bölge / 10 rehber örnek URL'yi denetler. Önizleme açıkken ikinci terminalde `npm run audit:http` ile aynı örneklem HTTP'den doğrulanır. `npm run audit:content` aile bazlı normalize içerik benzerliğini, kelime sayısını, tekrarlanan başlıkları ve orphan/internal-link grafiğini verir. Bulgular [CONTENT-QUALITY-AUDIT.md](CONTENT-QUALITY-AUDIT.md) ve [FINAL-AUDIT.md](FINAL-AUDIT.md) dosyalarındadır.

Yayın adımlarını [FINAL-PRELAUNCH-CHECKLIST.md](FINAL-PRELAUNCH-CHECKLIST.md) üzerinden tamamlayın. Yerel build başarılı olsa bile gerçek alan adı ve Google Business Profile bilgileri teyit edilmeden üretime çıkmayın.
