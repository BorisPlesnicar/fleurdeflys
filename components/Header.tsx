"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { LOGO_SRC, BRAND, NAV_LINKS } from "@/lib/branding";
import MobileMenu from "./MobileMenu";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const heroTransparentCapable = pathname === "/";
  const isTransparent = heroTransparentCapable && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const surfaceClass = isTransparent ? "bg-transparent" : "glass-surface";
  const textColor = isTransparent ? "text-ivory" : "text-onyx";
  const subtleText = isTransparent ? "text-ivory/75" : "text-onyx/75";
  const hoverText = isTransparent ? "hover:text-ivory" : "hover:text-onyx";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${surfaceClass} ${textColor}`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-14">
          <Link
            href="/"
            aria-label={BRAND.name}
            className="group flex items-center gap-3"
          >
            {/* LOGO: Pfad in lib/branding.ts anpassen */}
            <Image
              src={LOGO_SRC}
              alt={BRAND.name}
              width={44}
              height={44}
              priority
              className={`h-8 w-8 object-contain transition-transform duration-500 group-hover:scale-[1.04] sm:h-10 sm:w-10 ${
                isTransparent ? "brightness-125" : ""
              }`}
            />
            <span className="hidden flex-col leading-none sm:inline-flex">
              <span className="font-display text-[15px] tracking-[0.38em]">
                FLEUR DE LYS
              </span>
              <span
                className={`mt-1 text-[9px] uppercase tracking-[0.42em] ${
                  isTransparent ? "text-ivory/55" : "text-muted-ink/70"
                }`}
              >
                Maison de Parfum
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={active || undefined}
                  className={`gold-underline relative text-[11px] uppercase tracking-[0.34em] transition-colors duration-300 ${
                    active
                      ? isTransparent
                        ? "text-soft-gold"
                        : "text-dark-gold"
                      : `${subtleText} ${hoverText}`
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="Suche"
              className={`hidden h-10 w-10 items-center justify-center transition sm:inline-flex ${subtleText} ${hoverText}`}
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.25} />
            </button>
            <Link
              href="/cart"
              aria-label="Warenkorb"
              className={`inline-flex h-10 w-10 items-center justify-center transition ${subtleText} ${hoverText}`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.25} />
            </Link>
            <button
              type="button"
              aria-label="Menü öffnen"
              onClick={() => setMenuOpen(true)}
              className={`inline-flex h-10 w-10 items-center justify-center transition lg:hidden ${textColor}`}
            >
              <Menu className="h-[20px] w-[20px]" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
