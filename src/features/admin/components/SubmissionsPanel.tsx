"use client";

import { useMemo, useState } from "react";
import { fr } from "@features/submission/i18n/fr";
import {
  MeasureIcon,
  type MeasureKey,
} from "@features/submission/components/StepIcons";
import type { GarmentType, WorkType } from "@features/submission/types";
import { getGarmentPrice, getWorkPrice } from "../../../common/pricing";
import { adminApi } from "../api";
import type { AdminList } from "../hooks/useAdminList";
import type { AdminSubmission, SubmissionStatus } from "../types";
import {
  CopyButton,
  Drawer,
  EmptyState,
  LoadMore,
  PanelHeading,
  formatDate,
  timeAgo,
} from "./ui";

export const SUBMISSION_STATUS_LABELS: Record<SubmissionStatus, string> = {
  pending: "En attente",
  in_progress: "En cours",
  completed: "Terminée",
  cancelled: "Annulée",
};

const STATUSES = Object.keys(SUBMISSION_STATUS_LABELS) as SubmissionStatus[];

const MEASURES: MeasureKey[] = [
  "chest",
  "waist",
  "hips",
  "height",
  "shoulders",
  "sleeve",
];

const garmentLabel = (type: string, other?: string | null) =>
  (fr.garments[type as GarmentType] ?? type) + (other ? ` · ${other}` : "");
const workLabel = (type: string) =>
  fr.works[type as WorkType]?.label ?? type;
const price = (amount: number) => `${amount} €`;

export function SubmissionsPanel({
  list,
}: {
  list: AdminList<AdminSubmission, SubmissionStatus>;
}) {
  const [selected, setSelected] = useState<AdminSubmission | null>(null);
  const [filter, setFilter] = useState<"all" | SubmissionStatus>("all");
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return list.items.filter(
      (submission) =>
        (filter === "all" || (submission.status ?? "pending") === filter) &&
        (!query ||
          [
            submission.full_name,
            submission.email,
            submission.phone_number,
            submission.zone,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query)),
    );
  }, [filter, search, list.items]);

  const changeStatus = async (status: SubmissionStatus) => {
    if (!selected || selected.status === status) return;
    setSaving(true);
    list.setError(null);
    try {
      const updated = await adminApi.updateSubmissionStatus(
        selected.id,
        status,
      );
      list.replace(updated);
      setSelected(updated);
    } catch (reason) {
      list.setError(
        reason instanceof Error
          ? reason.message
          : "Impossible de modifier le statut.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PanelHeading
        eyebrow="Commandes"
        title="Demandes *clients*"
        text="Chaque commande passée depuis le formulaire, de la réception à la remise."
        stats={[
          { label: "En attente", value: list.totals.pending ?? 0 },
          { label: "En cours", value: list.totals.in_progress ?? 0 },
          { label: "Au total", value: list.count },
        ]}
      />

      <section className="admin-toolbar" aria-label="Filtrer les commandes">
        <input
          type="search"
          placeholder="Rechercher un client, un email, une zone…"
          aria-label="Rechercher une commande"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="admin-chips" role="group" aria-label="Statut">
          <button
            type="button"
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            Toutes
          </button>
          {STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              aria-pressed={filter === status}
              onClick={() => setFilter(status)}
            >
              {SUBMISSION_STATUS_LABELS[status]}
              <span>{list.totals[status] ?? 0}</span>
            </button>
          ))}
        </div>
      </section>

      {list.error && (
        <p className="admin-form-error admin-page-error" role="alert">
          {list.error}
        </p>
      )}
      {list.loading && (
        <p className="admin-loading">Chargement des commandes…</p>
      )}
      {!list.loading && !list.error && visible.length === 0 && (
        <EmptyState
          title={
            list.items.length ? "Aucun résultat" : "Pas encore de commande"
          }
          text={
            list.items.length
              ? "Aucune commande ne correspond à ces filtres."
              : "Les commandes passées sur /commander apparaîtront ici."
          }
        />
      )}

      {!list.loading && visible.length > 0 && (
        <section className="admin-submissions" aria-label="Commandes">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Demande</th>
                  <th>Zone</th>
                  <th>Reçue</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((submission) => {
                  const items = submission.items ?? [];
                  const status = submission.status ?? "pending";
                  return (
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
                        {items.length > 0 ? (
                          <>
                            <strong>
                              {fr.nav.pieces(items.length)}
                              {submission.total_price
                                ? ` · ${price(submission.total_price)}`
                                : ""}
                            </strong>
                            <span>
                              {items
                                .slice(0, 3)
                                .map((item) => garmentLabel(item.garment_type))
                                .join(", ")}
                              {items.length > 3 ? "…" : ""}
                            </span>
                          </>
                        ) : (
                          <>
                            <strong>
                              {garmentLabel(submission.garment_type)}
                            </strong>
                            <span>{workLabel(submission.work_type)}</span>
                          </>
                        )}
                      </td>
                      <td>
                        {submission.zone}
                        <span>{submission.drop_off_point}</span>
                      </td>
                      <td>
                        {formatDate(submission.created_at, false)}
                        <span>{timeAgo(submission.created_at)}</span>
                      </td>
                      <td>
                        <span className={`status-badge status-${status}`}>
                          {SUBMISSION_STATUS_LABELS[status]}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {list.hasMore && (
            <LoadMore
              shown={list.items.length}
              total={list.count}
              loading={list.loadingMore}
              onClick={() => void list.loadMore()}
            />
          )}
        </section>
      )}

      {selected && (
        <Drawer
          label="Détail de la commande"
          onClose={() => setSelected(null)}
        >
          <SubmissionDetail
            submission={selected}
            saving={saving}
            onStatusChange={(status) => void changeStatus(status)}
          />
        </Drawer>
      )}
    </>
  );
}

function SubmissionDetail({
  submission,
  saving,
  onStatusChange,
}: {
  submission: AdminSubmission;
  saving: boolean;
  onStatusChange: (status: SubmissionStatus) => void;
}) {
  const items = submission.items ?? [];
  const measures = submission.measurements ?? {};
  const hasMeasures = MEASURES.some((key) => Number(measures[key]) > 0);

  return (
    <>
      <span className="admin-eyebrow">Commande</span>
      <h2>{submission.full_name}</h2>
      <p className="admin-detail-date">
        Reçue le {formatDate(submission.created_at)}
      </p>

      <label className="admin-status-control">
        Statut
        <select
          value={submission.status ?? "pending"}
          disabled={saving}
          onChange={(event) =>
            onStatusChange(event.target.value as SubmissionStatus)
          }
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {SUBMISSION_STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </label>

      <dl className="admin-detail-list">
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${submission.email}`}>{submission.email}</a>
          </dd>
        </div>
        <div>
          <dt>Téléphone</dt>
          <dd className="admin-inline-actions">
            <a href={`tel:${submission.phone_number.replace(/\s/g, "")}`}>
              {submission.phone_number}
            </a>
            <CopyButton value={submission.phone_number} label="Copier" />
          </dd>
        </div>
        <div>
          <dt>Zone</dt>
          <dd>{submission.zone}</dd>
        </div>
        <div>
          <dt>Point de dépôt</dt>
          <dd>{submission.drop_off_point}</dd>
        </div>
        {submission.total_price != null && (
          <div>
            <dt>Montant estimé</dt>
            <dd className="admin-amount">{price(submission.total_price)}</dd>
          </div>
        )}
      </dl>

      {items.length > 0 ? (
        <section className="admin-block">
          <span className="admin-block-title">
            Pièces ({items.length})
          </span>
          <ol className="admin-items">
            {items.map((item, index) => {
              const garmentPrice =
                item.garment_price ?? getGarmentPrice(item.garment_type);
              const workPrice =
                item.work_price ?? getWorkPrice(item.work_type);
              return (
                <li key={item.id || index}>
                  <div>
                    <strong>
                      <span className="admin-item-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {garmentLabel(item.garment_type, item.garment_type_other)}
                    </strong>
                    <span>
                      {workLabel(item.work_type)} · {price(garmentPrice)} +{" "}
                      {price(workPrice)}
                    </span>
                    {item.comment && <q>{item.comment}</q>}
                  </div>
                  <b>{price(item.price ?? garmentPrice + workPrice)}</b>
                </li>
              );
            })}
          </ol>
        </section>
      ) : (
        <dl className="admin-detail-list">
          <div>
            <dt>Vêtement</dt>
            <dd>
              {garmentLabel(
                submission.garment_type,
                submission.garment_type_other,
              )}
            </dd>
          </div>
          <div>
            <dt>Prestation</dt>
            <dd>{workLabel(submission.work_type)}</dd>
          </div>
        </dl>
      )}

      {submission.comment && (
        <section className="admin-block">
          <span className="admin-block-title">Commentaire du client</span>
          <p className="admin-quote">{submission.comment}</p>
        </section>
      )}

      <section className="admin-block">
        <span className="admin-block-title">Mesures (cm)</span>
        {hasMeasures ? (
          <ul className="admin-measures">
            {MEASURES.map((key) => {
              const value = Number(measures[key]);
              return (
                <li key={key}>
                  <MeasureIcon type={key}className="h-9 w-9" />
                  <span>{fr.measures.fields[key]}</span>
                  <strong>{value > 0 ? Math.round(value) : "—"}</strong>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="admin-muted">Aucune mesure enregistrée.</p>
        )}
        <details className="admin-raw">
          <summary>Données brutes</summary>
          <pre>{JSON.stringify(measures, null, 2)}</pre>
        </details>
      </section>
    </>
  );
}
