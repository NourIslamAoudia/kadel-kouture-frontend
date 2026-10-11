"use client";

import { useState } from "react";

export type GeolocationFailure =
  | "denied"
  | "unavailable"
  | "timeout"
  | "unsupported";

export type Coordinates = { latitude: number; longitude: number };

/** 3 décimales (~100 m) : assez pour trouver les points relais proches, sans position exacte. */
const round3 = (value: number) => Math.round(value * 1000) / 1000;

/**
 * Position du client, demandée uniquement quand il clique sur « Utiliser ma position ».
 * Elle n'est pas conservée ici : `locate` la renvoie (arrondie) pour lancer une recherche, rien de plus.
 */
export function useGeolocation() {
  const [locating, setLocating] = useState(false);
  const [failure, setFailure] = useState<GeolocationFailure | null>(null);

  const locate = () =>
    new Promise<Coordinates | null>((resolve) => {
      setFailure(null);
      if (
        typeof window === "undefined" ||
        !window.isSecureContext ||
        !("geolocation" in navigator)
      ) {
        setFailure("unsupported");
        resolve(null);
        return;
      }

      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocating(false);
          resolve({
            latitude: round3(position.coords.latitude),
            longitude: round3(position.coords.longitude),
          });
        },
        (error) => {
          setLocating(false);
          setFailure(
            error.code === error.PERMISSION_DENIED
              ? "denied"
              : error.code === error.TIMEOUT
                ? "timeout"
                : "unavailable",
          );
          resolve(null);
        },
        { timeout: 10000, enableHighAccuracy: false, maximumAge: 60000 },
      );
    });

  return { locate, locating, failure, clearFailure: () => setFailure(null) };
}
