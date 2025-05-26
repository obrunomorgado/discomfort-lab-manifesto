
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const UnbreakableMind = () => {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    
    // Simulação de resposta da AI - aqui você integraria com a API real
    setTimeout(() => {
      const mockResponse = {
        interrogatorio: "Para de fugir da verdade. Você está me dizendo que 'não consegue' acordar cedo? Não consegue ou não QUER? Qual é a diferença entre você e alguém que acorda às 5h todo dia? Coragem.",
        analise: "Você está operando em modo vítima. Sua mente criou uma narrativa de que você 'não é uma pessoa matinal' para justificar preguiça. Isso é mentira que você conta para si mesmo.",
        desafio: "Amanhã você vai acordar às 5h30. Sem negociação. Sem 'só mais 5 minutos'. Pés no chão imediatamente. Tome um banho frio. Faça isso pelos próximos 3 dias consecutivos.",
        verdade: "Você não precisa se sentir pronto para fazer algo difícil. Disciplina não é sentimento - é ação apesar do sentimento."
      };
      
      setAiResponse(`<Interrogatório Goggins>
${mockResponse.interrogatorio}

<Análise Crítica>
${mockResponse.analise}

<Desafio do Dia>
${mockResponse.desafio}

<Verdade Brutal>
${mockResponse.verdade}`);
      
      setIsLoading(false);
      setHasStarted(true);
    }, 2000);
  };

  const resetChat = () => {
    setUserInput("");
    setAiResponse("");
    setHasStarted(false);
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/testes" 
            className="text-warm-gray hover:text-warm-yellow transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className="bg-red-500 text-white font-bebas text-xs">
                EXTREMO
              </Badge>
              <h1 className="text-4xl font-bebas text-warm-gray tracking-wider">
                UNBREAKABLE MIND SIMULATOR
              </h1>
            </div>
            <p className="text-warm-gray/60 font-inter">
              Mentalidade David Goggins para esmagar suas desculpas mentais
            </p>
          </div>
        </div>

        {/* Warning Card */}
        <Card className="bg-red-600/10 border-red-600/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400 font-bebas">
              <Zap size={20} />
              AVISO DE INTENSIDADE MÁXIMA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-warm-gray/80 font-inter">
              Este simulador não oferece motivação superficial. Prepare-se para confrontar 
              suas mentiras internas e receber feedback brutal sobre seus padrões de fuga. 
              <strong className="text-red-400"> Sem vitimismo permitido.</strong>
            </p>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="bg-dark-card border-dark-border">
          <CardHeader>
            <CardTitle className="text-2xl font-bebas text-warm-gray">
              SESSÃO DE FORJAMENTO MENTAL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!hasStarted ? (
              <div className="space-y-4">
                <div className="bg-warm-yellow/10 border border-warm-yellow p-4 rounded">
                  <p className="text-warm-yellow font-inter font-medium">
                    "Descreva o comportamento que você quer esmagar hoje e o David Goggins AI Mode vai iniciar o processo."
                  </p>
                </div>
                
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ex: 'Quero parar de acordar tarde e enrolar duas horas antes de começar meu dia. Todo dia eu faço isso e depois me culpo.'"
                  className="min-h-[120px] bg-dark-bg border-dark-border text-warm-gray font-inter"
                  disabled={isLoading}
                />
                
                <Button
                  onClick={handleSubmit}
                  disabled={!userInput.trim() || isLoading}
                  className="w-full bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas text-lg py-6 tracking-wider"
                >
                  {isLoading ? "PROCESSANDO..." : "INICIAR FORJAMENTO"}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* User Input Display */}
                <div className="bg-dark-bg/50 p-4 rounded border border-dark-border">
                  <h3 className="text-warm-yellow font-bebas mb-2">SEU COMPORTAMENTO ALVO:</h3>
                  <p className="text-warm-gray/80 font-inter">{userInput}</p>
                </div>
                
                {/* AI Response */}
                <div className="bg-red-600/10 p-6 rounded border border-red-600/30">
                  <h3 className="text-red-400 font-bebas text-xl mb-4 flex items-center gap-2">
                    <Zap size={20} />
                    DIAGNÓSTICO GOGGINS
                  </h3>
                  <div className="whitespace-pre-line text-warm-gray font-inter leading-relaxed">
                    {aiResponse}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={resetChat}
                    variant="outline"
                    className="flex-1 border-warm-yellow text-warm-yellow hover:bg-warm-yellow hover:text-dark-bg font-bebas tracking-wider"
                  >
                    NOVA SESSÃO
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

        {/* Bottom Info */}
        <div className="mt-8 text-center">
          <p className="text-warm-gray/60 font-inter text-sm">
            Baseado na filosofia de disciplina extrema e antifragilidade mental de David Goggins
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnbreakableMind;
