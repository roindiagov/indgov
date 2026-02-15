import emblemLogo from "@/assets/emblem-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="gov-section py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <img src={emblemLogo} alt="Emblem" className="h-8 w-8 rounded-full" />
              <span className="font-bold text-lg">INDGOV.RBLX</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Official government portal of INDGOV.RBLX. Dedicated to transparent governance and citizen services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold text-sm uppercase tracking-wider mb-3 text-primary-foreground/60">Quick Links</h5>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Sitemap</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">RTI Portal</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-semibold text-sm uppercase tracking-wider mb-3 text-primary-foreground/60">Services</h5>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Citizen Portal</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Recruitment</a></li>
              <li><a href="/laws-policies" className="hover:text-primary-foreground transition-colors">Laws & Policies</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Grievance Redressal</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="font-semibold text-sm uppercase tracking-wider mb-3 text-primary-foreground/60">Legal</h5>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-primary-foreground/20 text-center text-xs text-primary-foreground/50">
          © 2026 INDGOV.RBLX — All Rights Reserved. This is a Roblox roleplay government portal.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
