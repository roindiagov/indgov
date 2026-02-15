import { useState, useEffect } from "react";
import { FileText, Users, Briefcase, Scale, Newspaper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const QuickStats = () => {
  const [counts, setCounts] = useState({ services: 0, ministries: 0, laws: 0, recruitment: 0, news: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      const [s, m, l, r, n] = await Promise.all([
        supabase.from("public_services").select("id", { count: "exact", head: true }),
        supabase.from("ministries").select("id", { count: "exact", head: true }),
        supabase.from("laws_policies").select("id", { count: "exact", head: true }),
        supabase.from("recruitment_posts").select("id", { count: "exact", head: true }),
        supabase.from("news").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        services: s.count || 0,
        ministries: m.count || 0,
        laws: l.count || 0,
        recruitment: r.count || 0,
        news: n.count || 0,
      });
    };
    fetchCounts();
  }, []);

  const stats = [
    { label: "Public Services", value: counts.services, icon: FileText, color: "text-primary" },
    { label: "Ministries", value: counts.ministries, icon: Users, color: "text-accent" },
    { label: "Laws & Policies", value: counts.laws, icon: Scale, color: "text-gov-orange" },
    { label: "Open Positions", value: counts.recruitment, icon: Briefcase, color: "text-gov-green" },
    { label: "News Articles", value: counts.news, icon: Newspaper, color: "text-gov-navy" },
  ];

  return (
    <section className="py-8 bg-card border-y border-border">
      <div className="gov-section">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 p-3">
              <stat.icon size={28} className={stat.color} />
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickStats;
