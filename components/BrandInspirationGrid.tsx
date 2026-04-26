"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  BRAND_INSPIRATIONS,
  resolveBrand,
  type BrandInspiration,
  type BrandMatch,
} from "@/lib/brand-inspirations";

const ease = [0.22, 1, 0.36, 1] as const;

export default function BrandInspirationGrid() {
  const tiles = BRAND_INSPIRATIONS.map(resolveBrand);

  return (
    <div className="relative">
      {/* Horizontal-scrollable rail on mobile, flexible wrap on desktop */}
      <div className="flex snap-x snap-mandatory gap-7 overflow-x-auto pb-6 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-10 md:flex-wrap md:justify-center md:gap-x-10 md:gap-y-12 md:overflow-visible lg:gap-x-14">
        {tiles.map((tile, i) => (
          <BrandTile key={tile.brand.id} tile={tile} index={i} />
        ))}
      </div>

      {/* Helper line */}
      <p className="mt-6 text-center text-[11px] uppercase tracking-[0.32em] text-muted-ink/70">
        Duft-Verwandtschaft · klicken, um das Pendant der Maison zu sehen
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tile
// ---------------------------------------------------------------------------

function BrandTile({ tile, index }: { tile: BrandMatch; index: number }) {
  const { brand, href, enabled } = tile;
  const [hovered, setHovered] = useState(false);

  const content = (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease, delay: index * 0.04 }}
      className="group flex w-[92px] shrink-0 snap-start flex-col items-center gap-4 text-center sm:w-[108px] md:w-[124px]"
    >
      {/* Circle */}
      <div
        className={`relative flex h-[86px] w-[86px] items-center justify-center overflow-hidden rounded-full border border-onyx/10 bg-ivory-soft shadow-[0_8px_30px_-18px_rgba(20,17,12,0.35)] transition-all duration-500 sm:h-[100px] sm:w-[100px] md:h-[112px] md:w-[112px] ${
          enabled
            ? "group-hover:-translate-y-1 group-hover:border-dark-gold/40 group-hover:shadow-[0_18px_40px_-20px_rgba(20,17,12,0.4)]"
            : "opacity-55 saturate-0"
        }`}
      >
        <BrandVisual brand={brand} focused={hovered && enabled} />

        {/* Soft gold ring on hover */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 rounded-full ring-1 ring-transparent transition-all duration-500 ${
            enabled ? "group-hover:ring-dark-gold/30" : ""
          }`}
        />
      </div>

      {/* Label */}
      <span
        className={`font-display text-[12px] leading-[1.35] tracking-[0.02em] transition-colors duration-500 sm:text-[13px] ${
          enabled
            ? "text-onyx group-hover:text-dark-gold"
            : "text-muted-ink/75"
        }`}
      >
        {brand.name}
      </span>
    </motion.div>
  );

  if (!enabled) {
    return (
      <div
        aria-disabled
        tabIndex={-1}
        className="cursor-not-allowed"
        title="Aktuell noch kein Pendant in der Maison verfügbar"
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      aria-label={`${brand.name} — entsprechenden Duft der Maison anzeigen`}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-gold/50 focus-visible:ring-offset-4 focus-visible:ring-offset-ivory rounded-full"
    >
      {content}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Visual (real blurred image with elegant typographic fallback)
// ---------------------------------------------------------------------------

function BrandVisual({
  brand,
  focused,
}: {
  brand: BrandInspiration;
  focused: boolean;
}) {
  // Expected image path. Drop any real brand bottle/logo picture here and it
  // will be used automatically: /public/images/brands/<slug>.(png|jpg|webp)
  // (we prefer png but Next/Image handles all three formats identically).
  const imageSrc = `/images/brands/${brand.slug}.png`;
  const [failed, setFailed] = useState(false);

  // "ALLE" and "Restliche Marken" get dedicated, always-typographic tiles.
  if (brand.variant === "all") {
    return (
      <AllVariant focused={focused} />
    );
  }
  if (brand.variant === "other") {
    return (
      <OtherVariant focused={focused} />
    );
  }

  if (failed) {
    return <TypographicPlaceholder brand={brand} focused={focused} />;
  }

  return (
    <>
      {/* Blurred real image — on hover the blur lifts slightly to hint the brand */}
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="112px"
        onError={() => setFailed(true)}
        className={`object-cover transition-[filter,transform] duration-700 ${
          focused
            ? "scale-[1.04] blur-[8px]"
            : "scale-100 blur-[14px]"
        }`}
      />
      {/* Ivory wash to keep the palette consistent with the Maison */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-ivory/20 via-transparent to-onyx/10"
      />
    </>
  );
}

function TypographicPlaceholder({
  brand,
  focused,
}: {
  brand: BrandInspiration;
  focused: boolean;
}) {
  // Elegant serif monogram, blurred the same way a real image would be.
  // We use the brand's initials (max 2 letters) so the tile keeps its mystery.
  const letters = brand.name
    .replace(/®|™/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <>
      <div
        className={`absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_10%,#E8DEC6_0%,#C9A24A_45%,#665028_100%)] transition-all duration-700 ${
          focused ? "scale-[1.04] blur-[6px]" : "scale-100 blur-[11px]"
        }`}
      />
      <span
        aria-hidden
        className={`relative font-display text-[28px] font-medium leading-none tracking-[0.08em] text-ivory drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-[filter] duration-700 ${
          focused ? "blur-[1.2px]" : "blur-[2.5px]"
        }`}
      >
        {letters}
      </span>
    </>
  );
}

function AllVariant({ focused }: { focused: boolean }) {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_30%_20%,#FFFDF7_0%,#F3ECDC_55%,#E3D9C1_100%)]" />
      {/* Three tiny bottle silhouettes */}
      <div
        className={`relative flex items-end gap-[6px] transition-transform duration-700 ${
          focused ? "scale-[1.05]" : "scale-100"
        }`}
      >
        {[0.85, 1, 0.85].map((h, i) => (
          <span
            key={i}
            className="block w-[10px] rounded-[3px] border border-onyx/25 bg-gradient-to-b from-ivory to-ivory-soft"
            style={{ height: `${28 * h}px` }}
          />
        ))}
      </div>
    </>
  );
}

function OtherVariant({ focused }: { focused: boolean }) {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_70%_30%,#F1E7D1_0%,#CDB88A_55%,#8B7246_100%)]" />
      <span
        className={`relative font-display text-[34px] font-medium leading-none text-ivory drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-all duration-700 ${
          focused ? "translate-y-[-1px]" : ""
        }`}
      >
        …
      </span>
    </>
  );
}
