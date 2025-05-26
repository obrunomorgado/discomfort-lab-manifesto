
import { UserProgress, Badge } from '@/types/user';
import { checkForNewBadges, checkForBadgeRemoval } from '@/utils/badgeChecker';

export const applyMissionResult = (
  progress: UserProgress,
  missionId: string,
  success: boolean
): { newProgress: UserProgress; newBadges: Badge[]; removedBadges: string[] } => {
  const newProgress = { ...progress };
  
  // Verificar badges para aplicar/remover
  const newBadges = checkForNewBadges(newProgress);
  const badgesToRemove = checkForBadgeRemoval(newProgress);
  
  // Adicionar novos badges
  newBadges.forEach(badge => {
    newProgress.badges.push({ ...badge, unlockedAt: new Date() });
    newProgress.totalPoints += badge.points;
  });
  
  // Remover badges (principalmente o de vergonha)
  badgesToRemove.forEach(badgeId => {
    const badgeIndex = newProgress.badges.findIndex(b => b.id === badgeId);
    if (badgeIndex !== -1) {
      const removedBadge = newProgress.badges[badgeIndex];
      newProgress.badges.splice(badgeIndex, 1);
      newProgress.totalPoints -= removedBadge.points;
    }
  });
  
  return { newProgress, newBadges, removedBadges: badgesToRemove };
};
