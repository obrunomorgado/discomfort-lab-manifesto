
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'completion' | 'consistency' | 'intensity' | 'honesty' | 'special' | 'recovery';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  points: number;
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
  debtPointsGenerated?: number; // Pontos negativos gerados
  dailyActionsAssigned?: DailyAction[]; // Ações atribuídas
}

export interface UserProgress {
  totalPoints: number;
  debtPoints: number; // Pontos negativos acumulados
  level: number;
  badges: Badge[];
  testsCompleted: TestResult[];
  streakDays: number;
  checkInStreak: number; // Dias consecutivos de check-in
  lastActivity: Date;
  lastCheckIn?: Date;
  honestyAverage: number;
  isInTreatment: boolean; // Se está em programa ativo de recuperação
  dailyActions: DailyAction[]; // Ações pendentes
  treatmentStartDate?: Date;
}

export interface UserStats {
  testsCompleted: number;
  totalPoints: number;
  debtPoints: number;
  badgesEarned: number;
  currentStreak: number;
  checkInStreak: number;
  honestyScore: number;
  isInTreatment: boolean;
  daysInTreatment?: number;
}
