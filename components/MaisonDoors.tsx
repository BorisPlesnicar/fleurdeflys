"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Section from "./Section";

const ease = [0.22, 1, 0.36, 1] as const;

type Door = {
  eyebrow: string;
  title: string;
  href: string;
  description: string;
};

const DOORS: Door[] = [
  {
    eyebrow: "Chapitre · Boutique",
    title: "Les Parfums",
    href: "/shop",
    description:
      "Alle Düfte der Maison — handwerklich abgefüllt, in 30 ml und 50 ml, direkt aus Grasse versandt.",
  },
  {
    eyebrow: "Chapitre · Kollektionen",
    title: "Les Collections",
    href: "/collections",
    description:
      "Die Welten der Maison — Signature, Intense, Floral. Jede mit eigener Temperatur.",
  },
  {
    eyebrow: "Chapitre · Contact",
    title: "Support",
    href: "/contact",
    description:
      "Fragen zu Ihrer Bestellung, Versand oder Umtausch — wir antworten persönlich und innerhalb eines Werktages.",
  },
];

/**
 * MaisonDoors — three quiet editorial links from the homepage to the
 * three destination pages of the site. Not a content repeat — just a
 * typographic "table of contents" pointing to where content really lives.
 */
export default function MaisonDoors() {
  return (
    <Section size="default" className="bg-ivory-soft">
      <div className="grid grid-cols-1 gap-px bg-border-soft md:grid-cols-3">
        {DOORS.map((door, idx) => (
          <motion.div
            key={door.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease, delay: idx * 0.08 }}
            className="bg-ivory-soft"
          >
            <Link
              href={door.href}
              className="group relative flex h-full flex-col justify-between gap-10 bg-ivory-soft p-10 transition-colors duration-500 hover:bg-ivory sm:p-14"
            >
              <span className="text-[10px] uppercase tracking-[0.38em] text-dark-gold">
                {door.eyebrow}
              </span>

              <div>
                <h3 className="display-headline text-[34px] text-onyx sm:text-[44px]">
                  {door.title}
                </h3>
                <p className="mt-6 max-w-sm text-[13.5px] leading-[1.85] text-muted-ink">
                  {door.description}
                </p>

                <div className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.36em] text-onyx transition-colors duration-500 group-hover:text-dark-gold">
                  <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-16" />
                  Entdecken
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
