
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { UserProgress } from '@/types/user';

interface RecruitDataProps {
  progress: UserProgress;
}

const RecruitData = ({ progress }: RecruitDataProps) => {
  return (
    <Card className="bg-military-card border-military-border rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-bebas text-warm-gray">
          <User size={20} className="text-cyber-cyan" />
          <span>DADOS DO RECRUTA</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-warm-gray/70 font-consolas">ID:</span>
          <span className="font-mono text-sm text-cyber-fuchsia">#{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-warm-gray/70 font-consolas">Rank:</span>
          <span className="font-bebas text-cyber-fuchsia">{progress.level}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-warm-gray/70 font-consolas">Condecorações:</span>
          <span className="font-bebas text-cyber-fuchsia">{progress.badges.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-warm-gray/70 font-consolas">Última Operação:</span>
          <span className="text-sm text-warm-gray font-consolas">{new Date(progress.lastActivity).toLocaleDateString('pt-BR')}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecruitData;
