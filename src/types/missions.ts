
export interface Mission {
  id: string;
  title: string;
  description: string;
  category: 'professional' | 'mindset' | 'behavior' | 'communication' | 'physical';
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  basePoints: number;
  timeEstimate: string;
  risk: 'low' | 'medium' | 'high';
}

export interface DailyMissionSelection {
  selectedMission: Mission;
  isDoubled: boolean;
  selectedAt: Date;
  completed?: boolean;
  completedAt?: Date;
  pointsEarned?: number;
  penaltyApplied?: number;
}

export interface DiscomfortCard {
  id: string;
  title: string;
  description: string;
  action: string;
  bonusPoints: number;
  timeLimit: number; // em horas
  category: 'surprise' | 'social' | 'professional' | 'physical';
}

export interface BettingEnvelope {
  id: string;
  title: string;
  description: string;
  effect: 'penalty_increase' | 'bonus_points' | 'extra_mission' | 'penalty_decrease';
  value: number;
}
