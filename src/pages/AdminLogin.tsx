import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, ArrowLeft, Shield } from "lucide-react";
import emblemLogo from "@/assets/emblem-logo.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [mode] = useState<"login">("login");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      navigate("/admin");
    }
    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top accent */}
      <div className="h-1 bg-gov-green w-full" />
      <div className="h-0.5 bg-gov-orange w-full" />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src={emblemLogo} alt="Emblem" className="h-16 w-16 rounded-full mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground">INDGOV.RBLX</h1>
            <p className="text-muted-foreground text-sm mt-1">Administrative Portal Access</p>
          </div>

          <div className="gov-card p-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b">
              <Shield size={20} className="text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                {mode === "login" ? "Admin Sign In" : "Admin Registration"}
              </h2>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
                {error}
              </div>
            )}
            {message && (
              <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded text-sm text-primary">
                {message}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@indgov.rblx"
                    className="w-full pl-10 pr-4 py-2.5 bg-background border rounded text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-background border rounded text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded hover:bg-gov-green-light transition-colors disabled:opacity-50"
              >
                {loading ? "Please wait..." : "Sign In"}
              </button>
            </form>

          </div>

          <div className="mt-6 text-center">
            <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
              <ArrowLeft size={14} /> Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
