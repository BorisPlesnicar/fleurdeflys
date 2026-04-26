import { PRODUCTS, type Product } from "./products";

/**
 * "Nach Duft-Verwandtschaft finden"
 * ---------------------------------------------------
 * Jedes Markenlogo ist eine Einstiegstür: Kunde kennt z. B. "Ombre Nomade"
 * von Louis Vuitton → Klick → landet auf unserem Pendant (Desert Whisper).
 *
 * Logik
 * - `matches`: Slugs der Düfte auf UNSERER Seite, die einem Duft dieser Marke
 *   nachempfunden sind. Wird live aus `Product.inspiredBy` + den brand-eigenen
 *   `inspiredBy`-Einträgen unten abgeleitet.
 * - Bild: einfach `/public/images/brands/<slug>.png` ablegen. Liegt kein Bild,
 *   zeigt das Grid automatisch einen eleganten Typo-Platzhalter.
 * - Klick-Verhalten:
 *   • genau 1 Match  →  /fragrance/<slug>
 *   • mehrere        →  /shop?marke=<slug>  (für später — aktuell /shop)
 *   • 0 Matches      →  Plättchen ist inaktiv (grayed out, nicht klickbar)
 *
 * Um einen neuen Match anzulegen, einfach `inspiredBy: "Ombre Nomade"` in
 * `lib/products.ts` setzen — das Mapping findet die Marke automatisch.
 */

export type BrandInspiration = {
  id: string;
  /** Angezeigter Markenname (inkl. ® wo gewünscht). */
  name: string;
  /** Datei-Slug für Asset-Lookup unter /images/brands/<slug>.png. */
  slug: string;
  /**
   * Düfte dieser Marke, die wir als Referenzen auf unserer Seite haben.
   * Matching passiert über `Product.inspiredBy` (case-insensitive, substring-match).
   */
  fragrances: string[];
  /** Sonderrolle: "ALLE" und "Restliche Marken" linken immer auf /shop. */
  variant?: "all" | "other";
};

export const BRAND_INSPIRATIONS: BrandInspiration[] = [
  {
    id: "alle",
    name: "ALLE",
    slug: "alle",
    fragrances: [],
    variant: "all",
  },
  {
    id: "xerjoff",
    name: "Xerjoff®",
    slug: "xerjoff",
    fragrances: ["Erba Pura", "Naxos", "Alexandria II", "Accento"],
  },
  {
    id: "louis-vuitton",
    name: "Louis Vuitton®",
    slug: "louis-vuitton",
    fragrances: [
      "Ombre Nomade",
      "Nouveau Monde",
      "Nuit de Feu",
      "Imagination",
      "Afternoon Swim",
      "Pacific Chill",
      "On the Beach",
      "Orage",
      "California Dream",
      "Cactus Garden",
      "City of Stars",
      "Fleur du Désert",
      "L'Immensité",
      "Les Sables Roses",
      "Lovers",
      "Météore",
      "Sun Song",
      "Spell On You",
      "Symphony",
      "Attrape-Rêves",
      "eLVes",
      "Au Hasard",
    ],
  },
  {
    id: "tom-ford",
    name: "Tom Ford®",
    slug: "tom-ford",
    fragrances: [
      "Oud Wood",
      "Tobacco Vanille",
      "Lost Cherry",
      "Black Orchid",
      "Fucking Fabulous",
    ],
  },
  {
    id: "clive-christian",
    name: "Clive Christian®",
    slug: "clive-christian",
    fragrances: ["No 1", "1872", "Addictive Arts", "X"],
  },
  {
    id: "parfums-de-marly",
    name: "Parfums de Marly®",
    slug: "parfums-de-marly",
    fragrances: ["Layton", "Delina", "Herod", "Pegasus", "Althaïr", "Oajan"],
  },
  {
    id: "initio",
    name: "Initio®",
    slug: "initio",
    fragrances: [
      "Oud for Greatness",
      "Side Effect",
      "Rehab",
      "Paragon",
      "Musk Therapy",
    ],
  },
  {
    id: "kilian",
    name: "Kilian®",
    slug: "kilian",
    fragrances: [
      "Angels' Share",
      "Rolling in Love",
      "Good Girl Gone Bad",
      "Black Phantom",
    ],
  },
  {
    id: "montale",
    name: "Montale®",
    slug: "montale",
    fragrances: ["Arabians Tonka", "Intense Café", "Roses Musk", "Chocolate Greedy"],
  },
  {
    id: "dior",
    name: "Dior®",
    slug: "dior",
    fragrances: ["Sauvage", "Sauvage Elixir", "Homme Intense", "Fahrenheit"],
  },
  {
    id: "restliche-marken",
    name: "Restliche Marken",
    slug: "restliche-marken",
    fragrances: [],
    variant: "other",
  },
];

// ---------------------------------------------------------------------------
// Runtime helpers
// ---------------------------------------------------------------------------

export type BrandMatch = {
  brand: BrandInspiration;
  matches: Product[];
  /** Final destination when the user clicks the tile. */
  href: string;
  /** Is the tile interactive (i.e. do we have at least one match or is it "ALLE"/"Rest"). */
  enabled: boolean;
};

/** Returns the products on our site that correspond to the given brand. */
export function getBrandMatches(brand: BrandInspiration): Product[] {
  if (brand.variant) return []; // "ALLE" / "Restliche Marken" haben keine direkten Matches
  const needles = brand.fragrances.map((n) => n.toLowerCase());
  return PRODUCTS.filter((p) => {
    if (!p.inspiredBy) return false;
    const ref = p.inspiredBy.toLowerCase();
    return needles.some((n) => ref.includes(n) || n.includes(ref));
  });
}

export function resolveBrand(brand: BrandInspiration): BrandMatch {
  if (brand.variant === "all" || brand.variant === "other") {
    return { brand, matches: [], href: "/shop", enabled: true };
  }
  const matches = getBrandMatches(brand);
  if (matches.length === 0) {
    return { brand, matches, href: "/shop", enabled: false };
  }
  if (matches.length === 1) {
    return {
      brand,
      matches,
      href: `/fragrance/${matches[0].slug}`,
      enabled: true,
    };
  }
  // Mehrere Matches → für später als Shop-Filter vorbereitet.
  return {
    brand,
    matches,
    href: `/shop#marke-${brand.slug}`,
    enabled: true,
  };
}
