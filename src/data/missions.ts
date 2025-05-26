
import { Mission, DiscomfortCard, BettingEnvelope } from '@/types/missions';

export const DAILY_MISSIONS: Mission[] = [
  {
    id: 'cold-call-prospect',
    title: 'Operação Contato Frio',
    description: 'Ligar para 3 prospects sem aquecimento prévio',
    category: 'professional',
    difficulty: 'hard',
    basePoints: 150,
    timeEstimate: '45 min',
    risk: 'high'
  },
  {
    id: 'public-speaking',
    title: 'Missão Exposição Pública',
    description: 'Fazer apresentação de 5 min para grupo de estranhos',
    category: 'communication',
    difficulty: 'extreme',
    basePoints: 200,
    timeEstimate: '30 min',
    risk: 'high'
  },
  {
    id: 'uncomfortable-conversation',
    title: 'Operação Conversa Difícil',
    description: 'Ter conversa difícil que você vem adiando',
    category: 'communication',
    difficulty: 'medium',
    basePoints: 100,
    timeEstimate: '20 min',
    risk: 'medium'
  },
  {
    id: 'rejection-therapy',
    title: 'Treino de Rejeição',
    description: 'Fazer 3 pedidos que provavelmente serão negados',
    category: 'mindset',
    difficulty: 'hard',
    basePoints: 120,
    timeEstimate: '60 min',
    risk: 'medium'
  },
  {
    id: 'early-morning',
    title: 'Operação Madrugada',
    description: 'Acordar 2h mais cedo e fazer atividade produtiva',
    category: 'behavior',
    difficulty: 'medium',
    basePoints: 80,
    timeEstimate: '120 min',
    risk: 'low'
  },
  {
    id: 'cold-shower',
    title: 'Banho de Guerra',
    description: 'Banho frio de 5 minutos',
    category: 'physical',
    difficulty: 'easy',
    basePoints: 50,
    timeEstimate: '5 min',
    risk: 'low'
  },
  {
    id: 'social-challenge',
    title: 'Operação Rede Social',
    description: 'Postar conteúdo vulnerável/pessoal nas redes',
    category: 'social',
    difficulty: 'hard',
    basePoints: 130,
    timeEstimate: '30 min',
    risk: 'high'
  },
  {
    id: 'ask-for-help',
    title: 'Missão Socorro',
    description: 'Pedir ajuda em algo que te envergonha',
    category: 'mindset',
    difficulty: 'medium',
    basePoints: 90,
    timeEstimate: '15 min',
    risk: 'medium'
  }
];

export const DISCOMFORT_CARDS: DiscomfortCard[] = [
  {
    id: 'instant-video',
    title: 'VÍDEO INSTANTÂNEO',
    description: 'Grave um vídeo de 1 minuto sobre seu maior medo atual',
    action: 'Postar no stories dentro de 10 minutos',
    bonusPoints: 100,
    timeLimit: 2,
    category: 'surprise'
  },
  {
    id: 'stranger-compliment',
    title: 'ELOGIO ALIENÍGENA',
    description: 'Elogie sinceramente 3 estranhos na rua',
    action: 'Fazer agora antes do almoço',
    bonusPoints: 80,
    timeLimit: 4,
    category: 'social'
  },
  {
    id: 'boss-feedback',
    title: 'FEEDBACK BOMBA',
    description: 'Peça feedback brutal para seu chefe sobre suas fraquezas',
    action: 'Enviar mensagem agora mesmo',
    bonusPoints: 150,
    timeLimit: 1,
    category: 'professional'
  },
  {
    id: 'public-failure',
    title: 'FALHA PÚBLICA',
    description: 'Compartilhe sua maior falha recente nas redes sociais',
    action: 'Postar em 30 minutos',
    bonusPoints: 120,
    timeLimit: 1,
    category: 'social'
  }
];

export const BETTING_ENVELOPES: BettingEnvelope[] = [
  {
    id: 'penalty-double',
    title: 'ENVELOPE DA DOR',
    description: 'Dobra a penalidade por falha hoje',
    effect: 'penalty_increase',
    value: 2
  },
  {
    id: 'bonus-points',
    title: 'ENVELOPE DA GLÓRIA',
    description: '+50% pontos por sucesso hoje',
    effect: 'bonus_points',
    value: 1.5
  },
  {
    id: 'extra-mission',
    title: 'ENVELOPE DO MASOQUISMO',
    description: 'Adiciona missão extra obrigatória',
    effect: 'extra_mission',
    value: 1
  }
];
