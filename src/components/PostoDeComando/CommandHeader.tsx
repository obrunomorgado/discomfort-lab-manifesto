
import React from 'react';
import { Shield } from 'lucide-react';
import { UserProgress } from '@/types/user';

interface CommandHeaderProps {
  progress: UserProgress;
  pendingActionsCount: number;
}

const CommandHeader = ({ progress, pendingActionsCount }: CommandHeaderProps) => {
  const getStatusColor = () => {
    if (progress.isInTreatment) return 'text-cyber-warning';
    if (pendingActionsCount > 0) return 'text-cyber-fuchsia';
    return 'text-cyber-neon';
  };

  const getStatusText = () => {
    if (progress.isInTreatment) return 'FERIDO EM COMBATE';
    if (pendingActionsCount > 0) return 'MISSÕES PENDENTES';
    return 'PRONTO PARA COMBATE';
  };

  return (
    <div className="bg-military-card rounded-lg border-2 border-cyber-fuchsia/30 shadow-2xl mb-8 cyber-glow rivet-border">
      <div className="bg-gradient-to-r from-cyber-fuchsia/20 to-cyber-cyan/20 text-warm-gray p-6 rounded-t-lg metal-brushed">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-military-bg text-cyber-fuchsia rounded-full p-3 border border-cyber-fuchsia">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bebas tracking-wider text-cyber-cyan">
                DOSSIÊ DO RECRUTA - ID#{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </h1>
              <p className="text-warm-gray/80 font-consolas">
                Data de Alistamento: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-xl font-bebas ${getStatusColor()}`}>
              {getStatusText()}
            </div>
            <div className="text-sm text-warm-gray/80 font-consolas">
              Rank Operacional: {progress.level}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandHeader;
