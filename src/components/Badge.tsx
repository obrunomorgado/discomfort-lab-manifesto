
import { Badge as BadgeType } from '@/types/user';
import { Badge as UIBadge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BadgeComponentProps {
  badge: BadgeType;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const BadgeComponent = ({ badge, size = 'md', showDetails = false }: BadgeComponentProps) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-500 text-white';
      case 'rare':
        return 'bg-blue-500 text-white';
      case 'epic':
        return 'bg-purple-500 text-white';
      case 'legendary':
        return 'bg-warm-yellow text-dark-bg';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-12 h-12 text-sm';
      case 'lg':
        return 'w-20 h-20 text-2xl';
      default:
        return 'w-16 h-16 text-lg';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={cn(
        "rounded-full bg-dark-card border-2 border-dark-border flex items-center justify-center",
        getSizeClasses()
      )}>
        <span>{badge.icon}</span>
      </div>
      
      {showDetails && (
        <div className="text-center">
          <h3 className="font-bebas text-warm-gray text-sm">{badge.name}</h3>
          <p className="text-xs text-warm-gray/60 max-w-[100px]">{badge.description}</p>
          <UIBadge className={cn("text-xs mt-1", getRarityColor(badge.rarity))}>
            {badge.rarity.toUpperCase()}
          </UIBadge>
        </div>
      )}
    </div>
  );
};
