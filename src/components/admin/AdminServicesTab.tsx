import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, X, Save, Edit2, Trash2 } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  is_featured: boolean;
  featured_label: string | null;
  featured_description: string | null;
  link: string | null;
  status: string;
  sort_order: number;
}

interface Props {
  services: Service[];
  onRefresh: () => void;
}

const AdminServicesTab = ({ services, onRefresh }: Props) => {
  const [form, setForm] = useState({ title: "", description: "", icon: "FileText", is_featured: false, featured_label: "", featured_description: "", link: "", status: "Active", sort_order: 0 });
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const save = async () => {
    if (!form.title || !form.description) return;
    const payload = {
      ...form,
      featured_label: form.featured_label || null,
      featured_description: form.featured_description || null,
      link: form.link || null,
    };
    if (editing) {
      await supabase.from("public_services").update(payload).eq("id", editing);
    } else {
      await supabase.from("public_services").insert(payload);
    }
    setForm({ title: "", description: "", icon: "FileText", is_featured: false, featured_label: "", featured_description: "", link: "", status: "Active", sort_order: 0 });
    setEditing(null);
    setShowForm(false);
    onRefresh();
  };

  const edit = (s: Service) => {
    setForm({
      title: s.title, description: s.description, icon: s.icon, is_featured: s.is_featured,
      featured_label: s.featured_label || "", featured_description: s.featured_description || "",
      link: s.link || "", status: s.status, sort_order: s.sort_order,
    });
    setEditing(s.id);
    setShowForm(true);
  };

  const remove = async (id: string) => {
    await supabase.from("public_services").delete().eq("id", id);
    onRefresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-foreground">Manage Public Services</h2>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm({ title: "", description: "", icon: "FileText", is_featured: false, featured_label: "", featured_description: "", link: "", status: "Active", sort_order: 0 }); }}
          className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded flex items-center gap-1 hover:bg-gov-green-light transition-colors"
        >
          <Plus size={14} /> Add Service
        </button>
      </div>

      {showForm && (
        <div className="gov-card p-5 mb-4 border-l-4 border-l-accent">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">{editing ? "Edit Service" : "New Service"}</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }}><X size={18} className="text-muted-foreground" /></button>
          </div>
          <div className="space-y-3">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Service Name" className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            <div className="flex gap-3">
              <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="px-3 py-2 bg-background border rounded text-sm outline-none">
                <option value="FileText">FileText</option>
                <option value="UserCheck">UserCheck</option>
                <option value="Briefcase">Briefcase</option>
                <option value="Scale">Scale</option>
                <option value="Building2">Building2</option>
              </select>
              <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="Link (optional)" className="flex-1 px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} placeholder="Order" className="w-20 px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
              Featured service
            </label>
            {form.is_featured && (
              <div className="flex gap-3">
                <input value={form.featured_label} onChange={(e) => setForm({ ...form, featured_label: e.target.value })} placeholder="Featured Label" className="flex-1 px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                <input value={form.featured_description} onChange={(e) => setForm({ ...form, featured_description: e.target.value })} placeholder="Featured Description" className="flex-1 px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            )}
            <div className="flex gap-3">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="px-3 py-2 bg-background border rounded text-sm outline-none">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <button onClick={save} className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium flex items-center gap-1 hover:bg-gov-green-light transition-colors">
              <Save size={14} /> {editing ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}

      {services.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">No services yet.</p>
      ) : (
        <div className="space-y-2">
          {services.map((s) => (
            <div key={s.id} className="gov-card p-4 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-1.5 py-0.5 text-[10px] font-bold uppercase rounded ${s.status === "Active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{s.status}</span>
                  {s.is_featured && <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-gov-orange/10 text-gov-orange">Featured</span>}
                </div>
                <h4 className="font-medium text-sm text-foreground truncate">{s.title}</h4>
              </div>
              <div className="flex items-center gap-2 ml-3">
                <button onClick={() => edit(s)} className="p-1.5 hover:bg-muted rounded"><Edit2 size={14} className="text-muted-foreground" /></button>
                <button onClick={() => remove(s.id)} className="p-1.5 hover:bg-destructive/10 rounded"><Trash2 size={14} className="text-destructive" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminServicesTab;
