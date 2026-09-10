import { useCallback, useEffect, useRef, useState } from "react";

export type ShotId = "front" | "side";

export interface Shot {
    id: ShotId;
    blob: Blob;
    previewUrl: string;
}

const SHOT_ORDER: ShotId[] = ["front", "side"];

const SHOT_COPY: Record<ShotId, { title: string; instruction: string }> = {
    front: {
        title: "Front view",
        instruction: "Face the camera straight on. Feet together, arms slightly away from the body, palms forward.",
    },
    side: {
        title: "Side view",
        instruction: "Turn 90° to your left. Stand naturally, arms hanging at your sides, look straight ahead.",
    },
};

interface Props {
    onComplete: (shots: Record<ShotId, Shot>) => void;
    onCancel: () => void;
    onSwitchToUpload?: () => void;
}

export default function CameraCapture({ onComplete, onCancel, onSwitchToUpload }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [facing, setFacing] = useState<"user" | "environment">("user");
    const [error, setError] = useState<string | null>(null);
    const [ready, setReady] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [shots, setShots] = useState<Partial<Record<ShotId, Shot>>>({});

    const currentShot = SHOT_ORDER.find(id => !shots[id]) ?? null;

    useEffect(() => {
        let cancelled = false;

        async function start() {
            setReady(false);
            setError(null);
            try {
                if (!navigator.mediaDevices?.getUserMedia) {
                    throw new Error(
                        "This browser exposes no live camera API in this mode. Mobile browsers require HTTPS to unlock live camera streaming. " +
                            "Use HTTPS (https://192.168.1.70:5173, accept the certificate) or tap 'Take photo with phone camera' below.",
                    );
                }
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: facing,
                        width: { ideal: 1440 },
                        height: { ideal: 1920 },
                    },
                    audio: false,
                });
                if (cancelled) {
                    stream.getTracks().forEach(t => t.stop());
                    return;
                }
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play();
                }
                setReady(true);
            } catch (err) {
                if (cancelled) return;
                const name = err instanceof DOMException ? err.name : "";
                setError(
                    name === "NotAllowedError"
                        ? "Camera permission was denied. Allow it in the browser's site settings and reload."
                        : name === "NotFoundError"
                          ? "No camera was found on this device."
                          : err instanceof Error
                            ? err.message
                            : "Could not open the camera.",
                );
            }
        }

        start();
        return () => {
            cancelled = true;
            streamRef.current?.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        };
    }, [facing]);

    useEffect(() => {
        return () => {
            Object.values(shots).forEach(shot => shot && URL.revokeObjectURL(shot.previewUrl));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const capture = useCallback(async () => {
        const video = videoRef.current;
        if (!video || !currentShot) return;

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/jpeg", 0.92));
        if (!blob) return;

        setShots(previous => ({
            ...previous,
            [currentShot]: {
                id: currentShot,
                blob,
                previewUrl: URL.createObjectURL(blob),
            },
        }));
    }, [currentShot]);

    useEffect(() => {
        if (countdown === null) return;
        if (countdown === 0) {
            setCountdown(null);
            void capture();
            return;
        }
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown, capture]);

    const retake = (id: ShotId) => {
        setShots(previous => {
            const shot = previous[id];
            if (shot) URL.revokeObjectURL(shot.previewUrl);
            const next = { ...previous };
            delete next[id];
            return next;
        });
    };

    const allTaken = SHOT_ORDER.every(id => shots[id]);

    if (error) {
        return (
            <div className="rounded-2xl border border-red-900/50 bg-red-950/40 p-6">
                <h3 className="text-base font-semibold text-red-200">Camera unavailable</h3>
                <p className="mt-2 text-sm leading-relaxed text-red-200/80">{error}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                    {onSwitchToUpload && (
                        <button
                            type="button"
                            onClick={onSwitchToUpload}
                            className="rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
                        >
                            📷 Take photos with phone camera instead
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => setFacing(f => (f === "user" ? "environment" : "user"))}
                        className="rounded-lg bg-red-200/10 px-4 py-2 text-sm font-medium text-red-100 hover:bg-red-200/20"
                    >
                        Try the other camera
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-red-200/70 hover:text-red-100"
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
                <video
                    ref={videoRef}
                    playsInline
                    muted
                    className={`h-[62vh] max-h-[46rem] min-h-[22rem] w-full object-cover ${
                        facing === "user" ? "-scale-x-100" : ""
                    }`}
                />

                <svg
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    viewBox="0 0 300 400"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <rect
                        x="95"
                        y="18"
                        width="110"
                        height="364"
                        rx="55"
                        fill="none"
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth="1.5"
                        strokeDasharray="7 7"
                    />
                    <line x1="150" y1="10" x2="150" y2="390" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="60" y1="382" x2="240" y2="382" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                </svg>

                {countdown !== null && (
                    <div className="absolute inset-0 grid place-items-center bg-black/40">
                        <span className="text-8xl font-light tabular-nums text-white drop-shadow-lg">{countdown}</span>
                    </div>
                )}

                {currentShot && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-12">
                        <p className="text-sm font-semibold text-white">{SHOT_COPY[currentShot].title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-white/70">
                            {SHOT_COPY[currentShot].instruction}
                        </p>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                    {SHOT_ORDER.map(id => {
                        const shot = shots[id];
                        return (
                            <div key={id} className="space-y-1.5">
                                <div
                                    className={`relative aspect-[3/4] overflow-hidden rounded-lg border ${
                                        shot
                                            ? "border-emerald-500/40"
                                            : currentShot === id
                                              ? "border-white/40 border-dashed"
                                              : "border-white/10 border-dashed"
                                    } bg-white/5`}
                                >
                                    {shot ? (
                                        <img
                                            src={shot.previewUrl}
                                            alt={`${id} view`}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="grid h-full place-items-center text-[11px] uppercase tracking-wider text-white/30">
                                            {id}
                                        </div>
                                    )}
                                </div>
                                {shot && (
                                    <button
                                        type="button"
                                        onClick={() => retake(id)}
                                        className="w-full text-[11px] text-white/50 hover:text-white"
                                    >
                                        Retake
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                {currentShot && (
                    <>
                        <button
                            type="button"
                            disabled={!ready || countdown !== null}
                            onClick={() => setCountdown(5)}
                            className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-white/90 disabled:opacity-40"
                        >
                            {countdown !== null ? "Hold still…" : `Capture ${currentShot} — 5s timer`}
                        </button>
                        <button
                            type="button"
                            disabled={!ready || countdown !== null}
                            onClick={() => void capture()}
                            className="rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/70 transition hover:border-white/30 hover:text-white disabled:opacity-40"
                        >
                            Capture now
                        </button>
                    </>
                )}

                {allTaken && (
                    <button
                        type="button"
                        onClick={() => onComplete(shots as Record<ShotId, Shot>)}
                        className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
                    >
                        Build the 3D model →
                    </button>
                )}

                <div className="mt-auto space-y-2 pt-2">
                    {onSwitchToUpload && (
                        <button
                            type="button"
                            onClick={onSwitchToUpload}
                            className="w-full rounded-lg border border-white/10 px-3 py-2 text-xs text-white/70 hover:border-white/25 hover:text-white"
                        >
                            Upload photo files instead
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => setFacing(f => (f === "user" ? "environment" : "user"))}
                        className="w-full rounded-lg border border-white/10 px-3 py-2 text-xs text-white/60 hover:text-white"
                    >
                        Switch camera ({facing === "user" ? "front" : "rear"})
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full px-3 py-2 text-xs text-white/40 hover:text-white/70"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}