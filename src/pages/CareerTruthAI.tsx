
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
    
    // Simulate AI analysis with storytelling
    setTimeout(() => {
      setAnalysis(`🔍 **A ELIMINAÇÃO COMEÇA...**

*O Dr. Desculpas, um especialista implacável com 30 anos destruindo justificativas patéticas, ajusta seus óculos e observa atentamente os fragmentos da sua vida. O silêncio da sala é quebrado apenas pelo som de papel sendo rasgado...*

---

**"Fascinante... absolutamente fascinante."** *ele murmura, balançando a cabeça.*

**DIAGNÓSTICO ANTI-DESCULPAS - CASO #${Math.floor(Math.random() * 9999)}**

*O Dr. se vira para você com um olhar que perfura a alma.*

**"Sabe o que eu vejo aqui? Uma pessoa que transformou desculpas em arte. Deixe-me mostrar suas obras-primas..."**

---

🚨 **AS DESCULPAS ENCONTRADAS NO LOCAL:**

**DESCULPA #1: "Não Tenho Tempo"**
*"Clássica. Você tem tempo para redes sociais, séries, reclamações, mas não para mudar sua vida. 'Tempo' é sua desculpa favorita porque parece legítima."*

**DESCULPA #2: "Não É o Momento Certo"**
*"Ah, sim. Você está esperando as estrelas se alinhar, a economia melhorar, segunda-feira chegar... O 'momento certo' é um mito que você criou para justificar a inação."*

**DESCULPA #3: "É Muito Difícil"**
*"Tradução: 'Eu prefiro a dor familiar da mediocridade à dor desconhecida do crescimento'. Você escolheu o sofrimento passivo."*

---

*O Dr. Desculpas se levanta e caminha até a janela, observando pessoas correndo atrás dos sonhos lá fora.*

**"Agora, a parte que vai doer..."**

⚡ **O VEREDICTO IMPLACÁVEL:**

*Ele se vira dramaticamente para você.*

**"Você está desperdiçando sua única existência alimentando uma coleção de desculpas premium. Cada dia que passa, você fica mais expert em justificar por que não age, mas zero expert em realmente viver."**

---

📋 **SEU PROTOCOLO DE EXTERMÍNIO - OS PRÓXIMOS 90 DIAS:**

*O Dr. pega uma prancheta e começa a escrever com determinação.*

**FASE 1 - OS PRIMEIROS 30 DIAS: "IDENTIFICAÇÃO E CERCO"**
- *"Você vai documentar TODA desculpa que sair da sua boca. Sem exceção."*
- *"Para cada 'não posso', você vai listar 3 maneiras de como PODE."*
- *"Elimine a palavra 'mas' do seu vocabulário por 30 dias."*

**FASE 2 - DIAS 31-60: "ATAQUE FRONTAL"**
- *"Cada desculpa identificada vira uma ação imediata e oposta."*
- *"Você não vai mais explicar por que não fez. Vai fazer e ponto."*
- *"Substitua 'eu tentei' por 'eu fiz' ou 'eu não fiz'."*

**FASE 3 - DIAS 61-90: "EXTERMÍNIO TOTAL"**
- *"Você será uma máquina anti-desculpas."*
- *"Outras pessoas vão notar que você parou de reclamar e começou a entregar."*
- *"Sua nova identidade: alguém que age ao invés de justificar."*

---

*O Dr. Desculpas remove os óculos e olha diretamente nos seus olhos.*

**"Escute bem: Esta não é terapia motivacional. É uma cirurgia de emergência na sua mentalidade. Você tem duas opções:"**

🔥 **"Aceite este protocolo e elimine suas desculpas HOJE..."**

💀 **"...ou continue colecionando justificativas até o fim da vida."**

*Ele estende a mão com um documento.*

**"A escolha é sua. Mas saiba que eu já vi milhares de casos. Os que implementam o protocolo, renascem. Os que 'vão pensar no assunto'... bem, continuam sendo especialistas em desculpas."**

*A sala fica em silêncio. O som do relógio marca cada segundo da sua decisão...*

**"Você vai continuar sendo um artista de desculpas ou vai se tornar um executor implacável?"**

*O Dr. Desculpas cruza os braços e espera.*

**"Sua resposta define os próximos 90 dias da sua vida."**
      `);
      setIsAnalyzing(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-b from-dark-bg to-dark-bg/90">
      <div className="max-w-4xl mx-auto">
        {/* Cinematic Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-warm-yellow/5 blur-3xl rounded-full"></div>
          <Badge className="bg-red-600 text-white font-bebas mb-4 relative z-10 animate-pulse">
            ELIMINAÇÃO BRUTAL
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bebas text-warm-gray mb-6 tracking-wider relative z-10">
            SEM<span className="text-warm-yellow">DESCULPAS</span>IA
          </h1>
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-xl text-warm-gray/80 font-inter mb-4 italic">
              "Uma sala fria. Uma mesa de aço. Um especialista em eliminar desculpas 
              ajusta suas luvas e olha para você..."
            </p>
            <p className="text-lg text-warm-gray/60 font-inter">
              <strong className="text-warm-yellow">"Pronto para o extermínio total das suas justificativas?"</strong>
            </p>
          </div>
        </div>

        {/* Dramatic Warning */}
        <Alert className="bg-red-600/10 border-red-600/30 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent"></div>
          <AlertDescription className="text-warm-gray font-inter relative z-10">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <strong className="text-red-400">O Dr. Desculpas adverte:</strong>
                <p className="mt-1">
                  "Eu não valido suas justificativas. Não ofereço ombro para chorar. 
                  Minha especialidade é destruir desculpas sem anestesia."
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Main Story Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Story Input Section */}
          <Card className="bg-dark-card border-dark-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-warm-yellow/50 to-transparent"></div>
            <CardHeader>
              <CardTitle className="text-2xl font-bebas text-warm-yellow flex items-center space-x-2">
                <span>📋</span>
                <span>SUA CONFISSÃO</span>
              </CardTitle>
              <CardDescription className="text-warm-gray/70 font-inter italic">
                "O Dr. Desculpas pega sua prancheta e te observa intensamente. 
                'Liste suas desculpas favoritas. Todas. Sem exceção.'"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-warm-yellow/10 p-3 rounded border-l-4 border-warm-yellow">
                  <p className="text-warm-yellow font-inter text-sm font-medium">
                    💭 "Conte sobre suas desculpas para não mudar, não agir, não crescer... 
                    Quanto mais honesto, mais eficaz será o extermínio."
                  </p>
                </div>
                
                <Textarea
                  placeholder="Dr. Desculpas ergue a sobrancelha: 'Vamos lá, me conte suas desculpas favoritas. Por que você não faz exercício? Por que não muda de emprego? Por que não estuda? Quais suas justificativas premium?'"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="min-h-[200px] bg-dark-bg border-dark-border text-warm-gray resize-none font-inter focus:border-warm-yellow/50 transition-colors"
                />
              </div>
              
              <Button
                onClick={handleSubmit}
                disabled={!userInput.trim() || isAnalyzing}
                className="w-full bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas text-lg tracking-wider py-6 transition-all duration-300 hover:scale-[1.02]"
              >
                {isAnalyzing ? "🔍 IDENTIFICANDO DESCULPAS..." : "⚡ INICIAR EXTERMÍNIO"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Story Section */}
          <Card className="bg-dark-card border-dark-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600/50 to-transparent"></div>
            <CardHeader>
              <CardTitle className="text-2xl font-bebas text-warm-yellow flex items-center space-x-2">
                <span>🔬</span>
                <span>RELATÓRIO ANTI-DESCULPAS</span>
              </CardTitle>
              <CardDescription className="text-warm-gray/70 font-inter italic">
                {analysis ? 
                  "O Dr. Desculpas termina sua análise e remove as luvas. 'O diagnóstico está pronto.'" : 
                  "O laboratório aguarda sua lista de desculpas para iniciar o extermínio..."
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-warm-yellow"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-warm-yellow/20"></div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-warm-gray font-inter animate-pulse">
                      🔍 <em>"Catalogando suas justificativas..."</em>
                    </p>
                    <p className="text-warm-gray/60 font-inter text-sm">
                      Dr. Desculpas examina cada desculpa meticulosamente
                    </p>
                  </div>
                </div>
              ) : analysis ? (
                <div className="space-y-4">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-warm-gray/90 font-inter whitespace-pre-line leading-relaxed text-sm">
                      {analysis}
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-dark-border space-y-3">
                    <div className="bg-warm-yellow/10 p-4 rounded border border-warm-yellow/30">
                      <p className="text-warm-yellow font-inter text-sm font-medium text-center">
                        💀 "O extermínio está completo. Agora você decide: 
                        implementar o protocolo ou continuar colecionando desculpas?"
                      </p>
                    </div>
                    <Button 
                      onClick={() => {
                        setAnalysis("");
                        setUserInput("");
                      }}
                      variant="outline"
                      className="w-full border-warm-yellow text-warm-yellow hover:bg-warm-yellow hover:text-dark-bg font-bebas tracking-wider transition-all duration-300"
                    >
                      🔄 NOVO EXTERMÍNIO
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="text-6xl mb-4">🕵️</div>
                  <p className="text-warm-gray/60 font-inter italic">
                    "O Dr. Desculpas aguarda pacientemente sua lista de justificativas. 
                    Apenas então o extermínio das suas desculpas poderá começar..."
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Story Instructions */}
        <Card className="bg-dark-card/50 border-dark-border mt-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-warm-yellow/5 to-transparent rounded-lg"></div>
          <CardHeader>
            <CardTitle className="text-xl font-bebas text-warm-gray relative z-10">
              🎭 COMO FUNCIONA O EXTERMÍNIO DE DESCULPAS
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid md:grid-cols-3 gap-6 text-sm font-inter">
              <div className="space-y-2">
                <h3 className="font-bebas text-warm-yellow mb-2 flex items-center space-x-2">
                  <span>🔍</span>
                  <span>1. IDENTIFICAÇÃO</span>
                </h3>
                <p className="text-warm-gray/70 italic">
                  "O Dr. analisa cada desculpa sua em busca de padrões de 
                  autossabotagem e evasão de responsabilidade."
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bebas text-warm-yellow mb-2 flex items-center space-x-2">
                  <span>⚖️</span>
                  <span>2. DIAGNÓSTICO BRUTAL</span>
                </h3>
                <p className="text-warm-gray/70 italic">
                  "Você recebe uma análise implacável sobre como suas 
                  justificativas estão destruindo seu potencial."
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bebas text-warm-yellow mb-2 flex items-center space-x-2">
                  <span>🔥</span>
                  <span>3. PROTOCOLO DE AÇÃO</span>
                </h3>
                <p className="text-warm-gray/70 italic">
                  "Um plano específico para os próximos 90 dias. 
                  Sem desculpas, apenas execução."
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
