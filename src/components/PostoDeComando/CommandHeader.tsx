
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useSquad } from '@/hooks/useSquad';
import { Shield, Users, Bell } from 'lucide-react';
import { UserProgress } from '@/types/user';

interface CommandHeaderProps {
  progress: UserProgress;
  pendingActionsCount: number;
}

const CommandHeader = ({ progress, pendingActionsCount }: CommandHeaderProps) => {
  const { getSquadByUserId, unreadNotifications } = useSquad();
  const userSquad = getSquadByUserId('current-user');

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-4xl font-bebas text-cyber-fuchsia cyber-glow">
            POSTO DE COMANDO
          </h1>
          <p className="text-warm-gray/70 font-consolas">
            Central de Operações • Recruta {progress.username || 'Sem Nome'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {userSquad && (
            <div className="flex items-center space-x-2">
              <Shield size={20} className="text-cyber-cyan" />
              <div className="text-right">
                <div className="font-bebas text-cyber-cyan">{userSquad.name}</div>
                <div className="text-xs text-warm-gray/70 font-consolas">
                  {userSquad.members.length}/3 membros • XP +{Math.round((userSquad.xpMultiplier - 1) * 100)}%
                </div>
              </div>
            </div>
          )}
          
          {unreadNotifications > 0 && (
            <div className="flex items-center space-x-2">
              <Bell size={20} className="text-cyber-warning animate-pulse" />
              <Badge className="bg-cyber-warning/20 border-cyber-warning/50 text-cyber-warning">
                {unreadNotifications}
              </Badge>
            </div>
          )}
          
          {pendingActionsCount > 0 && (
            <Badge className="bg-cyber-fuchsia/20 border-cyber-fuchsia/50 text-cyber-fuchsia animate-pulse">
              {pendingActionsCount} ações pendentes
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandHeader;
