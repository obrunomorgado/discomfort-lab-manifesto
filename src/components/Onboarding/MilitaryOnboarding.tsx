
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAudioEffects } from '@/hooks/useAudioEffects';
import { Shield, Target, Zap, Users, AlertTriangle } from 'lucide-react';

interface OnboardingStep {
  id: string;
  rank: string;
  title: string;
  description: string;
  dramaticText: string;
  icon: React.ReactNode;
  soundEffect?: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    rank: 'RECRUTA',
    title: 'BEM-VINDO À SALA DO DESCONFORTO',
    description: 'Aqui sua zona de conforto é REVOGADA. Você está pronto para enfrentar a verdade?',
    dramaticText: 'SOLDADO! Esta não é uma academia comum. Aqui não existe MIMIMI!',
    icon: <Shield size={48} className="text-cyber-warning" />,
    soundEffect: 'stamp_missao'
  },
  {
    id: 'posto',
    rank: 'SOLDADO',
    title: 'POSTO DE COMANDO',
    description: 'Seu centro de operações. Aceite missões, reporte falhas e monitore seu progresso.',
    dramaticText: 'Este é SEU posto de combate. Cada missão aceita é um compromisso de SANGUE!',
    icon: <Target size={48} className="text-cyber-cyan" />,
    soundEffect: 'mission_success'
  },
  {
    id: 'desconfortos',
    rank: 'CABO',
    title: 'ZONA DOS DESCONFORTOS',
    description: 'Testes que vão expor suas fraquezas sem piedade. Encare a verdade sobre você.',
    dramaticText: 'Aqui você descobre ONDE está falhando. Sem açúcar, sem mentiras!',
    icon: <AlertTriangle size={48} className="text-red-400" />,
    soundEffect: 'penalty_applied'
  },
  {
    id: 'squad',
    rank: 'SARGENTO',
    title: 'FORMAÇÃO DE SQUAD',
    description: 'Junte-se a outros guerreiros. Accountability em grupo amplifica resultados.',
    dramaticText: 'SOZINHO você é fraco. Em SQUAD, vocês se tornam imparáveis!',
    icon: <Users size={48} className="text-cyber-fuchsia" />,
    soundEffect: 'squad_notification'
  },
  {
    id: 'ready',
    rank: 'TENENTE',
    title: 'PRONTO PARA O COMBATE',
    description: 'Você foi briefado. Agora é hora de AGIR. Sem desculpas, sem exceções.',
    dramaticText: 'O treinamento acabou, TENENTE! Hora de mostrar do que você é feito!',
    icon: <Zap size={48} className="text-cyber-neon" />,
    soundEffect: 'mission_success'
  }
];

interface MilitaryOnboardingProps {
  isOpen: boolean;
  onComplete: () => void;
}

const MilitaryOnboarding = ({ isOpen, onComplete }: MilitaryOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const { playSound } = useAudioEffects();

  const step = ONBOARDING_STEPS[currentStep];

  useEffect(() => {
    if (isOpen && step?.soundEffect) {
      const timer = setTimeout(() => {
        playSound(step.soundEffect as any);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isOpen, playSound, step?.soundEffect]);

  useEffect(() => {
    if (isOpen) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isOpen]);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      playSound('button_click');
    } else {
      playSound('mission_success');
      onComplete();
    }
  };

  const handleSkip = () => {
    playSound('button_click');
    onComplete();
  };

  if (!step) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl bg-military-card border-cyber-warning/50 rivet-border">
        <div className="relative">
          {/* Header militar */}
          <div className="text-center mb-6 border-b border-cyber-warning/30 pb-4">
            <Badge className="mb-2 bg-cyber-warning/20 border-cyber-warning/50 text-cyber-warning font-bebas text-lg px-4 py-1">
              {step.rank}
            </Badge>
            <h2 className="text-2xl font-bebas text-cyber-warning tracking-wider">
              {step.title}
            </h2>
          </div>

          {/* Ícone central */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-military-bg/50 border-2 border-cyber-warning/30 mb-4">
              {step.icon}
            </div>
          </div>

          {/* Texto dramático */}
          <div className="bg-cyber-warning/10 border border-cyber-warning/30 rounded p-4 mb-6">
            <p className={`text-cyber-warning font-bebas text-lg text-center ${isTyping ? 'animate-pulse' : ''}`}>
              {step.dramaticText}
            </p>
          </div>

          {/* Descrição */}
          <div className="bg-military-bg/30 border border-military-border rounded p-4 mb-6">
            <p className="text-warm-gray font-inter text-center leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center space-x-2 mb-6">
            {ONBOARDING_STEPS.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= currentStep 
                    ? 'bg-cyber-warning' 
                    : 'bg-military-border'
                }`}
              />
            ))}
          </div>

          {/* Botões de ação */}
          <div className="flex justify-between">
            <Button
              onClick={handleSkip}
              variant="outline"
              className="border-military-border text-warm-gray hover:bg-military-border/20 font-bebas"
            >
              PULAR BRIEFING
            </Button>
            
            <Button
              onClick={handleNext}
              className="bg-cyber-warning text-military-bg hover:bg-cyber-warning/90 font-bebas px-6"
            >
              {currentStep === ONBOARDING_STEPS.length - 1 ? 'INICIAR MISSÃO!' : 'PRÓXIMO COMANDO'}
            </Button>
          </div>

          {/* Contador de passos */}
          <div className="text-center mt-4">
            <span className="text-xs text-warm-gray/60 font-consolas">
              BRIEFING {currentStep + 1} DE {ONBOARDING_STEPS.length}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MilitaryOnboarding;
