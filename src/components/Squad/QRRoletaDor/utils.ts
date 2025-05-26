
import { Penalty, QRData } from './types';

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'border-green-500/50 bg-green-500/10 text-green-400';
    case 'medium': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400';
    case 'hard': return 'border-orange-500/50 bg-orange-500/10 text-orange-400';
    case 'extreme': return 'border-red-500/50 bg-red-500/10 text-red-400 animate-pulse';
    default: return 'border-gray-500/50 bg-gray-500/10';
  }
};

export const generateQRData = (penalty: Penalty): string => {
  const data: QRData = {
    type: 'penalty',
    id: penalty.id,
    name: penalty.name,
    timestamp: Date.now(),
    challenge: penalty.description
  };
  return JSON.stringify(data);
};
