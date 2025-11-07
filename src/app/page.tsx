import Hero from "../components/home/Hero";
import CategorySection from "../components/home/CategorySection";
import FeaturedSection from "../components/home/FeaturedSection";
import InfoSection from "../components/home/InfoSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <CategorySection />
      <FeaturedSection />
      <InfoSection />
    </main>
  );
}