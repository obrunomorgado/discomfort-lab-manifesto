
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, DollarSign, Calendar, TrendingDown } from 'lucide-react';
import { usePenaltyContract } from '@/hooks/usePenaltyContract';
import { useToast } from '@/components/ui/use-toast';
import PenaltySetupModal from './PenaltySetupModal';

const PenaltyManagement = () => {
  const [showSetupModal, setShowSetupModal] = useState(false);
  const { activeContract, penaltyLogs, deactivateContract, loading } = usePenaltyContract();
  const { toast } = useToast();

  const handleDeactivate = async () => {
    if (!activeContract) return;
    
    const result = await deactivateContract(activeContract.id);
    if (result.success) {
      toast({
        title: "Contrato Desativado",
        description: "Penalidade financeira removida",
      });
    } else {
      toast({
        title: "Erro",
        description: "Falha ao desativar contrato",
        variant: "destructive"
      });
    }
  };

  const totalPenalties = penaltyLogs.reduce((sum, log) => 
    log.status === 'completed' ? sum + log.amount_charged : sum, 0
  );

  return (
    <div className="space-y-6">
      {/* Status Atual */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-bebas text-warm-gray">
            <AlertTriangle size={20} />
            <span>SKIN IN THE GAME</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeContract && activeContract.is_active ? (
            <div className="space-y-4">
              <div className="p-4 bg-red-900/30 border border-red-500/50 rounded warning-glow">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-bebas text-red-300">
                    COMPROMISSO ATIVO
                  </div>
                  <Badge variant="destructive" className="font-bebas">
                    R$ {(activeContract.penalty_amount / 100).toFixed(2)}/dia
                  </Badge>
                </div>
                <div className="text-sm text-red-400 mb-3">
                  Tarefa: {activeContract.daily_task}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-red-400">
                    Falhas consecutivas: {activeContract.consecutive_failures}
                  </div>
                  <Button
                    onClick={handleDeactivate}
                    disabled={loading}
                    size="sm"
                    variant="outline"
                    className="border-red-500/50 text-red-300 hover:bg-red-900/30 font-bebas"
                  >
                    DESATIVAR
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="mx-auto text-warm-gray/50 mb-4" size={48} />
              <div className="text-warm-gray/70 mb-4">
                Nenhum compromisso financeiro ativo
              </div>
              <Button
                onClick={() => setShowSetupModal(true)}
                className="bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas"
              >
                CRIAR COMPROMISSO
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Histórico de Penalidades */}
      {penaltyLogs.length > 0 && (
        <Card className="bg-dark-card border-dark-border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between font-bebas text-warm-gray">
              <div className="flex items-center space-x-2">
                <TrendingDown size={20} />
                <span>HISTÓRICO DE PENALIDADES</span>
              </div>
              <div className="flex items-center space-x-1 text-red-400">
                <DollarSign size={16} />
                <span>R$ {(totalPenalties / 100).toFixed(2)}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {penaltyLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 bg-dark-bg/50 rounded border border-dark-border">
                  <div>
                    <div className="text-sm text-warm-gray">
                      {log.reason}
                    </div>
                    <div className="text-xs text-warm-gray/60">
                      {new Date(log.charged_at).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={log.status === 'completed' ? 'destructive' : 'outline'}
                      className="text-xs"
                    >
                      {log.status === 'completed' ? 'COBRADO' : 'PENDENTE'}
                    </Badge>
                    <div className="text-sm font-medium text-red-400">
                      -R$ {(log.amount_charged / 100).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <PenaltySetupModal 
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
      />
    </div>
  );
};

export default PenaltyManagement;
