
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SquadJoiningProps {
  onJoinSquad: (inviteCode: string) => Promise<void>;
}

const SquadJoining = ({ onJoinSquad }: SquadJoiningProps) => {
  const [inviteCode, setInviteCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const { toast } = useToast();

  const handleJoinSquad = async () => {
    if (!inviteCode.trim()) {
      toast({
        title: "Código obrigatório",
        description: "Digite o código do convite",
        variant: "destructive"
      });
      return;
    }

    setIsJoining(true);
    try {
      await onJoinSquad(inviteCode.trim().toUpperCase());
      setInviteCode('');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="bg-dark-card/30 p-4 rounded border border-military-border">
      <h3 className="font-bebas text-warm-gray mb-2">ENTRAR EM SQUAD</h3>
      <div className="space-y-3">
        <Input
          placeholder="Código do convite..."
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
          className="bg-military-bg border-military-border text-warm-gray font-consolas"
          maxLength={6}
        />
        <Button 
          onClick={handleJoinSquad}
          disabled={isJoining}
          variant="outline"
          className="w-full border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/20 font-bebas"
        >
          <UserPlus size={16} className="mr-2" />
          {isJoining ? 'ENTRANDO...' : 'ENTRAR NO SQUAD'}
        </Button>
      </div>
    </div>
  );
};

export default SquadJoining;
