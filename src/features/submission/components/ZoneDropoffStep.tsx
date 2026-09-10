interface RelayPoint {
  name: string
  address: string
  hours: string
}

const RELAYS: Record<string, RelayPoint[]> = {
  Eixample: [
    { name: 'Colmado La Creu', address: 'C/ Mallorca 123', hours: 'L-V 8–21h' },
    { name: 'Farmacia Pg. Gràcia', address: 'Pg. Gràcia 88', hours: 'L-S 9–22h' },
  ],
  Gràcia: [
    { name: 'El Racó de Gràcia', address: 'C/ Verdi 34', hours: 'L-V 9–20h' },
    { name: 'Librería Calders', address: 'C/ Torrijos 12', hours: 'L-S 10–21h' },
  ],
  'Sant Martí': [
    { name: 'Bar Poblenou', address: 'Rambla Poblenou 45', hours: 'L-D 8–23h' },
  ],
  Barceloneta: [
    { name: 'Estanco Barceloneta', address: 'Pg. Joan de Borbó 22', hours: 'L-S 9–20h' },
  ],
  Sants: [
    { name: 'Copistería Sants', address: 'C/ Sants 56', hours: 'L-V 9–20h' },
  ],
  Sarrià: [
    { name: 'Farmacia Sarrià', address: 'Pg. Reina Elisenda 4', hours: 'L-V 9–21h' },
  ],
  Poblenou: [
    { name: 'Café Centric', address: 'C/ Pallars 195', hours: 'L-D 8–22h' },
  ],
  Raval: [
    { name: 'MACBA Shop', address: 'Pl. dels Àngels 1', hours: 'L-D 10–21h' },
  ],
}

const ZONES = Object.keys(RELAYS)

interface Props {
  zone: string | null
  dropOffPoint: string | null
  onZoneChange: (zone: string) => void
  onDropOffChange: (point: string) => void
}

export default function ZoneDropoffStep({
  zone,
  dropOffPoint,
  onZoneChange,
  onDropOffChange,
}: Props) {
  const relays = zone ? RELAYS[zone] ?? [] : []

  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <span className="h-px w-[18px] bg-gold" />
        Logistique
      </p>

      <h2 className="mb-2 font-serif text-3xl font-light leading-tight text-ink">
        Votre zone <em className="italic text-gold">à Barcelone</em>
      </h2>

      <p className="mb-6 text-[13px] leading-relaxed text-ink-3">
        Choisissez votre quartier et le point de dépôt le plus pratique.
      </p>

      {/* Placeholder de carte */}
      <div className="relative mb-6 flex h-[160px] items-center justify-center overflow-hidden rounded-lg border-[1.5px] border-gold/14 bg-gradient-to-br from-[#e4ede4] to-[#d4e4d4]">
        <div className="flex flex-col items-center">
          <span className="mb-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-ink shadow-sm">
            {zone ?? 'Barcelone'}
          </span>
          <span className="h-4 w-4 rounded-full border-[3px] border-white bg-gold shadow-[0_2px_8px_rgba(184,147,90,0.5)]" />
        </div>
      </div>

      <p className="mb-2.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-ink-3">
        <span className="h-px w-3.5 bg-gold opacity-50" />
        Choisissez votre zone
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {ZONES.map((z) => {
          const selected = zone === z
          return (
            <button
              key={z}
              type="button"
              onClick={() => onZoneChange(z)}
              className={`rounded-full border-[1.5px] px-4 py-2 text-[13px] transition ${
                selected
                  ? 'border-gold bg-gold-pale text-ink'
                  : 'border-gold/16 bg-white text-ink-2 hover:border-gold hover:bg-gold-pale/40'
              }`}
            >
              {z}
            </button>
          )
        })}
      </div>

      {zone && (
        <div>
          <p className="mb-2.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-ink-3">
            <span className="h-px w-3.5 bg-gold opacity-50" />
            Points de dépôt
          </p>

          <div className="flex flex-col gap-2.5">
            {relays.map((relay) => {
              const selected = dropOffPoint === relay.name
              return (
                <button
                  key={relay.name}
                  type="button"
                  onClick={() => onDropOffChange(relay.name)}
                  className={`flex items-center gap-3 rounded-lg border-[1.5px] px-4 py-3.5 text-left transition ${
                    selected
                      ? 'border-gold bg-gold-pale'
                      : 'border-gold/14 bg-white hover:border-gold'
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-pale">
                    <PinIcon className="text-gold" />
                  </span>

                  <span className="flex-1">
                    <span className="block text-[13px] font-medium text-ink">
                      {relay.name}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] text-ink-3">
                      {relay.address} · {relay.hours}
                    </span>
                  </span>

                  <span
                    className={`h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-white ${
                      selected ? 'flex' : 'hidden'
                    }`}
                  >
                    <CheckIcon />
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
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
  )
}