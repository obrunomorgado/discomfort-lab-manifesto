
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Lock, Unlock } from 'lucide-react';
import { getSubornOptions } from '@/utils/medicalDiagnostic';

interface SubornModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuborn: (option: any) => void;
  subornsUsed: number;
}

const SubornModal = ({ isOpen, onClose, onSuborn, subornsUsed }: SubornModalProps) => {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subornOptions = getSubornOptions();

  const handleSuborn = async () => {
    if (!selectedOption) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onSuborn(selectedOption);
      setIsProcessing(false);
      setSelectedOption(null);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card border border-red-500/30 rounded-lg max-w-2xl w-full">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🩺</div>
            <h2 className="text-2xl font-bebas text-red-400 mb-2">CONSULTÓRIO FECHADO</h2>
            <p className="text-warm-gray/70 font-inter">
              "Paciente, você completou seus 5 testes. Oficialmente, você recebeu alta médica. 
              Mas... se insiste em continuar o tratamento, temos algumas opções..."
            </p>
          </div>

          <div className="bg-red-600/10 border border-red-600/30 rounded p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Lock className="text-red-400" size={20} />
              <span className="font-bebas text-red-400">STATUS: BLOQUEADO</span>
            </div>
            <p className="text-sm text-warm-gray/70">
              Dr. Desculpas sussurra: "Claro que posso fazer vista grossa... por um preço justo."
            </p>
            {subornsUsed > 0 && (
              <div className="mt-2">
                <Badge className="bg-yellow-600/20 text-yellow-400 text-xs">
                  Subornos anteriores: {subornsUsed}x
                </Badge>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="font-bebas text-warm-yellow text-lg text-center">OPÇÕES DE "DOAÇÃO"</h3>
            
            {subornOptions.map((option) => (
              <Card 
                key={option.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedOption?.id === option.id 
                    ? 'border-warm-yellow bg-warm-yellow/10' 
                    : 'border-dark-border bg-dark-bg/50 hover:border-warm-yellow/50'
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="text-green-400" size={24} />
                      <div>
                        <div className="font-bebas text-warm-yellow text-lg">
                          R$ {option.amount},00
                        </div>
                        <div className="text-sm text-warm-gray/70">
                          {option.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-warm-gray/70">Libera</div>
                      <div className="font-bebas text-warm-yellow">
                        {option.unlocks} consultas
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex space-x-4">
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1 border-dark-border text-warm-gray hover:bg-dark-border/20"
              disabled={isProcessing}
            >
              CANCELAR
            </Button>
            <Button 
              onClick={handleSuborn}
              disabled={!selectedOption || isProcessing}
              className="flex-1 bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-dark-bg border-t-transparent"></div>
                  <span>PROCESSANDO...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Unlock size={16} />
                  <span>SUBORNAR DOUTOR</span>
                </div>
              )}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-warm-gray/50 italic">
              * Pagamento simulado - funcionalidade demonstrativa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubornModal;
