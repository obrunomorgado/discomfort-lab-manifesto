
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAudioEffects } from '@/hooks/useAudioEffects';
import { UserProgress } from '@/types/user';
import { Shield, Target, Zap, Users, AlertTriangle, MessageCircle, Trophy, Coins, Settings } from 'lucide-react';

interface OnboardingStep {
  id: string;
  rank: string;
  title: string;
  description: string;
  dramaticText: string;
  icon: React.ReactNode;
  soundEffect?: string;
  nextSteps?: string[];
}

const getOnboardingSteps = (progress?: UserProgress): OnboardingStep[] => [
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
    soundEffect: 'mission_success',
    nextSteps: progress?.currentMission ? ['Reporte o resultado da sua missão atual'] : ['Selecione sua primeira missão']
  },
  {
    id: 'desconfortos',
    rank: 'CABO',
    title: 'ZONA DOS DESCONFORTOS',
    description: 'Testes que vão expor suas fraquezas sem piedade. Acesse via menu ou link direto.',
    dramaticText: 'Aqui você descobre ONDE está falhando. Sem açúcar, sem mentiras!',
    icon: <AlertTriangle size={48} className="text-red-400" />,
    soundEffect: 'penalty_applied',
    nextSteps: ['Faça um teste de personalidade', 'Descubra seus pontos fracos']
  },
  {
    id: 'squad',
    rank: 'SARGENTO',
    title: 'FORMAÇÃO DE SQUAD',
    description: 'Junte-se a outros guerreiros. Accountability em grupo amplifica resultados.',
    dramaticText: 'SOZINHO você é fraco. Em SQUAD, vocês se tornam imparáveis!',
    icon: <Users size={48} className="text-cyber-fuchsia" />,
    soundEffect: 'squad_notification',
    nextSteps: progress?.level && progress.level >= 2 ? ['Crie ou entre em um Squad'] : ['Alcance nível 2 para acessar Squads']
  },
  {
    id: 'penalties',
    rank: 'TENENTE',
    title: 'SKIN IN THE GAME',
    description: 'Compromissos financeiros reais. Falhou? PAGUE! Sucesso tem que ter consequência.',
    dramaticText: 'Aqui você coloca SEU DINHEIRO onde está sua BOCA!',
    icon: <Coins size={48} className="text-cyber-warning" />,
    soundEffect: 'penalty_applied',
    nextSteps: ['Configure um compromisso financeiro', 'Ative penalidades automáticas']
  },
  {
    id: 'advanced',
    rank: 'CAPITÃO',
    title: 'RECURSOS AVANÇADOS',
    description: 'Chat do Squad, Roleta da Dor, QR Codes, Discord e muito mais.',
    dramaticText: 'Ferramentas de ELITE para guerreiros de ELITE!',
    icon: <Settings size={48} className="text-cyber-cyan" />,
    soundEffect: 'squad_bonus',
    nextSteps: ['Explore o chat do Squad', 'Configure integrações externas']
  },
  {
    id: 'ready',
    rank: 'MAJOR',
    title: 'PRONTO PARA O COMBATE',
    description: 'Você foi briefado. Agora é hora de AGIR. Sem desculpas, sem exceções.',
    dramaticText: 'O treinamento acabou, MAJOR! Hora de mostrar do que você é feito!',
    icon: <Trophy size={48} className="text-cyber-neon" />,
    soundEffect: 'mission_success'
  }
];

interface MilitaryOnboardingProps {
  isOpen: boolean;
  onComplete: () => void;
  progress?: UserProgress;
}

const MilitaryOnboarding = ({ isOpen, onComplete, progress }: MilitaryOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const { playSound } = useAudioEffects();

  const steps = getOnboardingSteps(progress);
  const step = steps[currentStep];

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
    if (currentStep < steps.length - 1) {
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

  const handleGoToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    playSound('button_click');
  };

  if (!step) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-3xl bg-military-card border-cyber-warning/50 rivet-border">
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

          {/* Próximos passos sugeridos */}
          {step.nextSteps && step.nextSteps.length > 0 && (
            <div className="bg-cyber-cyan/10 border border-cyber-cyan/30 rounded p-4 mb-6">
              <h4 className="font-bebas text-cyber-cyan text-sm mb-2">PRÓXIMOS PASSOS SUGERIDOS:</h4>
              <ul className="text-sm text-warm-gray space-y-1">
                {step.nextSteps.map((nextStep, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-cyber-cyan">•</span>
                    <span>{nextStep}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Progress indicator com navegação */}
          <div className="flex justify-center space-x-2 mb-6">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleGoToStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index <= currentStep 
                    ? 'bg-cyber-warning hover:bg-cyber-warning/80' 
                    : 'bg-military-border hover:bg-military-border/60'
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
              FINALIZAR TOUR
            </Button>
            
            <Button
              onClick={handleNext}
              className="bg-cyber-warning text-military-bg hover:bg-cyber-warning/90 font-bebas px-6"
            >
              {currentStep === steps.length - 1 ? 'INICIAR OPERAÇÕES!' : 'PRÓXIMO COMANDO'}
            </Button>
          </div>

          {/* Contador de passos */}
          <div className="text-center mt-4">
            <span className="text-xs text-warm-gray/60 font-consolas">
              BRIEFING {currentStep + 1} DE {steps.length}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MilitaryOnboarding;
