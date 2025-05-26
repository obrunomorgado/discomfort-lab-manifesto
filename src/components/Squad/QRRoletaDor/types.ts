
import React from 'react';

export interface Penalty {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  duration: string;
  icon: React.ReactNode;
}

export interface QRData {
  type: 'penalty';
  id: string;
  name: string;
  timestamp: number;
  challenge: string;
}
