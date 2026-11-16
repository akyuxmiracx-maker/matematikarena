/* ===== MatematikArena — 5. Sınıf Müfredatı ===== */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push({
  grade: 5,
  label: "5. Sınıf",
  theme: "#22c55e",
  topics: [
    {
      id: "g5-1",
      icon: "🔢",
      title: "Doğal Sayılar",
      desc: "Sayıları okuma, yazma, basamak değeri, karşılaştırma ve yuvarlama",
      lesson: [
        { t: "Basamak Kavramı", d: "Bir doğal sayıda rakamlar sağdan sola doğru <b>birler, onlar, yüzler, binler, on binler, yüz binler, milyonlar</b> basamaklarında yer alır. Her basamağın değeri, rakamın değeri ile basamağın adının çarpımıdır." },
        { t: "Basamak Değeri", d: "62 485 sayısında 4 rakamı yüzler basamağındadır, yani basamak değeri 4 × 100 = <b>400</b>'dür. Rakamın kendisine ise <b>rakam değeri</b> denir (4)." },
        { t: "Sayıları Okuma ve Yazma", d: "Sayılar üçerli gruplara (bölük) ayrılır: 4 507 203 → «dört milyon beş yüz yedi bin iki yüz üç»." },
        { t: "Karşılaştırma", d: "İki doğal sayı karşılaştırılırken önce <b>basamak sayısı</b> fazla olan büyük sayılır. Basamak sayısı eşitse soldan itibaren rakamlar karşılaştırılır." },
        { t: "Yuvarlama", d: "Yuvarlanacak basamağın sağındaki rakama bakılır: 0-4 ise sayı aynen kalır, 5-9 ise bir artırılır." }
      ],
      questions: [
        { q: "4 507 203 sayısının binler basamağındaki rakam kaçtır?", o: ["7", "2", "5", "3"], a: 0, e: "4|507|203 → binler bölüğü 507'dir, binler basamağındaki rakam 7'dir.", d: 1 },
        { q: "«Beş yüz otuz bin kırk beş» sayısının yazılışı hangisidir?", o: ["530 045", "53 045", "530 450", "503 045"], a: 0, e: "530 bin → yüzbinler 5, onbinler 3, binler 0; kırk beş → onlar 4, birler 5.", d: 2 },
        { q: "0, 3, 6, 8, 9 rakamlarının her biri bir kez kullanılarak yazılacak EN BÜYÜK beş basamaklı doğal sayı hangisidir?", o: ["98 630", "98 603", "96 830", "93 860"], a: 0, e: "En büyük basamak solda olmalıdır: en büyük rakam 9, sonra 8, 6, 3, 0 → 98 630.", d: 2 },
        { q: "3 456 789 ve 3 456 879 sayılarından hangisi küçüktür?", o: ["3 456 789", "3 456 879", "İkisi eşittir", "Belli olmaz"], a: 0, e: "Basamak sayıları eşit; yüzler basamağında 7 < 8 olduğundan 3 456 789 küçüktür.", d: 1 },
        { q: "62 485 sayısında 4 rakamının basamak değeri kaçtır?", o: ["400", "40", "4", "4 000"], a: 0, e: "4, yüzler basamağındadır: 4 × 100 = 400.", d: 1 },
        { q: "4 678 sayısı en yakın yüzlüğe yuvarlanırsa hangi sayıyı buluruz?", o: ["4 700", "4 600", "5 000", "4 680"], a: 0, e: "Yüzler basamağı 6'dır, sağında 7 var (≥5) → 6 artar, 4 700 olur.", d: 2 },
        { q: "999 999 + 1 işleminin sonucu kaçtır?", o: ["1 000 000", "999 1 000", "100 000", "99 999"], a: 0, e: "999 999'a 1 eklenince birler basamağı taşar ve basamak sayısı artar → 1 000 000.", d: 1 }
      ]
    },
    {
      id: "g5-2",
      icon: "🍕",
      title: "Kesirler",
      desc: "Kesir çeşitleri, denk kesirler, sıralama ve kesirlerle toplama-çıkarma",
      lesson: [
        { t: "Kesir Nedir?", d: "Bir bütünün eş parçalarından bir veya birkaçını gösteren sayılara <b>kesir</b> denir. k/n kesrinde n ≠ 0 olmalıdır." },
        { t: "Kesir Çeşitleri", d: "Payı paydasından küçük olan <b>basit</b>, eşit olan <b>birim</b>, payı paydasından büyük olan <b>yanlış</b> kesirlerdir. Bir bütünün yarısından küçük olan kesirlere <b>proper</b> (kısmi) kesir de denir." },
        { t: "Denk Kesir", d: "Aynı büyüklüğü gösteren farklı kesirlere denk kesir denir. 1/2 = 2/4 = 4/8. Bir kesrin pay ve paydası aynı sayı ile çarpılırsa değeri değişmez." },
        { t: "Sıralama", d: "Payları eşit kesirlerde paydası küçük olan daha büyüktür (1/2 > 1/4). Paydaları eşitse payı büyük olan büyüktür (3/5 > 2/5)." },
        { t: "Toplama ve Çıkarma", d: "Paydaları eşit kesirlerde paylar toplanır/çıkarılır, payda aynı kalır: 3/4 + 1/4 = 4/4 = 1. Paydaları farklıysa önce <b>payda eşitleme</b> yapılır." }
      ],
      questions: [
        { q: "3/4 + 1/4 işleminin sonucu kaçtır?", o: ["1", "4/8", "3/8", "4/4'ten büyük"], a: 0, e: "Paydalar eşit: (3+1)/4 = 4/4 = 1.", d: 1 },
        { q: "5/8 − 2/8 işleminin sonucu kaçtır?", o: ["3/8", "3/16", "7/8", "3/0"], a: 0, e: "Paydalar eşit: (5−2)/8 = 3/8.", d: 1 },
        { q: "Hangisi daha büyüktür?", o: ["2/3", "3/5", "İkisi eşittir", "Belli olmaz"], a: 0, e: "2/3 ≈ 0,667 ve 3/5 = 0,6 olduğundan 2/3 daha büyüktür.", d: 2 },
        { q: "1/2 = ?/8 eşitliğinde soru işareti yerine gelmesi gereken sayı kaçtır?", o: ["4", "3", "6", "2"], a: 0, e: "Pay ve payda 4 ile çarpıldı: 1/2 = 4/8.", d: 1 },
        { q: "3/9 kesrinin en sade hâli hangisidir?", o: ["1/3", "3/6", "1/2", "Sadeleşmez"], a: 0, e: "Pay ve payda 3'e bölünür: 3/9 = 1/3.", d: 1 },
        { q: "Bir pizzanın 2/5'i yendikten sonra 1/5'i daha yenirse pizza kaçta kaç yenmiş olur?", o: ["3/5", "3/10", "2/5", "4/5"], a: 0, e: "2/5 + 1/5 = 3/5.", d: 1 },
        { q: "1/2, 2/5, 3/10 kesirleri büyükten küçüğe sıralanışı hangisidir?", o: ["1/2 > 2/5 > 3/10", "3/10 > 2/5 > 1/2", "2/5 > 1/2 > 3/10", "1/2 > 3/10 > 2/5"], a: 0, e: "Paydalar 10'da eşitlenirse: 5/10 > 4/10 > 3/10.", d: 2 }
      ]
    },
    {
      id: "g5-3",
      icon: "💵",
      title: "Ondalık Sayılar",
      desc: "Ondalık sayıları okuma, karşılaştırma ve dört işlem",
      lesson: [
        { t: "Ondalık Kısmı", d: "Ondalık sayılar <b>birler noktası</b> ile ayrılır: virgülden önce birler basamağı, virgülden sonra <b>onda birler, yüzde birler, binde birler</b> basamakları gelir." },
        { t: "Okunuş", d: "5,47 → «beş virgül kırk yedi». Ondalık kısımdaki rakamlar basamak adlarıyla tek tek okunur." },
        { t: "Karşılaştırma", d: "Önce tam kısımlar, eşitse sırasıyla onda birler, yüzde birler basamakları karşılaştırılır: 0,9 > 0,89 (0,90 > 0,89)." },
        { t: "Dört İşlem", d: "Toplama-çıkarmada virgüller alt alta getirilir. Çarpma-bölmede virgüller yok sayılır, işlem sonucunda virgül geri konur." },
        { t: "Yuvarlama", d: "Tam sayıya yuvarlarken bakılan basamağın sağındaki rakama göre karar verilir (0-4: aynen, 5-9: bir artır)." }
      ],
      questions: [
        { q: "5,47 sayısının okunuşu hangisidir?", o: ["Beş virgül kırk yedi", "Beş kırk yedi", "Elli virgül dört yedi", "Beş yüz kırk yedi"], a: 0, e: "Tam kısım 5, ondalık kısım 47 → «beş virgül kırk yedi».", d: 1 },
        { q: "3,6 + 2,75 işleminin sonucu kaçtır?", o: ["6,35", "5,41", "6,11", "5,35"], a: 0, e: "Virgüller alt alta: 3,60 + 2,75 = 6,35.", d: 2 },
        { q: "12,5 − 4,8 işleminin sonucu kaçtır?", o: ["7,7", "8,3", "6,7", "7,3"], a: 0, e: "12,5 − 4,8 = 7,7 (125 − 48 = 77, virgül bir basamak geri).", d: 2 },
        { q: "0,9 sayısı ile 0,89 sayısı arasındaki ilişki hangisidir?", o: ["0,9 > 0,89", "0,9 < 0,89", "Eşittir", "Karşılaştırılamaz"], a: 0, e: "0,9 = 0,90 olduğundan 0,90 > 0,89.", d: 2 },
        { q: "2,5 × 4 işleminin sonucu kaçtır?", o: ["10", "8", "6,5", "12"], a: 0, e: "25 × 4 = 100, virgül bir basamak → 10,0 = 10.", d: 1 },
        { q: "7,2 ÷ 9 işleminin sonucu kaçtır?", o: ["0,8", "0,08", "8", "1,8"], a: 0, e: "72 ÷ 9 = 8, sonucu 0,8 (birler noktasından sonra bir rakam).", d: 2 },
        { q: "4,56 sayısı birler basamağına (tam sayıya) yaklaştırılırsa hangi sayıyı buluruz?", o: ["5", "4", "4,6", "6"], a: 0, e: "Onda birler basamağı 5 ve daha büyük olduğundan birler basamağı 1 artırılır → 5.", d: 1 }
      ]
    },
    {
      id: "g5-4",
      icon: "％",
      title: "Yüzdeler",
      desc: "Yüzde kavramı, yüzde hesaplama ve indirim problemleri",
      lesson: [
        { t: "Yüzde Nedir?", d: "«Yüzde» her zaman paydası <b>100</b> olan kesirlerdir. %20 = 20/100 = 0,2 = 1/5." },
        { t: "Bir Sayının Yüzdesini Bulma", d: "Sayı × yüzde ÷ 100. Örneğin 200'ün %15'i: 200 × 15 ÷ 100 = 30." },
        { t: "Kaçta Kaç Olduğunu Yüzdeye Çevirme", d: "Kesir önce ondalığa, sonra 100 ile çarpılır: 1/4 = 0,25 → %25." },
        { t: "Tam Sayılı Yüzde", d: "%150 gibi 100'den büyük yüzdeler, sayının kendisinden büyük bölümleri gösterir (50'nin %150'si = 75)." },
        { t: "İndirim Problemleri", d: "İndirim miktarı = fiyat × indirim yüzdesi ÷ 100. Ödenecek tutar = fiyat − indirim." }
      ],
      questions: [
        { q: "50 sayısının %20'si kaçtır?", o: ["10", "5", "20", "25"], a: 0, e: "50 × 20 ÷ 100 = 10.", d: 1 },
        { q: "200 sayısının %15'i kaçtır?", o: ["30", "15", "20", "35"], a: 0, e: "200 × 15 ÷ 100 = 30.", d: 1 },
        { q: "80 sayısının %25'i kaçtır?", o: ["20", "25", "40", "15"], a: 0, e: "%25 = 1/4 → 80 ÷ 4 = 20.", d: 1 },
        { q: "60 sayısının %40'ı kaçtır?", o: ["24", "16", "30", "40"], a: 0, e: "60 × 40 ÷ 100 = 24.", d: 2 },
        { q: "80 TL'lik bir eşyaya %25 indirim yapılırsa ödenmesi gereken tutar kaç TL olur?", o: ["60 TL", "55 TL", "65 TL", "20 TL"], a: 0, e: "İndirim: 80 × 25/100 = 20 TL → 80 − 20 = 60 TL.", d: 2 },
        { q: "40 kişilik bir sınıfın %60'ı kız ise sınıfta kaç kız öğrenci vardır?", o: ["24", "20", "16", "26"], a: 0, e: "40 × 60 ÷ 100 = 24.", d: 2 },
        { q: "240 sayısının %5'i kaçtır?", o: ["12", "10", "24", "15"], a: 0, e: "240 × 5 ÷ 100 = 12.", d: 1 }
      ]
    },
    {
      id: "g5-5",
      icon: "📏",
      title: "Temel Geometrik Kavramlar",
      desc: "Doğru, doğru parçası, ışın, açı çeşitleri ve ölçme",
      lesson: [
        { t: "Doğru, Doğru Parçası, Işın", d: "<b>Doğru</b> iki ucu da olmayan, sonsuza uzanan düz çizgidir. <b>Doğru parçasının</b> iki uç noktası vardır. <b>Işının</b> bir başlangıç noktası vardır, diğer yönde sonsuza uzanır." },
        { t: "Açı Nedir?", d: "Başlangıç noktaları aynı olan iki ışının oluşturduğu şekle açı denir. Açılar <b>açı ölçeri</b> ile derece (°) cinsinden ölçülür." },
        { t: "Açı Çeşitleri", d: "<b>Dik açı</b> 90°, <b>dar açı</b> 0°-90°, <b>geniş açı</b> 90°-180°, <b>doğru açı</b> 180°'dir." },
        { t: "Tümler ve Bütünler Açılar", d: "Toplamları 90° olan iki açıya <b>tümler</b>, toplamları 180° olan iki açıya <b>bütünler</b> açı denir." },
        { t: "Noktaya Paralel Doğrular", d: "Aynı düzlemde kesişmeyen, aralarındaki uzaklık her noktada eşit olan doğrulara paralel doğru denir." }
      ],
      questions: [
        { q: "Bir doğru parçasının kaç ucu vardır?", o: ["2", "1", "0", "Sonsuz"], a: 0, e: "Doğru parçasının iki uç noktası vardır.", d: 1 },
        { q: "Bir ışının hangi özelliği vardır?", o: ["Bir başlangıç noktası vardır", "İki ucu vardır", "Hiç noktası yoktur", "Sonsuz başlangıç noktası vardır"], a: 0, e: "Işının bir başlangıç noktası vardır, diğer yönde sonsuza uzanır.", d: 1 },
        { q: "90°'lik açıya ne ad verilir?", o: ["Dik açı", "Dar açı", "Geniş açı", "Doğru açı"], a: 0, e: "Ölçüsü tam 90° olan açı dik açıdır.", d: 1 },
        { q: "180° ölçüsündeki açıya ne ad verilir?", o: ["Doğru açı", "Dik açı", "Tam açı", "Dar açı"], a: 0, e: "Doğru üzerindeki açının ölçüsü 180°'dir.", d: 1 },
        { q: "Açılar hangi araçla ölçülür?", o: ["Açı ölçeri", "Cetvel", "Pergel", "Silgi"], a: 0, e: "Açıların ölçüsü açı ölçeri (iletki) ile bulunur.", d: 1 },
        { q: "Tümler iki açının ölçüleri toplamı kaç derecedir?", o: ["90°", "180°", "360°", "45°"], a: 0, e: "Tümler açıların toplamı 90°'dir.", d: 1 },
        { q: "Komşu iki açıda ortak olan nedir?", o: ["Bir kenar ve bir köşe", "Sadece bir köşe", "Sadece bir kenar", "Hiçbir şey"], a: 0, e: "Komşu açıların bir kenarı ve bir köşeleri ortaktır.", d: 2 },
        { q: "Bir açının ölçüsü 35° ise tümlerinin ölçüsü kaç derece olur?", o: ["55°", "45°", "145°", "65°"], a: 0, e: "90° − 35° = 55°.", d: 2 }
      ]
    },
    {
      id: "g5-6",
      icon: "📐",
      title: "Üçgenler ve Dörtgenler",
      desc: "Üçgen çeşitleri, kare, dikdörtgen ve alan kavramı",
      lesson: [
        { t: "Üçgen Çeşitleri", d: "Kenar uzunluklarına göre: <b>eşkenar</b> (3 kenar eşit), <b>ikizkenar</b> (2 kenar eşit), <b>çokkenar</b> (farklı). Açılarına göre: <b>dar açılı, dik açılı, geniş açılı</b> üçgen." },
        { t: "Dik Üçgen", d: "Bir açısı 90° olan üçgendir. Dik üçgenin <b>hipotenüsü</b>, dik açının karşısındaki en uzun kenardır." },
        { t: "Dörtgenler", d: "Dört kenarı ve dört köşesi olan çokgendir. <b>Kare</b> 4 kenarı eşit, <b>dikdörtgen</b> karşılıklı kenarları eşit olan dörtgendir." },
        { t: "Alan Nedir?", d: "Bir şeklin kapladığı yüzeyin ölçüsüdür; birimleri cm², m² gibi kare birimlerdir." },
        { t: "Alan Formülleri", d: "Karenin alanı = kenar × kenar. Dikdörtgenin alanı = uzunluk × genişlik." }
      ],
      questions: [
        { q: "İç açıları 60°, 60°, 60° olan üçgen hangisidir?", o: ["Eşkenar üçgen", "Dik üçgen", "İkizkenar üçgen", "Geniş açılı üçgen"], a: 0, e: "Tüm açıları eşit olan üçgenin tüm kenarları da eşittir (eşkenar).", d: 1 },
        { q: "Tabanı 6 cm, yüksekliği 4 cm olan dikdörtgenin alanı kaç cm²'dir?", o: ["24", "20", "10", "48"], a: 0, e: "Alan = 6 × 4 = 24 cm².", d: 1 },
        { q: "Kenarı 7 cm olan karenin çevresi kaç cm'dir?", o: ["28", "49", "14", "21"], a: 0, e: "Çevre = 4 × kenar = 4 × 7 = 28 cm.", d: 1 },
        { q: "Uzun kenarı 12 cm, kısa kenarı 5 cm olan dikdörtgenin çevresi kaç cm'dir?", o: ["34", "60", "30", "25"], a: 0, e: "Çevre = 2 × (12 + 5) = 2 × 17 = 34 cm.", d: 2 },
        { q: "Bir üçgenin en fazla kaç dik açısı olabilir?", o: ["1", "2", "3", "0"], a: 0, e: "Üçgenin iç açıları toplamı 180° olduğundan en fazla bir dik açı olabilir.", d: 3 },
        { q: "Alanı 24 cm², tabanı 6 cm olan dikdörtgenin yüksekliği kaç cm'dir?", o: ["4", "6", "3", "18"], a: 0, e: "Yükseklik = alan ÷ taban = 24 ÷ 6 = 4 cm.", d: 2 },
        { q: "Kenar uzunlukları 5 cm, 5 cm ve 8 cm olan üçgen hangi çeşittir?", o: ["İkizkenar", "Eşkenar", "Çokkenar", "Dik"], a: 0, e: "İki kenarı eşit (5 = 5) olduğundan ikizkenar üçgendir.", d: 1 }
      ]
    },
    {
      id: "g5-7",
      icon: "🛣️",
      title: "Uzunluk ve Alan Ölçme",
      desc: "Uzunluk birimleri, çevre, alan ve birim dönüşümleri",
      lesson: [
        { t: "Uzunluk Birimleri", d: "1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm, 1 km = 100 000 cm." },
        { t: "Çevre", d: "Bir şeklin sınırlarını oluşturan noktaların uzunluğudur. Karenin çevresi = 4 × kenar; dikdörtgenin çevresi = 2 × (uzunluk + genişlik)." },
        { t: "Alan", d: "Kare = a × a, dikdörtgen = a × b. Alan birimi kare birimdir (cm², m²)." },
        { t: "Birim Çevirme", d: "Büyük birimden küçüğe geçerken çarpılır (5 km = 5000 m), küçükten büyüğe geçerken bölünür (250 cm = 2,5 m)." },
        { t: "Problemler", d: "Bahçe çevresi, serpme (kapatma) problemlerinde önce hangi ölçünün istendiği belirlenir; karışık birimler tek birime çevrilir." }
      ],
      questions: [
        { q: "3 km kaç metredir?", o: ["3000 m", "300 m", "30 m", "30 000 m"], a: 0, e: "1 km = 1000 m → 3 × 1000 = 3000 m.", d: 1 },
        { q: "1 metre kaç santimetredir?", o: ["100 cm", "10 cm", "1000 cm", "50 cm"], a: 0, e: "1 m = 100 cm.", d: 1 },
        { q: "250 cm kaç metredir?", o: ["2,5 m", "25 m", "0,25 m", "250 m"], a: 0, e: "100 cm = 1 m → 250 ÷ 100 = 2,5 m.", d: 2 },
        { q: "5 km 200 m birlikte kaç metredir?", o: ["5200 m", "5020 m", "520 m", "700 m"], a: 0, e: "5 km = 5000 m, 5000 + 200 = 5200 m.", d: 2 },
        { q: "Kenarı 9 cm olan karenin alanı kaç cm²'dir?", o: ["81", "36", "18", "9"], a: 0, e: "Alan = 9 × 9 = 81 cm².", d: 1 },
        { q: "7 km 500 m ile 2 km 250 m toplanırsa sonuç kaç km kaç metredir?", o: ["9 km 750 m", "9 km 250 m", "7 km 750 m", "5 km 250 m"], a: 0, e: "7 + 2 = 9 km, 500 + 250 = 750 m → 9 km 750 m.", d: 2 },
        { q: "Alanı 36 cm², yüksekliği 4 cm olan dikdörtgenin tabanı kaç cm'dir?", o: ["9", "12", "6", "40"], a: 0, e: "Taban = alan ÷ yükseklik = 36 ÷ 4 = 9 cm.", d: 2 }
      ]
    },
    {
      id: "g5-8",
      icon: "📊",
      title: "Veri Toplama ve Değerlendirme",
      desc: "Sıklık tablosu, sütun grafiği, ortalama, mod ve medyan",
      lesson: [
        { t: "Veri ve Sıklık", d: "Bir araştırma sonucunda elde edilen bilgilere <b>veri</b>, bir verinin tekrar sayısına <b>sıklık</b> denir. Sıklıklar <b>sıklık tablosu</b> halinde gösterilir." },
        { t: "Grafik Türleri", d: "Veriler sütun grafiği, çizgi grafiği, daire (pasta) grafiği ile görselleştirilir. Sütun grafiğinde sütunun yüksekliği sıklığı gösterir." },
        { t: "Aritmetik Ortalama", d: "Verilerin toplamının veri sayısına bölünmesiyle bulunur: Ortalama = Verilerin toplamı ÷ Veri sayısı." },
        { t: "Mod (Yağışlı Sayı)", d: "Bir veri grubunda <b>en çok tekrar eden</b> veridir. Birden fazla olabilir." },
        { t: "Medyan (Ortanca)", d: "Veriler küçükten büyüğe sıralanır; ortada kalan değerdir. Veri sayısı çiftse ortadaki ikisinin ortalaması alınır." }
      ],
      questions: [
        { q: "3, 5, 7, 5, 9 veri grubunun modu kaçtır?", o: ["5", "7", "6", "9"], a: 0, e: "5 iki kez tekrar ettiği için mod 5'tir.", d: 1 },
        { q: "2, 4, 6, 8, 10 veri grubunun aritmetik ortalaması kaçtır?", o: ["6", "5", "7", "8"], a: 0, e: "(2+4+6+8+10) ÷ 5 = 30 ÷ 5 = 6.", d: 1 },
        { q: "4, 7, 7, 9, 12 veri grubunun medyanı kaçtır?", o: ["7", "8", "6", "9"], a: 0, e: "Sıralı veride ortadaki (3.) değer 7'dir.", d: 2 },
        { q: "Bir kırtasiyede Pazartesi 12, Salı 20, Çarşamba 15 kalem satılmıştır. En çok satış hangi gün yapılmıştır?", o: ["Salı", "Pazartesi", "Çarşamba", "Hepsi eşit"], a: 0, e: "En yüksek sıklık 20 olduğundan Salı en çok satış yapılan gündür.", d: 1 },
        { q: "10, 12, 15, 20, 30 veri grubunun aralığı kaçtır?", o: ["20", "17", "25", "10"], a: 0, e: "Aralık = en büyük − en küçük = 30 − 10 = 20.", d: 2 },
        { q: "70, 80, 90 notları alan bir öğrencinin not ortalaması kaçtır?", o: ["80", "75", "85", "90"], a: 0, e: "(70+80+90) ÷ 3 = 240 ÷ 3 = 80.", d: 1 },
        { q: "Bir veri grubunda en çok tekrar eden veriye ne denir?", o: ["Mod", "Medyan", "Aritmetik ortalama", "Aralık"], a: 0, e: "En çok tekrar eden veri moddur.", d: 1 }
      ]
    }
  ]
});
