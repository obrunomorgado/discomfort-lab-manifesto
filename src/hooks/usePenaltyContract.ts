
import { useState, useEffect } from 'react';
import { PenaltyContract, PenaltyLog } from '@/types/penalty';
import { mockDatabase } from '@/services/database/mockDatabase';

export const usePenaltyContract = () => {
  const [activeContract, setActiveContract] = useState<PenaltyContract | null>(null);
  const [penaltyLogs, setPenaltyLogs] = useState<PenaltyLog[]>([]);
  const [loading, setLoading] = useState(false);

  const createContract = async (contractData: Omit<PenaltyContract, 'id' | 'created_at' | 'user_id' | 'consecutive_failures'>) => {
    try {
      setLoading(true);
      
      console.log('Creating penalty contract:', contractData);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dbContract = await mockDatabase.insertPenaltyContract({
        daily_task: contractData.daily_task,
        penalty_amount: contractData.penalty_amount,
        currency: contractData.currency,
        destination_type: contractData.destination_type,
        destination_details: contractData.destination_details,
        stripe_setup_intent_id: 'si_mock_' + Date.now(),
        is_active: false,
        consecutive_failures: 0
      });

      // Converter para formato do frontend
      const frontendContract: PenaltyContract = {
        ...dbContract,
        created_at: new Date(dbContract.created_at),
        last_check_date: dbContract.last_check_date ? new Date(dbContract.last_check_date) : undefined
      };

      setActiveContract(frontendContract);
      
      return { 
        success: true, 
        data: frontendContract, 
        client_secret: 'seti_mock_client_secret_' + Date.now()
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
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedContract = await mockDatabase.updatePenaltyContract(contractId, {
        stripe_payment_method_id: paymentMethodId,
        is_active: true
      });
      
      if (updatedContract) {
        const frontendContract: PenaltyContract = {
          ...updatedContract,
          created_at: new Date(updatedContract.created_at),
          last_check_date: updatedContract.last_check_date ? new Date(updatedContract.last_check_date) : undefined
        };
        setActiveContract(frontendContract);
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
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedContract = await mockDatabase.updatePenaltyContract(contractId, {
        is_active: false
      });
      
      if (updatedContract) {
        const frontendContract: PenaltyContract = {
          ...updatedContract,
          created_at: new Date(updatedContract.created_at),
          last_check_date: updatedContract.last_check_date ? new Date(updatedContract.last_check_date) : undefined
        };
        setActiveContract(frontendContract);
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
      
      const dbContract = await mockDatabase.getActivePenaltyContract();
      if (dbContract) {
        const frontendContract: PenaltyContract = {
          ...dbContract,
          created_at: new Date(dbContract.created_at),
          last_check_date: dbContract.last_check_date ? new Date(dbContract.last_check_date) : undefined
        };
        setActiveContract(frontendContract);
      } else {
        setActiveContract(null);
      }
    } catch (error) {
      console.error('Erro ao carregar contrato ativo:', error);
      setActiveContract(null);
    }
  };

  const loadPenaltyLogs = async () => {
    try {
      console.log('Loading penalty logs...');
      
      const dbLogs = await mockDatabase.getPenaltyLogsByUser('current-user');
      const frontendLogs: PenaltyLog[] = dbLogs.map(log => ({
        ...log,
        charged_at: new Date(log.charged_at),
        confirmed_at: log.confirmed_at ? new Date(log.confirmed_at) : undefined
      }));
      
      setPenaltyLogs(frontendLogs);
    } catch (error) {
      console.error('Erro ao carregar logs de penalidade:', error);
      setPenaltyLogs([]);
    }
  };

  // Função para simular uma penalidade (para demonstração)
  const simulatePenalty = async (reason: string, amount: number) => {
    if (!activeContract || !activeContract.is_active) return;
    
    try {
      const newLog = await mockDatabase.insertPenaltyLog({
        contract_id: activeContract.id,
        user_id: activeContract.user_id,
        amount_charged: amount,
        currency: 'BRL',
        destination_type: activeContract.destination_type,
        status: 'completed',
        reason
      });

      // Converter para frontend format
      const frontendLog: PenaltyLog = {
        ...newLog,
        charged_at: new Date(newLog.charged_at),
        confirmed_at: newLog.confirmed_at ? new Date(newLog.confirmed_at) : undefined
      };

      setPenaltyLogs(prev => [frontendLog, ...prev]);
      
      // Incrementar falhas consecutivas
      const updatedContract = await mockDatabase.updatePenaltyContract(activeContract.id, {
        consecutive_failures: activeContract.consecutive_failures + 1
      });
      
      if (updatedContract) {
        const frontendContract: PenaltyContract = {
          ...updatedContract,
          created_at: new Date(updatedContract.created_at),
          last_check_date: updatedContract.last_check_date ? new Date(updatedContract.last_check_date) : undefined
        };
        setActiveContract(frontendContract);
      }
    } catch (error) {
      console.error('Erro ao simular penalidade:', error);
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
    loadPenaltyLogs,
    simulatePenalty // Função extra para demonstração
  };
};
