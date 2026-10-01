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

## 4. Google Business Profile ve harita

`scripts/data.mjs` içindeki `site` nesnesinde `mapsUrl`, `businessProfileUrl`, `latitude`, `longitude` başlangıçta boştur. Yalnızca doğrulanmış profil/harita URL'si ve koordinatları girin. Google Business Profile'daki ad, telefon, adres ve saatleri aşağıdaki değerlerle tutarlı hale getirin:

- İşletme: Dost Teknik
- Telefon: +90 534 889 51 48
- Adres: Akçaalan Mahallesi Zübeyde Hanım Caddesi No:30/2, Bodrum/Muğla
- Saat: 09:00–20:00 (gün kapsamını işletme teyit etmelidir)

Gerçek hizmet yarıçapını profil alan ayarlarında işletme durumuna uygun biçimde belirtin; sanal ofis veya gerçekte bulunmayan lokasyon eklemeyin.

## 5. Analytics ve sosyal hesap

`site.analyticsId` boş olduğu sürece analytics kodu eklenmez. Kullanılacaksa izin/yasal bilgilendirme yükümlülüklerini tamamlayın ve doğrulanmış ID girin. Instagram için yalnızca `@teknik.dost` metni gösterilir; URL verilmediğinden profil linki uydurulmaz.

## 6. İçerik bakımı

- Yeni hizmet/bölge/marka/rehber eklerken `scripts/data.mjs` listesini güncelleyin.
- Marka×bölge sayfası eklemek için gerçek kaynak HTML anchor'ını kaydedin ve yalnızca o href eşleşmesini `brandRegionPairs` kaynağına dahil edin; yalnızca URL örüntüsünden kombinasyon üretmeyin.
- Yeni müşteri yorumu ancak gerçek izinli yorum olarak doğrulandıktan sonra yayımlansın; varsayılan olarak değerlendirme puanı veya yorum schema'sı yoktur.
- Build'i tekrar çalıştırarak `dist` klasörünü yeniden üretin.
