
import { useState, useRef } from 'react';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useToast } from '@/hooks/use-toast';
import { Penalty } from './types';
import { generateQRData } from './utils';

export const useRouletteLogic = (penalties: Penalty[]) => {
  const { playSound } = useSoundEffects();
  const { toast } = useToast();
  const [currentPenalty, setCurrentPenalty] = useState<Penalty | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [qrData, setQrData] = useState<string>('');
  const spinnerRef = useRef<NodeJS.Timeout | null>(null);

  const spinRoulette = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    playSound('button_click');
    
    let currentIndex = 0;
    const spinDuration = 3000; // 3 seconds
    const spinInterval = 100; // Change penalty every 100ms
    
    spinnerRef.current = setInterval(() => {
      currentIndex = (currentIndex + 1) % penalties.length;
      setCurrentPenalty(penalties[currentIndex]);
    }, spinInterval);

    setTimeout(() => {
      if (spinnerRef.current) {
        clearInterval(spinnerRef.current);
      }
      
      const finalPenalty = penalties[Math.floor(Math.random() * penalties.length)];
      setCurrentPenalty(finalPenalty);
      setQrData(generateQRData(finalPenalty));
      setIsSpinning(false);
      
      playSound('squad_penalty');
      toast({
        title: "🎯 PENALIDADE SORTEADA!",
        description: `${finalPenalty.name} - Execute imediatamente!`
      });
    }, spinDuration);
  };

  const resetRoulette = () => {
    setCurrentPenalty(null);
    setQrData('');
    setIsSpinning(false);
  };

  return {
    currentPenalty,
    isSpinning,
    qrData,
    spinRoulette,
    resetRoulette
  };
};
