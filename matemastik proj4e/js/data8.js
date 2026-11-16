/* ===== MatematikArena — 8. Sınıf Müfredatı ===== */
window.CURRICULUM = window.CURRICULUM || [];
window.CURRICULUM.push({
  grade: 8,
  label: "8. Sınıf",
  theme: "#f59e0b",
  topics: [
    {
      id: "g8-1",
      icon: "🧩",
      title: "Çarpanlar, Katlar ve Asal Çarpanlar",
      desc: "Bölünebilme, EBOB-EKOK ve asal çarpanlara ayırma",
      lesson: [
        { t: "Asal Çarpanlara Ayırma", d: "Bir doğal sayı, asal çarpanlarının çarpımı olarak yazılır: 60 = 2² × 3 × 5." },
        { t: "Bölünebilme", d: "<b>4:</b> son iki basamak 4'ün katı. <b>8:</b> son üç basamak 8'in katı. <b>9:</b> rakamlar toplamı 9'un katı. <b>11:</b> rakamların sağdan solda değişen toplamlarının farkı 11'in katı." },
        { t: "EBOB ve EKOK", d: "İki sayı için asal çarpanlar kullanılır: EBOB'da ortak asal çarpanların <b>en küçük</b>, EKOK'ta tüm çarpanların <b>en büyük</b> üslü değerleri çarpılır." },
        { t: "Üç Sayılı EKOK", d: "EKOK(8, 12, 18): 8 = 2³, 12 = 2²×3, 18 = 2×3² → 2³ × 3² = 72." },
        { t: "Aralıkta Asal Sayı", d: "12 ile 60 arasında olan asal sayılar: 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59 (12 tanedir)." }
      ],
      questions: [
        { q: "60 sayısının asal çarpanlara ayrılmış hâli hangisidir?", o: ["2² × 3 × 5", "2 × 3 × 10", "3 × 4 × 5", "2³ × 15"], a: 0, e: "60 = 2 × 30 = 2² × 15 = 2² × 3 × 5.", d: 2 },
        { q: "EBOB(24, 36) kaçtır?", o: ["12", "6", "72", "4"], a: 0, e: "24 = 2³×3, 36 = 2²×3² → ortak: 2²×3 = 12.", d: 2 },
        { q: "EKOK(4, 6) kaçtır?", o: ["12", "24", "2", "10"], a: 0, e: "4 = 2², 6 = 2×3 → 2²×3 = 12.", d: 1 },
        { q: "90 sayısının asal çarpanlara ayrılmış hâli hangisidir?", o: ["2 × 3² × 5", "2 × 3 × 15", "3² × 10", "2 × 45"], a: 0, e: "90 = 2 × 45 = 2 × 3² × 5.", d: 2 },
        { q: "EBOB(16, 24) kaçtır?", o: ["8", "4", "48", "2"], a: 0, e: "16 = 2⁴, 24 = 2³×3 → ortak 2³ = 8.", d: 2 },
        { q: "Bir sayının 9'a bölünebilmesi için ne gerekir?", o: ["Rakamları toplamının 9'un katı olması", "Son rakamının 9 olması", "Çift sayı olması", "Çift basamaklı olması"], a: 0, e: "9'a bölünebilmede rakamların toplamı 9'un katı olmalıdır.", d: 2 },
        { q: "12 ile 60 arasındaki asal sayılar kaç tanedir?", o: ["12", "13", "11", "10"], a: 0, e: "13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59 → 12 tane.", d: 3 },
        { q: "EKOK(8, 12, 18) kaçtır?", o: ["72", "144", "36", "24"], a: 0, e: "8 = 2³, 12 = 2²×3, 18 = 2×3² → 2³×3² = 72.", d: 3 }
      ]
    },
    {
      id: "g8-2",
      icon: "ⁿ",
      title: "Üslü İfadeler",
      desc: "Üs kuralları, negatif üsler ve ondalık üslü ifadeler",
      lesson: [
        { t: "Üs Nedir?", d: "aⁿ, a'nın n kez kendisiyle çarpımıdır. 2⁵ = 32." },
        { t: "Üslü İfadelerde Çarpma", d: "Tabanlar eşitse üsler toplanır: 3³ × 3² = 3⁵ = 243." },
        { t: "Bölme", d: "aᵐ ÷ aⁿ = aᵐ⁻ⁿ. Tabanlar aynı kalır, üsler çıkarılır." },
        { t: "Üslü İfadenin Kuvveti", d: "(aᵐ)ⁿ = aᵐˣⁿ → (2³)² = 2⁶ = 64." },
        { t: "Negatif ve Sıfır Üs", d: "a⁰ = 1 (a ≠ 0), a⁻ⁿ = 1/aⁿ → 10⁻² = 0,01." },
        { t: "Dağılma", d: "(a + b)ⁿ açılımında üslü ifadeler çarpanlara ayrılır; 2⁴ × 5² = 16 × 25 = 400." }
      ],
      questions: [
        { q: "2⁵ ifadesinin değeri kaçtır?", o: ["32", "16", "64", "10"], a: 0, e: "2×2×2×2×2 = 32.", d: 1 },
        { q: "3³ × 3² işleminin sonucu hangisidir?", o: ["3⁵ = 243", "3⁶ = 729", "9⁵", "3⁵ = 125"], a: 0, e: "Tabanlar aynı: üsler toplanır 3+2 = 5 → 243.", d: 2 },
        { q: "5⁰ ifadesinin değeri kaçtır?", o: ["1", "0", "5", "Tanımsız"], a: 0, e: "Sıfır dışı her sayının sıfırıncı kuvveti 1'dir.", d: 1 },
        { q: "(2³)² ifadesinin değeri kaçtır?", o: ["64", "32", "128", "16"], a: 0, e: "(aᵐ)ⁿ = aᵐˣⁿ → 2⁶ = 64.", d: 2 },
        { q: "10⁻² ifadesinin değeri kaçtır?", o: ["0,01", "−20", "0,1", "−0,01"], a: 0, e: "10⁻² = 1/10² = 1/100 = 0,01.", d: 3 },
        { q: "2⁴ × 5² işleminin sonucu kaçtır?", o: ["400", "200", "1000", "800"], a: 0, e: "16 × 25 = 400.", d: 2 },
        { q: "(1/2)³ ifadesinin değeri kaçtır?", o: ["1/8", "1/6", "3/2", "1/2"], a: 0, e: "(1/2)³ = 1/8.", d: 1 },
        { q: "4² + 3² işleminin sonucu kaçtır?", o: ["25", "49", "14", "12"], a: 0, e: "16 + 9 = 25.", d: 1 }
      ]
    },
    {
      id: "g8-3",
      icon: "√",
      title: "Kareköklü İfadeler",
      desc: "Kök çekme, sadeleştirme ve kareköklü ifadelerle işlemler",
      lesson: [
        { t: "Karekök", d: "√a, a sayısının karesi kök içindeki sayıya eşit olan pozitif sayıdır: √144 = 12." },
        { t: "Kök İçindeki Çarpma", d: "√(a × b) = √a × √b → √50 = √(25 × 2) = 5√2." },
        { t: "Çarpma ve Bölme", d: "Kök dışındakiler birbiriyle, kök içindekiler birbiriyle çarpılır: 3√2 × 2√2 = 6 × 2 = 12." },
        { t: "Toplama-Çıkarma", d: "Yalnız <b>kök içleri eşit</b> ifadeler toplanıp çıkarılır: √18 + √8 = 3√2 + 2√2 = 5√2." },
        { t: "Yaklaşık Değer", d: "√40 için 6² = 36, 7² = 49 → √40 ≈ 6,3 yani en yakın tam sayı 6." }
      ],
      questions: [
        { q: "√144 ifadesinin değeri kaçtır?", o: ["12", "14", "11", "144"], a: 0, e: "12² = 144.", d: 1 },
        { q: "√81 ÷ √16 işleminin sonucu kaçtır?", o: ["9/4", "2,25'ten farklı", "5", "3/2"], a: 0, e: "9 ÷ 4 = 9/4 (≈ 2,25).", d: 2 },
        { q: "√50 ifadesinin en sade hâli hangisidir?", o: ["5√2", "2√5", "√25", "10√5"], a: 0, e: "√50 = √(25×2) = 5√2.", d: 2 },
        { q: "√2 × √8 işleminin sonucu kaçtır?", o: ["4", "16", "√10", "10"], a: 0, e: "√(2×8) = √16 = 4.", d: 2 },
        { q: "(√5)² ifadesinin değeri kaçtır?", o: ["5", "√5", "25", "10"], a: 0, e: "Kök ve kare birbirini götürür: 5.", d: 1 },
        { q: "√18 + √8 işleminin sonucu kaçtır?", o: ["5√2", "√26", "4√2", "3√2"], a: 0, e: "3√2 + 2√2 = 5√2.", d: 3 },
        { q: "3√2 × 2√2 işleminin sonucu kaçtır?", o: ["12", "6√2", "6", "36"], a: 0, e: "3 × 2 × √2 × √2 = 6 × 2 = 12.", d: 3 },
        { q: "√40 sayısının en yakın tam sayıya yuvarlanmış hâli kaçtır?", o: ["6", "7", "5", "8"], a: 0, e: "36 < 40 < 49 → 6,3 civarı → en yakın tam sayı 6.", d: 2 }
      ]
    },
    {
      id: "g8-4",
      icon: "📊",
      title: "Veri Analizi ve Olasılık",
      desc: "Açıklık, merkezî eğilim ve olasılık hesaplama",
      lesson: [
        { t: "Merkezî Eğilim", d: "Ortalama, medyan ve mod verilerin orta noktasını gösterir." },
        { t: "Açıklık", d: "En büyük veriden en küçük verinin çıkarılmasıyla bulunur; verilerin yayılımını gösterir." },
        { t: "Olasılık Hesabı", d: "P = İstenen durum sayısı ÷ Tüm olası durum sayısı." },
        { t: "İki Zar", d: "İki zar atıldığında 36 olası durum vardır; toplamı 7 yapan 6 durum vardır → P = 6/36 = 1/6." },
        { t: "Asal Sayı Seçimi", d: "1'den 20'ye kadar 8 asal sayı vardır → P(asal) = 8/20 = 2/5." }
      ],
      questions: [
        { q: "4, 7, 9, 12, 15 veri grubunun açıklığı kaçtır?", o: ["11", "10", "9", "15"], a: 0, e: "15 − 4 = 11.", d: 1 },
        { q: "2, 4, 4, 6, 8, 10 veri grubunda mod ve medyan kaçtır?", o: ["4 ve 5", "4 ve 6", "6 ve 5", "5 ve 5"], a: 0, e: "Mod 4; sıralı veride ortadaki ikisinin ortalaması (4+6)/2 = 5.", d: 3 },
        { q: "Bir zar atıldığında üst yüze 5 gelme olasılığı kaçtır?", o: ["1/6", "1/5", "5/6", "1/3"], a: 0, e: "6 eşit durumdan biri → 1/6.", d: 1 },
        { q: "Bir torbada 5 beyaz, 15 siyah top vardır. Çekilen topun beyaz olma olasılığı kaçtır?", o: ["1/4", "5/15", "1/3", "15/20"], a: 0, e: "5/20 = 1/4.", d: 2 },
        { q: "İki zar atıldığında toplamlarının 7 olma olasılığı kaçtır?", o: ["1/6", "1/9", "1/12", "6/12"], a: 0, e: "36 durumdan 6'sı (1-6, 2-5, 3-4, 4-3, 5-2, 6-1) → 6/36 = 1/6.", d: 3 },
        { q: "1'den 20'ye kadar olan sayılar içinden rastgele seçilen sayının asal olma olasılığı kaçtır?", o: ["2/5", "1/4", "3/10", "1/5"], a: 0, e: "8 asal sayı var → 8/20 = 2/5.", d: 3 },
        { q: "10, 20, 30, 40 veri grubunun ortalaması kaçtır?", o: ["25", "30", "20", "100"], a: 0, e: "100 ÷ 4 = 25.", d: 1 },
        { q: "Bir madenî para atıldığında yazı gelme olasılığı kaçtır?", o: ["1/2", "1/4", "1/3", "2/3"], a: 0, e: "2 eşit durumdan biri → 1/2.", d: 1 }
      ]
    },
    {
      id: "g8-5",
      icon: "≤",
      title: "Cebirsel İfadeler ve Eşitsizlikler",
      desc: "Doğrusal eşitsizlikler ve sayı doğrusunda gösterim",
      lesson: [
        { t: "Eşitsizlik Nedir?", d: "<, >, ≤, ≥ sembolleriyle kurulan ifadelerdir. Çözüm, eşitsizliği sağlayan tüm değerlerdir." },
        { t: "Eşitsizlik Çözme", d: "Denklem gibi çözülür; fakat negatif sayı ile <b>çarpma-bölme</b> durumunda eşitsizlik yön değiştirir: −2x ≤ 8 → x ≥ −4." },
        { t: "Sayı Doğrusunda Gösterim", d: "Kapaseli (●) nokta değer dahil, boş (○) nokta değer hariç gösterilir." },
        { t: "Aralıkta Tam Sayı", d: "−1 < x < 4 aralığındaki tam sayılar: 0, 1, 2, 3 (4 tanedir)." },
        { t: "Koşul Belirleme", d: "Problemlerde verilen kısıtlar eşitsizliğe çevrilir (örn. «en az 5» → ≥ 5)." }
      ],
      questions: [
        { q: "3x + 5 > 20 eşitsizliğinin çözümü nedir?", o: ["x > 5", "x < 5", "x > 8", "x ≥ 5"], a: 0, e: "3x > 15 → x > 5.", d: 2 },
        { q: "−2x ≤ 8 eşitsizliğinin çözümü nedir?", o: ["x ≥ −4", "x ≤ −4", "x ≥ 4", "x > −4"], a: 0, e: "Negatif sayıya bölünce yön değişir: x ≥ −4.", d: 3 },
        { q: "x − 3 < 7 eşitsizliğinin çözümü nedir?", o: ["x < 10", "x < 4", "x > 10", "x ≤ 4"], a: 0, e: "x < 10.", d: 1 },
        { q: "2(x + 1) ≥ 10 eşitsizliğinin çözümü nedir?", o: ["x ≥ 4", "x ≥ 9", "x ≤ 4", "x ≥ 5"], a: 0, e: "x + 1 ≥ 5 → x ≥ 4.", d: 2 },
        { q: "−1 < x < 4 aralığındaki kaç tam sayı vardır?", o: ["4", "5", "3", "6"], a: 0, e: "0, 1, 2, 3 → 4 tane.", d: 2 },
        { q: "−3x > 9 eşitsizliğinin çözümü nedir?", o: ["x < −3", "x > −3", "x < 3", "x > 3"], a: 0, e: "Negatif ile bölünce yön değişir: x < −3.", d: 3 },
        { q: "5 − x ≥ 1 eşitsizliğinin çözümü nedir?", o: ["x ≤ 4", "x ≥ 4", "x ≤ 6", "x < −4"], a: 0, e: "−x ≥ −4 → x ≤ 4.", d: 3 }
      ]
    },
    {
      id: "g8-6",
      icon: "📈",
      title: "Doğrusal Denklemler ve Grafikleri",
      desc: "Koordinat sistemi, doğru grafiği ve nokta denklemi",
      lesson: [
        { t: "Koordinat Sistemi", d: "Noktalar (x, y) ile gösterilir: x <b>apsisi</b> (yatay), y <b>ordinatı</b> (dikey)." },
        { t: "Eksenlerdeki Noktalar", d: "x ekseni üzerinde ordinat 0'dır: (a, 0). y ekseni üzerinde apsis 0'dır: (0, b)." },
        { t: "Doğru Grafiği", d: "y = mx + b biçimindeki denklemlerin grafiği bir doğrudur; x'e değer verilip y bulunur, noktalar birleştirilir." },
        { t: "Eğim", d: "İki nokta arasındaki düşey değişimün yatay değişim oranı: (0,0) ve (2,6) → eğim = 6/2 = 3." },
        { t: "Doğrunun Geçtiği Noktalar", d: "y = 3x doğrusu x = 1 için y = 3 olduğundan (1,3) noktasından geçer." }
      ],
      questions: [
        { q: "y = 2x + 1 doğrusunda x = 3 için y kaçtır?", o: ["7", "6", "5", "8"], a: 0, e: "y = 2×3 + 1 = 7.", d: 1 },
        { q: "y = −x + 5 doğrusu x ekseni hangi noktada keser?", o: ["(5, 0)", "(0, 5)", "(−5, 0)", "(5, 5)"], a: 0, e: "x ekseni kesiminde y = 0 → 0 = −x + 5 → x = 5.", d: 2 },
        { q: "2x + 3y = 12 denklemi için x = 0 ise y kaçtır?", o: ["4", "3", "6", "12"], a: 0, e: "3y = 12 → y = 4.", d: 2 },
        { q: "Bir doğrunun y ekseni üzerindeki kestiği noktanın apsisi kaçtır?", o: ["0", "1", "b", "Tanımsız"], a: 0, e: "y ekseni üzerinde apsis her zaman 0'dır.", d: 1 },
        { q: "(0, 0) ve (2, 6) noktalarından geçen doğrunun eğimi kaçtır?", o: ["3", "1/3", "6", "2"], a: 0, e: "Eğim = (6−0)/(2−0) = 3.", d: 3 },
        { q: "y = 3x doğrusu hangi noktadan geçer?", o: ["(1, 3)", "(3, 1)", "(1, 9)", "(3, 3)"], a: 0, e: "x = 1 → y = 3 → (1, 3).", d: 1 },
        { q: "x ekseni üzerindeki noktaların ordinatı kaçtır?", o: ["0", "1", "x", "−1"], a: 0, e: "x ekseni üzerinde y = 0'dır.", d: 1 },
        { q: "y = 2x − 4 doğrusunda x = 0 için y kaçtır?", o: ["−4", "4", "0", "2"], a: 0, e: "y = 0 − 4 = −4 → y ekseni kesimi (0, −4).", d: 2 }
      ]
    },
    {
      id: "g8-7",
      icon: "🔄",
      title: "Dönüşüm Geometrisi",
      desc: "Öteleme, yansıma ve dönme işlemlerinin koordinatları",
      lesson: [
        { t: "Öteleme", d: "Nokta, belirli bir yönde belirli bir uzunluk kaydırılır: (a, b) + (h, k) = (a+h, b+k). Şeklin boyutu ve yönü değişmez." },
        { t: "Yansıma", d: "<b>x ekseni:</b> (x, −y). <b>y ekseni:</b> (−x, y). <b>Orijin:</b> (−x, −y)." },
        { t: "Dönme", d: "Orijine göre saat yönünde 90°: (x, y) → (y, −x). Saat yönünde 180°: (−x, −y)." },
        { t: "Kongruenlik", d: "Öteleme, yansıma ve dönmede şekil <b>kongruen</b> kalır: boyut ve açılar değişmez, yalnız yer/yön değişir." },
        { t: "Uygulama", d: "Öncelikle şeklin köşe noktaları tek tek dönüştürülür, sonra noktalar birleştirilir." }
      ],
      questions: [
        { q: "(3, 2) noktasının y eksenine göre yansımasının koordinatları nedir?", o: ["(−3, 2)", "(3, −2)", "(2, 3)", "(−3, −2)"], a: 0, e: "y eksenine göre yansımda apsis değişir: (−x, y).", d: 1 },
        { q: "(4, −1) noktasının x eksenine göre yansıması nedir?", o: ["(4, 1)", "(−4, −1)", "(−4, 1)", "(1, 4)"], a: 0, e: "x eksenine göre yansımda ordinat değişir: (x, −y).", d: 2 },
        { q: "(2, 3) noktasının orijine göre yansıması nedir?", o: ["(−2, −3)", "(−2, 3)", "(2, −3)", "(3, 2)"], a: 0, e: "Orijine göre yansımda ikisi de işaret değiştirir.", d: 2 },
        { q: "A(5, 1) noktası (2, 3) vektörü ile ötelenirse yeni nokta hangisidir?", o: ["(7, 4)", "(3, −2)", "(7, −2)", "(5, 4)"], a: 0, e: "5+2 = 7, 1+3 = 4 → (7, 4).", d: 2 },
        { q: "(1, 2) noktasının orijine göre saat yönünde 90° döndürülmesi sonucu hangi nokta elde edilir?", o: ["(2, −1)", "(−2, 1)", "(−1, 2)", "(1, −2)"], a: 0, e: "Saat yönünde 90°: (x, y) → (y, −x) → (2, −1).", d: 3 },
        { q: "Bir şeklin öteleme sonucundaki görüntüsü için ne söylenebilir?", o: ["Boyutları ve açıları değişmez", "Boyutları değişir", "Yönü hep değişir", "Alanı yarıya iner"], a: 0, e: "Öteleme kongruen görüntü oluşturur.", d: 1 },
        { q: "(−x, y) dönüşümü hangi yansımadır?", o: ["y eksenine göre", "x eksenine göre", "Orijine göre", "Ötelemedir"], a: 0, e: "Apsis işaret değiştiriyor → y eksenine göre yansıma.", d: 3 }
      ]
    },
    {
      id: "g8-8",
      icon: "🧊",
      title: "Geometrik Cisimler",
      desc: "Küp, prizma ve piramidin yüzey alanı-hacmi",
      lesson: [
        { t: "Hacim Nedir?", d: "Cismin kapladığı üç boyutlu uzunluktur; birimleri cm³, m³ gibi küp birimlerdir." },
        { t: "Küp", d: "Hacim = a³, Yüzey alanı = 6a². a = 4 ise V = 64; a = 5 ise A = 150." },
        { t: "Dikdörtgenler Prizması", d: "Hacim = a × b × c, Yüzey alanı = 2(ab + ac + bc)." },
        { t: "Üçgenler Prizmasının Hacmi", d: "Hacim = taban alanı × yükseklik (prizmanın)." },
        { t: "Piramidin Hacmi", d: "Hacim = (taban alanı × yükseklik) ÷ 3." },
        { t: "Prizmada Yükseklik", d: "Hacim = taban alanı × yükseklik → yükseklik = hacim ÷ taban alanı." }
      ],
      questions: [
        { q: "Kenarı 4 cm olan küpün hacmi kaç cm³'tür?", o: ["64", "16", "48", "12"], a: 0, e: "V = 4³ = 64 cm³.", d: 1 },
        { q: "Kenarı 5 cm olan küpün yüzey alanı kaç cm²'dir?", o: ["150", "25", "100", "125"], a: 0, e: "6 × 5² = 6 × 25 = 150 cm².", d: 2 },
        { q: "Boyutları 3, 4, 5 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?", o: ["60", "47", "94", "120"], a: 0, e: "3 × 4 × 5 = 60 cm³.", d: 1 },
        { q: "Boyutları 2, 3, 4 cm olan dikdörtgenler prizmasının yüzey alanı kaç cm²'dir?", o: ["52", "48", "24", "64"], a: 0, e: "2(6 + 8 + 12) = 2 × 26 = 52 cm².", d: 3 },
        { q: "Taban alanı 10 cm², yüksekliği 6 cm olan üçgenler prizmasının hacmi kaç cm³'tür?", o: ["60", "16", "30", "90"], a: 0, e: "V = taban alanı × yükseklik = 10 × 6 = 60.", d: 2 },
        { q: "Kenarı 3 cm olan küpün hacmi kaç cm³'tür?", o: ["27", "9", "18", "81"], a: 0, e: "3³ = 27.", d: 1 },
        { q: "Hacmi 96 cm³, taban alanı 12 cm² olan bir prizmanın yüksekliği kaç cm'dir?", o: ["8", "6", "12", "4"], a: 0, e: "96 ÷ 12 = 8 cm.", d: 2 },
        { q: "Taban alanı 30 cm², yüksekliği 9 cm olan piramidin hacmi kaç cm³'tür?", o: ["90", "270", "45", "135"], a: 0, e: "(30 × 9) ÷ 3 = 90 cm³.", d: 3 }
      ]
    },
    {
      id: "g8-9",
      icon: "📐",
      title: "Üçgenler ve Pisagor Bağıntısı",
      desc: "Üçgenin açıları, kenar ilişkileri ve Pisagor teoremi",
      lesson: [
        { t: "İç Açılar Toplamı", d: "Her üçgenin iç açıları toplamı <b>180°</b>'dir." },
        { t: "Kenar-Açı İlişkisi", d: "Büyük açının karşısında büyük kenar bulunur; eşit açıların karşısındaki kenarlar eşittir." },
        { t: "Pisagor Bağıntısı", d: "Dik üçgende: <b>a² + b² = c²</b> (c hipotenüs). 5 ve 12 kenarlı dik üçgende hipotenüs 13'tür." },
        { t: "Dik Üçgen Kontrolü", d: "Kenarları 6, 8, 10 olan üçgen dik üçgendir: 36 + 64 = 100 = 10²." },
        { t: "Dik Üçgenin Alanı", d: "İki dik kenarın çarpımının yarısı: (9 × 12) ÷ 2 = 54." }
      ],
      questions: [
        { q: "Kenar uzunlukları 6, 8, 10 cm olan üçgen hangi çeşittir?", o: ["Dik üçgen", "Eşkenar üçgen", "Geniş açılı üçgen", "Dar açılı üçgen"], a: 0, e: "6² + 8² = 36 + 64 = 100 = 10² → dik üçgen.", d: 2 },
        { q: "Dik üçgenin dik kenarları 5 cm ve 12 cm ise hipotenüs kaç cm'dir?", o: ["13", "17", "15", "7"], a: 0, e: "25 + 144 = 169 = 13².", d: 2 },
        { q: "Hipotenüsü 13 cm, bir dik kenarı 5 cm olan dik üçgenin diğer dik kenarı kaç cm'dir?", o: ["12", "8", "10", "18"], a: 0, e: "169 − 25 = 144 → √144 = 12.", d: 3 },
        { q: "Dik kenarları 9 cm ve 12 cm olan dik üçgenin alanı kaç cm²'dir?", o: ["54", "108", "21", "27"], a: 0, e: "(9 × 12) ÷ 2 = 54 cm².", d: 2 },
        { q: "Bir üçgenin iki iç açısı 50° ve 60° ise üçüncü açısı kaç derecedir?", o: ["70°", "60°", "80°", "110°"], a: 0, e: "180 − (50 + 60) = 70°.", d: 1 },
        { q: "Kenarları 4, 4, 7 cm olan üçgen hangi çeşittir?", o: ["İkizkenar", "Eşkenar", "Çokkenar", "Dik"], a: 0, e: "İki kenarı eşit → ikizkenar üçgen.", d: 1 },
        { q: "Her üçgenin iç açılarının ölçüleri toplamı kaç derecedir?", o: ["180°", "90°", "360°", "270°"], a: 0, e: "Üçgenin iç açıları toplamı 180°'dir.", d: 1 },
        { q: "Bir dik üçgenin hipotenüsü 10 cm, bir dik kenarı 6 cm ise diğer dik kenarı kaç cm'dir?", o: ["8", "16", "4", "12"], a: 0, e: "100 − 36 = 64 → √64 = 8 cm.", d: 3 }
      ]
    }
  ]
});
