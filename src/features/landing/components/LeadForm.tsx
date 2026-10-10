"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { API_URL } from "@shared/lib/api";
import { cx } from "../lib/cx";
import { EASE_OUT } from "../motion/ease";

const EMAIL = /^\S+@\S+\.\S+$/;
const PHONE = /^\+?[\d\s().-]{8,20}$/;

export interface LeadFormCopy {
  channelLabel: string;
  email: string;
  whatsapp: string;
  emailLabel: string;
  whatsappLabel: string;
  emailPlaceholder: string;
  whatsappPlaceholder: string;
  consent: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  invalidEmail: string;
  invalidPhone: string;
  consentRequired: string;
}

/**
 * Captation des indécis (email ou WhatsApp), avec consentement explicite.
 * Le guide lui-même sera envoyé par le service d'emails (Brevo ou Resend).
 */
export function LeadForm({
  copy,
  kind,
  locale,
  tone = "light",
}: {
  copy: LeadFormCopy;
  kind: "guide" | "workshop";
  locale: string;
  /** "dark" : texte clair sur fond foncé */
  tone?: "light" | "dark";
}) {
  const id = useId();
  const [channel, setChannel] = useState<"email" | "whatsapp">("email");
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = contact.trim();
    if (channel === "email" && !EMAIL.test(value)) return setMessage(copy.invalidEmail);
    if (channel === "whatsapp" && !PHONE.test(value)) return setMessage(copy.invalidPhone);
    if (!consent) return setMessage(copy.consentRequired);

    setMessage(null);
    setStatus("sending");
    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, channel, contact: value, consent, locale, website }),
      });
      if (!response.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
      setMessage(copy.error);
    }
  };

  const dark = tone === "dark";

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.p
            key="done"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] italic"
          >
            {copy.success}
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            noValidate
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6"
          >
            <fieldset className="flex flex-wrap items-center gap-3">
              <legend className="sr-only">{copy.channelLabel}</legend>
              {(["email", "whatsapp"] as const).map((option) => (
                <label
                  key={option}
                  className={cx(
                    "cursor-pointer rounded-full px-4 py-2 text-[0.8rem] font-semibold tracking-[0.06em] transition-colors duration-300",
                    channel === option
                      ? dark
                        ? "bg-paper text-night"
                        : "bg-night text-paper"
                      : dark
                        ? "text-paper/70 ring-1 ring-paper/30 hover:text-paper"
                        : "text-night/70 ring-1 ring-night/20 hover:text-night",
                  )}
                >
                  <input
                    type="radio"
                    name={`${id}-channel`}
                    value={option}
                    checked={channel === option}
                    onChange={() => {
                      setChannel(option);
                      setMessage(null);
                    }}
                    className="sr-only"
                  />
                  {option === "email" ? copy.email : copy.whatsapp}
                </label>
              ))}
            </fieldset>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <label className="flex-1">
                <span className="sr-only">{channel === "email" ? copy.emailLabel : copy.whatsappLabel}</span>
                <input
                  type={channel === "email" ? "email" : "tel"}
                  inputMode={channel === "email" ? "email" : "tel"}
                  autoComplete={channel === "email" ? "email" : "tel"}
                  placeholder={channel === "email" ? copy.emailPlaceholder : copy.whatsappPlaceholder}
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  aria-invalid={message === copy.invalidEmail || message === copy.invalidPhone}
                  aria-describedby={message ? `${id}-message` : undefined}
                  className="kk-field"
                />
              </label>
              <button
                type="submit"
                disabled={status === "sending"}
                className={cx("kk-btn kk-btn--small shrink-0 self-start sm:self-auto", dark && "kk-btn--light")}
              >
                <span>{status === "sending" ? copy.sending : copy.submit}</span>
                <span className="kk-btn__icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Champ piège pour les robots : invisible et ignoré par les humains */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              className="absolute -left-[9999px] h-px w-px opacity-0"
              aria-hidden="true"
            />

            <label className="flex max-w-[52ch] cursor-pointer items-start gap-3 text-[0.82rem] leading-relaxed opacity-80">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => {
                  setConsent(event.target.checked);
                  setMessage(null);
                }}
                className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-ochre)]"
              />
              {copy.consent}
            </label>

            <p id={`${id}-message`} role="alert" className="min-h-[1.25rem] text-[0.85rem] font-semibold">
              {message}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
