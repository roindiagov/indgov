import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, UserCheck, Briefcase, Scale, Building2, ArrowRight, type LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, LucideIcon> = {
  FileText, UserCheck, Briefcase, Scale, Building2,
};

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  is_featured: boolean;
  featured_label: string | null;
  featured_description: string | null;
  link: string | null;
}

const PopularServices = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("public_services")
        .select("id, title, description, icon, is_featured, featured_label, featured_description, link")
        .order("sort_order", { ascending: true })
        .limit(6);
      setServices(data || []);
    };
    fetchServices();
  }, []);

  if (services.length === 0) return null;

  const regular = services.filter((s) => !s.is_featured);
  const featured = services.filter((s) => s.is_featured);

  return (
    <section id="services" className="py-12 md:py-16 bg-background">
      <div className="gov-section">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-primary rounded-full" />
            <h3 className="text-xl md:text-2xl font-bold text-foreground">Popular Services</h3>
          </div>
          <Link to="/public-services" className="text-sm font-semibold text-primary hover:underline hidden sm:inline-flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regular.map((s) => {
            const Icon = iconMap[s.icon] || FileText;
            return (
              <div key={s.id} className="gov-card p-5 flex items-start gap-4 group">
                <div className="p-2.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{s.title}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">{s.description}</p>
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary mt-1 transition-colors" />
              </div>
            );
          })}
          {featured.map((s) => (
            <div key={s.id} className="gov-card p-5 border-l-4 border-l-gov-orange bg-gov-orange/5">
              <div className="text-xs font-semibold text-gov-orange uppercase tracking-wider mb-2">{s.featured_label || "Featured"}</div>
              <h4 className="font-bold text-foreground mb-1">{s.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{s.featured_description || s.description}</p>
              {s.link && (
                <a href={s.link} className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                  Access <ArrowRight size={14} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
