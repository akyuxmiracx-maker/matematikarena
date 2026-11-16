/* ===== MatematikArena — 6. Sınıf Müfredatı ===== */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push({
  grade: 6,
  label: "6. Sınıf",
  theme: "#38bdf8",
  topics: [
    {
      id: "g6-1",
      icon: "⚙️",
      title: "Doğal Sayılar ve İşlem Önceliği",
      desc: "Üslü ifadeler, işlem önceliği ve parantez kullanımı",
      lesson: [
        { t: "İşlem Önceliği", d: "Bir ifadede birden fazla işlem varsa sırayla: <b>1) parantez, 2) üslü ifadeler, 3) çarpma-bölme, 4) toplama-çıkarma</b> yapılır." },
        { t: "Parantez", d: "Parantez içindeki ifade önce hesaplanır; ardından parantezin dışı ile işlemlere devam edilir." },
        { t: "Üslü İfade", d: "aⁿ, a sayısının n kez kendisiyle çarpımıdır: 2³ = 2 × 2 × 2 = 8." },
        { t: "Kendi İşlem Önceliği", d: "Aynı öncelikteki işlemler soldan sağa doğru yapılır: 24 ÷ 4 × 2 → önce 24 ÷ 4 = 6, sonra 6 × 2 = 12." },
        { t: "Örnek", d: "3 + 5 × 2 ifadesinde önce çarpma yapılır: 3 + 10 = 13." }
      ],
      questions: [
        { q: "3 + 5 × 2 işleminin sonucu kaçtır?", o: ["13", "16", "10", "20"], a: 0, e: "Önce çarpma: 5 × 2 = 10, sonra 3 + 10 = 13.", d: 1 },
        { q: "(4 + 6) × 3 işleminin sonucu kaçtır?", o: ["30", "18", "13", "36"], a: 0, e: "Önce parantez: 4 + 6 = 10, sonra 10 × 3 = 30.", d: 1 },
        { q: "24 ÷ 4 × 2 işleminin sonucu kaçtır?", o: ["12", "3", "24", "48"], a: 0, e: "Soldan sağa: 24 ÷ 4 = 6, 6 × 2 = 12.", d: 2 },
        { q: "100 − (15 + 5 × 2) işleminin sonucu kaçtır?", o: ["75", "85", "70", "170"], a: 0, e: "Parantez içinde önce çarpma: 5×2=10 → 15+10=25 → 100−25=75.", d: 3 },
        { q: "2³ + 3² işleminin sonucu kaçtır?", o: ["17", "12", "25", "18"], a: 0, e: "2³ = 8, 3² = 9 → 8 + 9 = 17.", d: 2 },
        { q: "50 × 2 − 100 ÷ 4 işleminin sonucu kaçtır?", o: ["75", "100", "50", "25"], a: 0, e: "Çarpma-bölme önce: 100 − 25 = 75.", d: 2 },
        { q: "Aşağıdaki ifadelerden hangisinde sonuç 20 olur?", o: ["(8 − 4) × 5", "8 − 4 × 5", "8 × 4 − 5", "8 + 4 × 5"], a: 0, e: "(8−4) × 5 = 4 × 5 = 20. Diğerleri: −12, 27, 28.", d: 3 }
      ]
    },
    {
      id: "g6-2",
      icon: "🧩",
      title: "Çarpanlar, Katlar ve Bölme İşlemi",
      desc: "Bölünebilme kuralları, EBOB-EKOK ve asal sayılar",
      lesson: [
        { t: "Çarpan ve Kat", d: "Bir sayıyı kalansız bölen sayılara <b>çarpan</b>, bir sayının tam katlarına <b>kat</b> denir. 6'nın çarpanları: 1, 2, 3, 6." },
        { t: "Bölünebilme Kuralları", d: "<b>2:</b> son rakam çift. <b>3:</b> rakamlar toplamı 3'ün katı. <b>5:</b> son rakam 0 veya 5. <b>10:</b> son rakam 0. <b>4:</b> son iki basamak 4'ün katı. <b>9:</b> rakamlar toplamı 9'un katı." },
        { t: "Asal Sayı", d: "1'den büyük, yalnızca 1 ve kendisine bölünebilen doğal sayılardır: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29… (2 tek çift asaldır)" },
        { t: "EBOB", d: "En Büyük Ortak Bölen: verilen sayıların ortak bölenlerinin en büyüğü. Örnek: EBOB(12, 18) = 6." },
        { t: "EKOK", d: "En Küçük Ortak Kat: verilen sayıların ortak katlarının en küçüğü. Örnek: EKOK(6, 9) = 18." }
      ],
      questions: [
        { q: "8 ve 12 sayılarının EBOB'u kaçtır?", o: ["4", "2", "24", "6"], a: 0, e: "Ortak bölenler: 1, 2, 4 → en büyüğü 4.", d: 1 },
        { q: "6 ve 9 sayılarının EKOK'u kaçtır?", o: ["18", "54", "3", "12"], a: 0, e: "6'nın katları: 6,12,18…; 9'un katları: 9,18… → ilk ortak 18.", d: 2 },
        { q: "15 ve 25 sayılarının EBOB'u kaçtır?", o: ["5", "25", "75", "3"], a: 0, e: "Ortak bölenleri: 1, 5 → EBOB = 5.", d: 1 },
        { q: "4 ve 6 sayılarının EKOK'u kaçtır?", o: ["12", "24", "2", "10"], a: 0, e: "4'ün katları: 4, 8, 12…; 6'nın katları: 6, 12… → 12.", d: 2 },
        { q: "Aşağıdakilerden hangisi asal sayıdır?", o: ["29", "21", "27", "33"], a: 0, e: "21 = 3×7, 27 = 3³, 33 = 3×11 → yalnızca 29 asaldır.", d: 1 },
        { q: "Bir sayının 4'e bölünebilmesi için hangi koşulu sağlaması gerekir?", o: ["Son iki basamağının 4'ün katı olması", "Son rakamının çift olması", "Rakamlar toplamının 4'ün katı olması", "Son rakamının 0 olması"], a: 0, e: "4'e bölünebilmede yalnızca son iki basamağa bakılır (örn. 512 → 12 ÷ 4 = 3).", d: 3 },
        { q: "12345 sayısı 3'e bölünebilir mi?", o: ["Evet, çünkü rakamları toplamı 15'tir", "Hayır, çünkü tek sayıdır", "Evet, çünkü 5'tir", "Bölünemez"], a: 0, e: "1+2+3+4+5 = 15, 3'ün katı → 3'e bölünür.", d: 2 },
        { q: "EBOB(12, 18) kaçtır?", o: ["6", "3", "36", "9"], a: 0, e: "Ortak bölenler: 1, 2, 3, 6 → en büyüğü 6.", d: 2 }
      ]
    },
    {
      id: "g6-3",
      icon: "➖",
      title: "Tam Sayılar",
      desc: "Tam sayıların sıralanması, mutlak değer ve toplama-çıkarma",
      lesson: [
        { t: "Tam Sayı Kümesi", d: "Sayı doğrusunda sıfırın solunda <b>negatif</b>, sağında <b>pozitif</b> tam sayılar bulunur. Tam sayılar: …, −3, −2, −1, 0, 1, 2, 3, …" },
        { t: "Mutlak Değer", d: "Bir tam sayının sayı doğrusunda <b>sıfıra olan uzaklığına</b> mutlak değer denir ve | | sembolüyle gösterilir: |−12| = 12. Mutlak değer daima sıfır veya pozitiftir." },
        { t: "Sıralama", d: "Sayı doğrusunda solda olan sayı küçüktür: −10 < −3 < 0 < 2. Negatif sayılarda mutlak değeri büyük olan daha küçüktür (−8 < −5)." },
        { t: "Toplama", d: "Farklı işaretli sayılarda mutlak değerce büyük olanın işareti sonucu belirler ve küçükten çıkarılır: −7 + 3 = −4." },
        { t: "Çıkarma", d: "Çıkarma işlemi, çıkanın işareti değiştirilip toplama yapılır: 5 − (−3) = 5 + 3 = 8." }
      ],
      questions: [
        { q: "−5 + 8 işleminin sonucu kaçtır?", o: ["3", "−3", "13", "−13"], a: 0, e: "İşaretler farklı: 8 − 5 = 3, işareti büyük olan (+) gibi.", d: 1 },
        { q: "−7 − (−3) işleminin sonucu kaçtır?", o: ["−4", "−10", "4", "10"], a: 0, e: "Çıkanın işareti değişir: −7 + 3 = −4.", d: 2 },
        { q: "|−12| ifadesinin değeri kaçtır?", o: ["12", "−12", "0", "1"], a: 0, e: "Mutlak değer sıfıra olan uzaklıktır: 12.", d: 1 },
        { q: "−3, 2, −10, 0 sayıları küçükten büyüğe nasıl sıralanır?", o: ["−10 < −3 < 0 < 2", "2 < 0 < −3 < −10", "−10 < 0 < −3 < 2", "−3 < −10 < 0 < 2"], a: 0, e: "Sayı doğrusunda en solda −10, sonra −3, 0 ve en sağda 2 vardır.", d: 2 },
        { q: "Hangi sayı 0'dan küçüktür?", o: ["−4", "0", "3", "12"], a: 0, e: "Negatif sayılar sıfırdan küçüktür.", d: 1 },
        { q: "5 + (?) = −2 eşitliğinde parantez içine gelmesi gereken sayı kaçtır?", o: ["−7", "7", "−3", "3"], a: 0, e: "−2 − 5 = −7 → 5 + (−7) = −2.", d: 3 },
        { q: "−3,7 sayısının en yakın tam sayıya yuvarlanmış hâli kaçtır?", o: ["−4", "−3", "−3,5", "4"], a: 0, e: "−3,7, −4'e daha yakındır (−3,7 < −3,5).", d: 3 },
        { q: "|−9| + |4| işleminin sonucu kaçtır?", o: ["13", "5", "−5", "−13"], a: 0, e: "9 + 4 = 13.", d: 2 }
      ]
    },
    {
      id: "g6-4",
      icon: "🧁",
      title: "Kesirlerle Toplama ve Çıkarma",
      desc: "Payda eşitleme, tam sayılı kesirler ve sıralama",
      lesson: [
        { t: "Payda Eşitleme", d: "Paydaları farklı kesirlerde işlemler için paydalar ortak kata (EKOK) çekilir: 2/3 + 1/6 → 4/6 + 1/6 = 5/6." },
        { t: "Tam Sayılı Kesir", d: "Bütün ve kesirden oluşan sayılar. 2 1/4 = 9/4. Tam sayılı kesir yanlış kesre çevrilir, işlemler kesirlerle yapılır." },
        { t: "Kesirlerde Çıkarma", d: "Aynı kurallar geçerlidir, payda eşitlendikten sonra paylar çıkarılır: 5/6 − 1/3 = 5/6 − 2/6 = 3/6 = 1/2." },
        { t: "Sonucun Sadeleştirilmesi", d: "Bulunan kesrin pay ve paydası ortak bölenlerine bölünerek en sade hâle getirilir." },
        { t: "Karşılaştırma", d: "Paydalar eşitlenir, sonra paylara bakılır: 2/3, 3/4, 5/6 → 5/6 > 3/4 > 2/3." }
      ],
      questions: [
        { q: "2/3 + 1/6 işleminin sonucu kaçtır?", o: ["5/6", "3/9", "3/6", "5/9"], a: 0, e: "2/3 = 4/6 → 4/6 + 1/6 = 5/6.", d: 2 },
        { q: "5/6 − 1/3 işleminin sonucu kaçtır?", o: ["1/2", "3/3", "4/3", "2/6"], a: 0, e: "1/3 = 2/6 → 5/6 − 2/6 = 3/6 = 1/2.", d: 2 },
        { q: "1/4 + 2/5 işleminin sonucu kaçtır?", o: ["13/20", "3/9", "3/20", "8/20"], a: 0, e: "Payda 20: 5/20 + 8/20 = 13/20.", d: 2 },
        { q: "3/8 + 5/12 işleminin sonucu kaçtır?", o: ["19/24", "8/20", "11/24", "8/24"], a: 0, e: "Payda 24: 9/24 + 10/24 = 19/24.", d: 3 },
        { q: "1 − 5/8 işleminin sonucu kaçtır?", o: ["3/8", "5/8", "4/8", "6/8"], a: 0, e: "1 = 8/8 → 8/8 − 5/8 = 3/8.", d: 1 },
        { q: "2/5 + 3/10 işleminin sonucu kaçtır?", o: ["7/10", "5/15", "6/10", "5/10"], a: 0, e: "2/5 = 4/10 → 4/10 + 3/10 = 7/10.", d: 2 },
        { q: "3/4 − 1/8 işleminin sonucu kaçtır?", o: ["5/8", "2/4", "4/8", "3/8"], a: 0, e: "3/4 = 6/8 → 6/8 − 1/8 = 5/8.", d: 2 }
      ]
    },
    {
      id: "g6-5",
      icon: "🔤",
      title: "Cebirsel İfadeler",
      desc: "Değişkenli ifadeler, yerine koyma ve ifade kurma",
      lesson: [
        { t: "Cebirsel İfade", d: "En az bir bilinmeyen (değişken) içeren ifadelerdir: 3x + 5, 2a − 1, x/2." },
        { t: "Değişken ve Katsayı", d: "3x + 5 ifadesinde değişken x, katsayı 3, sabit terim 5'tir." },
        { t: "Yerine Koyma", d: "Değişkenin değeri verildiğinde ifadeye yerine konularak sonuç bulunur: x = 4 ise 3x − 2 = 3×4 − 2 = 10." },
        { t: "Kelime İfadelerini Cebirleştirmek", d: "«Bir sayının 3 katının 5 fazlası» → 3x + 5. «Bir sayının yarısı» → x/2." },
        { t: "Karesi ve Küpü", d: "«Bir sayının kendisiyle çarpımı» x², «üç kez kendisiyle çarpımı» x³ olarak yazılır." }
      ],
      questions: [
        { q: "«x'in 3 katı artı 5» ifadesinin cebirsel gösterimi hangisidir?", o: ["3x + 5", "x + 8", "3(x + 5)", "5x + 3"], a: 0, e: "3 kat → 3x, artı 5 → +5.", d: 1 },
        { q: "«Bir sayının yarısı» ifadesinin cebirsel gösterimi hangisidir?", o: ["x/2", "x + 2", "2x", "x − 2"], a: 0, e: "Yarısı demek 2'ye bölmek demektir: x/2.", d: 1 },
        { q: "a'nın 2 katının 5 fazlası hangi ifadedir?", o: ["2a + 5", "a + 7", "5a + 2", "2(a + 5)"], a: 0, e: "2a + 5.", d: 1 },
        { q: "x = 4 için 3x − 2 ifadesinin değeri kaçtır?", o: ["10", "12", "14", "8"], a: 0, e: "3 × 4 − 2 = 12 − 2 = 10.", d: 1 },
        { q: "5 ile bir sayının toplamının yarısı hangi ifadedir?", o: ["(5 + x)/2", "5 + x/2", "5x/2", "(5 + x) × 2"], a: 0, e: "Önce toplam (5+x), sonra yarısı → (5 + x)/2.", d: 3 },
        { q: "x = 3, y = 2 için 2x + y ifadesinin değeri kaçtır?", o: ["8", "7", "12", "5"], a: 0, e: "2 × 3 + 2 = 6 + 2 = 8.", d: 2 },
        { q: "«Bir sayının karesinin 4 fazlası» hangi ifadedir?", o: ["x² + 4", "x + 4²", "4x²", "(x + 4)²"], a: 0, e: "Karesi x², 4 fazlası → x² + 4.", d: 2 }
      ]
    },
    {
      id: "g6-6",
      icon: "∠",
      title: "Açılar",
      desc: "Tümler, bütünler, dikey ve komşu açılar",
      lesson: [
        { t: "Dik ve Doğru Açı", d: "90°'lik açı <b>dik</b>, 180°'lik açı <b>doğru</b> açıdır. Bir tam tur 360°'dir." },
        { t: "Tümler Açılar", d: "Ölçüleri toplamı 90° olan iki açıdır. Örnek: 30° ve 60°." },
        { t: "Bütünler Açılar", d: "Ölçüleri toplamı 180° olan iki açıdır. Örnek: 110° ve 70°." },
        { t: "Dikey Açılar", d: "Kesişen iki doğrunun karşılıklı oluşan açılarıdır ve <b>birbirine eşittir</b>." },
        { t: "Komşu Açılar", d: "Bir kenar ve bir köşeleri ortak olan açılardır. Komşu bütünler açılar bir doğru oluşturur." },
        { t: "Derece, Dakika", d: "1° = 60', 60° = 1 tam açı, 90° = 1/4 dönme, 180° = yarım tur." }
      ],
      questions: [
        { q: "30° ve 60° açıları birbirine göre hangi ilişkidedir?", o: ["Tümlerdir", "Bütünlerdir", "Dikeydir", "Eşittir"], a: 0, e: "30 + 60 = 90 → tümler açılar.", d: 1 },
        { q: "Dik açının ölçüsü kaç derecedir?", o: ["90°", "180°", "60°", "45°"], a: 0, e: "Dik açı 90°'dir.", d: 1 },
        { q: "Tümler iki açıdan biri 35° ise diğeri kaç derecedir?", o: ["55°", "145°", "65°", "45°"], a: 0, e: "90 − 35 = 55°.", d: 1 },
        { q: "Bütünler iki açıdan biri 110° ise diğeri kaç derecedir?", o: ["70°", "80°", "270°", "110°"], a: 0, e: "180 − 110 = 70°.", d: 2 },
        { q: "Dikey açılardan biri 48° ise diğerinin ölçüsü kaç derecedir?", o: ["48°", "132°", "42°", "90°"], a: 0, e: "Dikey açılar eşittir: 48°.", d: 2 },
        { q: "1/4 dönme kaç derecedir?", o: ["90°", "45°", "180°", "60°"], a: 0, e: "360 ÷ 4 = 90°.", d: 1 },
        { q: "Bir doğru üzerindeki açıların ölçüleri toplamı kaç derecedir?", o: ["180°", "90°", "360°", "270°"], a: 0, e: "Doğru açı 180°'dir.", d: 1 },
        { q: "Ölçüleri 25° ve 65° olan komşu iki açı ne şekilde ilişkilidir?", o: ["Hem komşu hem tümlerdir", "Yalnızca bütünlerdir", "Dikey açılardır", "Eşit açılarla"], a: 0, e: "Ortak kenarları var (komşu) ve toplamları 90 (tümler).", d: 3 }
      ]
    },
    {
      id: "g6-7",
      icon: "🔺",
      title: "Üçgenler ve Alan Ölçme",
      desc: "Üçgen çeşitleri, üçgen ve dörtgenlerin alanı",
      lesson: [
        { t: "Üçgenin Alanı", d: "Üçgenin alanı, taban ile yüksekliğin çarpımının yarısıdır: <b>A = (taban × yükseklik) ÷ 2</b>." },
        { t: "Taban ve Yükseklik", d: "Bir kenar taban alınabilir; karşı köşeden bu kenara inen dik uzunluk yüksekliktir." },
        { t: "Üçgen Çeşitleri", d: "Kenarlarına göre eşkenar, ikizkenar, çokkenar. Açılarına göre dar açılı, dik açılı, geniş açılı üçgen." },
        { t: "Alan Problemleri", d: "Alan veya yükseklik istenirse formül tersine çevrilir: yükseklik = (2 × alan) ÷ taban." },
        { t: "Dörtgenlerin Alanı", d: "Dikdörtgen: a × b. Kare: a². Paralelkenar: taban × yükseklik." }
      ],
      questions: [
        { q: "Tabanı 10 cm, yüksekliği 6 cm olan üçgenin alanı kaç cm²'dir?", o: ["30", "60", "16", "36"], a: 0, e: "A = (10 × 6) ÷ 2 = 30 cm².", d: 1 },
        { q: "Tabanı 8 cm, yüksekliği 5 cm olan dik üçgenin alanı kaç cm²'dir?", o: ["20", "40", "13", "24"], a: 0, e: "(8 × 5) ÷ 2 = 20 cm².", d: 1 },
        { q: "Kenarı 12 cm olan karenin alanı kaç cm²'dir?", o: ["144", "48", "24", "12"], a: 0, e: "12 × 12 = 144 cm².", d: 1 },
        { q: "Alanı 48 cm², tabanı 8 cm olan üçgenin yüksekliği kaç cm'dir?", o: ["12", "6", "4", "8"], a: 0, e: "A = (t × h)/2 → 48 = (8 × h)/2 → h = 96/8 = 12 cm.", d: 3 },
        { q: "Alanı 56 cm², genişliği 7 cm olan dikdörtgenin uzunluğu kaç cm'dir?", o: ["8", "7", "49", "14"], a: 0, e: "56 ÷ 7 = 8 cm.", d: 2 },
        { q: "Alanı 30 cm², tabanı 10 cm olan üçgenin yüksekliği kaç cm'dir?", o: ["6", "3", "5", "12"], a: 0, e: "30 = (10 × h)/2 → h = 60/10 = 6 cm.", d: 2 },
        { q: "Kenarları 6 cm, 6 cm, 6 cm olan üçgen hangi çeşittir?", o: ["Eşkenar", "İkizkenar", "Çokkenar", "Dik"], a: 0, e: "Üç kenarı da eşit olduğundan eşkenar üçgendir.", d: 1 }
      ]
    },
    {
      id: "g6-8",
      icon: "🎲",
      title: "Oran, Olasılık ve Veri",
      desc: "Oran kurma, olasılık ve grafiklerle veri analizi",
      lesson: [
        { t: "Oran Nedir?", d: "İki çokluğun birbirine oranıdır. a:b veya a/b biçiminde yazılır; oranlar sadeleştirilebilir (12:18 = 2:3)." },
        { t: "Oran Problemleri", d: "İki kişilik paya bölünür: 2:3 oranı ve toplam 25 ise birinci için 10, ikinci için 15." },
        { t: "Olasılık", d: "İstenen durumun tüm durumlar içindeki oranı: P = İstenen durum sayısı ÷ Tüm durum sayısı." },
        { t: "Örnek Olasılıklar", d: "Yazı-tura: 1/2. Zar atma: 1/6. Bir torbada 3 kırmızı 7 mavi varsa kırmızı gelme olasılığı 3/10." },
        { t: "Veri Grafikleri", d: "Veriler sütun grafiğiyle karşılaştırılır; ortalamalar ve sıklıklar yorumlanır." }
      ],
      questions: [
        { q: "2:3 oranının toplamı 25 olan bir tutara dağıtımında küçük pay kaçtır?", o: ["10", "8", "12", "15"], a: 0, e: "2+3 = 5, 25 ÷ 5 = 5 → 2 × 5 = 10.", d: 2 },
        { q: "Bir torbada 3 kırmızı, 7 mavi top vardır. Rastgele çekilen topun kırmızı olma olasılığı kaçtır?", o: ["3/10", "7/10", "3/7", "1/3"], a: 0, e: "İstenen 3, tümü 10 → 3/10.", d: 1 },
        { q: "Yazı-tura atışında tura gelme olasılığı kaçtır?", o: ["1/2", "1/4", "1/3", "2/3"], a: 0, e: "2 eşit durumdan biri → 1/2.", d: 1 },
        { q: "Bir zar atıldığında üst yüze 3 gelme olasılığı kaçtır?", o: ["1/6", "1/3", "3/6", "1/2"], a: 0, e: "6 eşit durumdan biri → 1/6.", d: 1 },
        { q: "2 kalem 10 TL ise 5 kalem kaç TL olur? (doğru orantı)", o: ["25 TL", "20 TL", "30 TL", "15 TL"], a: 0, e: "1 kalem 5 TL → 5 × 5 = 25 TL.", d: 2 },
        { q: "4, 4, 6, 10 veri grubunun aritmetik ortalaması kaçtır?", o: ["6", "5", "7", "8"], a: 0, e: "24 ÷ 4 = 6.", d: 1 },
        { q: "1, 2, 3, 4, 5 sayılarından biri seçilirse çift sayı gelme olasılığı kaçtır?", o: ["2/5", "1/5", "3/5", "1/2"], a: 0, e: "Çift sayılar 2 ve 4 → 2/5.", d: 2 },
        { q: "Sınıfta 12 kız, 18 erkek vardır. Kız:erkek oranı en sade biçimde nedir?", o: ["2:3", "12:18", "3:2", "6:9"], a: 0, e: "12:18 → 6'e böl → 2:3.", d: 2 }
      ]
    }
  ]
});
