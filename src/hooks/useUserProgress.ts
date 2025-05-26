import { useState, useEffect } from 'react';
import { UserProgress, TestResult, Badge, DailyAction, CreditTransaction } from '@/types/user';

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
          myCode: parsed.referralSystem?.myCode || `VERDADE2024${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
          referralsCount: parsed.referralSystem?.referralsCount || 0,
          totalEarned: parsed.referralSystem?.totalEarned || 0,
          referredUsers: parsed.referralSystem?.referredUsers || []
        },
        // Migração: adicionar créditos se não existir
        credits: parsed.credits !== undefined ? parsed.credits : 15
      });
      
      // Verificar penalidades após carregar dados
      checkAndApplyPenalties(parsed);
    } else {
      // Primeira vez - gerar código de referral
      const newProgress = {
        ...INITIAL_PROGRESS,
        referralSystem: {
          myCode: `VERDADE2024${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
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

  // Sistema de penalidades agressivo
  const checkAndApplyPenalties = (currentProgress: UserProgress) => {
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
    addCredits,
    spendCredits,
    completeAction,
    performDailyCheckIn,
    getStats,
    getPendingActions,
    getCompletedActionsToday,
    saveProgress,
    checkAndApplyPenalties
  };
};
