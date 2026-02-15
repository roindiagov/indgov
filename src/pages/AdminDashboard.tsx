import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Shield, LogOut, Plus, Trash2, Edit2, Scale, Briefcase, X, Save, ArrowLeft,
  Newspaper, Building2, Landmark,
} from "lucide-react";
import emblemLogo from "@/assets/emblem-logo.png";
import AdminNewsTab from "@/components/admin/AdminNewsTab";
import AdminServicesTab from "@/components/admin/AdminServicesTab";
import AdminMinistriesTab from "@/components/admin/AdminMinistriesTab";

type Tab = "laws" | "recruitment" | "news" | "services" | "ministries";

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("laws");

  // Laws state
  const [laws, setLaws] = useState<any[]>([]);
  const [lawForm, setLawForm] = useState({ title: "", content: "", category: "General", status: "Active" });
  const [editingLaw, setEditingLaw] = useState<string | null>(null);
  const [showLawForm, setShowLawForm] = useState(false);

  // Recruitment state
  const [posts, setPosts] = useState<any[]>([]);
  const [postForm, setPostForm] = useState({ title: "", department: "", description: "", positions: 1, deadline: "", status: "Open" });
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);

  // New content state
  const [news, setNews] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [ministries, setMinistries] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/admin-login");
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) { fetchLaws(); fetchPosts(); fetchNews(); fetchServices(); fetchMinistries(); }
  }, [isAdmin]);

  const fetchLaws = async () => { const { data } = await supabase.from("laws_policies").select("*").order("created_at", { ascending: false }); setLaws(data || []); };
  const fetchPosts = async () => { const { data } = await supabase.from("recruitment_posts").select("*").order("created_at", { ascending: false }); setPosts(data || []); };
  const fetchNews = async () => { const { data } = await supabase.from("news").select("*").order("created_at", { ascending: false }); setNews(data || []); };
  const fetchServices = async () => { const { data } = await supabase.from("public_services").select("*").order("sort_order", { ascending: true }); setServices(data || []); };
  const fetchMinistries = async () => { const { data } = await supabase.from("ministries").select("*").order("sort_order", { ascending: true }); setMinistries(data || []); };

  // Laws CRUD
  const saveLaw = async () => {
    if (!lawForm.title || !lawForm.content) return;
    if (editingLaw) { await supabase.from("laws_policies").update(lawForm).eq("id", editingLaw); }
    else { await supabase.from("laws_policies").insert(lawForm); }
    setLawForm({ title: "", content: "", category: "General", status: "Active" }); setEditingLaw(null); setShowLawForm(false); fetchLaws();
  };
  const editLaw = (law: any) => { setLawForm({ title: law.title, content: law.content, category: law.category, status: law.status }); setEditingLaw(law.id); setShowLawForm(true); };
  const deleteLaw = async (id: string) => { await supabase.from("laws_policies").delete().eq("id", id); fetchLaws(); };

  // Recruitment CRUD
  const savePost = async () => {
    if (!postForm.title || !postForm.department || !postForm.description) return;
    const payload = { ...postForm, positions: Number(postForm.positions), deadline: postForm.deadline || null };
    if (editingPost) { await supabase.from("recruitment_posts").update(payload).eq("id", editingPost); }
    else { await supabase.from("recruitment_posts").insert(payload); }
    setPostForm({ title: "", department: "", description: "", positions: 1, deadline: "", status: "Open" }); setEditingPost(null); setShowPostForm(false); fetchPosts();
  };
  const editPost = (post: any) => {
    setPostForm({ title: post.title, department: post.department, description: post.description, positions: post.positions, deadline: post.deadline ? post.deadline.split("T")[0] : "", status: post.status });
    setEditingPost(post.id); setShowPostForm(true);
  };
  const deletePost = async (id: string) => { await supabase.from("recruitment_posts").delete().eq("id", id); fetchPosts(); };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;

  const tabs: { key: Tab; label: string; icon: any; count: number }[] = [
    { key: "laws", label: "Laws & Policies", icon: Scale, count: laws.length },
    { key: "recruitment", label: "Recruitment", icon: Briefcase, count: posts.length },
    { key: "news", label: "News", icon: Newspaper, count: news.length },
    { key: "services", label: "Services", icon: Building2, count: services.length },
    { key: "ministries", label: "Ministries", icon: Landmark, count: ministries.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="h-1 bg-gov-green w-full" />
      <div className="h-0.5 bg-gov-orange w-full" />

      <header className="bg-card shadow-sm border-b">
        <div className="gov-section flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <img src={emblemLogo} alt="Emblem" className="h-8 w-8 rounded-full" />
            <div>
              <span className="font-bold text-primary text-sm">INDGOV.RBLX</span>
              <span className="text-muted-foreground text-xs ml-2">Admin Panel</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">{user?.email}</span>
            <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"><ArrowLeft size={14} /> Home</button>
            <button onClick={signOut} className="text-sm text-destructive hover:underline flex items-center gap-1"><LogOut size={14} /> Sign Out</button>
          </div>
        </div>
      </header>

      <div className="gov-section py-8">
        <div className="flex items-center gap-2 mb-6">
          <Shield size={22} className="text-primary" />
          <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === t.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon size={14} className="inline mr-1.5" /> {t.label} ({t.count})
            </button>
          ))}
        </div>

        {/* Laws Tab */}
        {tab === "laws" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-foreground">Manage Laws & Policies</h2>
              <button onClick={() => { setShowLawForm(true); setEditingLaw(null); setLawForm({ title: "", content: "", category: "General", status: "Active" }); }} className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded flex items-center gap-1 hover:bg-gov-green-light transition-colors"><Plus size={14} /> Add Law</button>
            </div>
            {showLawForm && (
              <div className="gov-card p-5 mb-4 border-l-4 border-l-primary">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">{editingLaw ? "Edit Law" : "New Law / Policy"}</h3>
                  <button onClick={() => { setShowLawForm(false); setEditingLaw(null); }}><X size={18} className="text-muted-foreground" /></button>
                </div>
                <div className="space-y-3">
                  <input value={lawForm.title} onChange={(e) => setLawForm({ ...lawForm, title: e.target.value })} placeholder="Title" className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  <textarea value={lawForm.content} onChange={(e) => setLawForm({ ...lawForm, content: e.target.value })} placeholder="Content" rows={4} className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  <div className="flex gap-3">
                    <input value={lawForm.category} onChange={(e) => setLawForm({ ...lawForm, category: e.target.value })} placeholder="Category" className="flex-1 px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                    <select value={lawForm.status} onChange={(e) => setLawForm({ ...lawForm, status: e.target.value })} className="px-3 py-2 bg-background border rounded text-sm outline-none"><option>Active</option><option>Draft</option><option>Repealed</option></select>
                  </div>
                  <button onClick={saveLaw} className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium flex items-center gap-1 hover:bg-gov-green-light transition-colors"><Save size={14} /> {editingLaw ? "Update" : "Save"}</button>
                </div>
              </div>
            )}
            {laws.length === 0 ? <p className="text-center py-8 text-muted-foreground">No laws added yet.</p> : (
              <div className="space-y-2">
                {laws.map((law) => (
                  <div key={law.id} className="gov-card p-4 flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-1.5 py-0.5 text-[10px] font-bold uppercase rounded ${law.status === "Active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{law.status}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">{law.category}</span>
                      </div>
                      <h4 className="font-medium text-sm text-foreground truncate">{law.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      <button onClick={() => editLaw(law)} className="p-1.5 hover:bg-muted rounded"><Edit2 size={14} className="text-muted-foreground" /></button>
                      <button onClick={() => deleteLaw(law.id)} className="p-1.5 hover:bg-destructive/10 rounded"><Trash2 size={14} className="text-destructive" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recruitment Tab */}
        {tab === "recruitment" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-foreground">Manage Recruitment Posts</h2>
              <button onClick={() => { setShowPostForm(true); setEditingPost(null); setPostForm({ title: "", department: "", description: "", positions: 1, deadline: "", status: "Open" }); }} className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded flex items-center gap-1 hover:bg-gov-green-light transition-colors"><Plus size={14} /> Add Position</button>
            </div>
            {showPostForm && (
              <div className="gov-card p-5 mb-4 border-l-4 border-l-accent">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">{editingPost ? "Edit Position" : "New Recruitment Post"}</h3>
                  <button onClick={() => { setShowPostForm(false); setEditingPost(null); }}><X size={18} className="text-muted-foreground" /></button>
                </div>
                <div className="space-y-3">
                  <input value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} placeholder="Position Title" className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  <input value={postForm.department} onChange={(e) => setPostForm({ ...postForm, department: e.target.value })} placeholder="Department" className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  <textarea value={postForm.description} onChange={(e) => setPostForm({ ...postForm, description: e.target.value })} placeholder="Job Description" rows={4} className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                  <div className="flex gap-3">
                    <input type="number" min={1} value={postForm.positions} onChange={(e) => setPostForm({ ...postForm, positions: parseInt(e.target.value) || 1 })} placeholder="Positions" className="w-24 px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                    <input type="date" value={postForm.deadline} onChange={(e) => setPostForm({ ...postForm, deadline: e.target.value })} className="flex-1 px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                    <select value={postForm.status} onChange={(e) => setPostForm({ ...postForm, status: e.target.value })} className="px-3 py-2 bg-background border rounded text-sm outline-none"><option>Open</option><option>Closed</option></select>
                  </div>
                  <button onClick={savePost} className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium flex items-center gap-1 hover:bg-gov-green-light transition-colors"><Save size={14} /> {editingPost ? "Update" : "Save"}</button>
                </div>
              </div>
            )}
            {posts.length === 0 ? <p className="text-center py-8 text-muted-foreground">No recruitment posts yet.</p> : (
              <div className="space-y-2">
                {posts.map((post) => (
                  <div key={post.id} className="gov-card p-4 flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-1.5 py-0.5 text-[10px] font-bold uppercase rounded ${post.status === "Open" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>{post.status}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">{post.department}</span>
                      </div>
                      <h4 className="font-medium text-sm text-foreground truncate">{post.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      <button onClick={() => editPost(post)} className="p-1.5 hover:bg-muted rounded"><Edit2 size={14} className="text-muted-foreground" /></button>
                      <button onClick={() => deletePost(post.id)} className="p-1.5 hover:bg-destructive/10 rounded"><Trash2 size={14} className="text-destructive" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* News Tab */}
        {tab === "news" && <AdminNewsTab news={news} onRefresh={fetchNews} />}

        {/* Services Tab */}
        {tab === "services" && <AdminServicesTab services={services} onRefresh={fetchServices} />}

        {/* Ministries Tab */}
        {tab === "ministries" && <AdminMinistriesTab ministries={ministries} onRefresh={fetchMinistries} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
