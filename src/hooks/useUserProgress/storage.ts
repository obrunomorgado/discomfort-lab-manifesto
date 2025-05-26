
import { UserProgress } from '@/types/user';
import { INITIAL_PROGRESS } from './types';
import { generateReferralCode } from '@/utils/progressHelpers';

export const loadProgress = (): UserProgress => {
  const savedProgress = localStorage.getItem('userProgress');
  
  if (savedProgress) {
    const parsed = JSON.parse(savedProgress);
    return {
      ...parsed,
      lastActivity: new Date(parsed.lastActivity),
      lastCheckIn: parsed.lastCheckIn ? new Date(parsed.lastCheckIn) : undefined,
      treatmentStartDate: parsed.treatmentStartDate ? new Date(parsed.treatmentStartDate) : undefined,
      testsCompleted: parsed.testsCompleted.map((test: any) => ({
        ...test,
        completedAt: new Date(test.completedAt),
        dailyActionsAssigned: test.dailyActionsAssigned?.map((action: any) => ({
          ...action,
          dueDate: new Date(action.dueDate)
        })),
        nextScheduledDate: test.nextScheduledDate ? new Date(test.nextScheduledDate) : undefined
      })),
      badges: parsed.badges.map((badge: any) => ({
        ...badge,
        unlockedAt: badge.unlockedAt ? new Date(badge.unlockedAt) : undefined
      })),
      dailyActions: (parsed.dailyActions || []).map((action: any) => ({
        ...action,
        dueDate: new Date(action.dueDate)
      })),
      creditTransactions: (parsed.creditTransactions || []).map((transaction: any) => ({
        ...transaction,
        timestamp: new Date(transaction.timestamp)
      })),
      // Gerar código de referral se não existir
      referralSystem: {
        myCode: parsed.referralSystem?.myCode || generateReferralCode(),
        referralsCount: parsed.referralSystem?.referralsCount || 0,
        totalEarned: parsed.referralSystem?.totalEarned || 0,
        referredUsers: parsed.referralSystem?.referredUsers || []
      },
      // Migração: adicionar créditos se não existir
      credits: parsed.credits !== undefined ? parsed.credits : 15,
      // Migração: adicionar username se não existir
      username: parsed.username || 'Recruta',
      squadNotifications: parsed.squadNotifications || [],
      // Migração: adicionar sistema médico se não existir
      medicalProgress: {
        currentTestNumber: parsed.medicalProgress?.currentTestNumber || parsed.testsCompleted?.filter((t: any) => t.testId === 'career-truth-ai').length || 0,
        isBlocked: parsed.medicalProgress?.isBlocked || (parsed.testsCompleted?.filter((t: any) => t.testId === 'career-truth-ai').length >= 5),
        canSuborn: parsed.medicalProgress?.canSuborn || (parsed.testsCompleted?.filter((t: any) => t.testId === 'career-truth-ai').length >= 5),
        subornsUsed: parsed.medicalProgress?.subornsUsed || 0,
        totalConsultations: parsed.medicalProgress?.totalConsultations || parsed.testsCompleted?.filter((t: any) => t.testId === 'career-truth-ai').length || 0,
        isPatientCured: parsed.medicalProgress?.isPatientCured || false,
        evolutionTrend: parsed.medicalProgress?.evolutionTrend || 'stable',
        averageScore: parsed.medicalProgress?.averageScore || 
          (parsed.testsCompleted?.filter((t: any) => t.testId === 'career-truth-ai').length > 0 ? 
            parsed.testsCompleted.filter((t: any) => t.testId === 'career-truth-ai').reduce((sum: number, test: any) => sum + (test.overallScore || 50), 0) / 
            parsed.testsCompleted.filter((t: any) => t.testId === 'career-truth-ai').length : 0),
        nextAppointment: parsed.medicalProgress?.nextAppointment ? new Date(parsed.medicalProgress.nextAppointment) : undefined
      }
    };
  } else {
    // Primeira vez - gerar código de referral
    return {
      ...INITIAL_PROGRESS,
      referralSystem: {
        myCode: generateReferralCode(),
        referralsCount: 0,
        totalEarned: 0,
        referredUsers: []
      }
    };
  }
};

export const saveProgress = (progress: UserProgress) => {
  localStorage.setItem('userProgress', JSON.stringify(progress));
};
