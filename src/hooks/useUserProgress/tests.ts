
import { UserProgress, TestResult, Badge } from '@/types/user';
import { checkForNewBadges } from '@/utils/badgeChecker';

export const addTestResult = (
  progress: UserProgress,
  result: TestResult
): { newProgress: UserProgress; newBadges: Badge[] } => {
  const newProgress = { ...progress };
  
  // Adicionar creditsSpent se não existir
  const resultWithCredits = {
    ...result,
    creditsSpent: result.creditsSpent || 0
  };
  
  newProgress.testsCompleted.push(resultWithCredits);
  newProgress.totalPoints += result.pointsEarned;
  
  // Adicionar pontos negativos se gerados
  if (result.debtPointsGenerated) {
    newProgress.debtPoints += result.debtPointsGenerated;
    newProgress.isInTreatment = true;
    if (!newProgress.treatmentStartDate) {
      newProgress.treatmentStartDate = new Date();
    }
  }

  // Adicionar ações diárias se atribuídas
  if (result.dailyActionsAssigned) {
    newProgress.dailyActions.push(...result.dailyActionsAssigned);
  }

  newProgress.level = Math.floor(newProgress.totalPoints / 1000) + 1;
  newProgress.lastActivity = new Date();
  
  // Update honesty average
  const totalHonesty = newProgress.testsCompleted.reduce((sum, test) => sum + test.honestyScore, 0);
  newProgress.honestyAverage = totalHonesty / newProgress.testsCompleted.length;

  // Check for new badges
  const newBadges = checkForNewBadges(newProgress);
  newBadges.forEach(badge => {
    newProgress.badges.push({ ...badge, unlockedAt: new Date() });
    newProgress.totalPoints += badge.points;
  });

  return { newProgress, newBadges };
};
