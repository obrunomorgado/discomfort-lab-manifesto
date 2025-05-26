import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useCredits } from "@/hooks/useCredits";
import { DailyAction, TestResult } from "@/types/user";
import { generateMedicalDiagnosis, shouldScheduleNextTest } from "@/utils/medicalDiagnostic";
import { subornDoctor } from "@/hooks/useUserProgress/tests";
import Header from "@/components/CareerTruthAI/Header";
import TreatmentStatus from "@/components/CareerTruthAI/TreatmentStatus";
import CheckInSection from "@/components/CareerTruthAI/CheckInSection";
import ConfessionForm from "@/components/CareerTruthAI/ConfessionForm";
import DiagnosisResults from "@/components/CareerTruthAI/DiagnosisResults";
import CalendarSync from "@/components/CareerTruthAI/CalendarSync";
import MedicalHistory from "@/components/CareerTruthAI/MedicalHistory";
import SubornModal from "@/components/CareerTruthAI/SubornModal";
import { FileText, Calendar, DollarSign, Lock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const CareerTruthAI = () => {
  const [userInput, setUserInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [checkInMessage, setCheckInMessage] = useState("");
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [showSubornModal, setShowSubornModal] = useState(false);
  
  const { progress, addTestResult, completeAction, performDailyCheckIn, getPendingActions, getCompletedActionsToday, spendCredits, saveProgress } = useUserProgress();
  const { getTestCost } = useCredits();
  
  const pendingActions = getPendingActions();
  const completedToday = getCompletedActionsToday();
  const { medicalProgress } = progress;

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
    
    // Check if blocked
    if (medicalProgress.isBlocked) {
      setCheckInMessage("❌ Consultório fechado! Você completou seus 5 testes. Use o suborno para continuar.");
      return;
    }
    
    const testCost = getTestCost('career-truth-ai');
    
    // Verificar se tem créditos suficientes
    if (progress.credits < testCost) {
      console.log(`Créditos insuficientes. Necessário: ${testCost}, Disponível: ${progress.credits}`);
      return;
    }
    
    // Gastar créditos antes de começar o teste
    const success = spendCredits(testCost, 'career-truth-ai', 'Sem Desculpas IA');
    if (!success) {
      console.log('Falha ao gastar créditos');
      return;
    }
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const debtPoints = Math.floor(Math.random() * 201) + 150; // 150-350 pontos negativos
      const dailyActions = generateDailyActions();
      const testNumber = medicalProgress.currentTestNumber + 1;
      
      // Generate medical diagnosis
      const careerTests = progress.testsCompleted.filter(t => t.testId === 'career-truth-ai');
      const diagnosis = generateMedicalDiagnosis(userInput, testNumber, careerTests);
      const nextScheduledDate = shouldScheduleNextTest(testNumber);
      
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
        creditsSpent: testCost,
        debtPointsGenerated: debtPoints,
        dailyActionsAssigned: dailyActions,
        overallScore: diagnosis.overallScore,
        diagnosis: diagnosis,
        testNumber: testNumber,
        nextScheduledDate: nextScheduledDate
      };

      addTestResult(testResult);

      // Generate enhanced analysis with medical data
      const analysisText = `${diagnosis.detailedAnalysis}

---

📊 <strong>DADOS MÉDICOS DA CONSULTA #${testNumber}</strong>

<strong>Score Diagnóstico:</strong> ${diagnosis.overallScore}/100
<strong>Gravidade:</strong> ${diagnosis.severity.toUpperCase()}
<strong>Próxima Consulta:</strong> ${nextScheduledDate ? format(nextScheduledDate, 'dd/MM/yyyy', { locale: ptBR }) : 'BLOQUEADO APÓS 5 CONSULTAS'}

---

💊 <strong>ÁREAS PARA MELHORIA:</strong>
${diagnosis.improvementAreas.map(area => `• ${area}`).join('\n')}

🏆 <strong>PONTOS FORTES IDENTIFICADOS:</strong>
${diagnosis.strengths.map(strength => `• ${strength}`).join('\n')}

📋 <strong>RECOMENDAÇÕES MÉDICAS:</strong>
${diagnosis.recommendations.map(rec => `• ${rec}`).join('\n')}

---

⚡ <strong>PROTOCOLO DE REABILITAÇÃO ATIVADO:</strong>

${dailyActions.map((action, index) => 
  `<strong>${index + 1}.</strong> ${action.description} <em>(+${action.points} pontos)</em>`
).join('\n')}

---

💊 <strong>INSTRUÇÕES DE TRATAMENTO:</strong>

<strong>"TODOS OS DIAS você deve fazer check-in aqui. Relatar o que completou. Sem desculpas, sem exceções."</strong>

${testNumber >= 5 ? 
  `🚨 <strong>"ATENÇÃO: Esta foi sua 5ª e ÚLTIMA consulta gratuita. Consultório oficialmente FECHADO para seu caso. Se deseja continuar o tratamento... bem, temos algumas opções especiais."</strong>` :
  `🔥 <strong>"Se você falhar por mais de 24h, sua dívida AUMENTA. Complete tudo consistentemente para ganhar badges de recuperação."</strong>`
}

${testNumber < 5 ? `⚕️ <strong>"Retorno agendado para ${format(nextScheduledDate!, 'dd/MM/yyyy', { locale: ptBR })}. Não falte."</strong>` : ''}
      `;

      setAnalysis(analysisText);
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

  const handleSuborn = (subornOption: any) => {
    const result = subornDoctor(progress, subornOption);
    if (result.success) {
      saveProgress(result.newProgress);
      setCheckInMessage(`💰 Suborno aceito! Dr. Desculpas sussurra: "Nosso segredinho..." - ${subornOption.unlocks} novas consultas liberadas.`);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-b from-dark-bg to-dark-bg/90">
      <div className="max-w-4xl mx-auto">
        <Header isInTreatment={progress.isInTreatment} />
        
        {/* Medical Status Bar */}
        <div className="bg-dark-card/50 border border-warm-yellow/20 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Badge className="bg-warm-yellow/20 text-warm-yellow font-bebas">
                CONSULTA {medicalProgress.currentTestNumber + 1}/5
              </Badge>
              <div className="text-sm text-warm-gray/70">
                Score Médio: <span className="text-warm-yellow font-bebas">{Math.round(medicalProgress.averageScore)}/100</span>
              </div>
              <div className="text-sm text-warm-gray/70">
                Tendência: <span className={`font-bebas ${
                  medicalProgress.evolutionTrend === 'improving' ? 'text-green-400' :
                  medicalProgress.evolutionTrend === 'declining' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {medicalProgress.evolutionTrend === 'improving' ? 'MELHORANDO' :
                   medicalProgress.evolutionTrend === 'declining' ? 'PIORANDO' : 'ESTÁVEL'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setShowMedicalHistory(true)}
                variant="outline"
                size="sm"
                className="border-warm-yellow/50 text-warm-yellow hover:bg-warm-yellow/20 font-bebas"
              >
                <FileText size={16} className="mr-2" />
                PRONTUÁRIO
              </Button>
              
              {medicalProgress.nextAppointment && !medicalProgress.isBlocked && (
                <div className="flex items-center space-x-2 text-sm text-warm-gray/70">
                  <Calendar size={16} className="text-warm-yellow" />
                  <span>Próxima: {format(medicalProgress.nextAppointment, 'dd/MM', { locale: ptBR })}</span>
                </div>
              )}
              
              {medicalProgress.isBlocked && medicalProgress.canSuborn && (
                <Button
                  onClick={() => setShowSubornModal(true)}
                  size="sm"
                  className="bg-red-600/20 border border-red-500/50 text-red-400 hover:bg-red-600/30 font-bebas"
                >
                  <DollarSign size={16} className="mr-2" />
                  SUBORNO
                </Button>
              )}
              
              {medicalProgress.isBlocked && !medicalProgress.canSuborn && (
                <Badge className="bg-green-600/20 text-green-400 font-bebas">
                  <Lock size={16} className="mr-2" />
                  CURADO
                </Badge>
              )}
            </div>
          </div>
        </div>
        
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

        <CalendarSync progress={progress} pendingActions={pendingActions} />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
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
                  Falhas no tratamento resultam em agravamento do quadro. 
                  {medicalProgress.isBlocked && ' Sistema bloqueado após 5 consultas - opções de suborno disponíveis.'}"
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Modals */}
        <MedicalHistory
          progress={progress}
          isOpen={showMedicalHistory}
          onClose={() => setShowMedicalHistory(false)}
        />

        <SubornModal
          isOpen={showSubornModal}
          onClose={() => setShowSubornModal(false)}
          onSuborn={handleSuborn}
          subornsUsed={medicalProgress.subornsUsed}
        />
      </div>
    </div>
  );
};

export default CareerTruthAI;
