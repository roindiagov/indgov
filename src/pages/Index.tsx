import TopNavbar from "@/components/TopNavbar";
import HeroSection from "@/components/HeroSection";
import PopularServices from "@/components/PopularServices";
import LatestNews from "@/components/LatestNews";
import MinistriesSection from "@/components/MinistriesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />
      <main className="flex-1">
        <HeroSection />
        <PopularServices />
        <div className="gov-divider" />
        <LatestNews />
        <div className="gov-divider" />
        <MinistriesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
