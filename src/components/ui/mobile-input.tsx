
import * as React from "react";
import { cn } from "@/lib/utils";

export interface MobileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const MobileInput = React.forwardRef<HTMLInputElement, MobileInputProps>(
  ({ className, type, label, error, helper, ...props }, ref) => {
    const inputId = React.useId();

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            "flex h-12 w-full rounded-lg border border-input bg-background px-4 py-3 text-base",
            "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed",
            "disabled:opacity-50 touch-target", // Increased height and touch target
            "md:h-10 md:text-sm", // Smaller on desktop
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive font-medium">{error}</p>
        )}
        {helper && !error && (
          <p className="text-sm text-muted-foreground">{helper}</p>
        )}
      </div>
    );
  }
);
MobileInput.displayName = "MobileInput";

export { MobileInput };
