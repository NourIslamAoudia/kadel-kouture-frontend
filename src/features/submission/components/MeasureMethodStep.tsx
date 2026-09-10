export type MeasureMethod = 'manual' | 'photo'

interface MethodOption {
  value: MeasureMethod
  label: string
  description: string
}

const OPTIONS: MethodOption[] = [
  {
    value: 'manual',
    label: 'Manuel',
    description: 'Introduire mes mesures',
  },
  {
    value: 'photo',
    label: 'Photo 3D',
    description: 'Détection automatique',
  },
]

interface Props {
  value: MeasureMethod | null
  onChange: (value: MeasureMethod) => void
}

export default function MeasureMethodStep({ value, onChange }: Props) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <span className="h-px w-[18px] bg-gold" />
        Mesures
      </p>

      <h2 className="mb-2 font-serif text-3xl font-light leading-tight text-ink">
        Comment souhaitez-vous <em className="italic text-gold">être mesuré</em> ?
      </h2>

      <p className="mb-6 text-[13px] leading-relaxed text-ink-3">
        Choisissez la méthode la plus pratique pour vous.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map((option) => {
          const selected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex flex-col items-center rounded-lg border-[1.5px] px-4 py-6 text-center transition ${
                selected
                  ? 'border-gold bg-gold-pale'
                  : 'border-gold/16 bg-white hover:border-gold'
              }`}
            >
              <MethodIcon type={option.value} className="mb-2.5 text-gold" />
              <span className="text-[13px] font-medium text-ink">
                {option.label}
              </span>
              <span className="mt-0.5 text-[11px] text-ink-3">
                {option.description}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function MethodIcon({
  type,
  className,
}: {
  type: MeasureMethod
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {type === 'manual' ? (
        <>
          <path d="M3 8.5L8.5 3l13 13L16 21.5 3 8.5z" />
          <path d="M8 8l2 2M10.5 5.5l2 2M5.5 10.5l2 2" />
        </>
      ) : (
        <>
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </>
      )}
    </svg>
  )
}