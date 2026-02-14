import { CalendarDays, ArrowRight } from "lucide-react";

const newsItems = [
  {
    date: "Feb 12, 2026",
    title: "New Defence Policy Framework Announced",
    summary: "The Ministry of Defence has released a comprehensive new policy framework governing national security operations.",
    tag: "Defence",
  },
  {
    date: "Feb 10, 2026",
    title: "Budget Session 2026 Begins",
    summary: "The annual Budget Session commenced with the Finance Minister presenting key fiscal priorities for the year ahead.",
    tag: "Finance",
  },
  {
    date: "Feb 8, 2026",
    title: "Recruitment Drive: 500+ Positions Open",
    summary: "Multiple government departments have announced openings for administrative and technical roles across all regions.",
    tag: "Recruitment",
  },
];

const LatestNews = () => {
  return (
    <section id="news" className="py-12 md:py-16 bg-gov-surface-alt">
      <div className="gov-section">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gov-navy rounded-full" />
            <h3 className="text-xl md:text-2xl font-bold text-foreground">Latest News</h3>
          </div>
          <a href="#" className="text-sm font-semibold text-primary hover:underline hidden sm:inline-flex items-center gap-1">
            View All News <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {newsItems.map((item) => (
            <article key={item.title} className="gov-card p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent rounded">
                  {item.tag}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <CalendarDays size={12} /> {item.date}
                </span>
              </div>
              <h4 className="font-semibold text-foreground mb-2 leading-snug">{item.title}</h4>
              <p className="text-sm text-muted-foreground flex-1">{item.summary}</p>
              <a href="#" className="mt-4 text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
                Read More <ArrowRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
