import { cn } from "@/lib/utils";

type BrandNameProps = {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inherit";
  layout?: "inline" | "stacked";
};

export type { BrandNameProps };

const sizeClasses = {
  xs: "text-xs sm:text-sm",
  sm: "text-sm sm:text-base",
  md: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl",
  xl: "text-xl sm:text-2xl",
  "2xl": "text-2xl sm:text-3xl",
  inherit: "",
};

export function BrandName({ className, size = "sm", layout = "inline" }: BrandNameProps) {
  if (layout === "stacked") {
    return (
      <span
        className={cn(
          "inline-flex flex-col items-start font-brand font-bold leading-none tracking-tight",
          size !== "inherit" && sizeClasses[size],
          className,
        )}
      >
        <span className="block leading-none text-secondary">Bonjour</span>
        <span className="-mt-0.5 ml-[0.55em] block leading-none text-primary">жи есть</span>
      </span>
    );
  }

  return (
    <span className={cn("font-brand font-bold leading-none tracking-tight", size !== "inherit" && sizeClasses[size], className)}>
      <span className="text-secondary">Bonjour</span>
      <span className="text-primary"> жи есть</span>
    </span>
  );
}
