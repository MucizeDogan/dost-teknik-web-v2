# Referans Site Erişim ve Tarama Notu

Tarih: 2026-10-01  
Kaynak: [turgutreisklimaservisi.com.tr](https://turgutreisklimaservisi.com.tr/)

## Sonuç

Referans sitenin ana sayfası, dört HTML dizini ve erişilebilir detay sayfaları Codex uygulama tarayıcısında açıldı. Ana sayfa 403 döndürdüğü, `robots.txt` ve `sitemap.xml` ise tarayıcıda `ERR_BLOCKED_BY_CLIENT` verdiği için sitemap kapsamı ve robots direktifleri alınamadı. İkinci kullanıcı talimatı sitemap beklemeden erişilebilir HTML bağlantılarından ilerlemeyi istedi; bu nedenle geliştirme tamamlandı.

## Tek tek taranan sayfalar

- 15 hizmet detay sayfası ve `/hizmetler/` dizini.
- 35 bölge detay sayfası ve `/bolgeler/` dizini.
- 60 marka detay sayfası ve `/markalar/` dizini.
- 25 bilgi merkezi rehberi ve `/bilgi-merkezi/` dizini.
- `/hakkimizda.html` ve `/iletisim.html`.
- Marka detay sayfalarının tüm 60 × 19 bölge anchor href'i. Her marka sayfasında görünen 19 gerçek bölge hedefi toplandı (1.140 URL).
- Cevat Şakir bölge sayfasında görünen 36 marka anchor href'i ayrıca kaydedildi. İki yöndeki href'lerin birleşimi 1.176 tekil doğrulanmış marka × bölge URL'sidir.
- Bölge sayfalarının marka bağlantıları incelendi. İslamhaneleri sayfasındaki 36 gerçek marka href'i tıklanarak açıldı; Akçaalan ve Cevat Şakir örneklerinde tam href'ler ayrıca görüldü. Bu ters yöndeki ek bağlantıların hepsi tek tek normalleştirilip matrise dahil edilmedi. Bu nedenle yeni kombinasyonlar URL kalıbından tahmin edilmedi.

## Sayfa başına gözlenenler

HTML arayüzü sayfa başlığı ve görünür H1/H2 yapısını, breadcrumb ve normal anchor bağlantılarını doğrulamaya izin verdi. Ana detay ailelerinde title/H1 örüntüleri, ilgili sayfa aileleri, CTA ve iç bağlantılar incelendi. Tarayıcı erişimi sayfa kaynağı düzeyinde ham meta/canonical/Open Graph/JSON-LD ayrıştırmasını her sayfada güvenilir biçimde göstermedi; bu alanlar referans için doğrulanmış kabul edilmedi. Dost Teknik tarafında bunlar merkezi generator ile üretildi.

## Sitemap erişilemediği için doğrulanamayan olası URL'ler

- HTML dizinlerinde ve açılmış detay sayfalarında bağlantı almayan sayfalar.
- Sitemap index'in gösterebileceği ek sitemap dosyaları veya alternatif URL/canonical varyantları.
- Diğer bölge detay sayfalarından bağlı olabilecek fakat tam href'i toplanamayan ek marka × bölge hedefleri.
- HTML arayüzünde görünmeyen, sayfalama ya da mobil menü gibi durumlara bağlı bağlantılar.

Bu ihtimaller, URL üreterek kapatılmadı. Gerçek referans sitemap'i erişilebilir olursa haritaya ayrıca eklenebilir.

## Kaynak materyal ve sınırlar

Referans metin, görsel ve kodu kopyalanmadı. Yalnızca URL yapısı, sayfa kapsamı ve gözlenen ilişkiler bilgi mimarisi için kullanıldı. Sitemap erişememek artık projenin geliştirilmesini durdurmuyor; ancak sitemap'te olabilecek bağlantısız URL'lerin eksiksiz olduğu iddia edilmiyor.
