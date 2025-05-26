
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSquad } from '@/hooks/useSquad';
import { Shield, Users, Bell, MessageCircle, HelpCircle } from 'lucide-react';
import { UserProgress } from '@/types/user';

interface CommandHeaderProps {
  progress: UserProgress;
  pendingActionsCount: number;
  onStartTour?: () => void;
}

const CommandHeader = ({ progress, pendingActionsCount, onStartTour }: CommandHeaderProps) => {
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
            {userSquad && (
              <span className="text-cyber-cyan ml-2">
                • Squad {userSquad.name}
              </span>
            )}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Tour Button */}
          {onStartTour && (
            <Button
              onClick={onStartTour}
              variant="outline"
              size="sm"
              className="border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/20 font-bebas"
            >
              <HelpCircle size={16} className="mr-2" />
              TOUR
            </Button>
          )}

          {userSquad && (
            <div className="flex items-center space-x-2 bg-military-card/50 p-3 rounded border border-cyber-cyan/30">
              <Shield size={20} className="text-cyber-cyan" />
              <div className="text-right">
                <div className="font-bebas text-cyber-cyan text-sm">{userSquad.name}</div>
                <div className="text-xs text-warm-gray/70 font-consolas">
                  {userSquad.members.length}/3 membros • XP +{Math.round((userSquad.xpMultiplier - 1) * 100)}%
                </div>
              </div>
              {unreadNotifications > 0 && (
                <div className="flex items-center space-x-1 ml-2">
                  <Bell size={16} className="text-cyber-warning animate-pulse" />
                  <Badge className="bg-cyber-warning/20 border-cyber-warning/50 text-cyber-warning text-xs">
                    {unreadNotifications}
                  </Badge>
                </div>
              )}
            </div>
          )}
          
          {pendingActionsCount > 0 && (
            <Badge className="bg-cyber-fuchsia/20 border-cyber-fuchsia/50 text-cyber-fuchsia animate-pulse">
              {pendingActionsCount} ações pendentes
            </Badge>
          )}
        </div>
      </div>
      
      {/* Squad Status Bar */}
      {userSquad && (
        <div className="bg-military-card/30 border border-cyber-cyan/20 rounded p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users size={16} className="text-cyber-cyan" />
                <span className="font-consolas text-sm text-warm-gray">
                  Membros Ativos: {userSquad.members.filter(m => m.status === 'active').length}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle size={16} className="text-cyber-fuchsia" />
                <span className="font-consolas text-sm text-warm-gray">
                  Chat disponível
                </span>
              </div>
            </div>
            <div className="text-xs text-warm-gray/70 font-consolas">
              Squad ID: {userSquad.inviteCode}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandHeader;
