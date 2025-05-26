
import { useState, useEffect } from 'react';
import { UserProgress, TestResult, Badge, DailyAction } from '@/types/user';

const BADGES_DEFINITIONS: Omit<Badge, 'unlockedAt'>[] = [
  {
    id: 'first-test',
    name: 'Primeira Batalha',
    description: 'Completou seu primeiro teste',
    icon: '🎯',
    category: 'completion',
    rarity: 'common',
    points: 100
  },
  {
    id: 'truth-seeker',
    name: 'Caçador da Verdade',
    description: 'Completou o Arquiteto da Verdade',
    icon: '🏗️',
    category: 'completion',
    rarity: 'rare',
    points: 300
  },
  {
    id: 'career-warrior',
    name: 'Guerreiro da Carreira',
    description: 'Completou o CareerTruthAI',
    icon: '💼',
    category: 'completion',
    rarity: 'rare',
    points: 300
  },
  {
    id: 'unbreakable',
    name: 'Mente Inquebrantável',
    description: 'Completou o Unbreakable Mind',
    icon: '⚡',
    category: 'intensity',
    rarity: 'epic',
    points: 500
  },
  {
    id: 'honest-soul',
    name: 'Alma Honesta',
    description: 'Mantém score de honestidade acima de 8.0',
    icon: '💎',
    category: 'honesty',
    rarity: 'epic',
    points: 400
  },
  {
    id: 'streak-warrior',
    name: 'Guerreiro Consistente',
    description: '7 dias consecutivos de check-in',
    icon: '🔥',
    category: 'consistency',
    rarity: 'rare',
    points: 250
  },
  {
    id: 'legend',
    name: 'Lenda do Desconforto',
    description: 'Completou todos os testes disponíveis',
    icon: '👑',
    category: 'special',
    rarity: 'legendary',
    points: 1000
  },
  {
    id: 'recovered',
    name: 'Curado da Autossabotagem',
    description: 'Conseguiu alta médica - zerou pontos negativos',
    icon: '🏥',
    category: 'recovery',
    rarity: 'legendary',
    points: 2000
  },
  {
    id: 'disciplined',
    name: 'Disciplina de Ferro',
    description: '30 dias consecutivos de check-in',
    icon: '⚔️',
    category: 'recovery',
    rarity: 'epic',
    points: 800
  },
  {
    id: 'commitment',
    name: 'Compromisso Total',
    description: '7 dias consecutivos completando todas as ações',
    icon: '🎖️',
    category: 'recovery',
    rarity: 'rare',
    points: 400
  }
];

const INITIAL_PROGRESS: UserProgress = {
  totalPoints: 0,
  debtPoints: 0,
  level: 1,
  badges: [],
  testsCompleted: [],
  streakDays: 0,
  checkInStreak: 0,
  lastActivity: new Date(),
  honestyAverage: 0,
  isInTreatment: false,
  dailyActions: []
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
        }))
      });
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('userProgress', JSON.stringify(newProgress));
  };

  const addTestResult = (result: TestResult) => {
    const newProgress = { ...progress };
    newProgress.testsCompleted.push(result);
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
    
    // Verificar badges de streak
    const newBadges = checkForNewBadges(newProgress);
    newBadges.forEach(badge => {
      newProgress.badges.push({ ...badge, unlockedAt: new Date() });
      newProgress.totalPoints += badge.points;
    });
    
    saveProgress(newProgress);
    return newBadges;
  };

  const checkForNewBadges = (currentProgress: UserProgress): Badge[] => {
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
      }

      if (shouldUnlock) {
        newBadges.push(badgeDef as Badge);
      }
    });

    return newBadges;
  };

  const getStats = () => {
    const daysInTreatment = progress.treatmentStartDate ? 
      Math.floor((new Date().getTime() - progress.treatmentStartDate.getTime()) / (1000 * 60 * 60 * 24)) : undefined;

    return {
      testsCompleted: progress.testsCompleted.length,
      totalPoints: progress.totalPoints,
      debtPoints: progress.debtPoints,
      badgesEarned: progress.badges.length,
      currentStreak: progress.streakDays,
      checkInStreak: progress.checkInStreak,
      honestyScore: Math.round(progress.honestyAverage * 10) / 10,
      isInTreatment: progress.isInTreatment,
      daysInTreatment
    };
  };

  const getPendingActions = () => {
    return progress.dailyActions.filter(action => !action.completed);
  };

  const getCompletedActionsToday = () => {
    const today = new Date().toDateString();
    return progress.dailyActions.filter(action => 
      action.completed && new Date(action.dueDate).toDateString() === today
    );
  };

  return {
    progress,
    addTestResult,
    completeAction,
    performDailyCheckIn,
    getStats,
    getPendingActions,
    getCompletedActionsToday,
    saveProgress
  };
};
