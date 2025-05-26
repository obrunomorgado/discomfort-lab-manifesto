
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useUserProgress } from "@/hooks/useUserProgress";
import CreditCounter from "@/components/Credits/CreditCounter";
import CheckoutModal from "@/components/Credits/CheckoutModal";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const location = useLocation();
  const { progress, addCredits } = useUserProgress();

  const navItems = [
    { name: "Posto de Comando", path: "/posto-de-comando" },
    { name: "Desconfortos", path: "/testes" },
    { name: "Sem Desculpas IA", path: "/career-truth-ai" },
    { name: "Arquiteto da Verdade", path: "/arquiteto-da-verdade" },
    { name: "Unbreakable Mind", path: "/unbreakable-mind" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handlePurchase = (packageId: string, credits: number) => {
    addCredits(credits, `Compra do pacote ${packageId}`, 'purchase');
  };

  return (
    <>
      <nav className="relative z-50 border-b border-dark-border bg-dark-bg/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/posto-de-comando" className="text-2xl font-bebas text-warm-yellow tracking-wider">
              SALA DO DESCONFORTO
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-inter font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-warm-yellow"
                      : "text-warm-gray hover:text-warm-yellow"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Credit Counter */}
              <CreditCounter 
                credits={progress.credits} 
                onClick={() => setIsCheckoutOpen(true)}
              />
              
              {/* Profile Button */}
              <Link to="/perfil">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-warm-gray hover:text-warm-yellow flex items-center space-x-2 ${
                    isActive("/perfil") ? "text-warm-yellow" : ""
                  }`}
                >
                  <User size={18} />
                  <span className="hidden lg:inline">Nível {progress.level}</span>
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <CreditCounter 
                credits={progress.credits} 
                onClick={() => setIsCheckoutOpen(true)}
              />
              <Link to="/perfil">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-warm-gray hover:text-warm-yellow"
                >
                  <User size={18} />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-warm-gray hover:text-warm-yellow"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-dark-border">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-inter font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? "text-warm-yellow"
                        : "text-warm-gray hover:text-warm-yellow"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/perfil"
                  onClick={() => setIsOpen(false)}
                  className={`font-inter font-medium transition-colors duration-200 flex items-center space-x-2 ${
                    isActive("/perfil")
                      ? "text-warm-yellow"
                      : "text-warm-gray hover:text-warm-yellow"
                  }`}
                >
                  <User size={18} />
                  <span>Perfil - Nível {progress.level}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onPurchase={handlePurchase}
      />
    </>
  );
};
