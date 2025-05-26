
export interface Squad {
  id: string;
  name: string;
  leaderId: string;
  members: SquadMember[];
  createdAt: Date;
  xpMultiplier: number;
  isActive: boolean;
  inviteCode: string;
}

export interface SquadMember {
  userId: string;
  username: string;
  level: number;
  totalPoints: number;
  joinedAt: Date;
  isLeader: boolean;
  status: 'active' | 'inactive';
  lastActivity: Date;
}

export interface SquadInvite {
  id: string;
  squadId: string;
  invitedBy: string;
  invitedUsername: string;
  inviteCode: string;
  expiresAt: Date;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  createdAt: Date;
}

export interface PotLink {
  id: string;
  userId: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  contributors: PotContributor[];
  isActive: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export interface PotContributor {
  name: string;
  amount: number;
  message?: string;
  contributedAt: Date;
}

export interface SquadNotification {
  id: string;
  squadId: string;
  type: 'mission_completed' | 'mission_failed' | 'member_joined' | 'member_left' | 'xp_penalty';
  message: string;
  memberUsername: string;
  timestamp: Date;
  isRead: boolean;
}

export interface SquadChatMessage {
  id: string;
  squadId: string;
  userId: string;
  username: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'mission_start' | 'mission_complete' | 'mission_fail' | 'system';
}
