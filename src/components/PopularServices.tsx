import { FileText, UserCheck, Briefcase, Scale, Building2, ArrowRight } from "lucide-react";

const services = [
  { icon: FileText, label: "Apply for ID", desc: "National identification card" },
  { icon: UserCheck, label: "Verify Citizen Status", desc: "Check your citizenship record" },
  { icon: Briefcase, label: "Business Registry", desc: "Register or verify a business" },
  { icon: Scale, label: "View Laws", desc: "Browse legislation & policies" },
  { icon: Building2, label: "Government Directory", desc: "Contact departments & officials" },
];

const PopularServices = () => {
  return (
    <section id="services" className="py-12 md:py-16 bg-background">
      <div className="gov-section">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-primary rounded-full" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">Popular Services</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <a
              key={s.label}
              href="#"
              className="gov-card p-5 flex items-start gap-4 group"
            >
              <div className="p-2.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <s.icon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{s.label}</h4>
                <p className="text-sm text-muted-foreground mt-0.5">{s.desc}</p>
              </div>
              <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary mt-1 transition-colors" />
            </a>
          ))}

          {/* Featured card */}
          <div className="gov-card p-5 border-l-4 border-l-gov-orange bg-gov-orange/5">
            <div className="text-xs font-semibold text-gov-orange uppercase tracking-wider mb-2">Featured</div>
            <h4 className="font-bold text-foreground mb-1">National Census 2026</h4>
            <p className="text-sm text-muted-foreground mb-3">
              The annual citizen census is now open. All registered citizens must complete their census submission by March 31, 2026.
            </p>
            <a href="#" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
              Complete Census <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
