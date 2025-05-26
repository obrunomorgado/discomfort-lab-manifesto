
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Clock } from "lucide-react";

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
  return (
    <Card className="bg-dark-card border-dark-border relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-warm-yellow/50 to-transparent"></div>
      <CardHeader>
        <CardTitle className="text-2xl font-bebas text-warm-yellow flex items-center space-x-2">
          <span>💼</span>
          <span>CONFISSÃO PROFISSIONAL</span>
        </CardTitle>
        <CardDescription className="text-warm-gray/70 font-inter italic">
          "Dr. Desculpas pega sua prancheta médica. 'Liste seus sintomas de autossabotagem profissional. Todos. Sem exceção.'"
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isInTreatment ? (
          <>
            <div className="bg-warm-yellow/10 p-3 rounded border-l-4 border-warm-yellow">
              <p className="text-warm-yellow font-inter text-sm font-medium">
                💭 "Confesse: Como você sabota sua carreira? Procrastina projetos? Evita apresentações? 
                Rejeita oportunidades? Seja brutalmente honesto - sua recuperação depende disso."
              </p>
            </div>
            
            <Textarea
              placeholder="Dr. Desculpas ajusta o estetoscópio: 'Sintomas, por favor. Como você se sabota profissionalmente? Evita feedback? Procrastina? Tem medo de assumir responsabilidades? Preciso de todos os detalhes para o diagnóstico.'"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="min-h-[200px] bg-dark-bg border-dark-border text-warm-gray resize-none font-inter focus:border-warm-yellow/50"
              disabled={isAnalyzing}
            />
            
            <Button
              onClick={onSubmit}
              disabled={!userInput.trim() || isAnalyzing}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bebas text-lg tracking-wider py-6"
            >
              {isAnalyzing ? "🔍 DIAGNOSTICANDO..." : "⚕️ SOLICITAR DIAGNÓSTICO MÉDICO"}
            </Button>
          </>
        ) : (
          <div className="text-center py-8">
            <Clock size={48} className="text-warm-yellow mx-auto mb-4" />
            <p className="text-warm-gray font-inter">
              Você está em tratamento ativo. Complete suas ações diárias para reduzir sua dívida de autossabotagem.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConfessionForm;
