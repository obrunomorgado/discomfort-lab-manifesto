
import { UserProgress, TestResult, Badge } from '@/types/user';
import { checkForNewBadges } from '@/utils/badgeChecker';
import { generateMedicalDiagnosis, shouldScheduleNextTest, calculateEvolutionTrend } from '@/utils/medicalDiagnostic';

export const addTestResult = (
  progress: UserProgress,
  result: TestResult
): { newProgress: UserProgress; newBadges: Badge[] } => {
  const newProgress = { ...progress };
  
  // Enhanced medical system for career-truth-ai
  if (result.testId === 'career-truth-ai') {
    const previousCareerTests = newProgress.testsCompleted.filter(t => t.testId === 'career-truth-ai');
    const testNumber = previousCareerTests.length + 1;
    
    // Generate medical diagnosis
    const diagnosis = generateMedicalDiagnosis('', testNumber, previousCareerTests);
    
    // Update result with medical data
    result.overallScore = diagnosis.overallScore;
    result.diagnosis = diagnosis;
    result.testNumber = testNumber;
    result.nextScheduledDate = shouldScheduleNextTest(testNumber);
    
    // Update medical progress
    newProgress.medicalProgress.currentTestNumber = testNumber;
    newProgress.medicalProgress.totalConsultations = testNumber;
    newProgress.medicalProgress.isBlocked = testNumber >= 5;
    newProgress.medicalProgress.canSuborn = testNumber >= 5;
    newProgress.medicalProgress.nextAppointment = result.nextScheduledDate;
    
    // Calculate new average and trend
    const allCareerTests = [...previousCareerTests, result];
    newProgress.medicalProgress.averageScore = allCareerTests.reduce((sum, test) => sum + (test.overallScore || 50), 0) / allCareerTests.length;
    newProgress.medicalProgress.evolutionTrend = calculateEvolutionTrend(allCareerTests);
    
    // Mark as cured if completed 5 tests with good scores
    if (testNumber >= 5 && newProgress.medicalProgress.averageScore >= 70) {
      newProgress.medicalProgress.isPatientCured = true;
    }
  }
  
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

  // Check for new badges (including medical badges)
  const newBadges = checkForNewBadges(newProgress);
  newBadges.forEach(badge => {
    newProgress.badges.push({ ...badge, unlockedAt: new Date() });
    newProgress.totalPoints += badge.points;
  });

  return { newProgress, newBadges };
};

export const subornDoctor = (
  progress: UserProgress,
  subornOption: { amount: number; unlocks: number; description: string }
): { newProgress: UserProgress; success: boolean } => {
  const newProgress = { ...progress };
  
  if (!newProgress.medicalProgress.canSuborn) {
    return { newProgress, success: false };
  }
  
  // Simulate payment (in real app, integrate with payment system)
  const transaction = {
    id: `suborn-${Date.now()}`,
    type: 'suborn' as const,
    amount: -subornOption.amount,
    description: `Suborno: ${subornOption.description}`,
    timestamp: new Date()
  };
  
  newProgress.creditTransactions.push(transaction);
  newProgress.medicalProgress.isBlocked = false;
  newProgress.medicalProgress.canSuborn = false;
  newProgress.medicalProgress.subornsUsed += 1;
  
  // Reset test counter but track that they were suborned
  const subornsUsed = newProgress.medicalProgress.subornsUsed;
  newProgress.medicalProgress.currentTestNumber = 0; // Reset for new cycle
  
  // Schedule next appointment in 1 week
  const nextAppointment = new Date();
  nextAppointment.setDate(nextAppointment.getDate() + 7);
  newProgress.medicalProgress.nextAppointment = nextAppointment;
  
  // Add suborn badge
  const subornBadge: Badge = {
    id: `suborn-${subornsUsed}`,
    name: subornsUsed === 1 ? 'Primeiro Suborno' : `Subornador Crônico ${subornsUsed}x`,
    description: `Subornado Dr. Desculpas ${subornsUsed} vez(es)`,
    icon: '💰',
    category: 'medical',
    rarity: subornsUsed >= 3 ? 'legendary' : subornsUsed >= 2 ? 'epic' : 'rare',
    points: 50 * subornsUsed,
    unlockedAt: new Date()
  };
  
  newProgress.badges.push(subornBadge);
  newProgress.totalPoints += subornBadge.points;
  
  return { newProgress, success: true };
};
