
import * as React from "react";
import { cn } from "@/lib/utils";

const MobileCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    pressable?: boolean;
    swipeable?: boolean;
  }
>(({ className, pressable = false, swipeable = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border bg-card text-card-foreground shadow-lg",
      "touch-target min-h-[88px]", // Minimum touch target
      pressable && "active:scale-95 transition-transform duration-150",
      swipeable && "select-none",
      "mobile-full-width", // Full width on mobile
      className
    )}
    {...props}
  />
));
MobileCard.displayName = "MobileCard";

const MobileCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)}
    {...props}
  />
));
MobileCardHeader.displayName = "MobileCardHeader";

const MobileCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight",
      "md:text-2xl", // Larger on desktop
      className
    )}
    {...props}
  />
));
MobileCardTitle.displayName = "MobileCardTitle";

const MobileCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
MobileCardDescription.displayName = "MobileCardDescription";

const MobileCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("p-6 pt-0", className)} 
    {...props} 
  />
));
MobileCardContent.displayName = "MobileCardContent";

const MobileCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0 space-x-3", className)}
    {...props}
  />
));
MobileCardFooter.displayName = "MobileCardFooter";

export { 
  MobileCard, 
  MobileCardHeader, 
  MobileCardFooter, 
  MobileCardTitle, 
  MobileCardDescription, 
  MobileCardContent 
};
