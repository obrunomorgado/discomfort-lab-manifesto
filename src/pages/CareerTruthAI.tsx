
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
      setAnalysis(`🔍 **A AUTÓPSIA COMEÇA...**

*O Dr. Carreira, um veterano forense com 30 anos analisando vidas profissionais destroçadas, ajusta seus óculos e observa atentamente os fragmentos da sua trajetória. O silêncio da sala é quebrado apenas pelo som de papéis sendo virados...*

---

**"Interessante... muito interessante."** *ele murmura, franzindo a testa.*

**DIAGNÓSTICO FORENSE - CASO #${Math.floor(Math.random() * 9999)}**

*O Dr. se vira para você com um olhar penetrante.*

**"Sabe o que eu vejo aqui? Uma pessoa que construiu uma prisão confortável e chamou de carreira. Deixe-me mostrar as evidências..."**

---

🚨 **AS PROVAS NO LOCAL DO CRIME:**

**EVIDÊNCIA #1: Síndrome do Perfeccionista Paralisado**
*"Você usa 'qualidade' como álibi para nunca entregar. Cada projeto vira uma obra-prima eterna que nunca sai do papel. Medo de julgamento disfarçado de 'padrão alto'."*

**EVIDÊNCIA #2: Vício em Zona de Conforto**
*"Sua carreira virou um sofá velho - não é bonito, mas é conhecido. Você prefere a dor familiar do tédio à incerteza da mudança."*

**EVIDÊNCIA #3: Síndrome do Impostor Crônica**
*"Você se esconde atrás de títulos e aprovações externas porque não acredita no próprio valor. Cada sucesso é 'sorte', cada fracasso é 'prova' da sua inadequação."*

---

*O Dr. Carreira se levanta e caminha até a janela, observando a cidade lá fora.*

**"Agora, a parte que você não vai gostar de ouvir..."**

⚡ **O VEREDICTO BRUTAL:**

*Ele se vira dramaticamente para você.*

**"Você está desperdiçando sua única vida por medo de decepções imaginárias. Está vivendo para agradar pessoas que nem se importam, em um trabalho que suga sua alma, fingindo que 'estabilidade' vale mais que realização."**

---

📋 **SEU PLANO DE RESSURREIÇÃO - OS PRÓXIMOS 90 DIAS:**

*O Dr. pega uma prancheta e começa a escrever com vigor.*

**FASE 1 - OS PRIMEIROS 30 DIAS: "O DESPERTAR"**
- *"Você vai identificar exatamente o que te paralisa. Sem desculpas, sem 'mas é que...'"*
- *"Entregue algo imperfeito esta semana. Sim, ESTA semana."*
- *"Pare de pedir permissão para sonhar grande."*

**FASE 2 - DIAS 31-60: "A RECONSTRUÇÃO"**
- *"Você vai agir como a pessoa que quer se tornar, mesmo se sentindo impostor."*
- *"Crie uma rotina de feedback brutal consigo mesmo."*
- *"Comece a medir resultados, não esforço."*

**FASE 3 - DIAS 61-90: "O RENASCIMENTO"**
- *"Você não será mais quem 'tenta'. Será quem 'faz' ou 'falha rápido'."*
- *"Sua nova identidade estará solidificada."*
- *"O medo da mudança será menor que o medo de ficar parado."*

---

*O Dr. Carreira remove os óculos e olha diretamente nos seus olhos.*

**"Escute bem: Esta não é mais uma palestra motivacional açucarada. É um ultimato da realidade. Você tem duas escolhas:"**

🔥 **"Aceite este plano e comece HOJE..."**

💀 **"...ou continue fingindo que 'amanhã' vai ser diferente."**

*Ele estende a mão com um documento.*

**"A escolha é sua. Mas saiba que eu já vi centenas de casos como o seu. Os que agem, transformam. Os que 'pensam mais um pouco'... bem, eu os vejo de novo em 5 anos, com as mesmas desculpas."**

*A sala fica em silêncio. O relógio na parede marca cada segundo da sua decisão...*

**O que você escolhe?**
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
            FORENSE BRUTAL
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bebas text-warm-gray mb-6 tracking-wider relative z-10">
            CAREER<span className="text-warm-yellow">TRUTH</span>AI
          </h1>
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-xl text-warm-gray/80 font-inter mb-4 italic">
              "Uma sala escura. Uma mesa de metal frio. Um especialista forense da carreira 
              ajusta suas luvas e olha para você..."
            </p>
            <p className="text-lg text-warm-gray/60 font-inter">
              <strong className="text-warm-yellow">"Pronto para a autópsia da sua vida profissional?"</strong>
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
                <strong className="text-red-400">O Dr. Carreira adverte:</strong>
                <p className="mt-1">
                  "Eu não ofereço terapia motivacional. Ofereço verdades que cortam como bisturi. 
                  Se você busca validação, a porta está atrás de você."
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
                "O Dr. Carreira pega sua prancheta e te observa intensamente. 
                'Conte-me tudo. Não omita nada. Sua carreira está na mesa de autópsia.'"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-warm-yellow/10 p-3 rounded border-l-4 border-warm-yellow">
                  <p className="text-warm-yellow font-inter text-sm font-medium">
                    💭 "Fale sobre seus medos, frustrações, sonhos abandonados... 
                    Quanto mais honesto, mais preciso será o diagnóstico."
                  </p>
                </div>
                
                <Textarea
                  placeholder="Dr. Carreira ergue a sobrancelha: 'Comece pelo começo. Como chegou até aqui? O que te paralisa? Que mentiras você conta para si mesmo todos os dias sobre sua carreira?'"
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
                {isAnalyzing ? "🔍 ANALISANDO EVIDÊNCIAS..." : "⚡ INICIAR AUTÓPSIA FORENSE"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Story Section */}
          <Card className="bg-dark-card border-dark-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600/50 to-transparent"></div>
            <CardHeader>
              <CardTitle className="text-2xl font-bebas text-warm-yellow flex items-center space-x-2">
                <span>🔬</span>
                <span>RELATÓRIO FORENSE</span>
              </CardTitle>
              <CardDescription className="text-warm-gray/70 font-inter italic">
                {analysis ? 
                  "O Dr. Carreira termina sua análise e remove as luvas. 'O diagnóstico está completo.'" : 
                  "O laboratório aguarda sua confissão para iniciar a investigação..."
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
                      🔍 <em>"Analisando padrões de autossabotagem..."</em>
                    </p>
                    <p className="text-warm-gray/60 font-inter text-sm">
                      Dr. Carreira examina cada detalhe meticulosamente
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
                        💀 "A autópsia está completa. Agora você decide: 
                        ressuscitar ou continuar morto em vida?"
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
                      🔄 NOVA INVESTIGAÇÃO FORENSE
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="text-6xl mb-4">🕵️</div>
                  <p className="text-warm-gray/60 font-inter italic">
                    "O Dr. Carreira aguarda pacientemente sua confissão. 
                    Apenas então a autópsia da sua carreira poderá começar..."
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
              🎭 COMO FUNCIONA A INVESTIGAÇÃO FORENSE
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid md:grid-cols-3 gap-6 text-sm font-inter">
              <div className="space-y-2">
                <h3 className="font-bebas text-warm-yellow mb-2 flex items-center space-x-2">
                  <span>🔍</span>
                  <span>1. COLETA DE EVIDÊNCIAS</span>
                </h3>
                <p className="text-warm-gray/70 italic">
                  "O Dr. analisa cada palavra sua em busca de padrões de autossabotagem 
                  e sinais de vida desperdiçada."
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bebas text-warm-yellow mb-2 flex items-center space-x-2">
                  <span>⚖️</span>
                  <span>2. VEREDICTO BRUTAL</span>
                </h3>
                <p className="text-warm-gray/70 italic">
                  "Você recebe um diagnóstico sem filtros sobre como está 
                  destruindo seu próprio potencial."
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bebas text-warm-yellow mb-2 flex items-center space-x-2">
                  <span>🔥</span>
                  <span>3. PLANO DE RESSURREIÇÃO</span>
                </h3>
                <p className="text-warm-gray/70 italic">
                  "Um protocolo específico para os próximos 90 dias. 
                  Sem açúcar, apenas ação."
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
