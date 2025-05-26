
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SquadCreationProps {
  onCreateSquad: (name: string) => Promise<void>;
}

const SquadCreation = ({ onCreateSquad }: SquadCreationProps) => {
  const [squadName, setSquadName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateSquad = async () => {
    if (!squadName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Digite um nome para o squad",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    try {
      await onCreateSquad(squadName.trim());
      setSquadName('');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-dark-card/30 p-4 rounded border border-military-border">
      <h3 className="font-bebas text-warm-gray mb-2">CRIAR NOVO SQUAD</h3>
      <div className="space-y-3">
        <Input
          placeholder="Nome do esquadrão..."
          value={squadName}
          onChange={(e) => setSquadName(e.target.value)}
          className="bg-military-bg border-military-border text-warm-gray"
          maxLength={30}
        />
        <Button 
          onClick={handleCreateSquad}
          disabled={isCreating}
          className="w-full bg-cyber-fuchsia text-military-bg hover:bg-cyber-fuchsia/90 font-bebas"
        >
          {isCreating ? 'CRIANDO...' : 'FORMAR ESQUADRÃO'}
        </Button>
      </div>
    </div>
  );
};

export default SquadCreation;
