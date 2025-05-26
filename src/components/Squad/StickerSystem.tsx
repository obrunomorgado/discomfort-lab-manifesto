
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';
import { Sticker } from '@/types/stickers';
import { createStickers } from '@/data/stickers';
import { calculateTotalPoints, getUnlockedCount } from '@/utils/stickerUtils';
import StickerCard from './StickerCard';
import StickerDetails from './StickerDetails';

const StickerSystem = () => {
  const { progress } = useUserProgress();
  const { playSound } = useSoundEffects();
  const { toast } = useToast();
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);

  const stickers = createStickers(progress);

  const handleClaimSticker = (sticker: Sticker) => {
    if (!sticker.unlocked) return;

    playSound('squad_bonus');
    toast({
      title: `🏆 STICKER DESBLOQUEADO!`,
      description: `Você ganhou "${sticker.name}" (+${sticker.points} pts)`,
    });
  };

  const unlockedCount = getUnlockedCount(stickers);
  const totalPoints = calculateTotalPoints(stickers);

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
              <StickerCard
                key={sticker.id}
                sticker={sticker}
                isSelected={selectedSticker?.id === sticker.id}
                onSelect={setSelectedSticker}
                onClaim={handleClaimSticker}
              />
            ))}
          </div>
        </ScrollArea>

        {selectedSticker && <StickerDetails sticker={selectedSticker} />}
      </CardContent>
    </Card>
  );
};

export default StickerSystem;
