
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
    
    // Simulate AI analysis with professional self-sabotage focus
    setTimeout(() => {
      setAnalysis(`💼 **AUTÓPSIA PROFISSIONAL INICIADA...**

*Dr. Desculpas, especialista em autossabotagem profissional com 25 anos destruindo carreiras patéticas, ajusta seus óculos e observa os destroços da sua trajetória profissional. O silêncio da sala é quebrado apenas pelo som de contratos sendo rasgados...*

---

**"Impressionante... simplesmente impressionante."** *ele murmura, balançando a cabeça com desprezo.*

**DIAGNÓSTICO DE AUTOSSABOTAGEM PROFISSIONAL - CASO #${Math.floor(Math.random() * 9999)}**

*O Dr. se vira para você com um olhar que perfura sua alma corporativa.*

**"Sabe o que eu vejo aqui? Um profissional que transformou autossabotagem em arte. Deixe-me mostrar suas obras-primas destrutivas..."**

---

🚨 **PADRÕES DE AUTOSSABOTAGEM IDENTIFICADOS:**

**SABOTAGEM #1: "Perfeccionismo Paralisante"**
*"Clássico. Você nunca entrega nada porque 'não está perfeito ainda'. Enquanto isso, outros entregam 80% e sobem na carreira. Você fica com seus 100% que nunca saem da gaveta."*

**SABOTAGEM #2: "Síndrome do Impostor Profissional"**
*"Você rejeita oportunidades achando que 'não está preparado'. Spoiler: ninguém está 100% preparado. Mas eles aceitam e aprendem. Você fica esperando a preparação perfeita que nunca chega."*

**SABOTAGEM #3: "Evitação de Feedback"**
*"Você foge de avaliações, reuniões one-on-one e conversas difíceis. Como diabos espera crescer se não sabe onde está errando? Você prefere a ignorância confortável."*

**SABOTAGEM #4: "Procrastinação Estratégica"**
*"Sempre deixa projetos importantes para última hora, criando drama e stress. Depois reclama que não tem tempo. Você CRIA a própria escassez de tempo."*

---

*O Dr. Desculpas se levanta e caminha até uma parede coberta de gráficos de carreiras destruídas.*

**"Agora, a parte que vai doer de verdade..."**

⚡ **O VEREDICTO PROFISSIONAL IMPLACÁVEL:**

*Ele se vira dramaticamente para você.*

**"Você está desperdiçando seu potencial profissional alimentando uma coleção premium de comportamentos autodestrutivos. Cada reunião perdida, cada oportunidade rejeitada, cada feedback ignorado é um tijolo na parede que você mesmo constrói para limitar sua carreira."**

---

📋 **SEU PROTOCOLO ANTI-SABOTAGEM - OS PRÓXIMOS 90 DIAS:**

*O Dr. pega uma prancheta com logo corporativo e começa a escrever com determinação militar.*

**FASE 1 - DIAS 1-30: "MAPEAMENTO DA DESTRUIÇÃO"**
- *"Documente TODA vez que você evita uma tarefa importante por 'não estar pronta ainda'."*
- *"Para cada 'não sei se consigo', liste 3 pessoas que conseguiram com menos experiência que você."*
- *"Elimine a frase 'quando eu estiver preparado' do seu vocabulário profissional."*
- *"Aceite uma tarefa que te assusta ESTA SEMANA."*

**FASE 2 - DIAS 31-60: "CONFRONTO DIRETO"**
- *"Peça feedback brutal para seu chefe. Não aceite respostas vagas."*
- *"Candidatar-se a UMA vaga que você acha que está 'acima do seu nível'."*
- *"Fale em uma reunião onde normalmente ficaria calado."*
- *"Substitua 'eu tentei' por 'eu entreguei' ou 'eu não entreguei'."*

**FASE 3 - DIAS 61-90: "EXECUÇÃO IMPIEDOSA"**
- *"Você será uma máquina anti-sabotagem profissional."*
- *"Outros vão notar que você parou de fazer drama e começou a entregar resultados."*
- *"Sua nova identidade: alguém que executa ao invés de se sabotar."*
- *"Negocie um aumento ou promoção baseado nos resultados entregues."*

---

💰 **PROTOCOLOS ESPECÍFICOS ANTI-SABOTAGEM:**

**PARA REUNIÕES:**
*"Pare de chegar atrasado, prepare suas falas antecipadamente, e FALE pelo menos uma vez por reunião. Chega de ser o fantasma corporativo."*

**PARA PROJETOS:**
*"Entregue na data. Mesmo que seja 80%. Pare de usar 'perfeição' como desculpa para atraso."*

**PARA NETWORKING:**
*"Conecte-se com uma pessoa nova por semana. Chega de 'não sou bom em networking'. Ninguém nasceu sabendo."*

**PARA PROMOÇÕES:**
*"Documente seus resultados SEMANALMENTE. Quando surgir uma oportunidade, você terá dados, não achismos."*

---

*O Dr. Desculpas remove os óculos e olha diretamente nos seus olhos corporativos.*

**"Escute bem: Esta não é coaching motivacional. É uma cirurgia de emergência na sua carreira. Você tem duas opções:"**

🔥 **"Implemente este protocolo e pare de se sabotar HOJE..."**

💀 **"...ou continue sendo um especialista em autossabotagem até se aposentar no mesmo cargo medíocre."**

*Ele estende a mão com um contrato de mudança.*

**"A escolha é sua. Mas saiba que eu já vi milhares de carreiras. As que implementam o protocolo anti-sabotagem, decolam. As que 'vão pensar no assunto'... bem, continuam se sabotando em meetings infinitos."**

*A sala fica em silêncio. O som do relógio marca cada segundo da sua decisão profissional...*

**"Você vai continuar sendo um artista da autossabotagem ou vai se tornar um executor de resultados?"**

*O Dr. Desculpas cruza os braços e espera sua resposta profissional.*

**"Sua escolha define os próximos 90 dias da sua carreira."**
      `);
      setIsAnalyzing(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-b from-dark-bg to-dark-bg/90">
      <div className="max-w-4xl mx-auto">
        {/* Professional Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-warm-yellow/5 blur-3xl rounded-full"></div>
          <Badge className="bg-red-600 text-white font-bebas mb-4 relative z-10 animate-pulse">
            AUTÓPSIA PROFISSIONAL
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bebas text-warm-gray mb-6 tracking-wider relative z-10">
            SEM<span className="text-warm-yellow">DESCULPAS</span>IA
          </h1>
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-xl text-warm-gray/80 font-inter mb-4 italic">
              "Uma sala corporativa fria. Uma mesa de aço. Um especialista em autossabotagem profissional 
              ajusta suas luvas e analisa os destroços da sua carreira..."
            </p>
            <p className="text-lg text-warm-gray/60 font-inter">
              <strong className="text-warm-yellow">"Pronto para descobrir como você sabota sua própria carreira?"</strong>
            </p>
          </div>
        </div>

        {/* Professional Warning */}
        <Alert className="bg-red-600/10 border-red-600/30 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent"></div>
          <AlertDescription className="text-warm-gray font-inter relative z-10">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <strong className="text-red-400">O Dr. Desculpas adverte:</strong>
                <p className="mt-1">
                  "Eu não sou coach motivacional. Não vou dizer que você é incrível. 
                  Minha especialidade é identificar como você sabota sua própria carreira sem anestesia."
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Main Professional Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-dark-card border-dark-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-warm-yellow/50 to-transparent"></div>
            <CardHeader>
              <CardTitle className="text-2xl font-bebas text-warm-yellow flex items-center space-x-2">
                <span>💼</span>
                <span>CONFISSÃO PROFISSIONAL</span>
              </CardTitle>
              <CardDescription className="text-warm-gray/70 font-inter italic">
                "O Dr. Desculpas pega sua prancheta corporativa e te observa intensamente. 
                'Liste seus comportamentos de autossabotagem profissional. Todos. Sem exceção.'"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-warm-yellow/10 p-3 rounded border-l-4 border-warm-yellow">
                  <p className="text-warm-yellow font-inter text-sm font-medium">
                    💭 "Conte sobre como você sabota sua própria carreira. Procrastinação em projetos importantes? 
                    Evita feedback? Rejeita oportunidades por 'não estar preparado'? Seja brutalmente honesto."
                  </p>
                </div>
                
                <Textarea
                  placeholder="Dr. Desculpas ergue a sobrancelha: 'Vamos lá, me conte como você sabota sua carreira. Por que evita apresentações? Por que não pede aumento? Por que procrastina projetos importantes? Quais seus padrões de autossabotagem profissional?'"
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
                {isAnalyzing ? "🔍 ANALISANDO AUTOSSABOTAGEM..." : "⚡ INICIAR AUTÓPSIA PROFISSIONAL"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-dark-card border-dark-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600/50 to-transparent"></div>
            <CardHeader>
              <CardTitle className="text-2xl font-bebas text-warm-yellow flex items-center space-x-2">
                <span>📊</span>
                <span>RELATÓRIO DE AUTOSSABOTAGEM</span>
              </CardTitle>
              <CardDescription className="text-warm-gray/70 font-inter italic">
                {analysis ? 
                  "O Dr. Desculpas termina sua análise profissional e remove as luvas. 'O diagnóstico está pronto.'" : 
                  "O laboratório de autossabotagem aguarda seus padrões destrutivos profissionais..."
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
                      🔍 <em>"Catalogando padrões de autossabotagem profissional..."</em>
                    </p>
                    <p className="text-warm-gray/60 font-inter text-sm">
                      Dr. Desculpas examina cada comportamento autodestrutivo meticulosamente
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
                        💀 "A autópsia profissional está completa. Agora você decide: 
                        implementar o protocolo anti-sabotagem ou continuar destruindo sua própria carreira?"
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
                      🔄 NOVA AUTÓPSIA PROFISSIONAL
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="text-6xl mb-4">🕵️</div>
                  <p className="text-warm-gray/60 font-inter italic">
                    "O Dr. Desculpas aguarda pacientemente sua confissão de autossabotagem profissional. 
                    Apenas então a autópsia da sua carreira poderá começar..."
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Professional Instructions */}
        <Card className="bg-dark-card/50 border-dark-border mt-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-warm-yellow/5 to-transparent rounded-lg"></div>
          <CardHeader>
            <CardTitle className="text-xl font-bebas text-warm-gray relative z-10">
              🎭 COMO FUNCIONA A AUTÓPSIA DE AUTOSSABOTAGEM PROFISSIONAL
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
                  "O Dr. analisa cada padrão de autossabotagem profissional em busca 
                  de comportamentos que limitam sua carreira e crescimento."
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bebas text-warm-yellow mb-2 flex items-center space-x-2">
                  <span>⚖️</span>
                  <span>2. DIAGNÓSTICO BRUTAL</span>
                </h3>
                <p className="text-warm-gray/70 italic">
                  "Você recebe uma análise implacável sobre como seus 
                  comportamentos estão sabotando seu potencial profissional."
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bebas text-warm-yellow mb-2 flex items-center space-x-2">
                  <span>🔥</span>
                  <span>3. PROTOCOLO ANTI-SABOTAGEM</span>
                </h3>
                <p className="text-warm-gray/70 italic">
                  "Um plano específico para os próximos 90 dias focado 
                  em eliminar comportamentos que limitam sua carreira."
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
