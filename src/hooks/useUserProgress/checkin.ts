
import { UserProgress, CreditTransaction, Badge } from '@/types/user';
import { checkForNewBadges } from '@/utils/badgeChecker';

export const performDailyCheckIn = (
  progress: UserProgress
): { newProgress: UserProgress; newBadges: Badge[] } => {
  const newProgress = { ...progress };
  const today = new Date();
  const lastCheckIn = newProgress.lastCheckIn;
  
  // Verificar se é check-in consecutivo
  const isConsecutive = lastCheckIn && 
    (today.getTime() - lastCheckIn.getTime()) <= 24 * 60 * 60 * 1000 + 60 * 60 * 1000; // 25 horas de margem
  
  if (isConsecutive) {
    newProgress.checkInStreak += 1;
  } else {
    newProgress.checkInStreak = 1;
  }
  
  newProgress.lastCheckIn = today;
  newProgress.lastActivity = today;
  
  // Bonus por check-in consistente
  if (newProgress.checkInStreak % 7 === 0) {
    newProgress.credits += 2; // Bonus de 2 créditos a cada 7 dias
    
    const bonusTransaction: CreditTransaction = {
      id: `bonus-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      type: 'bonus',
      amount: 2,
      description: `Bonus: ${newProgress.checkInStreak} dias consecutivos`,
      timestamp: today
    };
    
    newProgress.creditTransactions.push(bonusTransaction);
  }
  
  // Verificar badges de streak
  const newBadges = checkForNewBadges(newProgress);
  newBadges.forEach(badge => {
    newProgress.badges.push({ ...badge, unlockedAt: new Date() });
    newProgress.totalPoints += badge.points;
  });
  
  return { newProgress, newBadges };
};
