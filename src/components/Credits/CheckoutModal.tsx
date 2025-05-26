
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Star, Zap } from 'lucide-react';
import { CreditPackage } from '@/types/user';
import { useCredits } from '@/hooks/useCredits';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (packageId: string, credits: number) => void;
}

const CheckoutModal = ({ isOpen, onClose, onPurchase }: CheckoutModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { getCreditPackages, simulatePayment } = useCredits();
  const packages = getCreditPackages();

  const handlePurchase = async (pkg: CreditPackage) => {
    setIsProcessing(true);
    try {
      const success = await simulatePayment(pkg.id);
      if (success) {
        onPurchase(pkg.id, pkg.credits);
        onClose();
      }
    } catch (error) {
      console.error('Erro no pagamento:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-dark-card border-dark-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bebas text-warm-gray text-center">
            COMPRAR CRÉDITOS
          </DialogTitle>
          <p className="text-warm-gray/60 text-center font-inter">
            Escolha seu pacote e continue sua jornada de transformação
          </p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative p-6 rounded-lg border transition-all hover:border-warm-yellow/50 ${
                pkg.popular
                  ? 'border-warm-yellow bg-warm-yellow/5'
                  : 'border-dark-border bg-dark-bg/50'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-warm-yellow text-dark-bg font-bebas">
                    <Star size={12} className="mr-1" />
                    POPULAR
                  </Badge>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-bebas text-warm-gray mb-2">
                  {pkg.name}
                </h3>
                
                <div className="mb-4">
                  <div className="text-3xl font-bebas text-warm-yellow">
                    {pkg.credits}
                  </div>
                  <div className="text-sm text-warm-gray/60">créditos</div>
                </div>

                <div className="mb-4">
                  <div className="text-2xl font-bebas text-warm-gray">
                    R$ {pkg.price.toFixed(2).replace('.', ',')}
                  </div>
                  {pkg.discount && pkg.discount > 0 && (
                    <div className="text-sm text-green-400">
                      Economia de {pkg.discount}%
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => handlePurchase(pkg)}
                  disabled={isProcessing}
                  className="w-full bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas"
                >
                  {isProcessing ? (
                    "Processando..."
                  ) : (
                    <>
                      <CreditCard size={16} className="mr-2" />
                      COMPRAR
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-warm-yellow/10 rounded-lg border border-warm-yellow/30">
          <div className="flex items-center space-x-2 text-warm-yellow mb-2">
            <Zap size={16} />
            <span className="font-bebas">PAGAMENTO SEGURO</span>
          </div>
          <p className="text-sm text-warm-gray/70">
            💳 Este é um checkout simulado para demonstração. 
            Nenhum cartão será cobrado até a integração com Stripe ser configurada.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
