
import { UserProgress, DailyAction } from '@/types/user';
import { BADGES_DEFINITIONS } from '@/constants/badges';

export const completeAction = (
  progress: UserProgress,
  actionId: string
): { newProgress: UserProgress; isRecovered: boolean } => {
  const newProgress = { ...progress };
  const actionIndex = newProgress.dailyActions.findIndex(a => a.id === actionId);
  
  if (actionIndex !== -1) {
    const action = newProgress.dailyActions[actionIndex];
    action.completed = true;
    
    // Reduzir pontos negativos
    newProgress.debtPoints = Math.max(0, newProgress.debtPoints - action.points);
    
    // Verificar se conseguiu alta médica
    if (newProgress.debtPoints === 0 && newProgress.isInTreatment) {
      newProgress.isInTreatment = false;
      // Badge de recuperação
      const recoveredBadge = BADGES_DEFINITIONS.find(b => b.id === 'recovered');
      if (recoveredBadge && !newProgress.badges.find(b => b.id === 'recovered')) {
        newProgress.badges.push({ ...recoveredBadge, unlockedAt: new Date() });
        newProgress.totalPoints += recoveredBadge.points;
      }
    }
    
    newProgress.lastActivity = new Date();
  }
  
  const isRecovered = newProgress.debtPoints === 0 && newProgress.isInTreatment === false;
  return { newProgress, isRecovered };
};
