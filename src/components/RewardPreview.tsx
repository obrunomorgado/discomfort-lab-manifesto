
import { Badge as BadgeType } from '@/types/user';
import { BadgeComponent } from '@/components/Badge';
import { Trophy, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RewardPreviewProps {
  xpReward: number;
  testBadge: BadgeType;
  specialBadges?: BadgeType[];
  isCompleted?: boolean;
}

export const RewardPreview = ({ xpReward, testBadge, specialBadges = [], isCompleted = false }: RewardPreviewProps) => {
  return (
    <div className="border-t border-dark-border pt-4 mt-4">
      <h4 className="text-sm font-bebas text-warm-yellow mb-3">RECOMPENSAS</h4>
      
      <div className="space-y-3">
        {/* XP Reward */}
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-warm-yellow" />
          <span className="text-sm text-warm-gray">
            <span className="font-bebas text-warm-yellow">+{xpReward} XP</span>
          </span>
          {isCompleted && (
            <Badge className="bg-green-600 text-white text-xs">CONQUISTADO</Badge>
          )}
        </div>

        {/* Test Badge */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <BadgeComponent badge={testBadge} size="sm" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bebas text-warm-gray">{testBadge.name}</p>
            <p className="text-xs text-warm-gray/60 truncate">{testBadge.description}</p>
          </div>
          {isCompleted && (
            <Badge className="bg-green-600 text-white text-xs">✓</Badge>
          )}
        </div>

        {/* Special Badges */}
        {specialBadges.length > 0 && (
          <div className="pt-2 border-t border-dark-border/50">
            <p className="text-xs text-warm-gray/60 mb-2">Badges especiais possíveis:</p>
            <div className="flex flex-wrap gap-2">
              {specialBadges.map((badge) => (
                <div key={badge.id} className="flex items-center space-x-1">
                  <span className="text-sm">{badge.icon}</span>
                  <span className="text-xs text-warm-gray/80">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
