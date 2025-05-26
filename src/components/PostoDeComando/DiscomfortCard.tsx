
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DiscomfortCard as DiscomfortCardType } from '@/types/missions';
import { DISCOMFORT_CARDS } from '@/data/missions';
import { Zap, Clock, Bomb } from 'lucide-react';

interface DiscomfortCardProps {
  onAccept: (card: DiscomfortCardType) => void;
  onDismiss: () => void;
}

const DiscomfortCard = ({ onAccept, onDismiss }: DiscomfortCardProps) => {
  const [currentCard, setCurrentCard] = useState<DiscomfortCardType | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    // Verificar se já foi mostrado hoje
    const lastCardDate = localStorage.getItem('lastDiscomfortCard');
    const today = new Date().toDateString();
    
    if (lastCardDate !== today) {
      // Mostrar carta aleatória
      const randomCard = DISCOMFORT_CARDS[Math.floor(Math.random() * DISCOMFORT_CARDS.length)];
      setCurrentCard(randomCard);
      setTimeLeft(randomCard.timeLimit * 60); // converter para segundos
      localStorage.setItem('lastDiscomfortCard', today);
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  const getCategoryColor = (category: DiscomfortCardType['category']) => {
    switch (category) {
      case 'surprise': return 'bg-cyber-fuchsia/20 border-cyber-fuchsia/50 text-cyber-fuchsia';
      case 'social': return 'bg-cyber-cyan/20 border-cyber-cyan/50 text-cyber-cyan';
      case 'professional': return 'bg-cyber-warning/20 border-cyber-warning/50 text-cyber-warning';
      case 'physical': return 'bg-cyber-neon/20 border-cyber-neon/50 text-cyber-neon';
    }
  };

  if (!currentCard) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 scanline-overlay">
      <Card className="bg-military-card border-cyber-warning/50 max-w-lg w-full rivet-border warning-glow animate-pulse-warning">
        <CardHeader className="bg-gradient-to-r from-cyber-warning/30 to-red-700/30 rounded-t-lg">
          <CardTitle className="flex items-center space-x-2 font-bebas text-cyber-warning">
            <Bomb size={24} />
            <span>CARTILHA DO DESCONFORTO</span>
          </CardTitle>
          <div className="flex items-center justify-between">
            <Badge className={getCategoryColor(currentCard.category)}>
              {currentCard.category.toUpperCase()}
            </Badge>
            <div className="flex items-center space-x-1 text-cyber-warning">
              <Clock size={16} />
              <span className="font-consolas font-bold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="text-center">
            <h2 className="font-bebas text-2xl text-cyber-warning mb-2">
              {currentCard.title}
            </h2>
            <p className="text-warm-gray font-consolas mb-4">
              {currentCard.description}
            </p>
            
            <div className="bg-cyber-warning/10 p-4 rounded border border-cyber-warning/30 mb-4">
              <h3 className="font-bebas text-cyber-warning mb-2">AÇÃO REQUERIDA:</h3>
              <p className="font-consolas text-cyber-warning text-sm">
                {currentCard.action}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                <Zap size={16} className="text-cyber-neon" />
                <span className="font-consolas text-cyber-neon">
                  +{currentCard.bonusPoints} XP BÔNUS
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => onAccept(currentCard)}
              className="w-full bg-cyber-warning text-military-bg hover:bg-cyber-warning/90 font-bebas text-lg hover-lift hover-glitch"
            >
              ACEITAR DESAFIO
            </Button>
            
            <Button 
              onClick={onDismiss}
              variant="outline"
              className="w-full border-military-border text-warm-gray/70 hover:bg-military-border/20 font-consolas text-sm"
            >
              RECUSAR (COVARDE)
            </Button>
          </div>

          <div className="text-center text-xs text-warm-gray/50 font-consolas">
            ⚠️ Esta oportunidade expira automaticamente em {formatTime(timeLeft)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscomfortCard;
