
import { MedicalDiagnosis, MedicalTestResult } from '@/types/medical';
import { TestResult } from '@/types/user';
import { generatePersonalizedDiagnosis } from './personalizedDiagnosis';

export const generateMedicalDiagnosis = (
  userInput: string, 
  testNumber: number, 
  previousTests: TestResult[] = []
): MedicalDiagnosis => {
  // Usar novo sistema de diagnóstico personalizado
  return generatePersonalizedDiagnosis(userInput, testNumber, previousTests);
};

export const calculateEvolutionTrend = (tests: TestResult[]): 'improving' | 'stable' | 'declining' => {
  if (tests.length < 2) return 'stable';
  
  const recentTests = tests.slice(-3);
  const scores = recentTests.map(t => t.overallScore || 50);
  
  const firstScore = scores[0];
  const lastScore = scores[scores.length - 1];
  const difference = lastScore - firstScore;
  
  if (difference > 10) return 'improving';
  if (difference < -10) return 'declining';
  return 'stable';
};

export const shouldScheduleNextTest = (testNumber: number): Date | null => {
  if (testNumber >= 5) return null;
  
  const weeksToAdd = testNumber;
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + (weeksToAdd * 7));
  
  return nextDate;
};

export const getSubornOptions = () => [
  {
    id: 'small-bribe',
    amount: 50,
    currency: 'BRL' as const,
    description: 'Suborno Básico - "Um cafezinho para o doutor"',
    unlocks: 3
  },
  {
    id: 'medium-bribe',
    amount: 100,
    currency: 'BRL' as const,
    description: 'Suborno Padrão - "Uma consulta particular"',
    unlocks: 5
  },
  {
    id: 'premium-bribe',
    amount: 200,
    currency: 'BRL' as const,
    description: 'Suborno Premium - "Tratamento VIP"',
    unlocks: 10
  }
];
