
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Users, Crown, Copy, LogOut, Shield } from 'lucide-react';
import { Squad } from '@/types/squad';

interface SquadDisplayProps {
  squad: Squad;
  isLeader: boolean;
  onLeaveSquad: () => void;
}

const SquadDisplay = ({ squad, isLeader, onLeaveSquad }: SquadDisplayProps) => {
  const { toast } = useToast();

  const copyInviteCode = () => {
    if (squad?.inviteCode) {
      navigator.clipboard.writeText(squad.inviteCode);
      toast({
        title: "Código copiado!",
        description: "Compartilhe com seus companheiros",
      });
    }
  };

  return (
    <Card className="bg-military-card border-cyber-fuchsia/30 rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-bebas text-cyber-fuchsia">
          <Shield size={24} />
          <span>ESQUADRÃO ATIVO</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-military-bg/50 p-4 rounded border border-military-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bebas text-xl text-cyber-cyan">{squad.name}</h3>
            <Badge className="bg-cyber-neon/20 border-cyber-neon/50 text-cyber-neon">
              XP +{Math.round((squad.xpMultiplier - 1) * 100)}%
            </Badge>
          </div>
          
          <div className="space-y-3">
            {squad.members.map((member) => (
              <div key={member.userId} className="flex items-center justify-between p-3 bg-dark-card/30 rounded border border-military-border">
                <div className="flex items-center space-x-3">
                  <Users size={16} className="text-warm-gray" />
                  <span className="font-consolas text-warm-gray">{member.username}</span>
                  {member.isLeader && (
                    <Crown size={16} className="text-cyber-warning" />
                  )}
                </div>
                <div className="text-sm text-warm-gray/70">
                  Nível {member.level} • {member.totalPoints} XP
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-card/30 p-4 rounded border border-military-border">
          <h4 className="font-bebas text-warm-gray mb-2">CÓDIGO DE CONVITE</h4>
          <div className="flex items-center space-x-2">
            <Input 
              value={squad.inviteCode} 
              readOnly 
              className="font-consolas bg-military-bg border-military-border text-cyber-cyan"
            />
            <Button 
              onClick={copyInviteCode}
              variant="outline"
              size="sm"
              className="border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/20"
            >
              <Copy size={16} />
            </Button>
          </div>
          <p className="text-xs text-warm-gray/70 mt-2">
            Compartilhe este código para convidar até {3 - squad.members.length} recrutas
          </p>
        </div>

        <div className="flex space-x-3">
          {!isLeader && (
            <Button 
              onClick={onLeaveSquad}
              variant="outline"
              className="flex-1 border-cyber-warning/50 text-cyber-warning hover:bg-cyber-warning/20 font-bebas"
            >
              <LogOut size={16} className="mr-2" />
              DEIXAR SQUAD
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SquadDisplay;
