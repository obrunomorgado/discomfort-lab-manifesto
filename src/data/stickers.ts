
import { Shield, Target, Crown, Flame, Star, Skull, Zap, Award } from 'lucide-react';
import { Sticker } from '@/types/stickers';
import { UserProgress } from '@/types/user';

export const createStickers = (progress: UserProgress): Sticker[] => {
  // Safe access to missionsCompleted with fallback to empty array
  const missionsCompleted = progress.missionsCompleted || [];
  const completedMissions = missionsCompleted.filter(m => m.completed);

  return [
    {
      id: 'sem-mimimi-1',
      name: 'SEM MIMIMI',
      description: 'Complete 5 missões consecutivas sem falhar',
      icon: <Shield size={24} className="text-cyber-neon" />,
      rarity: 'rare',
      unlocked: completedMissions.length >= 5,
      condition: '5 missões consecutivas',
      points: 100
    },
    {
      id: 'guerreiro-disciplina',
      name: 'GUERREIRO DA DISCIPLINA',
      description: 'Complete 10 missões em uma semana',
      icon: <Target size={24} className="text-cyber-cyan" />,
      rarity: 'epic',
      unlocked: completedMissions.length >= 10,
      condition: '10 missões/semana',
      points: 250
    },
    {
      id: 'lenda-do-foco',
      name: 'LENDA DO FOCO',
      description: 'Complete 50 missões com 90%+ de sucesso',
      icon: <Crown size={24} className="text-cyber-warning" />,
      rarity: 'legendary',
      unlocked: false,
      condition: '50 missões 90% sucesso',
      points: 1000
    },
    {
      id: 'exterminador-habitos',
      name: 'EXTERMINADOR DE HÁBITOS',
      description: 'Quebre 3 vícios diferentes',
      icon: <Flame size={24} className="text-red-400" />,
      rarity: 'epic',
      unlocked: false,
      condition: '3 vícios quebrados',
      points: 500
    },
    {
      id: 'recruta-ferro',
      name: 'RECRUTA DE FERRO',
      description: 'Complete primeira missão',
      icon: <Star size={24} className="text-warm-gray" />,
      rarity: 'common',
      unlocked: missionsCompleted.length > 0,
      condition: 'Primeira missão',
      points: 25
    },
    {
      id: 'survivor-72h',
      name: 'SURVIVOR 72H',
      description: 'Complete o Desafio 72h sem falhar',
      icon: <Skull size={24} className="text-cyber-fuchsia" />,
      rarity: 'legendary',
      unlocked: false,
      condition: 'Desafio 72h completo',
      points: 2000
    },
    {
      id: 'mestre-resistencia',
      name: 'MESTRE DA RESISTÊNCIA',
      description: 'Resista a 20 tentações seguidas',
      icon: <Zap size={24} className="text-cyber-neon" />,
      rarity: 'rare',
      unlocked: false,
      condition: '20 resistências',
      points: 150
    },
    {
      id: 'inspiracao-squad',
      name: 'INSPIRAÇÃO DO SQUAD',
      description: 'Ajude 5 membros a completarem missões',
      icon: <Award size={24} className="text-cyber-cyan" />,
      rarity: 'epic',
      unlocked: false,
      condition: '5 ajudas no squad',
      points: 300
    }
  ];
};
