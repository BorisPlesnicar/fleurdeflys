import Header from "@/components/Header";
import HomeHero from "@/components/HomeHero";
import ProductShowcase from "@/components/ProductShowcase";
import EditorialSlideshow from "@/components/EditorialSlideshow";
import FeaturedSelection from "@/components/FeaturedSelection";
import MaisonDoors from "@/components/MaisonDoors";
import WebsiteLuxuryBanner from "@/components/WebsiteLuxuryBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-ivory text-onyx">
      <Header />
      <main className="flex-1">
        <HomeHero />
        <ProductShowcase />
        <EditorialSlideshow />
        <FeaturedSelection />
        <MaisonDoors />
        <WebsiteLuxuryBanner />
      </main>
      <Footer />
    </div>
  );
}
