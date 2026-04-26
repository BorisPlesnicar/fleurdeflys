"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function WebsiteLuxuryBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-onyx py-24 text-ivory sm:py-40 lg:py-56">
      <div
        className="absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(900px 500px at 20% 20%, rgba(201,162,74,0.18), transparent 60%), radial-gradient(1000px 600px at 80% 80%, rgba(155,122,50,0.14), transparent 60%)",
        }}
      />
      <div className="grain absolute inset-0 -z-10 opacity-70" />

      <div className="mx-auto max-w-[1280px] px-4 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] text-center sm:px-8 sm:pl-8 sm:pr-8 lg:px-14">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
          className="eyebrow-light"
        >
          L’Invitation
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease, delay: 0.1 }}
          className="display-headline mt-10 text-[clamp(2.5rem,8vw,6.5rem)]"
        >
          Zeitlose Düfte.
          <br />
          <span className="italic text-soft-gold">Unverwechselbar.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease, delay: 0.3 }}
          className="mx-auto mt-14 h-px max-w-[280px] origin-center bg-gradient-to-r from-transparent via-soft-gold to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease, delay: 0.4 }}
          className="mx-auto mt-12 max-w-xl text-[14px] leading-[1.85] text-ivory/70 sm:text-[15px]"
        >
          Komponiert für einen Moment. Gemacht für eine Erinnerung. Entdecken
          Sie die vollständige Kollektion von FLEUR DE LYS.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
          className="mt-14"
        >
          <Link
            href="/shop"
            className="group inline-flex min-h-14 w-full max-w-sm touch-manipulation items-center justify-center gap-3 border border-soft-gold/60 px-8 py-3.5 text-[11px] uppercase tracking-[0.36em] text-soft-gold transition-all duration-500 hover:border-soft-gold hover:bg-soft-gold hover:text-onyx sm:w-auto sm:max-w-none sm:px-10"
          >
            <span className="h-px w-5 bg-current transition-all duration-500 group-hover:w-10" />
            Discover Collection
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
