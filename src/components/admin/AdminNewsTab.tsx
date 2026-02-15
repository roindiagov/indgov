import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, X, Save, Edit2, Trash2 } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  tag: string;
  status: string;
}

interface Props {
  news: NewsItem[];
  onRefresh: () => void;
}

const AdminNewsTab = ({ news, onRefresh }: Props) => {
  const [form, setForm] = useState({ title: "", summary: "", content: "", tag: "General", status: "Published" });
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const save = async () => {
    if (!form.title || !form.summary) return;
    if (editing) {
      await supabase.from("news").update(form).eq("id", editing);
    } else {
      await supabase.from("news").insert(form);
    }
    setForm({ title: "", summary: "", content: "", tag: "General", status: "Published" });
    setEditing(null);
    setShowForm(false);
    onRefresh();
  };

  const edit = (item: NewsItem) => {
    setForm({ title: item.title, summary: item.summary, content: item.content, tag: item.tag, status: item.status });
    setEditing(item.id);
    setShowForm(true);
  };

  const remove = async (id: string) => {
    await supabase.from("news").delete().eq("id", id);
    onRefresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-foreground">Manage News</h2>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm({ title: "", summary: "", content: "", tag: "General", status: "Published" }); }}
          className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded flex items-center gap-1 hover:bg-gov-green-light transition-colors"
        >
          <Plus size={14} /> Add News
        </button>
      </div>

      {showForm && (
        <div className="gov-card p-5 mb-4 border-l-4 border-l-primary">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">{editing ? "Edit News" : "New News Article"}</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }}><X size={18} className="text-muted-foreground" /></button>
          </div>
          <div className="space-y-3">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            <input value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} placeholder="Summary" className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Full content (optional)" rows={4} className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            <div className="flex gap-3">
              <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="Tag" className="flex-1 px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="px-3 py-2 bg-background border rounded text-sm outline-none">
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
            <button onClick={save} className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium flex items-center gap-1 hover:bg-gov-green-light transition-colors">
              <Save size={14} /> {editing ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}

      {news.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">No news articles yet.</p>
      ) : (
        <div className="space-y-2">
          {news.map((item) => (
            <div key={item.id} className="gov-card p-4 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-1.5 py-0.5 text-[10px] font-bold uppercase rounded ${item.status === "Published" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{item.status}</span>
                  <span className="text-[10px] text-muted-foreground uppercase">{item.tag}</span>
                </div>
                <h4 className="font-medium text-sm text-foreground truncate">{item.title}</h4>
              </div>
              <div className="flex items-center gap-2 ml-3">
                <button onClick={() => edit(item)} className="p-1.5 hover:bg-muted rounded"><Edit2 size={14} className="text-muted-foreground" /></button>
                <button onClick={() => remove(item.id)} className="p-1.5 hover:bg-destructive/10 rounded"><Trash2 size={14} className="text-destructive" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNewsTab;
