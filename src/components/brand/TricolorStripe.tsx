import { cn } from "@/lib/utils";

type TricolorStripeProps = {
  className?: string;
};

export function TricolorStripe({ className }: TricolorStripeProps) {
  return <div className={cn("tricolor-stripe w-full shrink-0", className)} aria-hidden />;
}
