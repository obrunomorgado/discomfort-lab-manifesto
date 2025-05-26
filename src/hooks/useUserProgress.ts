
import { useState, useEffect } from 'react';
import { UserProgress, TestResult, DailyAction, CreditTransaction } from '@/types/user';
import { checkAndApplyPenalties } from '@/utils/penaltyChecker';
import { calculateUserStats, getPendingActions, getCompletedActionsToday } from '@/utils/progressHelpers';
import { loadProgress, saveProgress } from './useUserProgress/storage';
import { addCredits, spendCredits } from './useUserProgress/credits';
import { addTestResult } from './useUserProgress/tests';
import { completeAction } from './useUserProgress/actions';
import { performDailyCheckIn } from './useUserProgress/checkin';
import { applyMissionResult } from './useUserProgress/missions';

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());

  useEffect(() => {
    const initialProgress = loadProgress();
    setProgress(initialProgress);
    
    // Verificar penalidades após carregar dados
    checkAndApplyPenalties(initialProgress, handleSaveProgress);
  }, []);

  const handleSaveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const handleAddCredits = (amount: number, description: string, type: CreditTransaction['type'] = 'purchase') => {
    const { newProgress, transaction } = addCredits(progress, amount, description, type);
    handleSaveProgress(newProgress);
    return transaction;
  };

  const handleSpendCredits = (amount: number, testId: string, testName: string): boolean => {
    const result = spendCredits(progress, amount, testId, testName);
    if (result.success && result.newProgress) {
      handleSaveProgress(result.newProgress);
      return true;
    }
    return false;
  };

  const handleAddTestResult = (result: TestResult) => {
    const { newProgress, newBadges } = addTestResult(progress, result);
    handleSaveProgress(newProgress);
    return newBadges;
  };

  const handleCompleteAction = (actionId: string) => {
    const { newProgress, isRecovered } = completeAction(progress, actionId);
    handleSaveProgress(newProgress);
    return isRecovered;
  };

  const handleDailyCheckIn = () => {
    const { newProgress, newBadges } = performDailyCheckIn(progress);
    handleSaveProgress(newProgress);
    return newBadges;
  };

  const handleApplyMissionResult = (missionId: string, success: boolean) => {
    const { newProgress, newBadges, removedBadges } = applyMissionResult(progress, missionId, success);
    handleSaveProgress(newProgress);
    return { newBadges, removedBadges };
  };

  return {
    progress,
    addTestResult: handleAddTestResult,
    addCredits: handleAddCredits,
    spendCredits: handleSpendCredits,
    completeAction: handleCompleteAction,
    performDailyCheckIn: handleDailyCheckIn,
    applyMissionResult: handleApplyMissionResult,
    getStats: () => calculateUserStats(progress),
    getPendingActions: () => getPendingActions(progress),
    getCompletedActionsToday: () => getCompletedActionsToday(progress),
    saveProgress: handleSaveProgress,
    checkAndApplyPenalties: (prog: UserProgress) => checkAndApplyPenalties(prog, handleSaveProgress)
  };
};
