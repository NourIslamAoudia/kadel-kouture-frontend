"use client";

import { useEffect, useState } from "react";
import { ServicePointsError, servicePointsApi } from "../api";
import type { ServicePointDto, ServicePointSearch } from "../types";

export type ServicePointsFailure = "ADDRESS_NOT_FOUND" | "GENERIC";

interface Result {
  key: string;
  points: ServicePointDto[];
  failure: ServicePointsFailure | null;
}

/**
 * Points relais Sendcloud pour la recherche lancée par le client (adresse ou position).
 * Rien n'est chargé tant qu'aucune recherche n'est lancée ; une nouvelle recherche annule la précédente.
 */
export function useServicePoints(search: ServicePointSearch | null) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result | null>(null);

  const key = search ? `${JSON.stringify(search)}#${attempt}` : null;

  useEffect(() => {
    if (!search || !key) return;
    const controller = new AbortController();
    servicePointsApi
      .search(search, controller.signal)
      .then((points) => setResult({ key, points, failure: null }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setResult({
          key,
          points: [],
          failure:
            error instanceof ServicePointsError &&
            error.code === "ADDRESS_NOT_FOUND"
              ? "ADDRESS_NOT_FOUND"
              : "GENERIC",
        });
      });
    return () => controller.abort();
    // La clé résume la recherche et la tentative : l'objet lui-même peut changer à chaque rendu.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const current = key && result?.key === key ? result : null;

  return {
    loading: Boolean(key) && !current,
    /** Vrai quand la recherche en cours a abouti (avec ou sans résultat). */
    settled: Boolean(current) && !current?.failure,
    failure: current?.failure ?? null,
    points: current?.points ?? [],
    retry: () => setAttempt((value) => value + 1),
  };
}
