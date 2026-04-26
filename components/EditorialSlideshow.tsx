"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  EDITORIAL_SLIDES,
  type EditorialSlide,
} from "@/lib/hero-editorial-slides";

const ease = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 8000;

export default function EditorialSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const total = EDITORIAL_SLIDES.length;

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % total) + total) % total);
    },
    [total],
  );
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, total]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    }
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <section
      className="relative border-t border-border-cream/60 bg-[linear-gradient(180deg,#f8f5ef_0%,#f0e9de_55%,#ece3d2_100%)] py-16 sm:py-20 lg:py-24"
      aria-labelledby="editorial-slideshow-heading"
    >
      <div className="mx-auto max-w-6xl px-4 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-10 sm:pl-10 sm:pr-10 lg:px-12">
        <div className="max-w-xl">
          <p className="eyebrow">Momente</p>
          <h2
            id="editorial-slideshow-heading"
            className="font-display text-3xl font-light leading-tight text-onyx sm:text-4xl"
          >
            Ein Blick in die Maison —{" "}
            <span className="italic text-dark-gold">ohne die Bühne zu sein.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-ink sm:text-[15px]">
            Kleine Bildserie aus der Boutique und der Première. Kompakt
            dargestellt, damit die Startseite klar und scharf bleibt.
          </p>
        </div>

        <div
          ref={containerRef}
          tabIndex={0}
          role="region"
          aria-roledescription="Karussell"
          aria-label="Maison — Bildmomente"
          aria-live="polite"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="relative mt-10 min-h-[min(52svh,380px)] overflow-hidden rounded-2xl border border-border-cream/90 bg-onyx/5 shadow-lift sm:min-h-[380px] sm:rounded-[2rem] lg:mt-12 lg:h-[min(52vh,580px)]"
        >
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={EDITORIAL_SLIDES[active].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease }}
              className="absolute inset-0"
            >
              <SlideContent
                slide={EDITORIAL_SLIDES[active]}
                reduceMotion={!!reduceMotion}
                index={active + 1}
                total={total}
              />
            </motion.div>
          </AnimatePresence>

          <div
            aria-hidden
            className="grain pointer-events-none absolute inset-0 z-[5] opacity-[0.12] mix-blend-overlay"
          />

          <button
            type="button"
            onClick={prev}
            aria-label="Vorheriges Bild"
            className="glass-surface absolute left-[max(0.75rem,env(safe-area-inset-left,0px))] top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full text-ivory shadow-soft transition-all duration-500 hover:scale-105 hover:text-soft-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-onyx/30 sm:left-4"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Nächstes Bild"
            className="glass-surface absolute right-[max(0.75rem,env(safe-area-inset-right,0px))] top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full text-ivory shadow-soft transition-all duration-500 hover:scale-105 hover:text-soft-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-onyx/30 sm:right-4"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <div className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-[max(1rem,env(safe-area-inset-bottom,0px)+0.5rem)] sm:px-6 sm:pb-5">
            <div className="flex w-full max-w-md items-center gap-2 sm:gap-3">
              {EDITORIAL_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Bild ${i + 1}: ${s.title}`}
                  aria-current={i === active}
                  className="group/dot relative h-[2px] flex-1 cursor-pointer overflow-hidden bg-white/25 transition-colors duration-500 hover:bg-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/70"
                >
                  <span
                    aria-hidden
                    className={`absolute inset-y-0 left-0 bg-soft-gold transition-all ${
                      i < active
                        ? "w-full opacity-70"
                        : i === active
                          ? "w-0 opacity-100"
                          : "w-0 opacity-100"
                    }`}
                    style={
                      i === active && !paused && !reduceMotion
                        ? {
                            animation: `editorial-progress ${AUTOPLAY_MS}ms linear forwards`,
                          }
                        : undefined
                    }
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes editorial-progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

function SlideContent({
  slide,
  reduceMotion,
  index,
  total,
}: {
  slide: EditorialSlide;
  reduceMotion: boolean;
  index: number;
  total: number;
}) {
  const align = slide.align ?? "right";
  const overlay = slide.overlay ?? align;

  const overlayGradient =
    overlay === "left"
      ? "bg-[linear-gradient(90deg,rgba(20,17,12,0.82)_0%,rgba(20,17,12,0.5)_40%,rgba(20,17,12,0.12)_78%,rgba(20,17,12,0.04)_100%)]"
      : overlay === "right"
        ? "bg-[linear-gradient(270deg,rgba(20,17,12,0.82)_0%,rgba(20,17,12,0.5)_40%,rgba(20,17,12,0.12)_78%,rgba(20,17,12,0.04)_100%)]"
        : overlay === "bottom"
          ? "bg-[linear-gradient(180deg,rgba(20,17,12,0.06)_0%,rgba(20,17,12,0.52)_58%,rgba(20,17,12,0.88)_100%)]"
          : "bg-[radial-gradient(60%_55%_at_50%_50%,rgba(20,17,12,0.12)_0%,rgba(20,17,12,0.62)_72%,rgba(20,17,12,0.88)_100%)]";

  const justifyClass =
    align === "right"
      ? "justify-end text-right"
      : align === "center"
        ? "justify-center text-center"
        : "justify-start text-left";

  const itemAlignClass =
    align === "right"
      ? "items-end"
      : align === "center"
        ? "items-center"
        : "items-start";

  return (
    <>
      <motion.div
        initial={
          reduceMotion ? false : { scale: 1.02, x: align === "right" ? -8 : 8 }
        }
        animate={{ scale: 1, x: 0 }}
        transition={{ duration: 12, ease }}
        className="absolute inset-0"
      >
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          sizes="(max-width: 768px) 100vw, 1152px"
          quality={82}
          className="object-cover object-center"
        />
      </motion.div>

      <div aria-hidden className={`absolute inset-0 z-[1] ${overlayGradient}`} />

      <div
        aria-hidden
        className="absolute inset-0 z-[2] bg-[radial-gradient(120%_85%_at_50%_50%,transparent_50%,rgba(0,0,0,0.32)_100%)]"
      />

      <div
        className={`absolute inset-0 z-10 flex px-4 pb-[max(5.5rem,env(safe-area-inset-bottom,0px)+4.5rem)] pt-14 sm:px-8 sm:pb-24 sm:pt-20 ${justifyClass}`}
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease, delay: 0.1 }}
          className={`flex max-w-lg flex-col gap-5 sm:gap-6 ${itemAlignClass} my-auto lg:max-w-xl`}
        >
          <span className="font-display text-[11px] tabular-nums tracking-[0.36em] text-ivory/65 sm:text-[12px]">
            {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          <p
            className={`flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-soft-gold sm:text-[11px] ${
              align === "right" ? "flex-row-reverse" : ""
            }`}
          >
            <span className="inline-block h-px w-8 bg-soft-gold/85 sm:w-10" />
            {slide.eyebrow}
          </p>

          <h3 className="font-display text-[clamp(1.75rem,5vw,3.25rem)] leading-[0.98] text-ivory">
            {slide.title}
            {slide.titleAccent ? (
              <>
                <br />
                <span className="italic text-soft-gold">{slide.titleAccent}</span>
              </>
            ) : null}
          </h3>

          <p
            className={`max-w-md font-display text-[15px] leading-[1.55] text-ivory/88 sm:text-[17px] lg:text-[18px] ${
              align === "right" ? "ml-auto" : ""
            }`}
          >
            {slide.subtitle}
          </p>

          <div
            className={`mt-1 flex items-center gap-4 ${
              align === "right" ? "self-end" : "self-start"
            }`}
          >
            <Link
              href={slide.cta.href}
              className="group/btn inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2.5 border border-ivory/35 bg-ivory/5 px-7 py-3 text-[10px] uppercase tracking-[0.34em] text-ivory backdrop-blur-md transition-all duration-500 hover:border-soft-gold hover:bg-ivory/10 hover:text-soft-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-onyx/40 sm:h-[3.25rem] sm:w-auto sm:justify-start sm:px-8 sm:py-0 sm:text-[11px]"
            >
              {slide.cta.label}
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:translate-x-1 sm:h-4 sm:w-4"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
