import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopNavbar from "@/components/TopNavbar";
import { Shield, Landmark, IndianRupee, Globe, Users, Gavel, Building2, Search, ArrowRight, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Shield, Landmark, IndianRupee, Globe, Users, Gavel, Building2,
};

interface Ministry {
  id: string;
  name: string;
  description: string;
  icon: string;
  minister_name: string | null;
  roblox_username: string | null;
  discord_username: string | null;
  discord_id: string | null;
  roblox_id: string | null;
  status: string;
  sort_order: number;
}

const Ministries = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fetchMinistries = async () => {
      const { data } = await supabase
        .from("ministries")
        .select("*")
        .order("sort_order", { ascending: true });
      setMinistries(data || []);
      setLoading(false);
    };
    fetchMinistries();
  }, []);

  const filtered = ministries.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />
      <main className="flex-1">
        <section className="bg-primary py-12">
          <div className="gov-section">
            <div className="flex items-center gap-3 mb-3">
              <Landmark size={28} className="text-primary-foreground/80" />
              <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">Ministries & Departments</h1>
            </div>
            <p className="text-primary-foreground/70 max-w-2xl">
              View all government ministries, departments, and their key contact personnel.
            </p>
            <div className="mt-6 flex max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  placeholder="Search ministries..."
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
                <Landmark size={48} className="mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">No ministries found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((m) => {
                  const Icon = iconMap[m.icon] || Building2;
                  const isExpanded = expanded === m.id;
                  return (
                    <div key={m.id} className="gov-card p-5">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 rounded-md bg-accent/10 text-accent">
                          <Icon size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground">{m.name}</h3>
                          <p className="text-sm text-muted-foreground">{m.description}</p>
                        </div>
                        <button
                          onClick={() => setExpanded(isExpanded ? null : m.id)}
                          className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
                        >
                          {isExpanded ? "Hide" : "Contact"} <ArrowRight size={14} className={`transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </button>
                      </div>
                      {isExpanded && (
                        <div className="border-t pt-3 mt-1 space-y-2 text-sm">
                          {m.minister_name && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Minister/Head</span>
                              <span className="text-foreground font-medium">{m.minister_name}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Roblox Username</span>
                            <span className="text-foreground font-medium">{m.roblox_username || "—"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Roblox ID</span>
                            <span className="text-foreground font-medium">{m.roblox_id || "—"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Discord Username</span>
                            <span className="text-foreground font-medium">{m.discord_username || "—"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Discord ID</span>
                            <span className="text-foreground font-medium">{m.discord_id || "—"}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Ministries;
