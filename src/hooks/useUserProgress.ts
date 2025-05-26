
import { useState, useEffect } from 'react';
import { UserProgress, TestResult, Badge, DailyAction, CreditTransaction } from '@/types/user';
import { BADGES_DEFINITIONS } from '@/constants/badges';
import { checkAndApplyPenalties } from '@/utils/penaltyChecker';
import { checkForNewBadges } from '@/utils/badgeChecker';
import { generateReferralCode, calculateUserStats, getPendingActions, getCompletedActionsToday } from '@/utils/progressHelpers';

const INITIAL_PROGRESS: UserProgress = {
  totalPoints: 0,
  credits: 15, // Começar com 15 créditos grátis
  debtPoints: 0,
  level: 1,
  badges: [],
  testsCompleted: [],
  streakDays: 0,
  checkInStreak: 0,
  lastActivity: new Date(),
  honestyAverage: 0,
  isInTreatment: false,
  dailyActions: [],
  creditTransactions: [],
  referralSystem: {
    myCode: '',
    referralsCount: 0,
    totalEarned: 0,
    referredUsers: []
  },
  missionsCompleted: [],
  discomfortChallengesCompleted: []
};

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);

  useEffect(() => {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      setProgress({
        ...parsed,
        lastActivity: new Date(parsed.lastActivity),
        lastCheckIn: parsed.lastCheckIn ? new Date(parsed.lastCheckIn) : undefined,
        treatmentStartDate: parsed.treatmentStartDate ? new Date(parsed.treatmentStartDate) : undefined,
        testsCompleted: parsed.testsCompleted.map((test: any) => ({
          ...test,
          completedAt: new Date(test.completedAt),
          dailyActionsAssigned: test.dailyActionsAssigned?.map((action: any) => ({
            ...action,
            dueDate: new Date(action.dueDate)
          }))
        })),
        badges: parsed.badges.map((badge: any) => ({
          ...badge,
          unlockedAt: badge.unlockedAt ? new Date(badge.unlockedAt) : undefined
        })),
        dailyActions: (parsed.dailyActions || []).map((action: any) => ({
          ...action,
          dueDate: new Date(action.dueDate)
        })),
        creditTransactions: (parsed.creditTransactions || []).map((transaction: any) => ({
          ...transaction,
          timestamp: new Date(transaction.timestamp)
        })),
        // Gerar código de referral se não existir
        referralSystem: {
          myCode: parsed.referralSystem?.myCode || generateReferralCode(),
          referralsCount: parsed.referralSystem?.referralsCount || 0,
          totalEarned: parsed.referralSystem?.totalEarned || 0,
          referredUsers: parsed.referralSystem?.referredUsers || []
        },
        // Migração: adicionar créditos se não existir
        credits: parsed.credits !== undefined ? parsed.credits : 15
      });
      
      // Verificar penalidades após carregar dados
      checkAndApplyPenalties(parsed, saveProgress);
    } else {
      // Primeira vez - gerar código de referral
      const newProgress = {
        ...INITIAL_PROGRESS,
        referralSystem: {
          myCode: generateReferralCode(),
          referralsCount: 0,
          totalEarned: 0,
          referredUsers: []
        }
      };
      setProgress(newProgress);
      localStorage.setItem('userProgress', JSON.stringify(newProgress));
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('userProgress', JSON.stringify(newProgress));
  };

  const addCredits = (amount: number, description: string, type: CreditTransaction['type'] = 'purchase') => {
    const newProgress = { ...progress };
    newProgress.credits += amount;
    
    const transaction: CreditTransaction = {
      id: `transaction-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      type,
      amount,
      description,
      timestamp: new Date()
    };
    
    newProgress.creditTransactions.push(transaction);
    newProgress.lastActivity = new Date();
    
    // Badge de primeiro pagamento
    if (type === 'purchase' && !newProgress.badges.find(b => b.id === 'first-payment')) {
      const firstPaymentBadge = {
        id: 'first-payment',
        name: 'Primeiro Investimento',
        description: 'Fez sua primeira compra de créditos',
        icon: '💳',
        category: 'payment' as const,
        rarity: 'common' as const,
        points: 100,
        unlockedAt: new Date()
      };
      newProgress.badges.push(firstPaymentBadge);
      newProgress.totalPoints += firstPaymentBadge.points;
    }
    
    saveProgress(newProgress);
    return transaction;
  };

  const spendCredits = (amount: number, testId: string, testName: string): boolean => {
    if (progress.credits < amount) {
      return false;
    }
    
    const newProgress = { ...progress };
    newProgress.credits -= amount;
    
    const transaction: CreditTransaction = {
      id: `transaction-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      type: 'spent',
      amount: -amount,
      description: `Teste: ${testName}`,
      timestamp: new Date(),
      testId
    };
    
    newProgress.creditTransactions.push(transaction);
    newProgress.lastActivity = new Date();
    
    saveProgress(newProgress);
    return true;
  };

  const addTestResult = (result: TestResult) => {
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

    saveProgress(newProgress);
    return newBadges;
  };

  const completeAction = (actionId: string) => {
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
      saveProgress(newProgress);
    }
    
    return newProgress.debtPoints === 0 && newProgress.isInTreatment === false;
  };

  const performDailyCheckIn = () => {
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
    
    saveProgress(newProgress);
    return newBadges;
  };

  return {
    progress,
    addTestResult,
    addCredits,
    spendCredits,
    completeAction,
    performDailyCheckIn,
    getStats: () => calculateUserStats(progress),
    getPendingActions: () => getPendingActions(progress),
    getCompletedActionsToday: () => getCompletedActionsToday(progress),
    saveProgress,
    checkAndApplyPenalties: (prog: UserProgress) => checkAndApplyPenalties(prog, saveProgress)
  };
};
