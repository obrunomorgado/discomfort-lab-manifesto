
import { ReactNode } from "react";
import { MobileNavigation } from "./MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

export const MobileLayout = ({ children, showBottomNav = true }: MobileLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-military-bg">
      {/* Main content with bottom padding for mobile nav */}
      <main className={cn(
        "relative",
        showBottomNav && isMobile ? "pb-20" : "pb-4"
      )}>
        {children}
      </main>
      
      {/* Mobile bottom navigation */}
      {showBottomNav && isMobile && <MobileNavigation />}
    </div>
  );
};
