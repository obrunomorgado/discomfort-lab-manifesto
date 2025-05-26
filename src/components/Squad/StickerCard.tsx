
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sticker } from '@/types/stickers';
import { getRarityColor } from '@/utils/stickerUtils';

interface StickerCardProps {
  sticker: Sticker;
  isSelected: boolean;
  onSelect: (sticker: Sticker) => void;
  onClaim: (sticker: Sticker) => void;
}

const StickerCard = ({ sticker, isSelected, onSelect, onClaim }: StickerCardProps) => {
  return (
    <div
      className={`p-4 rounded border transition-all duration-300 cursor-pointer ${
        getRarityColor(sticker.rarity)
      } ${sticker.unlocked ? 'hover:scale-105' : 'opacity-50'} ${
        isSelected ? 'ring-2 ring-cyber-fuchsia/50' : ''
      }`}
      onClick={() => onSelect(sticker)}
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
              onClaim(sticker);
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
  );
};

export default StickerCard;
