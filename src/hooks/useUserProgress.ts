
import { useState, useEffect } from 'react';
import { UserProgress, TestResult, Badge } from '@/types/user';

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
    description: '7 dias consecutivos de atividade',
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
  }
];

const INITIAL_PROGRESS: UserProgress = {
  totalPoints: 0,
  level: 1,
  badges: [],
  testsCompleted: [],
  streakDays: 0,
  lastActivity: new Date(),
  honestyAverage: 0
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
        testsCompleted: parsed.testsCompleted.map((test: any) => ({
          ...test,
          completedAt: new Date(test.completedAt)
        })),
        badges: parsed.badges.map((badge: any) => ({
          ...badge,
          unlockedAt: badge.unlockedAt ? new Date(badge.unlockedAt) : undefined
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
          shouldUnlock = currentProgress.streakDays >= 7;
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
    return {
      testsCompleted: progress.testsCompleted.length,
      totalPoints: progress.totalPoints,
      badgesEarned: progress.badges.length,
      currentStreak: progress.streakDays,
      honestyScore: Math.round(progress.honestyAverage * 10) / 10
    };
  };

  return {
    progress,
    addTestResult,
    getStats,
    saveProgress
  };
};
