import { Badge } from '@/types/user';

export const AVAILABLE_BADGES: Badge[] = [
  // Completion badges
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
    id: 'excuse-destroyer',
    name: 'Destruidor de Autossabotagem',
    description: 'Completou o Sem Desculpas IA',
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

  // Medical badges
  {
    id: 'patient-discipline',
    name: 'Paciente Disciplinado',
    description: 'Nunca perdeu uma consulta agendada',
    icon: '🏥',
    category: 'medical',
    rarity: 'rare',
    points: 400
  },
  {
    id: 'meteoric-evolution',
    name: 'Evolução Meteórica',
    description: 'Melhorou 50+ pontos entre consultas',
    icon: '🚀',
    category: 'medical',
    rarity: 'epic',
    points: 600
  },
  {
    id: 'officially-cured',
    name: 'Curado Oficial',
    description: 'Completou os 5 testes com sucesso',
    icon: '🎓',
    category: 'medical',
    rarity: 'legendary',
    points: 1000
  },
  {
    id: 'first-suborn',
    name: 'Primeiro Suborno',
    description: 'Subornado Dr. Desculpas pela primeira vez',
    icon: '💰',
    category: 'medical',
    rarity: 'rare',
    points: 50
  },
  {
    id: 'chronic-suborner',
    name: 'Subornador Crônico',
    description: 'Subornado Dr. Desculpas múltiplas vezes',
    icon: '🤑',
    category: 'medical',
    rarity: 'legendary',
    points: 200
  },
  {
    id: 'medical-improvement',
    name: 'Em Recuperação',
    description: 'Score médico melhorou consistentemente',
    icon: '📈',
    category: 'medical',
    rarity: 'epic',
    points: 500
  },

  // Existing badges...
  {
    id: 'test-master',
    name: 'Mestre dos Testes',
    description: 'Completou todos os testes disponíveis',
    icon: '👑',
    category: 'completion',
    rarity: 'legendary',
    points: 1000
  },
  {
    id: 'honest-soul',
    name: 'Alma Honesta',
    description: 'Manteve honestidade média acima de 8.0',
    icon: '💎',
    category: 'honesty',
    rarity: 'epic',
    points: 400
  },
  {
    id: 'recovery-hero',
    name: 'Herói da Recuperação',
    description: 'Zerou pontos de dívida completamente',
    icon: '🦸',
    category: 'recovery',
    rarity: 'epic',
    points: 500
  },
  {
    id: 'consistency-king',
    name: 'Rei da Consistência',
    description: 'Check-in diário por 30 dias consecutivos',
    icon: '👑',
    category: 'consistency',
    rarity: 'legendary',
    points: 800
  },
  {
    id: 'payment-supporter',
    name: 'Apoiador',
    description: 'Realizou primeira compra de créditos',
    icon: '💳',
    category: 'payment',
    rarity: 'common',
    points: 100
  },
  {
    id: 'referral-master',
    name: 'Mestre dos Convites',
    description: 'Convidou 5+ pessoas com sucesso',
    icon: '📢',
    category: 'referral',
    rarity: 'rare',
    points: 300
  },
  {
    id: 'shame-survivor',
    name: 'Sobrevivente da Vergonha',
    description: 'Superou momento de grande vergonha',
    icon: '😤',
    category: 'shame',
    rarity: 'epic',
    points: 600
  }
];
