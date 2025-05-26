
import { UserProgress, Badge } from '@/types/user';
import { checkForNewBadges } from '@/utils/badgeChecker';

export const applyMissionResult = (
  progress: UserProgress,
  missionId: string,
  success: boolean
): { newProgress: UserProgress; newBadges: Badge[]; removedBadges: string[] } => {
  const newProgress = { ...progress };
  
  // Verificar badges para aplicar
  const newBadges = checkForNewBadges(newProgress);
  
  // Adicionar novos badges
  newBadges.forEach(badge => {
    newProgress.badges.push({ ...badge, unlockedAt: new Date() });
    newProgress.totalPoints += badge.points;
  });
  
  // For now, no badges are removed - this can be implemented later if needed
  const badgesToRemove: string[] = [];
  
  return { newProgress, newBadges, removedBadges: badgesToRemove };
};
