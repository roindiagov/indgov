import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, X, Save, Edit2, Trash2 } from "lucide-react";

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

interface Props {
  ministries: Ministry[];
  onRefresh: () => void;
}

const AdminMinistriesTab = ({ ministries, onRefresh }: Props) => {
  const [form, setForm] = useState({
    name: "", description: "", icon: "Building2", minister_name: "",
    roblox_username: "", discord_username: "", discord_id: "", roblox_id: "",
    status: "Active", sort_order: 0,
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const save = async () => {
    if (!form.name || !form.description) return;
    const payload = {
      ...form,
      minister_name: form.minister_name || null,
      roblox_username: form.roblox_username || null,
      discord_username: form.discord_username || null,
      discord_id: form.discord_id || null,
      roblox_id: form.roblox_id || null,
    };
    if (editing) {
      await supabase.from("ministries").update(payload).eq("id", editing);
    } else {
      await supabase.from("ministries").insert(payload);
    }
    setForm({ name: "", description: "", icon: "Building2", minister_name: "", roblox_username: "", discord_username: "", discord_id: "", roblox_id: "", status: "Active", sort_order: 0 });
    setEditing(null);
    setShowForm(false);
    onRefresh();
  };

  const edit = (m: Ministry) => {
    setForm({
      name: m.name, description: m.description, icon: m.icon,
      minister_name: m.minister_name || "", roblox_username: m.roblox_username || "",
      discord_username: m.discord_username || "", discord_id: m.discord_id || "",
      roblox_id: m.roblox_id || "", status: m.status, sort_order: m.sort_order,
    });
    setEditing(m.id);
    setShowForm(true);
  };

  const remove = async (id: string) => {
    await supabase.from("ministries").delete().eq("id", id);
    onRefresh();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-foreground">Manage Ministries</h2>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm({ name: "", description: "", icon: "Building2", minister_name: "", roblox_username: "", discord_username: "", discord_id: "", roblox_id: "", status: "Active", sort_order: 0 }); }}
          className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded flex items-center gap-1 hover:bg-gov-green-light transition-colors"
        >
          <Plus size={14} /> Add Ministry
        </button>
      </div>

      {showForm && (
        <div className="gov-card p-5 mb-4 border-l-4 border-l-primary">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">{editing ? "Edit Ministry" : "New Ministry"}</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }}><X size={18} className="text-muted-foreground" /></button>
          </div>
          <div className="space-y-3">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ministry Name" className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            <div className="flex gap-3">
              <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="px-3 py-2 bg-background border rounded text-sm outline-none">
                <option value="Shield">Shield</option>
                <option value="Landmark">Landmark</option>
                <option value="IndianRupee">IndianRupee</option>
                <option value="Globe">Globe</option>
                <option value="Users">Users</option>
                <option value="Gavel">Gavel</option>
                <option value="Building2">Building2</option>
              </select>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} placeholder="Order" className="w-20 px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="px-3 py-2 bg-background border rounded text-sm outline-none">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="border-t pt-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Contact Information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input value={form.minister_name} onChange={(e) => setForm({ ...form, minister_name: e.target.value })} placeholder="Minister/Head Name" className="px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                <input value={form.roblox_username} onChange={(e) => setForm({ ...form, roblox_username: e.target.value })} placeholder="Roblox Username" className="px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                <input value={form.roblox_id} onChange={(e) => setForm({ ...form, roblox_id: e.target.value })} placeholder="Roblox ID" className="px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                <input value={form.discord_username} onChange={(e) => setForm({ ...form, discord_username: e.target.value })} placeholder="Discord Username" className="px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
                <input value={form.discord_id} onChange={(e) => setForm({ ...form, discord_id: e.target.value })} placeholder="Discord ID" className="px-3 py-2 bg-background border rounded text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
            <button onClick={save} className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-medium flex items-center gap-1 hover:bg-gov-green-light transition-colors">
              <Save size={14} /> {editing ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}

      {ministries.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">No ministries added yet.</p>
      ) : (
        <div className="space-y-2">
          {ministries.map((m) => (
            <div key={m.id} className="gov-card p-4 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-1.5 py-0.5 text-[10px] font-bold uppercase rounded ${m.status === "Active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{m.status}</span>
                </div>
                <h4 className="font-medium text-sm text-foreground truncate">{m.name}</h4>
                <p className="text-xs text-muted-foreground truncate">{m.minister_name || "No minister assigned"}</p>
              </div>
              <div className="flex items-center gap-2 ml-3">
                <button onClick={() => edit(m)} className="p-1.5 hover:bg-muted rounded"><Edit2 size={14} className="text-muted-foreground" /></button>
                <button onClick={() => remove(m.id)} className="p-1.5 hover:bg-destructive/10 rounded"><Trash2 size={14} className="text-destructive" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMinistriesTab;
