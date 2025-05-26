
import { UserProgress, CreditTransaction } from '@/types/user';

export const addCredits = (
  progress: UserProgress,
  amount: number,
  description: string,
  type: CreditTransaction['type'] = 'purchase'
): { newProgress: UserProgress; transaction: CreditTransaction } => {
  const newProgress = { ...progress };
  newProgress.credits += amount;
  
  const transaction: CreditTransaction = {
    id: `transaction-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    type,
    amount,
    description,
    timestamp: new Date()
  };
  
  newProgress.creditTransactions.push(transaction);
  newProgress.lastActivity = new Date();
  
  // Badge de primeiro pagamento
  if (type === 'purchase' && !newProgress.badges.find(b => b.id === 'first-payment')) {
    const firstPaymentBadge = {
      id: 'first-payment',
      name: 'Primeiro Investimento',
      description: 'Fez sua primeira compra de créditos',
      icon: '💳',
      category: 'payment' as const,
      rarity: 'common' as const,
      points: 100,
      unlockedAt: new Date()
    };
    newProgress.badges.push(firstPaymentBadge);
    newProgress.totalPoints += firstPaymentBadge.points;
  }
  
  return { newProgress, transaction };
};

export const spendCredits = (
  progress: UserProgress,
  amount: number,
  testId: string,
  testName: string
): { success: boolean; newProgress?: UserProgress } => {
  if (progress.credits < amount) {
    return { success: false };
  }
  
  const newProgress = { ...progress };
  newProgress.credits -= amount;
  
  const transaction: CreditTransaction = {
    id: `transaction-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    type: 'spent',
    amount: -amount,
    description: `Teste: ${testName}`,
    timestamp: new Date(),
    testId
  };
  
  newProgress.creditTransactions.push(transaction);
  newProgress.lastActivity = new Date();
  
  return { success: true, newProgress };
};
