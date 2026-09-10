import { useState } from "react";
import Topbar from "@shared/components/Topbar";
import BottomNav from "@shared/components/BottomNav";
import GarmentTypeStep from "./GarmentTypeStep";
import WorkTypeStep from "./WorkTypeStep";
import MeasureMethodStep, { type MeasureMethod } from "./MeasureMethodStep";
import ManualMeasurementsStep from "./ManualMeasurementsStep";
import ClientInfoStep from "./ClientInfoStep";
import ZoneDropoffStep from "./ZoneDropoffStep";
import PhotoMeasurementStep from "./PhotoMeasurementStep";
import { getSummaryMeasurements } from "../../measurements/components/MeasurementSheet";
import { submissionApi } from "../api";
import type { GarmentType, WorkType, SilhouetteModel } from "../types";
import type { ExtractionResponse } from "@features/measurements/types";

type StepKey =
  "garment" | "work" | "method" | "measurements" | "client" | "zone" | "done";

const STEP_ORDER: StepKey[] = [
  "garment",
  "work",
  "method",
  "measurements",
  "client",
  "zone",
];

export default function OrderFlow() {
  const [step, setStep] = useState<StepKey>("garment");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Étape 1 — vêtement
  const [garmentType, setGarmentType] = useState<GarmentType | null>(null);
  const [garmentOther, setGarmentOther] = useState("");

  // Étape 2 — travail
  const [workType, setWorkType] = useState<WorkType | null>(null);

  // Étape 3 — méthode
  const [method, setMethod] = useState<MeasureMethod | null>(null);

  // Étape 4 — mesures manuelles
  const [manual, setManual] = useState({
    chest: "",
    waist: "",
    hips: "",
    height: "",
    shoulders: "",
    sleeve: "",
  });

  // Étape 5 — client
  const [client, setClient] = useState({
    fullName: "",
    phone: "",
    email: "",
    comment: "",
  });

  // Étape 6 — zone
  const [zone, setZone] = useState<string | null>(null);
  const [dropOffPoint, setDropOffPoint] = useState<string | null>(null);
  const [photoResult, setPhotoResult] = useState<ExtractionResponse | null>(
    null,
  );

  const currentIndex = STEP_ORDER.indexOf(step);
  const totalSteps = STEP_ORDER.length;

  const validationMessage = (): string | null => {
    if (step === "garment" && !garmentType)
      return "Choisissez un type de vêtement.";
    if (step === "garment" && garmentType === "autre" && !garmentOther.trim()) {
      return "Précisez le type de vêtement.";
    }
    if (step === "work" && !workType) return "Choisissez le type de travail.";
    if (step === "method" && !method)
      return "Choisissez une méthode de mesure.";
    if (step === "measurements" && method === "photo" && !photoResult) {
      return "Ajoutez les deux photos et lancez l’analyse.";
    }
    if (step === "measurements" && method === "manual") {
      const limits = {
        chest: [30, 250],
        waist: [30, 250],
        hips: [30, 250],
        height: [100, 230],
        shoulders: [10, 100],
        sleeve: [20, 150],
      } as const;
      const invalid = (Object.keys(manual) as Array<keyof typeof manual>).some(
        (field) => {
          const value = manual[field];
          const number = Number(value);
          const [minimum, maximum] = limits[field];
          return (
            !value.trim() ||
            !Number.isFinite(number) ||
            number < minimum ||
            number > maximum
          );
        },
      );
      if (invalid)
        return "Vérifiez vos mesures : les valeurs doivent être réalistes et en cm.";
    }
    if (step === "client") {
      if (!client.fullName.trim()) return "Saisissez votre nom complet.";
      if (!/^[+\d][\d\s().-]{7,}$/.test(client.phone.trim())) {
        return "Saisissez un numéro de téléphone valide.";
      }
      if (!/^\S+@\S+\.\S+$/.test(client.email.trim())) {
        return "Saisissez une adresse email valide.";
      }
    }
    if (step === "zone" && (!zone || !dropOffPoint)) {
      return "Choisissez une zone et un point de dépôt.";
    }
    return null;
  };

  const canGoNext = (): boolean => {
    return validationMessage() === null;
  };

  const goNext = async () => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx < STEP_ORDER.length - 1) {
      setStep(STEP_ORDER[idx + 1]);
      return;
    }
    // Dernière étape → soumission
    await handleSubmit();
  };

  const goBack = () => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) setStep(STEP_ORDER[idx - 1]);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await submissionApi.create({
        full_name: client.fullName,
        phone_number: client.phone,
        email: client.email,
        garment_type: garmentType!,
        garment_type_other: garmentType === "autre" ? garmentOther : null,
        work_type: workType!,
        comment: client.comment || null,
        height_cm: Number(manual.height),
        silhouette_model: "neutral" as SilhouetteModel,
        measurements:
          method === "photo" ? getSummaryMeasurements(photoResult!) : manual,
        mesh_url: photoResult?.mesh_url ?? null,
        zone: zone!,
        drop_off_point: dropOffPoint!,
      });
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setSubmitting(false);
    }
  };

  if (step === "done") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-6">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-gold-pale">
            <CheckIcon />
          </div>
          <h2 className="mb-2 font-serif text-3xl font-light text-ink">
            Demande <em className="italic text-gold">confirmée !</em>
          </h2>
          <p className="text-[13px] leading-relaxed text-ink-3">
            Nous vous recontacterons rapidement pour finaliser les détails.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[480px] flex-col bg-bg shadow-[0_0_60px_rgba(0,0,0,0.06)]">
      <Topbar
        step={currentIndex + 1}
        totalSteps={totalSteps}
        onBack={goBack}
        canGoBack={currentIndex > 0}
      />

      <div className="flex-1 overflow-y-auto px-[22px] py-6">
        {step === "garment" && (
          <GarmentTypeStep
            value={garmentType}
            otherValue={garmentOther}
            onChange={setGarmentType}
            onOtherChange={setGarmentOther}
          />
        )}

        {step === "work" && (
          <WorkTypeStep value={workType} onChange={setWorkType} />
        )}

        {step === "method" && (
          <MeasureMethodStep value={method} onChange={setMethod} />
        )}

        {step === "measurements" &&
          (method === "photo" ? (
            <PhotoMeasurementStep
              result={photoResult}
              onResult={setPhotoResult}
            />
          ) : (
            <ManualMeasurementsStep
              values={manual}
              onChange={(field, value) =>
                setManual((m) => ({ ...m, [field]: value }))
              }
            />
          ))}

        {step === "client" && (
          <ClientInfoStep
            values={client}
            onChange={(field, value) =>
              setClient((c) => ({ ...c, [field]: value }))
            }
          />
        )}

        {step === "zone" && (
          <ZoneDropoffStep
            zone={zone}
            dropOffPoint={dropOffPoint}
            onZoneChange={(z) => {
              setZone(z);
              setDropOffPoint(null);
            }}
            onDropOffChange={setDropOffPoint}
          />
        )}

        {(error || validationMessage()) && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {error ?? validationMessage()}
          </p>
        )}
      </div>

      {!(step === "measurements" && method === "photo" && !photoResult) && (
        <BottomNav
          onNext={goNext}
          nextDisabled={!canGoNext()}
          loading={submitting}
          nextLabel={step === "zone" ? "Envoyer la demande →" : "Continuer →"}
        />
      )}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="30"
      height="30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gold"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
