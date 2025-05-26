
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, DollarSign, Lock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MedicalProgress } from "@/types/user";

interface MedicalStatusBarProps {
  medicalProgress: MedicalProgress;
  onShowMedicalHistory: () => void;
  onShowSubornModal: () => void;
}

const MedicalStatusBar = ({ 
  medicalProgress, 
  onShowMedicalHistory, 
  onShowSubornModal 
}: MedicalStatusBarProps) => {
  return (
    <div className="bg-dark-card/50 border border-warm-yellow/20 rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Badge className="bg-warm-yellow/20 text-warm-yellow font-bebas">
            CONSULTA {medicalProgress.currentTestNumber + 1}/5
          </Badge>
          <div className="text-sm text-warm-gray/70">
            Score Médio: <span className="text-warm-yellow font-bebas">{Math.round(medicalProgress.averageScore)}/100</span>
          </div>
          <div className="text-sm text-warm-gray/70">
            Tendência: <span className={`font-bebas ${
              medicalProgress.evolutionTrend === 'improving' ? 'text-green-400' :
              medicalProgress.evolutionTrend === 'declining' ? 'text-red-400' : 'text-yellow-400'
            }`}>
              {medicalProgress.evolutionTrend === 'improving' ? 'MELHORANDO' :
               medicalProgress.evolutionTrend === 'declining' ? 'PIORANDO' : 'ESTÁVEL'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            onClick={onShowMedicalHistory}
            variant="outline"
            size="sm"
            className="border-warm-yellow/50 text-warm-yellow hover:bg-warm-yellow/20 font-bebas"
          >
            <FileText size={16} className="mr-2" />
            PRONTUÁRIO
          </Button>
          
          {medicalProgress.nextAppointment && !medicalProgress.isBlocked && (
            <div className="flex items-center space-x-2 text-sm text-warm-gray/70">
              <Calendar size={16} className="text-warm-yellow" />
              <span>Próxima: {format(medicalProgress.nextAppointment, 'dd/MM', { locale: ptBR })}</span>
            </div>
          )}
          
          {medicalProgress.isBlocked && medicalProgress.canSuborn && (
            <Button
              onClick={onShowSubornModal}
              size="sm"
              className="bg-red-600/20 border border-red-500/50 text-red-400 hover:bg-red-600/30 font-bebas"
            >
              <DollarSign size={16} className="mr-2" />
              SUBORNO
            </Button>
          )}
          
          {medicalProgress.isBlocked && !medicalProgress.canSuborn && (
            <Badge className="bg-green-600/20 text-green-400 font-bebas">
              <Lock size={16} className="mr-2" />
              CURADO
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalStatusBar;
