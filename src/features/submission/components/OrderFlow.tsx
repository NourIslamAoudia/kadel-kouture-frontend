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

  const canGoNext = (): boolean => {
    switch (step) {
      case "garment":
        return (
          garmentType !== null &&
          (garmentType !== "autre" || garmentOther.trim() !== "")
        );
      case "work":
        return workType !== null;
      case "method":
        return method !== null;
      case "measurements":
        return method === "photo"
          ? photoResult !== null
          : Object.values(manual).every((v) => v.trim() !== "");
      case "client":
        return (
          client.fullName.trim() !== "" &&
          client.phone.trim() !== "" &&
          client.email.trim() !== ""
        );
      case "zone":
        return zone !== null && dropOffPoint !== null;
      default:
        return true;
    }
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

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
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
