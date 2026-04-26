"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
};

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  placeholder,
}: FieldProps) {
  const shared =
    "peer block w-full border-0 border-b border-onyx/15 bg-transparent py-4 text-[15px] text-onyx placeholder:text-onyx/30 focus:border-dark-gold focus:outline-none focus:ring-0 transition-colors duration-300";

  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.38em] text-muted-ink/80">
        {label}
        {required && <span className="ml-1 text-dark-gold">·</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={5}
          required={required}
          placeholder={placeholder}
          className={`${shared} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={shared}
        />
      )}
    </label>
  );
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Pure UI form — no backend.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="flex flex-col items-start gap-6 border border-border-soft bg-ivory-soft/60 p-10 sm:p-14"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dark-gold/40 text-dark-gold">
          <Check className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div>
          <p className="eyebrow">Merci</p>
          <h3 className="mt-4 font-display text-[30px] leading-tight text-onyx sm:text-[36px]">
            Ihre Nachricht ist angekommen.
          </h3>
          <p className="mt-5 max-w-md text-[14px] leading-[1.8] text-muted-ink">
            Wir antworten in der Regel innerhalb von zwei Werktagen — aus
            unserem Atelier in Paris.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.34em] text-onyx transition-colors hover:text-dark-gold"
        >
          Weitere Nachricht senden
          <span className="h-px w-5 bg-current transition-all duration-500 group-hover:w-10" />
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Field label="Name" name="name" required placeholder="Votre nom" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          placeholder="vous@maison.fr"
        />
      </div>

      <Field
        label="Subject"
        name="subject"
        required
        placeholder="Beratung, Presse, Boutique …"
      />

      <Field
        label="Message"
        name="message"
        required
        textarea
        placeholder="Erzählen Sie uns, worum es geht."
      />

      <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] leading-[1.7] text-muted-ink/80">
          Ihre Daten bleiben in unserer Maison. Keine Weitergabe an Dritte.
        </p>
        <button
          type="submit"
          className="group inline-flex h-14 items-center justify-center gap-3 bg-onyx px-10 text-[11px] uppercase tracking-[0.36em] text-ivory transition-colors duration-500 hover:bg-dark-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
        >
          Send Message
          <ArrowRight
            className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </button>
      </div>
    </form>
  );
}
