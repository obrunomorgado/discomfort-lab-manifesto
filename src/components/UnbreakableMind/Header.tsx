
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Link 
        to="/testes" 
        className="text-warm-gray hover:text-warm-yellow transition-colors"
      >
        <ArrowLeft size={24} />
      </Link>
      <div className="relative">
        <div className="absolute inset-0 bg-red-600/10 blur-3xl rounded-full"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-red-600 text-white font-bebas text-xs animate-pulse">
              CONFRONTO EXTREMO
            </Badge>
            <h1 className="text-4xl font-bebas text-warm-gray tracking-wider">
              UNBREAKABLE MIND
            </h1>
          </div>
          <p className="text-warm-gray/60 font-inter italic">
            "David Goggins está esperando você na sala. Prepare-se para o confronto da sua vida."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
