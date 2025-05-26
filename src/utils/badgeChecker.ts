
import { UserProgress, Badge } from '@/types/user';
import { AVAILABLE_BADGES } from '@/constants/badges';

export const checkForNewBadges = (progress: UserProgress): Badge[] => {
  const newBadges: Badge[] = [];
  const userBadgeIds = progress.badges.map(b => b.id);

  // Check each available badge
  AVAILABLE_BADGES.forEach(badge => {
    if (userBadgeIds.includes(badge.id)) return; // Already has this badge

    let shouldAward = false;

    switch (badge.id) {
      case 'first-test':
        shouldAward = progress.testsCompleted.length >= 1;
        break;
      
      case 'truth-seeker':
        shouldAward = progress.testsCompleted.some(t => t.testId === 'career-truth-ai');
        break;
      
      case 'excuse-destroyer':
        shouldAward = progress.testsCompleted.some(t => t.testId === 'career-truth-ai');
        break;
      
      case 'unbreakable':
        shouldAward = progress.testsCompleted.some(t => t.testId === 'unbreakable-mind');
        break;
      
      case 'patient-discipline':
        const careerTests = progress.testsCompleted.filter(t => t.testId === 'career-truth-ai');
        shouldAward = careerTests.length >= 3 && progress.medicalProgress?.totalConsultations >= 3;
        break;
      
      case 'meteoric-evolution':
        const careerTestsEvolution = progress.testsCompleted.filter(t => t.testId === 'career-truth-ai');
        if (careerTestsEvolution.length >= 2) {
          const firstScore = careerTestsEvolution[0].overallScore || 50;
          const lastScore = careerTestsEvolution[careerTestsEvolution.length - 1].overallScore || 50;
          shouldAward = (lastScore - firstScore) >= 50;
        }
        break;
      
      case 'officially-cured':
        shouldAward = progress.medicalProgress?.isPatientCured || false;
        break;
      
      case 'first-suborn':
        shouldAward = (progress.medicalProgress?.subornsUsed || 0) >= 1;
        break;
      
      case 'chronic-suborner':
        shouldAward = (progress.medicalProgress?.subornsUsed || 0) >= 3;
        break;
      
      case 'medical-improvement':
        shouldAward = progress.medicalProgress?.evolutionTrend === 'improving';
        break;
      
      case 'test-master':
        shouldAward = progress.testsCompleted.length >= 10;
        break;
      
      case 'honest-soul':
        shouldAward = progress.honestyAverage >= 8.0;
        break;
      
      case 'recovery-hero':
        shouldAward = progress.debtPoints === 0 && progress.testsCompleted.some(t => t.debtPointsGenerated);
        break;
      
      case 'consistency-king':
        shouldAward = progress.checkInStreak >= 30;
        break;
      
      case 'payment-supporter':
        shouldAward = progress.creditTransactions.some(t => t.type === 'purchase');
        break;
      
      case 'referral-master':
        shouldAward = progress.referralSystem.referralsCount >= 5;
        break;
      
      case 'shame-survivor':
        shouldAward = progress.badges.some(b => b.id === 'shame-duck') && 
                     progress.missionsCompleted.some(m => m.completed);
        break;
    }

    if (shouldAward) {
      newBadges.push(badge);
    }
  });

  return newBadges;
};
