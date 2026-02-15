import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Landmark, IndianRupee, Globe, Users, Gavel, Building2, ArrowRight, type LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, LucideIcon> = {
  Shield, Landmark, IndianRupee, Globe, Users, Gavel, Building2,
};

interface Ministry {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const MinistriesSection = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);

  useEffect(() => {
    const fetchMinistries = async () => {
      const { data } = await supabase
        .from("ministries")
        .select("id, name, description, icon")
        .order("sort_order", { ascending: true })
        .limit(6);
      setMinistries(data || []);
    };
    fetchMinistries();
  }, []);

  if (ministries.length === 0) return null;

  return (
    <section id="ministries" className="py-12 md:py-16 bg-background">
      <div className="gov-section">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-primary rounded-full" />
            <h3 className="text-xl md:text-2xl font-bold text-foreground">Ministries & Departments</h3>
          </div>
          <Link to="/ministries" className="text-sm font-semibold text-primary hover:underline hidden sm:inline-flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ministries.map((m) => {
            const Icon = iconMap[m.icon] || Building2;
            return (
              <Link
                key={m.id}
                to="/ministries"
                className="gov-card p-5 flex items-center gap-4 group"
              >
                <div className="p-3 rounded-md bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{m.name}</h4>
                  <p className="text-sm text-muted-foreground">{m.description}</p>
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MinistriesSection;
