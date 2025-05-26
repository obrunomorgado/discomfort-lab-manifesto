
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap } from "lucide-react";

const WarningAlert = () => {
  return (
    <Alert className="bg-yellow-600/10 border-yellow-600/30 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/5 to-transparent"></div>
      <AlertDescription className="relative z-10">
        <div className="flex items-start space-x-3">
          <Zap size={24} className="text-yellow-400 animate-pulse" />
          <div>
            <strong className="text-yellow-400 font-bebas">GOGGINS ADVERTE:</strong>
            <p className="text-warm-gray/80 font-inter mt-1">
              "Eu não sou seu terapeuta. Não sou seu amigo. Sou o espelho que vai mostrar 
              quem você realmente é. Se veio aqui procurando carinho, pode dar meia volta e sair."
            </p>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default WarningAlert;
