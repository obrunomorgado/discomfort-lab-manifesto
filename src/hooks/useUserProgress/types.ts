
import { UserProgress } from '@/types/user';

export const INITIAL_PROGRESS: UserProgress = {
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
  discomfortChallengesCompleted: [],
  squadNotifications: [],
  username: 'Recruta',
  // Initialize medical progress
  medicalProgress: {
    currentTestNumber: 0,
    isBlocked: false,
    canSuborn: false,
    subornsUsed: 0,
    totalConsultations: 0,
    isPatientCured: false,
    evolutionTrend: 'stable',
    averageScore: 0
  }
};
