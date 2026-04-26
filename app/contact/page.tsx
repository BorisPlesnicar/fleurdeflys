import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — FLEUR DE LYS",
  description:
    "Kontakt zur Maison FLEUR DE LYS — Kundenberatung, Wholesale-Anfragen und persönliche Termine.",
};

const INFO_CARDS = [
  {
    icon: Mail,
    eyebrow: "Customer Care",
    title: "Persönliche Beratung",
    lines: [
      "care@fleurdelys.paris",
      "Lun – Ven · 10h – 18h CET",
    ],
  },
  {
    icon: Building2,
    eyebrow: "Wholesale · Press",
    title: "Maison & Business",
    lines: [
      "business@fleurdelys.paris",
      "Termine nach Vereinbarung",
    ],
  },
  {
    icon: Phone,
    eyebrow: "Boutique Paris",
    title: "12 Rue de la Paix",
    lines: [
      "+33 (0)1 40 00 00 00",
      "75002 Paris · France",
    ],
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col bg-ivory text-onyx">
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Prenez Contact"
          title={
            <>
              Parlons <span className="italic">parfum.</span>
            </>
          }
          subtitle="Ob persönliche Beratung, Wholesale-Anfrage oder ein stiller Termin in unserer Boutique — wir antworten gerne, und zwar leise."
        />

        {/* Form + info */}
        <Section size="lg">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <p className="eyebrow">Nachricht senden</p>
              <h2 className="display-headline mt-8 text-[36px] text-onyx sm:text-[44px] lg:text-[52px]">
                Schreiben Sie uns
                <br />
                <span className="italic text-dark-gold">ein paar Zeilen.</span>
              </h2>

              <div className="mt-12">
                <ContactForm />
              </div>
            </div>

            <aside className="lg:col-span-5">
              <p className="eyebrow">Direct</p>
              <h3 className="display-headline mt-8 text-[32px] text-onyx sm:text-[40px]">
                Die schnellen
                <br />
                <span className="italic text-dark-gold">Wege.</span>
              </h3>

              <div className="mt-12 space-y-6">
                {INFO_CARDS.map((card) => (
                  <article
                    key={card.eyebrow}
                    className="group border border-border-soft bg-ivory p-8 transition-all duration-500 hover:border-soft-gold/50 hover:shadow-[var(--shadow-gold)] sm:p-10"
                  >
                    <div className="flex items-start gap-6">
                      <card.icon
                        className="h-5 w-5 shrink-0 text-dark-gold"
                        strokeWidth={1.25}
                      />
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.38em] text-dark-gold">
                          {card.eyebrow}
                        </p>
                        <h4 className="mt-4 font-display text-[24px] leading-tight text-onyx">
                          {card.title}
                        </h4>
                        <div className="mt-5 space-y-1.5 text-[13.5px] leading-[1.7] text-muted-ink">
                          {card.lines.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                        <div className="mt-7 h-px w-8 bg-soft-gold/60 transition-all duration-500 group-hover:w-16" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </Section>

        {/* Boutique visiting card */}
        <Section className="bg-onyx text-ivory" size="default">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="eyebrow-light">La Boutique</p>
              <h2 className="display-headline mt-6 text-[36px] sm:text-[44px] lg:text-[54px]">
                Besuchen Sie uns
                <br />
                <span className="italic text-soft-gold">in Paris.</span>
              </h2>
              <p className="mt-8 max-w-lg text-[14px] leading-[1.85] text-ivory/70 sm:text-[15px]">
                Unsere Flagship-Boutique in der Rue de la Paix ist der stillste
                Raum, den wir kennen. Termine für private Duftberatungen nehmen
                wir gerne per E-Mail entgegen.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="border border-ivory/15 p-8 sm:p-12">
                <p className="text-[10px] uppercase tracking-[0.38em] text-soft-gold">
                  Öffnungszeiten
                </p>
                <dl className="mt-8 space-y-4 text-ivory/85">
                  <div className="flex items-baseline justify-between gap-6">
                    <dt className="text-[13px]">Lundi – Vendredi</dt>
                    <dd className="font-display text-[18px] tabular-nums">
                      10h — 19h
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6">
                    <dt className="text-[13px]">Samedi</dt>
                    <dd className="font-display text-[18px] tabular-nums">
                      11h — 18h
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6">
                    <dt className="text-[13px]">Dimanche</dt>
                    <dd className="font-display text-[18px] italic text-ivory/60">
                      sur rendez-vous
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
