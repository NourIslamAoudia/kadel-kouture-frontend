"use client";

import { useEffect, useMemo, useState } from "react";
import { LOCALE_LABELS } from "@features/landing/i18n/locales";
import { adminApi } from "../api";
import type { AdminList } from "../hooks/useAdminList";
import type { Lead, LeadKind } from "../types";
import {
  CopyButton,
  EmptyState,
  LoadMore,
  PanelHeading,
  contactHref,
  downloadCsv,
  formatDate,
  timeAgo,
} from "./ui";

export const LEAD_KIND_LABELS: Record<LeadKind, string> = {
  guide: "Guide gratuit",
  workshop: "Atelier partenaire",
};

const KINDS = Object.keys(LEAD_KIND_LABELS) as LeadKind[];
const CHANNEL_LABELS = { email: "Email", whatsapp: "WhatsApp" } as const;

export function LeadsPanel({ list }: { list: AdminList<Lead, LeadKind> }) {
  const [filter, setFilter] = useState<"all" | LeadKind>("all");
  const [search, setSearch] = useState("");
  const [confirming, setConfirming] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // La demande de confirmation disparaît d'elle-même après 4 s.
  useEffect(() => {
    if (!confirming) return;
    const timer = setTimeout(() => setConfirming(null), 4000);
    return () => clearTimeout(timer);
  }, [confirming]);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return list.items.filter(
      (lead) =>
        (filter === "all" || lead.kind === filter) &&
        (!query || lead.contact.toLowerCase().includes(query)),
    );
  }, [filter, search, list.items]);

  const remove = async (lead: Lead) => {
    if (confirming !== lead.id) {
      setConfirming(lead.id);
      return;
    }
    setDeleting(lead.id);
    list.setError(null);
    try {
      await adminApi.deleteLead(lead.id);
      list.remove(lead.id);
    } catch (reason) {
      list.setError(
        reason instanceof Error
          ? reason.message
          : "Impossible de supprimer ce contact.",
      );
    } finally {
      setDeleting(null);
      setConfirming(null);
    }
  };

  const exportCsv = () =>
    downloadCsv(`kadel-contacts-${new Date().toISOString().slice(0, 10)}.csv`, [
      ["Type", "Canal", "Contact", "Langue", "Date", "Consentement"],
      ...visible.map((lead) => [
        LEAD_KIND_LABELS[lead.kind],
        CHANNEL_LABELS[lead.channel],
        lead.contact,
        lead.locale.toUpperCase(),
        formatDate(lead.created_at),
        formatDate(lead.consent_at),
      ]),
    ]);

  return (
    <>
      <PanelHeading
        eyebrow="Contacts"
        title="Contacts de la *landing*"
        text="Visiteurs qui ont demandé le guide gratuit et ateliers qui veulent être prévenus."
        stats={[
          { label: "Guide gratuit", value: list.totals.guide ?? 0 },
          { label: "Ateliers", value: list.totals.workshop ?? 0 },
          { label: "Au total", value: list.count },
        ]}
      />

      <section className="admin-toolbar" aria-label="Filtrer les contacts">
        <input
          type="search"
          placeholder="Rechercher un email ou un numéro…"
          aria-label="Rechercher un contact"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="admin-chips" role="group" aria-label="Type">
          <button
            type="button"
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            Tous
          </button>
          {KINDS.map((kind) => (
            <button
              key={kind}
              type="button"
              aria-pressed={filter === kind}
              onClick={() => setFilter(kind)}
            >
              {LEAD_KIND_LABELS[kind]}
              <span>{list.totals[kind] ?? 0}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="admin-outline-button"
          onClick={exportCsv}
          disabled={visible.length === 0}
        >
          Exporter CSV
        </button>
      </section>

      {list.error && (
        <p className="admin-form-error admin-page-error" role="alert">
          {list.error}
        </p>
      )}
      {list.loading && <p className="admin-loading">Chargement des contacts…</p>}
      {!list.loading && !list.error && visible.length === 0 && (
        <EmptyState
          title={list.items.length ? "Aucun résultat" : "Pas encore de contact"}
          text={
            list.items.length
              ? "Aucun contact ne correspond à ces filtres."
              : "Les inscriptions au guide gratuit et à la liste des ateliers apparaîtront ici."
          }
        />
      )}

      {!list.loading && visible.length > 0 && (
        <section className="admin-submissions" aria-label="Contacts">
          <div className="admin-table-wrap">
            <table className="admin-table admin-table-static">
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Demande</th>
                  <th>Langue</th>
                  <th>Reçu</th>
                  <th>
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <strong className="admin-contact">
                        <ChannelIcon channel={lead.channel} />
                        {lead.contact}
                      </strong>
                      <span>{CHANNEL_LABELS[lead.channel]}</span>
                    </td>
                    <td>
                      <span className={`admin-tag admin-tag-${lead.kind}`}>
                        {LEAD_KIND_LABELS[lead.kind]}
                      </span>
                    </td>
                    <td>
                      <abbr title={LOCALE_LABELS[lead.locale]}>
                        {lead.locale.toUpperCase()}
                      </abbr>
                    </td>
                    <td>
                      {formatDate(lead.created_at, false)}
                      <span>{timeAgo(lead.created_at)}</span>
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <a
                          className="admin-ghost-button"
                          href={contactHref(lead.channel, lead.contact)}
                          target={
                            lead.channel === "whatsapp" ? "_blank" : undefined
                          }
                          rel="noreferrer"
                        >
                          Écrire
                        </a>
                        <CopyButton value={lead.contact} label="Copier" />
                        <button
                          type="button"
                          className="admin-ghost-button admin-danger"
                          disabled={deleting === lead.id}
                          aria-label={
                            confirming === lead.id
                              ? `Confirmer la suppression de ${lead.contact}`
                              : `Supprimer ${lead.contact}`
                          }
                          onClick={() => void remove(lead)}
                        >
                          {confirming === lead.id ? "Confirmer ?" : "Supprimer"}
                        </button>
                      </div>
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
          <p className="admin-footnote">
            Chaque contact a donné son consentement à la date indiquée dans
            l&apos;export. Supprimez-le dès qu&apos;une personne demande
            l&apos;effacement de ses données.
          </p>
        </section>
      )}
    </>
  );
}

function ChannelIcon({ channel }: { channel: Lead["channel"] }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      {channel === "email" ? (
        <>
          <rect x="1.5" y="3.5" width="13" height="9" />
          <path d="m1.5 4 6.5 5 6.5-5" />
        </>
      ) : (
        <path d="M8 1.8a6.2 6.2 0 0 0-5.3 9.4L1.8 14.2l3.1-.9A6.2 6.2 0 1 0 8 1.8Z" />
      )}
    </svg>
  );
}
