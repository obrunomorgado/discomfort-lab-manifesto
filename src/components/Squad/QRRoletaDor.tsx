
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useToast } from '@/hooks/use-toast';
import { Skull, QrCode, Dices, Zap, AlertTriangle, Clock } from 'lucide-react';

interface Penalty {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  duration: string;
  icon: React.ReactNode;
}

const QRRoletaDor = () => {
  const { playSound } = useSoundEffects();
  const { toast } = useToast();
  const [currentPenalty, setCurrentPenalty] = useState<Penalty | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [qrData, setQrData] = useState<string>('');
  const spinnerRef = useRef<NodeJS.Timeout | null>(null);

  const penalties: Penalty[] = [
    {
      id: 'pushups-50',
      name: '50 FLEXÕES AGORA',
      description: 'Pare tudo e faça 50 flexões. Sem desculpas.',
      difficulty: 'medium',
      duration: '5 min',
      icon: <Zap size={20} className="text-yellow-400" />
    },
    {
      id: 'cold-shower',
      name: 'BANHO GELADO 2 MIN',
      description: 'Próximo banho deve ser 2 minutos só de água fria.',
      difficulty: 'hard',
      duration: '2 min',
      icon: <AlertTriangle size={20} className="text-blue-400" />
    },
    {
      id: 'meditation-silence',
      name: 'MEDITAÇÃO 15 MIN',
      description: 'Sente em silêncio total por 15 minutos. Só você e seus pensamentos.',
      difficulty: 'easy',
      duration: '15 min',
      icon: <Clock size={20} className="text-green-400" />
    },
    {
      id: 'confession-public',
      name: 'CONFISSÃO PÚBLICA',
      description: 'Poste no squad sobre seu maior medo atual.',
      difficulty: 'extreme',
      duration: '1 min',
      icon: <Skull size={20} className="text-red-400" />
    },
    {
      id: 'no-phone-2h',
      name: 'SEM CELULAR 2H',
      description: 'Desligue o celular por 2 horas. Sem exceções.',
      difficulty: 'hard',
      duration: '2h',
      icon: <AlertTriangle size={20} className="text-orange-400" />
    },
    {
      id: 'gratitude-call',
      name: 'LIGA PRA MÃE/PAI',
      description: 'Ligue agora para um familiar e diga 3 coisas que agradece.',
      difficulty: 'medium',
      duration: '10 min',
      icon: <Zap size={20} className="text-pink-400" />
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'border-green-500/50 bg-green-500/10 text-green-400';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400';
      case 'hard': return 'border-orange-500/50 bg-orange-500/10 text-orange-400';
      case 'extreme': return 'border-red-500/50 bg-red-500/10 text-red-400 animate-pulse';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const generateQRData = (penalty: Penalty) => {
    const data = {
      type: 'penalty',
      id: penalty.id,
      name: penalty.name,
      timestamp: Date.now(),
      challenge: penalty.description
    };
    return JSON.stringify(data);
  };

  const spinRoulette = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    playSound('button_click');
    
    let currentIndex = 0;
    const spinDuration = 3000; // 3 seconds
    const spinInterval = 100; // Change penalty every 100ms
    
    spinnerRef.current = setInterval(() => {
      currentIndex = (currentIndex + 1) % penalties.length;
      setCurrentPenalty(penalties[currentIndex]);
    }, spinInterval);

    setTimeout(() => {
      if (spinnerRef.current) {
        clearInterval(spinnerRef.current);
      }
      
      const finalPenalty = penalties[Math.floor(Math.random() * penalties.length)];
      setCurrentPenalty(finalPenalty);
      setQrData(generateQRData(finalPenalty));
      setIsSpinning(false);
      
      playSound('squad_penalty');
      toast({
        title: "🎯 PENALIDADE SORTEADA!",
        description: `${finalPenalty.name} - Execute imediatamente!`,
        duration: 5000
      });
    }, spinDuration);
  };

  const resetRoulette = () => {
    setCurrentPenalty(null);
    setQrData('');
    setIsSpinning(false);
  };

  return (
    <Card className="bg-military-card border-red-500/30 rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-bebas text-red-400">
          <div className="flex items-center space-x-2">
            <Skull size={24} />
            <span>QR ROLETA DA DOR</span>
            <Badge className="bg-red-500/20 border-red-500/50 text-red-400 animate-pulse">
              EXTREMO
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-red-900/20 border border-red-500/30 rounded p-4 mb-6">
          <p className="text-xs text-red-400 font-consolas mb-2">
            ⚠️ ATENÇÃO: Sistema de penalidades aleatórias para quebrar zona de conforto
          </p>
          <p className="text-xs text-warm-gray/70 font-consolas">
            Gire a roleta e execute a penalidade sorteada IMEDIATAMENTE. Sem mimimi, sem desculpas.
          </p>
        </div>

        <div className="text-center mb-6">
          <div className="relative inline-block">
            <div className={`w-64 h-64 mx-auto border-4 border-red-500/50 rounded-full flex items-center justify-center mb-4 ${isSpinning ? 'animate-spin' : ''} bg-gradient-to-br from-red-900/30 to-orange-900/30`}>
              {currentPenalty ? (
                <div className="text-center p-4">
                  {currentPenalty.icon}
                  <div className="text-sm font-bebas text-red-300 mt-2">
                    {currentPenalty.name}
                  </div>
                  <Badge className={`${getDifficultyColor(currentPenalty.difficulty)} text-xs mt-2`}>
                    {currentPenalty.difficulty.toUpperCase()}
                  </Badge>
                </div>
              ) : (
                <div className="text-center">
                  <Dices size={48} className="text-red-400 mx-auto mb-2" />
                  <div className="text-sm font-bebas text-red-300">
                    GIRE A ROLETA
                  </div>
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={spinRoulette}
            disabled={isSpinning}
            className={`w-full mb-4 font-bebas text-lg ${isSpinning ? 'bg-red-900/50' : 'bg-red-600 hover:bg-red-700'} text-white`}
          >
            {isSpinning ? 'GIRANDO...' : '🎲 GIRAR ROLETA DA DOR'}
          </Button>

          {currentPenalty && !isSpinning && (
            <Button
              onClick={resetRoulette}
              variant="outline"
              className="w-full border-red-500/50 text-red-300 hover:bg-red-900/30"
            >
              🔄 NOVA PENALIDADE
            </Button>
          )}
        </div>

        {currentPenalty && !isSpinning && (
          <div className={`p-4 rounded border ${getDifficultyColor(currentPenalty.difficulty)} mb-4`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {currentPenalty.icon}
                <span className="font-bebas text-sm">{currentPenalty.name}</span>
              </div>
              <Badge className="text-xs">
                ⏱️ {currentPenalty.duration}
              </Badge>
            </div>
            <p className="text-xs font-consolas text-warm-gray/80 mb-3">
              {currentPenalty.description}
            </p>
            
            {qrData && (
              <div className="bg-white p-3 rounded text-center">
                <QrCode size={24} className="text-black mx-auto mb-2" />
                <div className="text-xs text-black font-mono break-all">
                  {qrData}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Compartilhe este QR como prova
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-military-bg/50 rounded p-3">
          <h4 className="font-bebas text-red-300 text-sm mb-2">PENALIDADES DISPONÍVEIS:</h4>
          <div className="space-y-1">
            {penalties.map((penalty) => (
              <div key={penalty.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  {penalty.icon}
                  <span className="text-warm-gray/70">{penalty.name}</span>
                </div>
                <Badge className={`${getDifficultyColor(penalty.difficulty)} text-xs`}>
                  {penalty.difficulty.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRRoletaDor;
