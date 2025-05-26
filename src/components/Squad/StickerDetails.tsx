
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Sticker } from '@/types/stickers';
import { getRarityColor } from '@/utils/stickerUtils';

interface StickerDetailsProps {
  sticker: Sticker;
}

const StickerDetails = ({ sticker }: StickerDetailsProps) => {
  return (
    <div className="mt-6 p-4 bg-military-bg/50 rounded border border-cyber-fuchsia/30">
      <div className="flex items-center space-x-3 mb-3">
        {sticker.icon}
        <div>
          <h3 className="font-bebas text-cyber-fuchsia">{sticker.name}</h3>
          <Badge className={`${getRarityColor(sticker.rarity)} text-xs`}>
            {sticker.rarity.toUpperCase()} • +{sticker.points} pts
          </Badge>
        </div>
      </div>
      <p className="text-sm text-warm-gray font-consolas mb-3">
        {sticker.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-warm-gray/70">
          Condição: {sticker.condition}
        </span>
        {sticker.unlocked && (
          <span className="text-xs text-cyber-neon font-bebas">✓ DESBLOQUEADO</span>
        )}
      </div>
    </div>
  );
};

export default StickerDetails;
