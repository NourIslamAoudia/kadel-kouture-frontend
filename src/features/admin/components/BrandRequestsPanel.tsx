"use client";

import { useMemo, useState } from "react";
import { adminApi } from "../api";
import type { AdminList } from "../hooks/useAdminList";
import type { BrandRequest, BrandRequestStatus } from "../types";
import {
  CopyButton,
  Drawer,
  EmptyState,
  LoadMore,
  PanelHeading,
  formatDate,
  timeAgo,
} from "./ui";

export const BRAND_STATUS_LABELS: Record<BrandRequestStatus, string> = {
  new: "Nouvelle",
  contacted: "Contactée",
  closed: "Clôturée",
};

/** Mêmes teintes que les statuts des commandes. */
const BADGE: Record<BrandRequestStatus, string> = {
  new: "status-pending",
  contacted: "status-in_progress",
  closed: "status-completed",
};

const STATUSES = Object.keys(BRAND_STATUS_LABELS) as BrandRequestStatus[];

export function BrandRequestsPanel({
  list,
}: {
  list: AdminList<BrandRequest, BrandRequestStatus>;
}) {
  const [selected, setSelected] = useState<BrandRequest | null>(null);
  const [filter, setFilter] = useState<"all" | BrandRequestStatus>("all");
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return list.items.filter(
      (request) =>
        (filter === "all" || request.status === filter) &&
        (!query ||
          [request.brand, request.full_name, request.email, request.need]
            .join(" ")
            .toLowerCase()
            .includes(query)),
    );
  }, [filter, search, list.items]);

  const changeStatus = async (status: BrandRequestStatus) => {
    if (!selected || selected.status === status) return;
    setSaving(true);
    list.setError(null);
    try {
      const updated = await adminApi.updateBrandRequestStatus(
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
        eyebrow="Marques"
        title="Demandes des *marques*"
        text="Collaborations, séries et upcycling de stock demandés depuis la section professionnelle."
        stats={[
          { label: "Nouvelles", value: list.totals.new ?? 0 },
          { label: "Contactées", value: list.totals.contacted ?? 0 },
          { label: "Au total", value: list.count },
        ]}
      />

      <section className="admin-toolbar" aria-label="Filtrer les demandes">
        <input
          type="search"
          placeholder="Rechercher une marque, un nom, un besoin…"
          aria-label="Rechercher une demande"
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
              {BRAND_STATUS_LABELS[status]}
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
        <p className="admin-loading">Chargement des demandes…</p>
      )}
      {!list.loading && !list.error && visible.length === 0 && (
        <EmptyState
          title={
            list.items.length ? "Aucun résultat" : "Pas encore de demande"
          }
          text={
            list.items.length
              ? "Aucune demande ne correspond à ces filtres."
              : "Les demandes envoyées depuis la section « Marques » apparaîtront ici."
          }
        />
      )}

      {!list.loading && visible.length > 0 && (
        <section className="admin-submissions" aria-label="Demandes des marques">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Marque</th>
                  <th>Besoin</th>
                  <th>Reçue</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((request) => (
                  <tr
                    key={request.id}
                    tabIndex={0}
                    onClick={() => setSelected(request)}
                    onKeyDown={(event) =>
                      event.key === "Enter" && setSelected(request)
                    }
                  >
                    <td>
                      <strong>{request.brand}</strong>
                      <span>
                        {request.full_name} · {request.email}
                      </span>
                    </td>
                    <td className="admin-cell-text">
                      <p>{request.need}</p>
                    </td>
                    <td>
                      {formatDate(request.created_at, false)}
                      <span>{timeAgo(request.created_at)}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${BADGE[request.status]}`}>
                        {BRAND_STATUS_LABELS[request.status]}
                      </span>
                    </td>
                  </tr>
                ))}
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
          label="Détail de la demande"
          onClose={() => setSelected(null)}
        >
          <span className="admin-eyebrow">Demande de marque</span>
          <h2>{selected.brand}</h2>
          <p className="admin-detail-date">
            Reçue le {formatDate(selected.created_at)}
          </p>

          <label className="admin-status-control">
            Statut
            <select
              value={selected.status}
              disabled={saving}
              onChange={(event) =>
                void changeStatus(event.target.value as BrandRequestStatus)
              }
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {BRAND_STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </label>

          <dl className="admin-detail-list">
            <div>
              <dt>Contact</dt>
              <dd>{selected.full_name}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd className="admin-inline-actions">
                <a href={`mailto:${selected.email}`}>{selected.email}</a>
                <CopyButton value={selected.email} label="Copier" />
              </dd>
            </div>
          </dl>

          <section className="admin-block">
            <span className="admin-block-title">Besoin exprimé</span>
            <p className="admin-quote">{selected.need}</p>
          </section>

          <a
            className="admin-primary-button"
            href={`mailto:${selected.email}?subject=${encodeURIComponent(
              `Kadel Kouture × ${selected.brand}`,
            )}`}
            onClick={() =>
              selected.status === "new" && void changeStatus("contacted")
            }
          >
            Répondre par email
          </a>
          <p className="admin-footnote">
            La demande passe en « Contactée » quand vous répondez d&apos;ici.
          </p>
        </Drawer>
      )}
    </>
  );
}
