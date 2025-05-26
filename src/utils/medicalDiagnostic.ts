
import { MedicalDiagnosis, MedicalTestResult } from '@/types/medical';
import { TestResult } from '@/types/user';

export const generateMedicalDiagnosis = (
  userInput: string, 
  testNumber: number, 
  previousTests: TestResult[] = []
): MedicalDiagnosis => {
  // Calculate base score with some randomness
  const baseScore = Math.floor(Math.random() * 30) + 35; // 35-65 base
  
  // Improvement bonus for subsequent tests
  const improvementBonus = Math.min(testNumber * 5, 25); // Max 25 points improvement
  
  // Calculate previous average if exists
  const previousAverage = previousTests.length > 0 
    ? previousTests.reduce((sum, test) => sum + (test.overallScore || 50), 0) / previousTests.length
    : 50;
  
  // Trend-based adjustment
  const trendAdjustment = testNumber > 1 ? Math.floor(Math.random() * 21) - 10 : 0; // -10 to +10
  
  const overallScore = Math.min(100, Math.max(0, baseScore + improvementBonus + trendAdjustment));
  
  // Determine severity based on score
  let severity: MedicalDiagnosis['severity'];
  if (overallScore >= 80) severity = 'mild';
  else if (overallScore >= 60) severity = 'moderate';
  else if (overallScore >= 40) severity = 'severe';
  else severity = 'critical';
  
  // Generate areas based on input and score
  const commonImprovementAreas = [
    'Procrastinação crônica',
    'Autossabotagem profissional',
    'Síndrome do impostor',
    'Perfeccionismo paralisante',
    'Falta de autoconfiança',
    'Desorganização temporal',
    'Evitação de conflitos',
    'Autocobrança excessiva'
  ];
  
  const commonStrengths = [
    'Autoconsciência',
    'Disposição para mudança',
    'Honestidade nos relatos',
    'Capacidade de reflexão',
    'Inteligência emocional',
    'Resiliência',
    'Determinação',
    'Abertura a feedback'
  ];
  
  // Select random areas (2-4 improvement areas, 1-3 strengths)
  const improvementAreas = commonImprovementAreas
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3) + 2);
  
  const strengths = commonStrengths
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3) + 1);
  
  // Generate personalized recommendations
  const recommendations = [
    'Implementar técnica Pomodoro para gestão de tempo',
    'Praticar autocompaixão em situações de erro',
    'Estabelecer metas menores e mais específicas',
    'Criar sistema de recompensas por progresso',
    'Desenvolver ritual matinal de planejamento',
    'Praticar exercícios de mindfulness 10min/dia'
  ].sort(() => 0.5 - Math.random()).slice(0, 3);
  
  const detailedAnalysis = generateDetailedAnalysis(overallScore, testNumber, severity, previousAverage);
  
  return {
    overallScore,
    improvementAreas,
    strengths,
    detailedAnalysis,
    recommendations,
    severity
  };
};

const generateDetailedAnalysis = (
  score: number, 
  testNumber: number, 
  severity: string, 
  previousAverage: number
): string => {
  const isImproving = testNumber > 1 && score > previousAverage;
  const improvement = testNumber > 1 ? Math.round(score - previousAverage) : 0;
  
  let analysis = `<strong>RELATÓRIO MÉDICO - CONSULTA #${testNumber}</strong>\n\n`;
  
  if (testNumber === 1) {
    analysis += `🏥 <strong>PRIMEIRA CONSULTA</strong>\n`;
    analysis += `Score Diagnóstico: ${score}/100 (${severity.toUpperCase()})\n\n`;
    analysis += `<em>Dr. Desculpas ajusta os óculos e analisa o caso inicial...</em>\n\n`;
    analysis += `"Paciente, este é seu diagnóstico inicial. `;
    
    if (score >= 70) {
      analysis += `Surpreendentemente, você não está em estado crítico. Mas não se iluda - ainda há muito trabalho pela frente."`;
    } else if (score >= 50) {
      analysis += `Estamos lidando com um caso moderado de autossabotagem. Tratável, mas requer disciplina."`;
    } else {
      analysis += `Temos um paciente em estado grave. Autossabotagem em nível avançado. Tratamento intensivo necessário."`;
    }
  } else {
    analysis += `🔄 <strong>CONSULTA DE RETORNO #${testNumber}</strong>\n`;
    analysis += `Score Atual: ${score}/100 | Score Anterior: ${Math.round(previousAverage)}/100\n`;
    
    if (isImproving) {
      analysis += `📈 <strong style="color: green;">EVOLUÇÃO POSITIVA: +${improvement} pontos</strong>\n\n`;
      analysis += `<em>Dr. Desculpas sorri levemente...</em>\n\n`;
      analysis += `"Interessante... O paciente está respondendo ao tratamento. `;
      
      if (improvement >= 15) {
        analysis += `Uma melhoria impressionante. Continue assim e logo terá alta médica."`;
      } else {
        analysis += `Progresso moderado, mas progresso mesmo assim. Não afrouxe agora."`;
      }
    } else {
      analysis += `📉 <strong style="color: red;">REGRESSÃO: ${improvement} pontos</strong>\n\n`;
      analysis += `<em>Dr. Desculpas franze o cenho com preocupação...</em>\n\n`;
      analysis += `"Hmm... Temos uma recaída aqui. O paciente regrediu. Isso é normal no processo, mas preocupante."`;
    }
  }
  
  return analysis;
};

export const calculateEvolutionTrend = (tests: TestResult[]): 'improving' | 'stable' | 'declining' => {
  if (tests.length < 2) return 'stable';
  
  const recentTests = tests.slice(-3); // Last 3 tests
  const scores = recentTests.map(t => t.overallScore || 50);
  
  const firstScore = scores[0];
  const lastScore = scores[scores.length - 1];
  const difference = lastScore - firstScore;
  
  if (difference > 10) return 'improving';
  if (difference < -10) return 'declining';
  return 'stable';
};

export const shouldScheduleNextTest = (testNumber: number): Date | null => {
  if (testNumber >= 5) return null; // Blocked after 5 tests
  
  const weeksToAdd = testNumber; // 1 week, 2 weeks, 3 weeks, 4 weeks
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + (weeksToAdd * 7));
  
  return nextDate;
};

export const getSubornOptions = () => [
  {
    id: 'small-bribe',
    amount: 50,
    currency: 'BRL' as const,
    description: 'Suborno Básico - "Um cafezinho para o doutor"',
    unlocks: 3
  },
  {
    id: 'medium-bribe',
    amount: 100,
    currency: 'BRL' as const,
    description: 'Suborno Padrão - "Uma consulta particular"',
    unlocks: 5
  },
  {
    id: 'premium-bribe',
    amount: 200,
    currency: 'BRL' as const,
    description: 'Suborno Premium - "Tratamento VIP"',
    unlocks: 10
  }
];
