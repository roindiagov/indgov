import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-accent/70" />
      </div>

      <div className="relative gov-section py-16 md:py-24">
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase bg-gov-gold/20 text-gov-gold rounded-full border border-gov-gold/30">
            Official Portal
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-4">
            Welcome to <br />INDGOV.RBLX
          </h2>
          <p className="text-primary-foreground/80 text-base md:text-lg mb-8 leading-relaxed">
            Dedicated to efficient governance, transparent policy-making, and public service for the citizens of Roblox India.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for services, departments, laws..."
                className="w-full pl-10 pr-4 py-3 rounded-l-md bg-card text-foreground text-sm border-0 outline-none focus:ring-2 focus:ring-gov-gold"
              />
            </div>
            <button type="submit" className="px-6 py-3 bg-gov-orange text-primary-foreground font-semibold text-sm rounded-r-md hover:opacity-90 transition-opacity">
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
