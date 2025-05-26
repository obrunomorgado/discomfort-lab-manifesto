
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'completion' | 'consistency' | 'intensity' | 'honesty' | 'special' | 'recovery' | 'payment' | 'referral' | 'shame' | 'medical';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  points: number;
}

export interface CreditTransaction {
  id: string;
  type: 'purchase' | 'spent' | 'referral_earned' | 'referral_bonus' | 'penalty' | 'bonus' | 'suborn';
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
  creditsSpent: number;
  debtPointsGenerated?: number;
  dailyActionsAssigned?: DailyAction[];
  // New medical fields
  overallScore?: number;
  diagnosis?: import('./medical').MedicalDiagnosis;
  testNumber?: number;
  nextScheduledDate?: Date;
}

// Novas interfaces para o sistema de missões
export interface DailyMissionSelection {
  selectedMission: any;
  isDoubled: boolean;
  selectedAt: Date;
  completed?: boolean;
  completedAt?: Date;
  pointsEarned?: number;
}

export interface DiscomfortChallenge {
  card: any;
  acceptedAt: Date;
  completed?: boolean;
  completedAt?: Date;
  pointsEarned?: number;
}

export interface BettingEffect {
  envelope: any;
  selectedAt: Date;
  isActive: boolean;
}

// New medical progress interface
export interface MedicalProgress {
  currentTestNumber: number;
  isBlocked: boolean;
  canSuborn: boolean;
  subornsUsed: number;
  nextAppointment?: Date;
  totalConsultations: number;
  isPatientCured: boolean;
  evolutionTrend: 'improving' | 'stable' | 'declining';
  averageScore: number;
}

export interface UserProgress {
  totalPoints: number;
  credits: number;
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
  creditTransactions: CreditTransaction[];
  referralSystem: ReferralSystem;
  
  // Novas propriedades para o sistema de missões
  currentMission?: DailyMissionSelection;
  currentDiscomfortChallenge?: DiscomfortChallenge;
  currentBettingEffect?: BettingEffect;
  missionsCompleted: DailyMissionSelection[];
  discomfortChallengesCompleted: DiscomfortChallenge[];
  
  // Squad system
  currentSquadId?: string;
  squadNotifications: any[];
  username: string;
  
  // New medical system
  medicalProgress: MedicalProgress;
}

export interface UserStats {
  testsCompleted: number;
  totalPoints: number;
  credits: number;
  debtPoints: number;
  badgesEarned: number;
  currentStreak: number;
  checkInStreak: number;
  honestyScore: number;
  isInTreatment: boolean;
  daysInTreatment?: number;
  // Medical stats
  medicalEvolution?: number;
  consultationsCompleted?: number;
  averageDiagnosisScore?: number;
}
