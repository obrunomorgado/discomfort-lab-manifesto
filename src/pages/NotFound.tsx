
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-bebas text-warm-yellow mb-4">404</h1>
        <h2 className="text-3xl font-bebas text-warm-gray mb-4">
          PÁGINA NÃO ENCONTRADA
        </h2>
        <p className="text-warm-gray/60 font-inter mb-8">
          Você tentou acessar uma página que não existe. Até aqui você consegue se perder? 
          Volta pro começo e tenta de novo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button 
              className="bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas text-lg px-6 py-4"
            >
              VOLTAR PARA HOME
            </Button>
          </Link>
          <Link to="/testes">
            <Button 
              variant="outline"
              className="border-warm-yellow text-warm-yellow hover:bg-warm-yellow hover:text-dark-bg font-bebas text-lg px-6 py-4"
            >
              VER TESTES
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
