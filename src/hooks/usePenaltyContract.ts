
import { useState, useEffect } from 'react';
import { PenaltyContract, PenaltyLog } from '@/types/penalty';
import { 
  createPenaltyContract, 
  updatePenaltyContract, 
  getPenaltyContractByUserId,
  createPenaltyLog,
  getPenaltyLogsByUserId
} from '@/services/database/penaltyContractsService';
import { useNotifications } from './useNotifications';

export const usePenaltyContract = () => {
  const [activeContract, setActiveContract] = useState<PenaltyContract | null>(null);
  const [penaltyLogs, setPenaltyLogs] = useState<PenaltyLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { schedulePenaltyAlert } = useNotifications();

  useEffect(() => {
    loadActiveContract();
    loadPenaltyLogs();
  }, []);

  const loadActiveContract = async () => {
    try {
      setLoading(true);
      const userId = 'current-user'; // Replace with actual user ID
      const contract = await getPenaltyContractByUserId(userId);
      
      if (contract && contract.is_active) {
        setActiveContract(contract);
        // Agendar notificação para contrato ativo
        await schedulePenaltyAlert(contract);
      }
    } catch (error) {
      console.error('Error loading penalty contract:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPenaltyLogs = async () => {
    try {
      const userId = 'current-user'; // Replace with actual user ID
      const logs = await getPenaltyLogsByUserId(userId);
      setPenaltyLogs(logs);
    } catch (error) {
      console.error('Error loading penalty logs:', error);
    }
  };

  const createContract = async (contractData: Omit<PenaltyContract, 'id' | 'created_at' | 'consecutive_failures'>) => {
    try {
      setLoading(true);
      const newContract = await createPenaltyContract(contractData);
      setActiveContract(newContract);
      
      // Agendar notificação para o novo contrato
      await schedulePenaltyAlert(newContract);
      
      return { success: true, contract: newContract };
    } catch (error) {
      console.error('Error creating penalty contract:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const deactivateContract = async (contractId: string) => {
    try {
      setLoading(true);
      const updatedContract = await updatePenaltyContract(contractId, { is_active: false });
      setActiveContract(null);
      return { success: true, contract: updatedContract };
    } catch (error) {
      console.error('Error deactivating penalty contract:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const logPenalty = async (contractId: string, amount: number, reason: string) => {
    try {
      const logData = {
        contract_id: contractId,
        user_id: 'current-user', // Replace with actual user ID
        amount_charged: amount,
        currency: 'BRL' as const,
        destination_type: activeContract?.destination_type || 'fund' as const,
        status: 'pending' as const,
        reason,
        charged_at: new Date()
      };

      const newLog = await createPenaltyLog(logData);
      setPenaltyLogs(prev => [newLog, ...prev]);
      
      return { success: true, log: newLog };
    } catch (error) {
      console.error('Error logging penalty:', error);
      return { success: false, error };
    }
  };

  return {
    activeContract,
    penaltyLogs,
    loading,
    createContract,
    deactivateContract,
    logPenalty,
    refreshData: () => {
      loadActiveContract();
      loadPenaltyLogs();
    }
  };
};
