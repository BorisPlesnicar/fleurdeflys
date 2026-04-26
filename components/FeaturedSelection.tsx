"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Section from "./Section";
import ProductCard from "./ProductCard";
import { FEATURED_PRODUCT, PRODUCTS, type Product } from "@/lib/products";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * FeaturedSelection — home-only teaser trio.
 * Three fragrances (one per collection) as a glimpse of the Maison.
 * The full catalogue lives on /shop, the editorial view on /collections.
 */
export default function FeaturedSelection() {
  // Homepage must show FOUR unique fragrances — one big in ProductShowcase
  // plus three teasers here. Skip the featured product, take one per
  // remaining collection, then fill up to three.
  const seen = new Set<string>([FEATURED_PRODUCT.id]);
  const teaser: Product[] = [];

  for (const coll of ["intense", "floral"] as const) {
    const p = PRODUCTS.find(
      (x) => x.collection === coll && !seen.has(x.id),
    );
    if (p) {
      teaser.push(p);
      seen.add(p.id);
    }
  }
  for (const p of PRODUCTS) {
    if (teaser.length >= 3) break;
    if (!seen.has(p.id)) {
      teaser.push(p);
      seen.add(p.id);
    }
  }

  // Solange außer dem Featured-Duft noch keine weiteren Kompositionen
  // existieren, wird die Sektion komplett ausgeblendet — keine leere Reihe.
  if (teaser.length === 0) return null;

  return (
    <Section id="selection" size="lg" className="bg-ivory">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease }}
        className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="max-w-2xl">
          <p className="eyebrow">Une sélection</p>
          <h2 className="display-headline mt-8 text-[40px] text-onyx sm:text-[52px] lg:text-[64px]">
            Ein erster Blick
            <br />
            <span className="italic text-dark-gold">in die Maison.</span>
          </h2>
        </div>
        <p className="max-w-sm text-[13.5px] leading-[1.85] text-muted-ink sm:text-[14.5px]">
          Weitere Kompositionen aus dem Atelier. Die vollständige Boutique
          finden Sie im Shop.
        </p>
      </motion.div>

      <div
        className={
          teaser.length === 1
            ? "mt-16 flex justify-center sm:mt-20"
            : teaser.length === 2
              ? "mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8"
              : "mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20"
        }
      >
        {teaser.map((product, i) => (
          <div
            key={product.id}
            className={teaser.length === 1 ? "w-full max-w-md" : ""}
          >
            <ProductCard product={product} index={i} />
          </div>
        ))}
      </div>

      <div className="mt-20 flex justify-center sm:mt-24">
        <Link
          href="/shop"
          className="group inline-flex h-14 items-center gap-3 border border-onyx/20 px-10 text-[11px] uppercase tracking-[0.36em] text-onyx transition-colors duration-500 hover:border-dark-gold hover:text-dark-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          <span className="h-px w-5 bg-current transition-all duration-500 group-hover:w-10" />
          Zur Boutique
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.5}
          />
        </Link>
      </div>
    </Section>
  );
}
