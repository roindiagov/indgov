import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopNavbar from "@/components/TopNavbar";
import { FileText, UserCheck, Briefcase, Scale, Building2, Search, ArrowRight, type LucideIcon } from "lucide-react";

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
  status: string;
  sort_order: number;
}

const PublicServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("public_services")
        .select("*")
        .order("sort_order", { ascending: true });
      setServices(data || []);
      setLoading(false);
    };
    fetchServices();
  }, []);

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
  );

  const regular = filtered.filter((s) => !s.is_featured);
  const featured = filtered.filter((s) => s.is_featured);

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />
      <main className="flex-1">
        <section className="bg-accent py-12">
          <div className="gov-section">
            <div className="flex items-center gap-3 mb-3">
              <Building2 size={28} className="text-accent-foreground/80" />
              <h1 className="text-2xl md:text-3xl font-bold text-accent-foreground">Public Services</h1>
            </div>
            <p className="text-accent-foreground/70 max-w-2xl">
              Access all government services, portals, and citizen tools provided by INDGOV.RBLX.
            </p>
            <div className="mt-6 flex max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-md bg-card text-foreground text-sm border-0 outline-none focus:ring-2 focus:ring-gov-gold"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="gov-section">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12">
                <Building2 size={48} className="mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">No services available at this time.</p>
              </div>
            ) : (
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
                        {s.link && (
                          <a href={s.link} target="_blank" rel="noopener noreferrer" className="mt-2 text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                            Access <ArrowRight size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
                {featured.map((s) => (
                  <div key={s.id} className="gov-card p-5 border-l-4 border-l-gov-orange bg-gov-orange/5">
                    <div className="text-xs font-semibold text-gov-orange uppercase tracking-wider mb-2">{s.featured_label || "Featured"}</div>
                    <h4 className="font-bold text-foreground mb-1">{s.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{s.featured_description || s.description}</p>
                    {s.link && (
                      <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                        Access Service <ArrowRight size={14} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PublicServices;
