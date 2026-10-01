# Dost Teknik içerik kalite denetimi

Tarih: 2026-10-01  
Kapsam: generator çıktısındaki 1.318 indexlenebilir HTML sayfası

## Yöntem ve sınırlar

`npm run audit:content`, her sayfanın `<main>` metnini HTML etiketlerinden arındırıp kelime sayısını çıkarır. Marka, bölge, hizmet ve rehber adlarını sırasıyla `{BRAND}`, `{REGION}`, `{SERVICE}`, `{GUIDE}` ile normalize eder; Türkçe karakter farklarını sadeleştirerek tam metin imzalarını ve tekrarlanan H2 başlıklarını sayar. Bu ölçüm metin şablonlarının tekrarını görünür kılar; semantik benzerlik modeli veya arama motoru değerlendirmesi değildir. Eş anlamlı paraphrase'leri tespit edemez.

## Sayısal karşılaştırma

| Sayfa ailesi | Sayfa | Önce: normalize imza farklı / tekrar eden | Sonra: imza farklı / tekrar eden | Sonra medyan kelime | Sonra <180 kelime |
|---|---:|---:|---:|---:|---:|
| Ana sayfa | 1 | 1 / 0 | 1 / 0 | 549 | 0 |
| Dizinler | 4 | 4 / 0 | 4 / 0 | 289 | 2 |
| Hizmet detayları | 15 | 15 / 0 | 15 / 0 | 332 | 0 |
| Bölge detayları | 35 | 3 / 32 | 3 / 32 | 614 | 0 |
| Marka detayları | 60 | 1 / 59 | 1 / 59 | 398 | 0 |
| Marka × bölge | 1.176 | 1 / 1.175 | 2 / 1.174 | 350 | 0 |
| Rehber detayları | 25 | 25 / 0 | 25 / 0 | 277 | 0 |
| Hakkımızda | 1 | 1 / 0 | 1 / 0 | 309 | 0 |
| İletişim | 1 | 1 / 0 | 1 / 0 | 185 | 0 |

Önceki median değerler: dizinler 274, hizmet 389, bölge 533, marka 340, marka×bölge 340, rehber 271, hakkımızda 183, iletişim 126 kelime. Önce ve sonra karşılaştırması aynı normalizasyon ve metin çıkarım koduyla alındı. Önceki benzersiz title ve description tekrar sayısı sıfırdı; son durumda da sıfırdır. Son title uzunlukları 30–65, description uzunlukları 82–164 karakter aralığındadır.

### Sonuçların yorumu

- Dizinlerde 180 kelimenin altındaki iki sayfa, arama/gezinti bağlantılarını sunan **marka** ve **bölge dizinleridir**. İçerik bakımından ana gövde metni kısa görünse de bağlantı listeleri kendi amacını karşılar; bunlar servis landing page'i değildir.
- 35 bölge sayfası normalize metinde üç gövde imzası taşır. Bölgesel sayfa metinleri kapsamı, hazırlanacak bilgileri, ilgili bağlantıları ve iletişim yolunu anlatır. Bölgeye özgü olmayan mesafe, ulaşım süresi, ekip veya aynı gün servis iddiası eklenmedi.
- 60 marka sayfası, doğrulanmış marka-ürün yetkinliği verisi bulunmadığı için aynı güvenli genel bilgi mimarisini kullanır. Her marka sayfası birbirinden içerik olarak belirgin ölçüde ayrışmıyor; doğrulanmamış cihaz desteği yazmamak doğru sınırdır. Gerçek cihaz/servis matrisi sağlanırsa bu sayfalar o veriyle ayrıştırılabilir.
- 1.176 marka×bölge sayfasının **1.140'ı bir normalize gövde imzasını**, kalan 36'sı kaynak eşleşmesinin bölge sayfasından gelmesini belirten farklı provenans metni içeren ikinci imzayı paylaşır. Bu çok yüksek şablon benzerliği olarak açık bir SEO riski olmaya devam eder. Her sayfaya marka/bölge adlarından ibaret yapay varyasyon eklemek yerine faydalı servis öncesi kontrol listesi, dört adımlı süreç, kategori seçimi, kılavuz ve marka/bölge bağlantıları, bağlamsal WhatsApp mesajı sunulur. Bu bileşenler benzer kullanıcı ihtiyacını karşılar; iki imza ölçümündeki sonucu “unique content” diye sunmuyoruz.
- Marka×bölge sayfalarında generic FAQPage structured data kaldırıldı; başlık tekrarları azaltıldı. Son durumda tekrar eden en sık gövde H2'leri altı eşleşme başlığında 1.176 kez görünür. Bu ortak süreç/listeler bilerek ortak bileşendir; varlıkları metin benzerliği riskini ortadan kaldırmaz.
- Önceden İletişim sayfası 126 kelimeydi; adres, saat, doğrudan kanallar, servis öncesi bilgi ve süreç içeriğiyle 185'e çıktı. Hakkımızda 183'ten 309'a, bölge medianı 533'ten 614'e çıktı. İçerik eklerken yalnızca merkezi kaynakta bulunan gerçek işletme bilgileri kullanıldı.

## İçerik ve ilişkilendirme değişiklikleri

- 15 hizmet için merkezi `serviceDetails`: farklılaştırılmış belirti/kullanıcı senaryoları, servis öncesi bilgi, ilgili rehberler, hizmet ilişkileri ve konuya özel SSS.
- 25 rehber için merkezi `guideDetails`: konu kategorisi, kısa yanıt, güvenli kullanıcı gözlemleri, servis eşiği, paylaşılacak bilgiler, ilgili hizmet ve rehber bağlantıları. Elektrik/soğutucu gaz sistemlerini açmaya veya müdahaleye yönlendirme yoktur.
- Hizmet↔rehber ve rehber↔rehber bağlantıları merkezi eşleştirmelerden üretilir. Sayfa grafiğinde 1.318/1.318 sayfa erişilebilir; orphan 0, en uzun ana sayfadan iç link derinliği 3. Ana içerikte en fazla 82 bağlantı bulunur.
- Marka dizininde 60 marka alfabetik HTML bağlantısı olarak kalır; tarayıcı filtresi JS çalıştığında yalnızca görünürlüğü değiştirir. JavaScript kapalıyken hepsi görünür.
- Bölge metinleri dil bilgisi açısından güvenli “bölgesinde” kullanımına geçirildi. Hatalı otomatik `-da/-de` eki üretilmez.

## Rakip gözlemi ve kopyalamama

1 Ekim 2026 tarihinde açık web sayfaları üzerinden rakip bilgi mimarisi incelendi. [Bodrum Beyaz Eşya](https://bodrumbeyazesya.com/) hizmet/proses ve talep formu kurgusu, [Bodrum Teknik Servisi](https://bodrumteknikservisi.com.tr/) görünür telefon ve cihaz/hizmet taksonomisi, [Halil Teknik](https://www.halilteknik.com/) ise cihaz bazlı konu/SSS kapsamı için benchmark oldu. Bu sitelerdeki iddia, metin ve görseller kopyalanmadı; doğrulanamayan hız/garanti gibi iddialar Dost Teknik metnine taşınmadı.

## Kalan fırsat

Marka ve marka×bölge metnini anlamlı biçimde ayrıştırmanın güvenli yolu daha fazla doğrulanmış işletme verisidir: servis verilebilen cihaz türleri, gerçek bölgesel uygunluk ve yayınlanmasına izin verilen marka/ürün kapsamı. Bu bilgi gelmeden sayfa silinmedi, URL/canonical değiştirilmedi ve yetkinlik iddiası uydurulmadı.
