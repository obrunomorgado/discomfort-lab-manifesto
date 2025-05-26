
import * as React from "react";
import { cn } from "@/lib/utils";

export interface MobileTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const MobileTextarea = React.forwardRef<HTMLTextAreaElement, MobileTextareaProps>(
  ({ className, label, error, helper, ...props }, ref) => {
    const textareaId = React.useId();

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={textareaId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            "flex min-h-[120px] w-full rounded-lg border border-input bg-background px-4 py-3 text-base",
            "ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
            "md:min-h-[80px] md:text-sm", // Smaller on desktop
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
MobileTextarea.displayName = "MobileTextarea";

export { MobileTextarea };
