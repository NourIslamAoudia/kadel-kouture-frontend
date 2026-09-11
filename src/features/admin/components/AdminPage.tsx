import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@features/auth/context/AuthContext";
import {
  getAdminSubmissions,
  updateSubmissionStatus,
} from "../api";
import type { AdminSubmission,SubmissionStatus } from "@features/admin/types";
import { getGarmentPrice, getWorkPrice } from "../../../common/pricing";
import type { GarmentType, WorkType } from "@features/submission/types";

const STATUS_LABELS: Record<SubmissionStatus, string> = {
  pending: "En attente",
  in_progress: "En cours",
  completed: "Terminée",
  cancelled: "Annulée",
};

function isAdmin(user: { role: string; is_admin?: boolean }) {
  return user.role === "admin" || user.is_admin === true;
}

function formatDate(value: string | null) {
  if (!value) return "Date inconnue";
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [submissions, setSubmissions] = useState<AdminSubmission[]>([]);
  const [selected, setSelected] = useState<AdminSubmission | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | SubmissionStatus>(
    "all",
  );
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingStatus, setSavingStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !isAdmin(user)) return;
    void getAdminSubmissions()
      .then((result) => setSubmissions(result.data))
      .catch((reason: unknown) =>
        setError(
          reason instanceof Error ? reason.message : "Erreur de chargement.",
        ),
      )
      .finally(() => setLoading(false));
  }, [user]);

  const filteredSubmissions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return submissions.filter((submission) => {
      const matchesStatus =
        statusFilter === "all" ||
        (submission.status ?? "pending") === statusFilter;
      const matchesSearch =
        !query ||
        [
          submission.full_name,
          submission.email,
          submission.phone_number,
          submission.zone,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter, submissions]);

  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin(user)) return <Navigate to="/" replace />;

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  const handleStatusChange = async (status: SubmissionStatus) => {
    if (!selected || selected.status === status) return;
    setSavingStatus(true);
    setError(null);
    try {
      const updated = await updateSubmissionStatus(selected.id, status);
      setSubmissions((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      );
      setSelected(updated);
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Impossible de modifier le statut.",
      );
    } finally {
      setSavingStatus(false);
    }
  };

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div className="admin-brand">
          <img src="/logo.png" alt="Kadel Kouture" className="admin-logo" />
          <span>Kadel Kouture</span>
        </div>
        <div className="admin-user-area">
          <span>{user.name || user.email}</span>
          <button type="button" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </header>

      <section className="admin-dashboard-heading">
        <div>
          <span className="admin-eyebrow">Administration</span>
          <h1>Demandes clients</h1>
          <p>Suivez les demandes et leur avancement depuis un seul espace.</p>
        </div>
        <div className="admin-total">
          <strong>{submissions.length}</strong>
          <span>soumissions</span>
        </div>
      </section>

      <section className="admin-toolbar" aria-label="Filtres des soumissions">
        <input
          type="search"
          placeholder="Rechercher un client, email, zone…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as "all" | SubmissionStatus)
          }
        >
          <option value="all">Tous les statuts</option>
          {(Object.keys(STATUS_LABELS) as SubmissionStatus[]).map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </section>

      {error && (
        <p className="admin-form-error admin-page-error" role="alert">
          {error}
        </p>
      )}
      {loading && <p className="admin-loading">Chargement des demandes…</p>}
      {!loading && !error && filteredSubmissions.length === 0 && (
        <p className="admin-loading">
          Aucune demande ne correspond à ces filtres.
        </p>
      )}

      {!loading && filteredSubmissions.length > 0 && (
        <section
          className="admin-submissions"
          aria-label="Liste des soumissions"
        >
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Demande</th>
                  <th>Zone</th>
                  <th>Date</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((submission) => (
                  <tr
                    key={submission.id}
                    tabIndex={0}
                    onClick={() => setSelected(submission)}
                    onKeyDown={(event) =>
                      event.key === "Enter" && setSelected(submission)
                    }
                  >
                    <td>
                      <strong>{submission.full_name}</strong>
                      <span>{submission.email}</span>
                    </td>
                    <td>
                      {submission.items && submission.items.length > 0 ? (
                        <>
                          <strong>
                            {submission.items.length}{" "}
                            {submission.items.length > 1 ? "pièces" : "pièce"}
                            {submission.total_price
                              ? ` · ${submission.total_price} €`
                              : ""}
                          </strong>
                          <span>
                            {submission.items
                              .map((it) => it.garment_type)
                              .slice(0, 3)
                              .join(", ")}
                            {submission.items.length > 3 ? "..." : ""}
                          </span>
                        </>
                      ) : (
                        <>
                          <strong>{submission.garment_type}</strong>
                          <span>{submission.work_type}</span>
                        </>
                      )}
                    </td>
                    <td>
                      {submission.zone}
                      <span>{submission.drop_off_point}</span>
                    </td>
                    <td>{formatDate(submission.created_at)}</td>
                    <td>
                      <span
                        className={`status-badge status-${submission.status ?? "pending"}`}
                      >
                        {STATUS_LABELS[submission.status ?? "pending"]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {selected && (
        <div
          className="admin-modal-backdrop"
          role="presentation"
          onClick={() => setSelected(null)}
        >
          <aside
            className="admin-detail-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Détail de la demande"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="admin-detail-close"
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Fermer"
            >
              ×
            </button>
            <span className="admin-eyebrow">Détail de la demande</span>
            <h2>{selected.full_name}</h2>
            <p className="admin-detail-date">
              {formatDate(selected.created_at)}
            </p>
            <label className="admin-status-control">
              Statut
              <select
                value={selected.status ?? "pending"}
                disabled={savingStatus}
                onChange={(event) =>
                  void handleStatusChange(
                    event.target.value as SubmissionStatus,
                  )
                }
              >
                {(Object.keys(STATUS_LABELS) as SubmissionStatus[]).map(
                  (status) => (
                    <option key={status} value={status}>
                      {STATUS_LABELS[status]}
                    </option>
                  ),
                )}
              </select>
            </label>
            <dl className="admin-detail-list">
              <div>
                <dt>Email</dt>
                <dd>{selected.email}</dd>
              </div>
              <div>
                <dt>Téléphone</dt>
                <dd>{selected.phone_number}</dd>
              </div>
              {(!selected.items || selected.items.length === 0) && (
                <>
                  <div>
                    <dt>Vêtement</dt>
                    <dd>
                      {selected.garment_type}
                      {selected.garment_type_other
                        ? ` · ${selected.garment_type_other}`
                        : ""}
                    </dd>
                  </div>
                  <div>
                    <dt>Prestation</dt>
                    <dd>{selected.work_type}</dd>
                  </div>
                </>
              )}
              <div>
                <dt>Zone</dt>
                <dd>{selected.zone}</dd>
              </div>
              <div>
                <dt>Point de dépôt</dt>
                <dd>{selected.drop_off_point}</dd>
              </div>
              <div>
                <dt>Taille</dt>
                <dd>{selected.height_cm} cm</dd>
              </div>
              {selected.total_price !== undefined &&
                selected.total_price !== null && (
                  <div>
                    <dt>Montant total</dt>
                    <dd>
                      <strong style={{ color: "var(--color-gold, #b8935a)" }}>
                        {selected.total_price} €
                      </strong>
                    </dd>
                  </div>
                )}
            </dl>

            {selected.items && selected.items.length > 0 && (
              <div style={{ marginTop: "16px", marginBottom: "16px" }}>
                <span
                  className="admin-eyebrow"
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  Détail des pièces ({selected.items.length})
                </span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {selected.items.map((item, idx) => {
                    const gPrice =
                      item.garment_price ??
                      getGarmentPrice(item.garment_type as GarmentType);
                    const wPrice =
                      item.work_price ??
                      getWorkPrice(item.work_type as WorkType);
                    const piecePrice = item.price ?? gPrice + wPrice;

                    return (
                      <div
                        key={item.id || idx}
                        style={{
                          padding: "12px 14px",
                          border: "1px solid rgba(184, 147, 90, 0.2)",
                          borderRadius: "12px",
                          backgroundColor: "#fff",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <strong
                            style={{
                              textTransform: "capitalize",
                              display: "block",
                              fontSize: "14px",
                              color: "#2c2416",
                            }}
                          >
                            #{idx + 1} {item.garment_type}
                            {item.garment_type_other
                              ? ` · ${item.garment_type_other}`
                              : ""}
                          </strong>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#5c4f38",
                              marginTop: "3px",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <span>Produit : {gPrice} €</span>
                            <span>+</span>
                            <span style={{ textTransform: "capitalize" }}>
                              {item.work_type} : {wPrice} €
                            </span>
                          </div>
                          {item.comment && (
                            <span
                              style={{
                                fontSize: "11px",
                                color: "#9c8b72",
                                fontStyle: "italic",
                                display: "block",
                                marginTop: "3px",
                              }}
                            >
                              « {item.comment} »
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            textAlign: "right",
                            marginLeft: "14px",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: "16px",
                              color: "#b8935a",
                            }}
                          >
                            {piecePrice} €
                          </span>
                          <span
                            style={{
                              display: "block",
                              fontSize: "10.5px",
                              color: "#9c8b72",
                            }}
                          >
                            {gPrice}€ + {wPrice}€
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {selected.comment && (
              <div className="admin-comment">
                <span>Commentaire</span>
                <p>{selected.comment}</p>
              </div>
            )}
            <div className="admin-measurements">
              <span>Mesures enregistrées</span>
              <pre>{JSON.stringify(selected.measurements, null, 2)}</pre>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
