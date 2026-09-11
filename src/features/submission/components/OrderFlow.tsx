import { useState } from "react";
import Topbar from "@shared/components/Topbar";
import BottomNav from "@shared/components/BottomNav";
import GarmentTypeStep from "./GarmentTypeStep";
import WorkTypeStep from "./WorkTypeStep";
import OrderItemsStep from "./OrderItemsStep";
import MeasureMethodStep, { type MeasureMethod } from "./MeasureMethodStep";
import ManualMeasurementsStep from "./ManualMeasurementsStep";
import ClientInfoStep from "./ClientInfoStep";
import ZoneDropoffStep from "./ZoneDropoffStep";
import PhotoMeasurementStep from "./PhotoMeasurementStep";
import { getSummaryMeasurements } from "../../measurements/components/MeasurementSheet";
import { submissionApi } from "../api";
import type {
  GarmentType,
  WorkType,
  SilhouetteModel,
  OrderItem,
} from "../types";
import type { ExtractionResponse } from "@features/measurements/types";
import {
  getGarmentPrice,
  getWorkPrice,
  getItemPrice,
  calculateTotalPrice,
} from "../../../common/pricing";

type StepKey =
  | "garment"
  | "work"
  | "items"
  | "method"
  | "measurements"
  | "client"
  | "zone"
  | "done";

const STEP_ORDER: StepKey[] = [
  "garment",
  "work",
  "items",
  "method",
  "measurements",
  "client",
  "zone",
];

export default function OrderFlow() {
  const [step, setStep] = useState<StepKey>("garment");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Panier / Liste des pièces commandées
  const [items, setItems] = useState<OrderItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Étape vêtement en cours
  const [garmentType, setGarmentType] = useState<GarmentType | null>(null);
  const [garmentOther, setGarmentOther] = useState("");

  // Étape travail en cours
  const [workType, setWorkType] = useState<WorkType | null>(null);
  const [itemComment, setItemComment] = useState("");

  // Étape méthode
  const [method, setMethod] = useState<MeasureMethod | null>(null);

  // Étape mesures manuelles
  const [manual, setManual] = useState({
    chest: "",
    waist: "",
    hips: "",
    height: "",
    shoulders: "",
    sleeve: "",
  });

  // Étape client
  const [client, setClient] = useState({
    fullName: "",
    phone: "",
    email: "",
    comment: "",
  });

  // Étape zone
  const [zone, setZone] = useState<string | null>(null);
  const [dropOffPoint, setDropOffPoint] = useState<string | null>(null);
  const [photoResult, setPhotoResult] = useState<ExtractionResponse | null>(
    null,
  );

  const currentIndex = STEP_ORDER.indexOf(step);
  const totalSteps = STEP_ORDER.length;
  const totalPrice = calculateTotalPrice(items);

  const validationMessage = (): string | null => {
    if (step === "garment" && !garmentType) {
      return "Choisissez un type de vêtement.";
    }
    if (step === "garment" && garmentType === "autre" && !garmentOther.trim()) {
      return "Précisez le type de vêtement.";
    }
    if (step === "work" && !workType) {
      return "Choisissez le type de travail.";
    }
    if (step === "items" && items.length === 0) {
      return "Veuillez ajouter au moins une pièce à votre commande.";
    }
    if (step === "method" && !method) {
      return "Choisissez une méthode de mesure.";
    }
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
      if (invalid) {
        return "Vérifiez vos mesures : les valeurs doivent être réalistes et en cm.";
      }
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

  const saveCurrentItemAndShowCart = () => {
    if (!garmentType || !workType) return;
    const garment_price = getGarmentPrice(garmentType);
    const work_price = getWorkPrice(workType);
    const price = garment_price + work_price;
    const itemToSave: OrderItem = {
      id:
        editingIndex !== null && items[editingIndex]
          ? items[editingIndex].id
          : crypto.randomUUID(),
      garment_type: garmentType,
      garment_type_other: garmentType === "autre" ? garmentOther : null,
      work_type: workType,
      garment_price,
      work_price,
      comment: itemComment.trim() || null,
      price,
    };

    if (editingIndex !== null) {
      const updated = [...items];
      updated[editingIndex] = itemToSave;
      setItems(updated);
      setEditingIndex(null);
    } else {
      setItems((prev) => [...prev, itemToSave]);
    }

    // Réinitialiser les champs de saisie pour un prochain ajout
    setGarmentType(null);
    setGarmentOther("");
    setWorkType(null);
    setItemComment("");

    setStep("items");
  };

  const handleAddNewItem = () => {
    setEditingIndex(null);
    setGarmentType(null);
    setGarmentOther("");
    setWorkType(null);
    setItemComment("");
    setStep("garment");
  };

  const handleEditItem = (index: number) => {
    const item = items[index];
    if (!item) return;
    setEditingIndex(index);
    setGarmentType(item.garment_type);
    setGarmentOther(item.garment_type_other || "");
    setWorkType(item.work_type);
    setItemComment(item.comment || "");
    setStep("garment");
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const goNext = async () => {
    // Si on est sur l'étape de travail, valider la pièce et passer au panier
    if (step === "work") {
      saveCurrentItemAndShowCart();
      return;
    }

    const idx = STEP_ORDER.indexOf(step);
    if (idx < STEP_ORDER.length - 1) {
      setStep(STEP_ORDER[idx + 1]);
      return;
    }
    // Dernière étape → soumission
    await handleSubmit();
  };

  const goBack = () => {
    // Si on est en train d'ajouter un vêtement secondaire et qu'on clique retour, revenir au panier
    if (step === "garment" && items.length > 0 && editingIndex === null) {
      setStep("items");
      return;
    }

    // Si on est au panier, revenir au dernier vêtement pour l'éditer si désiré
    if (step === "items") {
      if (items.length > 0) {
        handleEditItem(items.length - 1);
        return;
      }
      setStep("work");
      return;
    }

    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) setStep(STEP_ORDER[idx - 1]);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const finalTotalPrice = calculateTotalPrice(items);
      await submissionApi.create({
        full_name: client.fullName,
        phone_number: client.phone,
        email: client.email,
        items,
        total_price: finalTotalPrice,
        garment_type: items[0]?.garment_type ?? "pantalon",
        garment_type_other: items[0]?.garment_type_other ?? null,
        work_type: items[0]?.work_type ?? "retouche",
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
            Votre commande de {items.length}{" "}
            {items.length > 1 ? "pièces" : "pièce"} pour un total estimé de{" "}
            <strong className="text-ink">{totalPrice} €</strong> a bien été
            enregistrée. Nous vous recontacterons rapidement pour finaliser les
            détails.
          </p>
        </div>
      </div>
    );
  }

  const getNextLabel = (): string => {
    if (step === "zone") return "Envoyer la demande →";
    if (step === "work") {
      return editingIndex !== null
        ? "Enregistrer la pièce →"
        : "Ajouter la pièce →";
    }
    if (step === "items") return "Passer aux mesures →";
    return "Continuer →";
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-[480px] flex-col bg-bg shadow-[0_0_60px_rgba(0,0,0,0.06)]">
      <Topbar
        step={currentIndex + 1}
        totalSteps={totalSteps}
        onBack={goBack}
        canGoBack={currentIndex > 0 || (step === "garment" && items.length > 0)}
      />

      <div className="flex-1 overflow-y-auto px-[22px] py-6">
        {step === "garment" && (
          <GarmentTypeStep
            value={garmentType}
            otherValue={garmentOther}
            itemIndex={editingIndex !== null ? editingIndex : items.length}
            onChange={setGarmentType}
            onOtherChange={setGarmentOther}
          />
        )}

        {step === "work" && (
          <WorkTypeStep
            value={workType}
            garmentType={garmentType}
            itemIndex={editingIndex !== null ? editingIndex : items.length}
            itemComment={itemComment}
            onChange={setWorkType}
            onItemCommentChange={setItemComment}
          />
        )}

        {step === "items" && (
          <OrderItemsStep
            items={items}
            onAddItem={handleAddNewItem}
            onEditItem={handleEditItem}
            onRemoveItem={handleRemoveItem}
          />
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
          nextLabel={getNextLabel()}
          totalPrice={
            step === "work" && garmentType && workType
              ? calculateTotalPrice(items) + getItemPrice(garmentType, workType)
              : totalPrice
          }
          itemsCount={
            step === "work" && editingIndex === null
              ? items.length + 1
              : items.length
          }
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
