import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopNavbar from "@/components/TopNavbar";
import { Newspaper, Search, CalendarDays } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  tag: string;
  status: string;
  created_at: string;
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });
      setNews(data || []);
      setLoading(false);
    };
    fetchNews();
  }, []);

  const tags = ["All", ...Array.from(new Set(news.map((n) => n.tag)))];

  const filtered = news.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.summary.toLowerCase().includes(search.toLowerCase());
    const matchesTag = tagFilter === "All" || n.tag === tagFilter;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />
      <main className="flex-1">
        <section className="bg-primary py-12">
          <div className="gov-section">
            <div className="flex items-center gap-3 mb-3">
              <Newspaper size={28} className="text-primary-foreground/80" />
              <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">Latest News</h1>
            </div>
            <p className="text-primary-foreground/70 max-w-2xl">
              Stay updated with the latest announcements, policy changes, and events from INDGOV.RBLX.
            </p>
            <div className="mt-6 flex max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  placeholder="Search news..."
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
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setTagFilter(tag)}
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    tagFilter === tag
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:border-primary/30"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12">
                <Newspaper size={48} className="mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">No news articles found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((item) => (
                  <article key={item.id} className="gov-card p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent rounded">
                        {item.tag}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <CalendarDays size={12} /> {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.summary}</p>
                    {item.content && (
                      <>
                        {expanded === item.id ? (
                          <div className="mt-3 text-sm text-foreground/80 whitespace-pre-line border-t pt-3">{item.content}</div>
                        ) : null}
                        <button
                          onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                          className="mt-3 text-sm font-semibold text-primary hover:underline"
                        >
                          {expanded === item.id ? "Show Less" : "Read More"}
                        </button>
                      </>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default News;
