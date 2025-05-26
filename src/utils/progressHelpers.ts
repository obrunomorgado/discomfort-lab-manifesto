
import { UserProgress, UserStats } from '@/types/user';

export const generateReferralCode = (): string => {
  return `VERDADE2024${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
};

export const calculateUserStats = (progress: UserProgress): UserStats => {
  const daysInTreatment = progress.treatmentStartDate ? 
    Math.floor((new Date().getTime() - progress.treatmentStartDate.getTime()) / (1000 * 60 * 60 * 24)) : undefined;

  return {
    testsCompleted: progress.testsCompleted.length,
    totalPoints: progress.totalPoints,
    credits: progress.credits,
    debtPoints: progress.debtPoints,
    badgesEarned: progress.badges.length,
    currentStreak: progress.streakDays,
    checkInStreak: progress.checkInStreak,
    honestyScore: Math.round(progress.honestyAverage * 10) / 10,
    isInTreatment: progress.isInTreatment,
    daysInTreatment
  };
};

export const getPendingActions = (progress: UserProgress) => {
  return progress.dailyActions.filter(action => !action.completed);
};

export const getCompletedActionsToday = (progress: UserProgress) => {
  const today = new Date().toDateString();
  return progress.dailyActions.filter(action => 
    action.completed && new Date(action.dueDate).toDateString() === today
  );
};
