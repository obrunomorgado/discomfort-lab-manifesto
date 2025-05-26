
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { QrCode } from 'lucide-react';
import { Penalty } from './types';
import { getDifficultyColor } from './utils';

interface PenaltyDisplayProps {
  penalty: Penalty;
  qrData: string;
}

const PenaltyDisplay: React.FC<PenaltyDisplayProps> = ({ penalty, qrData }) => {
  return (
    <div className={`p-4 rounded border ${getDifficultyColor(penalty.difficulty)} mb-4`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {penalty.icon}
          <span className="font-bebas text-sm">{penalty.name}</span>
        </div>
        <Badge className="text-xs">
          ⏱️ {penalty.duration}
        </Badge>
      </div>
      <p className="text-xs font-consolas text-warm-gray/80 mb-3">
        {penalty.description}
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
  );
};

export default PenaltyDisplay;
