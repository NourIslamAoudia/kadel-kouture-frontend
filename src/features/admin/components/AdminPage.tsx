import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@features/auth/context/AuthContext";

function isAdmin(user: { role: string; is_admin?: boolean }) {
  return user.role === "admin" || user.is_admin === true;
}

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin(user)) return <Navigate to="/" replace />;

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <main className="admin-page">
      <header className="admin-header">
        <img src="/logo.png" alt="Kadel Kouture" className="admin-logo" />
        <div className="admin-user-area">
          <span>{user.name || user.email}</span>
          <button type="button" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </header>
      <section className="admin-empty-state">
        <span className="admin-eyebrow">Administration</span>
        <h1>Demandes clients</h1>
        <p>
          La connexion administrateur est active. La liste des soumissions sera
          branchée sur l’API backend.
        </p>
      </section>
    </main>
  );
}
