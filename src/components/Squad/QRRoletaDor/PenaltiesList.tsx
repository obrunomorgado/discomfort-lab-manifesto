
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Penalty } from './types';
import { getDifficultyColor } from './utils';

interface PenaltiesListProps {
  penalties: Penalty[];
}

const PenaltiesList: React.FC<PenaltiesListProps> = ({ penalties }) => {
  return (
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
  );
};

export default PenaltiesList;
