
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'completion' | 'consistency' | 'intensity' | 'honesty' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  points: number;
}

export interface TestResult {
  testId: string;
  testName: string;
  completedAt: Date;
  keyInsights: string[];
  honestyScore: number;
  actionItems: string[];
  pointsEarned: number;
}

export interface UserProgress {
  totalPoints: number;
  level: number;
  badges: Badge[];
  testsCompleted: TestResult[];
  streakDays: number;
  lastActivity: Date;
  honestyAverage: number;
}

export interface UserStats {
  testsCompleted: number;
  totalPoints: number;
  badgesEarned: number;
  currentStreak: number;
  honestyScore: number;
}
