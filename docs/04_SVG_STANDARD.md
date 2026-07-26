# Panelvan Studio — SVG Standard

**Doküman:** SVG_STANDARD  
**Sürüm:** 1.0  
**Durum:** Aktif  
**Proje:** Panelvan Studio

---

## 1. Amaç

Bu doküman, Panelvan Studio içinde araç görsellerinin etkileşimli kaplama bölgelerine dönüştürülmesi için kullanılacak SVG standardını tanımlar.

SVG sisteminin temel görevleri:

- araç üzerindeki kaplanabilir bölgeleri tanımlamak,
- hover etkileşimlerini yönetmek,
- tıklama alanlarını oluşturmak,
- malzeme dokularını doğru bölgelere maskelemek,
- birden fazla fiziksel parçayı tek mantıksal kaplama grubu olarak yönetmek,
- farklı araçların aynı konfigürasyon motoruyla çalışmasını sağlamaktır.

SVG, aracın kendisinin yerine geçen bir çizim değildir.

Gerçekçi ana araç görseli korunacak; SVG bunun üzerinde çalışan etkileşim ve maskeleme katmanı olacaktır.

---

## 2. Temel Mimari

Araç görselleştirmesi iki ana katmandan oluşacaktır:

1. Gerçek araç görseli
2. Etkileşimli SVG katmanı

Temel mantık:

Araç görseli  
→ gerçekçilik, ışık, gölge, araç detayları

SVG katmanı  
→ tıklama, hover, seçim, maskeleme, texture uygulaması

SVG ile araç görseli aynı koordinat sistemi üzerinde hizalanmalıdır.

---

## 3. İlk Araç Standardı

İlk SVG sistemi şu araç için hazırlanacaktır:

**Marka:** Fiat  
**Model:** Ducato  
**Hacim:** 13 m³  
**Görünüm:** Arka iç görünüm  
**Arka kapılar:** Açık

Bu araç tamamlanmadan diğer araçların SVG üretimine geçilmemelidir.

İlk aracın amacı tüm SVG altyapısının doğrulanmasıdır.

---

## 4. Resmi Kaplama Grupları

Panelvan Studio'da altı ana kaplama grubu vardır:

1. Taban
2. Yanlar
3. Arka Kapılar
4. Teker Üstleri
5. Tavan
6. Ara Bölme

Resmi yazılım kimlikleri:

- `floor`
- `walls`
- `rearDoors`
- `wheelArches`
- `roof`
- `bulkhead`

Bu kimlikler tüm araçlarda aynı kalmalıdır.

Araç değiştiğinde geometri değişebilir ancak kaplama grubunun kimliği değişmemelidir.

---

## 5. Fiziksel Parça ve Mantıksal Grup Ayrımı

Araç üzerinde fiziksel olarak ayrı görünen parçalar, Panelvan Studio açısından aynı kaplama grubuna ait olabilir.

Örneğin:

**Yanlar**

fiziksel olarak:

- sol yan
- sağ yan

olmasına rağmen tek mantıksal gruptur:

`walls`

Aynı kural Arka Kapılar ve Teker Üstleri için de geçerlidir.

---

## 6. Yanlar Grubu

`walls` grubu en az iki fiziksel alt parçaya sahip olabilir:

- `wallLeft`
- `wallRight`

Kullanıcı:

- sol yana tıklarsa veya
- sağ yana tıklarsa

aktif grup her zaman:

`walls`

olmalıdır.

Seçilen malzeme her iki yana birlikte uygulanmalıdır.

Kullanıcı sol ve sağ yana farklı malzeme atayamaz.

---

## 7. Arka Kapılar Grubu

`rearDoors` grubu iki ana fiziksel alt parçaya sahiptir:

- `rearDoorLeft`
- `rearDoorRight`

Kullanıcı hangi kapıya tıklarsa tıklasın:

`rearDoors`

grubu seçilmiş kabul edilir.

Seçilen malzeme iki arka kapıya birlikte uygulanmalıdır.

Sol ve sağ arka kapıya ayrı malzeme atanmayacaktır.

---

## 8. Teker Üstleri Grubu

`wheelArches` grubu iki ana fiziksel alt parçaya sahiptir:

- `wheelArchLeft`
- `wheelArchRight`

Kullanıcı hangi teker üstüne tıklarsa tıklasın:

`wheelArches`

grubu seçilmiş kabul edilir.

Seçilen malzeme iki teker üstüne birlikte uygulanmalıdır.

---

## 9. Tek Parçalı Gruplar

Aşağıdaki gruplar mantıksal olarak tek kaplama grubudur:

- `floor`
- `roof`
- `bulkhead`

Bunların SVG geometrisi gerektiğinde birden fazla path içerebilir.

Ancak kullanıcı açısından her biri tek seçimdir.

Örneğin `floor` geometrisi teknik sebeplerle üç ayrı SVG path ile çizilmiş olsa bile tüm path'ler aynı `floor` grubuna bağlı olmalıdır.

---

## 10. Önerilen SVG Hiyerarşisi

Her araç SVG'si aşağıdaki mantıksal yapıyı takip etmelidir:

- vehicleOverlay
  - floor
  - walls
    - wallLeft
    - wallRight
  - rearDoors
    - rearDoorLeft
    - rearDoorRight
  - wheelArches
    - wheelArchLeft
    - wheelArchRight
  - roof
  - bulkhead

Bir alt parça birden fazla path gerektiriyorsa açıklayıcı ek kimlikler kullanılabilir.

Örnek:

- wallLeftUpper
- wallLeftLower
- rearDoorLeftUpper
- rearDoorLeftLower

Ancak bu parçalar yine ana mantıksal gruba bağlı kalmalıdır.

---

## 11. SVG Kimliklendirme Kuralı

Kimlikler:

- İngilizce,
- açıklayıcı,
- tutarlı,
- camelCase

olmalıdır.

Örnek doğru isimler:

- `rearDoorLeft`
- `rearDoorRight`
- `wheelArchLeft`
- `wheelArchRight`
- `wallLeft`
- `wallRight`

Kaçınılması gereken isimler:

- `path1`
- `shape2`
- `layer5`
- `doorA`
- `bolge1`

Üretim SVG'sinde anlamsız otomatik isimler bırakılmamalıdır.

---

## 12. ViewBox Standardı

Her araç SVG'si sabit bir `viewBox` kullanmalıdır.

SVG'nin `viewBox` oranı ana araç görselinin en-boy oranıyla birebir uyumlu olmalıdır.

Araç görseli ile SVG farklı koordinat sistemlerinde bağımsız ölçeklenmemelidir.

Ana prensip:

> Aynı container içinde aynı oranla ölçeklenen görsel ve SVG her ekran boyutunda üst üste kalmalıdır.

---

## 13. Araç Görseli ile Hizalama

SVG overlay ana araç görselinin tam üzerinde konumlandırılmalıdır.

Şu durumlar kabul edilmez:

- ekran genişliği değişince SVG'nin kayması,
- SVG ile görselin farklı oranlarda büyümesi,
- kapı maskesinin kapıdan taşması,
- taban maskesinin perspektiften kopması.

Hizalama masaüstünde farklı pencere genişliklerinde test edilmelidir.

---

## 14. SVG Geometri Kaynağı

SVG bölgeleri gerçek araç referansına göre çizilmelidir.

Geometri:

- tahmini genel panelvan şekline,
- rastgele oluşturulmuş AI çizimine,
- başka bir araç modelinin geometrisine

dayanmamalıdır.

Her araç varyantı kendi onaylanmış görsel referansına göre hazırlanmalıdır.

---

## 15. Tıklama Alanı ve Görsel Maske Ayrımı

Gerektiğinde tıklama alanı ile malzeme maskesi aynı geometri olmak zorunda değildir.

Örneğin çok dar veya karmaşık bir yüzeyde kullanıcı deneyimini iyileştirmek için görünmez tıklama alanı biraz daha geniş olabilir.

Ancak malzeme dokusu yalnızca gerçek kaplanabilir yüzey sınırları içinde görünmelidir.

Bu nedenle sistem gerektiğinde iki geometri türünü destekleyebilir:

- hit area
- render mask

---

## 16. Hit Area

Hit area kullanıcının fareyle etkileşim kurduğu bölgedir.

Hit area:

- kolay tıklanabilir olmalı,
- komşu kaplama grubuna taşmamalı,
- yanlış seçim üretmemelidir.

Hit area görünmez olabilir.

Görünmez olması etkileşimsiz olduğu anlamına gelmez.

---

## 17. Render Mask

Render mask malzeme dokusunun görünmesine izin verilen gerçek yüzeydir.

Render mask:

- kaplanacak panel sınırlarını takip etmeli,
- camlara taşmamalı,
- kapı boşluklarına taşmamalı,
- metal çerçeveleri gereksiz yere kapatmamalı,
- kaplanmayacak mekanik parçalara taşmamalıdır.

---

## 18. Hover Standardı

Bir etkileşimli bölge üzerine gelindiğinde ilgili mantıksal grup vurgulanmalıdır.

Örneğin `rearDoorLeft` üzerine gelindiğinde:

- `rearDoorLeft`
- `rearDoorRight`

birlikte hover durumuna geçebilir.

Aynı mantık:

- `walls`
- `wheelArches`

için uygulanmalıdır.

Hover rengi Panelvan Studio turuncu vurgu sistemine uygun olmalıdır.

Hover yarı saydam olmalı ve araç detaylarını tamamen gizlememelidir.

---

## 19. Hover ve Malzeme Ayrımı

Hover rengi ile uygulanmış malzeme birbirinden farklı kavramlardır.

Hover:

- geçici,
- turuncu,
- etkileşim göstergesidir.

Malzeme:

- kalıcı konfigürasyon sonucudur,
- gerçek texture kullanır.

Fare bölgeden ayrıldığında hover kaybolmalıdır.

Uygulanmış malzeme kaybolmamalıdır.

---

## 20. Tıklama Standardı

Kullanıcı bir SVG alt parçasına tıkladığında uygulama doğrudan o alt parçanın değil, bağlı olduğu ana kaplama grubunun kimliğini işlemelidir.

Örnek:

`rearDoorLeft`

tıklanır.

Uygulama bunu:

`rearDoors`

olarak yorumlar.

Aktif malzeme `rearDoors` durumuna atanır.

Sonuç olarak her iki kapının render maskesi aynı texture'ı gösterir.

---

## 21. Grup Eşleme Mantığı

Alt parçalar ile ana gruplar arasındaki ilişki açık şekilde tanımlanmalıdır.

Örnek mantık:

- `wallLeft` → `walls`
- `wallRight` → `walls`
- `rearDoorLeft` → `rearDoors`
- `rearDoorRight` → `rearDoors`
- `wheelArchLeft` → `wheelArches`
- `wheelArchRight` → `wheelArches`

Bu eşleme bileşen içine dağınık şekilde hard-code edilmemelidir.

Merkezi ve okunabilir bir veri yapısında tutulması tercih edilir.

---

## 22. Texture Uygulaması

SVG maskeleri seçilen malzeme texture'ını ilgili yüzey içinde göstermelidir.

Texture:

- yüzey sınırları içinde kalmalı,
- gereksiz şekilde esnetilmemeli,
- gerçek malzeme ölçeğine yakın görünmeli,
- mümkünse tekrarlanabilir pattern mantığıyla kullanılmalıdır.

Malzeme resmi tüm yüzeye tek seferde rastgele gerilmemelidir.

---

## 23. Texture Pattern Standardı

Tekrarlanabilir malzemelerde SVG pattern kullanılabilir.

Pattern sistemi şu özellikleri desteklemelidir:

- texture dosyası,
- ölçek,
- konum,
- gerektiğinde dönüş açısı.

Farklı malzemelerin doğal ölçekleri farklı olabileceği için texture ölçeği malzeme verisinden kontrol edilebilir olmalıdır.

---

## 24. Perspektif

Basit pattern uygulaması ilk prototip için kabul edilebilir.

Ancak nihai görselde malzeme perspektifi aracın yüzeyine mümkün olduğunca uyum sağlamalıdır.

Özellikle:

- taban,
- yan yüzeyler,
- arka kapılar

perspektif farklarının en görünür olduğu alanlardır.

İlk aşamada sistemin çalışması, sonraki aşamada perspektif gerçekçiliğinin geliştirilmesi tercih edilir.

---

## 25. Işık ve Gölge Koruma

Malzeme dokusu aracın orijinal ışık ve gölge bilgisini tamamen kapatmamalıdır.

Amaç düz bir çıkartma görünümü oluşturmamaktır.

Gerekirse ileride:

- blend mode,
- opacity,
- gölge overlay,
- highlight overlay

gibi yöntemler değerlendirilebilir.

Bu teknikler görsel test sonucuna göre kullanılmalıdır.

---

## 26. SVG Katman Sırası

Genel katman mantığı şu şekilde olmalıdır:

1. Ana araç görseli
2. Malzeme render katmanı
3. Işık/gölge koruma katmanı gerekiyorsa
4. Hover/interaction katmanı

Hover katmanı malzeme sonucunu kalıcı olarak değiştirmemelidir.

---

## 27. Pointer Events

Yalnızca etkileşim için gerekli SVG öğeleri pointer event almalıdır.

Dekoratif veya yalnızca render amaçlı öğeler yanlışlıkla tıklamayı engellememelidir.

Tıklama davranışı test edilirken üst üste gelen SVG path'lerine özellikle dikkat edilmelidir.

---

## 28. Cursor

Kaplanabilir alan üzerinde kullanıcıya tıklanabilirlik hissi verilmelidir.

Standart cursor:

`pointer`

olmalıdır.

Kaplanabilir olmayan araç bölümlerinde pointer kullanılmamalıdır.

---

## 29. Seçim Durumu

Uygulama son tıklanan mantıksal bölgeyi gerektiğinde aktif bölge olarak tutabilir.

Ancak malzeme uygulandıktan sonra asıl görsel sonuç texture olmalıdır.

Kalıcı güçlü turuncu katman malzemenin üzerinde bırakılmamalıdır.

---

## 30. Bağımsız Bölge Durumu

SVG sadece görüntüleme katmanıdır.

Hangi bölgeye hangi malzemenin atandığı bilgisi SVG dosyasının içinde tutulmamalıdır.

Konfigürasyon durumu uygulama state sisteminde tutulmalıdır.

Örnek durum:

- floor → checker-plate-plywood
- walls → marine-plywood
- rearDoors → film-faced-plywood
- wheelArches → null
- roof → mdf
- bulkhead → null

SVG bu durumu yalnızca görselleştirmelidir.

---

## 31. Araçtan Bağımsız Konfigürasyon Motoru

Konfigürasyon motoru Fiat Ducato'ya özel yazılmamalıdır.

Ortak motor şu grupları tanımalıdır:

- floor
- walls
- rearDoors
- wheelArches
- roof
- bulkhead

Araç dosyası yalnızca bu grupların o araç üzerindeki geometrisini sağlamalıdır.

Bu sayede yeni araç eklenirken temel etkileşim motoru yeniden yazılmamalıdır.

---

## 32. Araç SVG Dosya Yapısı

Her araç varyantının kendi SVG tanımı olabilir.

Önerilen dosya mantığı:

`vehicles/[brand]/[model]/[variant]/`

Örneğin:

`vehicles/fiat/ducato/13m3/`

Bu klasör içinde ileride şu tür dosyalar bulunabilir:

- ana araç görseli
- SVG bölge tanımı
- gerekiyorsa gölge/ışık yardımcı görselleri
- araç metadata bilgisi

Kesin klasör yapısı veri modeli dokümanıyla birlikte uygulanacaktır.

---

## 33. Araç Varyantları

13 m³, 15 m³ ve 17 m³ araçlar aynı marka ve model olsa bile geometrileri farklı olabilir.

Bu nedenle bir hacmin SVG'si diğer hacme otomatik olarak uygulanmamalıdır.

Her varyant:

- kendi araç görseline,
- kendi doğrulanmış SVG geometrisine

sahip olabilir.

Ortak olan şey kaplama grubu kimlikleridir.

---

## 34. SVG Üretim Süreci

Yeni bir araç için önerilen süreç:

1. Onaylanmış arka iç araç görselini hazırla.
2. Görselin en-boy oranını sabitle.
3. SVG viewBox oluştur.
4. Taban geometrisini çiz.
5. Yanları çiz.
6. Arka kapıları çiz.
7. Teker üstlerini çiz.
8. Tavanı çiz.
9. Ara bölmeyi çiz.
10. Alt parçaları doğru ana gruplara bağla.
11. Hover testini yap.
12. Tıklama testini yap.
13. Texture taşma testini yap.
14. Farklı ekran genişliklerinde hizalamayı test et.
15. Görsel doğrulama yap.
16. Onaylandıktan sonra üretim varlığı olarak kaydet.

---

## 35. SVG Çizim Hassasiyeti

Path'ler kaplanacak gerçek yüzey sınırlarını mümkün olduğunca doğru takip etmelidir.

Özellikle şu alanlarda hassasiyet önemlidir:

- kapı kenarları,
- cam sınırları,
- taban köşeleri,
- teker üstleri,
- tavan-yan birleşimleri,
- ara bölme sınırları.

Kaba dikdörtgen maskeler nihai üretim için kabul edilmez.

---

## 36. Karmaşık Yüzeyler

Bir kaplama alanı tek path ile doğru çizilemiyorsa birden fazla path kullanılabilir.

Önemli olan path sayısı değil, mantıksal grup ilişkisidir.

Örneğin `wallLeft` beş farklı path içerebilir.

Bu beş path de `walls` grubuna bağlı kalmalıdır.

---

## 37. Cam ve Boşluklar

Arka kapı veya yan yüzeylerde cam, açıklık veya kaplanmayan alan varsa texture bu alanlarda görünmemelidir.

Gerekirse:

- compound path,
- mask,
- clipPath

kullanılabilir.

Kaplama yüzeyi gerçek uygulamayı temsil etmelidir.

---

## 38. Araç Donanım Detayları

Kilitler, kollar, menteşeler ve benzeri parçaların kaplama tarafından kapatılıp kapatılmayacağı gerçek uygulamaya göre belirlenmelidir.

SVG yalnızca görsel kolaylık için fiziksel olarak kaplanmayacak parçaları kaplamamalıdır.

Kararsız durumlarda araç referansı ve gerçek kaplama uygulaması esas alınmalıdır.

---

## 39. SVG İçinde Stil

Mümkün olduğunca SVG geometrisi ile uygulama stili ayrılmalıdır.

Path dosyalarının içine gereksiz sabit renkler gömülmemelidir.

Hover, selected ve texture davranışları uygulama tarafından kontrol edilebilir olmalıdır.

Bu yaklaşım farklı temalar ve etkileşim durumları için esneklik sağlar.

---

## 40. Erişilebilirlik

SVG etkileşimleri yalnızca görsel renge bağlı olmamalıdır.

Gerekli olduğunda erişilebilir isimler veya uygun ARIA tanımları eklenebilir.

Ancak ilk hedef görsel konfigürasyon motorunun doğru çalışmasıdır.

---

## 41. Performans

SVG geometrileri gereksiz derecede karmaşık olmamalıdır.

Çok yüksek nokta sayısına sahip path'ler mümkünse optimize edilmelidir.

Optimizasyon yapılırken panel sınırlarının doğruluğu bozulmamalıdır.

Öncelik sırası:

1. Doğru geometri
2. Doğru etkileşim
3. Görsel kalite
4. Optimizasyon

---

## 42. Debug Modu

Geliştirme sırasında SVG bölgelerini kontrol etmek için geçici debug görünümü kullanılabilir.

Debug görünümünde farklı gruplar farklı geçici renklerle gösterilebilir.

Bu renkler üretim arayüzünün parçası değildir.

Debug modu kapatıldığında kullanıcı yalnızca normal hover ve texture davranışlarını görmelidir.

---

## 43. Geometri Doğrulama

Her araç SVG'si üretime alınmadan önce tek tek kontrol edilmelidir.

Kontrol listesi:

- Taban doğru mu?
- İki yan doğru mu?
- İki arka kapı doğru mu?
- İki teker üstü doğru mu?
- Tavan doğru mu?
- Ara bölme doğru mu?
- Kaplama camlara taşıyor mu?
- Gruplar yanlışlıkla üst üste geliyor mu?
- Hover doğru grubu gösteriyor mu?
- Tıklama doğru grubu seçiyor mu?
- Texture sınırlar içinde kalıyor mu?

---

## 44. Grup Davranışı Doğrulama

Özellikle şu testler zorunludur:

### Yanlar

Sol yana hover → iki yan vurgulanır.  
Sağ yana hover → iki yan vurgulanır.  
Sol yana tıklama → `walls`.  
Sağ yana tıklama → `walls`.

### Arka Kapılar

Sol kapıya hover → iki kapı vurgulanır.  
Sağ kapıya hover → iki kapı vurgulanır.  
Sol kapıya tıklama → `rearDoors`.  
Sağ kapıya tıklama → `rearDoors`.

### Teker Üstleri

Sol teker üstüne hover → ikisi vurgulanır.  
Sağ teker üstüne hover → ikisi vurgulanır.  
Sol teker üstüne tıklama → `wheelArches`.  
Sağ teker üstüne tıklama → `wheelArches`.

---

## 45. Malzeme Değiştirme Testi

Bir gruba malzeme uygulandıktan sonra başka malzeme seçilip aynı gruba tıklanırsa eski texture yeni texture ile değiştirilmelidir.

Başka grupların malzemeleri değişmemelidir.

---

## 46. Araç Değiştirme Davranışı

Araç değiştirildiğinde konfigürasyon durumunun korunup korunmayacağı ayrı ürün kararıdır.

Bu davranış açıkça belirlenmeden SVG katmanı kendi başına state taşımamalıdır.

Araç SVG'sinin görevi yalnızca geometri ve etkileşim sağlamaktır.

---

## 47. Yapılmaması Gerekenler

Açık talimat olmadan:

- gerçek araç yerine generic van SVG çizilmemeli,
- 3D model oluşturulmamalı,
- SVG içinde fiyat bilgisi tutulmamalı,
- malzeme isimleri SVG'ye hard-code edilmemeli,
- sol ve sağ kapılar ayrı ürün gibi davranmamalı,
- sol ve sağ yanlar ayrı ürün gibi davranmamalı,
- sol ve sağ teker üstleri ayrı ürün gibi davranmamalı,
- SVG state yönetim katmanına dönüştürülmemeli,
- araç görselinden bağımsız rastgele koordinatlar kullanılmamalıdır.

---

## 48. İlk SVG Prototip Başarı Kriteri

Fiat Ducato 13 m³ üzerinde aşağıdaki senaryo çalışmalıdır:

1. Araç arka iç görünümü açılır.
2. SVG overlay araçla doğru hizalanır.
3. Kullanıcı sol arka kapının üzerine gelir.
4. İki arka kapı birlikte turuncu hover gösterir.
5. Kullanıcı Kayın-Marin Su Kontrası seçer.
6. Sol arka kapıya tıklar.
7. `rearDoors` grubu aktif malzemeyi alır.
8. İki kapıda aynı malzeme texture'ı görünür.
9. Texture kapı sınırlarının dışına taşmaz.
10. Kullanıcı başka bir malzeme seçer.
11. Yanlardan birine tıklar.
12. İki yan aynı yeni malzemeyi gösterir.
13. Arka kapılardaki önceki malzeme değişmeden kalır.

Bu senaryo başarılıysa SVG etkileşim altyapısının temel sürümü çalışıyor kabul edilir.

---

## 49. Ana SVG Kuralı

Panelvan Studio SVG sisteminin temel prensibi:

> SVG aracı yeniden çizmez; gerçek araç görseli üzerinde doğru kaplama bölgelerini tanımlar ve yönetir.

---

## 50. Sürüm Geçmişi

### v1.0

İlk resmi Panelvan Studio SVG Standard sürümü.

Tanımlanan temel konular:

- gerçek araç görseli + SVG overlay mimarisi,
- altı ana kaplama grubu,
- fiziksel alt parçalar,
- grup seçim davranışları,
- hit area ve render mask ayrımı,
- hover ve tıklama standardı,
- texture uygulama prensipleri,
- araçtan bağımsız konfigürasyon motoru,
- SVG üretim ve doğrulama süreci,
- Fiat Ducato 13 m³ ilk prototip kabul kriterleri.
