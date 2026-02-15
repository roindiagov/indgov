import { Link } from "react-router-dom";
import { FileText, Briefcase, Scale, Newspaper, Users, Search } from "lucide-react";

const quickLinks = [
  { label: "Apply for a Job", icon: Briefcase, href: "/recruitment", color: "bg-gov-green/10 text-gov-green" },
  { label: "View Laws", icon: Scale, href: "/laws-policies", color: "bg-gov-orange/10 text-gov-orange" },
  { label: "Read News", icon: Newspaper, href: "/news", color: "bg-accent/10 text-accent" },
  { label: "Public Services", icon: FileText, href: "/public-services", color: "bg-primary/10 text-primary" },
  { label: "Ministries", icon: Users, href: "/ministries", color: "bg-gov-navy/10 text-gov-navy" },
  { label: "Search Portal", icon: Search, href: "/search?q=", color: "bg-gov-gold/10 text-gov-gold" },
];

const QuickLinks = () => {
  return (
    <section className="py-10 bg-background">
      <div className="gov-section">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gov-orange rounded-full" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">Quick Access</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="gov-card p-4 flex flex-col items-center gap-2 text-center group hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-full ${link.color} group-hover:scale-110 transition-transform`}>
                <link.icon size={22} />
              </div>
              <span className="text-sm font-medium text-foreground">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
