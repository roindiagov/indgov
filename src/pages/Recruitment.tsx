import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import TopNavbar from "@/components/TopNavbar";
import Footer from "@/components/Footer";
import { Briefcase, Search, Users, Calendar, MapPin } from "lucide-react";

interface RecruitmentPost {
  id: string;
  title: string;
  department: string;
  description: string;
  positions: number;
  deadline: string | null;
  status: string;
  created_at: string;
}

const Recruitment = () => {
  const [posts, setPosts] = useState<RecruitmentPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("recruitment_posts")
        .select("*")
        .order("created_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-accent py-12">
          <div className="gov-section">
            <div className="flex items-center gap-3 mb-3">
              <Briefcase size={28} className="text-accent-foreground/80" />
              <h1 className="text-2xl md:text-3xl font-bold text-accent-foreground">Recruitment</h1>
            </div>
            <p className="text-accent-foreground/70 max-w-2xl">
              Explore current government job openings and career opportunities across all departments of INDGOV.RBLX.
            </p>
            <div className="mt-6 flex max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  placeholder="Search positions or departments..."
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
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase size={48} className="mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">No open positions at this time.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((post) => (
                  <div key={post.id} className="gov-card p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded ${
                        post.status === "Open" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                      }`}>
                        {post.status}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent rounded">
                        {post.department}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users size={12} /> {post.positions} position{post.positions !== 1 ? "s" : ""}
                      </span>
                      {post.deadline && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> Deadline: {new Date(post.deadline).toLocaleDateString()}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {post.department}
                      </span>
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

export default Recruitment;
