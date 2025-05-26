
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useToast } from '@/hooks/use-toast';
import { Star, Award, Flame, Skull, Shield, Target, Zap, Crown } from 'lucide-react';

interface Sticker {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  condition: string;
  points: number;
}

const StickerSystem = () => {
  const { progress } = useUserProgress();
  const { playSound } = useSoundEffects();
  const { toast } = useToast();
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);

  // Safe access to missionsCompleted with fallback to empty array
  const missionsCompleted = progress.missionsCompleted || [];
  const completedMissions = missionsCompleted.filter(m => m.completed);

  const stickers: Sticker[] = [
    {
      id: 'sem-mimimi-1',
      name: 'SEM MIMIMI',
      description: 'Complete 5 missões consecutivas sem falhar',
      icon: <Shield size={24} className="text-cyber-neon" />,
      rarity: 'rare',
      unlocked: completedMissions.length >= 5,
      condition: '5 missões consecutivas',
      points: 100
    },
    {
      id: 'guerreiro-disciplina',
      name: 'GUERREIRO DA DISCIPLINA',
      description: 'Complete 10 missões em uma semana',
      icon: <Target size={24} className="text-cyber-cyan" />,
      rarity: 'epic',
      unlocked: completedMissions.length >= 10,
      condition: '10 missões/semana',
      points: 250
    },
    {
      id: 'lenda-do-foco',
      name: 'LENDA DO FOCO',
      description: 'Complete 50 missões com 90%+ de sucesso',
      icon: <Crown size={24} className="text-cyber-warning" />,
      rarity: 'legendary',
      unlocked: false,
      condition: '50 missões 90% sucesso',
      points: 1000
    },
    {
      id: 'exterminador-habitos',
      name: 'EXTERMINADOR DE HÁBITOS',
      description: 'Quebre 3 vícios diferentes',
      icon: <Flame size={24} className="text-red-400" />,
      rarity: 'epic',
      unlocked: false,
      condition: '3 vícios quebrados',
      points: 500
    },
    {
      id: 'recruta-ferro',
      name: 'RECRUTA DE FERRO',
      description: 'Complete primeira missão',
      icon: <Star size={24} className="text-warm-gray" />,
      rarity: 'common',
      unlocked: missionsCompleted.length > 0,
      condition: 'Primeira missão',
      points: 25
    },
    {
      id: 'survivor-72h',
      name: 'SURVIVOR 72H',
      description: 'Complete o Desafio 72h sem falhar',
      icon: <Skull size={24} className="text-cyber-fuchsia" />,
      rarity: 'legendary',
      unlocked: false,
      condition: 'Desafio 72h completo',
      points: 2000
    },
    {
      id: 'mestre-resistencia',
      name: 'MESTRE DA RESISTÊNCIA',
      description: 'Resista a 20 tentações seguidas',
      icon: <Zap size={24} className="text-cyber-neon" />,
      rarity: 'rare',
      unlocked: false,
      condition: '20 resistências',
      points: 150
    },
    {
      id: 'inspiracao-squad',
      name: 'INSPIRAÇÃO DO SQUAD',
      description: 'Ajude 5 membros a completarem missões',
      icon: <Award size={24} className="text-cyber-cyan" />,
      rarity: 'epic',
      unlocked: false,
      condition: '5 ajudas no squad',
      points: 300
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-warm-gray/50 bg-warm-gray/10 text-warm-gray';
      case 'rare':
        return 'border-cyber-cyan/50 bg-cyber-cyan/10 text-cyber-cyan';
      case 'epic':
        return 'border-cyber-fuchsia/50 bg-cyber-fuchsia/10 text-cyber-fuchsia';
      case 'legendary':
        return 'border-cyber-warning/50 bg-cyber-warning/10 text-cyber-warning animate-pulse';
      default:
        return 'border-military-border bg-military-bg/10';
    }
  };

  const handleClaimSticker = (sticker: Sticker) => {
    if (!sticker.unlocked) return;

    playSound('squad_bonus');
    toast({
      title: `🏆 STICKER DESBLOQUEADO!`,
      description: `Você ganhou "${sticker.name}" (+${sticker.points} pts)`,
    });
  };

  const unlockedCount = stickers.filter(s => s.unlocked).length;
  const totalPoints = stickers.filter(s => s.unlocked).reduce((sum, s) => sum + s.points, 0);

  return (
    <Card className="bg-military-card border-cyber-fuchsia/30 rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-bebas text-cyber-fuchsia">
          <div className="flex items-center space-x-2">
            <Star size={24} />
            <span>STICKERS SEM MIMIMI</span>
            <Badge className="bg-cyber-warning/20 border-cyber-warning/50 text-cyber-warning">
              {unlockedCount}/{stickers.length}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-sm text-warm-gray/70">PONTOS TOTAIS</div>
            <div className="text-lg text-cyber-cyan">{totalPoints.toLocaleString()}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-cyber-fuchsia/10 border border-cyber-fuchsia/30 rounded p-3 mb-6">
          <p className="text-xs text-cyber-fuchsia font-consolas">
            💪 Colete stickers especiais completando desafios! Cada sticker representa uma conquista real na sua jornada de disciplina.
          </p>
        </div>

        <ScrollArea className="h-96">
          <div className="grid md:grid-cols-2 gap-4">
            {stickers.map((sticker) => (
              <div
                key={sticker.id}
                className={`p-4 rounded border transition-all duration-300 cursor-pointer ${
                  getRarityColor(sticker.rarity)
                } ${sticker.unlocked ? 'hover:scale-105' : 'opacity-50'} ${
                  selectedSticker?.id === sticker.id ? 'ring-2 ring-cyber-fuchsia/50' : ''
                }`}
                onClick={() => setSelectedSticker(sticker)}
              >
                <div className="flex items-center space-x-3 mb-3">
                  {sticker.icon}
                  <div className="flex-1">
                    <h3 className="font-bebas text-sm text-warm-gray">{sticker.name}</h3>
                    <Badge className={`${getRarityColor(sticker.rarity)} text-xs`}>
                      {sticker.rarity.toUpperCase()}
                    </Badge>
                  </div>
                  {sticker.unlocked && (
                    <div className="text-right">
                      <div className="text-xs text-cyber-cyan">+{sticker.points} pts</div>
                    </div>
                  )}
                </div>

                <p className="text-xs text-warm-gray/70 font-consolas mb-3">
                  {sticker.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-warm-gray/60 font-consolas">
                    {sticker.condition}
                  </span>
                  {sticker.unlocked ? (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClaimSticker(sticker);
                      }}
                      size="sm"
                      className="bg-cyber-neon text-military-bg hover:bg-cyber-neon/90 text-xs"
                    >
                      EQUIPAR
                    </Button>
                  ) : (
                    <Badge className="bg-military-border/20 border-military-border text-warm-gray/60 text-xs">
                      BLOQUEADO
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {selectedSticker && (
          <div className="mt-6 p-4 bg-military-bg/50 rounded border border-cyber-fuchsia/30">
            <div className="flex items-center space-x-3 mb-3">
              {selectedSticker.icon}
              <div>
                <h3 className="font-bebas text-cyber-fuchsia">{selectedSticker.name}</h3>
                <Badge className={`${getRarityColor(selectedSticker.rarity)} text-xs`}>
                  {selectedSticker.rarity.toUpperCase()} • +{selectedSticker.points} pts
                </Badge>
              </div>
            </div>
            <p className="text-sm text-warm-gray font-consolas mb-3">
              {selectedSticker.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-warm-gray/70">
                Condição: {selectedSticker.condition}
              </span>
              {selectedSticker.unlocked && (
                <span className="text-xs text-cyber-neon font-bebas">✓ DESBLOQUEADO</span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StickerSystem;
