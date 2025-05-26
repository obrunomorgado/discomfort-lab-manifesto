
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useUserProgress } from "@/hooks/useUserProgress";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { progress } = useUserProgress();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Testes", path: "/testes" },
    { name: "Sem Desculpas IA", path: "/career-truth-ai" },
    { name: "Arquiteto da Verdade", path: "/arquiteto-da-verdade" },
    { name: "Unbreakable Mind", path: "/unbreakable-mind" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="relative z-50 border-b border-dark-border bg-dark-bg/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bebas text-warm-yellow tracking-wider">
            SALA DO DESCONFORTO
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
  );
};
