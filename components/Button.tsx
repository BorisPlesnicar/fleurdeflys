import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  ButtonHTMLAttributes,
  ComponentType,
  ReactNode,
  forwardRef,
} from "react";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  iconPosition?: "start" | "end";
  fullWidth?: boolean;
  className?: string;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsLink = CommonProps & {
  href: string;
  /** Open external link in a new tab. */
  external?: boolean;
};

type ButtonProps = AsButton | AsLink;

const BASE =
  "group relative inline-flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.36em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:cursor-not-allowed disabled:opacity-50";

const SIZES: Record<Size, string> = {
  md: "h-12 px-7",
  lg: "h-14 px-10",
};

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-onyx text-ivory hover:bg-dark-gold",
  secondary:
    "bg-transparent text-onyx border border-onyx/20 hover:border-dark-gold hover:text-dark-gold",
  ghost:
    "bg-transparent text-onyx hover:text-dark-gold",
  onDark:
    "bg-transparent text-soft-gold border border-soft-gold/60 hover:bg-soft-gold hover:text-onyx",
};

function InnerContent({
  children,
  Icon,
  iconPosition = "end",
}: {
  children: ReactNode;
  Icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  iconPosition?: "start" | "end";
}) {
  const I = Icon ?? ArrowUpRight;
  return (
    <>
      {iconPosition === "start" && Icon && (
        <I
          className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      )}
      <span>{children}</span>
      {iconPosition === "end" && Icon && (
        <I
          className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      )}
    </>
  );
}

/**
 * Button — single source of truth for CTA styling across the site.
 * Usage:
 *   <Button href="/shop" variant="primary" icon={ArrowUpRight}>Discover</Button>
 *   <Button type="submit" variant="secondary">Submit</Button>
 */
const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  props,
  ref,
) {
  const {
    variant = "primary",
    size = "lg",
    icon: Icon,
    iconPosition = "end",
    fullWidth,
    className = "",
    children,
  } = props;

  const cls = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${
    fullWidth ? "w-full" : ""
  } ${className}`.trim();

  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={cls}
      >
        <InnerContent Icon={Icon} iconPosition={iconPosition}>
          {children}
        </InnerContent>
      </Link>
    );
  }

  const { href: _href, ...rest } =
    props as AsButton & { href?: undefined };

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cls}
      {...rest}
    >
      <InnerContent Icon={Icon} iconPosition={iconPosition}>
        {children}
      </InnerContent>
    </button>
  );
});

export default Button;
