import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ShopGrid from "@/components/ShopGrid";

export const metadata: Metadata = {
  title: "Shop — FLEUR DE LYS",
  description:
    "Die Boutique der Maison FLEUR DE LYS — handwerklich gefertigt in Grasse, in 30 ml und 50 ml.",
};

export default function ShopPage() {
  return (
    <div className="flex flex-1 flex-col bg-ivory text-onyx">
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="La Boutique · MMXXVI"
          title={
            <>
              Our <span className="italic">Fragrances</span>
            </>
          }
          subtitle="Crafted for timeless elegance and modern refinement."
          meta="30 ml · 25,99 €    /    50 ml · 44,99 €"
        />
        <ShopGrid />
      </main>
      <Footer />
    </div>
  );
}
