/* ===== MatematikArena — 7. Sınıf Müfredatı ===== */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push({
  grade: 7,
  label: "7. Sınıf",
  theme: "#a855f7",
  topics: [
    {
      id: "g7-1",
      icon: "✖️",
      title: "Tam Sayılarla İşlemler",
      desc: "Çarpma, bölme ve işlem önceliği",
      lesson: [
        { t: "Çarpma İşlemi", d: "Aynı işaretli sayıların çarpımı <b>pozitif</b>, farklı işaretlilerin çarpımı <b>negatiftir</b>. Örnek: −4 × 5 = −20, −6 × (−3) = 18." },
        { t: "Bölme İşlemi", d: "Çarpma kuralı aynen geçerlidir: −12 ÷ 4 = −3, −15 ÷ (−3) = 5." },
        { t: "İşaret Sayısı", d: "(+) × (+) = +, (−) × (−) = +, (+) × (−) = −." },
        { t: "İşlem Önceliği", d: "Parantez → üslü ifadeler → çarpma/bölme → toplama/çıkarma. Örnek: −2 − 5 × (−3) = −2 + 15 = 13." },
        { t: "Kesirlerle İşlemler", d: "Tam sayılar kesir hâline getirilip işlemler yapılır: −3/4 + 1/4 = −2/4 = −1/2." }
      ],
      questions: [
        { q: "−4 × 5 işleminin sonucu kaçtır?", o: ["−20", "20", "−9", "1"], a: 0, e: "Farklı işaretli çarpma negatiftir: −20.", d: 1 },
        { q: "−6 × (−3) işleminin sonucu kaçtır?", o: ["18", "−18", "−9", "9"], a: 0, e: "Aynı işaretli çarpma pozitiftir: 18.", d: 1 },
        { q: "(−12) ÷ 4 işleminin sonucu kaçtır?", o: ["−3", "3", "−8", "8"], a: 0, e: "Farklı işaret → negatif: −12 ÷ 4 = −3.", d: 1 },
        { q: "−2 − 5 × (−3) işleminin sonucu kaçtır?", o: ["13", "−17", "−13", "17"], a: 0, e: "Önce çarpma: 5×(−3) = −15 → −2 − (−15) = −2 + 15 = 13.", d: 3 },
        { q: "(−8) + 3 − (−5) işleminin sonucu kaçtır?", o: ["0", "−16", "−10", "16"], a: 0, e: "−8 + 3 + 5 = 0.", d: 2 },
        { q: "(−15) ÷ (−3) × 2 işleminin sonucu kaçtır?", o: ["10", "−10", "5", "−5"], a: 0, e: "(−15)÷(−3) = 5, 5 × 2 = 10.", d: 2 },
        { q: "3 × (−2) + 4 × (−1) işleminin sonucu kaçtır?", o: ["−10", "10", "−2", "2"], a: 0, e: "−6 + (−4) = −10.", d: 2 }
      ]
    },
    {
      id: "g7-2",
      icon: "frac",
      title: "Rasyonel Sayılar",
      desc: "Rasyonel sayılarla toplama, çıkarma, çarpma ve bölme",
      lesson: [
        { t: "Rasyonel Sayı", d: "a/b (b ≠ 0) biçiminde yazılabilen tüm sayılardır. Tam sayılar ve kesirler de rasyoneldir." },
        { t: "Toplama ve Çıkarma", d: "Paydalar eşitlenir, paylar toplanır/çıkarılır. Farklı işaretlilerde: 1/2 − (−1/3) = 1/2 + 1/3 = 5/6." },
        { t: "Çarpma", d: "Paylar birbiriyle, paydalar birbiriyle çarpılır, sonuç sadeleştirilir: −2/5 × 3/4 = −6/20 = −3/10." },
        { t: "Bölme", d: "Bölen kesrin <b>çarpmaya</b> çevrilmesiyle yapılır (tersi ile çarpılır): 3/4 ÷ 1/2 = 3/4 × 2/1 = 3/2." },
        { t: "Sıralama", d: "Negatif rasyonel sayılar pozitiflerden küçüktür; negatiflerde mutlak değeri büyük olan daha küçüktür." }
      ],
      questions: [
        { q: "−3/4 + 1/4 işleminin sonucu kaçtır?", o: ["−1/2", "−2/4'ten küçük", "2/4", "−4/8"], a: 0, e: "(−3 + 1)/4 = −2/4 = −1/2.", d: 1 },
        { q: "1/2 − (−1/3) işleminin sonucu kaçtır?", o: ["5/6", "1/6", "−5/6", "3/5"], a: 0, e: "Çıkanın işareti değişir: 1/2 + 1/3 = 3/6 + 2/6 = 5/6.", d: 2 },
        { q: "−2/5 × 3/4 işleminin sonucu kaçtır?", o: ["−3/10", "−6/9", "3/10", "−1/20"], a: 0, e: "Paylar: −2×3 = −6, paydalar: 5×4 = 20 → −6/20 = −3/10.", d: 2 },
        { q: "3/4 ÷ 1/2 işleminin sonucu kaçtır?", o: ["3/2", "3/8", "2/3", "8/3"], a: 0, e: "3/4 × 2/1 = 6/4 = 3/2.", d: 2 },
        { q: "−5/6 + 1/6 işleminin sonucu kaçtır?", o: ["−2/3", "−4/6'dan küçük", "4/6", "−6/6"], a: 0, e: "(−5 + 1)/6 = −4/6 = −2/3.", d: 1 },
        { q: "Aşağıdaki rasyonel sayılardan hangisi en küçüktür?", o: ["−3/4", "−1/2", "1/2", "0,75"], a: 0, e: "Negatiflerden mutlak değeri en büyük olan en küçüktür: −0,75 < −0,5.", d: 3 },
        { q: "2/3 × (−9/4) işleminin sonucu kaçtır?", o: ["−3/2", "3/2", "−18/12'den farklı", "−1/6"], a: 0, e: "(2×(−9))/(3×4) = −18/12 = −3/2.", d: 3 }
      ]
    },
    {
      id: "g7-3",
      icon: "⚖️",
      title: "Oran ve Orantı",
      desc: "Doğru orantı, ters orantı ve orantı problemleri",
      lesson: [
        { t: "Oran", d: "İki çokluğun birbirine oranıdır; sadeleştirilir: 12:18 = 2:3." },
        { t: "Doğru Orantı", d: "İki çokluk artarken/diğeri de artıyor ve oranları sabit kalıyorsa <b>doğru orantı</b> vardır: x/y = k." },
        { t: "Ters Orantı", d: "Biri artarken diğeri azalıyorsa <b>ters orantı</b> vardır: x × y = k. Örnek: süre–işçi sayısı." },
        { t: "Orantıdan Değer Bulma", d: "x/5 = 12/20 → 20x = 60 → x = 3." },
        { t: "Ölçek ve Harita", d: "1 : 100 000 ölçekli haritada 5 cm, gerçekte 500 000 cm = 5 km'dir." }
      ],
      questions: [
        { q: "4 kalem 12 TL ise 10 kalem kaç TL olur? (doğru orantı)", o: ["30 TL", "25 TL", "40 TL", "35 TL"], a: 0, e: "1 kalem 3 TL → 10 × 3 = 30 TL.", d: 1 },
        { q: "3 işçi bir işi 8 saatte bitiriyor. Aynı işi 4 işçi kaç saatte bitirir?", o: ["6 saat", "12 saat", "4 saat", "10 saat"], a: 0, e: "İş miktarı 3×8 = 24 işçi-saat → 24 ÷ 4 = 6 saat (ters orantı).", d: 3 },
        { q: "12 : 18 oranının en sade biçimi nedir?", o: ["2 : 3", "3 : 2", "4 : 6", "6 : 9"], a: 0, e: "İkisi de 6'ya bölünür: 2:3.", d: 1 },
        { q: "6 : n = 10 : 25 oranında n kaçtır?", o: ["15", "12", "18", "25"], a: 0, e: "6/n = 10/25 = 2/5 → 2n = 30 → n = 15.", d: 3 },
        { q: "x/5 = 12/20 oranında x kaçtır?", o: ["3", "4", "6", "5"], a: 0, e: "20x = 60 → x = 3.", d: 2 },
        { q: "1 : 100 000 ölçekli haritada 5 cm gerçek hayatta kaç km'dir?", o: ["5 km", "50 km", "500 m", "1 km"], a: 0, e: "5 × 100 000 = 500 000 cm = 5 km.", d: 3 },
        { q: "Aşağıdakilerden hangisi ters orantı örneğidir?", o: ["Hız ve süre", "Uzunluk ve süre", "Miktar ve fiyat", "Boy ve kilo"], a: 0, e: "Hız arttıkça süre azalır (hız × süre = yol).", d: 2 }
      ]
    },
    {
      id: "g7-4",
      icon: "％",
      title: "Yüzdesel Problemler",
      desc: "Yüzde hesaplama, artış-azalış, kar-zarar",
      lesson: [
        { t: "Yüzde Hesaplama", d: "Sayı × oran ÷ 100. 150'in %20'si = 30." },
        { t: "Ters Yüzde", d: "«Bir sayının %40'ı 60 ise sayı = 60 ÷ 40 × 100 = 150.»" },
        { t: "Zam ve İndirim", d: "Yeni fiyat = eski fiyat × (100 + zam)/100. İndirimde: × (100 − indirim)/100." },
        { t: "Kar-Zarar", d: "Kar = satış − alış; kar yüzdesi = (kar ÷ alış) × 100." },
        { t: "Basit Faiz", d: "Faiz = anapara × süre × faiz oranı ÷ 100." }
      ],
      questions: [
        { q: "150 sayısının %20'si kaçtır?", o: ["30", "25", "35", "20"], a: 0, e: "150 × 20 ÷ 100 = 30.", d: 1 },
        { q: "60 sayısının %150'si kaçtır?", o: ["90", "75", "100", "80"], a: 0, e: "60 × 150 ÷ 100 = 90.", d: 2 },
        { q: "48 sayısının %25'i kaçtır?", o: ["12", "16", "24", "10"], a: 0, e: "%25 = 1/4 → 48 ÷ 4 = 12.", d: 1 },
        { q: "Bir sayının %40'ı 60 ise sayı kaçtır?", o: ["150", "160", "140", "240"], a: 0, e: "60 ÷ 40 × 100 = 150.", d: 3 },
        { q: "240 TL'lik eşya %10 zamlanırsa yeni fiyat kaç TL olur?", o: ["264 TL", "250 TL", "260 TL", "244 TL"], a: 0, e: "Zam 24 TL → 240 + 24 = 264 TL.", d: 2 },
        { q: "200 TL'lik ürüne %15 indirim yapılırsa ödenen tutar kaç TL olur?", o: ["170 TL", "175 TL", "180 TL", "165 TL"], a: 0, e: "İndirim 30 TL → 200 − 30 = 170 TL.", d: 2 },
        { q: "80 sayısının %12,5'i kaçtır?", o: ["10", "12", "15", "8"], a: 0, e: "%12,5 = 1/8 → 80 ÷ 8 = 10.", d: 3 }
      ]
    },
    {
      id: "g7-5",
      icon: "x=",
      title: "Cebirsel İfadeler ve Denklem Kurma",
      desc: "Çarpma-bölme, denklem çözme ve problem kurma",
      lesson: [
        { t: "Dağılma Özelliği", d: "a(b + c) = ab + ac. Örnek: 3(x + 4) = 3x + 12." },
        { t: "Denklem Çözme", d: "Bilinmeyenin yalnız kaldığı eşitlikte eşitliğin iki tarafına aynı işlem uygulanır: 2x − 5 = 11 → 2x = 16 → x = 8." },
        { t: "Benzer Terimler", d: "5x − 2x = 3x gibi aynı değişkenli terimler birleştirilir." },
        { t: "Problem Kurma", d: "Bilinmeyene x denir, cümledeki ilişki cebirle yazılır ve denklem çözülür." },
        { t: "İki Bilinmeyenli", d: "«İki sayıların toplamı 30, biri diğerinin 2 katı» → x + 2x = 30 → x = 10, büyük olan 20." }
      ],
      questions: [
        { q: "3(x + 4) ifadesinin açılımı hangisidir?", o: ["3x + 12", "3x + 4", "x + 12", "3x + 7"], a: 0, e: "Dağılma: 3·x + 3·4 = 3x + 12.", d: 1 },
        { q: "2x − 5 = 11 denkleminin çözümü kaçtır?", o: ["8", "6", "16", "3"], a: 0, e: "2x = 16 → x = 8.", d: 1 },
        { q: "x/3 + 2 = 6 denkleminin çözümü kaçtır?", o: ["12", "9", "6", "4"], a: 0, e: "x/3 = 4 → x = 12.", d: 2 },
        { q: "«Bir sayının 3 katının 7 fazlası 22» denklemi hangisidir?", o: ["3x + 7 = 22", "3(x + 7) = 22", "7x + 3 = 22", "3x − 7 = 22"], a: 0, e: "3 katı 3x, 7 fazlası → 3x + 7 = 22.", d: 2 },
        { q: "5x − 2x = 18 denkleminin çözümü kaçtır?", o: ["6", "3", "18", "10"], a: 0, e: "3x = 18 → x = 6.", d: 2 },
        { q: "Ardışık iki doğal sayının toplamı 41 ise küçüğü kaçtır?", o: ["20", "21", "19", "22"], a: 0, e: "x + (x+1) = 41 → 2x = 40 → x = 20.", d: 3 },
        { q: "4(x − 1) = 12 denkleminin çözümü kaçtır?", o: ["4", "3", "2", "6"], a: 0, e: "x − 1 = 3 → x = 4.", d: 2 },
        { q: "A + B = 30 ve A = 2B ise A kaçtır?", o: ["20", "10", "15", "25"], a: 0, e: "2B + B = 30 → 3B = 30 → B = 10, A = 20.", d: 3 }
      ]
    },
    {
      id: "g7-6",
      icon: "⟂",
      title: "Doğrular ve Açılar",
      desc: "Paralel doğrular, kesen ve açı ilişkileri",
      lesson: [
        { t: "Dik Kesişim", d: "İki doğru dik kesişirse dört açının ölçüleri de 90°'dir." },
        { t: "Paralel Doğruları Kesen", d: "Aynı düzlemde birbirine paralel iki doğrunun üzerinden geçen kesen, ilgili açıları eşitler." },
        { t: "İç Ters Açılar", d: "Kesenin oluşturduğu iç ters açılar birbirine <b>eşittir</b>." },
        { t: "Aynı Yönlü İç Açılar", d: "Aynı yönlü iç açıların ölçüleri toplamı <b>180°</b>'dir." },
        { t: "Karşılıklı Açılar", d: "Kesişen doğrularda karşılıklı oluşan açılar eşittir." },
        { t: "Komşu Bütünler", d: "Bir doğru üzerindeki komşu iki açının toplamı 180°'dir (bütünler).", }
      ],
      questions: [
        { q: "Birbirine paralel iki doğuyu kesen doğru, iç ters açılara ne yapar?", o: ["Eşitler", "Toplamlarını 90 yapar", "Hiçbir şey yapmaz", "180 yapar"], a: 0, e: "İç ters açılar eşittir.", d: 1 },
        { q: "Dik kesişen iki doğrunun oluşturduğu açı kaç derecedir?", o: ["90°", "60°", "180°", "45°"], a: 0, e: "Dik kesişimde açılar 90°'dir.", d: 1 },
        { q: "Tümler komşu iki açıdan biri 40° ise diğeri kaç derecedir?", o: ["50°", "140°", "40°", "130°"], a: 0, e: "Toplamları 90° → 90 − 40 = 50°.", d: 2 },
        { q: "Bir doğru üzerindeki komşu iki açı hangi ilişkidedir?", o: ["Bütünlerdir (toplamları 180°)", "Tümlerdir (toplamları 90°)", "Eşittir", "Dikeydir"], a: 0, e: "Doğru açı 180° olduğundan toplamları 180°'dir.", d: 2 },
        { q: "Paralel iki doğruyu kesen doğruyun aynı yönlü iç açılarının toplamı kaç derecedir?", o: ["180°", "90°", "360°", "Eşittir"], a: 0, e: "Aynı yönlü iç açılar bütünlerdir: toplamları 180°.", d: 3 },
        { q: "Kesişen iki doğrunun karşılıklı açıları için ne söylenebilir?", o: ["Eşittir", "Toplamları 180'dir", "Tümlerdir", "Diktir"], a: 0, e: "Karşılıklı açılar eşittir.", d: 1 },
        { q: "Ölçüleri 125° ve 55° olan iki açı hangi ilişkidedir?", o: ["Bütünlerdir", "Tümlerdir", "Eşit açılar", "Komşu değildir"], a: 0, e: "125 + 55 = 180 → bütünler açılar.", d: 2 }
      ]
    },
    {
      id: "g7-7",
      icon: "⬟",
      title: "Çokgenler ve Çember",
      desc: "İç-dış açılar, çevre ve daire alanları",
      lesson: [
        { t: "İç Açılar Toplamı", d: "n kenarlı çokgenin iç açıları toplamı <b>(n − 2) × 180°</b>'dir. Beşgen: 540°." },
        { t: "Düzgün Çokgen", d: "Tüm kenar ve açıları eşit çokgendir. Bir iç açı = (n − 2) × 180° ÷ n. Altıgen: 120°." },
        { t: "Dış Açılara Toplamı", d: "Herhangi bir çokgenin dış açıları toplamı <b>360°</b>'dir. Düzgün beşgende bir dış açı = 360 ÷ 5 = 72°." },
        { t: "Çember Çevresi", d: "C = 2 × π × r. r = 7 ise (π = 22/7) C = 44." },
        { t: "Daire Alanı", d: "A = π × r². r = 5, π = 3 ise A = 75." }
      ],
      questions: [
        { q: "Beşgenin iç açılarının ölçüleri toplamı kaç derecedir?", o: ["540°", "360°", "720°", "180°"], a: 0, e: "(5 − 2) × 180 = 540°.", d: 1 },
        { q: "Düzgün altıgenin bir iç açısı kaç derecedir?", o: ["120°", "108°", "135°", "144°"], a: 0, e: "(6−2)×180 ÷ 6 = 720 ÷ 6 = 120°.", d: 2 },
        { q: "Herhangi bir çokgenin dış açılarının ölçüleri toplamı kaç derecedir?", o: ["360°", "180°", "540°", "720°"], a: 0, e: "Dış açılar toplamı her zaman 360°'dir.", d: 1 },
        { q: "Düzgün beşgenin bir dış açısı kaç derecedir?", o: ["72°", "108°", "60°", "90°"], a: 0, e: "360 ÷ 5 = 72°.", d: 2 },
        { q: "Yarıçapı 7 cm olan çemberin çevresi kaç cm'dir? (π = 22/7)", o: ["44", "22", "49", "154"], a: 0, e: "C = 2 × 22/7 × 7 = 44 cm.", d: 2 },
        { q: "Yarıçapı 5 cm olan dairesel alanın alanı kaç cm²'dir? (π = 3)", o: ["75", "50", "25", "150"], a: 0, e: "A = 3 × 25 = 75 cm².", d: 2 },
        { q: "Çevresi 40 cm olan karenin bir kenarı kaç cm'dir?", o: ["10", "16", "20", "8"], a: 0, e: "40 ÷ 4 = 10 cm.", d: 1 },
        { q: "12 kenarlı düzgün çokgenin bir dış açısı kaç derecedir?", o: ["30°", "36°", "150°", "45°"], a: 0, e: "360 ÷ 12 = 30°.", d: 3 }
      ]
    },
    {
      id: "g7-8",
      icon: "📈",
      title: "Veri Analizi",
      desc: "Ortalama, medyan, mod, açıklık ve grafik yorumlama",
      lesson: [
        { t: "Aritmetik Ortalama", d: "Verilerin toplamı ÷ veri sayısı. Ortalama 12 olan 6 verinin toplamı 12 × 6 = 72'dir." },
        { t: "Medyan", d: "Sıralı verinin ortadaki değeri; veri sayısı çiftse ortadaki iki sayının ortalamasıdır." },
        { t: "Mod ve Açıklık", d: "Mod: en çok tekrar eden değer. Açıklık: en büyük − en küçük veri." },
        { t: "Dağılımın Yorumu", d: "Aralık büyükse veriler dağınıktır; küçükse ortalamaya yakın toplanmıştır." },
        { t: "Grafikler", d: "Sütun, çizgi ve daire grafikleri verilerin karşılaştırılmasını ve zaman içindeki değişimini gösterir." }
      ],
      questions: [
        { q: "3, 5, 5, 7, 10 veri grubunun medyanı kaçtır?", o: ["5", "6", "7", "5,5"], a: 0, e: "Sıralı veride ortadaki değer 5'tir.", d: 1 },
        { q: "2, 3, 3, 3, 9 veri grubunda mod ve açıklık kaçtır?", o: ["3 ve 7", "3 ve 6", "9 ve 7", "2 ve 7"], a: 0, e: "Mod 3 (en çok tekrar), açıklık = 9 − 2 = 7.", d: 2 },
        { q: "4, 8, 12, 16 veri grubunun aritmetik ortalaması kaçtır?", o: ["10", "12", "8", "16"], a: 0, e: "40 ÷ 4 = 10.", d: 1 },
        { q: "10, 20, 30, 40, 100 veri grubunun açıklığı kaçtır?", o: ["90", "80", "100", "40"], a: 0, e: "100 − 10 = 90.", d: 2 },
        { q: "Ortalaması 12 olan 6 sayıdan oluşan bir veri grubunun toplamı kaçtır?", o: ["72", "18", "6", "144"], a: 0, e: "Toplam = ortalama × veri sayısı = 12 × 6 = 72.", d: 2 },
        { q: "5, 5, 6, 6, 9, 9 veri grubunun medyanı kaçtır?", o: ["6", "5", "6,5", "7"], a: 0, e: "Çift veride ortadaki iki değerin ortalaması: (6+6)/2 = 6.", d: 3 },
        { q: "12, 18, 7, 10, 20 veri grubunun medyanı kaçtır?", o: ["12", "10", "18", "14"], a: 0, e: "Sıralama: 7, 10, 12, 18, 20 → ortadaki 12.", d: 2 }
      ]
    }
  ]
});
