import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { FEATURED_PRODUCT } from "@/lib/products";

export const metadata: Metadata = {
  title: "Your Cart — FLEUR DE LYS",
  description:
    "Ihr Warenkorb in der Boutique der Maison FLEUR DE LYS.",
};

export default function CartPage() {
  const suggestion = FEATURED_PRODUCT;

  return (
    <div className="flex flex-1 flex-col bg-ivory text-onyx">
      <Header />
      <main className="flex-1">
        <Section size="lg" className="pt-[max(8.5rem,env(safe-area-inset-top,0px)+5.5rem)] sm:pt-48 lg:pt-56">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
            {/* Empty state */}
            <div className="lg:col-span-7">
              <p className="eyebrow">Votre Panier</p>
              <h1 className="display-headline mt-6 text-[clamp(2rem,9vw,2.75rem)] text-onyx sm:mt-8 sm:text-[60px] lg:text-[72px]">
                Your Cart
              </h1>

              <div className="mt-16 border border-border-soft bg-ivory p-10 sm:p-14">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dark-gold/30 text-dark-gold">
                  <ShoppingBag className="h-5 w-5" strokeWidth={1.25} />
                </div>

                <h2 className="mt-10 font-display text-[30px] leading-tight text-onyx sm:text-[38px]">
                  Noch ganz still.
                </h2>
                <p className="mt-5 max-w-md text-[14px] leading-[1.85] text-muted-ink sm:text-[15px]">
                  Ihr Warenkorb ist leer. Beginnen Sie mit dem ersten Duft der
                  Maison — entworfen für Momente, die lange nachklingen.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <Button href="/shop" variant="primary" size="lg">
                    Discover Shop
                  </Button>
                  <Button href="/collections" variant="secondary" size="lg">
                    Collections
                  </Button>
                </div>

                <div className="divider-gold mt-12" />

                <p className="mt-10 text-[11px] uppercase tracking-[0.36em] text-muted-ink/80">
                  Ihre Bestellungen werden kostenfrei in Europa versandt, in
                  Parfum-Papier gewickelt, signiert und nummeriert.
                </p>
              </div>
            </div>

            {/* Suggested — shared ProductCard, no hand-rolled duplicate */}
            <aside className="lg:col-span-5">
              <p className="eyebrow">Recommandé</p>
              <h3 className="display-headline mt-8 text-[30px] text-onyx sm:text-[38px] lg:text-[44px]">
                Beginnen Sie
                <br />
                <span className="italic text-dark-gold">mit der Signatur.</span>
              </h3>

              <div className="mt-10">
                <ProductCard product={suggestion} />
              </div>
            </aside>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
