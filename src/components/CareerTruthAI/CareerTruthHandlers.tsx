
import { useState } from "react";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useCredits } from "@/hooks/useCredits";
import { DailyAction, TestResult } from "@/types/user";
import { generateMedicalDiagnosis, shouldScheduleNextTest } from "@/utils/medicalDiagnostic";
import { subornDoctor } from "@/hooks/useUserProgress/tests";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const useCareerTruthHandlers = () => {
  const [userInput, setUserInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [checkInMessage, setCheckInMessage] = useState("");
  
  const { progress, addTestResult, completeAction, performDailyCheckIn, getPendingActions, getCompletedActionsToday, spendCredits, saveProgress } = useUserProgress();
  const { getTestCost } = useCredits();
  
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

    return baseActions.slice(0, 3 + Math.floor(Math.random() * 3));
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    
    if (medicalProgress.isBlocked) {
      setCheckInMessage("❌ Consultório fechado! Você completou seus 5 testes. Use o suborno para continuar.");
      return;
    }
    
    const testCost = getTestCost('career-truth-ai');
    
    if (progress.credits < testCost) {
      console.log(`Créditos insuficientes. Necessário: ${testCost}, Disponível: ${progress.credits}`);
      return;
    }
    
    const success = spendCredits(testCost, 'career-truth-ai', 'Sem Desculpas IA');
    if (!success) {
      console.log('Falha ao gastar créditos');
      return;
    }
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const debtPoints = Math.floor(Math.random() * 201) + 150;
      const dailyActions = generateDailyActions();
      const testNumber = medicalProgress.currentTestNumber + 1;
      
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
        honestyScore: Math.floor(Math.random() * 3) + 7,
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

  return {
    userInput,
    setUserInput,
    isAnalyzing,
    analysis,
    checkInMessage,
    handleSubmit,
    handleActionComplete,
    handleDailyCheckIn,
    handleSuborn,
    pendingActions: getPendingActions(),
    completedToday: getCompletedActionsToday()
  };
};
