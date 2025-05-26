
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skull } from 'lucide-react';
import RouletteWheel from './QRRoletaDor/RouletteWheel';
import PenaltyDisplay from './QRRoletaDor/PenaltyDisplay';
import PenaltiesList from './QRRoletaDor/PenaltiesList';
import { useRouletteLogic } from './QRRoletaDor/useRouletteLogic';
import { PENALTIES } from './QRRoletaDor/penalties';

const QRRoletaDor = () => {
  const {
    currentPenalty,
    isSpinning,
    qrData,
    spinRoulette,
    resetRoulette
  } = useRouletteLogic(PENALTIES);

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
          <RouletteWheel currentPenalty={currentPenalty} isSpinning={isSpinning} />

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
          <PenaltyDisplay penalty={currentPenalty} qrData={qrData} />
        )}

        <PenaltiesList penalties={PENALTIES} />
      </CardContent>
    </Card>
  );
};

export default QRRoletaDor;
