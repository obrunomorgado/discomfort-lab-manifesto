
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useAudioEffects } from '@/hooks/useAudioEffects';
import { useToast } from '@/hooks/use-toast';
import { Timer, DollarSign, Skull, Target, AlertTriangle, Crown } from 'lucide-react';

interface Challenge72hState {
  isActive: boolean;
  startTime: Date | null;
  virtualMoney: number;
  penalties: number;
  timeRemaining: number;
  status: 'not_started' | 'active' | 'completed' | 'failed';
}

const Desafio72h = () => {
  const { progress } = useUserProgress();
  const { playSound } = useAudioEffects();
  const { toast } = useToast();
  
  const [challenge, setChallenge] = useState<Challenge72hState>({
    isActive: false,
    startTime: null,
    virtualMoney: 50,
    penalties: 0,
    timeRemaining: 72 * 60 * 60 * 1000, // 72 hours in milliseconds
    status: 'not_started'
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (challenge.isActive && challenge.startTime) {
      interval = setInterval(() => {
        const elapsed = Date.now() - challenge.startTime!.getTime();
        const remaining = (72 * 60 * 60 * 1000) - elapsed;
        
        if (remaining <= 0) {
          setChallenge(prev => ({
            ...prev,
            isActive: false,
            timeRemaining: 0,
            status: 'completed'
          }));
          playSound('mission_success');
          toast({
            title: "🏆 DESAFIO 72H COMPLETADO!",
            description: `Parabéns! Você manteve R$ ${challenge.virtualMoney} virtuais!`,
          });
        } else {
          setChallenge(prev => ({
            ...prev,
            timeRemaining: remaining
          }));
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [challenge.isActive, challenge.startTime, challenge.virtualMoney, playSound, toast]);

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startChallenge = () => {
    setChallenge({
      isActive: true,
      startTime: new Date(),
      virtualMoney: 50,
      penalties: 0,
      timeRemaining: 72 * 60 * 60 * 1000,
      status: 'active'
    });
    
    playSound('squad_notification');
    toast({
      title: "⚡ DESAFIO 72H INICIADO!",
      description: "Você tem R$ 50 virtuais. Cada falha reduz R$ 10. Sobreviva!",
    });
  };

  const reportFailure = () => {
    if (!challenge.isActive) return;

    const newMoney = Math.max(0, challenge.virtualMoney - 10);
    const newPenalties = challenge.penalties + 1;
    
    if (newMoney === 0) {
      setChallenge(prev => ({
        ...prev,
        isActive: false,
        virtualMoney: 0,
        penalties: newPenalties,
        status: 'failed'
      }));
      
      playSound('flatline');
      toast({
        title: "💀 DESAFIO FALHADO!",
        description: "Você perdeu todo o dinheiro virtual! Tente novamente em 24h.",
        variant: "destructive"
      });
    } else {
      setChallenge(prev => ({
        ...prev,
        virtualMoney: newMoney,
        penalties: newPenalties
      }));
      
      playSound('penalty_applied');
      toast({
        title: "⚠️ PENALIDADE APLICADA!",
        description: `-R$ 10 virtuais. Restam R$ ${newMoney}`,
        variant: "destructive"
      });
    }
  };

  const resetChallenge = () => {
    setChallenge({
      isActive: false,
      startTime: null,
      virtualMoney: 50,
      penalties: 0,
      timeRemaining: 72 * 60 * 60 * 1000,
      status: 'not_started'
    });
  };

  const getStatusColor = () => {
    switch (challenge.status) {
      case 'active':
        return 'text-cyber-cyan';
      case 'completed':
        return 'text-cyber-neon';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-warm-gray';
    }
  };

  const progressPercentage = challenge.isActive 
    ? ((72 * 60 * 60 * 1000 - challenge.timeRemaining) / (72 * 60 * 60 * 1000)) * 100
    : 0;

  return (
    <Card className="bg-military-card border-cyber-warning/30 rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-bebas text-cyber-warning">
          <div className="flex items-center space-x-2">
            <Timer size={24} />
            <span>DESAFIO 72H</span>
            <Badge className={`${
              challenge.status === 'active' ? 'bg-cyber-cyan/20 border-cyber-cyan/50 text-cyber-cyan animate-pulse' :
              challenge.status === 'completed' ? 'bg-cyber-neon/20 border-cyber-neon/50 text-cyber-neon' :
              challenge.status === 'failed' ? 'bg-red-500/20 border-red-500/50 text-red-400' :
              'bg-warm-gray/20 border-warm-gray/50 text-warm-gray'
            }`}>
              {challenge.status === 'active' ? 'ATIVO' :
               challenge.status === 'completed' ? 'VENCEU' :
               challenge.status === 'failed' ? 'FALHOU' : 'AGUARDANDO'}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-cyber-warning/10 border border-cyber-warning/30 rounded p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign size={20} className="text-cyber-warning" />
            <span className="font-bebas text-cyber-warning">R$ 50 VIRTUAIS EM RISCO</span>
          </div>
          <p className="text-xs text-cyber-warning font-consolas">
            🎯 Sobreviva 72 horas sem falhar! Cada falha custa R$ 10 virtuais. 
            Se perder tudo, você fracassou no desafio!
          </p>
        </div>

        {/* Money Display */}
        <div className="bg-military-bg/50 p-4 rounded border border-military-border">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <div className="text-3xl font-bebas text-cyber-neon">
                R$ {challenge.virtualMoney.toFixed(2)}
              </div>
              <div className="text-sm text-warm-gray/70">DINHEIRO VIRTUAL</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-3xl font-bebas text-red-400">
                {challenge.penalties}
              </div>
              <div className="text-sm text-warm-gray/70">PENALIDADES</div>
            </div>
          </div>
          
          <Progress 
            value={(challenge.virtualMoney / 50) * 100} 
            className="h-3"
          />
          <div className="flex justify-between text-xs text-warm-gray/70 mt-1">
            <span>R$ 0</span>
            <span>R$ 50</span>
          </div>
        </div>

        {/* Timer Display */}
        {challenge.isActive && (
          <div className="bg-cyber-cyan/10 border border-cyber-cyan/30 rounded p-4">
            <div className="text-center mb-4">
              <div className="text-4xl font-bebas text-cyber-cyan font-mono">
                {formatTime(challenge.timeRemaining)}
              </div>
              <div className="text-sm text-warm-gray/70">TEMPO RESTANTE</div>
            </div>
            
            <Progress 
              value={progressPercentage} 
              className="h-2 mb-2"
            />
            <div className="text-xs text-center text-warm-gray/70">
              {progressPercentage.toFixed(1)}% completado
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {challenge.status === 'not_started' && (
            <Button
              onClick={startChallenge}
              className="w-full bg-cyber-warning text-military-bg hover:bg-cyber-warning/90 font-bebas text-lg py-6"
            >
              <Target size={20} className="mr-2" />
              INICIAR DESAFIO 72H
            </Button>
          )}

          {challenge.status === 'active' && (
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={reportFailure}
                variant="destructive"
                className="font-bebas"
              >
                <Skull size={16} className="mr-2" />
                REPORTAR FALHA
              </Button>
              <Button
                onClick={resetChallenge}
                variant="outline"
                className="border-military-border text-warm-gray hover:bg-military-border/20 font-bebas"
              >
                ABANDONAR
              </Button>
            </div>
          )}

          {(challenge.status === 'completed' || challenge.status === 'failed') && (
            <Button
              onClick={resetChallenge}
              className="w-full bg-cyber-fuchsia text-military-bg hover:bg-cyber-fuchsia/90 font-bebas"
            >
              <Crown size={20} className="mr-2" />
              NOVO DESAFIO
            </Button>
          )}
        </div>

        {/* Status Messages */}
        {challenge.status === 'completed' && (
          <div className="bg-cyber-neon/10 border border-cyber-neon/30 rounded p-4 text-center">
            <Crown size={32} className="mx-auto mb-2 text-cyber-neon" />
            <h3 className="font-bebas text-cyber-neon mb-2">PARABÉNS, GUERREIRO!</h3>
            <p className="text-sm text-cyber-neon font-consolas">
              Você sobreviveu 72 horas e manteve R$ {challenge.virtualMoney} virtuais!
              Você desbloqueou o sticker "SURVIVOR 72H"!
            </p>
          </div>
        )}

        {challenge.status === 'failed' && (
          <div className="bg-red-500/10 border border-red-500/30 rounded p-4 text-center">
            <Skull size={32} className="mx-auto mb-2 text-red-400" />
            <h3 className="font-bebas text-red-400 mb-2">MISSÃO FALHADA</h3>
            <p className="text-sm text-red-300 font-consolas">
              Você perdeu todo o dinheiro virtual em {challenge.penalties} falhas.
              Tente novamente quando estiver mais preparado!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Desafio72h;
