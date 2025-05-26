
import { Button } from "@/components/ui/button";
import { AlertTriangle, Coins } from "lucide-react";

interface StatusBarProps {
  isInTreatment: boolean;
  credits: number;
  debtPoints: number;
  dailyActionsCount: number;
}

const StatusBar = ({ isInTreatment, credits, debtPoints, dailyActionsCount }: StatusBarProps) => {
  if (!isInTreatment && credits >= 3) {
    return null;
  }

  return (
    <div className="mb-12">
      {isInTreatment && (
        <div className="bg-red-600/10 border border-red-600/30 p-6 rounded-xl flex items-center space-x-4 backdrop-blur-sm">
          <AlertTriangle className="text-red-400" size={24} />
          <div className="flex-1">
            <span className="text-red-400 font-bebas text-xl">
              PACIENTE EM TRATAMENTO
            </span>
            <p className="text-warm-gray/80">
              {debtPoints} pontos de dívida • {dailyActionsCount} ações pendentes
            </p>
          </div>
        </div>
      )}
      
      {credits < 3 && (
        <div className="bg-warm-yellow/10 border border-warm-yellow/30 p-6 rounded-xl flex items-center space-x-4 backdrop-blur-sm">
          <Coins className="text-warm-yellow" size={24} />
          <div className="flex-1">
            <span className="text-warm-yellow font-bebas text-xl">
              CRÉDITOS INSUFICIENTES
            </span>
            <p className="text-warm-gray/80">
              Você precisa de pelo menos 3 créditos para começar um teste
            </p>
          </div>
          <Button size="lg" className="bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas text-lg px-6">
            COMPRAR CRÉDITOS
          </Button>
        </div>
      )}
    </div>
  );
};

export default StatusBar;
