import { BRAND_NAME } from "@/lib/brand";
import { cn } from "@/lib/utils";
import logoIconPng from "@/assets/brand/logo-icon.png";
import logoMarkPng from "@/assets/brand/logo-mark.png";
import logoPng from "@/assets/brand/logo.png";
import { BrandName, type BrandNameProps } from "./BrandName";

type BrandMarkVariant = "text" | "icon" | "iconText" | "logo";

type BrandMarkProps = BrandNameProps & {
  dashClassName?: string;
  brandClassName?: string;
  /** text — только название; icon — PNG-иконка; iconText — эмблема с названием; logo — широкий PNG-логотип */
  variant?: BrandMarkVariant;
  iconClassName?: string;
  markClassName?: string;
  logoClassName?: string;
};

const iconSizeByBrand: Record<NonNullable<BrandNameProps["size"]>, string> = {
  xs: "h-7 w-auto",
  sm: "h-8 w-auto",
  md: "h-9 w-auto sm:h-10",
  lg: "h-12 w-auto sm:h-14",
  xl: "h-14 w-auto sm:h-16",
  "2xl": "h-20 w-auto sm:h-24",
  inherit: "h-9 w-auto",
};

const markSizeByBrand: Record<NonNullable<BrandNameProps["size"]>, string> = {
  xs: "h-10 w-auto",
  sm: "h-12 w-auto",
  md: "h-14 w-auto sm:h-16",
  lg: "h-[4.5rem] w-auto sm:h-20",
  xl: "h-24 w-auto sm:h-28",
  "2xl": "h-28 w-auto sm:h-32 md:h-36",
  inherit: "h-14 w-auto",
};

const logoSizeByBrand: Record<NonNullable<BrandNameProps["size"]>, string> = {
  xs: "h-14 w-auto max-w-[140px]",
  sm: "h-16 w-auto max-w-[160px]",
  md: "h-[4.5rem] w-auto max-w-[200px]",
  lg: "h-24 w-auto max-w-[260px]",
  xl: "h-28 w-auto max-w-[300px]",
  "2xl": "h-32 w-auto max-w-[380px] sm:h-36 sm:max-w-[440px]",
  inherit: "h-24 w-auto max-w-[260px]",
};

function BrandIcon({
  size,
  className,
  iconClassName,
}: {
  size: NonNullable<BrandNameProps["size"]>;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center", className)} aria-hidden>
      <img
        src={logoIconPng}
        alt=""
        className={cn("block object-contain", iconSizeByBrand[size], iconClassName)}
      />
    </span>
  );
}

export function BrandMark({
  className,
  dashClassName,
  brandClassName,
  iconClassName,
  markClassName,
  logoClassName,
  size = "sm",
  layout = "stacked",
  variant = "iconText",
  ...brandProps
}: BrandMarkProps) {
  if (variant === "icon") {
    return (
      <span className={cn("inline-flex", className)} role="img" aria-label={BRAND_NAME}>
        <BrandIcon size={size} iconClassName={iconClassName} />
      </span>
    );
  }

  if (variant === "iconText") {
    return (
      <span className={cn("inline-flex shrink-0 items-center", className)} role="img" aria-label={BRAND_NAME}>
        <img
          src={logoMarkPng}
          alt=""
          className={cn("block object-contain object-left", markSizeByBrand[size], markClassName)}
          aria-hidden
        />
      </span>
    );
  }

  if (variant === "logo") {
    return (
      <span className={cn("inline-flex", className)} role="img" aria-label={BRAND_NAME}>
        <img
          src={logoPng}
          alt=""
          className={cn("object-contain object-left", logoSizeByBrand[size], logoClassName)}
          aria-hidden
        />
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex items-center gap-2 sm:gap-3", className)}
      role="img"
      aria-label={BRAND_NAME}
    >
      <span className={cn("text-foreground/25 select-none leading-none", dashClassName)} aria-hidden>
        —
      </span>
      <BrandName size={size} layout={layout} className={brandClassName} {...brandProps} />
      <span className={cn("text-foreground/25 select-none leading-none", dashClassName)} aria-hidden>
        —
      </span>
    </span>
  );
}
