"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wordmark } from "@features/landing/art/Brand";
import { useAuth } from "@features/auth/context/AuthContext";
import { adminApi } from "../api";
import { useAdminList } from "../hooks/useAdminList";
import { BrandRequestsPanel } from "./BrandRequestsPanel";
import { LeadsPanel } from "./LeadsPanel";
import { SubmissionsPanel } from "./SubmissionsPanel";

const TABS = [
  { id: "commandes", label: "Commandes" },
  { id: "contacts", label: "Contacts" },
  { id: "marques", label: "Marques" },
] as const;

type Tab = (typeof TABS)[number]["id"];

function isAdmin(user: { role: string; is_admin?: boolean }) {
  return user.role === "admin" || user.is_admin === true;
}

/** L'onglet ouvert est gardé dans l'URL (#contacts…) : un rechargement y revient. */
function tabFromHash(): Tab {
  if (typeof window === "undefined") return "commandes";
  const hash = window.location.hash.slice(1);
  return TABS.some((tab) => tab.id === hash) ? (hash as Tab) : "commandes";
}

export default function AdminPage() {
  const router = useRouter();
  const { user, ready, logout } = useAuth();
  const [tab, setTab] = useState<Tab>(tabFromHash);

  const allowed = Boolean(user && isAdmin(user));
  const expire = useCallback(() => {
    logout();
    router.replace("/admin/login");
  }, [logout, router]);
  const options = { enabled: allowed, onUnauthorized: expire };

  const submissions = useAdminList(
    adminApi.submissions,
    (item) => item.status ?? "pending",
    options,
  );
  const leads = useAdminList(adminApi.leads, (item) => item.kind, options);
  const brands = useAdminList(
    adminApi.brandRequests,
    (item) => item.status,
    options,
  );

  const redirectTo = !ready ? null : !user ? "/admin/login" : !allowed ? "/" : null;
  useEffect(() => {
    if (redirectTo) router.replace(redirectTo);
  }, [redirectTo, router]);

  if (!ready || !user || !allowed) return null;

  // Pastille de chaque onglet : ce qui attend une action.
  const badges: Record<Tab, number> = {
    commandes: submissions.totals.pending ?? 0,
    contacts: leads.count,
    marques: brands.totals.new ?? 0,
  };

  const openTab = (next: Tab) => {
    setTab(next);
    window.history.replaceState(null, "", `#${next}`);
  };

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div className="admin-brand" aria-label="Kadel Kouture">
          <Wordmark />
        </div>
        <div className="admin-user-area">
          <span>{user.name || user.email}</span>
          <button type="button" onClick={expire}>
            Déconnexion
          </button>
        </div>
      </header>

      <nav className="admin-tabs" aria-label="Sections de l'administration">
        <div role="tablist">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              id={`tab-${id}`}
              type="button"
              role="tab"
              aria-selected={tab === id}
              aria-controls={`panel-${id}`}
              onClick={() => openTab(id)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowRight" && event.key !== "ArrowLeft")
                  return;
                const index = TABS.findIndex((item) => item.id === id);
                const step = event.key === "ArrowRight" ? 1 : -1;
                const next = TABS[(index + step + TABS.length) % TABS.length].id;
                openTab(next);
                document.getElementById(`tab-${next}`)?.focus();
              }}
              tabIndex={tab === id ? 0 : -1}
            >
              {label}
              {badges[id] > 0 && <span>{badges[id]}</span>}
            </button>
          ))}
        </div>
      </nav>

      <div
        id={`panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
      >
        {tab === "commandes" && <SubmissionsPanel list={submissions} />}
        {tab === "contacts" && <LeadsPanel list={leads} />}
        {tab === "marques" && <BrandRequestsPanel list={brands} />}
      </div>
    </main>
  );
}
