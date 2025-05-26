
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText } from 'lucide-react';
import { UserProgress, UserStats } from '@/types/user';

interface IntelSectionProps {
  progress: UserProgress;
  stats: UserStats;
}

const IntelSection = ({ progress, stats }: IntelSectionProps) => {
  const levelProgress = {
    current: progress.totalPoints - ((progress.level - 1) * 1000),
    needed: 1000,
    percentage: ((progress.totalPoints - ((progress.level - 1) * 1000)) / 1000) * 100
  };

  return (
    <Card className="bg-military-card border-military-border rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-bebas text-warm-gray">
          <FileText size={20} className="text-cyber-cyan" />
          <span>INTEL DE MISSÃO</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-warm-gray/70 mb-1 font-consolas">Score de Disciplina:</div>
            <div className="flex items-center space-x-3">
              <Progress value={(stats.honestyScore / 10) * 100} className="flex-1 h-2" />
              <span className="font-bebas text-lg text-cyber-fuchsia">{stats.honestyScore}/10</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-warm-gray/70 mb-1 font-consolas">Progresso para Próximo Rank:</div>
            <div className="flex items-center space-x-3">
              <Progress value={levelProgress.percentage} className="flex-1 h-2" />
              <span className="font-bebas text-lg text-cyber-fuchsia">{levelProgress.current}/{levelProgress.needed}</span>
            </div>
          </div>
          {progress.testsCompleted.length > 0 && (
            <div>
              <div className="text-sm text-warm-gray/70 mb-2 font-consolas">Últimas Missões Executadas:</div>
              <div className="space-y-2">
                {progress.testsCompleted.slice(-3).reverse().map((test, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-military-bg/50 rounded border border-military-border">
                    <span className="text-sm text-warm-gray font-consolas">{test.testName}</span>
                    <Badge variant="outline" className="text-xs text-cyber-neon border-cyber-neon/50 font-consolas">
                      +{test.pointsEarned} XP
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IntelSection;
