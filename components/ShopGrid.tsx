"use client";

import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "./ProductCard";
import Section from "./Section";

const ease = [0.22, 1, 0.36, 1] as const;

const COUNT_WORDS = [
  "Kein Duft",
  "Ein Duft",
  "Zwei Düfte",
  "Drei Düfte",
  "Vier Düfte",
  "Fünf Düfte",
  "Sechs Düfte",
  "Sieben Düfte",
];
function countLabel(n: number): string {
  return COUNT_WORDS[n] ?? `${n} Düfte`;
}

export default function ShopGrid() {
  const count = PRODUCTS.length;
  const headline =
    count === 1
      ? "Der erste Duft. Der Anfang einer Maison."
      : `${countLabel(count)}. Eine Handschrift.`;

  // Mobile: 1 col. Tablet: 1 col when only one product, otherwise 2.
  // Desktop: 1 col when one product, otherwise 3.
  const gridClass =
    count <= 1
      ? "mt-16 grid grid-cols-1 justify-items-center gap-y-14 sm:mt-20"
      : "mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20";

  // For a single product, constrain card width so it doesn't sprawl.
  const cardWrapperClass = count <= 1 ? "w-full max-w-md" : "";

  return (
    <Section size="lg" className="bg-ivory">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease }}
        className="flex flex-col gap-6 border-b border-border-soft pb-10 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="eyebrow">Collection</p>
          <h2 className="display-headline mt-6 text-[32px] text-onyx sm:text-[40px] lg:text-[48px]">
            {headline}
          </h2>
        </div>
        <p className="max-w-md text-[13.5px] leading-[1.85] text-muted-ink">
          {count === 1
            ? "Desert Whisper N° 114 ist der erste Duft, den wir in Serie gebracht haben — handwerklich gefertigt in Grasse. Weitere Kompositionen folgen."
            : "Jede Komposition wird in Grasse handwerklich gefertigt und mit eigenem Charakter abgefüllt — entworfen für den ruhigen Moment zwischen Haut, Stoff und Licht."}
        </p>
      </motion.div>

      <div className={gridClass}>
        {PRODUCTS.map((product, i) => (
          <div key={product.id} className={cardWrapperClass}>
            <ProductCard product={product} index={i} />
          </div>
        ))}
      </div>
    </Section>
  );
}
