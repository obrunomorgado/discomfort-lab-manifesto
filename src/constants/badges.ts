
import { Badge } from '@/types/user';

export const BADGES_DEFINITIONS: Omit<Badge, 'unlockedAt'>[] = [
  {
    id: 'first-test',
    name: 'Primeira Batalha',
    description: 'Completou seu primeiro teste',
    icon: '🎯',
    category: 'completion',
    rarity: 'common',
    points: 100
  },
  {
    id: 'truth-seeker',
    name: 'Caçador da Verdade',
    description: 'Completou o Arquiteto da Verdade',
    icon: '🏗️',
    category: 'completion',
    rarity: 'rare',
    points: 300
  },
  {
    id: 'career-warrior',
    name: 'Guerreiro da Carreira',
    description: 'Completou o CareerTruthAI',
    icon: '💼',
    category: 'completion',
    rarity: 'rare',
    points: 300
  },
  {
    id: 'unbreakable',
    name: 'Mente Inquebrantável',
    description: 'Completou o Unbreakable Mind',
    icon: '⚡',
    category: 'intensity',
    rarity: 'epic',
    points: 500
  },
  {
    id: 'honest-soul',
    name: 'Alma Honesta',
    description: 'Mantém score de honestidade acima de 8.0',
    icon: '💎',
    category: 'honesty',
    rarity: 'epic',
    points: 400
  },
  {
    id: 'streak-warrior',
    name: 'Guerreiro Consistente',
    description: '7 dias consecutivos de check-in',
    icon: '🔥',
    category: 'consistency',
    rarity: 'rare',
    points: 250
  },
  {
    id: 'legend',
    name: 'Lenda do Desconforto',
    description: 'Completou todos os testes disponíveis',
    icon: '👑',
    category: 'special',
    rarity: 'legendary',
    points: 1000
  },
  {
    id: 'recovered',
    name: 'Curado da Autossabotagem',
    description: 'Conseguiu alta médica - zerou pontos negativos',
    icon: '🏥',
    category: 'recovery',
    rarity: 'legendary',
    points: 2000
  },
  {
    id: 'disciplined',
    name: 'Disciplina de Ferro',
    description: '30 dias consecutivos de check-in',
    icon: '⚔️',
    category: 'recovery',
    rarity: 'epic',
    points: 800
  },
  {
    id: 'commitment',
    name: 'Compromisso Total',
    description: '7 dias consecutivos completando todas as ações',
    icon: '🎖️',
    category: 'recovery',
    rarity: 'rare',
    points: 400
  },
  {
    id: 'shame-duck',
    name: 'Patinho da Vergonha',
    description: '3 falhas consecutivas em missões - precisa de redenção',
    icon: '🐥',
    category: 'shame',
    rarity: 'common',
    points: -100
  }
];
