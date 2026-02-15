import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ArrowRight, CalendarDays } from "lucide-react";
import TopNavbar from "@/components/TopNavbar";
import { supabase } from "@/integrations/supabase/client";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: string;
  date?: string;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;
    const search = async () => {
      setLoading(true);
      const q = `%${query}%`;

      const [newsRes, servicesRes, ministriesRes, lawsRes, recruitmentRes] = await Promise.all([
        supabase.from("news").select("id, title, summary, created_at").ilike("title", q).limit(5),
        supabase.from("public_services").select("id, title, description").ilike("title", q).limit(5),
        supabase.from("ministries").select("id, name, description").ilike("name", q).limit(5),
        supabase.from("laws_policies").select("id, title, content, created_at").ilike("title", q).limit(5),
        supabase.from("recruitment_posts").select("id, title, description, created_at").ilike("title", q).limit(5),
      ]);

      const mapped: SearchResult[] = [
        ...(newsRes.data || []).map((n) => ({ id: n.id, title: n.title, description: n.summary, type: "News", date: n.created_at })),
        ...(servicesRes.data || []).map((s) => ({ id: s.id, title: s.title, description: s.description, type: "Service" })),
        ...(ministriesRes.data || []).map((m) => ({ id: m.id, title: m.name, description: m.description, type: "Ministry" })),
        ...(lawsRes.data || []).map((l) => ({ id: l.id, title: l.title, description: l.content.substring(0, 120), type: "Law & Policy", date: l.created_at })),
        ...(recruitmentRes.data || []).map((r) => ({ id: r.id, title: r.title, description: r.description, type: "Recruitment", date: r.created_at })),
      ];
      setResults(mapped);
      setLoading(false);
    };
    search();
  }, [query]);

  const typeLink: Record<string, string> = {
    News: "/news",
    Service: "/public-services",
    Ministry: "/ministries",
    "Law & Policy": "/laws-policies",
    Recruitment: "/recruitment",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />
      <main className="flex-1 bg-background">
        <div className="gov-section py-10">
          <h2 className="text-2xl font-bold text-foreground mb-1">Search Results</h2>
          <p className="text-muted-foreground mb-6">
            {results.length} results for "<span className="text-foreground font-medium">{query}</span>"
          </p>

          {loading && <p className="text-muted-foreground">Searching...</p>}

          {!loading && results.length === 0 && query && (
            <p className="text-muted-foreground">No results found. Try a different search term.</p>
          )}

          <div className="space-y-3">
            {results.map((r) => (
              <Link
                key={`${r.type}-${r.id}`}
                to={typeLink[r.type] || "/"}
                className="gov-card p-5 flex items-start gap-4 group block"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded">
                      {r.type}
                    </span>
                    {r.date && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <CalendarDays size={12} /> {new Date(r.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{r.title}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{r.description}</p>
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary mt-1 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
