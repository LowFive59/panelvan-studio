# Panelvan Studio — Data Model

**Doküman:** DATA_MODEL  
**Sürüm:** 1.0  
**Durum:** Aktif  
**Proje:** Panelvan Studio

---

## 1. Amaç

Bu doküman Panelvan Studio uygulamasında kullanılacak temel veri modelini tanımlar.

Amaç:

- araç verilerini arayüz kodundan ayırmak,
- malzeme verilerini merkezi olarak yönetmek,
- kaplama bölgelerini standartlaştırmak,
- yeni araç ve malzeme eklemeyi kolaylaştırmak,
- konfigürasyon motorunu belirli bir araca bağımlı olmaktan çıkarmaktır.

İlk sürümde veri yapısı mümkün olduğunca sade tutulacaktır.

---

## 2. Temel Veri Grupları

Panelvan Studio dört ana veri grubuna sahiptir:

1. Araç verileri
2. Malzeme verileri
3. Kaplama bölgesi tanımları
4. Kullanıcının aktif konfigürasyon durumu

Bu veri grupları birbirinden ayrılmalıdır.

---

## 3. Araç Hiyerarşisi

Kullanıcı arayüzündeki araç yapısı:

Marka → Model → Hacim

şeklindedir.

Örnek:

FIAT  
→ Ducato  
→ 13 m³  
→ 15 m³  
→ 17 m³

Teknik uygulamada her seçilebilir hacim ayrı bir araç varyantı olarak ele alınabilir.

---

## 4. Araç Kimliği

Her araç varyantının benzersiz bir `id` değeri olmalıdır.

Önerilen format:

`brand-model-volume`

Örnekler:

- `fiat-ducato-13m3`
- `fiat-ducato-15m3`
- `fiat-ducato-17m3`

Kimlikler:

- küçük harf,
- ASCII karakter,
- boşluksuz,
- URL ve dosya yolu kullanımına uygun

olmalıdır.

---

## 5. Araç Veri Yapısı

Bir araç varyantı en az şu bilgileri desteklemelidir:

- `id`
- `brandId`
- `brandName`
- `modelId`
- `modelName`
- `volumeId`
- `volumeLabel`
- `baseImage`
- `overlay`
- `regions`

Örnek TypeScript yapısı:

    interface VehicleVariant {
      id: string;
      brandId: string;
      brandName: string;
      modelId: string;
      modelName: string;
      volumeId: string;
      volumeLabel: string;
      baseImage: string;
      overlay: string;
      regions: RegionId[];
    }

---

## 6. İlk Araç Kaydı

İlk gerçek araç:

- Marka: Fiat
- Model: Ducato
- Hacim: 13 m³
- Kimlik: `fiat-ducato-13m3`

Örnek veri:

    {
      id: "fiat-ducato-13m3",
      brandId: "fiat",
      brandName: "FIAT",
      modelId: "ducato",
      modelName: "Ducato",
      volumeId: "13m3",
      volumeLabel: "13 m³",
      baseImage: "/vehicles/fiat/ducato/13m3/base.webp",
      overlay: "/vehicles/fiat/ducato/13m3/overlay.svg",
      regions: [
        "floor",
        "walls",
        "rearDoors",
        "wheelArches",
        "roof",
        "bulkhead"
      ]
    }

Dosya yolları gerçek geliştirme sırasında proje yapısına göre kesinleştirilebilir.

---

## 7. Marka Verisi

Marka bilgileri gerektiğinde ayrı veri yapısında tutulabilir.

Örnek:

    interface VehicleBrand {
      id: string;
      name: string;
    }

Örnek:

    {
      id: "fiat",
      name: "FIAT"
    }

Marka logoları ilk sürüm için zorunlu değildir.

---

## 8. Model Verisi

Model bilgileri marka altında gruplanabilir.

Örnek:

    interface VehicleModel {
      id: string;
      brandId: string;
      name: string;
    }

Örnek:

    {
      id: "ducato",
      brandId: "fiat",
      name: "Ducato"
    }

---

## 9. Hacim Verisi

Kullanıcı arayüzünde teknik kasa kodları yerine hacim gösterilir.

Örnek hacim değerleri:

- `13m3` → `13 m³`
- `15m3` → `15 m³`
- `17m3` → `17 m³`

`volumeId` yazılım ve dosya yolları için kullanılır.

`volumeLabel` kullanıcıya gösterilir.

---

## 10. Kaplama Bölgesi Kimlikleri

Resmi bölge kimlikleri:

- `floor`
- `walls`
- `rearDoors`
- `wheelArches`
- `roof`
- `bulkhead`

TypeScript tipi:

    type RegionId =
      | "floor"
      | "walls"
      | "rearDoors"
      | "wheelArches"
      | "roof"
      | "bulkhead";

Bu kimlikler proje standardıdır.

---

## 11. Kullanıcıya Gösterilen Bölge İsimleri

Bölge isimleri:

- `floor` → Taban
- `walls` → Yanlar
- `rearDoors` → Arka Kapılar
- `wheelArches` → Teker Üstleri
- `roof` → Tavan
- `bulkhead` → Ara Bölme

İsimler merkezi bir tanımdan alınmalıdır.

Bileşenlerin içine farklı ifadeler hard-code edilmemelidir.

---

## 12. Bölge Tanımı

Önerilen veri yapısı:

    interface RegionDefinition {
      id: RegionId;
      label: string;
    }

Örnek:

    const regions = [
      { id: "floor", label: "Taban" },
      { id: "walls", label: "Yanlar" },
      { id: "rearDoors", label: "Arka Kapılar" },
      { id: "wheelArches", label: "Teker Üstleri" },
      { id: "roof", label: "Tavan" },
      { id: "bulkhead", label: "Ara Bölme" }
    ];

---

## 13. SVG Alt Parçaları

SVG içindeki fiziksel parçalar ana bölge kimliklerinden ayrıdır.

Örnek alt parçalar:

- `wallLeft`
- `wallRight`
- `rearDoorLeft`
- `rearDoorRight`
- `wheelArchLeft`
- `wheelArchRight`

Bu alt parçalar kullanıcı konfigürasyonunda bağımsız malzeme alanları değildir.

---

## 14. SVG Alt Parça Eşlemesi

Alt parçalar ana bölgelere eşlenmelidir.

Örnek:

    const subpartToRegion = {
      wallLeft: "walls",
      wallRight: "walls",
      rearDoorLeft: "rearDoors",
      rearDoorRight: "rearDoors",
      wheelArchLeft: "wheelArches",
      wheelArchRight: "wheelArches"
    };

Bu sayede fiziksel parça ile ticari kaplama grubu birbirinden ayrılır.

---

## 15. Malzeme Kimlikleri

İlk sürümde resmi malzeme kimlikleri:

- `marine-plywood`
- `film-faced-plywood`
- `mdf`
- `vinyl-coated-mdf`
- `checker-plate-plywood`

Malzeme kimlikleri kullanıcıya gösterilen isimlerden bağımsızdır.

---

## 16. Resmi Malzeme İsimleri

Eşleme:

- `marine-plywood` → Kayın-Marin Su Kontrası
- `film-faced-plywood` → Filmli Kontra Plywood
- `mdf` → Ham MDF
- `vinyl-coated-mdf` → MDF üzeri Muşamba
- `checker-plate-plywood` → Kontra üzeri Çetalı Alüminyum

Bu isimler açık proje kararı olmadan değiştirilmemelidir.

---

## 17. Malzeme Veri Yapısı

Her malzeme en az şu alanları desteklemelidir:

- `id`
- `name`
- `thumbnail`
- `texture`

Gelecekte texture görünümünü iyileştirmek için ek alanlar eklenebilir.

Önerilen TypeScript yapısı:

    interface Material {
      id: MaterialId;
      name: string;
      thumbnail: string;
      texture: string;
      textureScale?: number;
      textureRotation?: number;
    }

---

## 18. MaterialId Tipi

İlk sürüm:

    type MaterialId =
      | "marine-plywood"
      | "film-faced-plywood"
      | "mdf"
      | "vinyl-coated-mdf"
      | "checker-plate-plywood";

Yeni malzeme eklendiğinde bu yapı güncellenebilir.

---

## 19. Malzeme Örneği

Örnek kayıt:

    {
      id: "marine-plywood",
      name: "Kayın-Marin Su Kontrası",
      thumbnail: "/materials/marine-plywood/thumb.webp",
      texture: "/materials/marine-plywood/texture.webp",
      textureScale: 1
    }

`thumbnail` sağ panelde gösterilir.

`texture` araç yüzeyinde kullanılır.

---

## 20. Texture Ayarları

Malzemelerin gerçek yüzey ölçekleri farklı olabilir.

Bu nedenle ileride malzeme bazında şu alanlar desteklenebilir:

- `textureScale`
- `textureRotation`
- `textureOffsetX`
- `textureOffsetY`

Bu ayarlar ilk prototipte zorunlu değildir.

Gereksiz karmaşıklık yaratılmamalıdır.

---

## 21. Aktif Malzeme

Uygulama kullanıcının o anda seçtiği malzemeyi ayrı state olarak tutmalıdır.

Örnek:

    activeMaterialId: "marine-plywood"

Kullanıcı başka malzeme seçtiğinde bu değer değişir.

Bu işlem daha önce kaplanmış bölgeleri değiştirmemelidir.

---

## 22. Aktif Araç

Seçili araç varyantı ayrı state olarak tutulmalıdır.

Örnek:

    activeVehicleId: "fiat-ducato-13m3"

Aynı anda yalnızca bir araç varyantı aktif olabilir.

---

## 23. Bölge Konfigürasyonu

Her ana kaplama bölgesi bağımsız malzeme değeri tutmalıdır.

Örnek:

    {
      floor: "checker-plate-plywood",
      walls: "marine-plywood",
      rearDoors: "film-faced-plywood",
      wheelArches: null,
      roof: "mdf",
      bulkhead: null
    }

`null`, ilgili bölgeye henüz malzeme uygulanmadığını gösterir.

---

## 24. Konfigürasyon Tipi

Önerilen TypeScript yapısı:

    type RegionConfiguration = Record<RegionId, MaterialId | null>;

Başlangıç durumu:

    const initialConfiguration = {
      floor: null,
      walls: null,
      rearDoors: null,
      wheelArches: null,
      roof: null,
      bulkhead: null
    };

---

## 25. Bölgeye Malzeme Uygulama

Temel işlem:

    applyMaterial(regionId, materialId)

mantığında olmalıdır.

Örnek:

    applyMaterial("rearDoors", "marine-plywood")

sonucu yalnızca `rearDoors` değerini değiştirmelidir.

Diğer bölgeler korunmalıdır.

---

## 26. Grup Davranışının Veri Modelindeki Yeri

Sol ve sağ arka kapının birlikte davranması konfigürasyon state'inde iki ayrı alan oluşturarak çözülmemelidir.

Yanlış yaklaşım:

- `rearDoorLeftMaterial`
- `rearDoorRightMaterial`

Doğru yaklaşım:

- `rearDoors`

Aynı prensip:

- `walls`
- `wheelArches`

için geçerlidir.

---

## 27. Aktif Bölge

Arayüz gerektiğinde kullanıcının son etkileşim kurduğu bölgeyi tutabilir.

Örnek:

    activeRegionId: "rearDoors"

Bu değer:

- seçili bölge vurgusu,
- erişilebilirlik,
- ilerideki UI özellikleri

için kullanılabilir.

Aktif bölge ile bölgenin malzeme ataması birbirine karıştırılmamalıdır.

---

## 28. Uygulama State Örneği

Basit uygulama state'i şu yapıya benzeyebilir:

    {
      activeVehicleId: "fiat-ducato-13m3",
      activeMaterialId: "marine-plywood",
      activeRegionId: "rearDoors",
      configuration: {
        floor: null,
        walls: null,
        rearDoors: "marine-plywood",
        wheelArches: null,
        roof: null,
        bulkhead: null
      }
    }

Bu yalnızca kavramsal örnektir.

Kesin state yönetim teknolojisi geliştirme sırasında belirlenebilir.

---

## 29. Araç Değiştiğinde Konfigürasyon

İlk prototipte araç değiştirildiğinde konfigürasyonun sıfırlanması kabul edilebilir.

Ancak gelecekte araç başına ayrı konfigürasyon saklamak istenebilir.

Örnek gelecek yapısı:

    configurationsByVehicle: {
      "fiat-ducato-13m3": { ... },
      "fiat-ducato-15m3": { ... }
    }

Bu yapı ilk prototip için gereksiz yere uygulanmamalıdır.

---

## 30. Veri ve UI Ayrımı

Araç isimleri, malzeme isimleri ve seçenekler mümkün olduğunca veri dosyalarından okunmalıdır.

Aynı bilgiler farklı React bileşenlerine tekrar tekrar yazılmamalıdır.

Amaç:

> Yeni araç veya malzeme eklemek için mümkün olduğunca az UI kodu değiştirmek.

---

## 31. Önerilen Kaynak Dosyaları

Kesin klasör yapısı geliştirme sırasında uygulanmakla birlikte aşağıdaki ayrım hedeflenebilir:

- `src/data/vehicles.ts`
- `src/data/materials.ts`
- `src/data/regions.ts`
- `src/types/vehicle.ts`
- `src/types/material.ts`
- `src/types/configurator.ts`

Dosya sayısı gereksiz yere artırılmamalıdır.

İlk uygulama küçükse ilgili tipler aynı dosyada tutulabilir ve ihtiyaç büyüdükçe ayrılabilir.

---

## 32. Public Asset Yapısı

Üretim varlıkları için önerilen mantık:

- `public/vehicles/`
- `public/materials/`

Araç örneği:

`public/vehicles/fiat/ducato/13m3/`

Malzeme örneği:

`public/materials/marine-plywood/`

---

## 33. Araç Asset Yapısı

Örnek:

    public/
      vehicles/
        fiat/
          ducato/
            13m3/
              base.webp
              overlay.svg

Gerektiğinde ileride ek dosyalar eklenebilir.

Örneğin:

- shadow.webp
- highlights.webp
- metadata.json

Ancak yalnızca ihtiyaç varsa eklenmelidir.

---

## 34. Malzeme Asset Yapısı

Örnek:

    public/
      materials/
        marine-plywood/
          thumb.webp
          texture.webp
        film-faced-plywood/
          thumb.webp
          texture.webp
        mdf/
          thumb.webp
          texture.webp

Diğer malzemeler de aynı standardı takip etmelidir.

---

## 35. Dosya İsimlendirme

Dosya adları:

- küçük harf,
- boşluksuz,
- mümkünse İngilizce,
- tutarlı

olmalıdır.

Dosya yollarında Türkçe karakter kullanılmaması tercih edilir.

Kullanıcı arayüzünde Türkçe isimler kullanılmaya devam eder.

---

## 36. Asset Formatları

Fotoğraf ve texture varlıklarında web için optimize edilmiş formatlar tercih edilmelidir.

Öncelikli seçenek:

- WebP

SVG geometrileri:

- `.svg`

olarak tutulabilir veya uygulama içinde React bileşeni olarak temsil edilebilir.

Hangi yöntem kullanılırsa kullanılsın araçtan bağımsız ortak etkileşim mantığı korunmalıdır.

---

## 37. Gerçek Veri ve Placeholder Ayrımı

Geliştirme sırasında geçici veri kullanılabilir.

Ancak placeholder veri gerçek üretim verisiymiş gibi kalıcı hale getirilmemelidir.

Özellikle:

- araç görselleri,
- SVG geometrileri,
- malzeme texture'ları

onaylanmış gerçek varlıklarla değiştirilmelidir.

---

## 38. Yeni Araç Ekleme

Yeni araç ekleme işlemi mümkün olduğunca şu adımlarla sınırlı olmalıdır:

1. Araç görselini ekle.
2. Araç SVG geometrisini ekle.
3. Araç veri kaydını ekle.
4. Marka/model/hacim ilişkisini tanımla.
5. Test et.

Konfigürasyon motorunun ana kodu yeniden yazılmamalıdır.

---

## 39. Yeni Malzeme Ekleme

Yeni malzeme ekleme işlemi mümkün olduğunca şu adımlarla sınırlı olmalıdır:

1. Thumbnail ekle.
2. Texture ekle.
3. Material ID oluştur.
4. Material veri kaydını ekle.
5. Gerekirse texture ölçeğini ayarla.
6. Test et.

Araç bileşenlerinin kodu yeni malzeme için özel olarak değiştirilmemelidir.

---

## 40. Veri Doğrulama

Her araç kaydında:

- benzersiz ID,
- geçerli marka,
- geçerli model,
- geçerli hacim,
- mevcut base image,
- mevcut SVG/overlay,
- geçerli region listesi

bulunmalıdır.

Her malzeme kaydında:

- benzersiz ID,
- kullanıcı adı,
- thumbnail,
- texture

bulunmalıdır.

---

## 41. Eksik Asset Davranışı

Bir araç veya malzeme asset'i bulunamazsa uygulama tamamen çökmemelidir.

Geliştirme ortamında hata açıkça raporlanmalıdır.

Kullanıcı arayüzünde sade bir hata durumu gösterilebilir.

Eksik asset yerine rastgele başka bir araç veya malzeme kullanılmamalıdır.

---

## 42. Hard-Code Kuralı

Domain verilerinin React bileşenlerinin içine dağınık şekilde hard-code edilmesinden kaçınılmalıdır.

Özellikle şu veriler merkezi tutulmalıdır:

- araç listesi,
- malzeme listesi,
- bölge isimleri,
- bölge kimlikleri.

Görsel düzen değerleri UI bileşenlerinde bulunabilir.

---

## 43. Veri Modeli ve SVG İlişkisi

SVG alt parçaları ile ana region ID'leri arasında açık ilişki bulunmalıdır.

SVG kendi başına malzeme ismi bilmemelidir.

SVG şu soruyu cevaplar:

> Hangi yüzey hangi kaplama grubuna ait?

State sistemi şu soruyu cevaplar:

> Bu kaplama grubuna hangi malzeme atanmış?

Material sistemi şu soruyu cevaplar:

> Bu malzemenin adı ve texture dosyası nedir?

Bu sorumluluklar birbirinden ayrılmalıdır.

---

## 44. Veri Modeli ve UI İlişkisi

Sol araç paneli araç verilerinden oluşturulmalıdır.

Sağ malzeme paneli material verilerinden oluşturulmalıdır.

Orta araç alanı aktif araç verisini ve aktif konfigürasyon state'ini kullanmalıdır.

Bu sayede üç ana UI alanı aynı merkezi veri modeliyle tutarlı çalışır.

---

## 45. İlk Prototip Veri Seti

İlk prototipin çalışması için minimum gerçek veri:

### Araç

FIAT → Ducato → 13 m³

### Bölgeler

- Taban
- Yanlar
- Arka Kapılar
- Teker Üstleri
- Tavan
- Ara Bölme

### Malzemeler

- Kayın-Marin Su Kontrası
- Filmli Kontra Plywood
- Ham MDF
- MDF üzeri Muşamba
- Kontra üzeri Çetalı Alüminyum

Tüm diğer araçlar daha sonra eklenebilir.

---

## 46. İlk Veri Modeli Kabul Testi

Aşağıdaki senaryo veri modeli değiştirilmeden çalışabilmelidir:

1. `fiat-ducato-13m3` aktif araç olur.
2. `marine-plywood` aktif malzeme olur.
3. Kullanıcı `rearDoorLeft` SVG alt parçasına tıklar.
4. Alt parça `rearDoors` grubuna eşlenir.
5. `configuration.rearDoors` değeri `marine-plywood` olur.
6. İki kapı aynı texture'ı gösterir.
7. Kullanıcı `checker-plate-plywood` seçer.
8. `floor` bölgesine tıklar.
9. `configuration.floor` değeri değişir.
10. `configuration.rearDoors` aynı kalır.

Bu senaryo doğru çalışıyorsa temel veri modeli görevini yerine getiriyor kabul edilir.

---

## 47. İlk Sürümde Yapılmayacak Veri Modelleri

İlk sürüm için şu veri yapıları gereksiz yere eklenmemelidir:

- fiyat tabloları,
- stok miktarları,
- müşteri hesapları,
- siparişler,
- teklifler,
- ödeme kayıtları,
- kargo bilgileri,
- bayi sistemi.

Panelvan Studio'nun mevcut kapsamı görsel konfigürasyondur.

---

## 48. Genişletilebilirlik

Veri modeli gelecekte yeni araç ve malzemeleri desteklemelidir.

Ancak gelecekte belki lazım olur düşüncesiyle aşırı soyutlama yapılmamalıdır.

Temel prensip:

> Bugünün ihtiyacını temiz çöz, yarının makul genişlemesini engelleme.

---

## 49. Ana Veri Modeli Kuralı

Panelvan Studio veri modelinin temel prensibi:

> Araç geometrisi, malzeme verisi ve kullanıcı konfigürasyonu birbirinden bağımsız tutulmalıdır.

Bu ayrım yeni araç ve malzeme eklemeyi kolaylaştıracaktır.

---

## 50. Sürüm Geçmişi

### v1.0

İlk resmi Panelvan Studio Data Model sürümü.

Tanımlanan temel konular:

- araç hiyerarşisi,
- araç varyant kimlikleri,
- resmi region ID'leri,
- SVG alt parça eşlemesi,
- resmi malzeme ID'leri,
- material veri yapısı,
- aktif araç ve aktif malzeme state'i,
- bölge konfigürasyonu,
- önerilen asset yapısı,
- yeni araç ve malzeme ekleme prensipleri,
- ilk prototip veri modeli kabul testi.
