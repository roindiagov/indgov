import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";
import { Scale, Search, ArrowRight, Calendar } from "lucide-react";

interface LawPolicy {
  id: string;
  title: string;
  content: string;
  category: string;
  status: string;
  created_at: string;
}

const LawsPolicies = () => {
  const [laws, setLaws] = useState<LawPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    const fetchLaws = async () => {
      const { data } = await supabase
        .from("laws_policies")
        .select("*")
        .order("created_at", { ascending: false });
      setLaws(data || []);
      setLoading(false);
    };
    fetchLaws();
  }, []);

  const categories = ["All", ...Array.from(new Set(laws.map((l) => l.category)))];

  const filtered = laws.filter((l) => {
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase()) || l.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || l.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary py-12">
          <div className="gov-section">
            <div className="flex items-center gap-3 mb-3">
              <Scale size={28} className="text-primary-foreground/80" />
              <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">Laws & Policies</h1>
            </div>
            <p className="text-primary-foreground/70 max-w-2xl">
              Browse all enacted legislation, policy directives, and regulatory frameworks of INDGOV.RBLX.
            </p>
            <div className="mt-6 flex max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  placeholder="Search laws and policies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-md bg-card text-foreground text-sm border-0 outline-none focus:ring-2 focus:ring-gov-gold"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-10">
          <div className="gov-section">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    categoryFilter === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12">
                <Scale size={48} className="mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">No laws or policies found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((law) => (
                  <div key={law.id} className="gov-card p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded ${
                            law.status === "Active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }`}>
                            {law.status}
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent rounded">
                            {law.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">{law.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{law.content}</p>
                        <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                          <Calendar size={12} />
                          {new Date(law.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LawsPolicies;
