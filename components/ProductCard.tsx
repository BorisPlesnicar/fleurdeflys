"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { Product, formatPriceEUR } from "@/lib/products";
import ProductImagePlaceholder from "./ProductImagePlaceholder";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: Props) {
  const [selectedMl, setSelectedMl] = useState<number>(product.sizes[0].ml);
  const selectedSize =
    product.sizes.find((s) => s.ml === selectedMl) ?? product.sizes[0];
  const href = `/fragrance/${product.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease, delay: index * 0.08 }}
      className="group relative flex h-full flex-col overflow-hidden border border-border-soft bg-ivory transition-all duration-700 hover:-translate-y-1 hover:border-soft-gold/50 hover:shadow-[var(--shadow-gold)]"
    >
      <Link
        href={href}
        aria-label={`${product.name} — Details`}
        className="block"
      >
        <ProductImagePlaceholder product={product} />
      </Link>

      <div className="flex flex-1 flex-col gap-5 p-5 sm:gap-6 sm:p-8">
        <div>
          <Link href={href} className="block">
            <h3 className="font-display text-[1.625rem] leading-[1.08] tracking-tight text-onyx transition-colors duration-500 group-hover:text-dark-gold sm:text-[30px]">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 text-[11px] uppercase tracking-[0.34em] text-muted-ink/80">
            {product.subtitle}
          </p>
        </div>

        <p className="text-[13.5px] leading-[1.75] text-muted-ink">
          {product.shortDescription}
        </p>

        {product.inspiredBy && (
          <p className="flex items-baseline gap-3 font-display text-[14px] italic leading-[1.5] text-muted-ink">
            <span
              aria-hidden
              className="inline-block h-px w-5 flex-shrink-0 translate-y-[-4px] bg-dark-gold/60"
            />
            <span>
              …riecht wie{" "}
              <span className="not-italic font-medium text-onyx">
                {product.inspiredBy}®
              </span>
            </span>
          </p>
        )}

        <div className="divider-gold" />

        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.34em] text-muted-ink/80">
              Size
            </span>
            <motion.span
              key={selectedSize.priceEUR}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="font-display text-[22px] leading-none tabular-nums text-onyx"
            >
              {formatPriceEUR(selectedSize.priceEUR)}
            </motion.span>
          </div>
          <div
            role="radiogroup"
            aria-label="Größe"
            className="mt-4 inline-flex w-full overflow-hidden border border-onyx/15"
          >
            {product.sizes.map((s) => {
              const active = s.ml === selectedMl;
              return (
                <button
                  key={s.ml}
                  role="radio"
                  aria-checked={active}
                  type="button"
                  onClick={() => setSelectedMl(s.ml)}
                  className={`min-h-11 flex-1 touch-manipulation px-3 py-3.5 text-[10px] uppercase tracking-[0.34em] transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/70 sm:min-h-0 sm:px-4 ${
                    active
                      ? "bg-onyx text-ivory"
                      : "bg-transparent text-onyx hover:bg-onyx/5"
                  }`}
                >
                  {s.ml} ml
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <button
            type="button"
            className="group/btn inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 bg-onyx px-6 py-3 text-[11px] uppercase tracking-[0.36em] text-ivory transition-colors duration-500 hover:bg-dark-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            <Plus
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:rotate-90"
              strokeWidth={1.5}
            />
            Add to Cart
          </button>
          <Link
            href={href}
            className="group/btn inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 border border-onyx/20 bg-transparent px-6 py-3 text-[11px] uppercase tracking-[0.36em] text-onyx transition-colors duration-500 hover:border-dark-gold hover:text-dark-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            Details
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
