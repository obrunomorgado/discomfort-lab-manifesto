
import { useState, useEffect } from 'react';
import { CreditTransaction, CreditPackage, ReferralSystem } from '@/types/user';

const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 10,
    price: 29.90,
    discount: 0
  },
  {
    id: 'plus',
    name: 'Plus',
    credits: 25,
    price: 59.90,
    discount: 20,
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro',
    credits: 50,
    price: 99.90,
    discount: 33
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    credits: 100,
    price: 149.90,
    discount: 50
  }
];

const TEST_COSTS = {
  'career-truth-ai': 5,
  'arquiteto-da-verdade': 3,
  'unbreakable-mind': 7
};

export const useCredits = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);

  const generateReferralCode = (): string => {
    const prefix = 'VERDADE2024';
    const suffix = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}${suffix}`;
  };

  const getCreditPackages = (): CreditPackage[] => {
    return CREDIT_PACKAGES;
  };

  const getTestCost = (testId: string): number => {
    return TEST_COSTS[testId as keyof typeof TEST_COSTS] || 0;
  };

  const createTransaction = (
    type: CreditTransaction['type'],
    amount: number,
    description: string,
    testId?: string,
    referralCode?: string
  ): CreditTransaction => {
    return {
      id: `transaction-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      type,
      amount,
      description,
      timestamp: new Date(),
      testId,
      referralCode
    };
  };

  const simulatePayment = async (packageId: string): Promise<boolean> => {
    // Simular processamento de pagamento
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`💳 Pagamento simulado para pacote: ${packageId}`);
        resolve(true);
      }, 2000);
    });
  };

  const processReferral = (referralCode: string): { isValid: boolean; bonus: number } => {
    // Simular validação de código de referral
    if (referralCode && referralCode.startsWith('VERDADE2024')) {
      return { isValid: true, bonus: 5 };
    }
    return { isValid: false, bonus: 0 };
  };

  return {
    getCreditPackages,
    getTestCost,
    createTransaction,
    simulatePayment,
    processReferral,
    generateReferralCode,
    isCheckoutOpen,
    setIsCheckoutOpen,
    selectedPackage,
    setSelectedPackage
  };
};
