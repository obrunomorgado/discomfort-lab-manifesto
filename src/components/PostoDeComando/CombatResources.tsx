
import React from 'react';
import { Radio, Coins, Target, Crosshair, AlertTriangle } from 'lucide-react';
import { UserProgress, UserStats } from '@/types/user';

interface CombatResourcesProps {
  progress: UserProgress;
  stats: UserStats;
}

const CombatResources = ({ progress, stats }: CombatResourcesProps) => {
  return (
    <div className="p-6 border-b border-military-border">
      <h2 className="text-lg font-bebas text-warm-gray mb-4 flex items-center space-x-2">
        <Radio size={20} className="text-cyber-cyan" />
        <span>RECURSOS DE CAMPO</span>
      </h2>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-cyber-neon/20 to-military-olive/30 border border-cyber-neon/50 rounded p-4 text-center hover-lift hover-glitch">
          <Coins className="mx-auto text-cyber-neon mb-2" size={24} />
          <div className="text-2xl font-bebas text-cyber-neon">{progress.credits}</div>
          <div className="text-xs text-cyber-neon font-consolas">CRÉDITOS</div>
        </div>
        <div className="bg-gradient-to-br from-cyber-cyan/20 to-military-navy/30 border border-cyber-cyan/50 rounded p-4 text-center hover-lift hover-glitch">
          <Target className="mx-auto text-cyber-cyan mb-2" size={24} />
          <div className="text-2xl font-bebas text-cyber-cyan">{stats.totalPoints}</div>
          <div className="text-xs text-cyber-cyan font-consolas">PONTOS XP</div>
        </div>
        <div className="bg-gradient-to-br from-cyber-fuchsia/20 to-military-purple/30 border border-cyber-fuchsia/50 rounded p-4 text-center hover-lift hover-glitch">
          <Crosshair className="mx-auto text-cyber-fuchsia mb-2" size={24} />
          <div className="text-2xl font-bebas text-cyber-fuchsia">{stats.testsCompleted}</div>
          <div className="text-xs text-cyber-fuchsia font-consolas">MISSÕES</div>
        </div>
        <div className={`${progress.debtPoints > 0 ? 'bg-gradient-to-br from-cyber-warning/20 to-red-800/30 border-cyber-warning/50 animate-pulse-warning' : 'bg-gradient-to-br from-military-metal/20 to-gray-700/30 border-military-metal/50'} border rounded p-4 text-center hover-lift hover-glitch`}>
          <AlertTriangle className={`mx-auto mb-2 ${progress.debtPoints > 0 ? 'text-cyber-warning' : 'text-military-metal'}`} size={24} />
          <div className={`text-2xl font-bebas ${progress.debtPoints > 0 ? 'text-cyber-warning' : 'text-military-metal'}`}>
            {progress.debtPoints}
          </div>
          <div className={`text-xs font-consolas ${progress.debtPoints > 0 ? 'text-cyber-warning' : 'text-military-metal'}`}>DÍVIDA</div>
        </div>
      </div>
    </div>
  );
};

export default CombatResources;
