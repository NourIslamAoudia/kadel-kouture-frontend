"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AdminApiError } from "../api";
import type { ListResponse } from "../types";

/**
 * Liste admin paginée (commandes, contacts, marques).
 * `keyOf` donne le statut ou le type d'une ligne : les compteurs `totals`
 * restent justes après une modification ou une suppression, sans recharger.
 */
export function useAdminList<T extends { id: string }, K extends string>(
  load: (offset: number) => Promise<ListResponse<T, K>>,
  keyOf: (item: T) => K,
  { enabled, onUnauthorized }: { enabled: boolean; onUnauthorized: () => void },
) {
  const [items, setItems] = useState<T[]>([]);
  const [count, setCount] = useState(0);
  const [totals, setTotals] = useState<Partial<Record<K, number>>>({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unauthorized = useRef(onUnauthorized);
  const keyRef = useRef(keyOf);
  useEffect(() => {
    unauthorized.current = onUnauthorized;
    keyRef.current = keyOf;
  });

  const fail = useCallback((reason: unknown) => {
    if (reason instanceof AdminApiError && reason.status === 401) {
      unauthorized.current();
      return;
    }
    setError(
      reason instanceof Error ? reason.message : "Erreur de chargement.",
    );
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    load(0)
      .then((result) => {
        if (!active) return;
        setItems(result.data);
        setCount(result.count);
        setTotals(result.totals ?? {});
      })
      .catch((reason: unknown) => active && fail(reason))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [enabled, load, fail]);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const result = await load(items.length);
      setItems((current) => [...current, ...result.data]);
      setCount(result.count);
    } catch (reason) {
      fail(reason);
    } finally {
      setLoadingMore(false);
    }
  };

  const shift = (key: K, delta: number) =>
    setTotals((current) => ({
      ...current,
      [key]: Math.max((current[key] ?? 0) + delta, 0),
    }));

  /** Remplace une ligne modifiée (nouveau statut…). */
  const replace = (updated: T) => {
    const previous = items.find((item) => item.id === updated.id);
    setItems((current) =>
      current.map((item) => (item.id === updated.id ? updated : item)),
    );
    if (previous && keyRef.current(previous) !== keyRef.current(updated)) {
      shift(keyRef.current(previous), -1);
      shift(keyRef.current(updated), 1);
    }
  };

  /** Retire une ligne supprimée. */
  const remove = (id: string) => {
    const previous = items.find((item) => item.id === id);
    setItems((current) => current.filter((item) => item.id !== id));
    setCount((current) => Math.max(current - 1, 0));
    if (previous) shift(keyRef.current(previous), -1);
  };

  return {
    items,
    count,
    totals,
    loading,
    loadingMore,
    hasMore: items.length < count,
    error,
    setError,
    loadMore,
    replace,
    remove,
  };
}

export type AdminList<T extends { id: string }, K extends string> = ReturnType<
  typeof useAdminList<T, K>
>;
