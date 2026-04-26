"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, AtSign, Send } from "lucide-react";
import { BRAND, LOGO_SRC, NAV_LINKS } from "@/lib/branding";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="kontakt" className="relative bg-onyx text-ivory">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(800px 300px at 0% 0%, rgba(201,162,74,0.1), transparent 60%), radial-gradient(900px 400px at 100% 100%, rgba(201,162,74,0.08), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1440px] px-4 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] py-16 pb-[max(4rem,env(safe-area-inset-bottom,0px)+2.5rem)] sm:px-8 sm:py-24 sm:pb-24 sm:pl-8 sm:pr-8 lg:px-14 lg:py-28 lg:pb-28">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              {/* LOGO: Pfad in lib/branding.ts anpassen */}
              <Image
                src={LOGO_SRC}
                alt={BRAND.name}
                width={44}
                height={44}
                className="h-10 w-10 object-contain brightness-110"
              />
              <div>
                <p className="font-display text-[16px] tracking-[0.36em]">
                  FLEUR DE LYS
                </p>
                <p className="mt-1 text-[9px] tracking-[0.42em] uppercase text-ivory/50">
                  Maison de Parfum · Paris
                </p>
              </div>
            </div>
            <p className="mt-8 font-display text-[26px] sm:text-[30px] leading-snug text-ivory/90 max-w-md">
              Luxury fragrance house inspired by timeless French elegance.
            </p>

            {/* Newsletter */}
            <form
              className="mt-10 max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <label
                htmlFor="newsletter"
                className="text-[10px] tracking-[0.32em] uppercase text-soft-gold"
              >
                Newsletter
              </label>
              <div className="mt-4 flex items-center gap-2 border-b border-ivory/20 focus-within:border-soft-gold transition-colors">
                <input
                  id="newsletter"
                  type="email"
                  required
                  placeholder="Ihre E-Mail-Adresse"
                  className="flex-1 bg-transparent py-3 text-[14px] text-ivory placeholder:text-ivory/40 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Anmelden"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-soft-gold hover:bg-soft-gold hover:text-onyx transition-colors duration-500"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <p className="mt-3 text-[11px] text-ivory/50">
                Exklusive Editionen, Einladungen und private Previews — direkt
                aus unserer Maison.
              </p>
            </form>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <p className="text-[10px] tracking-[0.32em] uppercase text-soft-gold mb-5">
                Maison
              </p>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-ivory/80 hover:text-soft-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.32em] uppercase text-soft-gold mb-5">
                Boutique
              </p>
              <ul className="space-y-3 text-[13px] text-ivory/80">
                <li>
                  <Link
                    href="/shop"
                    className="hover:text-soft-gold transition-colors"
                  >
                    Alle Düfte
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collections"
                    className="hover:text-soft-gold transition-colors"
                  >
                    Kollektionen
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-soft-gold transition-colors"
                  >
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className="hover:text-soft-gold transition-colors"
                  >
                    Warenkorb
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-[10px] tracking-[0.32em] uppercase text-soft-gold mb-5">
                Social
              </p>
              <div className="flex items-center gap-3">
                {[Camera, AtSign, Send].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Social"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 hover:border-soft-gold hover:text-soft-gold transition-colors duration-500"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.25} />
                  </a>
                ))}
              </div>
              <p className="mt-8 text-[13px] text-ivory/70 leading-relaxed">
                12 Rue de la Paix
                <br />
                75002 Paris, France
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] tracking-[0.28em] uppercase text-ivory/50">
            © {year} FLEUR DE LYS · Maison de Parfum
          </p>
          <div className="flex items-center gap-6 text-[11px] tracking-[0.28em] uppercase text-ivory/50">
            <a href="#" className="hover:text-soft-gold transition-colors">
              Impressum
            </a>
            <a href="#" className="hover:text-soft-gold transition-colors">
              Datenschutz
            </a>
            <a href="#" className="hover:text-soft-gold transition-colors">
              AGB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
