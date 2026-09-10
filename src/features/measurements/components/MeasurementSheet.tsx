import { useMemo, useState } from "react";
import type { ExtractionResponse, MeasurementItem } from "../types";

export const SUMMARY_FIELDS = [
  { key: "chest", label: "Poitrine", names: ["chest circumf"] },
  { key: "waist", label: "Taille", names: ["natural waist circumf"] },
  { key: "hips", label: "Hanches", names: ["seat / hip circumf"] },
  { key: "height", label: "Hauteur", names: ["stature"] },
  {
    key: "shoulders",
    label: "Épaules",
    names: ["shoulder breadth", "acromion breadth"],
  },
  {
    key: "sleeve",
    label: "Manche",
    names: ["arm left length", "arm right length"],
  },
] as const;

function findMeasurement(
  measurements: MeasurementItem[],
  names: readonly string[],
) {
  return names
    .map((name) =>
      measurements.find((item) => item.name === name && !item.hidden),
    )
    .find((item): item is MeasurementItem => Boolean(item));
}

export function getSummaryMeasurements(result: ExtractionResponse) {
  return Object.fromEntries(
    SUMMARY_FIELDS.map(({ key, names }) => {
      const item = findMeasurement(result.measurements, names);
      return [key, item?.value_cm ?? null];
    }),
  );
}

function MeasurementCard({
  label,
  item,
  unit,
}: {
  label: string;
  item?: MeasurementItem;
  unit: "cm" | "in";
}) {
  const value = item ? (unit === "cm" ? item.value_cm : item.value_in) : null;
  return (
    <article className="summary-measurement-card">
      <span>{label}</span>
      <strong>{value === null ? "—" : Math.round(value)}</strong>
      <small>{value === null ? "Non disponible" : unit}</small>
    </article>
  );
}

export default function MeasurementSheet({
  result,
}: {
  result: ExtractionResponse;
}) {
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const [copied, setCopied] = useState(false);
  const summary = useMemo(
    () =>
      SUMMARY_FIELDS.map(({ key, label, names }) => ({
        key,
        label,
        item: findMeasurement(result.measurements, names),
      })),
    [result.measurements],
  );

  const copySummary = async () => {
    const lines = summary.map(({ label, item }) => {
      const value = item
        ? unit === "cm"
          ? item.value_cm
          : item.value_in
        : "—";
      return `${label}: ${value} ${unit}`;
    });
    await navigator.clipboard.writeText(`Kadel Kouture\n${lines.join("\n")}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="measurement-sheet">
      <div className="measurement-header">
        <div>
          <span className="step-label">Fiche atelier</span>
          <h2>Mesures essentielles</h2>
        </div>
        <div className="measurement-tools">
          <div className="unit-switch">
            {(["cm", "in"] as const).map((value) => (
              <button
                key={value}
                type="button"
                className={unit === value ? "active" : ""}
                onClick={() => setUnit(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <button
            className="copy-button"
            type="button"
            onClick={() => void copySummary()}
          >
            {copied ? "Copié" : "Copier"}
          </button>
        </div>
      </div>
      <div className="summary-measurement-grid">
        {summary.map(({ key, label, item }) => (
          <MeasurementCard key={key} label={label} item={item} unit={unit} />
        ))}
      </div>
      <p className="measurement-footnote">
        Résultats filtrés du modèle 3D · Référence{" "}
        {result.request_id.slice(0, 8)}
      </p>
    </section>
  );
}
