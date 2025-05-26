
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, DollarSign, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserProgress } from '@/types/user';
import { PenaltyContract } from '@/types/penalty';

interface QuickActionsProps {
  progress: UserProgress;
  activeContract: PenaltyContract | null;
  onShowMissionSelector: () => void;
  onShowDailyReport: () => void;
  onShowBettingMachine: () => void;
  onShowPenaltySetup: () => void;
  onShowPenaltyManagement: () => void;
}

const QuickActions = ({ 
  progress, 
  activeContract, 
  onShowMissionSelector, 
  onShowDailyReport, 
  onShowBettingMachine, 
  onShowPenaltySetup, 
  onShowPenaltyManagement 
}: QuickActionsProps) => {
  return (
    <Card className="bg-military-card border-military-border rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-bebas text-warm-gray">
          <Zap size={20} className="text-cyber-cyan" />
          <span>ORDENS IMEDIATAS</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {!progress.currentMission ? (
            <Button 
              onClick={onShowMissionSelector}
              className="w-full bg-cyber-fuchsia text-military-bg hover:bg-cyber-fuchsia/90 font-bebas hover-lift hover-glitch"
            >
              SELECIONAR MISSÃO
            </Button>
          ) : (
            <Button 
              onClick={onShowDailyReport}
              className="w-full bg-cyber-cyan text-military-bg hover:bg-cyber-cyan/90 font-bebas hover-lift hover-glitch"
            >
              REPORTAR MISSÃO
            </Button>
          )}
          
          <Button 
            onClick={onShowBettingMachine}
            className="w-full bg-cyber-warning text-military-bg hover:bg-cyber-warning/90 font-bebas hover-lift hover-glitch"
          >
            MÁQUINA DE APOSTAS
          </Button>
          
          {!activeContract || !activeContract.is_active ? (
            <Button 
              onClick={onShowPenaltySetup}
              className="w-full bg-cyber-warning text-white hover:bg-cyber-warning/90 font-bebas hover-lift hover-glitch flex items-center space-x-2"
            >
              <DollarSign size={16} />
              <span>ATIVAR PENALIDADE</span>
            </Button>
          ) : (
            <Button 
              onClick={onShowPenaltyManagement}
              variant="outline" 
              className="w-full font-bebas border-cyber-warning/50 text-cyber-warning hover:bg-cyber-warning/20 hover-lift hover-glitch"
            >
              GERENCIAR COMPROMISSO
            </Button>
          )}
          
          <Link to="/testes">
            <Button className="w-full bg-cyber-neon text-military-bg hover:bg-cyber-neon/90 font-bebas hover-lift hover-glitch">
              TESTES AVANÇADOS
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
