# Referans Site Karşılaştırması

Referans: `https://turgutreisklimaservisi.com.tr/`  
Dost Teknik alan adı: kullanıcı tarafından henüz verilmedi (`SITE_URL` placeholder olarak `https://example.com`).

| Referans sayfa ailesi | Dost Teknik karşılığı | Arama amacı | Durum |
| --- | --- | --- | --- |
| `/` | `/` | Turgutreis klima servisi, Bodrum yerel servis | Uygulandı |
| `/hizmetler/` + 15 detay URL'si | Aynı path ailesi ve 15 detay | Klima/beyaz eşya hizmet niyeti | Uygulandı |
| `/bolgeler/` + 35 detay URL'si | Aynı path ailesi ve 35 detay | Bodrum mahallelerinde yerel servis | Uygulandı |
| `/markalar/` + 60 detay URL'si | Aynı path ailesi ve 60 detay | Marka bazlı servis niyeti | Uygulandı |
| `/bilgi-merkezi/` + 25 rehber | Aynı path ailesi ve 25 rehber | Arıza ve bakım bilgilendirmesi | Uygulandı |
| `/hakkimizda.html`, `/iletisim.html` | Aynı path'ler | İşletme ve iletişim | Uygulandı |
| Gerçek marka ↔ bölge href'leri | 1.176 `/servis/{region}/{brand}-servisi.html` sayfası | Belirli marka ve mahallede servis | Uygulandı; yalnızca doğrulanan href'ler |

İçerik, tasarım, kod ve CSS özgün yazıldı. Referans görselleri taşınmadı. Marka “yetkili servis” olarak sunulmaz. Matris, her marka sayfasında görünen 19 bölge bağlantısının (1.140 URL) ve Cevat Şakir bölge sayfasında görünen 36 marka bağlantısının birleşimidir. Sitemap'te olup HTML'de keşfedilemeyen URL'ler bu eşleştirme dışında kalır; ayrıntı [REFERENCE-SITE-ACCESS.md](REFERENCE-SITE-ACCESS.md) içindedir.

Tam satır bazlı kaynak/hedef URL listesi [REFERENCE-SEO-MAP.md](REFERENCE-SEO-MAP.md) dosyasındadır.
