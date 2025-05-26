
import { InputAnalysis, analyzeUserInput, generatePersonalizedInsights } from './inputAnalyzer';
import { MedicalDiagnosis } from '@/types/medical';
import { TestResult } from '@/types/user';

export const generatePersonalizedDiagnosis = (
  userInput: string,
  testNumber: number,
  previousTests: TestResult[] = []
): MedicalDiagnosis => {
  const analysis = analyzeUserInput(userInput);
  
  // Use analysis para calcular score real
  let overallScore = analysis.severityScore;
  
  // Ajustar score baseado em testes anteriores (evolução real)
  if (previousTests.length > 0) {
    const previousAverage = previousTests.reduce((sum, test) => sum + (test.overallScore || 50), 0) / previousTests.length;
    const evolutionFactor = testNumber > 1 ? Math.floor(Math.random() * 21) - 10 : 0; // -10 to +10
    overallScore = Math.min(100, Math.max(0, (overallScore + previousAverage) / 2 + evolutionFactor));
  }
  
  // Determine severity baseado no score real
  let severity: MedicalDiagnosis['severity'];
  if (overallScore >= 80) severity = 'critical';
  else if (overallScore >= 60) severity = 'severe';
  else if (overallScore >= 40) severity = 'moderate';
  else severity = 'mild';
  
  // Áreas de melhoria baseadas na análise real
  const improvementAreas = generateImprovementAreas(analysis);
  const strengths = generateStrengths(analysis);
  const recommendations = generatePersonalizedRecommendations(analysis);
  const detailedAnalysis = generateDetailedPersonalizedAnalysis(userInput, analysis, overallScore, testNumber, previousTests);
  
  return {
    overallScore,
    improvementAreas,
    strengths,
    detailedAnalysis,
    recommendations,
    severity
  };
};

const generateImprovementAreas = (analysis: InputAnalysis): string[] => {
  const areas: string[] = [];
  
  const areaMapping = {
    procrastination: 'Procrastinação crônica',
    perfectionism: 'Perfeccionismo paralisante', 
    impostor: 'Síndrome do impostor',
    communication: 'Bloqueios de comunicação',
    confidence: 'Baixa autoconfiança',
    organization: 'Desorganização sistemática',
    conflict: 'Evitação de conflitos',
    selfCriticism: 'Autocrítica destrutiva'
  };
  
  analysis.problemAreas.forEach(area => {
    if (areaMapping[area as keyof typeof areaMapping]) {
      areas.push(areaMapping[area as keyof typeof areaMapping]);
    }
  });
  
  // Se não identificou áreas específicas, usar genéricas baseadas no score
  if (areas.length === 0) {
    if (analysis.severityScore > 70) {
      areas.push('Padrões de autossabotagem não especificados');
    }
    areas.push('Necessidade de maior autoconhecimento');
  }
  
  return areas.slice(0, 4);
};

const generateStrengths = (analysis: InputAnalysis): string[] => {
  const strengths: string[] = [];
  
  if (analysis.honestyLevel > 70) {
    strengths.push('Honestidade na autoavaliação');
  }
  if (analysis.selfAwarenessLevel > 60) {
    strengths.push('Consciência dos próprios padrões');
  }
  if (analysis.sentimentScore > 60) {
    strengths.push('Motivação para mudança');
  }
  if (analysis.specificIssues.length > 2) {
    strengths.push('Capacidade de identificar problemas específicos');
  }
  
  // Strengths padrão se não identificou nenhuma
  if (strengths.length === 0) {
    strengths.push('Busca por autodesenvolvimento');
  }
  
  return strengths.slice(0, 3);
};

const generatePersonalizedRecommendations = (analysis: InputAnalysis): string[] => {
  const recommendations: string[] = [];
  
  if (analysis.problemAreas.includes('procrastination')) {
    recommendations.push('Implementar técnica Pomodoro para tarefas que você adia');
  }
  if (analysis.problemAreas.includes('perfectionism')) {
    recommendations.push('Estabelecer critério "bom o suficiente" para projetos');
  }
  if (analysis.problemAreas.includes('communication')) {
    recommendations.push('Praticar uma fala por reunião, mesmo que pequena');
  }
  if (analysis.problemAreas.includes('confidence')) {
    recommendations.push('Documentar conquistas diárias para combater insegurança');
  }
  
  // Recomendações baseadas no estado emocional
  if (analysis.emotionalState === 'desesperançoso') {
    recommendations.push('Começar com micro-ações de 5 minutos diários');
  }
  
  // Recomendações padrão
  if (recommendations.length === 0) {
    recommendations.push('Desenvolver ritual de autorreflexão diária');
  }
  
  return recommendations.slice(0, 3);
};

const generateDetailedPersonalizedAnalysis = (
  userInput: string,
  analysis: InputAnalysis,
  overallScore: number,
  testNumber: number,
  previousTests: TestResult[]
): string => {
  const isImproving = testNumber > 1 && previousTests.length > 0 && 
    overallScore < (previousTests[previousTests.length - 1].overallScore || 50);
  
  let analysisText = `<strong>ANÁLISE PERSONALIZADA - CONSULTA #${testNumber}</strong>\n\n`;
  
  // Mencionar elementos específicos da confissão
  const confessionSnippet = userInput.length > 100 ? userInput.substring(0, 100) + "..." : userInput;
  
  analysisText += `📝 <strong>CONFISSÃO ANALISADA:</strong>\n"${confessionSnippet}"\n\n`;
  
  // Análise dos padrões identificados
  analysisText += `🔍 <strong>PADRÕES IDENTIFICADOS:</strong>\n`;
  if (analysis.specificIssues.length > 0) {
    analysis.specificIssues.forEach(issue => {
      analysisText += `• ${issue}\n`;
    });
  } else {
    analysisText += `• Padrões de autossabotagem detectados no relato\n`;
  }
  
  analysisText += `\n📊 <strong>MÉTRICAS DE ANÁLISE:</strong>\n`;
  analysisText += `• Nível de Honestidade: ${analysis.honestyLevel}/100\n`;
  analysisText += `• Autoconsciência: ${analysis.selfAwarenessLevel}/100\n`;
  analysisText += `• Estado Emocional: ${analysis.emotionalState}\n`;
  
  if (testNumber > 1 && previousTests.length > 0) {
    const previousScore = previousTests[previousTests.length - 1].overallScore || 50;
    const improvement = overallScore - previousScore;
    
    analysisText += `\n📈 <strong>EVOLUÇÃO:</strong>\n`;
    if (improvement > 0) {
      analysisText += `✅ Melhoria de ${improvement.toFixed(1)} pontos desde a última consulta\n`;
    } else if (improvement < 0) {
      analysisText += `⚠️ Regressão de ${Math.abs(improvement).toFixed(1)} pontos desde a última consulta\n`;
    } else {
      analysisText += `➡️ Estabilidade nos padrões identificados\n`;
    }
  }
  
  analysisText += `\n💊 <strong>DIAGNÓSTICO DR. DESCULPAS:</strong>\n`;
  analysisText += `"Paciente, analisei cada palavra da sua confissão. `;
  
  if (analysis.honestyLevel > 80) {
    analysisText += `Sua honestidade é admirável - isso acelera o tratamento. `;
  } else if (analysis.honestyLevel < 40) {
    analysisText += `Detectei resistência na sua confissão. Ainda está se escondendo atrás de justificativas. `;
  }
  
  if (analysis.problemAreas.length > 3) {
    analysisText += `Múltiplos padrões de autossabotagem simultâneos - caso complexo que exige disciplina rigorosa."`;
  } else if (analysis.problemAreas.length > 0) {
    analysisText += `Os padrões de ${analysis.problemAreas.join(', ')} estão claramente presentes no seu relato."`;
  } else {
    analysisText += `Preciso de mais especificidade nas próximas confissões para diagnóstico preciso."`;
  }
  
  return analysisText;
};
