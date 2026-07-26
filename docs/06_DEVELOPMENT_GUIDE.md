# Panelvan Studio — Development Guide

**Doküman:** DEVELOPMENT_GUIDE  
**Sürüm:** 1.0  
**Durum:** Aktif  
**Proje:** Panelvan Studio

---

## 1. Amaç

Bu doküman Panelvan Studio projesinin geliştirme sürecinde izlenecek temel çalışma düzenini tanımlar.

Bu proje, yazılım geliştirme deneyimi olmayan proje sahibi ile ChatGPT'nin adım adım birlikte ilerleyeceği şekilde yürütülecektir.

Temel hedefler:

- her değişikliğin anlaşılır olması,
- küçük ve kontrol edilebilir adımlarla ilerlemek,
- çalışan sürümü gereksiz yere bozmamak,
- tüm proje dosyalarını GitHub üzerinde tutmak,
- önemli kararları dokümante etmek,
- her aşamada geri dönebileceğimiz bir sürüm geçmişi oluşturmaktır.

---

## 2. Proje Sahibi İçin Temel Kural

Proje sahibinin yazılım bilgisine sahip olduğu varsayılmamalıdır.

Verilen her teknik görev:

- hangi programın açılacağını,
- hangi klasöre girileceğini,
- hangi dosyanın açılacağını,
- neyin yapıştırılacağını,
- ne zaman kaydedileceğini,
- ne zaman commit yapılacağını,
- ne zaman push yapılacağını

açık şekilde anlatmalıdır.

---

## 3. Kullanılan Temel Araçlar

Projenin ana çalışma araçları:

- Visual Studio Code
- GitHub Desktop
- GitHub
- Lovable
- ChatGPT

Bu araçların görevleri birbirinden ayrıdır.

---

## 4. Visual Studio Code

Visual Studio Code proje dosyalarını:

- görüntülemek,
- oluşturmak,
- düzenlemek,
- kaydetmek

için kullanılacaktır.

Kod ve doküman düzenlemelerinin ana çalışma ortamıdır.

---

## 5. GitHub Desktop

GitHub Desktop:

- yapılan değişiklikleri görmek,
- commit oluşturmak,
- GitHub'a push yapmak,
- sürüm geçmişini takip etmek

için kullanılacaktır.

Proje sahibinin ilk aşamada terminal üzerinden Git komutları kullanması zorunlu değildir.

---

## 6. GitHub

GitHub projenin merkezi ve kalıcı kaynak deposudur.

Ana repository:

**LowFive59 / panelvan-studio**

Tüm önemli proje dosyaları repository içinde tutulacaktır.

Bilgisayardaki proje klasörü ile GitHub repository aynı projenin yerel ve uzak kopyalarıdır.

---

## 7. Lovable

Lovable ilk kullanıcı arayüzünün oluşturulması ve hızlı prototipleme için kullanılabilir.

Ancak GitHub repository projenin ana kaynak deposudur.

Lovable tarafından yapılan değişiklikler kontrol edilmeden projenin resmi standardı kabul edilmemelidir.

---

## 8. ChatGPT

ChatGPT:

- proje planlaması,
- dokümantasyon,
- kod üretimi,
- dosya hazırlama,
- hata analizi,
- adım adım yönlendirme

için kullanılacaktır.

Teknik talimatlar mümkün olduğunca proje sahibinin doğrudan uygulayabileceği biçimde verilmelidir.

---

## 9. Ana Repository Klasörü

Yerel bilgisayarda ana proje klasörü:

`panelvan-studio`

olmalıdır.

VS Code açıldığında Explorer alanında bu klasörün içeriği görünmelidir.

---

## 10. Temel Klasörler

Repository'nin temel yapısı:

- `assets`
- `docs`
- `public`
- `src`

ve kök seviyesindeki proje dosyalarından oluşur.

Her klasörün amacı farklıdır.

---

## 11. docs Klasörü

`docs` klasörü proje kararlarını ve teknik standartları saklar.

Mevcut doküman serisi:

- `01_PROJECT_SPECIFICATION.md`
- `02_INTERACTION_RULES.md`
- `03_UI_GUIDELINES.md`
- `04_SVG_STANDARD.md`
- `05_DATA_MODEL.md`
- `06_DEVELOPMENT_GUIDE.md`

Yeni önemli proje kararları gerektiğinde numaralandırılmış yeni dokümanlarla eklenebilir.

---

## 12. public Klasörü

`public` klasörü web uygulamasında doğrudan kullanılacak statik varlıklar için kullanılacaktır.

Örneğin:

- araç görselleri,
- SVG dosyaları,
- malzeme thumbnail'ları,
- malzeme texture'ları.

Kesin alt klasör yapısı geliştirme sırasında uygulanacaktır.

---

## 13. src Klasörü

`src` uygulamanın gerçek kaynak kodunun ana klasörüdür.

Burada ileride:

- React bileşenleri,
- veri dosyaları,
- TypeScript tipleri,
- yardımcı fonksiyonlar,
- stil dosyaları

bulunacaktır.

---

## 14. assets Klasörü

`assets` klasörü üretime doğrudan bağlanmamış çalışma ve kaynak varlıkları için kullanılabilir.

Örneğin:

- referans görseller,
- SVG hazırlama kaynakları,
- tasarım çalışmaları.

Üretimde kullanılan dosyaların nihai konumu gerektiğinde `public` altında olacaktır.

---

## 15. Çalışma Döngüsü

Standart geliştirme döngüsü:

1. Yapılacak değişikliği belirle.
2. Gerekirse ilgili dokümanı güncelle.
3. VS Code'da değişikliği yap.
4. Dosyayı kaydet.
5. Değişikliği yerelde kontrol et.
6. GitHub Desktop'ı aç.
7. Changes bölümünü kontrol et.
8. Açıklayıcı commit mesajı yaz.
9. Commit to main yap.
10. Push origin yap.
11. GitHub'a gönderildiğini doğrula.
12. Sonraki adıma geç.

---

## 16. Küçük Adımlar İlkesi

Tek seferde çok sayıda bağımsız değişiklik yapılmamalıdır.

Tercih edilen yöntem:

> Bir mantıksal değişiklik → kontrol → commit → push

Bu yaklaşım hata oluştuğunda hangi değişikliğin soruna neden olduğunu anlamayı kolaylaştırır.

---

## 17. Commit Mesajları

Commit mesajları kısa fakat açıklayıcı olmalıdır.

Örnekler:

- `Add UI guidelines v1.0`
- `Add SVG standard v1.0`
- `Add data model v1.0`
- `Add development guide v1.0`
- `Add Fiat Ducato 13m3 base image`
- `Add material texture assets`
- `Implement rear door group selection`

Kaçınılması gereken mesajlar:

- `update`
- `test`
- `aaa`
- `son`
- `new`
- `fix stuff`

---

## 18. Push Kuralı

Önemli bir commit oluşturulduktan sonra GitHub'a push edilmelidir.

Yerelde uzun süre çok sayıda commit biriktirmek proje sahibinin çalışma düzenini gereksiz yere karmaşıklaştırabilir.

---

## 19. main Branch

İlk geliştirme aşamasında proje küçük olduğu için doğrudan `main` branch üzerinde çalışılabilir.

Proje büyüdüğünde:

- feature branch,
- pull request,
- review

gibi daha gelişmiş Git süreçleri değerlendirilebilir.

İlk prototip için gereksiz karmaşıklık oluşturulmamalıdır.

---

## 20. Dosya Kaydetme

VS Code'da değişiklik yaptıktan sonra dosyanın kaydedildiğinden emin olunmalıdır.

Windows üzerinde standart kısayol:

`Ctrl + S`

Kaydedilmemiş dosya GitHub Desktop'ta beklenen değişikliği göstermeyebilir.

---

## 21. LF ve CRLF

Metin dosyalarında `LF` ve `CRLF` farklı satır sonu biçimleridir.

Windows ortamında GitHub Desktop şu tür bir uyarı gösterebilir:

`This file uses 'LF' line endings...`

Bu uyarı tek başına proje hatası değildir.

Kod veya Markdown içeriğinin bozulduğu anlamına gelmez.

---

## 22. Satır Sonu Standardı

Proje genelinde tercih edilen satır sonu:

`LF`

olacaktır.

İlerleyen geliştirme aşamasında repository köküne `.gitattributes` dosyası eklenerek bu davranış standartlaştırılacaktır.

Önerilen temel kural:

`* text=auto eol=lf`

Bu değişiklik ayrı bir commit olarak yapılmalıdır.

---

## 23. Kodlama Standardı

Metin ve kod dosyalarında tercih edilen karakter kodlaması:

`UTF-8`

olmalıdır.

Türkçe kullanıcı arayüzü metinleri UTF-8 ile saklanmalıdır.

---

## 24. Dosya İsimleri

Teknik dosya ve klasör isimlerinde mümkün olduğunca:

- İngilizce,
- küçük harf,
- boşluksuz,
- Türkçe karaktersiz

isimler kullanılmalıdır.

Dokümantasyon dosyalarında mevcut numaralı büyük harf standardı korunabilir.

---

## 25. Hazır Dosya Yöntemi

Uzun doküman veya proje dosyaları mümkün olduğunda ChatGPT tarafından hazır dosya olarak oluşturulmalıdır.

Proje sahibine yüzlerce satırlık içeriği manuel kopyalatmak tercih edilmemelidir.

İş akışı:

1. ChatGPT dosyayı hazırlar.
2. Proje sahibi dosyayı indirir.
3. Doğru repository klasörüne koyar.
4. GitHub Desktop'ta değişikliği kontrol eder.
5. Commit ve push yapar.

---

## 26. Kopyalanabilir İçerik Kuralı

Manuel kopyalama gerektiğinde yapıştırılacak içerik tek bir kopyalanabilir blok halinde verilmelidir.

Ana kopyalama bloğunu bozacak iç içe Markdown kod bloklarından kaçınılmalıdır.

Proje sahibinin hangi kısmı kopyalaması gerektiği belirsiz bırakılmamalıdır.

---

## 27. Değişiklik Öncesi Kontrol

Mevcut çalışan bir dosyada büyük değişiklik yapılmadan önce:

- dosyanın mevcut durumu,
- değişikliğin amacı,
- etkilenebilecek diğer bileşenler

kontrol edilmelidir.

Çalışan kod gereksiz yere baştan yazılmamalıdır.

---

## 28. Yedekleme Yaklaşımı

Git commit geçmişi projenin temel geri dönüş mekanizmasıdır.

Bu nedenle anlamlı aşamalarda commit oluşturmak önemlidir.

Aynı dosyanın:

- final,
- final2,
- final-son,
- son-gercek

gibi manuel kopyalarını üretmek yerine Git geçmişi kullanılmalıdır.

---

## 29. Hata Olduğunda

Bir hata oluştuğunda proje sahibi rastgele ayar değiştirmemelidir.

Önerilen süreç:

1. Hata mesajını olduğu gibi koru.
2. Mümkünse ekran görüntüsü al.
3. Hangi işlemden sonra oluştuğunu belirt.
4. ChatGPT ile hatayı analiz et.
5. Tek bir düzeltme uygula.
6. Sonucu tekrar kontrol et.

---

## 30. Ekran Görüntüsü Kullanımı

Bir arayüz veya araç davranışı açıklanırken ekran görüntüsü kullanılması faydalıdır.

Ekran görüntüsü özellikle şu durumlarda kullanılmalıdır:

- GitHub Desktop uyarıları,
- VS Code dosya yapısı,
- Lovable arayüz sorunları,
- araç SVG hizalama sorunları,
- malzeme texture hataları.

---

## 31. Terminal Kullanımı

İlk aşamada terminal zorunlu değildir.

Bir işlem:

- VS Code,
- GitHub Desktop,
- GitHub web arayüzü

ile güvenli ve anlaşılır şekilde yapılabiliyorsa proje sahibine terminal komutu dayatılmamalıdır.

Terminal gerektiğinde komutun:

- nerede çalıştırılacağı,
- ne yaptığı,
- beklenen çıktısı

açıklanmalıdır.

---

## 32. Paket Kurulumu

İleride Node.js paketleri kurulması gerektiğinde proje sahibine doğrudan yalnızca komut verilmemelidir.

Önce:

- Node.js'in kurulu olup olmadığı,
- terminalin hangi klasörde açılacağı,
- hangi komutun çalıştırılacağı,
- işlem başarılıysa ne görüleceği

anlatılmalıdır.

---

## 33. Yeni Kod Eklerken

Yeni kod eklenirken mümkün olduğunca şu sıra izlenmelidir:

1. Amaç açıklanır.
2. Değişecek dosya belirtilir.
3. Gerekirse hazır dosya verilir.
4. Dosya doğru konuma yerleştirilir.
5. Uygulama çalıştırılır.
6. Görsel/işlevsel test yapılır.
7. Başarılıysa commit edilir.
8. Push yapılır.

---

## 34. Proje Dokümanlarının Rolü

`docs` klasöründeki belgeler yalnızca bilgi amaçlı değildir.

Bunlar geliştirme kararlarının referansıdır.

Kod ile doküman arasında çelişki oluşursa bilinçli karar verilerek biri güncellenmelidir.

Eski karar sessizce değiştirilmemelidir.

---

## 35. Değişiklik Kapsamı

Her geliştirme adımı mümkün olduğunca tek bir konuya odaklanmalıdır.

Örneğin:

- sadece araç veri yapısı,
- sadece malzeme listesi,
- sadece SVG hover,
- sadece arka kapı grup davranışı.

Aynı commit içinde ilgisiz büyük değişiklikler yapılmamalıdır.

---

## 36. İlk Teknik Hedef

Dokümantasyon aşamasından sonraki ilk teknik hedef:

**FIAT Ducato 13 m³ için çalışan tek araç prototipi**

olacaktır.

Bu prototipte:

- gerçek araç görseli,
- altı kaplama grubu,
- hover,
- tıklama,
- beş malzeme,
- texture uygulaması

çalışmalıdır.

---

## 37. Araçları Toplu Eklememe Kuralı

İlk araç tamamen çalışmadan:

- tüm markalar,
- tüm modeller,
- tüm hacimler

için gerçek SVG ve texture sistemi üretilmemelidir.

Önce tek araç üzerinde sistem doğrulanacaktır.

Sonra aynı standart diğer araçlara uygulanacaktır.

---

## 38. İlk Araç

İlk gerçek geliştirme aracı:

**FIAT Ducato — 13 m³**

olacaktır.

15 m³ ve 17 m³ varyantları ilk prototip tamamlandıktan sonra ele alınacaktır.

---

## 39. İlk Malzemeler

İlk prototipte kullanılacak beş malzeme:

1. Kayın-Marin Su Kontrası
2. Filmli Kontra Plywood
3. Ham MDF
4. MDF üzeri Muşamba
5. Kontra üzeri Çetalı Alüminyum

Bu malzemelerin gerçek texture dosyaları ayrı varlıklar olarak hazırlanacaktır.

---

## 40. İlk Etkileşim Testi

İlk teknik başarı testi Arka Kapılar grubu üzerinden yapılabilir.

Beklenen davranış:

1. Araç görünür.
2. Sol kapıya hover yapılır.
3. İki kapı birlikte turuncu vurgulanır.
4. Bir malzeme seçilir.
5. Kapılardan birine tıklanır.
6. Aynı malzeme iki kapıya uygulanır.
7. Başka bölgedeki kaplama etkilenmez.

Bu test başarılı olduktan sonra diğer bölgeler aynı sisteme bağlanabilir.

---

## 41. Görsel Kalite Aşamaları

Görsel geliştirme iki aşamada ele alınmalıdır.

### Aşama 1 — İşlev

Önce:

- doğru alan,
- doğru tıklama,
- doğru grup,
- doğru texture

çalışmalıdır.

### Aşama 2 — Gerçekçilik

Sonra:

- texture ölçeği,
- perspektif,
- ışık,
- gölge,
- yüzey gerçekçiliği

iyileştirilmelidir.

İlk aşamada mükemmel görsellik uğruna temel sistem gereksiz yere karmaşıklaştırılmamalıdır.

---

## 42. Kod Kalitesi

Kod:

- okunabilir,
- açıklayıcı,
- küçük sorumluluklara ayrılmış,
- gereksiz tekrar içermeyen

yapıda olmalıdır.

Ancak küçük prototipte aşırı mimari soyutlama yapılmamalıdır.

---

## 43. AI Tarafından Yapılan Değişiklikler

Lovable, ChatGPT veya başka bir AI aracı tarafından önerilen kod otomatik olarak doğru kabul edilmemelidir.

Özellikle şu proje kuralları korunmalıdır:

- fiyat paneli yok,
- 3D dolaşım yok,
- arka iç görünüm sabit,
- altı resmi kaplama grubu,
- çift parçalar tek grup,
- gerçek araç görseli,
- gerçek malzeme texture'ları.

---

## 44. Tasarım Sapmalarını Önleme

Bir AI geliştirme aracı açık talimat olmadan:

- yeni özellik,
- dashboard,
- fiyatlandırma,
- sepet,
- teklif formu,
- farklı navigasyon,
- 3D araç

eklerse bu değişiklik proje gereksinimi kabul edilmemelidir.

Önce mevcut proje dokümanları kontrol edilmelidir.

---

## 45. GitHub'a Gönderilmemesi Gerekenler

İleride projeye özel gizli anahtar veya kimlik bilgileri eklenirse bunlar GitHub'a commit edilmemelidir.

Örnek:

- API key,
- parola,
- erişim token'ı,
- özel `.env` içeriği.

Böyle bir ihtiyaç oluştuğunda `.gitignore` ve environment variable sistemi ayrıca yapılandırılacaktır.

---

## 46. Kontrol Noktaları

Projenin önemli kontrol noktaları:

1. Dokümantasyon tamamlandı.
2. Yerel geliştirme ortamı hazır.
3. İlk gerçek araç görseli projeye eklendi.
4. İlk SVG overlay hazır.
5. Hover çalışıyor.
6. Grup tıklaması çalışıyor.
7. İlk texture uygulanıyor.
8. Beş malzeme çalışıyor.
9. Altı bölge çalışıyor.
10. Fiat Ducato 13 m³ prototipi tamamlandı.

Her büyük kontrol noktasında çalışan sürüm GitHub'a push edilmiş olmalıdır.

---

## 47. Sorun Çözme İlkesi

Bir şey çalışmadığında aynı anda beş farklı çözüm denenmemelidir.

Tercih edilen yöntem:

> Bir hipotez → bir değişiklik → bir test.

Bu yaklaşım özellikle yazılım deneyimi olmayan proje sahibi için hata takibini daha güvenli hale getirir.

---

## 48. Bir Sonraki Aşamaya Geçme

Bir aşama tamamlanmadan sonraki aşamaya acele edilmemelidir.

Örneğin SVG tıklama sistemi doğru çalışmıyorsa yeni araç eklemek sorunu büyütür.

Önce temel sistem doğrulanmalıdır.

---

## 49. Ana Geliştirme Kuralı

Panelvan Studio geliştirme sürecinin temel prensibi:

> Küçük adımlarla ilerle, çalışan sürümü koru, her önemli aşamayı GitHub'a kaydet ve bir sonraki adıma yalnızca mevcut adım doğrulandıktan sonra geç.

---

## 50. Sürüm Geçmişi

### v1.0

İlk resmi Panelvan Studio Development Guide sürümü.

Tanımlanan temel konular:

- VS Code çalışma düzeni,
- GitHub Desktop kullanımı,
- GitHub'ın merkezi repository rolü,
- Lovable ve ChatGPT'nin görevleri,
- commit ve push düzeni,
- küçük adımlar ilkesi,
- LF/CRLF yaklaşımı,
- hazır dosya yöntemi,
- hata çözme süreci,
- ilk gerçek prototip hedefi,
- FIAT Ducato 13 m³ geliştirme sırası.
