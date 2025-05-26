
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { usePenaltyContract } from '@/hooks/usePenaltyContract';
import { AlertTriangle, DollarSign, Users, Building2 } from 'lucide-react';

interface PenaltySetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PenaltySetupModal = ({ isOpen, onClose }: PenaltySetupModalProps) => {
  const [task, setTask] = useState('');
  const [amount, setAmount] = useState(10);
  const [destination, setDestination] = useState<'fund' | 'ngo' | 'friend'>('fund');
  const [ngoName, setNgoName] = useState('Instituto Ayrton Senna');
  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  const { createContract, loading } = usePenaltyContract();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!task.trim()) {
      toast({
        title: "Erro",
        description: "Defina uma tarefa diária",
        variant: "destructive"
      });
      return;
    }

    if (!agreed) {
      toast({
        title: "Erro", 
        description: "Aceite os termos para continuar",
        variant: "destructive"
      });
      return;
    }

    const destinationDetails: any = {};
    if (destination === 'ngo') {
      destinationDetails.ngo_name = ngoName;
      destinationDetails.ngo_pix = 'instituto@ayrtonsenna.org.br';
    } else if (destination === 'friend') {
      if (!friendName.trim() || !friendPhone.trim()) {
        toast({
          title: "Erro",
          description: "Preencha nome e telefone do amigo",
          variant: "destructive"
        });
        return;
      }
      destinationDetails.friend_name = friendName;
      destinationDetails.friend_phone = friendPhone;
    }

    const result = await createContract({
      user_id: 'current-user', // Add the missing user_id
      daily_task: task,
      penalty_amount: amount * 100, // converter para centavos
      currency: 'BRL',
      destination_type: destination,
      destination_details: destinationDetails,
      is_active: false // será ativado após confirmar método de pagamento
    });

    if (result.success) {
      // Aqui integraria com Stripe Elements para capturar método de pagamento
      toast({
        title: "Compromisso Criado!",
        description: "Configure seu método de pagamento para ativar",
      });
      onClose();
    } else {
      toast({
        title: "Erro",
        description: "Falha ao criar compromisso",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-dark-card border-warm-yellow/30">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-warm-yellow font-bebas">
            <AlertTriangle size={24} />
            <span>BOTE DINHEIRO ONDE ESTÁ SUA BOCA</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Alert className="bg-red-900/30 border-red-500/50">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">
              Se falhar no dever diário, você será cobrado automaticamente.
            </AlertDescription>
          </Alert>

          <div>
            <Label htmlFor="task" className="text-warm-gray">Dever Diário</Label>
            <Input
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Ex: Exercitar 30 min, Ler 20 páginas..."
              className="bg-dark-bg border-dark-border text-warm-gray"
            />
          </div>

          <div>
            <Label htmlFor="amount" className="text-warm-gray">Valor da Multa (R$)</Label>
            <div className="flex items-center space-x-2">
              <DollarSign className="text-green-400" size={20} />
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="5"
                max="500"
                className="bg-dark-bg border-dark-border text-warm-gray"
              />
            </div>
          </div>

          <div>
            <Label className="text-warm-gray mb-3 block">Destino da Multa</Label>
            <RadioGroup value={destination} onValueChange={(value: any) => setDestination(value)}>
              <div className="flex items-center space-x-2 p-3 bg-dark-bg/50 rounded border border-dark-border">
                <RadioGroupItem value="fund" id="fund" />
                <Label htmlFor="fund" className="flex items-center space-x-2 text-warm-gray cursor-pointer">
                  <Building2 size={16} className="text-blue-400" />
                  <span>Fundo Interno (volta como créditos)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-dark-bg/50 rounded border border-dark-border">
                <RadioGroupItem value="ngo" id="ngo" />
                <Label htmlFor="ngo" className="flex items-center space-x-2 text-warm-gray cursor-pointer">
                  <Building2 size={16} className="text-green-400" />
                  <span>ONG - {ngoName}</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-dark-bg/50 rounded border border-dark-border">
                <RadioGroupItem value="friend" id="friend" />
                <Label htmlFor="friend" className="flex items-center space-x-2 text-warm-gray cursor-pointer">
                  <Users size={16} className="text-orange-400" />
                  <span>Amigo-Zueiro</span>
                </Label>
              </div>
            </RadioGroup>

            {destination === 'friend' && (
              <div className="mt-3 space-y-3">
                <Input
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  placeholder="Nome do amigo"
                  className="bg-dark-bg border-dark-border text-warm-gray"
                />
                <Input
                  value={friendPhone}
                  onChange={(e) => setFriendPhone(e.target.value)}
                  placeholder="WhatsApp do amigo"
                  className="bg-dark-bg border-dark-border text-warm-gray"
                />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agreed"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="agreed" className="text-sm text-warm-gray cursor-pointer">
              Confirmo que aceito cobrança automática se não cumprir
            </Label>
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={handleSubmit}
              disabled={loading || !agreed}
              className="flex-1 bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas"
            >
              {loading ? 'CRIANDO...' : 'SALVAR COMPROMISSO'}
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="border-dark-border text-warm-gray"
            >
              CANCELAR
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PenaltySetupModal;
