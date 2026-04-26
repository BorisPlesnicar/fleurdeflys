import { ElementType, ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  as?: ElementType;
  id?: string;
  bleed?: boolean;
  size?: "default" | "sm" | "lg";
};

/**
 * Section — unified spacing + container primitive.
 *
 * Every page uses <Section> (or a specialized hero) so that vertical rhythm
 * and horizontal gutters stay identical across the site.
 *
 *   Mobile:  py-16  px-5
 *   SM:      py-20  px-8
 *   LG:      py-28 / py-32  px-14
 *
 * max-width: 1280 px (≈ max-w-7xl) — aligned to the luxury editorial feel.
 */
export default function Section({
  children,
  className = "",
  containerClassName = "",
  as: Tag = "section",
  id,
  bleed = false,
  size = "default",
}: SectionProps) {
  const padding =
    size === "sm"
      ? "py-14 sm:py-20 lg:py-24"
      : size === "lg"
        ? "py-20 sm:py-28 lg:py-40"
        : "py-16 sm:py-24 lg:py-32";

  return (
    <Tag
      id={id}
      className={`relative ${padding} ${className}`.trim()}
    >
      {bleed ? (
        children
      ) : (
        <div
          className={`mx-auto max-w-[1280px] px-4 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-8 sm:pl-8 sm:pr-8 lg:px-14 ${containerClassName}`.trim()}
        >
          {children}
        </div>
      )}
    </Tag>
  );
}
