interface ClientInfo {
  fullName: string;
  phone: string;
  email: string;
  comment: string;
}

interface Props {
  values: ClientInfo;
  onChange: (field: keyof ClientInfo, value: string) => void;
}

export default function ClientInfoStep({ values, onChange }: Props) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <span className="h-px w-[18px] bg-gold" />
        Vos coordonnées
      </p>

      <h2 className="mb-2 font-serif text-3xl font-light leading-tight text-ink">
        Pour vous <em className="italic text-gold">recontacter</em>
      </h2>

      <p className="mb-6 text-[13px] leading-relaxed text-ink-3">
        Ces informations servent uniquement au suivi de votre commande.
      </p>

      <div className="flex flex-col gap-4">
        <Field
          label="Nom complet"
          type="text"
          value={values.fullName}
          onChange={(v) => onChange("fullName", v)}
          placeholder="Maria García"
        />

        <Field
          label="Téléphone"
          type="tel"
          value={values.phone}
          onChange={(v) => onChange("phone", v)}
          placeholder="+34 6xx xxx xxx"
        />

        <Field
          label="Email"
          type="email"
          value={values.email}
          onChange={(v) => onChange("email", v)}
          placeholder="vous@email.com"
        />

        <div>
          <label className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-ink-3">
            Commentaire libre (optionnel)
          </label>
          <textarea
            value={values.comment}
            onChange={(e) => onChange("comment", e.target.value)}
            placeholder="Décrivez des détails supplémentaires pour l'artisan..."
            className="min-h-[80px] w-full resize-none rounded-lg border-[1.5px] border-gold/20 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold focus:shadow-[0_0_0_3px_rgba(184,147,90,0.11)]"
          />
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.14em] text-ink-3">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border-[1.5px] border-gold/20 bg-white px-[18px] py-3 text-[15px] text-ink outline-none transition focus:border-gold focus:shadow-[0_0_0_3px_rgba(184,147,90,0.11)]"
      />
    </div>
  );
}
