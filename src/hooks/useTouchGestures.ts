
import { useState, useEffect, useRef, RefObject } from 'react';

interface TouchGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPullToRefresh?: () => void;
  minSwipeDistance?: number;
  pullThreshold?: number;
}

export const useTouchGestures = (
  elementRef: RefObject<HTMLElement>,
  options: TouchGestureOptions = {}
) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPullToRefresh,
    minSwipeDistance = 50,
    pullThreshold = 80
  } = options;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchEnd.current = null;
      touchStart.current = {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStart.current) return;
      
      const currentTouch = {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      };

      // Pull to refresh logic
      if (onPullToRefresh && element.scrollTop === 0) {
        const deltaY = currentTouch.y - touchStart.current.y;
        if (deltaY > 0) {
          setPullDistance(Math.min(deltaY, pullThreshold * 1.5));
          if (deltaY > pullThreshold && !isRefreshing) {
            e.preventDefault();
          }
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;
      
      touchEnd.current = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };

      // Handle pull to refresh
      if (pullDistance > pullThreshold && onPullToRefresh && !isRefreshing) {
        setIsRefreshing(true);
        onPullToRefresh();
        setTimeout(() => {
          setIsRefreshing(false);
          setPullDistance(0);
        }, 1500);
      } else {
        setPullDistance(0);
      }

      // Handle swipe gestures
      const deltaX = touchEnd.current.x - touchStart.current.x;
      const deltaY = touchEnd.current.y - touchStart.current.y;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            onSwipeRight?.();
          } else {
            onSwipeLeft?.();
          }
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > minSwipeDistance) {
          if (deltaY > 0) {
            onSwipeDown?.();
          } else {
            onSwipeUp?.();
          }
        }
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [elementRef, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onPullToRefresh, minSwipeDistance, pullThreshold, pullDistance, isRefreshing]);

  return { isRefreshing, pullDistance };
};
