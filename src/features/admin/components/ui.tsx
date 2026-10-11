"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Éléments communs aux trois onglets de l'admin. */

export function formatDate(value: string | null, withTime = true) {
  if (!value) return "Date inconnue";
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    ...(withTime ? { timeStyle: "short" } : {}),
  }).format(new Date(value));
}

/** « il y a 3 j » : plus rapide à lire qu'une date pour trier ce qui presse. */
export function timeAgo(value: string | null) {
  if (!value) return "";
  const minutes = Math.round((Date.now() - new Date(value).getTime()) / 60000);
  const format = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });
  if (minutes < 60) return format.format(-minutes, "minute");
  if (minutes < 60 * 24) return format.format(-Math.round(minutes / 60), "hour");
  return format.format(-Math.round(minutes / 1440), "day");
}

/** Titre de section : les mots entre *astérisques* passent en italique. */
export function PanelHeading({
  eyebrow,
  title,
  text,
  stats,
}: {
  eyebrow: string;
  title: string;
  text: string;
  stats: { label: string; value: number }[];
}) {
  return (
    <section className="admin-dashboard-heading">
      <div>
        <span className="admin-eyebrow">{eyebrow}</span>
        <h1>
          {title.split("*").map((part, index) =>
            index % 2 ? <em key={index}>{part}</em> : part,
          )}
        </h1>
        <p>{text}</p>
      </div>
      <dl className="admin-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="admin-empty">
      <svg
        viewBox="0 0 48 48"
        width="44"
        height="44"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        aria-hidden="true"
      >
        <path d="M24 6 42 24 24 42 6 24Z" />
        <path d="M24 14 34 24 24 34 14 24Z" strokeDasharray="2 3" />
      </svg>
      <p className="admin-empty-title">{title}</p>
      <p>{text}</p>
    </div>
  );
}

export function LoadMore({
  shown,
  total,
  loading,
  onClick,
}: {
  shown: number;
  total: number;
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <div className="admin-load-more">
      <span>
        {shown} sur {total}
      </span>
      <button type="button" onClick={onClick} disabled={loading}>
        {loading ? "Chargement…" : "Afficher plus"}
      </button>
    </div>
  );
}

/** Panneau latéral de détail : se ferme avec Échap, un clic à côté ou la croix. */
export function Drawer({
  label,
  onClose,
  children,
}: {
  label: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="admin-modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <aside
        className="admin-detail-panel"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="admin-detail-close"
          type="button"
          onClick={onClose}
          aria-label="Fermer"
        >
          <svg
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            aria-hidden="true"
          >
            <path d="m3 3 10 10M13 3 3 13" />
          </svg>
        </button>
        {children}
      </aside>
    </div>
  );
}

/** Bouton « Copier » discret : confirme pendant 1,5 s. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="admin-ghost-button"
      aria-label={`${label} : ${value}`}
      onClick={async (event) => {
        event.stopPropagation();
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // presse-papiers refusé : rien à faire, la valeur reste sélectionnable
        }
      }}
    >
      {copied ? "Copié" : "Copier"}
    </button>
  );
}

/** Télécharge un CSV lisible par Excel (séparateur ; et BOM UTF-8). */
export function downloadCsv(filename: string, rows: string[][]) {
  const escape = (cell: string) => `"${cell.replace(/"/g, '""')}"`;
  const content = rows.map((row) => row.map(escape).join(";")).join("\r\n");
  const blob = new Blob(["﻿", content], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = Object.assign(document.createElement("a"), {
    href: url,
    download: filename,
  });
  link.click();
  URL.revokeObjectURL(url);
}

/** Lien direct pour répondre : email ou conversation WhatsApp. */
export function contactHref(channel: "email" | "whatsapp", value: string) {
  return channel === "email"
    ? `mailto:${value}`
    : `https://wa.me/${value.replace(/[^\d]/g, "")}`;
}
