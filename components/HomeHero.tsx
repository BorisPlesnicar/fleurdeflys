"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EDITORIAL_SLIDES } from "@/lib/hero-editorial-slides";
import { HERO_IMAGE } from "@/lib/branding";
import { FEATURED_PRODUCT, PRODUCTS, type Product } from "@/lib/products";

const ease = [0.22, 1, 0.36, 1] as const;
const intro = EDITORIAL_SLIDES[0];
const ROTATE_MS = 4800;

type HeroProduct = Product & { image: string };

export default function HomeHero() {
  const reduceMotion = useReducedMotion();
  const heroProducts = useMemo(
    () => PRODUCTS.filter((p): p is HeroProduct => Boolean(p.image)),
    [],
  );
  const startIndex = useMemo(() => {
    const i = heroProducts.findIndex((p) => p.id === FEATURED_PRODUCT.id);
    return i >= 0 ? i : 0;
  }, [heroProducts]);
  const [index, setIndex] = useState(startIndex);
  const active =
    heroProducts.length > 0
      ? heroProducts[index % heroProducts.length]
      : undefined;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % Math.max(heroProducts.length, 1));
  }, [heroProducts.length]);

  useEffect(() => {
    if (reduceMotion || heroProducts.length <= 1) return;
    const id = window.setInterval(next, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, heroProducts.length, next]);

  const hasBottle = Boolean(active?.image);

  return (
    <section
      aria-label="FLEUR DE LYS — Willkommen"
      className="relative isolate -mt-16 min-h-[100svh] w-full overflow-hidden bg-onyx pb-[max(7rem,env(safe-area-inset-bottom,0px)+5.5rem)] pt-24 text-ivory supports-[min-height:100dvh]:min-h-[100dvh] sm:-mt-20 sm:pb-32 sm:pt-32 lg:min-h-[min(100svh,920px)] lg:pb-28 lg:pt-24"
    >
      {/* Hintergrund: Foto + dezente Lesbarkeit — ohne „Glass-Stack“ */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={reduceMotion ? { scale: 1 } : { scale: [1, 1.02, 1] }}
          transition={{
            duration: 36,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_45%] sm:object-[center_40%]"
          />
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(165deg,rgba(10,9,8,0.92)_0%,rgba(12,11,9,0.78)_38%,rgba(12,11,9,0.32)_62%,rgba(8,7,6,0.58)_100%)] lg:hidden"
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-[linear-gradient(100deg,rgba(12,11,9,0.88)_0%,rgba(12,11,9,0.72)_42%,rgba(12,11,9,0.28)_72%,rgba(12,11,9,0.45)_100%)] lg:block"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_100%,rgba(0,0,0,0.35)_0%,transparent_55%)]"
        />
        <div
          aria-hidden
          className="grain pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay"
        />
        {/* Rechte Bildhälfte etwas abdunkeln — Typo + Flakon lesbarer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-full max-w-[min(100%,520px)] bg-[linear-gradient(270deg,rgba(8,7,6,0.78)_0%,rgba(8,7,6,0.35)_45%,transparent_100%)] sm:max-w-[560px] lg:block lg:max-w-[640px]"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[inherit] w-full max-w-[1320px] flex-col gap-10 px-4 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:gap-20 sm:px-12 sm:pl-12 sm:pr-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-16 xl:px-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease }}
          className="max-w-lg flex-1 lg:max-w-[520px] lg:pt-4"
        >
          <p className="flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-soft-gold sm:text-[12px]">
            <span className="inline-block h-px w-8 bg-soft-gold/70" />
            {intro.eyebrow}
          </p>

          <h1 className="display-headline mt-5 text-[clamp(2.15rem,6.5vw,5rem)] leading-[0.96] tracking-tight text-ivory sm:mt-6">
            {intro.title}
            <br />
            <span className="italic text-soft-gold">{intro.titleAccent}</span>
          </h1>

          <p className="mt-5 max-w-md font-display text-[16px] leading-[1.58] text-ivory/90 sm:mt-6 sm:text-[19px]">
            {intro.subtitle}
          </p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={intro.cta.href}
              className="group/btn inline-flex h-12 w-full touch-manipulation items-center justify-center gap-2.5 border border-ivory/40 bg-onyx/30 px-8 text-[11px] uppercase tracking-[0.34em] text-ivory transition-colors duration-300 hover:border-soft-gold hover:text-soft-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-onyx/60 sm:h-[3.25rem] sm:w-auto sm:justify-start sm:text-[12px]"
            >
              {intro.cta.label}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
            <Link
              href="/shop"
              className="inline-flex h-12 min-h-12 touch-manipulation items-center justify-center px-5 text-[11px] uppercase tracking-[0.3em] text-ivory/70 underline-offset-4 transition-colors hover:text-ivory sm:h-[3.25rem] sm:justify-start sm:text-[12px]"
            >
              Shop
            </Link>
          </div>
        </motion.div>

        {hasBottle && active ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.08 }}
            className="flex w-full max-w-[min(100%,320px)] flex-col items-center self-center sm:max-w-[360px] lg:max-w-[380px] lg:items-end lg:self-auto"
          >
            <div className="relative w-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduceMotion ? undefined : { opacity: 0, y: -8 }
                  }
                  transition={{ duration: 0.45, ease }}
                  className="w-full"
                >
                  <Link
                    href={`/fragrance/${active.slug}`}
                    className="group block w-full outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                    aria-label={`${active.name} entdecken`}
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[radial-gradient(85%_75%_at_50%_75%,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.2)_55%,rgba(0,0,0,0.08)_100%)] px-2 pt-2 ring-1 ring-black/50 sm:rounded-[1.35rem] sm:px-3 sm:pt-3">
                      <Image
                        src={active.image}
                        alt={active.name}
                        fill
                        priority={index === startIndex}
                        sizes="(max-width: 768px) 72vw, 380px"
                        quality={85}
                        className="object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)] transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </Link>
                  <div className="mt-5 w-full rounded-xl border border-white/[0.12] bg-black/70 px-4 py-3.5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:px-5 sm:py-4 lg:text-right">
                    {active.number != null ? (
                      <p className="text-[10px] font-medium uppercase tracking-[0.38em] text-soft-gold">
                        N° {active.number}
                      </p>
                    ) : null}
                    <p className="mt-1 font-display text-xl leading-snug text-ivory sm:text-2xl [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                      {active.name}
                    </p>
                    <p className="mt-1 text-[11px] font-medium uppercase leading-relaxed tracking-[0.22em] text-ivory/80 [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]">
                      {active.subtitle}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {heroProducts.length > 1 ? (
              <div
                role="tablist"
                aria-label="Düfte im Hero"
                className="mt-3 flex max-w-full justify-center gap-1 overflow-x-auto overflow-y-hidden py-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-4 lg:max-w-none lg:flex-wrap lg:justify-end [&::-webkit-scrollbar]:hidden"
              >
                {heroProducts.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-label={`${p.name} anzeigen`}
                    aria-selected={i === index % heroProducts.length}
                    onClick={() => setIndex(i)}
                    className="flex h-11 min-w-11 shrink-0 touch-manipulation items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <span
                      aria-hidden
                      className={`block rounded-full transition-all duration-300 ${
                        i === index % heroProducts.length
                          ? "h-1.5 w-6 bg-soft-gold"
                          : "h-1.5 w-1.5 bg-ivory/35 hover:bg-ivory/55"
                      }`}
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </div>

      <a
        href="#after-hero"
        aria-label="Weiter zum Inhalt"
        className="group/scroll absolute bottom-[max(1.25rem,env(safe-area-inset-bottom,0px)+0.5rem)] left-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-x-1/2 touch-manipulation flex-col items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.4em] text-ivory/50 transition-colors hover:text-ivory/80 sm:bottom-6"
      >
        <span>Scroll</span>
        <span
          aria-hidden
          className="block h-8 w-px bg-ivory/30 group-hover/scroll:bg-ivory/50"
        />
      </a>

      <span
        id="after-hero"
        className="pointer-events-none absolute bottom-0 left-0"
      />
    </section>
  );
}
