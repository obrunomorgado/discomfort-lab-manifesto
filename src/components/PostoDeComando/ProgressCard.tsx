
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Award, Flame } from 'lucide-react';
import { UserProgress } from '@/types/user';

interface ProgressCardProps {
  progress: UserProgress;
  stats: any;
}

const ProgressCard = ({ progress, stats }: ProgressCardProps) => {
  return (
    <Card className="card-base">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-100">
          <TrendingUp size={24} className="text-cyber-cyan" />
          <span>PROGRESSO</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* XP Principal */}
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-100 mb-2">
            {progress.totalPoints.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">XP Total</div>
        </div>

        {/* Métricas em Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded bg-military-bg/50">
            <div className="flex items-center justify-center mb-2">
              <Flame size={20} className="text-cyber-warning" />
            </div>
            <div className="text-2xl font-bold text-gray-100">
              {stats.currentStreak}
            </div>
            <div className="text-xs text-gray-400">Streak</div>
          </div>
          
          <div className="text-center p-3 rounded bg-military-bg/50">
            <div className="flex items-center justify-center mb-2">
              <Award size={20} className="text-cyber-cyan" />
            </div>
            <div className="text-2xl font-bold text-gray-100">
              {progress.badges.length}
            </div>
            <div className="text-xs text-gray-400">Badges</div>
          </div>
        </div>

        {/* Nível */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Nível {progress.level}</span>
            <span className="text-gray-400">{Math.floor((progress.level + 1) * 1000 - progress.totalPoints)} XP restante</span>
          </div>
          <div className="w-full bg-military-border rounded-full h-2">
            <div 
              className="bg-cyber-cyan h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${((progress.totalPoints % 1000) / 1000) * 100}%` 
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
