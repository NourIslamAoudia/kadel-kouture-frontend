// src/features/submission/components/SubmissionForm.tsx
import { useState } from "react";
import { submissionApi } from "../api";
import { getSummaryMeasurements } from "@features/measurements/components/MeasurementSheet";
import type { ExtractionResponse } from "@features/measurements/types";
import type { GarmentType, WorkType, SilhouetteModel } from "../types";

interface Props {
  measurements: ExtractionResponse;
  heightCm: number;
  silhouetteModel: SilhouetteModel;
  onSuccess: () => void;
}

export default function SubmissionForm({
  measurements,
  heightCm,
  silhouetteModel,
  onSuccess,
}: Props) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [garmentType, setGarmentType] = useState<GarmentType>("pantalon");
  const [garmentTypeOther, setGarmentTypeOther] = useState("");
  const [workType, setWorkType] = useState<WorkType>("retouche");
  const [comment, setComment] = useState("");
  const [zone, setZone] = useState("");
  const [dropOffPoint, setDropOffPoint] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await submissionApi.create({
        full_name: fullName,
        phone_number: phone,
        email,
        garment_type: garmentType,
        garment_type_other: garmentType === "autre" ? garmentTypeOther : null,
        work_type: workType,
        comment: comment || null,
        height_cm: heightCm,
        silhouette_model: silhouetteModel,
        measurements: getSummaryMeasurements(measurements),
        mesh_url: measurements.mesh_url,
        zone,
        drop_off_point: dropOffPoint,
      });

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nom complet"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        placeholder="Téléphone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <select
        value={garmentType}
        onChange={(e) => setGarmentType(e.target.value as GarmentType)}
      >
        <option value="pantalon">Pantalon</option>
        <option value="veste">Veste</option>
        <option value="robe">Robe</option>
        <option value="chemise">Chemise</option>
        <option value="manteau">Manteau</option>
        <option value="autre">Autre</option>
      </select>

      {garmentType === "autre" && (
        <input
          placeholder="Précisez le vêtement"
          value={garmentTypeOther}
          onChange={(e) => setGarmentTypeOther(e.target.value)}
          required
        />
      )}

      <select
        value={workType}
        onChange={(e) => setWorkType(e.target.value as WorkType)}
      >
        <option value="retouche">Retouche</option>
        <option value="reparation">Réparation</option>
        <option value="personnalisation">Personnalisation</option>
        <option value="upcycling">Upcycling</option>
      </select>

      <textarea
        placeholder="Commentaire (optionnel)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <input
        placeholder="Zone"
        value={zone}
        onChange={(e) => setZone(e.target.value)}
        required
      />
      <input
        placeholder="Point de dépôt"
        value={dropOffPoint}
        onChange={(e) => setDropOffPoint(e.target.value)}
        required
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Envoi..." : "Envoyer la demande"}
      </button>
    </form>
  );
}
