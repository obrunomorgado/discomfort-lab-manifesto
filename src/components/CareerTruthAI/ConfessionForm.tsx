
import { MobileCard, MobileCardContent, MobileCardDescription, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { MobileTextarea } from "@/components/ui/mobile-textarea";
import { Clock } from "lucide-react";
import { useNativeFeatures } from "@/hooks/useNativeFeatures";
import { ImpactStyle } from "@capacitor/haptics";

interface ConfessionFormProps {
  userInput: string;
  setUserInput: (value: string) => void;
  isAnalyzing: boolean;
  isInTreatment: boolean;
  onSubmit: () => void;
}

const ConfessionForm = ({
  userInput,
  setUserInput,
  isAnalyzing,
  isInTreatment,
  onSubmit
}: ConfessionFormProps) => {
  const { triggerHaptic } = useNativeFeatures();

  const handleSubmit = async () => {
    await triggerHaptic(ImpactStyle.Medium);
    onSubmit();
  };

  return (
    <MobileCard className="bg-dark-card border-dark-border relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-warm-yellow/50 to-transparent"></div>
      <MobileCardHeader>
        <MobileCardTitle className="text-warm-yellow flex items-center space-x-2">
          <span>💼</span>
          <span>CONFISSÃO PROFISSIONAL</span>
        </MobileCardTitle>
        <MobileCardDescription className="text-warm-gray/70 font-inter italic">
          "Dr. Desculpas pega sua prancheta médica. 'Liste seus sintomas de autossabotagem profissional. Todos. Sem exceção.'"
        </MobileCardDescription>
      </MobileCardHeader>
      <MobileCardContent className="space-y-4">
        {!isInTreatment ? (
          <>
            <div className="bg-warm-yellow/10 p-4 rounded-lg border-l-4 border-warm-yellow touch-target">
              <p className="text-warm-yellow font-inter text-sm font-medium leading-relaxed">
                💭 "Confesse: Como você sabota sua carreira? Procrastina projetos? Evita apresentações? 
                Rejeita oportunidades? Seja brutalmente honesto - sua recuperação depende disso."
              </p>
            </div>
            
            <MobileTextarea
              placeholder="Dr. Desculpas ajusta o estetoscópio: 'Sintomas, por favor. Como você se sabota profissionalmente? Evita feedback? Procrastina? Tem medo de assumir responsabilidades? Preciso de todos os detalhes para o diagnóstico.'"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="bg-dark-bg border-dark-border text-warm-gray font-inter focus:border-warm-yellow/50 min-h-[160px]"
              disabled={isAnalyzing}
            />
            
            <Button
              onClick={handleSubmit}
              disabled={!userInput.trim() || isAnalyzing}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bebas text-lg tracking-wider py-6 touch-target tap-highlight-none"
            >
              {isAnalyzing ? "🔍 DIAGNOSTICANDO..." : "⚕️ SOLICITAR DIAGNÓSTICO MÉDICO"}
            </Button>
          </>
        ) : (
          <div className="text-center py-8 touch-target">
            <Clock size={48} className="text-warm-yellow mx-auto mb-4" />
            <p className="text-warm-gray font-inter leading-relaxed">
              Você está em tratamento ativo. Complete suas ações diárias para reduzir sua dívida de autossabotagem.
            </p>
          </div>
        )}
      </MobileCardContent>
    </MobileCard>
  );
};

export default ConfessionForm;
