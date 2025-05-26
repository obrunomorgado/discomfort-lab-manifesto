
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PenaltyContract } from '@/types/penalty';

interface ActionsCardProps {
  activeContract: PenaltyContract | null;
  onShowBettingMachine: () => void;
  onShowPenaltySetup: () => void;
  onShowPenaltyManagement: () => void;
}

const ActionsCard = ({ 
  activeContract, 
  onShowBettingMachine, 
  onShowPenaltySetup, 
  onShowPenaltyManagement 
}: ActionsCardProps) => {
  return (
    <Card className="card-base">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-100">
          <Zap size={24} className="text-cyber-cyan" />
          <span>AÇÕES RÁPIDAS</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={onShowBettingMachine}
          className="w-full bg-cyber-warning text-military-bg hover:bg-cyber-warning/90 font-bebas text-base py-4"
        >
          MÁQUINA DE APOSTAS
        </Button>
        
        {!activeContract || !activeContract.is_active ? (
          <Button 
            onClick={onShowPenaltySetup}
            className="w-full bg-cyber-warning text-white hover:bg-cyber-warning/90 font-bebas text-base py-4 flex items-center space-x-2"
          >
            <DollarSign size={16} />
            <span>ATIVAR PENALIDADE</span>
          </Button>
        ) : (
          <Button 
            onClick={onShowPenaltyManagement}
            variant="outline" 
            className="w-full font-bebas text-base py-4 border-cyber-warning/50 text-cyber-warning hover:bg-cyber-warning/20"
          >
            GERENCIAR COMPROMISSO
          </Button>
        )}
        
        <Link to="/testes" className="block">
          <Button className="w-full bg-cyber-cyan text-military-bg hover:bg-cyber-cyan/90 font-bebas text-base py-4">
            TESTES AVANÇADOS
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ActionsCard;
