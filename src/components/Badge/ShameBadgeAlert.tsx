
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/types/user';

interface ShameBadgeAlertProps {
  badge: Badge;
  onRedemption?: () => void;
}

const ShameBadgeAlert = ({ badge, onRedemption }: ShameBadgeAlertProps) => {
  return (
    <Alert className="bg-red-500/20 border-red-500/50 mb-6 animate-pulse">
      <AlertTriangle className="h-4 w-4 text-red-400" />
      <AlertTitle className="text-red-400 font-bebas">
        🐥 BADGE DE VERGONHA ATIVO
      </AlertTitle>
      <AlertDescription className="text-red-300 font-consolas">
        {badge.description}
        <br />
        <span className="text-xs text-red-400/70">
          Complete uma missão com sucesso para conquistar sua redenção.
        </span>
      </AlertDescription>
    </Alert>
  );
};

export default ShameBadgeAlert;
