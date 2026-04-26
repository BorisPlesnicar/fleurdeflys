"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND, LOGO_SRC, NAV_LINKS } from "@/lib/branding";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(href + "/");
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: Props) {
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 bg-onyx/30 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-ivory shadow-[0_30px_80px_-20px_rgba(18,18,18,0.25)] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-border-cream/70">
              <div className="flex items-center gap-3">
                <Image
                  src={LOGO_SRC}
                  alt={BRAND.name}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
                <span className="font-display text-[13px] tracking-[0.36em]">
                  FLEUR DE LYS
                </span>
              </div>
              <button
                type="button"
                aria-label="Menü schließen"
                onClick={onClose}
                className="h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-champagne/60 transition"
              >
                <X className="h-5 w-5" strokeWidth={1.25} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-6 px-6 pt-12">
              {NAV_LINKS.map((link, idx) => {
                const active = isActive(pathname, link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + idx * 0.05,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="group flex items-end justify-between border-b border-border-soft pb-5"
                    >
                      <span
                        className={`font-display text-[34px] leading-none tracking-tight transition-colors ${
                          active
                            ? "text-dark-gold"
                            : "text-onyx group-hover:text-dark-gold"
                        }`}
                      >
                        {link.label}
                      </span>
                      {active && (
                        <span className="text-[10px] uppercase tracking-[0.38em] text-dark-gold">
                          — now
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="px-6 pb-10 pt-8">
              <div className="divider-gold mb-6" />
              <p className="eyebrow mb-3">Maison</p>
              <p className="font-display text-[20px] italic leading-snug text-onyx">
                {BRAND.tagline}
              </p>
              <p className="mt-4 text-[10px] tracking-[0.34em] uppercase text-muted-ink/70">
                {BRAND.house}
              </p>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
