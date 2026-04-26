"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Section from "./Section";
import ProductImagePlaceholder from "./ProductImagePlaceholder";
import { FEATURED_PRODUCT, formatPriceEUR, getStartingPrice } from "@/lib/products";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * ProductShowcase — home-only editorial cover for the featured fragrance.
 * Deliberately SLIM: it is a teaser that points to /fragrance/[slug].
 * The full product experience (notes pyramid, size selector, details)
 * lives on the detail page — never duplicated here.
 */
export default function ProductShowcase() {
  const p = FEATURED_PRODUCT;
  const href = `/fragrance/${p.slug}`;
  const startingPrice = getStartingPrice(p);

  return (
    <Section
      id="showcase"
      size="lg"
      className="overflow-hidden bg-[linear-gradient(180deg,#f8f5ef_0%,#f2ede3_60%,#ece3d2_100%)]"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(700px 500px at 85% 15%, rgba(201,162,74,0.08), transparent 70%)",
        }}
      />

      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease }}
          className="relative order-2 lg:order-1 lg:col-span-6"
        >
          <div className="relative">
            <div className="pointer-events-none absolute -left-4 -top-4 hidden h-24 w-24 border-l border-t border-soft-gold/40 sm:block" />
            <div className="pointer-events-none absolute -bottom-4 -right-4 hidden h-24 w-24 border-b border-r border-soft-gold/40 sm:block" />
            <Link href={href} aria-label={`${p.name} — Details`} className="block">
              <ProductImagePlaceholder
                product={p}
                aspect="4/5"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                imageClassName="p-12 sm:p-16"
              />
            </Link>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="order-1 lg:order-2 lg:col-span-6"
        >
          <p className="eyebrow">La Signature · {p.category}</p>
          <h2 className="display-headline mt-8 text-[44px] text-onyx sm:text-[60px] lg:text-[76px]">
            {p.name}
          </h2>

          <p className="mt-8 max-w-md font-display text-[22px] italic leading-snug text-dark-gold sm:text-[26px]">
            {p.shortDescription}
          </p>

          <div className="divider-gold mt-10 max-w-[240px]" />

          <dl className="mt-12 grid max-w-md grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.34em] text-muted-ink/80">
                Konzentration
              </dt>
              <dd className="mt-3 font-display text-[18px] text-onyx">
                {p.concentration}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.34em] text-muted-ink/80">
                Ab
              </dt>
              <dd className="mt-3 font-display text-[18px] tabular-nums text-onyx">
                {formatPriceEUR(startingPrice)}
              </dd>
            </div>
          </dl>

          <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href={href}
              className="group inline-flex h-14 items-center justify-center gap-3 bg-onyx px-10 text-[11px] uppercase tracking-[0.36em] text-ivory transition-colors duration-500 hover:bg-dark-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              View Fragrance
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
            <Link
              href="/shop"
              className="group inline-flex h-14 items-center justify-center gap-3 border border-onyx/25 px-10 text-[11px] uppercase tracking-[0.36em] text-onyx transition-colors duration-500 hover:border-dark-gold hover:text-dark-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              Alle Düfte
            </Link>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
