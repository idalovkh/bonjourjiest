import { cn } from "@/lib/utils";

type BrandNameProps = {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "inherit";
  layout?: "inline" | "stacked";
};

const sizeClasses = {
  xs: "text-xs sm:text-sm",
  sm: "text-sm sm:text-base",
  md: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl",
  xl: "text-xl sm:text-2xl",
  inherit: "",
};

export function BrandName({ className, size = "sm", layout = "inline" }: BrandNameProps) {
  if (layout === "stacked") {
    return (
      <span
        className={cn(
          "inline-flex flex-col items-start font-brand font-medium leading-none tracking-normal",
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
    <span className={cn("font-brand font-medium leading-none tracking-normal", size !== "inherit" && sizeClasses[size], className)}>
      <span className="text-secondary">Bonjour</span>
      <span className="text-primary"> жи есть</span>
    </span>
  );
}
