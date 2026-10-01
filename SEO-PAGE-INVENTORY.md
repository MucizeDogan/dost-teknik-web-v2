# SEO Sayfa Envanteri

Build çıktısı: `npm run build` → `dist/`. İndekslenebilir sayfalar kendi canonical'ına, title/meta description'a, H1'e, Open Graph alanlarına ve breadcrumb JSON-LD'sine sahiptir. Her sayfada işletme JSON-LD'si bulunur. Hizmet detaylarında ayrıca `Service` JSON-LD'si bulunur.

| Sayfa ailesi | URL biçimi | Adet | Navigasyon / içerik ilişkisi |
| --- | --- | ---: | --- |
| Ana sayfa | `/` | 1 | Hizmet, bölge, marka, rehber ve kurumsal sayfalara giriş |
| Dizinler | `/hizmetler/`, `/bolgeler/`, `/markalar/`, `/bilgi-merkezi/` | 4 | Her dizin kendi detay sayfalarına link verir |
| Hizmet | `/hizmetler/{slug}.html` | 15 | İlgili hizmetler, bölgeler, arama/WhatsApp CTA |
| Bölge | `/bolgeler/{slug}-klima-servisi.html` | 35 | Hizmetler, diğer bölgeler, href'i doğrulanmış marka×bölge alt sayfaları |
| Marka | `/markalar/{slug}-servisi.html` | 60 | Hizmet türleri ve kaynak sayfada linki görülen 19 bölge |
| Rehber | `/bilgi-merkezi/{slug}.html` | 25 | İlgili hizmetler ve diğer rehberler |
| Kurumsal | `/hakkimizda.html`, `/iletisim.html` | 2 | NAP, çalışma saati ve gerçek işletme fotoğrafları |
| Marka × bölge | `/servis/{region}/{brand}-servisi.html` | 1.176 | 1.140 marka sayfası kaynaklı + 36 Cevat Şakir bölge sayfası kaynaklı gerçek href |
| **İndekslenebilir toplam** |  | **1.318** | 404 sayfası ve statik varlıklar hariç |

## Sayfa aileleri

Tam URL başlık ve eşleme dökümü için [REFERENCE-SEO-MAP.md](REFERENCE-SEO-MAP.md) içindeki hizmet, bölge, marka, rehber ve 1.176 satırlık marka×bölge tablosuna bakın. Kapsam karşılaştırması [REFERENCE-COMPARISON.md](REFERENCE-COMPARISON.md) dosyasındadır.

## Internal linking

- Header ve footer tüm sayfalardan ana dizinlere ve iletişime bağlantı verir.
- Breadcrumb ana sayfa → dizin → detay düzeyini gösterir.
- Her hizmet sayfası ilgili hizmetlere ve bölge sayfalarına bağlanır.
- Her bölge sayfası hizmet kapsamına ve diğer bölgelere bağlanır; Cevat Şakir kaynak sayfasından doğrulanan marka×bölge detaylarına da bağlantı verir.
- Her marka sayfası 19 gerçek bölge bağlantısına gider.
- Marka×bölge sayfaları hizmet sayfalarına ve marka kaynak sayfasında gerçek bağlantısı görülen diğer bölgelere bağlanır.
- Her rehber, ilgili hizmetlere ve diğer rehberlere bağlanır.

## Teknik kapsam

- Tek H1, benzersiz sayfa title'ı ve description.
- Self canonical ve Open Graph title/description/url/image.
- JSON-LD: `HVACBusiness`, `BreadcrumbList`; hizmet sayfalarında `Service`.
- `/sitemap.xml`, `/robots.txt`, `/404.html`, `.nojekyll`.
- Mobil menü, skip link, anlamlı alt metin, telefon ve WhatsApp bağlantıları.

Not: `SITE_URL` üretim alan adı henüz paylaşılmadığından `https://example.com` geliştirme placeholder'ıdır. Google Search Console'a yüklemeden önce gerçek alan adı ayarlanmalıdır.
