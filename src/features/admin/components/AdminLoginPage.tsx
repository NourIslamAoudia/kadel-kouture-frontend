import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { mapSupabaseUser, useAuth } from "@features/auth/context/AuthContext";
import { supabase } from "@shared/lib/supabase";

function isAdmin(user: { role: string; is_admin?: boolean }) {
  return user.role === "admin" || user.is_admin === true;
}

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user && isAdmin(user)) return <Navigate to="/admin" replace />;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      if (loginError || !data.user) {
        throw loginError ?? new Error("Utilisateur introuvable");
      }
      const adminUser = mapSupabaseUser(data.user);
      if (!isAdmin(adminUser)) {
        await supabase.auth.signOut();
        setError("Ce compte ne possède pas les droits administrateur.");
        return;
      }
      login(adminUser);
      navigate("/admin", { replace: true });
    } catch {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-auth-page">
      <div className="admin-auth-panel">
        <img src="/logo.png" alt="Kadel Kouture" className="admin-logo" />
        <span className="admin-eyebrow">Espace sécurisé</span>
        <h1>
          Connexion <em>administrateur</em>
        </h1>
        <p className="admin-subtitle">
          Accédez à la gestion des demandes Kadel Kouture.
        </p>

        <form onSubmit={handleSubmit} className="admin-auth-form">
          <label>
            Adresse email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          {error && (
            <p className="admin-form-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" disabled={loading}>
            {loading ? "Vérification…" : "Se connecter"}
          </button>
        </form>
        <button
          type="button"
          className="admin-back-link"
          onClick={() => navigate("/")}
        >
          Retour à Kadel Kouture
        </button>
      </div>
    </main>
  );
}
