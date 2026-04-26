"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Plus,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { Product, formatPriceEUR } from "@/lib/products";
import ProductImagePlaceholder from "./ProductImagePlaceholder";
import Accordion, { type AccordionItemData } from "./Accordion";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  product: Product;
};

/**
 * FragranceDetailView — sales-first product detail.
 *
 * Layout:
 *  • Sticky bottle on the left.
 *  • Right column: title + tagline + buy-box (size + price + CTA) above the
 *    fold, followed by a FAQ-style accordion that progressively reveals every
 *    piece of information a buyer might want — from olfactive notes to
 *    shipping policy and frequently asked questions.
 */
export default function FragranceDetailView({ product }: Props) {
  const [selectedMl, setSelectedMl] = useState<number>(product.sizes[0].ml);
  const selectedSize =
    product.sizes.find((s) => s.ml === selectedMl) ?? product.sizes[0];

  const items = buildAccordionItems(product);

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-20">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
        className="lg:sticky lg:top-32 lg:col-span-6"
      >
        <div className="relative">
          <div className="pointer-events-none absolute -left-4 -top-4 hidden h-24 w-24 border-l border-t border-soft-gold/40 sm:block" />
          <div className="pointer-events-none absolute -bottom-4 -right-4 hidden h-24 w-24 border-b border-r border-soft-gold/40 sm:block" />
          <ProductImagePlaceholder
            product={product}
            aspect="4/5"
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            imageClassName="p-8 sm:p-14 lg:p-20"
          />
        </div>

        <div className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-[0.36em] text-muted-ink/80">
          <span>{product.category}</span>
          <span className="tabular-nums">{selectedSize.ml} ml</span>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
        className="lg:col-span-6"
      >
        {/* Header */}
        <p className="eyebrow">{product.subtitle}</p>
        <h1 className="display-headline mt-6 text-[clamp(2rem,9vw,2.75rem)] text-onyx sm:mt-8 sm:text-[60px] lg:text-[72px]">
          {product.name}
        </h1>
        <p className="mt-5 font-display text-[1.25rem] italic leading-snug text-dark-gold sm:mt-6 sm:text-[26px]">
          {product.shortDescription}
        </p>

        {product.inspiredBy && (
          <p className="mt-6 flex items-baseline gap-3 text-[12px] uppercase tracking-[0.36em] text-muted-ink">
            <span
              aria-hidden
              className="inline-block h-px w-7 flex-shrink-0 translate-y-[-3px] bg-dark-gold/70"
            />
            <span>
              …riecht wie{" "}
              <span className="font-display text-[16px] normal-case tracking-normal text-onyx">
                {product.inspiredBy}®
              </span>
            </span>
          </p>
        )}

        <div className="divider-gold mt-10 max-w-[280px]" />

        {/* ---------- Buy box (above the fold) ---------- */}
        <div className="mt-10">
          <div className="flex items-baseline justify-between gap-6">
            <p className="eyebrow">Format</p>
            <motion.span
              key={selectedSize.priceEUR}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="font-display text-[26px] leading-none tabular-nums text-onyx sm:text-[28px]"
            >
              {formatPriceEUR(selectedSize.priceEUR)}
            </motion.span>
          </div>

          <div
            role="radiogroup"
            aria-label="Größe wählen"
            className="mt-5 inline-flex w-full overflow-hidden border border-onyx/15 sm:max-w-md"
          >
            {product.sizes.map((s) => {
              const active = s.ml === selectedMl;
              return (
                <button
                  key={s.ml}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSelectedMl(s.ml)}
                  className={`min-h-[3.25rem] flex-1 touch-manipulation px-4 py-3.5 text-left transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/70 sm:min-h-0 sm:px-5 sm:py-4 ${
                    active
                      ? "bg-onyx text-ivory"
                      : "bg-transparent text-onyx hover:bg-onyx/5"
                  }`}
                >
                  <span className="block text-[10px] uppercase tracking-[0.34em] opacity-75">
                    {s.ml} ml
                  </span>
                  <span className="mt-2 block font-display text-[19px] leading-none tabular-nums">
                    {formatPriceEUR(s.priceEUR)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              className="group inline-flex min-h-14 w-full touch-manipulation flex-1 items-center justify-center gap-2.5 bg-onyx px-5 py-3.5 text-[10px] uppercase leading-snug tracking-[0.32em] text-ivory transition-colors duration-500 hover:bg-dark-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory sm:w-auto sm:gap-3 sm:px-8 sm:text-[11px] sm:tracking-[0.36em]"
            >
              <Plus
                className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:rotate-90"
                strokeWidth={1.5}
              />
              <span className="text-center">
                In den Warenkorb · {formatPriceEUR(selectedSize.priceEUR)}
              </span>
            </button>
            <Link
              href="/shop"
              className="group inline-flex min-h-14 w-full touch-manipulation items-center justify-center gap-3 border border-onyx/20 px-7 py-3.5 text-[11px] uppercase tracking-[0.36em] text-onyx transition-colors duration-500 hover:border-dark-gold hover:text-dark-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory sm:w-auto"
            >
              Alle Düfte
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>

          {/* Trust strip */}
          <ul className="mt-8 grid grid-cols-1 gap-3 text-[11px] uppercase tracking-[0.28em] text-muted-ink sm:grid-cols-3">
            <li className="flex items-center gap-2.5">
              <Truck className="h-3.5 w-3.5 text-dark-gold" strokeWidth={1.5} />
              Versand 2 – 4 Werktage
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck
                className="h-3.5 w-3.5 text-dark-gold"
                strokeWidth={1.5}
              />
              30 Tage Rückgabe
            </li>
            <li className="flex items-center gap-2.5">
              <Sparkles
                className="h-3.5 w-3.5 text-dark-gold"
                strokeWidth={1.5}
              />
              Made in France
            </li>
          </ul>
        </div>

        {/* ---------- Detail accordion ---------- */}
        <div className="mt-14">
          <p className="eyebrow">Détails du parfum</p>
          <Accordion items={items} defaultOpen="description" className="mt-6" />
        </div>
      </motion.div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Accordion content builder
// -----------------------------------------------------------------------------

function buildAccordionItems(product: Product): AccordionItemData[] {
  const items: AccordionItemData[] = [];

  // 01 — Description
  items.push({
    id: "description",
    label: "01 · Beschreibung",
    content: (
      <div className="space-y-5">
        <p className="max-w-[58ch]">{product.description}</p>
        <p className="text-[11px] uppercase tracking-[0.34em] text-dark-gold">
          {product.shortNotes}
        </p>
      </div>
    ),
  });

  // 02 — Olfactive pyramid
  items.push({
    id: "notes",
    label: "02 · Duftnoten",
    content: (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
        {(["top", "heart", "base"] as const).map((layer) => (
          <div key={layer}>
            <p className="text-[10px] uppercase tracking-[0.36em] text-dark-gold">
              {layer === "top" ? "Kopf" : layer === "heart" ? "Herz" : "Basis"}
            </p>
            <ul className="mt-4 space-y-1.5">
              {product.notes[layer].map((n) => (
                <li
                  key={n}
                  className="font-display text-[18px] leading-snug text-onyx"
                >
                  {n}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  });

  // 03 — Character, season, occasion
  items.push({
    id: "character",
    label: "03 · Charakter & Anlass",
    content: (
      <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <DLItem label="Charakter" value={product.character} />
        <DLItem label="Konzentration" value={product.concentration} />
        <DLItem label="Haltbarkeit" value={product.longevity} />
        <DLItem
          label="Format"
          value={product.sizes.map((s) => `${s.ml} ml`).join(" · ")}
        />
        {product.season && <DLItem label="Saison" value={product.season} />}
        {product.occasion && <DLItem label="Anlass" value={product.occasion} />}
      </dl>
    ),
  });

  // 04 — The composition / inspiration
  items.push({
    id: "composition",
    label: "04 · Die Komposition",
    content: (
      <div className="space-y-6">
        <p className="max-w-[58ch]">{product.inspiration}</p>
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 pt-2 sm:grid-cols-3">
          <DLItem small label="Parfumeur" value="Atelier FLEUR DE LYS" />
          <DLItem small label="Herkunft" value="Grasse · France" />
          <DLItem small label="Reifung" value="12 Monate · Eiche" />
        </div>
      </div>
    ),
  });

  // 05 — Care & shipping
  items.push({
    id: "service",
    label: "05 · Pflege, Versand & Rückgabe",
    content: (
      <div className="space-y-7">
        <div>
          <p className="text-[10px] uppercase tracking-[0.36em] text-dark-gold">
            Pflege
          </p>
          <p className="mt-3 max-w-[56ch]">
            Bewahren Sie {product.name} an einem kühlen, dunklen Ort auf —
            Sonnenlicht und Temperaturschwankungen verändern den olfaktorischen
            Charakter. Einmal geöffnet, bleibt der Duft mindestens{" "}
            <span className="text-onyx">36 Monate</span> stabil.
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.36em] text-dark-gold">
            Versand
          </p>
          <p className="mt-3 max-w-[56ch]">
            Kostenfrei innerhalb Europas ab 80 €. Versand aus Paris in
            Pergament, Siegel und signierter Maison-Karte. Lieferzeit
            2 – 4 Werktage.
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.36em] text-dark-gold">
            Rückgabe
          </p>
          <p className="mt-3 max-w-[56ch]">
            Sie haben 30 Tage Zeit, Ihre Bestellung an uns zurückzuschicken —
            ungeöffnete Flakons werden selbstverständlich erstattet.
          </p>
        </div>
      </div>
    ),
  });

  // 06 — FAQ
  items.push({
    id: "faq",
    label: "06 · Häufige Fragen",
    content: <Faq product={product} />,
  });

  return items;
}

// -----------------------------------------------------------------------------
// Small helpers
// -----------------------------------------------------------------------------

function DLItem({
  label,
  value,
  small = false,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div>
      <dt
        className={`text-[10px] uppercase tracking-[0.34em] text-muted-ink/80`}
      >
        {label}
      </dt>
      <dd
        className={`mt-2 font-display ${small ? "text-[16px]" : "text-[19px]"} leading-tight text-onyx`}
      >
        {value}
      </dd>
    </div>
  );
}

function Faq({ product }: { product: Product }) {
  const seasonAnswer =
    product.season && product.occasion
      ? `Wir empfehlen ${product.name} besonders für ${product.season.toLowerCase()} und Anlässe wie ${product.occasion.toLowerCase()}. Der Charakter ist ${product.character.toLowerCase()} — eine Komposition, die in den späten Stunden ihre volle Tiefe zeigt.`
      : `${product.name} ist eine ganzjährige Komposition. Der Charakter ist ${product.character.toLowerCase()} — wir entwickeln keine Düfte für eine einzige Saison.`;

  const questions: { q: string; a: React.ReactNode }[] = [
    {
      q: `Wie lange hält ${product.name} auf der Haut?`,
      a: (
        <>
          Mit{" "}
          <span className="text-onyx">{product.longevity}</span> ist{" "}
          {product.name} eine außergewöhnlich langanhaltende Komposition.
          Tragen Sie ihn auf Pulspunkten — Handgelenk, Halsansatz, hinter dem
          Ohr — dort bleibt der Duft am längsten. Auf Stoffen wie Leinen oder
          Wolle hält die Sillage sogar über mehrere Tage.
        </>
      ),
    },
    {
      q: "Wann trage ich den Duft am besten?",
      a: <>{seasonAnswer}</>,
    },
    {
      q: "Ist der Duft für Männer oder Frauen?",
      a: (
        <>
          Für beide. Alle Kompositionen der Maison sind bewusst
          geschlechtsneutral entworfen — ein Duft wird vom Träger geprägt, nicht
          umgekehrt.
        </>
      ),
    },
    {
      q: "Wie viele Sprühstöße empfehlen Sie?",
      a: (
        <>
          Zwei bis drei Sprühstöße auf Pulspunkten reichen für den ganzen Tag.
          Ein zusätzlicher Sprühstoß in die Luft, durch den Sie hindurchgehen,
          verleiht eine zarte, getragene Aura — besonders schön auf Leinen und
          Wolle. Niemals verreiben.
        </>
      ),
    },
    {
      q: "Kann ich den Duft mit anderen kombinieren?",
      a: (
        <>
          Ja, Layering gehört zur Maison-Philosophie. Eine hellere Komposition
          unserer Floral-Linie verbindet sich wunderbar mit einer wärmeren aus
          der Intense-Linie — die erste setzt den Ton, die zweite die Tiefe.
        </>
      ),
    },
  ];

  return (
    <ul className="space-y-6 pl-0">
      {questions.map(({ q, a }) => (
        <li
          key={q}
          className="border-l border-soft-gold/40 pl-5"
        >
          <p className="flex items-start gap-3 font-display text-[17px] leading-snug text-onyx">
            <Check
              className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-dark-gold"
              strokeWidth={2}
            />
            {q}
          </p>
          <p className="mt-3 max-w-[58ch]">{a}</p>
        </li>
      ))}
    </ul>
  );
}
