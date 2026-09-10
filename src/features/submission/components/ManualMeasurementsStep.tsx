interface ManualMeasurements {
  chest: string
  waist: string
  hips: string
  height: string
  shoulders: string
  sleeve: string
}

interface Props {
  values: ManualMeasurements
  onChange: (field: keyof ManualMeasurements, value: string) => void
}

const FIELDS: { key: keyof ManualMeasurements; label: string; placeholder: string }[] = [
  { key: 'chest', label: 'Poitrine', placeholder: '96' },
  { key: 'waist', label: 'Taille', placeholder: '80' },
  { key: 'hips', label: 'Hanches', placeholder: '100' },
  { key: 'height', label: 'Hauteur', placeholder: '170' },
  { key: 'shoulders', label: 'Épaules', placeholder: '42' },
  { key: 'sleeve', label: 'Manche', placeholder: '62' },
]

export default function ManualMeasurementsStep({ values, onChange }: Props) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <span className="h-px w-[18px] bg-gold" />
        Mesures manuelles
      </p>

      <h2 className="mb-2 font-serif text-3xl font-light leading-tight text-ink">
        Vos <em className="italic text-gold">mensurations</em>
      </h2>

      <div className="mb-5 flex items-start gap-2.5 rounded-lg border-[1.5px] border-gold/20 bg-gold-pale px-4 py-3.5 text-[12.5px] leading-relaxed text-ink-2">
        <InfoIcon className="mt-px shrink-0 text-gold" />
        <span>
          Introduisez vos mesures en centimètres. Si vous ne les connaissez pas, utilisez plutôt l'option photo.
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {FIELDS.map((field) => (
          <div
            key={field.key}
            className="rounded-lg border-[1.5px] border-gold/16 bg-white px-2.5 py-2.5 text-center transition focus-within:border-gold"
          >
            <label className="mb-1 block text-[9px] uppercase tracking-[0.1em] text-ink-3">
              {field.label}
            </label>
            <input
              type="number"
              value={values[field.key]}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full bg-transparent text-center text-lg font-medium text-ink outline-none placeholder:text-ink/25"
            />
            <span className="text-[9px] text-ink-3/55">cm</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function InfoIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  )
}