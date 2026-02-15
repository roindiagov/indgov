import TopNavbar from "@/components/TopNavbar";
import HeroSection from "@/components/HeroSection";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import QuickStats from "@/components/QuickStats";
import QuickLinks from "@/components/QuickLinks";
import PopularServices from "@/components/PopularServices";
import LatestNews from "@/components/LatestNews";
import RecentActivity from "@/components/RecentActivity";
import MinistriesSection from "@/components/MinistriesSection";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />
      <main className="flex-1">
        <HeroSection />
        <AnnouncementBanner />
        <QuickStats />
        <QuickLinks />
        <div className="gov-divider" />
        <PopularServices />
        <div className="gov-divider" />
        <LatestNews />
        <RecentActivity />
        <div className="gov-divider" />
        <MinistriesSection />
        <div className="gov-divider" />
        <AboutSection />
      </main>
      <div className="bg-muted/50 border-t py-3 text-center text-xs text-muted-foreground">
        <p>Disclaimer: This is a Roblox project and is not affiliated with any real-world government or organization.</p>
      </div>
    </div>
  );
};

export default Index;
