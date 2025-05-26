
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const ArquitetoDaVerdade = () => {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    
    // Simulação de resposta da AI - aqui você integraria com a API real
    setTimeout(() => {
      const mockResponse = `<Escaneamento de Verdade>
• Por que você aceita viver uma vida que não te representa?
• Quais medos específicos você está mascarando com essa narrativa de "é tarde demais"?
• Que evidências concretas você tem de que mudança aos ${Math.floor(Math.random() * 15) + 25} anos é impossível?
• Quantas pessoas você conhece que mudaram de carreira com sucesso após essa idade?

<Pilares a Demolir>
• "É tarde demais" - Uma mentira conveniente para evitar risco
• Necessidade de aprovação externa para validar suas decisões
• Crença de que estabilidade financeira vale mais que realização pessoal
• Medo do julgamento disfarçado de "responsabilidade"

<Projeto da Nova Estrutura>
Sua nova arquitetura mental será baseada em:
- CORAGEM CALCULADA: Mudança não é salto no abismo, é planejamento estratégico
- IDENTIDADE FLUIDA: Você não é sua profissão, você é quem escolhe ser a cada dia
- TEMPO COMO ALIADO: Cada dia que você adia é um dia a menos de vida autêntica
- RESPONSABILIDADE REAL: Para consigo mesmo, não para expectativas alheias

<Mantra de Verdade>
"Eu sou o arquiteto da minha própria existência. Cada dia que aceito viver uma mentira é um tijolo na parede da minha própria prisão. Hoje eu quebro essa parede."`;
      
      setAiResponse(mockResponse);
      setIsLoading(false);
      setHasStarted(true);
    }, 2500);
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
              <Badge className="bg-yellow-600 text-white font-bebas text-xs">
                INTENSO
              </Badge>
              <h1 className="text-4xl font-bebas text-warm-gray tracking-wider">
                ARQUITETO DA VERDADE
              </h1>
            </div>
            <p className="text-warm-gray/60 font-inter">
              Desconstrua mentiras internas e projete uma nova identidade baseada em verdade
            </p>
          </div>
        </div>

        {/* Warning Card */}
        <Card className="bg-yellow-600/10 border-yellow-600/30 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400 font-bebas">
              <Building2 size={20} />
              PROCESSO DE RECONSTRUÇÃO MENTAL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-warm-gray/80 font-inter">
              Este processo irá desmontar suas estruturas mentais frágeis e projetar uma nova 
              fundação baseada em verdade e responsabilidade. 
              <strong className="text-yellow-400"> Prepare-se para confrontar suas narrativas mais profundas.</strong>
            </p>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="bg-dark-card border-dark-border">
          <CardHeader>
            <CardTitle className="text-2xl font-bebas text-warm-gray">
              SESSÃO DE ARQUITETURA MENTAL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!hasStarted ? (
              <div className="space-y-4">
                <div className="bg-warm-yellow/10 border border-warm-yellow p-4 rounded">
                  <p className="text-warm-yellow font-inter font-medium">
                    "Descreva o conflito interno ou padrão mental que deseja reconstruir e o Arquiteto da Verdade iniciará a obra."
                  </p>
                </div>
                
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ex: 'Tenho medo de mudar de carreira mesmo sabendo que estou infeliz na atual. Sempre digo que é tarde demais para recomeçar...'"
                  className="min-h-[120px] bg-dark-bg border-dark-border text-warm-gray font-inter"
                  disabled={isLoading}
                />
                
                <Button
                  onClick={handleSubmit}
                  disabled={!userInput.trim() || isLoading}
                  className="w-full bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas text-lg py-6 tracking-wider"
                >
                  {isLoading ? "ANALISANDO ESTRUTURA..." : "INICIAR RECONSTRUÇÃO"}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* User Input Display */}
                <div className="bg-dark-bg/50 p-4 rounded border border-dark-border">
                  <h3 className="text-warm-yellow font-bebas mb-2">ESTRUTURA PARA RECONSTRUIR:</h3>
                  <p className="text-warm-gray/80 font-inter">{userInput}</p>
                </div>
                
                {/* AI Response */}
                <div className="bg-yellow-600/10 p-6 rounded border border-yellow-600/30">
                  <h3 className="text-yellow-400 font-bebas text-xl mb-4 flex items-center gap-2">
                    <Building2 size={20} />
                    PROJETO DE RECONSTRUÇÃO
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
                    NOVA ARQUITETURA
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
            Baseado em princípios de reconstrução de narrativas e arquitetura mental para transformação pessoal
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArquitetoDaVerdade;
