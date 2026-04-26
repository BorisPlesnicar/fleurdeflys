import Image from "next/image";
import { Product } from "@/lib/products";
import { PRODUCT_PLACEHOLDER } from "@/lib/branding";

const ACCENT_BG: Record<Product["accent"], string> = {
  champagne:
    "bg-[linear-gradient(180deg,#f7efe1_0%,#ecdfc6_55%,#e2d0ad_100%)]",
  onyx: "bg-[linear-gradient(180deg,#f3ebdb_0%,#e9ddc5_50%,#d9c9a8_100%)]",
  ivory: "bg-[linear-gradient(180deg,#fbf7ee_0%,#f3ebdb_60%,#e7dcc6_100%)]",
};

type Props = {
  product: Product;
  aspect?: "4/5" | "3/4" | "1/1";
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  zoomOnHover?: boolean;
  sizes?: string;
};

/**
 * ProductImagePlaceholder — unified visual frame for a product bottle.
 *
 * Produces a consistent champagne-tinted tile with the product photo (or the
 * shared `PRODUCT_PLACEHOLDER`) centered, softly vignetted and ready to zoom
 * on hover. Used by ProductCard, ProductShowcase, /fragrance/[slug], etc.
 */
export default function ProductImagePlaceholder({
  product,
  aspect = "4/5",
  priority = false,
  className = "",
  imageClassName = "",
  zoomOnHover = true,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw",
}: Props) {
  const aspectClass =
    aspect === "1/1"
      ? "aspect-square"
      : aspect === "3/4"
        ? "aspect-[3/4]"
        : "aspect-[4/5]";

  const image = product.image ?? PRODUCT_PLACEHOLDER;

  return (
    <div
      className={`${zoomOnHover ? "zoom-frame" : ""} relative flex ${aspectClass} w-full items-center justify-center overflow-hidden ${ACCENT_BG[product.accent]} ${className}`.trim()}
    >
      {/* Soft editorial vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 45%, transparent 40%, rgba(0,0,0,0.06) 100%)",
        }}
      />

      {/* BILD: Produktfoto — Standard: /public/images/parfumexample.png */}
      <Image
        src={image}
        alt={product.name}
        fill
        priority={priority}
        sizes={sizes}
        data-zoom
        className={`object-contain object-center p-10 mix-blend-multiply sm:p-14 ${imageClassName}`.trim()}
      />

      {/* Category tag */}
      <div className="absolute left-5 top-5 flex items-center gap-3">
        <span className="h-px w-6 bg-dark-gold/70" />
        <span className="text-[9px] uppercase tracking-[0.38em] text-dark-gold">
          {product.category}
        </span>
      </div>

      {/* Edition number (N°…) — only rendered when a number is set on the product */}
      {product.number !== undefined && (
        <div className="absolute right-5 top-5 font-display text-[18px] leading-none tracking-wide text-onyx/40">
          N° {product.number}
        </div>
      )}
    </div>
  );
}
