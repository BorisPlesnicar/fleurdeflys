// LOGO: Pfade zu den Brand-Assets. Austausch nur hier.
export const LOGO_SRC = "/images/logotransparent.png";

// BILD: Editorial-Fotos für Hero & Story/Collection. Einfach eigene Dateien
// unter /public/images/ mit denselben Namen ersetzen.
/** Hero-Hintergrund (`public/images/hero.jpg` — echtes JPEG, keine PNG-Datei mit .jpg-Endung). */
export const HERO_IMAGE = "/images/hero.jpg";
export const COLLECTION_HERO_IMAGE = "/images/collection-hero.jpg";

// BILD: Produkt-Platzhalter für Flasche (wird in ProductCard & ProductShowcase
// verwendet). Pro Produkt lässt sich ein eigenes Bild hinterlegen, indem die
// `image`-Property in lib/products.ts gesetzt wird.
export const PRODUCT_PLACEHOLDER = "/images/parfum1.png";

export const BRAND = {
  name: "FLEUR DE LYS",
  tagline: "A composition of quiet elegance.",
  house: "Maison de Parfum · Paris",
} as const;

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
];
