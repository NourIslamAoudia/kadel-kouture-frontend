"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { LandingCopy } from "../content/fr";
import { EASE_OUT } from "../motion/ease";

const EMAIL = /^\S+@\S+\.\S+$/;

/** 5.13 — Formulaire court pour les marques : nom, marque, email, besoin. */
export function BrandForm({ copy }: { copy: LandingCopy["brands"] }) {
  const [values, setValues] = useState({ fullName: "", brand: "", email: "", need: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const update = (field: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await fetch("/api/brand-requests", {
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
    { name: "fullName" as const, label: copy.fields.name, type: "text", autoComplete: "name" },
    { name: "brand" as const, label: copy.fields.brand, type: "text", autoComplete: "organization" },
    { name: "email" as const, label: copy.fields.email, type: "email", autoComplete: "email" },
  ];

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "done" ? (
        <motion.p
          key="done"
          role="status"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="font-display text-[clamp(1.6rem,2.4vw,2.1rem)] italic"
        >
          {copy.success}
        </motion.p>
      ) : (
        <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="grid gap-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className={field.name === "email" ? "sm:col-span-2" : undefined}>
                <span className="text-[0.68rem] font-semibold tracking-[0.2em] text-night/55 uppercase">
                  {field.label}
                </span>
                <input
                  type={field.type}
                  autoComplete={field.autoComplete}
                  value={values[field.name]}
                  onChange={update(field.name)}
                  className="kk-field border-night/30"
                />
              </label>
            ))}
            <label className="sm:col-span-2">
              <span className="text-[0.68rem] font-semibold tracking-[0.2em] text-night/55 uppercase">
                {copy.fields.need}
              </span>
              <textarea
                rows={3}
                placeholder={copy.needPlaceholder}
                value={values.need}
                onChange={update("need")}
                className="kk-field border-night/30"
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
            <button type="submit" disabled={status === "sending"} className="kk-btn">
              <span>{status === "sending" ? copy.sending : copy.submit}</span>
              <span className="kk-btn__icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <p role="alert" className="text-[0.85rem] font-semibold text-terracotta">
              {message}
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
