
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BettingEnvelope } from '@/types/missions';
import { BETTING_ENVELOPES } from '@/data/missions';
import { Dice6, Package } from 'lucide-react';

interface BettingMachineProps {
  isOpen: boolean;
  onClose: () => void;
  onEnvelopeSelect: (envelope: BettingEnvelope) => void;
}

const BettingMachine = ({ isOpen, onClose, onEnvelopeSelect }: BettingMachineProps) => {
  const [selectedEnvelope, setSelectedEnvelope] = useState<BettingEnvelope | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  if (!isOpen) return null;

  const handleEnvelopeClick = (envelope: BettingEnvelope) => {
    setSelectedEnvelope(envelope);
    setIsRevealed(true);
  };

  const handleConfirm = () => {
    if (selectedEnvelope) {
      onEnvelopeSelect(selectedEnvelope);
      onClose();
      setSelectedEnvelope(null);
      setIsRevealed(false);
    }
  };

  const getEffectDescription = (envelope: BettingEnvelope) => {
    switch (envelope.effect) {
      case 'penalty_increase':
        return `Penalidade multiplicada por ${envelope.value}x`;
      case 'bonus_points':
        return `Pontos multiplicados por ${envelope.value}x`;
      case 'extra_mission':
        return `+${envelope.value} missão extra obrigatória`;
      case 'penalty_decrease':
        return `Penalidade reduzida em ${envelope.value * 100}%`;
    }
  };

  const getEffectColor = (effect: BettingEnvelope['effect']) => {
    switch (effect) {
      case 'penalty_increase': return 'text-cyber-warning';
      case 'bonus_points': return 'text-cyber-neon';
      case 'extra_mission': return 'text-cyber-fuchsia';
      case 'penalty_decrease': return 'text-cyber-cyan';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 scanline-overlay">
      <Card className="bg-military-card border-cyber-fuchsia/30 max-w-2xl w-full rivet-border cyber-glow">
        <CardHeader className="bg-gradient-to-r from-cyber-fuchsia/20 to-cyber-cyan/20 rounded-t-lg">
          <CardTitle className="flex items-center space-x-2 font-bebas text-cyber-fuchsia">
            <Dice6 size={24} />
            <span>MÁQUINA DE APOSTAS</span>
          </CardTitle>
          <p className="text-warm-gray/70 font-consolas text-sm">
            Escolha um envelope para determinar as regras do seu dia
          </p>
        </CardHeader>
        <CardContent className="p-6">
          {!isRevealed ? (
            <>
              <div className="text-center mb-6">
                <h2 className="font-bebas text-xl text-warm-gray mb-2">
                  ESCOLHA SEU DESTINO
                </h2>
                <p className="text-sm text-warm-gray/70 font-consolas">
                  Selecione um dos 3 envelopes. Cada um contém uma modificação diferente para suas missões de hoje.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-6">
                {BETTING_ENVELOPES.map((envelope, index) => (
                  <div
                    key={envelope.id}
                    className="text-center cursor-pointer hover-lift hover-glitch"
                    onClick={() => handleEnvelopeClick(envelope)}
                  >
                    <div className="bg-military-bg/50 border-2 border-cyber-fuchsia/30 rounded-lg p-6 hover:border-cyber-fuchsia/60 transition-all">
                      <Package size={48} className="text-cyber-fuchsia mx-auto mb-4" />
                      <div className="font-bebas text-cyber-fuchsia text-lg">
                        ENVELOPE {index + 1}
                      </div>
                      <div className="text-xs text-warm-gray/60 font-consolas mt-2">
                        ???
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                onClick={onClose}
                variant="outline"
                className="w-full border-military-border text-warm-gray hover:bg-military-border/20"
              >
                PULAR APOSTAS (USAR REGRAS NORMAIS)
              </Button>
            </>
          ) : selectedEnvelope && (
            <>
              <div className="text-center mb-6">
                <h2 className="font-bebas text-2xl text-cyber-fuchsia mb-4">
                  ENVELOPE REVELADO!
                </h2>
                
                <div className="bg-military-bg/50 border-2 border-cyber-fuchsia/50 rounded-lg p-6 mb-4">
                  <h3 className="font-bebas text-xl text-cyber-fuchsia mb-2">
                    {selectedEnvelope.title}
                  </h3>
                  <p className="text-warm-gray font-consolas mb-4">
                    {selectedEnvelope.description}
                  </p>
                  
                  <div className={`font-bebas text-lg ${getEffectColor(selectedEnvelope.effect)}`}>
                    {getEffectDescription(selectedEnvelope)}
                  </div>
                </div>

                <div className="bg-cyber-warning/10 p-4 rounded border border-cyber-warning/30 mb-6">
                  <p className="text-cyber-warning font-consolas text-sm">
                    ⚠️ Este efeito será aplicado a todas as suas missões de hoje.
                    Não há como reverter após confirmar.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={() => {
                    setIsRevealed(false);
                    setSelectedEnvelope(null);
                  }}
                  variant="outline"
                  className="flex-1 border-military-border text-warm-gray hover:bg-military-border/20"
                >
                  ESCOLHER OUTRO
                </Button>
                <Button 
                  onClick={handleConfirm}
                  className="flex-1 bg-cyber-fuchsia text-military-bg hover:bg-cyber-fuchsia/90 font-bebas"
                >
                  CONFIRMAR ESCOLHA
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BettingMachine;
