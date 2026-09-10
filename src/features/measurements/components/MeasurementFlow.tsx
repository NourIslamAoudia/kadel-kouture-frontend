import { useState } from "react";
import CameraCapture, { type Shot, type ShotId } from "./CameraCapture";
import PhotoUpload from "./PhotoUpload";
import MeasurementSheet from "./MeasurementSheet";
import { extractMeasurements } from "../api";
import type { ExtractionResponse, Gender } from "../types";
import SubmissionForm from "../../submission/components/SubmissionForm";

type Step = "capture" | "upload" | "processing" | "result" | "form" | "done";

export default function MeasurementFlow() {
  const [step, setStep] = useState<Step>("capture");
  const [heightCm, setHeightCm] = useState(170);
  const [gender, setGender] = useState<Gender>("neutral");
  const [result, setResult] = useState<ExtractionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runExtraction = async (shots: Record<ShotId, Shot>) => {
    setStep("processing");
    setError(null);
    try {
      const response = await extractMeasurements({
        heightMm: heightCm * 10,
        gender,
        frontImage: shots.front.blob,
        sideImage: shots.side.blob,
        useDemoMesh: false,
      });
      setResult(response);
      setStep("result");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors du calcul des mesures",
      );
      setStep("capture");
    }
  };

  if (step === "capture") {
    return (
      <CameraCapture
        onComplete={runExtraction}
        onCancel={() => {}}
        onSwitchToUpload={() => setStep("upload")}
      />
    );
  }

  if (step === "upload") {
    return (
      <PhotoUpload
        onComplete={runExtraction}
        onCancel={() => setStep("capture")}
      />
    );
  }

  if (step === "processing") {
    return <p>Calcul des mesures en cours…</p>;
  }

  if (step === "result" && result) {
    return (
      <>
        <MeasurementSheet result={result} />
        <button onClick={() => setStep("form")}>Continuer</button>
      </>
    );
  }

  if (step === "form" && result) {
    return (
      <SubmissionForm
        measurements={result}
        heightCm={heightCm}
        silhouetteModel={gender}
        onSuccess={() => setStep("done")}
      />
    );
  }

  if (step === "done") {
    return <p>Merci ! Votre demande a bien été envoyée.</p>;
  }

  return null;
}
