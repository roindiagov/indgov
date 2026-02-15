import { useState, useEffect } from "react";
import { CalendarDays, FileText, Briefcase, Scale, Newspaper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ActivityItem {
  id: string;
  title: string;
  type: string;
  date: string;
}

const typeConfig: Record<string, { icon: typeof FileText; color: string }> = {
  News: { icon: Newspaper, color: "bg-accent/10 text-accent" },
  Law: { icon: Scale, color: "bg-gov-orange/10 text-gov-orange" },
  Recruitment: { icon: Briefcase, color: "bg-gov-green/10 text-gov-green" },
  Service: { icon: FileText, color: "bg-primary/10 text-primary" },
};

const RecentActivity = () => {
  const [items, setItems] = useState<ActivityItem[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const [news, laws, recruitment] = await Promise.all([
        supabase.from("news").select("id, title, created_at").order("created_at", { ascending: false }).limit(3),
        supabase.from("laws_policies").select("id, title, created_at").order("created_at", { ascending: false }).limit(3),
        supabase.from("recruitment_posts").select("id, title, created_at").order("created_at", { ascending: false }).limit(3),
      ]);

      const all: ActivityItem[] = [
        ...(news.data || []).map((n) => ({ id: n.id, title: n.title, type: "News", date: n.created_at })),
        ...(laws.data || []).map((l) => ({ id: l.id, title: l.title, type: "Law", date: l.created_at })),
        ...(recruitment.data || []).map((r) => ({ id: r.id, title: r.title, type: "Recruitment", date: r.created_at })),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);

      setItems(all);
    };
    fetch();
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="py-12 bg-gov-surface-alt">
      <div className="gov-section">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-accent rounded-full" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">Recent Activity</h3>
        </div>
        <div className="space-y-2">
          {items.map((item) => {
            const cfg = typeConfig[item.type] || typeConfig.News;
            const Icon = cfg.icon;
            return (
              <div key={`${item.type}-${item.id}`} className="gov-card p-4 flex items-center gap-4">
                <div className={`p-2 rounded-md ${cfg.color}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">{item.title}</h4>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <CalendarDays size={11} /> {new Date(item.date).toLocaleDateString()} · {item.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentActivity;
