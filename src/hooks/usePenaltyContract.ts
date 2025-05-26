
import { useState, useEffect } from 'react';
import { PenaltyContract, PenaltyLog } from '@/types/penalty';

// Mock storage usando localStorage para persistir dados entre sessões
const STORAGE_KEYS = {
  ACTIVE_CONTRACT: 'penalty_active_contract',
  PENALTY_LOGS: 'penalty_logs'
};

const getMockUserId = () => 'mock-user-' + Math.random().toString(36).substring(2, 8);

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
      
      const mockContract: PenaltyContract = {
        id: 'contract-' + Date.now(),
        user_id: getMockUserId(),
        daily_task: contractData.daily_task,
        penalty_amount: contractData.penalty_amount,
        currency: contractData.currency,
        destination_type: contractData.destination_type,
        destination_details: contractData.destination_details,
        stripe_setup_intent_id: 'si_mock_' + Date.now(),
        is_active: false, // Será ativado após confirmar método de pagamento
        created_at: new Date(),
        consecutive_failures: 0
      };

      // Salvar no localStorage
      localStorage.setItem(STORAGE_KEYS.ACTIVE_CONTRACT, JSON.stringify(mockContract));
      setActiveContract(mockContract);
      
      return { 
        success: true, 
        data: mockContract, 
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
      
      if (activeContract) {
        const updatedContract = {
          ...activeContract,
          stripe_payment_method_id: paymentMethodId,
          is_active: true
        };
        
        localStorage.setItem(STORAGE_KEYS.ACTIVE_CONTRACT, JSON.stringify(updatedContract));
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
      
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (activeContract) {
        const updatedContract = {
          ...activeContract,
          is_active: false
        };
        
        localStorage.setItem(STORAGE_KEYS.ACTIVE_CONTRACT, JSON.stringify(updatedContract));
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
      
      const stored = localStorage.getItem(STORAGE_KEYS.ACTIVE_CONTRACT);
      if (stored) {
        const contract = JSON.parse(stored);
        // Converter string de data de volta para Date
        contract.created_at = new Date(contract.created_at);
        setActiveContract(contract);
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
      
      const stored = localStorage.getItem(STORAGE_KEYS.PENALTY_LOGS);
      if (stored) {
        const logs = JSON.parse(stored);
        // Converter strings de data de volta para Date
        logs.forEach((log: any) => {
          log.charged_at = new Date(log.charged_at);
          if (log.confirmed_at) log.confirmed_at = new Date(log.confirmed_at);
        });
        setPenaltyLogs(logs);
      } else {
        // Criar alguns logs mock para demonstração
        const mockLogs: PenaltyLog[] = [
          {
            id: 'log-1',
            contract_id: 'contract-1',
            user_id: getMockUserId(),
            amount_charged: 1000, // R$ 10.00
            currency: 'BRL',
            destination_type: 'fund',
            status: 'completed',
            reason: 'Faltou ao exercício diário',
            charged_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 dias atrás
            confirmed_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
          },
          {
            id: 'log-2',
            contract_id: 'contract-1', 
            user_id: getMockUserId(),
            amount_charged: 1000, // R$ 10.00
            currency: 'BRL',
            destination_type: 'ngo',
            status: 'pending',
            reason: 'Não leu as páginas obrigatórias',
            charged_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 dia atrás
          }
        ];
        
        localStorage.setItem(STORAGE_KEYS.PENALTY_LOGS, JSON.stringify(mockLogs));
        setPenaltyLogs(mockLogs);
      }
    } catch (error) {
      console.error('Erro ao carregar logs de penalidade:', error);
      setPenaltyLogs([]);
    }
  };

  // Função para simular uma penalidade (para demonstração)
  const simulatePenalty = async (reason: string, amount: number) => {
    if (!activeContract || !activeContract.is_active) return;
    
    const newLog: PenaltyLog = {
      id: 'log-' + Date.now(),
      contract_id: activeContract.id,
      user_id: activeContract.user_id,
      amount_charged: amount,
      currency: 'BRL',
      destination_type: activeContract.destination_type,
      status: 'completed',
      reason,
      charged_at: new Date()
    };
    
    const updatedLogs = [newLog, ...penaltyLogs];
    setPenaltyLogs(updatedLogs);
    localStorage.setItem(STORAGE_KEYS.PENALTY_LOGS, JSON.stringify(updatedLogs));
    
    // Incrementar falhas consecutivas
    const updatedContract = {
      ...activeContract,
      consecutive_failures: activeContract.consecutive_failures + 1
    };
    setActiveContract(updatedContract);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CONTRACT, JSON.stringify(updatedContract));
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
