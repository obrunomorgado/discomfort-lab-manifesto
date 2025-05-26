
import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface MobileModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  className?: string;
}

export function MobileModal({
  children,
  open,
  onOpenChange,
  title,
  description,
  className
}: MobileModalProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className={cn("max-h-[85vh]", className)}>
          {(title || description) && (
            <DrawerHeader className="text-left">
              {title && <DrawerTitle className="font-bebas text-xl">{title}</DrawerTitle>}
              {description && (
                <DrawerDescription className="font-inter text-sm">
                  {description}
                </DrawerDescription>
              )}
            </DrawerHeader>
          )}
          <div className="px-4 pb-4 overflow-y-auto">
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("max-w-lg", className)}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle className="font-bebas text-xl">{title}</DialogTitle>}
            {description && (
              <DialogDescription className="font-inter text-sm">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}
