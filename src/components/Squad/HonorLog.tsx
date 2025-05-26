
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useSquad } from '@/hooks/useSquad';
import { Trophy, Target, Zap, Crown } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Achievement {
  id: string;
  type: string;
  title: string;
  points: number;
  timestamp: Date;
  isDoubled?: boolean;
  description?: string;
}

const HonorLog = () => {
  const { progress } = useUserProgress();
  const { getSquadByUserId } = useSquad();
  
  const userSquad = getSquadByUserId('current-user');
  
  const achievements: Achievement[] = [
    ...progress.missionsCompleted
      .filter(mission => mission.completed)
      .slice(-5)
      .map(mission => ({
        id: `mission-${mission.selectedMission.id}`,
        type: 'mission',
        title: `Missão Completada: ${mission.selectedMission.title}`,
        points: mission.pointsEarned || 0,
        timestamp: mission.completedAt || new Date(),
        isDoubled: mission.isDoubled
      })),
    ...progress.badges.map(badge => ({
      id: `badge-${badge.id}`,
      type: 'badge',
      title: `Badge Conquistado: ${badge.name}`,
      points: 0,
      timestamp: badge.unlockedAt || new Date(),
      description: badge.description
    }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10);

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'mission':
        return <Target size={16} className="text-cyber-cyan" />;
      case 'badge':
        return <Trophy size={16} className="text-cyber-warning" />;
      default:
        return <Zap size={16} className="text-cyber-fuchsia" />;
    }
  };

  const getAchievementColor = (type: string) => {
    switch (type) {
      case 'mission':
        return 'border-cyber-cyan/30 bg-cyber-cyan/10';
      case 'badge':
        return 'border-cyber-warning/30 bg-cyber-warning/10';
      default:
        return 'border-cyber-fuchsia/30 bg-cyber-fuchsia/10';
    }
  };

  return (
    <Card className="bg-military-card border-cyber-fuchsia/30 rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-bebas text-cyber-fuchsia">
          <Crown size={20} />
          <span>LOG DE HONRA</span>
          {userSquad && (
            <Badge className="bg-cyber-cyan/20 border-cyber-cyan/50 text-cyber-cyan">
              {userSquad.name}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {achievements.length === 0 ? (
          <div className="text-center py-8">
            <Trophy size={32} className="mx-auto mb-2 text-cyber-fuchsia/50" />
            <p className="text-warm-gray/70 font-consolas text-sm">
              Nenhuma conquista ainda
            </p>
            <p className="text-warm-gray/50 font-consolas text-xs">
              Complete missões para aparecer no Log de Honra
            </p>
          </div>
        ) : (
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded border ${getAchievementColor(achievement.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    {getAchievementIcon(achievement.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bebas text-warm-gray">
                          {achievement.title}
                        </h4>
                        {achievement.points > 0 && (
                          <div className="flex items-center space-x-1">
                            <Zap size={12} className="text-cyber-cyan" />
                            <span className="text-xs font-consolas text-cyber-cyan">
                              {achievement.points} XP
                            </span>
                            {achievement.isDoubled && (
                              <Badge className="bg-cyber-warning/20 border-cyber-warning/50 text-cyber-warning text-xs">
                                x2
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      {achievement.description && (
                        <p className="text-xs text-warm-gray/70 font-consolas mt-1">
                          {achievement.description}
                        </p>
                      )}
                      <p className="text-xs text-warm-gray/50 mt-1">
                        {format(achievement.timestamp, 'dd/MM HH:mm', { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default HonorLog;
