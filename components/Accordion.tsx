"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { ReactNode, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export type AccordionItemData = {
  id: string;
  /** Small uppercase label, e.g. "01 · La Composition" */
  label: string;
  /** Body — string or rich ReactNode. Strings get standard muted-ink typography. */
  content: ReactNode;
};

type Props = {
  items: AccordionItemData[];
  /** Item id that should be open initially. Default: none. */
  defaultOpen?: string;
  /** If true, more than one item can be open at the same time. Default: false. */
  allowMultiple?: boolean;
  className?: string;
};

/**
 * Accordion — editorial, luxury-restraint accordion.
 * Hairline dividers, tiny plus icon that rotates into a minus on open,
 * smooth height animation via framer-motion.
 */
export default function Accordion({
  items,
  defaultOpen,
  allowMultiple = false,
  className = "",
}: Props) {
  const [open, setOpen] = useState<Set<string>>(
    defaultOpen ? new Set([defaultOpen]) : new Set(),
  );

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        return next;
      }
      if (!allowMultiple) next.clear();
      next.add(id);
      return next;
    });
  }

  return (
    <div
      className={`border-t border-border-soft ${className}`.trim()}
      role="list"
    >
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const panelId = `accordion-panel-${item.id}`;
        const triggerId = `accordion-trigger-${item.id}`;

        return (
          <div
            key={item.id}
            role="listitem"
            className="border-b border-border-soft"
          >
            <h3 className="m-0">
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="group flex w-full items-center justify-between gap-6 py-7 text-left transition-colors duration-500 hover:text-dark-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory sm:py-8"
              >
                <span className="text-[11px] uppercase tracking-[0.38em] text-onyx transition-colors duration-500 group-hover:text-dark-gold sm:text-[12px]">
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className={`relative inline-flex h-9 w-9 shrink-0 items-center justify-center border border-onyx/15 transition-all duration-500 ${
                    isOpen
                      ? "bg-onyx text-ivory"
                      : "bg-transparent text-onyx group-hover:border-dark-gold group-hover:text-dark-gold"
                  }`}
                >
                  <Plus
                    className={`h-3.5 w-3.5 transition-transform duration-500 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                    strokeWidth={1.5}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease }}
                  className="overflow-hidden"
                >
                  <div className="pb-10 pr-2 pt-1 text-[14px] leading-[1.9] text-muted-ink sm:pb-12 sm:text-[15px]">
                    {typeof item.content === "string" ? (
                      <p className="max-w-[60ch]">{item.content}</p>
                    ) : (
                      item.content
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
