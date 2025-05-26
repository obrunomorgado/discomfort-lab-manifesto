
import { UserProgress, TestResult } from "@/types/user";
import { generateMedicalDiagnosis, shouldScheduleNextTest } from "@/utils/medicalDiagnostic";
import { generateDailyActions } from "@/utils/careerTruthActions";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const handleSubmit = async (
  userInput: string,
  isEmergencyMode: boolean,
  progress: UserProgress,
  getTestCost: (testId: string) => number,
  spendCredits: (amount: number, testId: string, testName: string) => boolean,
  addTestResult: (result: TestResult) => void,
  setIsAnalyzing: (analyzing: boolean) => void,
  setAnalysis: (analysis: string) => void,
  setIsEmergencyMode: (mode: boolean) => void,
  setCheckInMessage: (message: string) => void
) => {
  if (!userInput.trim()) return;
  
  const { medicalProgress } = progress;
  
  // Se não está em modo emergência, verificar bloqueios normais
  if (!isEmergencyMode && medicalProgress.isBlocked) {
    setCheckInMessage("❌ Consultório fechado! Use consulta de emergência ou suborno para continuar.");
    return;
  }
  
  const testCost = isEmergencyMode ? 0 : getTestCost('career-truth-ai'); // Emergência já foi paga
  
  if (!isEmergencyMode && progress.credits < testCost) {
    console.log(`Créditos insuficientes. Necessário: ${testCost}, Disponível: ${progress.credits}`);
    return;
  }
  
  if (!isEmergencyMode) {
    const success = spendCredits(testCost, 'career-truth-ai', 'Sem Desculpas IA');
    if (!success) {
      console.log('Falha ao gastar créditos');
      return;
    }
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
      testId: isEmergencyMode ? 'career-truth-ai-emergency' : 'career-truth-ai',
      testName: isEmergencyMode ? 'Consulta de Emergência' : 'Sem Desculpas IA',
      completedAt: new Date(),
      keyInsights: [
        'Padrões de autossabotagem profissional identificados',
        'Comportamentos autodestrutivos mapeados',
        'Protocolo de recuperação ativado'
      ],
      honestyScore: Math.floor(Math.random() * 3) + 7,
      actionItems: dailyActions.map(action => action.description),
      pointsEarned: 300,
      creditsSpent: isEmergencyMode ? 10 : testCost,
      debtPointsGenerated: debtPoints,
      dailyActionsAssigned: dailyActions,
      overallScore: diagnosis.overallScore,
      diagnosis: diagnosis,
      testNumber: testNumber,
      nextScheduledDate: nextScheduledDate
    };

    addTestResult(testResult);

    const emergencyPrefix = isEmergencyMode ? "🚨 **CONSULTA DE EMERGÊNCIA CONCLUÍDA** 🚨\n\n" : "";
    
    const analysisText = `${emergencyPrefix}${diagnosis.detailedAnalysis}

---

📊 <strong>DADOS MÉDICOS DA CONSULTA ${isEmergencyMode ? '(EMERGÊNCIA)' : '#' + testNumber}</strong>

<strong>Score Diagnóstico:</strong> ${diagnosis.overallScore}/100
<strong>Gravidade:</strong> ${diagnosis.severity.toUpperCase()}
${isEmergencyMode ? '<strong>Tipo:</strong> EMERGÊNCIA (+10 créditos)' : ''}
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
    setIsEmergencyMode(false); // Reset emergency mode
  }, 4000);
};
