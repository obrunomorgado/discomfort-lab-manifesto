
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useUserProgress } from "@/hooks/useUserProgress";
import { DailyAction, TestResult } from "@/types/user";
import { CheckCircle, Clock, AlertTriangle, Calendar } from "lucide-react";

const CareerTruthAI = () => {
  const [userInput, setUserInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [checkInMessage, setCheckInMessage] = useState("");
  
  const { progress, addTestResult, completeAction, performDailyCheckIn, getPendingActions, getCompletedActionsToday } = useUserProgress();
  
  const pendingActions = getPendingActions();
  const completedToday = getCompletedActionsToday();

  const generateDailyActions = (): DailyAction[] => {
    const baseActions = [
      {
        id: `action-${Date.now()}-1`,
        description: "Enviar um email importante que você vem adiando",
        points: 25,
        completed: false,
        dueDate: new Date(),
        category: 'professional' as const
      },
      {
        id: `action-${Date.now()}-2`, 
        description: "Falar pelo menos uma vez em uma reunião",
        points: 30,
        completed: false,
        dueDate: new Date(),
        category: 'communication' as const
      },
      {
        id: `action-${Date.now()}-3`,
        description: "Completar uma tarefa sem buscar 'perfeição'",
        points: 35,
        completed: false,
        dueDate: new Date(),
        category: 'behavior' as const
      },
      {
        id: `action-${Date.now()}-4`,
        description: "Documentar um resultado/conquista profissional",
        points: 20,
        completed: false,
        dueDate: new Date(),
        category: 'professional' as const
      },
      {
        id: `action-${Date.now()}-5`,
        description: "Substituir uma desculpa por uma ação concreta",
        points: 40,
        completed: false,
        dueDate: new Date(),
        category: 'mindset' as const
      }
    ];

    return baseActions.slice(0, 3 + Math.floor(Math.random() * 3)); // 3-5 ações
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const debtPoints = Math.floor(Math.random() * 201) + 150; // 150-350 pontos negativos
      const dailyActions = generateDailyActions();
      
      const testResult: TestResult = {
        testId: 'career-truth-ai',
        testName: 'Sem Desculpas IA',
        completedAt: new Date(),
        keyInsights: [
          'Padrões de autossabotagem profissional identificados',
          'Comportamentos autodestrutivos mapeados',
          'Protocolo de recuperação ativado'
        ],
        honestyScore: Math.floor(Math.random() * 3) + 7, // 7-9
        actionItems: dailyActions.map(action => action.description),
        pointsEarned: 300,
        debtPointsGenerated: debtPoints,
        dailyActionsAssigned: dailyActions
      };

      addTestResult(testResult);

      setAnalysis(`🏥 **DIAGNÓSTICO DE AUTOSSABOTAGEM PROFISSIONAL - EMERGÊNCIA MÉDICA**

*Dr. Desculpas ajusta os óculos e observa os resultados dos exames. O silêncio da sala é quebrado pelo bipe constante dos monitores...*

---

**"Paciente... temos um quadro grave aqui."** *ele murmura, balançando a cabeça*

**LAUDO MÉDICO - CASO #${Math.floor(Math.random() * 9999)}**

🚨 **DIAGNÓSTICO CONFIRMADO: AUTOSSABOTAGEM PROFISSIONAL CRÔNICA**

**PONTOS DE DÍVIDA GERADOS: -${debtPoints} pontos**

*O Dr. se vira para você com expressão séria.*

**"Você acumulou uma dívida de ${debtPoints} pontos de autossabotagem. Cada comportamento destrutivo tem um preço, e agora você vai pagar com AÇÕES."**

---

⚡ **PROTOCOLO DE REABILITAÇÃO ATIVADO:**

*Dr. Desculpas pega uma prancheta médica e começa a prescrever o tratamento.*

**"Escute bem: Você está oficialmente em TRATAMENTO. Cada ação que você completar vai reduzir sua dívida. Quando chegar a ZERO, você recebe alta médica."**

📋 **SUAS PRESCRIÇÕES DIÁRIAS:**

${dailyActions.map((action, index) => 
  `**${index + 1}.** ${action.description} *(+${action.points} pontos)*`
).join('\n')}

---

💊 **INSTRUÇÕES DE TRATAMENTO:**

*O médico olha diretamente nos seus olhos.*

**"TODOS OS DIAS você deve fazer check-in aqui. Relatar o que completou. Sem desculpas, sem exceções."**

🔥 **"Se você falhar por mais de 24h, sua dívida AUMENTA. Se você completar tudo consistentemente, ganha badges de recuperação."**

⚕️ **"Quando zerar sua dívida, você recebe ALTA MÉDICA e a badge 'Curado da Autossabotagem'."**

---

*Dr. Desculpas estende a receita médica.*

**"O tratamento começa AGORA. Primeiro check-in deve ser amanhã. Sem exceções."**

*O som dos monitores ecoa na sala...*

**"Você vai se curar da autossabotagem ou vai continuar sendo um paciente crônico?"**
      `);
      setIsAnalyzing(false);
      setShowCheckIn(true);
    }, 4000);
  };

  const handleActionComplete = (actionId: string) => {
    const isRecovered = completeAction(actionId);
    if (isRecovered) {
      setCheckInMessage("🏥 ALTA MÉDICA CONCEDIDA! Você zerou sua dívida de autossabotagem!");
    }
  };

  const handleDailyCheckIn = () => {
    const newBadges = performDailyCheckIn();
    setCheckInMessage(`✅ Check-in realizado! ${newBadges.length > 0 ? `Novas badges: ${newBadges.map(b => b.name).join(', ')}` : ''}`);
  };

  const getProgressPercentage = () => {
    if (progress.debtPoints === 0) return 100;
    const totalDebt = progress.testsCompleted
      .filter(t => t.debtPointsGenerated)
      .reduce((sum, t) => sum + (t.debtPointsGenerated || 0), 0);
    return totalDebt > 0 ? ((totalDebt - progress.debtPoints) / totalDebt) * 100 : 0;
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-b from-dark-bg to-dark-bg/90">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-warm-yellow/5 blur-3xl rounded-full"></div>
          <Badge className="bg-red-600 text-white font-bebas mb-4 relative z-10 animate-pulse">
            {progress.isInTreatment ? "EM TRATAMENTO MÉDICO" : "AUTÓPSIA PROFISSIONAL"}
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bebas text-warm-gray mb-6 tracking-wider relative z-10">
            SEM<span className="text-warm-yellow">DESCULPAS</span>IA
          </h1>
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-xl text-warm-gray/80 font-inter mb-4 italic">
              "Uma sala médica fria. Dr. Desculpas ajusta o estetoscópio e analisa os sintomas da sua autossabotagem profissional..."
            </p>
            <p className="text-lg text-warm-gray/60 font-inter">
              <strong className="text-warm-yellow">"Pronto para o diagnóstico da sua disfunção profissional?"</strong>
            </p>
          </div>
        </div>

        {/* Treatment Status */}
        {progress.isInTreatment && (
          <Card className="bg-red-600/10 border-red-600/30 mb-8">
            <CardHeader>
              <CardTitle className="text-red-400 font-bebas flex items-center space-x-2">
                <AlertTriangle size={24} />
                <span>PACIENTE EM TRATAMENTO</span>
              </CardTitle>
              <CardDescription className="text-warm-gray/80">
                Dívida atual: {progress.debtPoints} pontos | Progresso para alta médica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={getProgressPercentage()} className="mb-4" />
              <div className="flex justify-between text-sm text-warm-gray/60">
                <span>Dívida de Autossabotagem</span>
                <span>{progress.debtPoints === 0 ? "CURADO! 🏥" : `${progress.debtPoints} pontos restantes`}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Check-in Section */}
        {(showCheckIn || progress.isInTreatment) && (
          <Card className="bg-dark-card border-dark-border mb-8">
            <CardHeader>
              <CardTitle className="text-warm-yellow font-bebas flex items-center space-x-2">
                <Calendar size={24} />
                <span>CHECK-IN DIÁRIO</span>
              </CardTitle>
              <CardDescription className="text-warm-gray/70">
                {progress.checkInStreak > 0 ? `Sequência: ${progress.checkInStreak} dias` : "Faça seu primeiro check-in"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {checkInMessage && (
                <Alert className="bg-green-600/10 border-green-600/30">
                  <AlertDescription className="text-green-400">{checkInMessage}</AlertDescription>
                </Alert>
              )}
              
              <Button 
                onClick={handleDailyCheckIn}
                className="w-full bg-green-600 hover:bg-green-700 font-bebas tracking-wider"
              >
                ✅ FAZER CHECK-IN DIÁRIO
              </Button>

              {/* Pending Actions */}
              {pendingActions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-bebas text-warm-gray text-lg">AÇÕES PENDENTES:</h3>
                  {pendingActions.map((action) => (
                    <div key={action.id} className="flex items-center justify-between bg-dark-bg/50 p-3 rounded border border-dark-border">
                      <div className="flex-1">
                        <p className="text-warm-gray font-inter text-sm">{action.description}</p>
                        <Badge className="bg-warm-yellow text-dark-bg text-xs mt-1">+{action.points} pontos</Badge>
                      </div>
                      <Button
                        onClick={() => handleActionComplete(action.id)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 ml-4"
                      >
                        <CheckCircle size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Completed Today */}
              {completedToday.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-bebas text-green-400 text-lg">COMPLETADO HOJE:</h3>
                  {completedToday.map((action) => (
                    <div key={action.id} className="flex items-center space-x-2 text-green-400 text-sm">
                      <CheckCircle size={16} />
                      <span>{action.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Main Interface */}
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
                "Dr. Desculpas pega sua prancheta médica. 'Liste seus sintomas de autossabotagem profissional. Todos. Sem exceção.'"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!progress.isInTreatment ? (
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
                    onClick={handleSubmit}
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

          {/* Results Section */}
          <Card className="bg-dark-card border-dark-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600/50 to-transparent"></div>
            <CardHeader>
              <CardTitle className="text-2xl font-bebas text-warm-yellow flex items-center space-x-2">
                <span>📊</span>
                <span>LAUDO MÉDICO</span>
              </CardTitle>
              <CardDescription className="text-warm-gray/70 font-inter italic">
                {analysis ? 
                  "Dr. Desculpas termina o diagnóstico e remove as luvas. 'O laudo está pronto.'" : 
                  "O laboratório médico aguarda seus sintomas de autossabotagem..."
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-red-600/20"></div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-red-400 font-inter animate-pulse">
                      🔬 <em>"Analisando padrões de autossabotagem..."</em>
                    </p>
                    <p className="text-warm-gray/60 font-inter text-sm">
                      Dr. Desculpas examina cada sintoma meticulosamente
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
                    <div className="bg-red-600/10 p-4 rounded border border-red-600/30">
                      <p className="text-red-400 font-inter text-sm font-medium text-center">
                        🏥 "Diagnóstico completo. Seu tratamento está ativo. Check-in diário obrigatório."
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="text-6xl mb-4">🩺</div>
                  <p className="text-warm-gray/60 font-inter italic">
                    "Dr. Desculpas aguarda pacientemente seus sintomas de autossabotagem profissional. 
                    Apenas então o diagnóstico médico poderá começar..."
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Warning */}
        <Alert className="bg-red-600/10 border-red-600/30 mt-8">
          <AlertDescription className="text-warm-gray font-inter">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <strong className="text-red-400">Aviso Médico:</strong>
                <p className="mt-1">
                  "Este não é coaching motivacional. É tratamento médico para autossabotagem crônica. 
                  Falhas no tratamento resultam em agravamento do quadro."
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default CareerTruthAI;
