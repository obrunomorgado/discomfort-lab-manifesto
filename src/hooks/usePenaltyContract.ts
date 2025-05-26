
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PenaltyContract, PenaltyLog } from '@/types/penalty';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

export const usePenaltyContract = () => {
  const [activeContract, setActiveContract] = useState<PenaltyContract | null>(null);
  const [penaltyLogs, setPenaltyLogs] = useState<PenaltyLog[]>([]);
  const [loading, setLoading] = useState(false);

  const createContract = async (contractData: Omit<PenaltyContract, 'id' | 'created_at' | 'user_id' | 'consecutive_failures'>) => {
    try {
      setLoading(true);
      
      // Primeiro, criar SetupIntent no Stripe para tokenizar método de pagamento
      const { data: setupData, error: setupError } = await supabase.functions.invoke('create-penalty-setup', {
        body: { 
          amount: contractData.penalty_amount,
          currency: contractData.currency 
        }
      });

      if (setupError) throw setupError;

      // Criar contrato no banco
      const newContract = {
        ...contractData,
        stripe_setup_intent_id: setupData.setup_intent_id,
        consecutive_failures: 0,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('penalty_contracts')
        .insert([newContract])
        .select()
        .single();

      if (error) throw error;

      setActiveContract(data);
      return { success: true, data, client_secret: setupData.client_secret };
    } catch (error) {
      console.error('Erro ao criar contrato:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const confirmPaymentMethod = async (contractId: string, paymentMethodId: string) => {
    try {
      const { data, error } = await supabase
        .from('penalty_contracts')
        .update({ 
          stripe_payment_method_id: paymentMethodId,
          is_active: true 
        })
        .eq('id', contractId)
        .select()
        .single();

      if (error) throw error;
      setActiveContract(data);
      return { success: true };
    } catch (error) {
      console.error('Erro ao confirmar método de pagamento:', error);
      return { success: false, error };
    }
  };

  const deactivateContract = async (contractId: string) => {
    try {
      const { data, error } = await supabase
        .from('penalty_contracts')
        .update({ is_active: false })
        .eq('id', contractId)
        .select()
        .single();

      if (error) throw error;
      setActiveContract(data);
      return { success: true };
    } catch (error) {
      console.error('Erro ao desativar contrato:', error);
      return { success: false, error };
    }
  };

  const loadActiveContract = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('penalty_contracts')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setActiveContract(data || null);
    } catch (error) {
      console.error('Erro ao carregar contrato ativo:', error);
    }
  };

  const loadPenaltyLogs = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('penalty_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('charged_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setPenaltyLogs(data || []);
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
