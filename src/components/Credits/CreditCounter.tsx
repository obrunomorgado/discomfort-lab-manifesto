
import { Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CreditCounterProps {
  credits: number;
  onClick?: () => void;
}

const CreditCounter = ({ credits, onClick }: CreditCounterProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="text-warm-gray hover:text-warm-yellow flex items-center space-x-2 bg-dark-bg/50 border border-dark-border hover:border-warm-yellow/30"
    >
      <Coins size={16} className="text-warm-yellow" />
      <span className="font-bebas text-sm">
        {credits} CRÉDITOS
      </span>
    </Button>
  );
};

export default CreditCounter;
