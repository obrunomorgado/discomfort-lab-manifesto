
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUserProgress } from "@/hooks/useUserProgress";
import { DailyAction, TestResult } from "@/types/user";
import Header from "@/components/CareerTruthAI/Header";
import TreatmentStatus from "@/components/CareerTruthAI/TreatmentStatus";
import CheckInSection from "@/components/CareerTruthAI/CheckInSection";
import ConfessionForm from "@/components/CareerTruthAI/ConfessionForm";
import DiagnosisResults from "@/components/CareerTruthAI/DiagnosisResults";

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

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-b from-dark-bg to-dark-bg/90">
      <div className="max-w-4xl mx-auto">
        <Header isInTreatment={progress.isInTreatment} />
        
        <TreatmentStatus progress={progress} />
        
        <CheckInSection
          showCheckIn={showCheckIn}
          progress={progress}
          checkInMessage={checkInMessage}
          pendingActions={pendingActions}
          completedToday={completedToday}
          onDailyCheckIn={handleDailyCheckIn}
          onActionComplete={handleActionComplete}
        />

        <div className="grid lg:grid-cols-2 gap-8">
          <ConfessionForm
            userInput={userInput}
            setUserInput={setUserInput}
            isAnalyzing={isAnalyzing}
            isInTreatment={progress.isInTreatment}
            onSubmit={handleSubmit}
          />

          <DiagnosisResults
            isAnalyzing={isAnalyzing}
            analysis={analysis}
          />
        </div>

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
