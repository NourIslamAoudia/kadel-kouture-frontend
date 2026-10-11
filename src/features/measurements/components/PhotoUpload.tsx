import { useCallback, useRef, useState } from "react";
import type { Gender } from "../types";
import { useOrderT } from "@features/submission/i18n";
export type ShotId = "front" | "side";

export interface Shot {
  id: ShotId;
  blob: Blob;
  previewUrl: string;
}

interface Props {
  onComplete: (shots: Record<ShotId, Shot>) => void;
  onCancel: () => void;
  gender?: Gender;
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
  const t = useOrderT();
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
        {shot && <span className="ready-mark">{t.upload.ready}</span>}
      </div>
      {shot ? (
        <>
          <div className="photo-preview">
            <img src={shot.previewUrl} alt={t.upload.preview(title)} />
          </div>
          <div className="photo-card-actions">
            <button type="button" onClick={() => inputRef.current?.click()}>
              <UploadIcon /> {t.upload.replace}
            </button>
            <button
              type="button"
              className="remove-photo"
              title={t.upload.removePhoto(title)}
              aria-label={t.upload.removePhoto(title)}
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
          <strong>{t.upload.drop}</strong>
          <span>{t.upload.formats}</span>
        </button>
      )}
    </div>
  );
}

export default function PhotoUpload({
  onComplete,
  onCancel,
  gender = "neutral",
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
  const t = useOrderT();
  const example =
    gender === "female"
      ? { src: "/demo-2.jpg", label: t.upload.exampleFemale }
      : { src: "/demo-1.png", label: t.upload.exampleMale };
  return (
    <div className="photo-upload">
      <div className="upload-intro">
        <div>
          <span className="step-label">{t.upload.label}</span>
          <h2>{t.upload.title}</h2>
          <p>{t.upload.text}</p>
        </div>
        <span className="upload-count">
          {ready ? "2 / 2" : `${shots.front ? 1 : 0} / 2`}
        </span>
      </div>
      <div className="photo-examples">
        <div className="photo-examples-heading">
          <strong>{t.upload.examplesTitle}</strong>
          <span>{t.upload.examplesText}</span>
        </div>
        <div className="photo-examples-grid">
          <figure>
            <img src={example.src} alt={example.label} />
            <figcaption>{example.label}</figcaption>
          </figure>
        </div>
      </div>
      <div className="upload-guidance">
        <ImageIcon />
        <span>
          <strong>{t.upload.guidanceStrong}</strong> · {t.upload.guidance}
        </span>
      </div>
      <div className="photo-upload-grid">
        <PhotoCard
          id="front"
          title={t.upload.front.title}
          description={t.upload.front.description}
          shot={shots.front}
          onSelect={(file) => save("front", file)}
          onRemove={() => remove("front")}
        />
        <PhotoCard
          id="side"
          title={t.upload.side.title}
          description={t.upload.side.description}
          shot={shots.side}
          onSelect={(file) => save("side", file)}
          onRemove={() => remove("side")}
        />
      </div>
      <div className="upload-footer">
        <button className="back-button" type="button" onClick={onCancel}>
          {t.upload.back}
        </button>
        <button
          className="primary-button"
          type="button"
          disabled={!ready}
          onClick={() =>
            ready && onComplete({ front: shots.front!, side: shots.side! })
          }
        >
          {ready ? t.upload.start : t.upload.missing}
          <UploadIcon />
        </button>
      </div>
    </div>
  );
}
