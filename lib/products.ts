export type FragranceNotes = {
  top: string[];
  heart: string[];
  base: string[];
};

export type ProductSize = {
  ml: 30 | 50;
  priceEUR: number;
};

export type FragranceCollection =
  | "signature"
  | "intense"
  | "floral";

export type Product = {
  id: string;
  slug: string;
  /** Edition number shown as "N° 114" on the bottle tile. Optional. */
  number?: number;
  name: string;
  subtitle: string;
  category: string;
  collection: FragranceCollection;
  shortDescription: string;
  description: string;
  /** 2 – 4 sentences about the creation / intent of this specific composition. */
  inspiration: string;
  /** Optional olfactive reference — shown on cards as "…riecht wie {inspiredBy}®". */
  inspiredBy?: string;
  shortNotes: string;
  notes: FragranceNotes;
  character: string;
  longevity: string;
  concentration: string;
  /** Season & occasion recommendation — shown on the detail page. */
  season?: string;
  occasion?: string;
  accent: "champagne" | "onyx" | "ivory";
  sizes: ProductSize[];
  featured?: boolean;
  // Optional: Pfad zu einem Produktfoto unter /public/images/.
  // Fällt auf PRODUCT_PLACEHOLDER zurück, wenn nicht gesetzt.
  image?: string;
};

// Einheitliche Größen & Preise für die gesamte Kollektion.
export const STANDARD_SIZES: ProductSize[] = [
  { ml: 30, priceEUR: 25.99 },
  { ml: 50, priceEUR: 44.99 },
];

/**
 * Haus-Standards der Maison — gelten für JEDEN Duft (auch neue).
 * Werden unten auf allen Produkten automatisch angewendet.
 */
export const STANDARD_CONCENTRATION = "45 % Parfumöl";
export const STANDARD_LONGEVITY = "8 – 12 h";

/**
 * Interne Liste aller Düfte. Konzentration & Haltbarkeit werden
 * beim Export über PRODUCTS einheitlich auf den Haus-Standard gesetzt,
 * egal was hier steht — so bleibt die Maison konsistent.
 */
const RAW_PRODUCTS: Product[] = [
  {
    id: "desert-whisper",
    slug: "desert-whisper",
    number: 114,
    name: "Desert Whisper",
    subtitle: "Édition Orientale",
    category: "Extrait de Parfum",
    collection: "signature",
    shortDescription:
      "Rauchiger Oud, Leder und Weihrauch — eine mystische Nacht in der Wüste.",
    description:
      "Ein intensiver, rauchiger Oud-Duft, getragen von warmem Leder, glühendem Weihrauch und einem Hauch dunkler Rose. Im Verlauf öffnet sich ein leiser, süßlicher Amber-Akkord mit zart fruchtigen Nuancen — kraftvoll, sehr langanhaltend, unverkennbar.",
    inspiration:
      "Desert Whisper ist die erste Komposition, die wir in Serie gebracht haben — der Moment, in dem aus einer Idee eine Maison wurde. Entworfen für Menschen, die in einem Raum eintreten und nichts sagen müssen. Oud und Leder im Zentrum, Weihrauch und Rose als Rahmen, eine süße Amber-Basis als stilles Echo.",
    inspiredBy: "Ombre Nomade",
    shortNotes: "Oud · Leather · Incense · Rose",
    notes: {
      top: ["Incense", "Pink Pepper", "Saffron"],
      heart: ["Damask Rose", "Oud", "Leather"],
      base: ["Amber", "Raspberry Accord", "Patchouli"],
    },
    character: "Rauchig · Mystisch · Kraftvoll",
    longevity: "14 – 18 h",
    concentration: "30 % Parfumöl",
    season: "Herbst · Winter",
    occasion: "Abend · Events · Dates",
    accent: "onyx",
    sizes: STANDARD_SIZES,
    image: "/images/parfum1.png",
    featured: true,
  },
  {
    id: "imaginatzion",
    slug: "imaginatzion",
    number: 208,
    name: "Imaginatzion",
    subtitle: "Édition Lumière",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Bergamotte, schwarzer Tee und Ambroxan — eine frische, klare Eleganz für den Tag.",
    description:
      "Frisch, elegant und leicht würzig — eine moderne Komposition mit spritzigen Zitrusnoten, getragen von der zarten Wärme aus schwarzem Tee, Ingwer und Ambroxan. Sauber, leicht, vollkommen unaufdringlich. Hochwertig und doch zurückhaltend — der Duft, der einen Tag begleitet, ohne sich aufzudrängen.",
    inspiration:
      "Imaginatzion ist die helle Antwort der Maison auf Desert Whisper — entworfen für die Stunden, in denen Klarheit gefragt ist. Bergamotte aus Kalabrien, schwarzer Tee aus den Hochlagen Sri Lankas, eine Spur frischer Ingwer und das warme Echo von Ambroxan. Eine Komposition, die im Tageslicht zu Hause ist.",
    shortNotes: "Bergamot · Black Tea · Ambroxan",
    notes: {
      top: ["Bergamot", "Orange", "Lemon"],
      heart: ["Black Tea", "Ginger", "Cardamom"],
      base: ["Ambroxan", "White Musk", "Cedar"],
    },
    character: "Frisch · Klar · Modern",
    longevity: "8 – 12 h",
    concentration: "20 % Parfumöl",
    season: "Frühling · Sommer",
    occasion: "Alltag · Büro · Tag",
    accent: "ivory",
    sizes: STANDARD_SIZES,
    image: "/images/parfum2.png",
  },
  {
    id: "afternoon-splash",
    slug: "afternoon-splash",
    number: 205,
    name: "Afternoon Splash",
    subtitle: "Édition Estivale",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Orange, Mandarine und eine aquatische Frische — Sonne, Salz und ein blauer Nachmittag.",
    description:
      "Ein extrem frischer, lebendiger Sommerduft. Er eröffnet mit spritzigen Zitrusnoten aus Orange und Mandarine, sofort sauber und gute-Laune-machend. Im Verlauf bleibt er leicht und aquatisch, mit einer dezenten Tiefe aus weißem Moschus und Treibholz, die ihn trotz seiner Leichtigkeit hochwertig wirken lässt.",
    inspiration:
      "Afternoon Splash ist der helle, luftige Ausklang der Maison — entworfen für warme Tage, Urlaub und den freien Nachmittag. Kalabrische Orange und sizilianische Mandarine treffen auf einen stillen aquatischen Akkord und weiße Blüten. Eine Komposition, die nicht gefallen will, sondern einfach da ist — wie die erste Brise am Meer.",
    shortNotes: "Orange · Mandarin · Aquatic · White Musk",
    notes: {
      top: ["Blood Orange", "Mandarin", "Bergamot"],
      heart: ["Aquatic Accord", "Neroli", "Mint"],
      base: ["White Musk", "Driftwood", "Ambrette"],
    },
    character: "Frisch · Sonnig · Unkompliziert",
    longevity: "6 – 9 h",
    concentration: "18 % Parfumöl",
    season: "Frühling · Sommer",
    occasion: "Urlaub · Freizeit · Tag",
    accent: "ivory",
    sizes: STANDARD_SIZES,
    image: "/images/parfum3.png",
  },
  {
    id: "pacific-breeze",
    slug: "pacific-breeze",
    number: 206,
    name: "Pacific Breeze",
    subtitle: "Édition Côtière",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Feige, Zitrus und eine grüne Brise — frisch, fruchtig, entspannt elegant.",
    description:
      "Frisch, fruchtig und zugleich entspannt elegant. Saftige Zitrusfrüchte treffen auf reife Feige und eine leicht grüne, sanfte Frische, die sehr natürlich und modern wirkt. Im Verlauf bleibt der Duft weich, sauber und leicht süßlich — gepflegt, unbeschwert und nie aufdringlich.",
    inspiration:
      "Pacific Breeze ist der lässige, sonnige Gegenpart zu Afternoon Splash — weniger aquatisch, mehr grün und fruchtig. Kalabrische Bergamotte, mediterrane Feige, ein Hauch Grüntee und weißer Moschus. Entworfen für Menschen, die einen frischen, positiven Duft suchen, der immer stimmig wirkt.",
    shortNotes: "Fig · Citrus · Green Tea · White Musk",
    notes: {
      top: ["Bergamot", "Lemon", "Green Apple"],
      heart: ["Fig", "Green Tea", "Jasmine Petals"],
      base: ["White Musk", "Cedar", "Fig Leaves"],
    },
    character: "Frisch · Fruchtig · Lässig",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Frühling · Sommer",
    occasion: "Alltag · Freizeit · Tag",
    accent: "ivory",
    sizes: STANDARD_SIZES,
    image: "/images/parfum4.png",
  },
  {
    id: "golden-coast-dream",
    slug: "golden-coast-dream",
    number: 207,
    name: "Golden Coast Dream",
    subtitle: "Édition Solaire",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Zitrus, weicher Moschus und cremiges Amber — strahlend frisch und zugleich sonnig warm.",
    description:
      "Warm, weich und leicht süßlich mit einer strahlenden Frische. Er verbindet spritzige Zitrusnoten mit sanften, moschusartigen und ambrierten Nuancen, die ihm eine cremige, fast sonnige Wärme verleihen. Dadurch wirkt er gleichzeitig frisch und gemütlich, mit einer entspannten, eleganten Ausstrahlung.",
    inspiration:
      "Golden Coast Dream fängt die Stimmung einer Küste ein, an der das Licht länger hängt — Morgenmandarine, salzige Luft und ein weiches Echo aus Ambrette und Benzoin. Entworfen für Tage, an denen man leise strahlen möchte: modern, unaufdringlich und trotzdem unverwechselbar.",
    inspiredBy: "California Dream",
    shortNotes: "Citrus · White Musk · Amber · Ambroxan",
    notes: {
      top: ["Mandarin", "Bergamot", "Lemon"],
      heart: ["Ambrette", "Orange Blossom", "Solar Accord"],
      base: ["White Musk", "Benzoin", "Ambroxan"],
    },
    character: "Warm · Frisch · Elegant",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Frühling · Sommer · milde Abende",
    occasion: "Alltag · Freizeit · entspannte Anlässe",
    accent: "champagne",
    sizes: STANDARD_SIZES,
    image: "/images/parfum5.png",
  },
  {
    id: "midnight-city-lights",
    slug: "midnight-city-lights",
    number: 209,
    name: "Midnight City Lights",
    subtitle: "Édition Nocturne",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Zitrus, weiße Blüten und pudriger Moschus — glamourös, frisch und trotzdem leicht tragbar.",
    description:
      "Elegant, leicht süß und zugleich strahlend frisch. Er kombiniert zitrische Noten mit sanften, blumigen Nuancen und einem warmen, leicht pudrigen Unterton, der ihm eine glamouröse und moderne Ausstrahlung verleiht. Im Verlauf wirkt er weich, sauber und einladend, mit einer dezenten Süße.",
    inspiration:
      "Midnight City Lights ist die Maison-Hommage an die erste Stunde nach Sonnenuntergang — wenn Neon und Sternlicht sich mischen. Kalabrische Bergamotte, eine Herznote aus Tiaré und Jasmin, darunter weiches Sandelholz und sauberer Moschus. Für Momente, in denen Eleganz sichtbar sein darf, ohne schwer zu werden.",
    inspiredBy: "City of Stars",
    shortNotes: "Citrus · White Florals · Sandalwood · Musk",
    notes: {
      top: ["Bergamot", "Mandarin", "Pink Pepper"],
      heart: ["Tiare Flower", "Jasmine Sambac", "Peony"],
      base: ["Sandalwood", "Ambrette", "White Musk", "Iris"],
    },
    character: "Elegant · Glamourös · Frisch",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Frühling · Sommer · Herbst · Winter",
    occasion: "Abend · Dates · besondere Anlässe · Alltag",
    accent: "onyx",
    sizes: STANDARD_SIZES,
    image: "/images/parfum6.png",
  },
  {
    id: "endless-horizon",
    slug: "endless-horizon",
    number: 210,
    name: "Endless Horizon",
    subtitle: "Édition Azurée",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Grapefruit, Ingwer und Ambroxan auf holziger Basis — klar, energetisch und gepflegt modern.",
    description:
      "Frisch, würzig und zugleich elegant klar. Er verbindet spritzige Zitrusnoten mit aromatischem Ingwer und einer leicht holzigen Basis, die ihm eine moderne, maskuline Frische verleiht. Im Verlauf bleibt er sauber, energetisch und dezent warm, ohne an Leichtigkeit zu verlieren.",
    inspiration:
      "Endless Horizon denkt den Moment, in dem der Himmel und das Meer nur noch eine Linie sind — sizilianische Grapefruit, ein Funke Ingwer aus den Gewürzrouten und ein trockenes Holz-Ambroxan, das lange sauber bleibt. Für alle, die Klarheit tragen wollen: stilvoll, vielseitig, ohne Lautstärke.",
    inspiredBy: "L'Immensité",
    shortNotes: "Grapefruit · Ginger · Rosemary · Ambroxan",
    notes: {
      top: ["Grapefruit", "Bergamot", "Ginger"],
      heart: ["Rosemary", "Sage", "Geranium"],
      base: ["Ambroxan", "Cedar", "Labdanum"],
    },
    character: "Frisch · Würzig · Klar",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Frühling · Sommer",
    occasion: "Alltag · Büro · Tag",
    accent: "ivory",
    sizes: STANDARD_SIZES,
    image: "/images/parfum7.png",
  },
  {
    id: "dream-catcher-essence",
    slug: "dream-catcher-essence",
    number: 217,
    name: "Dream Catcher Essence",
    subtitle: "Édition Rêveuse",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Frucht, zarte Blüten, Kakao und Moschus — luftig, leicht gourmand und feminin elegant.",
    description:
      "Elegant, leicht süß und zugleich luftig-frisch. Er kombiniert fruchtige Noten mit zarten Blüten und einem Hauch von Kakao sowie einer weichen, moschusartigen Basis, die ihm eine warme und zugleich verspielte Tiefe verleiht. Im Verlauf wirkt er sanft, feminin und leicht gourmandig, ohne schwer zu sein.",
    inspiration:
      "Dream Catcher Essence fängt leise Glücksmomente ein — wie ein Netz aus Licht über dem Bett. Litschi und Ingwer in der Luft, Pfingstrose und Rose im Herzen, ein Hauch Kakao und weißer Moschus, der warm bleibt, aber nie dicht wird. Romantisch, modern, zum Näherkommen.",
    inspiredBy: "Attrape-Rêves",
    shortNotes: "Litchi · Peony · Cocoa · White Musk",
    notes: {
      top: ["Bergamot", "Litchi", "Ginger"],
      heart: ["Peony", "Rose", "Magnolia"],
      base: ["Cocoa", "Ambroxan", "White Musk"],
    },
    character: "Elegant · Weich · Romantisch",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Frühling · Herbst",
    occasion: "Alltag · Dates · besondere Momente",
    accent: "champagne",
    sizes: STANDARD_SIZES,
    image: "/images/parfum8.png",
  },
  {
    id: "sunny-shore",
    slug: "sunny-shore",
    number: 218,
    name: "Sunny Shore",
    subtitle: "Édition Balnéaire",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Yuzu, aromatische Kräuter und warmer Sand-Moschus — wie ein Tag zwischen Strand und Meeresluft.",
    description:
      "Frisch, leicht würzig und gleichzeitig warm wie ein Tag am Meer. Er verbindet spritzige Zitrusnoten mit aromatischen, leicht kräuterigen Nuancen und einer sanften, sandig-warmen Basis, die an Sonne und Meeresluft erinnert. Im Verlauf bleibt er sauber, entspannt und natürlich mit einer subtilen Tiefe.",
    inspiration:
      "Sunny Shore ist die Maison-Erinnerung an die erste Stunde am Wasser — japanische Yuzu, Rosmarin und Thymian wie eine Brise über den Dünen, darunter ein weiches Sand-Akkord und Ambrette. Unbeschwert, sonnig, für Tage, an denen man nichts beweisen muss.",
    inspiredBy: "On the Beach",
    shortNotes: "Yuzu · Aromatic Herbs · Sand Accord · Musk",
    notes: {
      top: ["Yuzu", "Bergamot", "Neroli"],
      heart: ["Rosemary", "Thyme", "Pink Pepper"],
      base: ["Sand Accord", "Ambrette", "White Musk"],
    },
    character: "Frisch · Sonnig · Natürlich",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Frühling · Sommer",
    occasion: "Urlaub · Alltag · Freizeit",
    accent: "ivory",
    sizes: STANDARD_SIZES,
    image: "/images/parfum9.png",
  },
  {
    id: "velvet-harmony",
    slug: "velvet-harmony",
    number: 220,
    name: "Velvet Harmony",
    subtitle: "Édition Cristalline",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Leuchtende Zitrusnoten auf cremig-weicher Basis — klar, luxuriös und zurückhaltend besonders.",
    description:
      "Frisch, strahlend und zugleich elegant minimalistisch. Er lebt von hochwertigen, leuchtenden Zitrusnoten, die sehr klar und edel wirken, begleitet von einer sanften, leicht cremigen Tiefe. Dadurch entsteht ein luxuriöser, sauberer Duft, der schlicht wirkt, aber dennoch sehr besonders ist.",
    inspiration:
      "Velvet Harmony ist reduziert auf das Wesentliche — wie Licht auf poliertem Glas. Grapefruit und Bergamotte in reiner Form, ein Hauch Ingwer für Präzision, darunter weißer Moschus und Ambroxan in samtiger Ruhe. Für Menschen, die Stille als Statement tragen.",
    inspiredBy: "Symphony",
    shortNotes: "Grapefruit · Ginger · White Musk · Ambroxan",
    notes: {
      top: ["Grapefruit", "Bergamot", "Ginger"],
      heart: ["Neroli", "Orange Blossom", "Green Tea"],
      base: ["White Musk", "Ambroxan", "Cashmeran"],
    },
    character: "Frisch · Klar · Luxuriös",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Frühling · Sommer",
    occasion: "Alltag · Büro · Tag",
    accent: "champagne",
    sizes: STANDARD_SIZES,
    image: "/images/parfum10.png",
  },
  {
    id: "new-world-essence",
    slug: "new-world-essence",
    number: 230,
    name: "New World Essence",
    subtitle: "Édition Profonde",
    category: "Eau de Parfum",
    collection: "intense",
    shortDescription:
      "Kakao, Oud und Safran auf holzig-rauchiger Basis — dunkel, opulent und von langer Wirkung.",
    description:
      "Tief, würzig und kraftvoll mit einer dunklen, luxuriösen Ausstrahlung. Er kombiniert warme Kakao-Noten mit Oud, Safran und holzigen Akkorden, die ihm eine intensive, leicht rauchige und geheimnisvolle Tiefe verleihen. Im Verlauf bleibt er reichhaltig, leicht süß und sehr langanhaltend.",
    inspiration:
      "New World Essence trägt die Stille nach Mitternacht in sich — wo Kakao nicht süß, sondern erdig wirkt und Oud wie poliertes Dunkelholz klingt. Safran als goldener Faden, Patchouli und Weihrauch als Schatten. Für Anlässe, an denen Präsenz mehr sagt als Worte.",
    inspiredBy: "Nouveau Monde",
    shortNotes: "Cacao · Oud · Saffron · Patchouli",
    notes: {
      top: ["Black Pepper", "Saffron", "Cardamom"],
      heart: ["Cacao", "Patchouli", "Rose"],
      base: ["Oud", "Incense", "Vetiver"],
    },
    character: "Dunkel · Würzig · Kraftvoll",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Herbst · Winter",
    occasion: "Abend · Events · besondere Anlässe",
    accent: "onyx",
    sizes: STANDARD_SIZES,
    image: "/images/parfum11.png",
  },
  {
    id: "urban-lovers",
    slug: "urban-lovers",
    number: 231,
    name: "Urban Lovers",
    subtitle: "Édition Urbaine",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Mandarine, rosa Pfeffer und Ambrette auf sandelig-weicher Basis — frisch, modern und leicht tragbar.",
    description:
      "Frisch, modern und leicht würzig mit einer eleganten Leichtigkeit. Er verbindet helle Zitrusnoten mit aromatischen und sanft holzigen Nuancen, die ihm eine saubere, stilvolle und zeitgemäße Ausstrahlung verleihen. Im Verlauf bleibt er angenehm frisch, leicht warm und sehr tragbar.",
    inspiration:
      "Urban Lovers ist die Maison-Antwort auf das Tempo der Stadt — nie laut, aber immer präsent. Mandarine und rosa Pfeffer im ersten Schritt, Ambrette und ein Hauch Salbei in der Mitte, Sandelholz und sauberer Moschus als ruhiger Abschluss. Für Spaziergänge, Treffen und alle Wege dazwischen.",
    inspiredBy: "Lovers",
    shortNotes: "Mandarin · Pink Pepper · Ambrette · Sandalwood",
    notes: {
      top: ["Mandarin", "Bergamot", "Pink Pepper"],
      heart: ["Ambrette", "Sage", "Geranium"],
      base: ["Sandalwood", "Cedar", "White Musk"],
    },
    character: "Frisch · Modern · Stilvoll",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Frühling · Sommer · Herbst",
    occasion: "Alltag · Dates · Stadt",
    accent: "ivory",
    sizes: STANDARD_SIZES,
    image: "/images/parfum12.png",
  },
  {
    id: "enchanting-aura",
    slug: "enchanting-aura",
    number: 232,
    name: "Enchanting Aura",
    subtitle: "Édition Veloutée",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Iris, Rose und Heliotrop auf muskig-weicher Basis — pudrig, feminin und dezent sinnlich.",
    description:
      "Weich, blumig und elegant mit einer leicht sinnlichen Tiefe. Er kombiniert zarte florale Noten mit pudrigen und leicht warmen Nuancen, die ihm eine feminine, raffinierte Ausstrahlung verleihen. Im Verlauf bleibt er sanft, cremig und verführerisch, ohne aufdringlich zu wirken.",
    inspiration:
      "Enchanting Aura trägt sich wie ein zweiter Hautschimmer — Iris und Rose, die nicht schreien, Jasmin nur als Schatten, Heliotrop und Moschus, die warm und nah bleiben. Für Abende, an denen Nähe aus Stille entsteht, und für Tage, an denen Eleganz leise genug ist.",
    inspiredBy: "Spell On You",
    shortNotes: "Iris · Rose · Heliotrope · Musk",
    notes: {
      top: ["Bergamot", "Mandarin", "Pink Pepper"],
      heart: ["Iris", "Rose", "Jasmine Sambac"],
      base: ["Heliotrope", "White Musk", "Sandalwood"],
    },
    character: "Weich · Blumig · Raffiniert",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Frühling · Herbst · Winter",
    occasion: "Dates · besondere Anlässe · Alltag",
    accent: "champagne",
    sizes: STANDARD_SIZES,
    image: "/images/parfum13.png",
  },
  {
    id: "desert-rose-oud",
    slug: "desert-rose-oud",
    number: 233,
    name: "Desert Rose Oud",
    subtitle: "Édition Orientale",
    category: "Eau de Parfum",
    collection: "intense",
    shortDescription:
      "Damask-Rose, Oud und Safran auf ambrierter Basis — üppig, geheimnisvoll und von eleganter Wucht.",
    description:
      "Warm, floral und zugleich intensiv orientalisch. Er verbindet üppige Rosennoten mit tiefem Oud und leicht würzigen, ambrierten Nuancen, die ihm eine luxuriöse und sinnliche Ausstrahlung verleihen. Im Verlauf wirkt er weich, leicht süßlich und sehr langanhaltend, mit einer eleganten, geheimnisvollen Tiefe.",
    inspiration:
      "Desert Rose Oud erzählt von Rosen, die nicht im Garten wachsen, sondern in warmer Nachtluft — damaszener Rose und Oud im Gleichgewicht, Safran als goldener Rand, Amber und Patchouli als weiche Dämmerung. Für Stunden, in denen Stärke und Eleganz dieselbe Stimme haben.",
    inspiredBy: "Les Sables Roses",
    shortNotes: "Rose · Oud · Saffron · Amber",
    notes: {
      top: ["Saffron", "Pink Pepper", "Bergamot"],
      heart: ["Damask Rose", "Oud", "Incense"],
      base: ["Amber", "Patchouli", "White Musk"],
    },
    character: "Warm · Sinnlich · Orientalisch",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Herbst · Winter",
    occasion: "Abend · Events · besondere Anlässe",
    accent: "onyx",
    sizes: STANDARD_SIZES,
    image: "/images/parfum14.png",
  },
  {
    id: "celestial-pulse",
    slug: "celestial-pulse",
    number: 234,
    name: "Celestial Pulse",
    subtitle: "Édition Dynamique",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Mandarine, Pfeffer und Vetiver — spritzig, würzig und klar maskulin, bis zuletzt tragbar.",
    description:
      "Frisch, würzig und energiegeladen mit einer modernen, klaren Ausstrahlung. Er verbindet spritzige Zitrusnoten mit leicht pfeffrigen und aromatischen Nuancen, die ihm eine dynamische und maskuline Frische verleihen. Im Verlauf bleibt er sauber, lebendig und dezent holzig, wodurch er vielseitig und angenehm tragbar ist.",
    inspiration:
      "Celestial Pulse fängt Schwung ohne Hast — wie ein klarer Himmel vor dem Training. Mandarine und Bergamotte im Auftakt, eine Herznote aus Pfeffer und Geranium, Vetiver und Zeder, die erdig bleiben, aber leicht. Für Tage, an denen Energie selbstverständlich ist.",
    inspiredBy: "Météore",
    shortNotes: "Mandarin · Pepper · Vetiver · Cedar",
    notes: {
      top: ["Mandarin", "Bergamot", "Pink Pepper"],
      heart: ["Sichuan Pepper", "Geranium", "Nutmeg"],
      base: ["Vetiver", "Cedar", "Ambroxan"],
    },
    character: "Frisch · Energetisch · Klar",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Frühling · Sommer",
    occasion: "Alltag · Büro · Sport",
    accent: "ivory",
    sizes: STANDARD_SIZES,
    image: "/images/parfum15.png",
  },
  {
    id: "midnight-ember",
    slug: "midnight-ember",
    number: 235,
    name: "Midnight Ember",
    subtitle: "Édition Mystique",
    category: "Eau de Parfum",
    collection: "intense",
    shortDescription:
      "Weihrauch, dunkle Hölzer und harzige Wärme — trocken, rauchig und von geheimnisvoller Präsenz.",
    description:
      "Intensiv, rauchig und geheimnisvoll mit einer tiefen orientalischen Ausstrahlung. Er vereint warme Noten von Weihrauch und dunklen Hölzern mit einer leicht würzigen, harzigen Tiefe, die ihm eine elegante und fast mystische Atmosphäre verleiht. Im Verlauf bleibt er kraftvoll, trocken und sehr langanhaltend, mit einer subtilen, warmen Weichheit.",
    inspiration:
      "Midnight Ember ist das Echo eines Feuers, das längst zu Glut geworden ist — Weihrauch, der nicht predigt, Zeder und Vetiver, die Schatten messen, Amber und Olibanum als letzte Wärme. Für Nächte, in denen Geheimnis keine Frage braucht.",
    inspiredBy: "Nuit de Feu",
    shortNotes: "Incense · Dark Woods · Resins · Amber",
    notes: {
      top: ["Pink Pepper", "Cardamom", "Elemi"],
      heart: ["Incense", "Cedar", "Olibanum"],
      base: ["Vetiver", "Patchouli", "Amber", "Birch"],
    },
    character: "Rauchig · Orientalisch · Mystisch",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Herbst · Winter",
    occasion: "Abend · Events · besondere Anlässe",
    accent: "onyx",
    sizes: STANDARD_SIZES,
    image: "/images/parfum16.png",
  },
  {
    id: "free-spirit-wood",
    slug: "free-spirit-wood",
    number: 240,
    name: "Free Spirit Wood",
    subtitle: "Édition Boisée",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Cremiges Sandelholz, Kardamom und weiche Amber-Moschus-Tiefe — warm, natürlich und unaufdringlich elegant.",
    description:
      "Warm, holzig und zugleich weich elegant. Er kombiniert cremiges Sandelholz mit sanften, leicht würzigen Nuancen, die ihm eine ruhige, natürliche und hochwertige Ausstrahlung verleihen. Im Verlauf wirkt er weich, dezent süßlich und sehr harmonisch, ohne aufdringlich zu sein.",
    inspiration:
      "Free Spirit Wood folgt keinem Terminplan — nur dem Rhythmus guter Materialien. Sandelholz im Zentrum, Kardamom als leiser Kontrapunkt, Zeder für Klarheit und eine Spur Tonka, die wärmt, ohne zu süßen. Für alle, die Ruhe als Luxus tragen.",
    inspiredBy: "Au Hasard",
    shortNotes: "Sandalwood · Cardamom · Cedar · Musk",
    notes: {
      top: ["Cardamom", "Bergamot", "Pink Pepper"],
      heart: ["Sandalwood", "Cedar", "Violet Leaf"],
      base: ["Tonka Bean", "White Musk", "Amber"],
    },
    character: "Warm · Holzig · Harmonisch",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Frühling · Sommer · Herbst · Winter",
    occasion: "Alltag · Büro · entspannte Anlässe",
    accent: "champagne",
    sizes: STANDARD_SIZES,
    image: "/images/parfum17.png",
  },
  {
    id: "desert-bloom",
    slug: "desert-bloom",
    number: 241,
    name: "Desert Bloom",
    subtitle: "Édition Florale",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Strahlende Blüten auf cremig-süßlicher Amber-Basis — exotisch warm, harmonisch und elegant tragbar.",
    description:
      "Warm, floral und zugleich sanft exotisch. Er verbindet strahlende Blütennoten mit einer cremigen, leicht süßlichen Basis, die ihm eine elegante und sinnliche Ausstrahlung verleiht. Im Verlauf wirkt er weich, harmonisch und leicht warm, ohne an Leichtigkeit zu verlieren.",
    inspiration:
      "Desert Bloom ist kein Garten, sondern ein einziger Moment voller Licht — Rose und Orangenblüte, Jasmin nur als Reflex, darunter Benzoin und Vanille, die cremig bleiben, aber luftig. Für Anlässe, an denen Eleganz sichtbar sein darf, ohne zu wiegen.",
    inspiredBy: "Fleur du Désert",
    shortNotes: "Rose · Orange Blossom · Jasmine · Amber",
    notes: {
      top: ["Bergamot", "Mandarin", "Pink Pepper"],
      heart: ["Rose", "Orange Blossom", "Jasmine"],
      base: ["Benzoin", "Vanilla", "Amber", "White Musk"],
    },
    character: "Warm · Blumig · Sinnlich",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Frühling · Herbst",
    occasion: "Dates · besondere Anlässe · Alltag",
    accent: "champagne",
    sizes: STANDARD_SIZES,
    image: "/images/parfum18.png",
  },
  {
    id: "storm-essence",
    slug: "storm-essence",
    number: 242,
    name: "Storm Essence",
    subtitle: "Édition Pluviale",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Zitrus, mineralische Frische und Vetiver — kühl, belebend und an klare Luft nach dem Gewitter erinnernd.",
    description:
      "Frisch, würzig und leicht aquatisch mit einer dynamischen, energiegeladenen Ausstrahlung. Er verbindet spritzige Zitrusnoten mit aromatischen und mineralischen Nuancen, die an die Luft nach einem Gewitter erinnern. Im Verlauf bleibt er sauber, kühl und dezent holzig, mit einer modernen, klaren Frische.",
    inspiration:
      "Storm Essence fängt den Moment, in dem der Himmel wieder atmet — Grapefruit und Bergamotte wie erste Blitze, ein Hauch Iris und salzige Mineralität, Vetiver und Zeder, die nass und klar bleiben. Für Bewegung, Büro und Tage, an denen Frische Kraft braucht.",
    inspiredBy: "Orage",
    shortNotes: "Citrus · Aquatic · Iris · Vetiver",
    notes: {
      top: ["Grapefruit", "Bergamot", "Lemon"],
      heart: ["Aquatic Accord", "Iris", "Basil"],
      base: ["Vetiver", "Cedar", "Patchouli"],
    },
    character: "Frisch · Aquatisch · Dynamisch",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Frühling · Sommer",
    occasion: "Alltag · Büro · Sport",
    accent: "ivory",
    sizes: STANDARD_SIZES,
    image: "/images/parfum19.png",
  },
  {
    id: "mystic-elixir",
    slug: "mystic-elixir",
    number: 243,
    name: "Mystic Elixir",
    subtitle: "Édition Charmée",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Pfirsich, Cassis und Rose mit Maiglöckchen und Ambroxan — verspielt süß, floral und modern feminin.",
    description:
      "Weich, fruchtig und zugleich elegant verspielt. Er kombiniert süße, saftige Fruchtnoten mit zarten floralen Akzenten und einer sanften, leicht moschusartigen Basis, die ihm eine moderne und feminine Ausstrahlung verleiht. Im Verlauf wirkt er warm, rund und einladend, ohne zu schwer zu sein.",
    inspiration:
      "Mystic Elixir lebt von Kontrasten, die sich anfreunden — saftiger Pfirsich und Cassis, zwei Rosenstimmen und Maiglöckchen wie ein feiner Lichtstrich, darunter eine Spur Ingwer, cremige Wärme und Ambroxan, das lange nah bleibt. Charmant, klar, für Frühling und Sommer im Herzen.",
    inspiredBy: "eLVes",
    shortNotes: "Peach · Blackcurrant · Rose · Lily of the Valley",
    notes: {
      top: ["Peach", "Blackcurrant", "Ginger"],
      heart: ["Lily of the Valley", "Bulgarian Rose", "Centifolia Rose"],
      base: ["Coconut Milk", "Patchouli", "Ambroxan", "Cinnamon"],
    },
    character: "Fruchtig · Weich · Verspielt",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Frühling · Sommer",
    occasion: "Alltag · Dates · besondere Momente",
    accent: "champagne",
    sizes: STANDARD_SIZES,
    image: "/images/parfum20.png",
  },
  {
    id: "desert-citrus-garden",
    slug: "desert-citrus-garden",
    number: 250,
    name: "Desert Citrus Garden",
    subtitle: "Édition Botanique",
    category: "Eau de Parfum",
    collection: "floral",
    shortDescription:
      "Zitrus, Maté und grüne Kakteen-Nuance — kühl, luftig und wie Schatten über trockenem Sand.",
    description:
      "Frisch, grün und belebend mit einer klaren, natürlichen Ausstrahlung. Er kombiniert spritzige Zitrusnoten mit grünen, leicht herben Nuancen, die an Kakteen und trockene Landschaften erinnern, und verleiht so ein sehr erfrischendes, sauberes Gefühl. Im Verlauf bleibt er leicht, luftig und angenehm kühl, mit einer dezenten, modernen Frische.",
    inspiration:
      "Desert Citrus Garden denkt Wasser dort, wo es selten ist — Bergamotte und Zitrone wie ein erstes Blatt, Maté und ein grüner Kakteen-Akkord, die herbe Klarheit geben, weißer Moschus, der kühl bleibt. Für Hitze, Urlaub und jeden Tag, an dem man Luft statt Lautstärke will.",
    inspiredBy: "Cactus Garden",
    shortNotes: "Citrus · Mate · Green Accord · Musk",
    notes: {
      top: ["Bergamot", "Lemon", "Mandarin"],
      heart: ["Mate", "Green Accord", "Neroli"],
      base: ["Vetiver", "White Musk", "Ambrette"],
    },
    character: "Frisch · Grün · Belebend",
    longevity: STANDARD_LONGEVITY,
    concentration: STANDARD_CONCENTRATION,
    season: "Frühling · Sommer",
    occasion: "Alltag · Urlaub · heiße Tage",
    accent: "ivory",
    sizes: STANDARD_SIZES,
    image: "/images/parfum21.png",
  },
  // Weitere Düfte hier anfügen ↓
];

/**
 * PRODUCTS — Quelle der Wahrheit für alle Düfte der Maison.
 * Konzentration & Haltbarkeit werden hier automatisch auf den
 * Haus-Standard gesetzt. Auch für künftige Düfte.
 */
export const PRODUCTS: Product[] = RAW_PRODUCTS.map((p) => ({
  ...p,
  concentration: STANDARD_CONCENTRATION,
  longevity: STANDARD_LONGEVITY,
}));

export const FEATURED_PRODUCT =
  PRODUCTS.find((p) => p.featured) ?? PRODUCTS[0];

export function formatPriceEUR(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
}

export function getStartingPrice(product: Product): number {
  return Math.min(...product.sizes.map((s) => s.priceEUR));
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 3): Product[] {
  return PRODUCTS.filter((p) => p.id !== product.id).slice(0, count);
}

// -----------------------------------------------------------------------------
// Collections
// -----------------------------------------------------------------------------

export type CollectionMeta = {
  id: FragranceCollection;
  name: string;
  tagline: string;
  description: string;
  accent: "champagne" | "onyx" | "ivory";
};

export const COLLECTIONS: CollectionMeta[] = [
  {
    id: "signature",
    name: "Signature Collection",
    tagline: "The quiet elegance of the Maison.",
    description:
      "Die Kompositionen, die unser Haus definieren. Warm, leise und unverwechselbar — mit der weißen Lilie im Zentrum.",
    accent: "champagne",
  },
  {
    id: "intense",
    name: "Intense Collection",
    tagline: "Depth. Shadow. Gold.",
    description:
      "Opulente Extraits für den späten Abend — Amber, Oud und Leder, getragen von seltenen Harzen aus dem Mittelmeerraum.",
    accent: "onyx",
  },
  {
    id: "floral",
    name: "Floral Collection",
    tagline: "Light as silk, soft as morning.",
    description:
      "Luftige Eaux de Parfum rund um die Lilie — Iris, Tuberose und Orangenblüte in klaren, linearen Kompositionen.",
    accent: "ivory",
  },
];

export function getProductsByCollection(
  collection: FragranceCollection,
): Product[] {
  return PRODUCTS.filter((p) => p.collection === collection);
}
