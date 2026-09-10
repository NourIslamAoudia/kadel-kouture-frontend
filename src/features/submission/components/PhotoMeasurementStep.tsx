import { useState } from "react";
import PhotoUpload, {
  type Shot,
  type ShotId,
} from "@features/measurements/components/PhotoUpload";
import MeasurementSheet from "@features/measurements/components/MeasurementSheet";
import { extractMeasurements } from "@features/measurements/api";
import type { ExtractionResponse, Gender } from "@features/measurements/types";

interface Props {
  result: ExtractionResponse | null;
  onResult: (result: ExtractionResponse) => void;
}

export default function PhotoMeasurementStep({ result, onResult }: Props) {
  const [heightCm, setHeightCm] = useState("170");
  const [gender, setGender] = useState<Gender>("neutral");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runExtraction = async (shots: Record<ShotId, Shot>) => {
    const height = Number(heightCm);
    if (!Number.isFinite(height) || height < 100 || height > 230) {
      setError("La taille doit être comprise entre 100 et 230 cm.");
      return;
    }
    setProcessing(true);
    setError(null);
    try {
      const response = await extractMeasurements({
        heightMm: height * 10,
        gender,
        frontImage: shots.front.blob,
        sideImage: shots.side.blob,
        useDemoMesh: false,
      });
      onResult(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors du calcul des mesures",
      );
    } finally {
      setProcessing(false);
    }
  };

  if (result) {
    return (
      <div className="space-y-5">
        <MeasurementSheet result={result} />
      </div>
    );
  }

  if (processing) {
    return (
      <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
        <p className="font-serif text-2xl text-ink">Analyse en cours…</p>
        <p className="mt-2 text-sm text-ink-3">
          Le moteur calcule vos mesures et prépare le modèle 3D.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
          <span className="h-px w-[18px] bg-gold" />
          Photo 3D
        </p>
        <h2 className="font-serif text-3xl font-light leading-tight text-ink">
          Vos mesures, <em className="italic text-gold">automatiquement</em>
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-3">
          Ajoutez une photo de face et une photo de profil. Le moteur retournera
          vos mesures et un modèle 3D.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="text-xs text-ink-3">
          Taille (cm)
          <input
            type="number"
            min="100"
            max="230"
            step="1"
            value={heightCm}
            onChange={(event) => setHeightCm(event.target.value)}
            className="mt-1 w-full rounded-lg border border-gold/20 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-gold"
          />
        </label>
        <label className="text-xs text-ink-3">
          Modèle
          <select
            value={gender}
            onChange={(event) => setGender(event.target.value as Gender)}
            className="mt-1 w-full rounded-lg border border-gold/20 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-gold"
          >
            <option value="neutral">Neutre</option>
            <option value="female">Femme</option>
            <option value="male">Homme</option>
          </select>
        </label>
      </div>

      <PhotoUpload onComplete={runExtraction} onCancel={() => undefined} />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
