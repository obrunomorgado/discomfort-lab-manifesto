
import { Button } from "@/components/ui/button";
import { AlertTriangle, Coins } from "lucide-react";
import { MedicalProgress } from "@/types/user";

interface EmergencyConsultationButtonProps {
  medicalProgress: MedicalProgress;
  credits: number;
  isInTreatment: boolean;
  onEmergencyConsultation: () => void;
}

const EmergencyConsultationButton = ({ 
  medicalProgress, 
  credits, 
  isInTreatment,
  onEmergencyConsultation 
}: EmergencyConsultationButtonProps) => {
  const emergencyConsultationCost = 10; // Custa 10 créditos para consulta de emergência
  const canAffordEmergency = credits >= emergencyConsultationCost;
  
  // Mostra o botão se:
  // 1. Está em tratamento (tem ações pendentes) OU
  // 2. Sistema está bloqueado após 5 consultas
  const shouldShowEmergencyButton = isInTreatment || medicalProgress.isBlocked;

  if (!shouldShowEmergencyButton) {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-red-600/10 border border-red-500/30 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="text-red-400" size={24} />
          <div>
            <h3 className="text-red-400 font-bebas text-lg">CONSULTA DE EMERGÊNCIA</h3>
            <p className="text-warm-gray/70 text-sm">
              {medicalProgress.isBlocked 
                ? "Sistema bloqueado - apenas consultas de emergência disponíveis"
                : "Realizar nova consulta fora do cronograma"
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-warm-yellow">
            <Coins size={16} />
            <span className="font-bebas">{emergencyConsultationCost} CRÉDITOS</span>
          </div>
          
          <Button
            onClick={onEmergencyConsultation}
            disabled={!canAffordEmergency}
            className={`font-bebas ${
              canAffordEmergency 
                ? "bg-red-600 hover:bg-red-700 text-white" 
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            {canAffordEmergency ? "EMERGÊNCIA" : "SEM CRÉDITOS"}
          </Button>
        </div>
      </div>
      
      {!canAffordEmergency && (
        <p className="text-red-400/70 text-xs mt-2">
          Você precisa de {emergencyConsultationCost} créditos para uma consulta de emergência
        </p>
      )}
    </div>
  );
};

export default EmergencyConsultationButton;
