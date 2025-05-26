
export interface MedicalDiagnosis {
  overallScore: number; // 0-100
  improvementAreas: string[];
  strengths: string[];
  detailedAnalysis: string;
  recommendations: string[];
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
}

export interface TestSchedule {
  testNumber: number;
  nextTestDate?: Date;
  isBlocked: boolean;
  canSuborn: boolean;
  subornsUsed: number;
}

export interface MedicalHistory {
  testResults: MedicalTestResult[];
  totalConsultations: number;
  isPatientCured: boolean;
  curingStartDate?: Date;
  evolutionTrend: 'improving' | 'stable' | 'declining';
}

export interface MedicalTestResult {
  testId: string;
  testName: string;
  completedAt: Date;
  testNumber: number;
  overallScore: number;
  diagnosis: MedicalDiagnosis;
  honestyScore: number;
  pointsEarned: number;
  creditsSpent: number;
  debtPointsGenerated?: number;
  nextScheduledDate?: Date;
}

export interface SubornOption {
  id: string;
  amount: number;
  currency: 'BRL';
  description: string;
  unlocks: number; // number of additional consultations
}
