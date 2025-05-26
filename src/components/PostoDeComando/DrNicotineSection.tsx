
import React from 'react';
import CombatMedic from '@/components/CombatMedic/CombatMedic';
import { UserProgress, DailyAction } from '@/types/user';

interface DrNicogineSectionProps {
  progress: UserProgress;
  pendingActions: DailyAction[];
}

const DrNicotineSection = ({ progress, pendingActions }: DrNicogineSectionProps) => {
  const getDrNicotineMessage = () => {
    if (progress.currentMission && !progress.currentMission.completed) {
      return `Missão ativa: ${progress.currentMission.selectedMission.title}. Execute ou sangre créditos.`;
    }
    if (progress.isInTreatment) {
      return "🩸 Hemorragia de disciplina detectada. Suturar imediatamente ou sangrar créditos.";
    }
    if (pendingActions.length > 0) {
      return "Selecione seu tormento, soldado. Missões aguardam execução.";
    }
    return "Posto de comando operacional. Aguardando ordens para próxima missão.";
  };

  const getDrNicotineMode = () => {
    if (progress.isInTreatment) return 'alert';
    if (progress.currentMission || pendingActions.length > 0) return 'neutral';
    return 'praise';
  };

  return (
    <div className="p-6 border-b border-military-border">
      <CombatMedic 
        mode={getDrNicotineMode()}
        message={getDrNicotineMessage()}
      />
    </div>
  );
};

export default DrNicotineSection;
