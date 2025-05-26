
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Calendar } from "lucide-react";
import { DailyAction } from "@/types/user";

interface CheckInSectionProps {
  showCheckIn: boolean;
  progress: any;
  checkInMessage: string;
  pendingActions: DailyAction[];
  completedToday: DailyAction[];
  onDailyCheckIn: () => void;
  onActionComplete: (actionId: string) => void;
}

const CheckInSection = ({
  showCheckIn,
  progress,
  checkInMessage,
  pendingActions,
  completedToday,
  onDailyCheckIn,
  onActionComplete
}: CheckInSectionProps) => {
  if (!showCheckIn && !progress.isInTreatment) return null;

  return (
    <Card className="bg-dark-card border-dark-border mb-8">
      <CardHeader>
        <CardTitle className="text-warm-yellow font-bebas flex items-center space-x-2">
          <Calendar size={24} />
          <span>CHECK-IN DIÁRIO</span>
        </CardTitle>
        <CardDescription className="text-warm-gray/70">
          {progress.checkInStreak > 0 ? `Sequência: ${progress.checkInStreak} dias` : "Faça seu primeiro check-in"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {checkInMessage && (
          <Alert className="bg-green-600/10 border-green-600/30">
            <AlertDescription className="text-green-400">{checkInMessage}</AlertDescription>
          </Alert>
        )}
        
        <Button 
          onClick={onDailyCheckIn}
          className="w-full bg-green-600 hover:bg-green-700 font-bebas tracking-wider"
        >
          ✅ FAZER CHECK-IN DIÁRIO
        </Button>

        {/* Pending Actions */}
        {pendingActions.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-bebas text-warm-gray text-lg">AÇÕES PENDENTES:</h3>
            {pendingActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between bg-dark-bg/50 p-3 rounded border border-dark-border">
                <div className="flex-1">
                  <p className="text-warm-gray font-inter text-sm">{action.description}</p>
                  <Badge className="bg-warm-yellow text-dark-bg text-xs mt-1">+{action.points} pontos</Badge>
                </div>
                <Button
                  onClick={() => onActionComplete(action.id)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 ml-4"
                >
                  <CheckCircle size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Completed Today */}
        {completedToday.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-bebas text-green-400 text-lg">COMPLETADO HOJE:</h3>
            {completedToday.map((action) => (
              <div key={action.id} className="flex items-center space-x-2 text-green-400 text-sm">
                <CheckCircle size={16} />
                <span>{action.description}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckInSection;
