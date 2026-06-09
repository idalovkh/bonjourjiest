import { BRAND_NAME } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { BrandName, type BrandNameProps } from "./BrandName";

type BrandMarkProps = BrandNameProps & {
  dashClassName?: string;
};

export function BrandMark({
  className,
  dashClassName,
  size = "sm",
  layout = "stacked",
  ...brandProps
}: BrandMarkProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2 sm:gap-3", className)}
      role="img"
      aria-label={BRAND_NAME}
    >
      <span className={cn("text-muted-foreground/45 select-none leading-none", dashClassName)} aria-hidden>
        —
      </span>
      <BrandName size={size} layout={layout} {...brandProps} />
      <span className={cn("text-muted-foreground/45 select-none leading-none", dashClassName)} aria-hidden>
        —
      </span>
    </span>
  );
}
