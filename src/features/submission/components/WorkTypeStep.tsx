import type { WorkType } from '../types'

interface WorkOption {
  value: WorkType
  label: string
  description: string
}

const OPTIONS: WorkOption[] = [
  {
    value: 'retouche',
    label: 'Retouche',
    description: 'Ourlets, ajustements, coutures',
  },
  {
    value: 'reparation',
    label: 'Réparation',
    description: 'Trous, fermetures éclair, boutons',
  },
  {
    value: 'personnalisation',
    label: 'Personnalisation',
    description: 'Broderies, impressions, logos',
  },
  {
    value: 'upcycling',
    label: 'Upcycling',
    description: 'Transformation créative',
  },
]

interface Props {
  value: WorkType | null
  onChange: (value: WorkType) => void
}

export default function WorkTypeStep({ value, onChange }: Props) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <span className="h-px w-[18px] bg-gold" />
        Prestation
      </p>

      <h2 className="mb-2 font-serif text-3xl font-light leading-tight text-ink">
        Quel type de <em className="italic text-gold">travail</em> ?
      </h2>

      <p className="mb-6 text-[13px] leading-relaxed text-ink-3">
        Sélectionnez la prestation la plus proche de votre besoin.
      </p>

      <div className="flex flex-col gap-2.5">
        {OPTIONS.map((option) => {
          const selected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex items-center gap-3 rounded-full border-[1.5px] px-4 py-3 text-left transition ${
                selected
                  ? 'border-gold bg-gold-pale'
                  : 'border-gold/16 bg-white hover:border-gold hover:bg-gold-pale/40'
              }`}
            >
              <WorkIcon type={option.value} className="shrink-0 text-gold" />

              <span className="flex-1">
                <span className="block text-[13.5px] font-medium text-ink">
                  {option.label}
                </span>
                <span className="block text-[11px] text-ink-3">
                  {option.description}
                </span>
              </span>

              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-white ${
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
  )
}

function WorkIcon({ type, className }: { type: WorkType; className?: string }) {
  const paths: Record<WorkType, React.ReactNode> = {
    retouche: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
      </>
    ),
    reparation: (
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    ),
    personnalisation: (
      <>
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </>
    ),
    upcycling: (
      <>
        <path d="M4 12a8 8 0 0 1 14.93-4M20 12a8 8 0 0 1-14.93 4" />
        <path d="M18 4v4h-4M6 20v-4h4" />
      </>
    ),
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[type]}
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