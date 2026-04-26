import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import ProductCard from "@/components/ProductCard";
import FragranceDetailView from "@/components/FragranceDetailView";
import {
  PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Fragrance — FLEUR DE LYS" };
  return {
    title: `${product.name} — FLEUR DE LYS`,
    description: product.shortDescription,
  };
}

export default async function FragrancePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 3);

  return (
    <div className="flex flex-1 flex-col bg-ivory text-onyx">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb / back link */}
        <div className="border-b border-border-soft bg-ivory">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pb-6 pt-[max(6.5rem,env(safe-area-inset-top,0px)+4.5rem)] sm:gap-4 sm:px-8 sm:pt-36 sm:pl-8 sm:pr-8 lg:px-14 lg:pt-40">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.38em] text-muted-ink transition-colors hover:text-dark-gold"
            >
              <ArrowLeft
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1"
                strokeWidth={1.5}
              />
              Retour · Shop
            </Link>
            <span className="text-[10px] uppercase tracking-[0.38em] text-muted-ink/70">
              {product.category}
            </span>
          </div>
        </div>

        {/* Detail view (sticky bottle + sales-first sidebar with FAQ accordion) */}
        <Section size="lg">
          <FragranceDetailView product={product} />
        </Section>

        {/* Related */}
        {related.length > 0 && (
          <Section className="bg-ivory-soft" size="lg">
            <div className="flex flex-col gap-6 border-b border-border-soft pb-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Compositions associées</p>
                <h2 className="display-headline mt-8 text-[32px] text-onyx sm:text-[42px] lg:text-[52px]">
                  Weitere <span className="italic text-dark-gold">Düfte.</span>
                </h2>
              </div>
              <Link
                href="/shop"
                className="gold-underline inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.36em] text-onyx transition-colors hover:text-dark-gold"
              >
                Alle Düfte entdecken
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 sm:mt-16 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </Section>
        )}
      </main>
      <Footer />
    </div>
  );
}
