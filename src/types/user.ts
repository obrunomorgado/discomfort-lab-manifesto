
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'completion' | 'consistency' | 'intensity' | 'honesty' | 'special' | 'recovery' | 'payment' | 'referral';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  points: number;
}

export interface CreditTransaction {
  id: string;
  type: 'purchase' | 'spent' | 'referral_earned' | 'referral_bonus' | 'penalty' | 'bonus';
  amount: number;
  description: string;
  timestamp: Date;
  testId?: string;
  referralCode?: string;
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  discount?: number;
  popular?: boolean;
}

export interface ReferralSystem {
  myCode: string;
  referralsCount: number;
  totalEarned: number;
  referredUsers: string[];
}

export interface DailyAction {
  id: string;
  description: string;
  points: number;
  completed: boolean;
  dueDate: Date;
  category: 'professional' | 'mindset' | 'behavior' | 'communication';
}

export interface TestResult {
  testId: string;
  testName: string;
  completedAt: Date;
  keyInsights: string[];
  honestyScore: number;
  actionItems: string[];
  pointsEarned: number;
  creditsSpent: number; // Nova propriedade
  debtPointsGenerated?: number;
  dailyActionsAssigned?: DailyAction[];
}

export interface UserProgress {
  totalPoints: number;
  credits: number; // Nova propriedade
  debtPoints: number;
  level: number;
  badges: Badge[];
  testsCompleted: TestResult[];
  streakDays: number;
  checkInStreak: number;
  lastActivity: Date;
  lastCheckIn?: Date;
  honestyAverage: number;
  isInTreatment: boolean;
  dailyActions: DailyAction[];
  treatmentStartDate?: Date;
  creditTransactions: CreditTransaction[]; // Nova propriedade
  referralSystem: ReferralSystem; // Nova propriedade
}

export interface UserStats {
  testsCompleted: number;
  totalPoints: number;
  credits: number; // Nova propriedade
  debtPoints: number;
  badgesEarned: number;
  currentStreak: number;
  checkInStreak: number;
  honestyScore: number;
  isInTreatment: boolean;
  daysInTreatment?: number;
}
