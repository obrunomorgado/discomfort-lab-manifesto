
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CreditCard } from 'lucide-react';

interface InsufficientCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuyCredits: () => void;
  requiredCredits: number;
  currentCredits: number;
  testName: string;
}

const InsufficientCreditsModal = ({
  isOpen,
  onClose,
  onBuyCredits,
  requiredCredits,
  currentCredits,
  testName
}: InsufficientCreditsModalProps) => {
  const missingCredits = requiredCredits - currentCredits;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-dark-card border-dark-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bebas text-red-400 text-center flex items-center justify-center space-x-2">
            <AlertTriangle size={24} />
            <span>CRÉDITOS INSUFICIENTES</span>
          </DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-4">
          <div className="p-4 bg-red-600/10 rounded-lg border border-red-600/30">
            <p className="text-warm-gray font-inter">
              Para acessar <strong className="text-warm-yellow">{testName}</strong> você precisa de:
            </p>
            <div className="mt-2 text-2xl font-bebas text-red-400">
              {requiredCredits} créditos
            </div>
            <p className="text-sm text-warm-gray/60 mt-1">
              Você tem apenas {currentCredits} créditos
            </p>
          </div>

          <div className="p-4 bg-warm-yellow/10 rounded-lg border border-warm-yellow/30">
            <p className="text-warm-gray/80 font-inter text-sm">
              💡 Você precisa de mais <strong className="text-warm-yellow">{missingCredits} créditos</strong> para continuar
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onBuyCredits}
              className="w-full bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas text-lg"
            >
              <CreditCard size={18} className="mr-2" />
              COMPRAR CRÉDITOS
            </Button>
            
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full text-warm-gray hover:text-warm-yellow font-inter"
            >
              Voltar depois
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InsufficientCreditsModal;
