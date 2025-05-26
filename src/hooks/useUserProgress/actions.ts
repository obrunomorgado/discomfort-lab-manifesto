
import { UserProgress, DailyAction } from '@/types/user';
import { AVAILABLE_BADGES } from '@/constants/badges';

export const completeAction = (progress: UserProgress, actionId: string): { newProgress: UserProgress; isRecovered: boolean } => {
  const newProgress = { ...progress };
  const actionIndex = newProgress.dailyActions.findIndex(action => action.id === actionId);
  
  if (actionIndex === -1) return { newProgress, isRecovered: false };
  
  const action = newProgress.dailyActions[actionIndex];
  action.completed = true;
  
  // Add points and reduce debt
  newProgress.totalPoints += action.points;
  newProgress.debtPoints = Math.max(0, newProgress.debtPoints - action.points);
  
  // Check if recovered (debt cleared)
  const isRecovered = newProgress.debtPoints === 0 && progress.debtPoints > 0;
  if (isRecovered) {
    newProgress.isInTreatment = false;
  }
  
  newProgress.lastActivity = new Date();
  
  return { newProgress, isRecovered };
};

export const getPendingActions = (progress: UserProgress): DailyAction[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return progress.dailyActions.filter(action => {
    const actionDate = new Date(action.dueDate);
    actionDate.setHours(0, 0, 0, 0);
    return !action.completed && actionDate <= today;
  });
};

export const getCompletedActionsToday = (progress: UserProgress): DailyAction[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return progress.dailyActions.filter(action => {
    if (!action.completed) return false;
    const actionDate = new Date(action.dueDate);
    actionDate.setHours(0, 0, 0, 0);
    return actionDate.getTime() === today.getTime();
  });
};
