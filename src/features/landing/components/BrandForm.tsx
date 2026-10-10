"use client";

import { useState } from "react";
import { API_URL } from "@shared/lib/api";
import type { LandingDictionary } from "../i18n/fr";

const EMAIL = /^\S+@\S+\.\S+$/;

/** N — Formulaire court pour les marques : nom, marque, email, besoin (POST /api/brand-requests). */
export function BrandForm({ copy }: { copy: LandingDictionary["brands"] }) {
  const [values, setValues] = useState({
    fullName: "",
    brand: "",
    email: "",
    need: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  const update =
    (field: keyof typeof values) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      setMessage(null);
    };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid =
      values.fullName.trim().length >= 2 &&
      values.brand.trim().length >= 1 &&
      EMAIL.test(values.email.trim()) &&
      values.need.trim().length >= 5;
    if (!valid) return setMessage(copy.invalid);

    setStatus("sending");
    try {
      const response = await fetch(`${API_URL}/api/brand-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
      setMessage(copy.error);
    }
  };

  const fields = [
    {
      name: "fullName" as const,
      label: copy.fields.name,
      type: "text",
      autoComplete: "name",
    },
    {
      name: "brand" as const,
      label: copy.fields.brand,
      type: "text",
      autoComplete: "organization",
    },
    {
      name: "email" as const,
      label: copy.fields.email,
      type: "email",
      autoComplete: "email",
    },
  ];

  return (
    <>
      {status === "done" ? (
        <p
          role="status"
          className="kk-fade-in font-display text-[clamp(1.6rem,2.4vw,2.1rem)] italic"
        >
          {copy.success}
        </p>
      ) : (
        <form onSubmit={submit} noValidate className="relative grid gap-9">
          <div className="grid gap-9 sm:grid-cols-2">
            {fields.map((field) => (
              <label
                key={field.name}
                className={field.name === "email" ? "sm:col-span-2" : undefined}
              >
                <span className="kk-caps text-kk-ink/70">{field.label}</span>
                <input
                  type={field.type}
                  autoComplete={field.autoComplete}
                  value={values[field.name]}
                  onChange={update(field.name)}
                  className="kk-field border-kk-ink/30"
                />
              </label>
            ))}
            <label className="sm:col-span-2">
              <span className="kk-caps text-kk-ink/70">{copy.fields.need}</span>
              <textarea
                rows={3}
                placeholder={copy.needPlaceholder}
                value={values.need}
                onChange={update("need")}
                className="kk-field border-kk-ink/30"
              />
            </label>
          </div>

          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={update("website")}
            className="absolute -left-[9999px] h-px w-px opacity-0"
            aria-hidden="true"
          />

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="submit"
              disabled={status === "sending"}
              className="kk-btn"
            >
              <span>{status === "sending" ? copy.sending : copy.submit}</span>
              <span className="kk-btn__line" aria-hidden="true" />
            </button>
            <p role="alert" className="text-[0.88rem] font-semibold">
              {message}
            </p>
          </div>
        </form>
      )}
    </>
  );
}
