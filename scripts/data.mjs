export const site = {
  name: 'Dost Teknik',
  phone: '+90 534 889 51 48',
  phoneDigits: '905348895148',
  address: 'Akçaalan Mahallesi Zübeyde Hanım Caddesi No:30/2, Bodrum/Muğla',
  hours: '09:00–20:00',
  instagram: '@teknik.dost',
  siteUrl: 'https://example.com',
  mapsUrl: '', businessProfileUrl: '', latitude: '', longitude: '', analyticsId: ''
};

export const services = [
 ['Klima Tamiri','klima-tamiri','Klima arızalarının belirtilerini değerlendirip onarım seçeneklerini açıklıyoruz.'],
 ['Klima Bakımı','klima-bakimi','Mevsim geçişlerinde filtre, drenaj ve çalışma kontrolleriyle klimanızın bakımını planlıyoruz.'],
 ['Klima Montajı & Demontajı','klima-montaji','Klima montajı, sökümü ve yeniden kurulumunda mekâna uygun teknik planlama yapıyoruz.'],
 ['Klima Gaz Kontrolü & Dolumu','klima-gaz-dolumu','Soğutma performansını ve sistem koşullarını kontrol ederek gaz işlemi gereksinimini belirliyoruz.'],
 ['Klima Temizliği','klima-temizligi','İç ünite filtreleri ve erişilebilir bileşenler için cihaz tipine uygun temizlik desteği sağlıyoruz.'],
 ['Klima Elektronik Kart Kontrolü','klima-kart-tamiri','Elektronik kart ve bağlantı kaynaklı çalışma sorunlarını arıza tespitiyle inceliyoruz.'],
 ['VRF / VRV Klima Servisi','vrf-vrv-servisi','VRF ve VRV sistemlerinde çalışma, kontrol ve periyodik bakım ihtiyaçlarını değerlendiriyoruz.'],
 ['Multi Split Klima Servisi','multi-split-klima-servisi','Birden fazla iç üniteli multi split sistemlerde ünite ve bağlantı kontrolleri yapıyoruz.'],
 ['Beyaz Eşya Tamiri','beyaz-esya-tamiri','Ev tipi beyaz eşyalarda arıza tespiti ve onarım için servis desteği sunuyoruz.'],
 ['Buzdolabı Servisi','buzdolabi-servisi','Soğutmama, ses ve çalışma sorunlarında buzdolabı kontrolleri gerçekleştiriyoruz.'],
 ['Çamaşır Makinesi Servisi','camasir-makinesi-servisi','Su alma, boşaltma ve sıkma sorunları için çamaşır makinesi servisi sağlıyoruz.'],
 ['Bulaşık Makinesi Servisi','bulasik-makinesi-servisi','Yıkama, su alma ve tahliye belirtilerini inceleyerek bulaşık makinesi desteği veriyoruz.'],
 ['Kurutma Makinesi Servisi','kurutma-makinesi-servisi','Kurutma performansı ve hava dolaşımıyla ilgili belirtileri kontrol ediyoruz.'],
 ['Derin Dondurucu Servisi','derin-dondurucu-servisi','Soğutma ve çalışma sorunlarında derin dondurucu arıza tespiti yapıyoruz.'],
 ['Ankastre Cihaz Servisi','ankastre-servisi','Mutfak ankastre cihazlarında belirtilere ve cihaz modeline uygun servis desteği sunuyoruz.']
].map(([name,slug,description])=>({name,slug,url:`/hizmetler/${slug}.html`,description}));

export const regions = [
 ['Turgutreis','turgutreis'],['Akçaalan','akcaalan'],['Bahçelievler','bahcelievler'],['Karabağ','karabag'],['İslamhaneleri','islamhaneleri'],['Akyarlar','akyarlar'],['Karaincir','karaincir'],['Bağla','bagla'],['Gümüşlük','gumusluk'],['Gümüşkaya','gumuskaya'],['Koyunbaba','koyunbaba'],['Ortakent','ortakent'],['Yahşi','yahsi'],['Bitez','bitez'],['Gümbet','gumbet'],['Konacık','konacik'],['Bodrum Merkez','bodrum-merkez'],['Torba','torba'],['Yalıkavak','yalikavak'],['Gündoğan','gundogan'],['Göltürkbükü','golturkbuku'],['Türkbükü','turkbuku'],['Gölköy','golkoy'],['Güvercinlik','guvercinlik'],['Boğaziçi','bogazici'],['Mumcular','mumcular'],['Yalıçiftlik','yaliciftlik'],['Kızılağaç','kizilagac'],['Çırkan','cirkan'],['Yokuşbaşı','yokusbasi'],['Eskiçeşme','eskicesme'],['Kumbahçe','kumbahce'],['Umurça','umurca'],['Yeniköy','yenikoy'],['Cevat Şakir','cevat-sakir']
].map(([name,slug])=>({name,slug,url:`/bolgeler/${slug}-klima-servisi.html`}));

export const brands = [
 'Arçelik','Beko','Bosch','Siemens','Profilo','Vestel','Regal','Altus','Grundig','Samsung','LG','Daikin','Mitsubishi Electric','Mitsubishi Heavy Industries','Midea','Airfel','Baymak','Demirdöküm','Toshiba','Fujitsu','General','Gree','Sigma','Carrier','York','Hitachi','Panasonic','Viessmann','Vaillant','Haier','Sharp','Hisense','TCL','Kaira','Daylux','Hantech','SEG','Dijitsu','Vestfrost','Rota Climate','Diamond Electric','Dolce Vita','Fujiplus','Electrolux','AEG','Hoover','Candy','Hotpoint','Indesit','Ariston','Whirlpool','Franke','Smeg','Liebherr','Miele','Finlux','Awox','Uğur','Simfer','Esty'
].map(name=>({name,slug:name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/ı/g,'i').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),url:''})).map(b=>({...b,url:`/markalar/${b.slug}-servisi.html`}));

export const guides = [
 ['Klima Bakımı Ne Zaman Yapılmalı?','klima-bakimi-ne-zaman-yapilmali','Klima bakımı için uygun dönem ve bakım sırasında değerlendirilen noktalar.'],
 ['Klima Neden Soğutmaz?','klima-neden-sogutmaz','Soğutma performansı düşen klimada kullanıcı kontrolleri ve servis gerektiren durumlar.'],
 ['Klima Neden Su Akıtır?','klima-su-akitiyor','Klima su akıtmasının drenaj ve kullanım koşullarıyla ilgili olası nedenleri.'],
 ['Klima Gaz Dolumu Ne Zaman Gerekir?','klima-gaz-dolumu-gerekir-mi','Gaz kontrolü ihtiyacını düşündüren belirtiler ve doğru servis değerlendirmesi.'],
 ['Klimadan Kötü Koku Gelmesinin Nedenleri','klima-koku-yapiyor','Klimada koku oluşumunun olası kaynakları ve filtre bakımı.'],
 ['Klima Ses Yapıyor: Olası Nedenler','klima-ses-yapiyor','Çalışma seslerinin normal olup olmadığını anlamaya yardımcı ipuçları.'],
 ['Inverter Klima Arızalarında İlk Kontroller','inverter-klima-arizalari','Inverter klimalarda güvenle yapılabilecek ilk kontroller.'],
 ['Klima Elektronik Kart Arızası Nasıl Anlaşılır?','klima-elektronik-kart-arizasi','Elektronik kart sorunlarında görülebilecek çalışma belirtileri.'],
 ['Klima Montajında Vakum Neden Önemlidir?','klima-montajinda-vakum','Montaj işlemi sırasında vakum uygulamasının sistem açısından rolü.'],
 ['Klima Drenaj Hattı Bakımı','klima-drenaj-bakimi','Drenaj hattının kontrolü ve su tahliyesiyle ilgili bakım bilgileri.'],
 ['Yazlık Evlerde Klima Sezon Öncesi Kontrolü','yazlik-ev-klima-bakimi','Bodrum’daki yazlık konutlarda sezon başlamadan önce klima hazırlığı.'],
 ['Bodrum’da Nem ve Tuzlu Havanın Klima Üzerindeki Etkisi','bodrum-nem-klima-bakimi','Sahil ikliminde klima bakımı ve dış üniteyi etkileyen çevre koşulları.'],
 ['VRF Sistemlerde Periyodik Bakım','vrf-sistem-bakimi','VRF sistemlerinde düzenli kontrol ve bakım planlaması.'],
 ['Buzdolabı Soğutmuyor: İlk Kontroller','buzdolabi-sogutmuyor','Soğutmayan buzdolabında güvenle kontrol edilebilecek temel noktalar.'],
 ['Buzdolabından Ses Gelmesi Normal mi?','buzdolabi-ses-yapiyor','Buzdolabı çalışma seslerini ayırt etmek için pratik bilgiler.'],
 ['Çamaşır Makinesi Neden Sıkmaz?','camasir-makinesi-sikmiyor','Sıkma sorununun yük, tahliye ve cihaz koşullarıyla ilişkisi.'],
 ['Çamaşır Makinesi Su Almıyor','camasir-makinesi-su-almiyor','Su almayan çamaşır makinesinde ilk kontrol edilecek güvenli noktalar.'],
 ['Bulaşık Makinesi İçinde Su Kalıyor','bulasik-makinesi-su-birakiyor','Tahliye sonrası makinede su kalmasının olası nedenleri.'],
 ['Bulaşık Makinesi İyi Yıkamıyor','bulasik-makinesi-iyi-yikamiyor','Yıkama performansını etkileyen yükleme ve bakım koşulları.'],
 ['Kurutma Makinesi Neden Kurutmaz?','kurutma-makinesi-kurutmuyor','Kurutma performansı düşüşünde filtre ve hava akışının kontrolü.'],
 ['Beyaz Eşyada Voltaj Dalgalanmasına Karşı Koruma','beyaz-esya-voltaj-koruma','Elektrik dalgalanmalarına karşı cihaz kullanımında alınabilecek önlemler.'],
 ['Teknik Servis Kaydı Açarken Hangi Bilgiler Hazır Olmalı?','servis-cagirirken-hangi-bilgiler','Servis talebi sırasında cihaz ve arıza hakkında paylaşılabilecek bilgiler.'],
 ['Klima Filtresi Nasıl ve Ne Sıklıkla Temizlenir?','klima-filtre-temizligi','Kullanıcıların klima filtresi temizliği için izleyebileceği genel adımlar.'],
 ['Klimayı Daha Verimli Kullanmak İçin 10 Teknik İpucu','klima-enerji-verimliligi','Klima ayarları ve kullanım alışkanlıklarıyla verimli çalışma önerileri.'],
 ['Beyaz Eşya Ömrünü Uzatmak İçin Bakım Rehberi','beyaz-esya-bakim-rehberi','Ev tipi cihazların düzenli bakımı ve doğru kullanımına dair rehber.']
].map(([title,slug,description])=>({title,slug,description,url:`/bilgi-merkezi/${slug}.html`}));

// Only 19 region destinations visibly linked from all 60 brand detail pages.
export const linkedRegionSlugs = ['akcaalan','bahcelievler','karabag','islamhaneleri','akyarlar','karaincir','bagla','gumusluk','gumuskaya','koyunbaba','ortakent','yahsi','bitez','gumbet','konacik','bodrum-merkez','torba','yalikavak','gundogan'];
export const brandPagePairs = brands.flatMap(brand => linkedRegionSlugs.map(regionSlug => ({brand,region:regions.find(r=>r.slug===regionSlug),verifiedFrom:'brand'})));
export const regionPagePairs = brands.slice(0,36).map(brand => ({brand,region:regions.find(r=>r.slug==='cevat-sakir'),verifiedFrom:'region'}));
export const brandRegionPairs = [...brandPagePairs,...regionPagePairs];

export const knownUrls = [
 '/', '/hizmetler/','/bolgeler/','/markalar/','/bilgi-merkezi/',
 ...services.map(x=>x.url), ...regions.map(x=>x.url), ...brands.map(x=>x.url), ...guides.map(x=>x.url),
 '/hakkimizda.html','/iletisim.html',
 ...brandRegionPairs.map(x=>`/servis/${x.region.slug}/${x.brand.slug}-servisi.html`)
];
