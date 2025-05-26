
import React, { useRef } from 'react';
import { useTouchGestures } from '@/hooks/useTouchGestures';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => void;
  className?: string;
}

export const PullToRefresh = ({ children, onRefresh, className }: PullToRefreshProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { isRefreshing, pullDistance } = useTouchGestures(containerRef, {
    onPullToRefresh: onRefresh,
    pullThreshold: 80
  });

  return (
    <div 
      ref={containerRef} 
      className={cn("relative overflow-auto", className)}
      style={{ 
        transform: pullDistance > 0 ? `translateY(${Math.min(pullDistance / 2, 40)}px)` : undefined,
        transition: pullDistance > 0 ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      {/* Pull to refresh indicator */}
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 flex items-center justify-center",
          "transition-all duration-300 bg-background/90 backdrop-blur-sm",
          "border-b border-border/50",
          pullDistance > 0 ? "h-16 opacity-100" : "h-0 opacity-0"
        )}
        style={{ 
          transform: `translateY(-${Math.max(64 - pullDistance, 0)}px)`
        }}
      >
        <div className="flex items-center space-x-2 text-muted-foreground">
          <RefreshCw 
            size={20} 
            className={cn(
              "transition-transform duration-300",
              isRefreshing && "animate-spin",
              pullDistance > 80 && !isRefreshing && "rotate-180"
            )}
          />
          <span className="text-sm font-medium">
            {isRefreshing ? 'Atualizando...' : pullDistance > 80 ? 'Solte para atualizar' : 'Puxe para atualizar'}
          </span>
        </div>
      </div>
      
      {children}
    </div>
  );
};
