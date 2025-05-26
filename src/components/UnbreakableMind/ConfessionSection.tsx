
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target } from "lucide-react";
import { Link } from "react-router-dom";

interface ConfessionSectionProps {
  userInput: string;
  setUserInput: (value: string) => void;
  isLoading: boolean;
  hasStarted: boolean;
  onSubmit: () => void;
  onReset: () => void;
}

const ConfessionSection = ({ 
  userInput, 
  setUserInput, 
  isLoading, 
  hasStarted, 
  onSubmit, 
  onReset 
}: ConfessionSectionProps) => {
  return (
    <Card className="bg-dark-card border-dark-border relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-warm-yellow to-red-600"></div>
      <CardHeader>
        <CardTitle className="text-2xl font-bebas text-warm-yellow flex items-center space-x-2">
          <Target size={24} />
          <span>SUA CONFISSÃO</span>
        </CardTitle>
        <CardDescription className="text-warm-gray/70 font-inter italic">
          *Goggins bate os dedos na mesa impatientemente.* 
          "Fale logo. Que comportamento patético você quer esmagar hoje?"
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!hasStarted ? (
          <div className="space-y-4">
            <div className="bg-red-600/20 p-4 rounded border border-red-600/50 space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <p className="text-red-300 font-inter font-medium text-sm">
                  GOGGINS ESTÁ GRAVANDO
                </p>
              </div>
              <p className="text-red-200 font-inter text-sm italic">
                *"Não me venha com meias verdades. Eu quero saber EXATAMENTE 
                que mentiras você conta para si mesmo todo dia. Que desculpas 
                você usa para justificar sua mediocridade."*
              </p>
            </div>
            
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="*Goggins se inclina para frente, os olhos fixos nos seus* 'Vamos lá. Me conta que comportamento fraco você quer destruir hoje. E não me poupe dos detalhes.'"
              className="min-h-[150px] bg-dark-bg border-dark-border text-warm-gray font-inter resize-none focus:border-red-500/50 transition-colors"
              disabled={isLoading}
            />
            
            <Button
              onClick={onSubmit}
              disabled={!userInput.trim() || isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 font-bebas text-lg py-6 tracking-wider transition-all duration-300 hover:scale-[1.02]"
            >
              {isLoading ? "🔥 GOGGINS ESTÁ ANALISANDO..." : "⚡ INICIAR CONFRONTO"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-dark-bg/50 p-4 rounded border border-dark-border">
              <h3 className="text-warm-yellow font-bebas mb-2 flex items-center space-x-2">
                <span>🎯</span>
                <span>SEU COMPORTAMENTO ALVO:</span>
              </h3>
              <p className="text-warm-gray/80 font-inter">{userInput}</p>
            </div>
            
            <div className="flex gap-4">
              <Button
                onClick={onReset}
                variant="outline"
                className="flex-1 border-warm-yellow text-warm-yellow hover:bg-warm-yellow hover:text-dark-bg font-bebas tracking-wider"
              >
                NOVO CONFRONTO
              </Button>
              <Link to="/testes" className="flex-1">
                <Button className="w-full bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas tracking-wider">
                  OUTROS TESTES
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConfessionSection;
