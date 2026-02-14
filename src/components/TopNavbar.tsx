import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import emblemLogo from "@/assets/emblem-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Ministries", href: "/#ministries" },
  { label: "Laws & Policies", href: "/laws-policies" },
  { label: "Recruitment", href: "/recruitment" },
  { label: "Public Services", href: "/#services" },
  { label: "News", href: "/#news" },
];

const TopNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  return (
    <>
      <div className="h-1 bg-gov-green w-full" />
      <div className="bg-gov-orange h-0.5 w-full" />

      <header className="bg-card shadow-sm sticky top-0 z-50">
        <div className="gov-section">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <img src={emblemLogo} alt="INDGOV.RBLX Emblem" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <h1 className="text-lg font-bold text-primary leading-tight tracking-tight">INDGOV.RBLX</h1>
                <p className="text-[10px] text-muted-foreground leading-none">Government of India • Roblox</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <a key={link.label} href={link.href} className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded transition-colors">
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} to={link.href} className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded transition-colors">
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              {user && isAdmin ? (
                <div className="flex items-center gap-2">
                  <Link to="/admin" className="px-4 py-2 text-sm font-semibold bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity">
                    Dashboard
                  </Link>
                  <button onClick={signOut} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link to="/admin-login" className="px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded hover:bg-gov-green-light transition-colors">
                  Admin Login
                </Link>
              )}
            </div>

            <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-card border-t">
            <div className="gov-section py-3 space-y-1">
              {navLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <a key={link.label} href={link.href} className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} to={link.href} className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                )
              )}
              {user && isAdmin ? (
                <>
                  <Link to="/admin" className="block px-3 py-2 text-sm font-medium text-primary" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="block w-full text-left px-3 py-2 text-sm font-medium text-destructive">Sign Out</button>
                </>
              ) : (
                <Link to="/admin-login" className="block mt-2 px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded text-center" onClick={() => setMobileOpen(false)}>
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default TopNavbar;
