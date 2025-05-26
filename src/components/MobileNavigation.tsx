
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Brain, Users, User, Zap } from "lucide-react";
import { useNativeFeatures } from "@/hooks/useNativeFeatures";
import { ImpactStyle } from "@capacitor/haptics";
import { cn } from "@/lib/utils";

export const MobileNavigation = () => {
  const location = useLocation();
  const { triggerHaptic } = useNativeFeatures();

  const navItems = [
    { 
      name: "Comando", 
      path: "/posto-de-comando", 
      icon: Home,
      activeColor: "text-warm-yellow"
    },
    { 
      name: "SemDesculpas", 
      path: "/career-truth-ai", 
      icon: Brain,
      activeColor: "text-cyber-fuchsia"
    },
    { 
      name: "Unbreakable", 
      path: "/unbreakable-mind", 
      icon: Zap,
      activeColor: "text-red-500"
    },
    { 
      name: "Arquiteto", 
      path: "/arquiteto-da-verdade", 
      icon: Users,
      activeColor: "text-green-500"
    },
    { 
      name: "Perfil", 
      path: "/perfil", 
      icon: User,
      activeColor: "text-blue-500"
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = async () => {
    await triggerHaptic(ImpactStyle.Light);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur-sm border-t border-dark-border">
      <div className="flex justify-around items-center py-2 px-2 safe-area-pb">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={handleNavClick}
              className="flex-1 flex flex-col items-center py-2 px-1"
            >
              <div className={cn(
                "flex flex-col items-center transition-all duration-200",
                "min-h-[44px] justify-center" // Minimum touch target
              )}>
                <Icon 
                  size={20} 
                  className={cn(
                    "transition-colors duration-200 mb-1",
                    active ? item.activeColor : "text-warm-gray"
                  )}
                />
                <span className={cn(
                  "text-xs font-inter transition-colors duration-200 text-center",
                  active ? item.activeColor : "text-warm-gray"
                )}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
