# Yayına çıkış öncesi kontrol listesi

Durum: yerel build ve audit tamamlandı; üretim yayını yapılmadı. Yayından önce işletme sahibiyle aşağıdakileri doğrulayın.

## Alan adı ve indeksleme

- [ ] `scripts/data.mjs` içindeki `https://example.com` değerini gerçek HTTPS alan adıyla değiştirin.
- [ ] Canonical URL'lerin production alan adını gösterdiğini kontrol edin.
- [ ] `sitemap.xml` URL host'unu ve 1.318 URL sayısını production'da doğrulayın.
- [ ] `robots.txt` içindeki sitemap adresini doğrulayın; production'da site taramasına izin verildiğini kontrol edin.
- [ ] Google Search Console mülkünü doğrulayın ve production sitemap'ini gönderin.
- [ ] Ana sayfa, hizmet, bölge, marka ve marka×bölge URL'lerini Search Console URL Denetleme'de kontrol edin.
- [ ] Gerçek production 404 durum kodunu ve 404 sayfasının sitemap dışında kaldığını kontrol edin.

## Yerel işletme bilgileri

- [ ] Google Business Profile'ın gerçek işletme adına ve doğru kategori/adrese ait olduğunu doğrulayın.
- [ ] Gerçek Google Maps/Business Profile URL'sini merkezi site ayarına ekleyin.
- [ ] Koordinatları yalnızca doğrulanmış işletme konumu üzerinden ekleyin.
- [ ] `https://www.instagram.com/teknik.dost/` hesabının Dost Teknik'e ait olduğunu doğrulayın.
- [ ] Telefon numarasını gerçek cihazda arama başlatmadan kontrol edin; arama bağlantısının doğru numarayı açtığını doğrulayın.
- [ ] WhatsApp bağlantısını cihazda açıp alıcı numarasını ve ön doldurulmuş mesaj bağlamını kontrol edin; mesajı ancak işletme onayından sonra gönderin.
- [ ] Akçaalan Mahallesi Zübeyde Hanım Caddesi No:30/2, Bodrum/Muğla adresini doğrulayın.
- [ ] `09:00–20:00` saat aralığının geçerli olduğunu ve haftanın hangi günlerini kapsadığını doğrulayın; gün kapsamı mevcut veride belirtilmiyor.
- [ ] Hizmet bölgelerinin gerçekten kabul edildiğini işletme ile teyit edin.

## Arayüz ve operasyon

- [ ] Gerçek telefonda mobil sabit Ara + WhatsApp çubuğunu ve menüyü test edin.
- [ ] 320–430px telefon aralığında kritik sayfalarda metin, CTA ve fotoğraf görünümünü kontrol edin.
- [ ] Üretim 404 sayfasında ana sayfa/hizmet geri dönüşlerini kontrol edin.
- [ ] İsteniyorsa analytics kimliğini ekleyin ve gerekli gizlilik/izin bilgilendirmelerini tamamlayın.
- [ ] Favicon ve uygulama ikonlarını gerçek tarayıcıda kontrol edin.
- [ ] Open Graph görsel önizlemesini gerçek alan adıyla mesajlaşma/sosyal paylaşım önizlemesinde kontrol edin.
- [ ] Son production build sonrası `npm run audit`, `npm run audit:content` ve erişilebilir production'da HTTP route kontrollerini çalıştırın.
- [ ] Production Lighthouse/PageSpeed ve gerçek cihaz performans ölçümünü alın; ölçülmeden skor yayımlamayın.
