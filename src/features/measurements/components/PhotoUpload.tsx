import { useCallback, useRef, useState } from "react";
export type ShotId = "front" | "side";

export interface Shot {
  id: ShotId;
  blob: Blob;
  previewUrl: string;
}

interface Props {
  onComplete: (shots: Record<ShotId, Shot>) => void;
  onCancel: () => void;
  initialShots?: Partial<Record<ShotId, Shot>>;
}

function UploadIcon() {
  return (
    <svg
      className="upload-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 20h14" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      className="upload-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8" cy="9" r="1.3" />
      <path d="m4 17 5-5 3 3 2-2 6 5" />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg
      className="upload-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 7h14M9 7V5h6v2M8 10v7M12 10v7M16 10v7M6 7l1 13h10l1-13" />
    </svg>
  );
}

function PhotoCard({
  id,
  title,
  description,
  shot,
  onSelect,
  onRemove,
}: {
  id: ShotId;
  title: string;
  description: string;
  shot?: Shot;
  onSelect: (file: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const selectFile = (file?: File) => {
    if (file?.type.startsWith("image/")) onSelect(file);
  };
  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    selectFile(event.dataTransfer.files[0]);
  }, []);
  return (
    <div
      className={`photo-card ${shot ? "has-photo" : ""} ${dragging ? "is-dragging" : ""}`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(event) => {
          selectFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      <div className="photo-card-heading">
        <div>
          <span className="photo-index">{id === "front" ? "01" : "02"}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {shot && <span className="ready-mark">Prêt</span>}
      </div>
      {shot ? (
        <>
          <div className="photo-preview">
            <img src={shot.previewUrl} alt={`Aperçu ${title}`} />
          </div>
          <div className="photo-card-actions">
            <button type="button" onClick={() => inputRef.current?.click()}>
              <UploadIcon /> Remplacer
            </button>
            <button
              type="button"
              className="remove-photo"
              title={`Supprimer ${title}`}
              onClick={onRemove}
            >
              <RemoveIcon />
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          className="drop-target"
          onClick={() => inputRef.current?.click()}
        >
          <ImageIcon />
          <strong>Déposer ou choisir une image</strong>
          <span>JPG, PNG ou WebP</span>
        </button>
      )}
    </div>
  );
}

export default function PhotoUpload({
  onComplete,
  onCancel,
  initialShots = {},
}: Props) {
  const [shots, setShots] =
    useState<Partial<Record<ShotId, Shot>>>(initialShots);
  const save = (id: ShotId, file: File) => {
    const previous = shots[id];
    if (previous) URL.revokeObjectURL(previous.previewUrl);
    setShots((current) => ({
      ...current,
      [id]: { id, blob: file, previewUrl: URL.createObjectURL(file) },
    }));
  };
  const remove = (id: ShotId) => {
    const previous = shots[id];
    if (previous) URL.revokeObjectURL(previous.previewUrl);
    setShots((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  };
  const ready = Boolean(shots.front && shots.side);
  return (
    <div className="photo-upload">
      <div className="upload-intro">
        <div>
          <span className="step-label">Photos requises</span>
          <h2>Deux vues de votre silhouette</h2>
          <p>
            Ajoutez une photo de face et une photo de profil. Elles seront
            envoyées ensemble au moteur de mesure.
          </p>
        </div>
        <span className="upload-count">
          {ready ? "2 / 2" : `${shots.front ? 1 : 0} / 2`}
        </span>
      </div>
      <div className="photo-upload-grid">
        <PhotoCard
          id="front"
          title="Vue de face"
          description="Pieds joints, bras légèrement écartés"
          shot={shots.front}
          onSelect={(file) => save("front", file)}
          onRemove={() => remove("front")}
        />
        <PhotoCard
          id="side"
          title="Vue de profil"
          description="Tournez-vous à 90°, posture naturelle"
          shot={shots.side}
          onSelect={(file) => save("side", file)}
          onRemove={() => remove("side")}
        />
      </div>
      <div className="upload-guidance">
        <ImageIcon />
        <span>
          <strong>Pour une meilleure précision</strong> · corps entier visible,
          vêtements près du corps, arrière-plan uni et bonne lumière.
        </span>
      </div>
      <div className="upload-footer">
        <button className="back-button" type="button" onClick={onCancel}>
          Retour
        </button>
        <button
          className="primary-button"
          type="button"
          disabled={!ready}
          onClick={() =>
            ready && onComplete({ front: shots.front!, side: shots.side! })
          }
        >
          {ready ? "Lancer le scan" : "Ajoutez les deux photos"}
          <UploadIcon />
        </button>
      </div>
    </div>
  );
}
