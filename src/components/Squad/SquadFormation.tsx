
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import SquadCreation from './SquadCreation';
import SquadJoining from './SquadJoining';

interface SquadFormationProps {
  onCreateSquad: (name: string) => Promise<void>;
  onJoinSquad: (inviteCode: string) => Promise<void>;
}

const SquadFormation = ({ onCreateSquad, onJoinSquad }: SquadFormationProps) => {
  return (
    <Card className="bg-military-card border-cyber-fuchsia/30 rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-bebas text-cyber-fuchsia">
          <Users size={24} />
          <span>FORMAR ESQUADRÃO</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SquadCreation onCreateSquad={onCreateSquad} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-military-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-military-card px-2 text-warm-gray/70">OU</span>
          </div>
        </div>

        <SquadJoining onJoinSquad={onJoinSquad} />

        <div className="bg-cyber-warning/10 border border-cyber-warning/30 rounded p-3">
          <p className="text-xs text-cyber-warning font-consolas">
            ⚠️ ATENÇÃO: Em um squad, quando um membro falha na missão, 
            TODOS perdem 20% do XP. Escolha seus companheiros com sabedoria.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SquadFormation;
