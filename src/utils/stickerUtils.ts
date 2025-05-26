
import { Sticker } from '@/types/stickers';

export const getRarityColor = (rarity: string) => {
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

export const calculateTotalPoints = (stickers: Sticker[]): number => {
  return stickers.filter(s => s.unlocked).reduce((sum, s) => sum + s.points, 0);
};

export const getUnlockedCount = (stickers: Sticker[]): number => {
  return stickers.filter(s => s.unlocked).length;
};
