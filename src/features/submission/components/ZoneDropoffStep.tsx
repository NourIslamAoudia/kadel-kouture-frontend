//src/features/submission/components/ZoneDropoffStep.tsx
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { LockerIcon, ShopIcon } from "./StepIcons";
import { ServicePointsMap } from "./ServicePointsMap";
import { estimateOrigin } from "../lib/mapGeo";
import { em, useOrderT } from "../i18n";
import { useGeolocation } from "../hooks/useGeolocation";
import { useServicePoints } from "../hooks/useServicePoints";
import type {
  OpeningDay,
  ServicePointDto,
  ServicePointSearch,
} from "../types";

interface Props {
  dropOffPoint: ServicePointDto | null;
  onDropOffChange: (point: ServicePointDto | null) => void;
}

/**
 * Étape « point relais » : le client cherche par adresse ou code postal, ou autour de sa position,
 * puis choisit un point Sendcloud (France). La position ne sert qu'à cette recherche.
 */
export default function ZoneDropoffStep({
  dropOffPoint,
  onDropOffChange,
}: Props) {
  const t = useOrderT();
  const inputId = useId();
  const messageId = useId();
  const [address, setAddress] = useState("");
  const [tooShort, setTooShort] = useState(false);
  const [search, setSearch] = useState<ServicePointSearch | null>(null);
  const { points, loading, settled, failure, retry } = useServicePoints(search);
  const geo = useGeolocation();
  // Dernière recherche lancée : une position qui arrive après une recherche par adresse est ignorée.
  const latest = useRef(0);
  // Point survolé dans la liste ou sur la carte : mis en valeur des deux côtés.
  const [activeId, setActiveId] = useState<number | null>(null);

  // Une nouvelle recherche qui ne contient plus le point choisi annule la sélection.
  useEffect(() => {
    if (
      settled &&
      dropOffPoint &&
      !points.some((point) => point.id === dropOffPoint.id)
    ) {
      onDropOffChange(null);
    }
  }, [settled, points, dropOffPoint, onDropOffChange]);

  const searchAddress = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    latest.current += 1;
    geo.clearFailure();
    const value = address.trim().replace(/\s+/g, " ");
    if (value.length < 3) {
      setTooShort(true);
      return;
    }
    setTooShort(false);
    setSearch({ mode: "address", address: value });
  };

  const searchAroundMe = async () => {
    const ticket = (latest.current += 1);
    setTooShort(false);
    setSearch(null); // annule la recherche en cours
    const position = await geo.locate();
    if (position && ticket === latest.current) {
      setSearch({ mode: "geo", ...position });
    }
  };

  const geoMessages = {
    denied: t.zone.geoDenied,
    unavailable: t.zone.geoUnavailable,
    timeout: t.zone.geoTimeout,
    unsupported: t.zone.geoUnsupported,
  };
  const message = tooShort
    ? t.zone.tooShort
    : geo.failure
      ? geoMessages[geo.failure]
      : failure === "ADDRESS_NOT_FOUND"
        ? t.zone.notFound
        : settled && points.length === 0
          ? t.zone.empty
          : null;

  // Aucune liste affichée (étape rouverte, recherche en échec) : le point déjà choisi reste visible.
  const remembered = !loading && !settled ? dropOffPoint : null;

  // Lieu de la recherche sur la carte : la position du client, ou l'adresse retrouvée par les distances.
  const origin =
    search?.mode === "geo"
      ? { latitude: search.latitude, longitude: search.longitude }
      : settled
        ? estimateOrigin(points)
        : null;
  const mapPoints = settled ? points : remembered ? [remembered] : [];

  const choosePoint = (point: ServicePointDto, fromMap = false) => {
    onDropOffChange(point);
    if (fromMap) {
      document
        .getElementById(`service-point-${point.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <span className="h-px w-[18px] bg-gold" />
        {t.zone.eyebrow}
      </p>

      <h2 className="mb-2 font-serif text-3xl font-light leading-tight text-ink">
        {em(t.zone.title)}
      </h2>

      <p className="mb-6 text-[13px] leading-relaxed text-ink-3">
        {t.zone.subtitle}
      </p>

      <form role="search" onSubmit={searchAddress} noValidate>
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-ink-3"
        >
          {t.zone.searchLabel}
        </label>
        <div className="flex">
          <input
            id={inputId}
            type="text"
            inputMode="search"
            enterKeyHint="search"
            autoComplete="street-address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder={t.zone.searchPlaceholder}
            aria-invalid={tooShort || failure === "ADDRESS_NOT_FOUND"}
            aria-describedby={messageId}
            className="min-w-0 flex-1 rounded-none border-[1.5px] border-r-0 border-gold/20 bg-white px-[18px] py-3 text-[15px] text-ink outline-none transition focus:border-gold focus:shadow-[0_0_0_3px_rgba(23,23,21,0.11)]"
          />
          <button
            type="submit"
            className="shrink-0 bg-ink px-5 text-[11px] font-medium uppercase tracking-[0.12em] text-kk-ivory transition hover:bg-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {t.zone.search}
          </button>
        </div>
      </form>

      <button
        type="button"
        onClick={() => void searchAroundMe()}
        disabled={geo.locating}
        aria-busy={geo.locating}
        className="mt-2.5 flex w-full items-center justify-center gap-2.5 border border-ink/12 bg-white px-4 py-3 text-[12px] uppercase tracking-[0.12em] text-ink-2 transition duration-300 hover:border-ink/45 hover:text-ink disabled:cursor-wait disabled:opacity-60"
      >
        <PinIcon className={`h-4 w-4 ${geo.locating ? "animate-pulse" : ""}`} />
        {geo.locating ? t.zone.locating : t.zone.useLocation}
      </button>

      <div className="mt-5 border border-ink/15 shadow-[0_18px_50px_-30px_rgba(23,23,21,0.35)]">
        <ServicePointsMap
          origin={origin}
          originLabel={
            search?.mode === "geo" ? t.zone.yourPosition : t.zone.yourAddress
          }
          points={mapPoints}
          busy={loading || geo.locating}
          hint={
            !search && !remembered && !geo.locating ? t.zone.mapHint : null
          }
          selectedId={dropOffPoint?.id ?? null}
          activeId={activeId}
          onSelect={(point) => choosePoint(point, true)}
          onHover={setActiveId}
        />
      </div>

      <div id={messageId} aria-live="polite" className="mt-5">
        {message && (
          <p className="mb-4 font-serif text-[15px] italic leading-snug text-ink-2">
            {message}
          </p>
        )}
        {failure === "GENERIC" && (
          <div className="mb-4 flex items-center justify-between gap-4 border border-ink/12 bg-white px-4 py-3.5">
            <p className="font-serif text-[15px] italic text-ink-2">
              {t.zone.error}
            </p>
            <button
              type="button"
              onClick={retry}
              className="shrink-0 border border-ink/45 px-3.5 py-2 text-[11px] uppercase tracking-[0.12em] text-ink transition duration-300 hover:bg-ink hover:text-kk-ivory"
            >
              {t.zone.retry}
            </button>
          </div>
        )}
      </div>

      <div aria-busy={loading}>
        {loading && (
          <>
            <SectionLabel>{t.zone.dropOff}</SectionLabel>
            <PointsSkeleton label={t.zone.loading} />
          </>
        )}

        {!loading && settled && points.length > 0 && (
          <>
            <SectionLabel>{t.zone.dropOff}</SectionLabel>
            <div className="flex flex-col gap-2.5">
              {points.map((point) => (
                <ServicePointButton
                  key={point.id}
                  point={point}
                  selected={dropOffPoint?.id === point.id}
                  active={activeId === point.id}
                  onSelect={() => choosePoint(point)}
                  onActive={(active) => setActiveId(active ? point.id : null)}
                />
              ))}
            </div>
          </>
        )}

        {remembered && (
          <>
            <SectionLabel>{t.zone.selected}</SectionLabel>
            <div className="flex flex-col">
              <ServicePointButton
                point={remembered}
                selected
                active={false}
                onSelect={() => choosePoint(remembered)}
                onActive={() => undefined}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-2.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-ink-3">
      <span className="h-px w-3.5 bg-gold opacity-50" />
      {children}
    </p>
  );
}

/** Repère de position, au trait comme les autres icônes du formulaire. */
function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

function ServicePointButton({
  point,
  selected,
  active,
  onSelect,
  onActive,
}: {
  point: ServicePointDto;
  selected: boolean;
  active: boolean;
  onSelect: () => void;
  onActive: (active: boolean) => void;
}) {
  const t = useOrderT();
  const Icon = point.type === "locker" ? LockerIcon : ShopIcon;
  const hours = todayHours(point);
  const address = [
    [point.houseNumber, point.street].filter(Boolean).join(" "),
    [point.postalCode, point.city].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <button
      type="button"
      id={`service-point-${point.id}`}
      onClick={onSelect}
      onMouseEnter={() => onActive(true)}
      onMouseLeave={() => onActive(false)}
      onFocus={() => onActive(true)}
      onBlur={() => onActive(false)}
      aria-pressed={selected}
      className={`flex scroll-mt-24 items-center gap-4 border px-4 py-3.5 text-left transition duration-300 ${
        selected
          ? "border-ink bg-gold-pale"
          : active
            ? "border-ink/45 bg-white"
            : "border-ink/12 bg-white hover:border-ink/45"
      }`}
    >
      <Icon className="h-10 w-10 shrink-0 text-ink" />

      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-3">
          <span className="block font-serif text-[16px] leading-tight text-ink capitalize">
            {point.name.toLowerCase()}
          </span>
          {point.distance !== null && (
            <span className="shrink-0 text-[11px] text-ink-3">
              {t.zone.distance(point.distance)}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[11.5px] text-ink-3 capitalize">
          {address.toLowerCase()}
        </span>
        <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-ink-2">
          <span className="border border-ink/15 px-1.5 py-px text-[10px] uppercase tracking-widest">
            {point.carrierName ?? point.carrier}
            {point.type === "locker" ? ` · ${t.zone.locker}` : ""}
          </span>
          <span>{hours ? t.zone.openToday(hours) : t.zone.closedToday}</span>
        </span>
      </span>

      <span
        className={`h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-white ${
          selected ? "flex" : "hidden"
        }`}
      >
        <CheckIcon />
      </span>
    </button>
  );
}

/**
 * Horaires du jour : Sendcloud numérote de 0 = lundi à 6 = dimanche,
 * alors que getDay() renvoie 0 = dimanche. Tableau vide = fermé.
 */
function todayHours(point: ServicePointDto) {
  const day = String((new Date().getDay() + 6) % 7) as OpeningDay;
  return point.openingTimes[day]
    .map((range) => range.replace(/\s*-\s*/, "–"))
    .join(" · ");
}

function PointsSkeleton({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="sr-only">{label}</p>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          aria-hidden="true"
          className="flex animate-pulse items-center gap-4 border border-ink/12 bg-white px-4 py-3.5"
        >
          <span className="h-10 w-10 shrink-0 bg-gold-pale" />
          <span className="flex-1 space-y-2">
            <span className="block h-3.5 w-2/5 bg-gold-pale" />
            <span className="block h-2.5 w-3/5 bg-bg-2" />
            <span className="block h-2.5 w-1/4 bg-bg-2" />
          </span>
        </div>
      ))}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
