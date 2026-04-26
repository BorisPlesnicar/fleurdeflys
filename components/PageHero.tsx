"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  /** Optional meta-row rendered under the subtitle (eg. a price strip). */
  meta?: ReactNode;
  /** Optional decorative right column (only used on left-aligned heroes). */
  aside?: ReactNode;
  /** Slim variant reduces top padding on inner pages. */
  compact?: boolean;
};

/**
 * PageHero — the first section on every inner page.
 * Provides a consistent typographic signature (eyebrow + serif headline +
 * descriptive line) for /shop, /contact, /collections, /cart, …
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  align = "center",
  meta,
  aside,
  compact = false,
}: PageHeroProps) {
  const isCenter = align === "center";

  return (
    <section
      className={`relative isolate overflow-hidden border-b border-border-soft bg-ivory ${
        compact
          ? "pb-14 pt-[max(7.5rem,env(safe-area-inset-top,0px)+5.25rem)] sm:pb-20 sm:pt-40 lg:pt-48"
          : "pb-16 pt-[max(8.5rem,env(safe-area-inset-top,0px)+5.75rem)] sm:pb-28 sm:pt-48 lg:pt-56"
      }`}
    >
      {/* Atmospheric gold aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 500px at 50% 0%, rgba(201,162,74,0.08), transparent 70%)",
        }}
      />
      <div aria-hidden className="grain absolute inset-0 -z-10" />

      <div className="mx-auto max-w-[1280px] px-4 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-8 sm:pl-8 sm:pr-8 lg:px-14">
        <div
          className={`grid grid-cols-1 gap-12 ${
            aside ? "lg:grid-cols-12 lg:gap-16" : ""
          }`}
        >
          <div
            className={`${isCenter ? "text-center mx-auto max-w-[960px]" : ""} ${
              aside ? "lg:col-span-7" : ""
            }`}
          >
            {eyebrow && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease }}
                className="eyebrow"
              >
                {eyebrow}
              </motion.p>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease, delay: 0.1 }}
              className={`display-headline mt-6 text-onyx text-[clamp(2.25rem,8vw,6.25rem)] sm:mt-8 ${
                isCenter ? "mx-auto max-w-[16ch]" : "max-w-[20ch]"
              }`}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease, delay: 0.2 }}
                className={`mt-8 font-display text-[19px] italic leading-snug text-muted-ink sm:text-[21px] ${
                  isCenter ? "mx-auto max-w-[46ch]" : "max-w-[46ch]"
                }`}
              >
                {subtitle}
              </motion.p>
            )}
            {meta && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease, delay: 0.3 }}
                className={`mt-12 flex items-center gap-5 text-muted-ink/70 ${
                  isCenter ? "justify-center" : ""
                }`}
              >
                <span className="h-px w-12 bg-soft-gold/50" />
                <span className="text-[10px] uppercase tracking-[0.38em]">
                  {meta}
                </span>
                <span className="h-px w-12 bg-soft-gold/50" />
              </motion.div>
            )}
          </div>

          {aside && (
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease, delay: 0.3 }}
              className="lg:col-span-5"
            >
              {aside}
            </motion.aside>
          )}
        </div>
      </div>
    </section>
  );
}
