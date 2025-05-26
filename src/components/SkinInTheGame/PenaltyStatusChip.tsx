
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, AlertTriangle, Building2, Users } from 'lucide-react';
import { PenaltyContract } from '@/types/penalty';

interface PenaltyStatusChipProps {
  contract: PenaltyContract | null;
  onManage: () => void;
}

const PenaltyStatusChip = ({ contract, onManage }: PenaltyStatusChipProps) => {
  if (!contract || !contract.is_active) return null;

  const getDestinationIcon = () => {
    switch (contract.destination_type) {
      case 'fund': return <Building2 size={14} className="text-blue-400" />;
      case 'ngo': return <Building2 size={14} className="text-green-400" />;
      case 'friend': return <Users size={14} className="text-orange-400" />;
    }
  };

  const getDestinationText = () => {
    switch (contract.destination_type) {
      case 'fund': return 'Fundo Interno';
      case 'ngo': return contract.destination_details?.ngo_name || 'ONG';
      case 'friend': return contract.destination_details?.friend_name || 'Amigo';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/50 rounded-lg warning-glow">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1 text-red-300">
          <DollarSign size={16} />
          <AlertTriangle size={16} />
        </div>
        <div>
          <div className="text-sm font-bebas text-red-300">
            PENALIDADE ATIVA: R$ {(contract.penalty_amount / 100).toFixed(2)}/dia
          </div>
          <div className="flex items-center space-x-1 text-xs text-red-400">
            {getDestinationIcon()}
            <span>→ {getDestinationText()}</span>
          </div>
        </div>
      </div>
      <Button
        onClick={onManage}
        size="sm"
        variant="outline"
        className="border-red-500/50 text-red-300 hover:bg-red-900/30 font-bebas text-xs"
      >
        GERENCIAR
      </Button>
    </div>
  );
};

export default PenaltyStatusChip;
