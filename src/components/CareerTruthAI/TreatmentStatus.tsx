
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle } from "lucide-react";
import { UserProgress } from "@/types/user";

interface TreatmentStatusProps {
  progress: UserProgress;
}

const TreatmentStatus = ({ progress }: TreatmentStatusProps) => {
  const getProgressPercentage = () => {
    if (progress.debtPoints === 0) return 100;
    const totalDebt = progress.testsCompleted
      .filter(t => t.debtPointsGenerated)
      .reduce((sum, t) => sum + (t.debtPointsGenerated || 0), 0);
    return totalDebt > 0 ? ((totalDebt - progress.debtPoints) / totalDebt) * 100 : 0;
  };

  if (!progress.isInTreatment) return null;

  return (
    <Card className="bg-red-600/10 border-red-600/30 mb-8">
      <CardHeader>
        <CardTitle className="text-red-400 font-bebas flex items-center space-x-2">
          <AlertTriangle size={24} />
          <span>PACIENTE EM TRATAMENTO</span>
        </CardTitle>
        <CardDescription className="text-warm-gray/80">
          Dívida atual: {progress.debtPoints} pontos | Progresso para alta médica
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={getProgressPercentage()} className="mb-4" />
        <div className="flex justify-between text-sm text-warm-gray/60">
          <span>Dívida de Autossabotagem</span>
          <span>{progress.debtPoints === 0 ? "CURADO! 🏥" : `${progress.debtPoints} pontos restantes`}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentStatus;
