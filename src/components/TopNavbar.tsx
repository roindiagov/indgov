import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import emblemLogo from "@/assets/emblem-logo.png";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Ministries", href: "#ministries" },
  { label: "Laws & Policies", href: "#" },
  { label: "Recruitment", href: "#" },
  { label: "Public Services", href: "#services" },
  { label: "News", href: "#news" },
];

const TopNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top accent bar */}
      <div className="h-1 bg-gov-green w-full" />
      <div className="bg-gov-orange h-0.5 w-full" />

      <header className="bg-card shadow-sm sticky top-0 z-50">
        <div className="gov-section">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Name */}
            <div className="flex items-center gap-3">
              <img src={emblemLogo} alt="INDGOV.RBLX Emblem" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h1 className="text-lg font-bold text-primary leading-tight tracking-tight">INDGOV.RBLX</h1>
                <p className="text-[10px] text-muted-foreground leading-none">Government of India • Roblox</p>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Admin Login */}
            <div className="hidden lg:flex items-center gap-2">
              <button className="px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded hover:bg-gov-green-light transition-colors">
                Admin Login
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-card border-t">
            <div className="gov-section py-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button className="w-full mt-2 px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded">
                Admin Login
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default TopNavbar;
