
import { Zap, AlertTriangle, Clock, Skull } from 'lucide-react';
import { Penalty } from './types';

export const PENALTIES: Penalty[] = [
  {
    id: 'pushups-50',
    name: '50 FLEXÕES AGORA',
    description: 'Pare tudo e faça 50 flexões. Sem desculpas.',
    difficulty: 'medium',
    duration: '5 min',
    icon: <Zap size={20} className="text-yellow-400" />
  },
  {
    id: 'cold-shower',
    name: 'BANHO GELADO 2 MIN',
    description: 'Próximo banho deve ser 2 minutos só de água fria.',
    difficulty: 'hard',
    duration: '2 min',
    icon: <AlertTriangle size={20} className="text-blue-400" />
  },
  {
    id: 'meditation-silence',
    name: 'MEDITAÇÃO 15 MIN',
    description: 'Sente em silêncio total por 15 minutos. Só você e seus pensamentos.',
    difficulty: 'easy',
    duration: '15 min',
    icon: <Clock size={20} className="text-green-400" />
  },
  {
    id: 'confession-public',
    name: 'CONFISSÃO PÚBLICA',
    description: 'Poste no squad sobre seu maior medo atual.',
    difficulty: 'extreme',
    duration: '1 min',
    icon: <Skull size={20} className="text-red-400" />
  },
  {
    id: 'no-phone-2h',
    name: 'SEM CELULAR 2H',
    description: 'Desligue o celular por 2 horas. Sem exceções.',
    difficulty: 'hard',
    duration: '2h',
    icon: <AlertTriangle size={20} className="text-orange-400" />
  },
  {
    id: 'gratitude-call',
    name: 'LIGA PRA MÃE/PAI',
    description: 'Ligue agora para um familiar e diga 3 coisas que agradece.',
    difficulty: 'medium',
    duration: '10 min',
    icon: <Zap size={20} className="text-pink-400" />
  }
];
