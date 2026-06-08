import { Loader2 } from "lucide-react";

import { cn } from "@/utils/cn";

const sizes = {
  sm: "size-4",
  md: "size-8",
  lg: "size-16",
  xl: "size-24",
} as const;

export type SpinnerProps = {
  size?: keyof typeof sizes;
  className?: string;
};

export const Spinner = ({ size = "md", className }: SpinnerProps) => {
  return (
    <Loader2
      className={cn(
        "animate-spin text-muted-foreground",
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
};
