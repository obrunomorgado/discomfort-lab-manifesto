
import { UserProgress, CreditTransaction } from '@/types/user';

export const checkAndApplyPenalties = (
  currentProgress: UserProgress,
  saveProgress: (progress: UserProgress) => void
) => {
  const now = new Date();
  const lastCheckIn = currentProgress.lastCheckIn ? new Date(currentProgress.lastCheckIn) : null;
  
  if (!lastCheckIn) return;
  
  const hoursSinceLastCheckIn = (now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60);
  const daysSinceLastCheckIn = Math.floor(hoursSinceLastCheckIn / 24);
  
  // Penalidade por faltar check-in diário (após 25 horas)
  if (hoursSinceLastCheckIn > 25 && daysSinceLastCheckIn > 0) {
    const penalty = daysSinceLastCheckIn * 2; // -2 créditos por dia
    
    if (currentProgress.credits > 0) {
      const newProgress = { ...currentProgress };
      newProgress.credits = Math.max(0, newProgress.credits - penalty);
      
      const transaction: CreditTransaction = {
        id: `penalty-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        type: 'penalty',
        amount: -penalty,
        description: `Penalidade: ${daysSinceLastCheckIn} dias sem check-in`,
        timestamp: now
      };
      
      newProgress.creditTransactions.push(transaction);
      saveProgress(newProgress);
      
      console.log(`⚠️ Penalidade aplicada: -${penalty} créditos por ${daysSinceLastCheckIn} dias sem check-in`);
    }
  }
  
  // Penalidades por ações em atraso
  const overdueActions = currentProgress.dailyActions.filter(action => {
    const dueDate = new Date(action.dueDate);
    return !action.completed && now > dueDate;
  });
  
  overdueActions.forEach(action => {
    const daysOverdue = Math.floor((now.getTime() - new Date(action.dueDate).getTime()) / (1000 * 60 * 60 * 24));
    const penalty = daysOverdue * 1; // -1 crédito por dia de atraso
    
    if (penalty > 0 && currentProgress.credits > 0) {
      const newProgress = { ...currentProgress };
      newProgress.credits = Math.max(0, newProgress.credits - penalty);
      
      const transaction: CreditTransaction = {
        id: `action-penalty-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        type: 'penalty',
        amount: -penalty,
        description: `Penalidade: ${action.description} - ${daysOverdue} dias em atraso`,
        timestamp: now
      };
      
      newProgress.creditTransactions.push(transaction);
      saveProgress(newProgress);
    }
  });
  
  // Modo UTI - perda diária automática para dívidas altas
  if (currentProgress.debtPoints >= 50) {
    const utiPenalty = 3; // -3 créditos por dia no modo UTI
    
    if (currentProgress.credits > 0) {
      const newProgress = { ...currentProgress };
      newProgress.credits = Math.max(0, newProgress.credits - utiPenalty);
      
      const transaction: CreditTransaction = {
        id: `uti-penalty-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        type: 'penalty',
        amount: -utiPenalty,
        description: 'Modo UTI: Dívida crítica (≥50 pontos)',
        timestamp: now
      };
      
      newProgress.creditTransactions.push(transaction);
      saveProgress(newProgress);
      
      console.log('🚨 MODO UTI ATIVADO: -3 créditos por dívida crítica');
    }
  }
};
