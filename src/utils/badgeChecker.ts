
import { UserProgress, Badge } from '@/types/user';
import { BADGES_DEFINITIONS } from '@/constants/badges';

export const checkForNewBadges = (currentProgress: UserProgress): Badge[] => {
  const unlockedBadgeIds = currentProgress.badges.map(b => b.id);
  const newBadges: Badge[] = [];

  BADGES_DEFINITIONS.forEach(badgeDef => {
    if (unlockedBadgeIds.includes(badgeDef.id)) return;

    let shouldUnlock = false;

    switch (badgeDef.id) {
      case 'first-test':
        shouldUnlock = currentProgress.testsCompleted.length >= 1;
        break;
      case 'truth-seeker':
        shouldUnlock = currentProgress.testsCompleted.some(t => t.testId === 'arquiteto-da-verdade');
        break;
      case 'career-warrior':
        shouldUnlock = currentProgress.testsCompleted.some(t => t.testId === 'career-truth-ai');
        break;
      case 'unbreakable':
        shouldUnlock = currentProgress.testsCompleted.some(t => t.testId === 'unbreakable-mind');
        break;
      case 'honest-soul':
        shouldUnlock = currentProgress.honestyAverage >= 8.0;
        break;
      case 'streak-warrior':
        shouldUnlock = currentProgress.checkInStreak >= 7;
        break;
      case 'disciplined':
        shouldUnlock = currentProgress.checkInStreak >= 30;
        break;
      case 'commitment':
        // 7 dias consecutivos completando todas as ações diárias
        const last7Days = currentProgress.dailyActions.filter(action => {
          const actionDate = new Date(action.dueDate);
          const daysDiff = (new Date().getTime() - actionDate.getTime()) / (1000 * 3600 * 24);
          return daysDiff <= 7 && action.completed;
        });
        shouldUnlock = last7Days.length >= 7;
        break;
      case 'legend':
        const availableTests = ['arquiteto-da-verdade', 'career-truth-ai', 'unbreakable-mind'];
        const completedTests = currentProgress.testsCompleted.map(t => t.testId);
        shouldUnlock = availableTests.every(test => completedTests.includes(test));
        break;
      case 'shame-duck':
        // Verificar 3 falhas consecutivas nas últimas missões
        if (currentProgress.missionsCompleted.length >= 3) {
          const lastThreeMissions = currentProgress.missionsCompleted
            .slice(-3)
            .every(mission => mission.completed === false);
          shouldUnlock = lastThreeMissions;
        }
        break;
    }

    if (shouldUnlock) {
      newBadges.push(badgeDef as Badge);
    }
  });

  return newBadges;
};

export const checkForBadgeRemoval = (currentProgress: UserProgress): string[] => {
  const badgesToRemove: string[] = [];
  
  // Remover badge de vergonha se conseguir uma missão bem-sucedida
  const hasShameBadge = currentProgress.badges.some(b => b.id === 'shame-duck');
  if (hasShameBadge && currentProgress.missionsCompleted.length > 0) {
    const lastMission = currentProgress.missionsCompleted[currentProgress.missionsCompleted.length - 1];
    if (lastMission.completed === true) {
      badgesToRemove.push('shame-duck');
    }
  }
  
  return badgesToRemove;
};
