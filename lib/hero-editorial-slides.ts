export type EditorialSlide = {
  id: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  cta: { label: string; href: string };
  align?: "left" | "right" | "center";
  overlay?: "left" | "right" | "center" | "bottom";
};

/** Slides for the secondary home slideshow (not the main hero). */
export const EDITORIAL_SLIDES: EditorialSlide[] = [
  {
    id: "neueroffnung",
    image: "/images/slide-neueroffnung.png",
    alt: "Maison FLEUR DE LYS — Eröffnung in Paris",
    eyebrow: "Maison · 2026",
    title: "Die Maison",
    titleAccent: "öffnet ihre Türen.",
    subtitle:
      "Der erste Akt einer neuen Pariser Parfümerie — Desert Whisper N° 114 öffnet das Buch.",
    cta: { label: "Kollektionen entdecken", href: "/collections" },
    align: "right",
    overlay: "right",
  },
  {
    id: "desert-whisper",
    image: "/images/slide-desert-whisper.png",
    alt: "Desert Whisper N° 114 — Première de la Maison",
    eyebrow: "Première · N° 114",
    title: "Desert Whisper.",
    titleAccent: "Rauchig. Mystisch.",
    subtitle:
      "Oud, Leder und Weihrauch — der erste Duft, den wir in Serie gebracht haben. Riecht wie Ombre Nomade®.",
    cta: { label: "Den Duft entdecken", href: "/fragrance/desert-whisper" },
    align: "right",
    overlay: "right",
  },
  {
    id: "boutique",
    image: "/images/slide-signature.png",
    alt: "La Boutique — handwerklich abgefüllt in Grasse",
    eyebrow: "La Boutique",
    title: "Die Boutique",
    titleAccent: "ist geöffnet.",
    subtitle:
      "Handwerklich abgefüllt in Grasse — Versand aus Paris in Pergament, Siegel und signierter Maison-Karte.",
    cta: { label: "Boutique öffnen", href: "/shop" },
    align: "left",
    overlay: "left",
  },
];
