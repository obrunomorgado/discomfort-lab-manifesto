
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CareerTruthAI = () => {
  const [userInput, setUserInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis(`
**RESULTADO DA AUTÓPSIA: PONTUAÇÃO DE AUTODESTRUIÇÃO: 7.5/10**

**DIAGNÓSTICO BRUTAL:**
Baseado na sua autoavaliação, você está operando em modo de autossabotagem avançado. Principais problemas identificados:

**1. SÍNDROME DO PERFECCIONISTA PARALISADO**
- Você usa "qualidade" como desculpa para não entregar
- Medo de julgamento te mantém na zona de preparação eterna
- PRESCRIÇÃO: Entregue algo 70% pronto HOJE

**2. VÍCIO EM CONFORTO DISFARÇADO DE ESTRATÉGIA**
- Você planeja demais, executa de menos
- "Pesquisar mais" virou procrastinação premium
- PRESCRIÇÃO: Corte 80% do planejamento, 300% mais ação

**3. AUTOESTIMA BASEADA EM APROVAÇÃO EXTERNA**
- Você precisa de validação para cada movimento
- Decisões dependem do que outros vão pensar
- PRESCRIÇÃO: Tome 3 decisões impopulares esta semana

**PLANO DE RECUPERAÇÃO 30-60-90 DIAS:**

**PRIMEIROS 30 DIAS - CHOQUE DE REALIDADE:**
- Eliminação imediata de 3 distrações principais
- Entrega semanal obrigatória (mesmo que imperfeita)
- Zero tolerância com desculpas

**60 DIAS - RECONSTRUÇÃO:**
- Implementação de feedback brutal diário
- Criação de accountability público
- Medição de resultados, não de esforço

**90 DIAS - NOVA IDENTIDADE:**
- Você não será mais a pessoa que "tenta"
- Será a pessoa que "faz" ou "falha rápido"

**AVISO FINAL:**
Este plano só funciona se você parar de negociar consigo mesmo. Sem "mas", sem "se", sem "quando". Agora ou nunca.
      `);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-red-600 text-white font-bebas mb-4">BRUTAL</Badge>
          <h1 className="text-5xl md:text-6xl font-bebas text-warm-gray mb-6 tracking-wider">
            CAREER<span className="text-warm-yellow">TRUTH</span>AI
          </h1>
          <p className="text-xl text-warm-gray/60 font-inter max-w-3xl mx-auto">
            A autópsia mais brutal da sua carreira. Sem filtros, sem açúcar, apenas a verdade 
            que você precisa ouvir (mas não quer).
          </p>
        </div>

        {/* Warning */}
        <Alert className="bg-warm-yellow/10 border-warm-yellow mb-8">
          <AlertDescription className="text-warm-gray font-inter">
            <strong>AVISO:</strong> Esta AI foi programada para ser implacável. Se você busca validação, 
            feche esta página agora. Se busca resultados, continue.
          </AlertDescription>
        </Alert>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-2xl font-bebas text-warm-yellow">
                SUA AUTOAVALIAÇÃO
              </CardTitle>
              <CardDescription className="text-warm-gray/70 font-inter">
                Descreva sua situação profissional atual com total honestidade. 
                Quanto mais detalhes, mais preciso será o diagnóstico.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-inter text-warm-gray/80">
                  Conte tudo sobre sua carreira atual:
                </label>
                <Textarea
                  placeholder="Ex: Trabalho há 5 anos na mesma empresa, sempre fui promovido mas sinto que estou estagnado. Tenho medo de sair da zona de conforto, sempre arrumo desculpas para não buscar algo melhor. Sinto que desperdiço meu potencial mas não sei como mudar..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="min-h-[200px] bg-dark-bg border-dark-border text-warm-gray resize-none font-inter"
                />
              </div>
              
              <Button
                onClick={handleSubmit}
                disabled={!userInput.trim() || isAnalyzing}
                className="w-full bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas text-lg tracking-wider"
              >
                {isAnalyzing ? "ANALISANDO..." : "RECEBER DIAGNÓSTICO BRUTAL"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-2xl font-bebas text-warm-yellow">
                DIAGNÓSTICO
              </CardTitle>
              <CardDescription className="text-warm-gray/70 font-inter">
                {analysis ? "Sua autópsia profissional está completa." : "Aguardando sua autoavaliação..."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-yellow mx-auto mb-4"></div>
                    <p className="text-warm-gray/60 font-inter">
                      Processando sua autópsia...
                    </p>
                  </div>
                </div>
              ) : analysis ? (
                <div className="prose prose-invert max-w-none">
                  <div className="text-warm-gray/80 font-inter whitespace-pre-line">
                    {analysis}
                  </div>
                  <div className="mt-6 pt-6 border-t border-dark-border">
                    <Button 
                      onClick={() => {
                        setAnalysis("");
                        setUserInput("");
                      }}
                      variant="outline"
                      className="border-warm-yellow text-warm-yellow hover:bg-warm-yellow hover:text-dark-bg font-bebas"
                    >
                      FAZER NOVA ANÁLISE
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-warm-gray/40 font-inter">
                    Envie sua autoavaliação para receber o diagnóstico completo.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="bg-dark-card/50 border-dark-border mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-bebas text-warm-gray">
              COMO FUNCIONA O DIAGNÓSTICO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-sm font-inter">
              <div>
                <h3 className="font-bebas text-warm-yellow mb-2">1. ANÁLISE PROFUNDA</h3>
                <p className="text-warm-gray/70">
                  Nossa AI identifica padrões de autossabotagem, medos ocultos e zonas de conforto.
                </p>
              </div>
              <div>
                <h3 className="font-bebas text-warm-yellow mb-2">2. PONTUAÇÃO BRUTAL</h3>
                <p className="text-warm-gray/70">
                  Você recebe uma nota de autodestruição de 0-10 baseada nos seus comportamentos.
                </p>
              </div>
              <div>
                <h3 className="font-bebas text-warm-yellow mb-2">3. PLANO DE AÇÃO</h3>
                <p className="text-warm-gray/70">
                  Estratégias específicas para os próximos 30-60-90 dias. Sem floreios.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerTruthAI;
