
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Dices } from 'lucide-react';
import { Penalty } from './types';
import { getDifficultyColor } from './utils';

interface RouletteWheelProps {
  currentPenalty: Penalty | null;
  isSpinning: boolean;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({ currentPenalty, isSpinning }) => {
  return (
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
  );
};

export default RouletteWheel;
