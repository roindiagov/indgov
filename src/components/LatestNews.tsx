import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  tag: string;
  created_at: string;
}

const LatestNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from("news")
        .select("id, title, summary, tag, created_at")
        .order("created_at", { ascending: false })
        .limit(3);
      setNews(data || []);
    };
    fetchNews();
  }, []);

  if (news.length === 0) return null;

  return (
    <section id="news" className="py-12 md:py-16 bg-gov-surface-alt">
      <div className="gov-section">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gov-navy rounded-full" />
            <h3 className="text-xl md:text-2xl font-bold text-foreground">Latest News</h3>
          </div>
          <Link to="/news" className="text-sm font-semibold text-primary hover:underline hidden sm:inline-flex items-center gap-1">
            View All News <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {news.map((item) => (
            <article key={item.id} className="gov-card p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent rounded">
                  {item.tag}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <CalendarDays size={12} /> {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
              <h4 className="font-semibold text-foreground mb-2 leading-snug">{item.title}</h4>
              <p className="text-sm text-muted-foreground flex-1">{item.summary}</p>
              <Link to="/news" className="mt-4 text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                Read More <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
