
export interface InputAnalysis {
  keywords: string[];
  problemAreas: string[];
  severityScore: number;
  honestyLevel: number;
  sentimentScore: number;
  specificIssues: string[];
  emotionalState: string;
  selfAwarenessLevel: number;
}

export const analyzeUserInput = (input: string): InputAnalysis => {
  const lowerInput = input.toLowerCase();
  
  // Keywords mapping para diferentes categorias
  const problemKeywords = {
    procrastination: ['procrastino', 'adio', 'deixo para depois', 'empurro', 'enrolo', 'postergo'],
    perfectionism: ['perfeito', 'perfeccionismo', 'nunca está bom', 'refaço', 'nunca termino'],
    impostor: ['não mereço', 'sorte', 'fake', 'impostor', 'não sei nada', 'vão descobrir'],
    communication: ['reunião', 'falar', 'apresentar', 'não falo', 'fico quieto', 'voz trava'],
    confidence: ['confiança', 'inseguro', 'medo', 'receio', 'ansioso', 'nervoso'],
    organization: ['desorganizado', 'bagunça', 'perco prazo', 'esqueço', 'caos'],
    conflict: ['conflito', 'evito', 'confronto', 'não consigo dizer não', 'engulo'],
    selfCriticism: ['me cobro', 'autocrítica', 'me julgo', 'sou muito duro', 'perfeccionista']
  };

  // Intensidade de palavras
  const intensityWords = {
    high: ['sempre', 'nunca', 'completamente', 'totalmente', 'extremamente', 'muito', 'demais'],
    medium: ['às vezes', 'frequentemente', 'geralmente', 'costuma', 'meio'],
    low: ['raramente', 'pouco', 'levemente', 'um pouco']
  };

  // Honestidade indicators
  const honestyIndicators = {
    high: ['confesso', 'admito', 'reconheço', 'sei que', 'tenho problema', 'preciso mudar'],
    medium: ['acho que', 'talvez', 'pode ser que', 'às vezes sinto'],
    low: ['não é bem assim', 'mas', 'justifica', 'porque', 'culpa']
  };

  // Análise de keywords
  const keywords: string[] = [];
  const problemAreas: string[] = [];
  
  Object.entries(problemKeywords).forEach(([area, words]) => {
    words.forEach(word => {
      if (lowerInput.includes(word)) {
        keywords.push(word);
        if (!problemAreas.includes(area)) {
          problemAreas.push(area);
        }
      }
    });
  });

  // Cálculo do severity score baseado no conteúdo
  let severityScore = 50; // Base
  
  // Aumenta se menciona problemas múltiplos
  severityScore += problemAreas.length * 8;
  
  // Aumenta com palavras de alta intensidade
  intensityWords.high.forEach(word => {
    if (lowerInput.includes(word)) severityScore += 10;
  });
  
  // Diminui com palavras de baixa intensidade
  intensityWords.low.forEach(word => {
    if (lowerInput.includes(word)) severityScore -= 5;
  });

  // Ajusta pela extensão da confissão (mais detalhes = mais problemas)
  if (input.length > 300) severityScore += 15;
  if (input.length > 500) severityScore += 10;

  severityScore = Math.min(100, Math.max(0, severityScore));

  // Cálculo do honesty level
  let honestyLevel = 50;
  
  honestyIndicators.high.forEach(indicator => {
    if (lowerInput.includes(indicator)) honestyLevel += 15;
  });
  
  honestyIndicators.medium.forEach(indicator => {
    if (lowerInput.includes(indicator)) honestyLevel += 8;
  });
  
  honestyIndicators.low.forEach(indicator => {
    if (lowerInput.includes(indicator)) honestyLevel -= 10;
  });

  honestyLevel = Math.min(100, Math.max(0, honestyLevel));

  // Análise de sentimentos
  const negativeWords = ['ruim', 'péssimo', 'horrível', 'odeio', 'detesto', 'fracasso', 'burro', 'idiota'];
  const positiveWords = ['quero mudar', 'vou melhorar', 'posso', 'conseguir', 'determinado'];
  
  let sentimentScore = 50;
  negativeWords.forEach(word => {
    if (lowerInput.includes(word)) sentimentScore -= 8;
  });
  positiveWords.forEach(word => {
    if (lowerInput.includes(word)) sentimentScore += 10;
  });

  sentimentScore = Math.min(100, Math.max(0, sentimentScore));

  // Issues específicas mencionadas
  const specificIssues: string[] = [];
  
  if (lowerInput.includes('reunião') || lowerInput.includes('apresentação')) {
    specificIssues.push('Dificuldade em reuniões e apresentações');
  }
  if (lowerInput.includes('prazo') || lowerInput.includes('deadline')) {
    specificIssues.push('Problemas com gestão de prazos');
  }
  if (lowerInput.includes('chefe') || lowerInput.includes('superior')) {
    specificIssues.push('Dificuldades hierárquicas');
  }
  if (lowerInput.includes('projeto') && lowerInput.includes('não')) {
    specificIssues.push('Sabotagem de projetos importantes');
  }

  // Estado emocional
  let emotionalState = 'neutro';
  if (sentimentScore > 70) emotionalState = 'motivado';
  else if (sentimentScore < 30) emotionalState = 'desesperançoso';
  else if (honestyLevel > 80) emotionalState = 'autocrítico construtivo';
  else if (honestyLevel < 40) emotionalState = 'defensivo';

  // Self-awareness level
  const selfAwarenessLevel = Math.round((honestyLevel + (problemAreas.length * 10)) / 2);

  return {
    keywords,
    problemAreas,
    severityScore,
    honestyLevel,
    sentimentScore,
    specificIssues,
    emotionalState,
    selfAwarenessLevel: Math.min(100, selfAwarenessLevel)
  };
};

export const generatePersonalizedInsights = (input: string, analysis: InputAnalysis): string[] => {
  const insights: string[] = [];
  
  // Insights baseados nas áreas problema identificadas
  if (analysis.problemAreas.includes('procrastination')) {
    insights.push('Padrão de procrastinação identificado nos relatos');
  }
  if (analysis.problemAreas.includes('perfectionism')) {
    insights.push('Perfeccionismo como mecanismo de autossabotagem detectado');
  }
  if (analysis.problemAreas.includes('impostor')) {
    insights.push('Síndrome do impostor presente no discurso');
  }
  if (analysis.problemAreas.includes('communication')) {
    insights.push('Bloqueios de comunicação profissional identificados');
  }
  
  // Insights baseados na honestidade
  if (analysis.honestyLevel > 80) {
    insights.push('Alto nível de autoconsciência demonstrado');
  } else if (analysis.honestyLevel < 40) {
    insights.push('Resistência à autoavaliação honesta detectada');
  }
  
  // Insights baseados na severidade
  if (analysis.severityScore > 80) {
    insights.push('Múltiplos padrões autodestrutivos simultâneos');
  }
  
  return insights.slice(0, 4); // Máximo 4 insights
};
