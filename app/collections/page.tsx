import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Button from "@/components/Button";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";
import BrandInspirationGrid from "@/components/BrandInspirationGrid";
import { COLLECTIONS, getProductsByCollection } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collections — FLEUR DE LYS",
  description:
    "Drei Kollektionen der Maison FLEUR DE LYS: Signature, Intense und Floral — jede mit eigener Handschrift.",
};

const COUNT_LABEL = ["Keine", "Eine", "Zwei", "Drei"] as const;

export default function CollectionsPage() {
  const filledCount = COLLECTIONS.filter(
    (c) => getProductsByCollection(c.id).length > 0,
  ).length;

  const heroTitle =
    filledCount <= 1 ? (
      <>
        Le premier <span className="italic">chapitre.</span>
      </>
    ) : (
      <>
        {COUNT_LABEL[filledCount] ?? filledCount} Welten.{" "}
        <span className="italic">Ein Haus.</span>
      </>
    );

  const heroSubtitle =
    filledCount <= 1
      ? "Die erste Kollektion der Maison ist eröffnet — weitere Welten folgen."
      : "Jede Kollektion folgt einer eigenen Temperatur — vom hellen Morgenlicht einer Lilie bis zur samtigen Nacht aus Amber und Oud.";

  return (
    <div className="flex flex-1 flex-col bg-ivory text-onyx">
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Les Collections"
          title={heroTitle}
          subtitle={heroSubtitle}
        />

        {/* Brand inspiration rail — "Nach Duft-Verwandtschaft finden" */}
        <Section size="default" className="border-y border-border-soft bg-ivory-soft/60">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Les Références</p>
            <h2 className="display-headline mt-6 text-[28px] text-onyx sm:text-[34px] lg:text-[40px]">
              Nach Duft-Verwandtschaft{" "}
              <span className="italic text-dark-gold">finden.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[52ch] text-[13.5px] leading-[1.9] text-muted-ink sm:text-[14.5px]">
              Sie kennen einen bestimmten Duft einer Marke und suchen das
              Pendant der Maison? Wählen Sie die Referenz — und Sie landen
              direkt auf der Komposition, die ihr olfaktorisch am nächsten
              kommt.
            </p>
          </div>

          <div className="mt-14">
            <BrandInspirationGrid />
          </div>
        </Section>

        <Section size="lg">
          <div className="space-y-24 sm:space-y-32 lg:space-y-40">
            {COLLECTIONS.filter(
              (c) => getProductsByCollection(c.id).length > 0,
            ).map((collection, idx) => {
              const products = getProductsByCollection(collection.id);
              const reverse = idx % 2 === 1;
              const singleProduct = products.length === 1;

              return (
                <article
                  key={collection.id}
                  className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20"
                >
                  {/* Text column */}
                  <div
                    className={`lg:col-span-5 ${
                      reverse ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <p className="text-[10px] uppercase tracking-[0.38em] text-dark-gold">
                      Chapitre · {String(idx + 1).padStart(2, "0")}
                    </p>
                    <h2 className="display-headline mt-8 text-[40px] text-onyx sm:text-[52px] lg:text-[64px]">
                      {collection.name.replace(" Collection", "")}
                      <span className="block italic text-dark-gold">
                        Collection
                      </span>
                    </h2>
                    <p className="mt-8 max-w-md font-display text-[20px] italic leading-snug text-muted-ink sm:text-[22px]">
                      {collection.tagline}
                    </p>

                    <div className="divider-gold mt-10 max-w-[200px]" />

                    <p className="mt-10 max-w-md text-[14.5px] leading-[1.9] text-muted-ink">
                      {collection.description}
                    </p>

                    <ul className="mt-10 space-y-3">
                      {products.map((p) => (
                        <li
                          key={p.id}
                          className="flex items-baseline justify-between gap-6 border-b border-border-soft pb-3"
                        >
                          <Link
                            href={`/fragrance/${p.slug}`}
                            className="group inline-flex items-center gap-3 font-display text-[20px] text-onyx transition-colors hover:text-dark-gold"
                          >
                            {p.name}
                            <ArrowUpRight
                              className="h-3.5 w-3.5 opacity-0 transition-all duration-500 group-hover:opacity-100"
                              strokeWidth={1.5}
                            />
                          </Link>
                          <span className="text-[10px] uppercase tracking-[0.34em] text-muted-ink/70">
                            {p.category}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-12">
                      <Button href="/shop" variant="secondary" size="lg">
                        Shop Collection
                      </Button>
                    </div>
                  </div>

                  {/* Visual column */}
                  <div
                    className={`lg:col-span-7 ${
                      reverse ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    {singleProduct ? (
                      // Single product → one large editorial frame
                      <Link
                        href={`/fragrance/${products[0].slug}`}
                        className="group block"
                        aria-label={`${products[0].name} — Details`}
                      >
                        <ProductImagePlaceholder
                          product={products[0]}
                          aspect="3/4"
                        />
                        <div className="mt-5 flex items-baseline justify-between gap-4">
                          <span className="font-display text-[20px] text-onyx transition-colors group-hover:text-dark-gold">
                            {products[0].name}
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.32em] text-muted-ink/70">
                            {products[0].category}
                          </span>
                        </div>
                      </Link>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        {products.slice(0, 2).map((p, pIdx) => (
                          <Link
                            key={p.id}
                            href={`/fragrance/${p.slug}`}
                            className={`group block ${
                              pIdx === 0
                                ? "sm:translate-y-0"
                                : "sm:translate-y-10"
                            }`}
                            aria-label={`${p.name} — Details`}
                          >
                            <ProductImagePlaceholder
                              product={p}
                              aspect={pIdx === 0 ? "3/4" : "4/5"}
                            />
                            <div className="mt-4 flex items-baseline justify-between gap-4">
                              <span className="font-display text-[18px] text-onyx transition-colors group-hover:text-dark-gold">
                                {p.name}
                              </span>
                              <span className="text-[10px] uppercase tracking-[0.32em] text-muted-ink/70">
                                {p.category}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        {/* CTA */}
        <Section className="bg-ivory-soft">
          <div className="text-center">
            <p className="eyebrow">La Boutique</p>
            <h2 className="display-headline mx-auto mt-8 max-w-[16ch] text-[40px] text-onyx sm:text-[52px] lg:text-[64px]">
              Alle Düfte.{" "}
              <span className="italic text-dark-gold">An einem Ort.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-[48ch] text-[14px] leading-[1.9] text-muted-ink sm:text-[15px]">
              Die vollständige Kollektion in der Boutique — in 30 ml und 50 ml,
              handwerklich abgefüllt in Grasse.
            </p>
            <div className="mt-12 flex justify-center">
              <Button href="/shop" variant="primary" size="lg">
                Discover Shop
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
