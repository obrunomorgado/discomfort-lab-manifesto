
import { useState, useEffect } from 'react';
import { PenaltyContract, PenaltyLog } from '@/types/penalty';

// Mock Supabase client for now - will be replaced when Supabase is properly configured
const mockSupabase = {
  functions: {
    invoke: async () => ({ data: null, error: new Error('Supabase not configured') })
  },
  from: () => ({
    insert: () => ({ select: () => ({ single: async () => ({ data: null, error: new Error('Supabase not configured') }) }) }),
    update: () => ({ eq: () => ({ select: () => ({ single: async () => ({ data: null, error: new Error('Supabase not configured') }) }) }) }),
    select: () => ({ eq: () => ({ eq: () => ({ order: () => ({ limit: () => ({ single: async () => ({ data: null, error: new Error('Supabase not configured') }) }) }) }) }) })
  }),
  auth: {
    getUser: async () => ({ data: { user: null }, error: new Error('Supabase not configured') })
  }
};

export const usePenaltyContract = () => {
  const [activeContract, setActiveContract] = useState<PenaltyContract | null>(null);
  const [penaltyLogs, setPenaltyLogs] = useState<PenaltyLog[]>([]);
  const [loading, setLoading] = useState(false);

  const createContract = async (contractData: Omit<PenaltyContract, 'id' | 'created_at' | 'user_id' | 'consecutive_failures'>) => {
    try {
      setLoading(true);
      
      // Mock implementation for now
      console.log('Creating penalty contract:', contractData);
      
      // Simulate success for UI testing
      const mockContract: PenaltyContract = {
        id: 'mock-' + Date.now(),
        user_id: 'mock-user',
        daily_task: contractData.daily_task,
        penalty_amount: contractData.penalty_amount,
        currency: contractData.currency,
        destination_type: contractData.destination_type,
        destination_details: contractData.destination_details,
        is_active: false,
        created_at: new Date(),
        consecutive_failures: 0
      };

      setActiveContract(mockContract);
      return { 
        success: true, 
        data: mockContract, 
        client_secret: 'mock_client_secret' 
      };
    } catch (error) {
      console.error('Erro ao criar contrato:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const confirmPaymentMethod = async (contractId: string, paymentMethodId: string) => {
    try {
      console.log('Confirming payment method:', contractId, paymentMethodId);
      
      if (activeContract) {
        const updatedContract = {
          ...activeContract,
          stripe_payment_method_id: paymentMethodId,
          is_active: true
        };
        setActiveContract(updatedContract);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao confirmar método de pagamento:', error);
      return { success: false, error };
    }
  };

  const deactivateContract = async (contractId: string) => {
    try {
      console.log('Deactivating contract:', contractId);
      
      if (activeContract) {
        const updatedContract = {
          ...activeContract,
          is_active: false
        };
        setActiveContract(updatedContract);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao desativar contrato:', error);
      return { success: false, error };
    }
  };

  const loadActiveContract = async () => {
    try {
      console.log('Loading active contract...');
      // Mock implementation - no active contract for now
      setActiveContract(null);
    } catch (error) {
      console.error('Erro ao carregar contrato ativo:', error);
    }
  };

  const loadPenaltyLogs = async () => {
    try {
      console.log('Loading penalty logs...');
      // Mock implementation - no logs for now
      setPenaltyLogs([]);
    } catch (error) {
      console.error('Erro ao carregar logs de penalidade:', error);
    }
  };

  useEffect(() => {
    loadActiveContract();
    loadPenaltyLogs();
  }, []);

  return {
    activeContract,
    penaltyLogs,
    loading,
    createContract,
    confirmPaymentMethod,
    deactivateContract,
    loadActiveContract,
    loadPenaltyLogs
  };
};
