
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
  
  // Keywords mapping expandidos para português informal brasileiro
  const problemKeywords = {
    procrastination: [
      'procrastino', 'adio', 'deixo para depois', 'deixo pra depois', 'empurro', 'enrolo', 'postergo',
      'empurro com a barriga', 'fico enrolando', 'vou fazer depois', 'não fiz ainda', 'sempre deixo',
      'nunca faço', 'fico adiando', 'deixa pra lá', 'depois eu faço', 'amanhã eu', 'semana que vem'
    ],
    perfectionism: ['perfeito', 'perfeccionismo', 'nunca está bom', 'refaço', 'nunca termino', 'não fica bom'],
    impostor: ['não mereço', 'sorte', 'fake', 'impostor', 'não sei nada', 'vão descobrir', 'não sou capaz'],
    communication: ['reunião', 'falar', 'apresentar', 'não falo', 'fico quieto', 'voz trava'],
    confidence: ['confiança', 'inseguro', 'medo', 'receio', 'ansioso', 'nervoso', 'não consigo'],
    organization: ['desorganizado', 'bagunça', 'perco prazo', 'esqueço', 'caos', 'não me organizo'],
    conflict: ['conflito', 'evito', 'confronto', 'não consigo dizer não', 'engulo'],
    selfCriticism: ['me cobro', 'autocrítica', 'me julgo', 'sou muito duro', 'perfeccionista'],
    creativeLimbo: [
      'não sei por onde começar', 'não sei como começar', 'fico perdido', 'não tenho ideia',
      'por onde começar', 'como começar', 'não faço ideia', 'fico sem saber', 'não sei o que fazer',
      'paraliso', 'trava', 'branco total', 'bloqueio criativo'
    ],
    creativeProjects: [
      'instagram', 'insta', 'blog', 'youtube', 'canal', 'podcast', 'arte', 'criar', 'post', 'postar',
      'conteúdo', 'foto', 'vídeo', 'projeto pessoal', 'lado criativo', 'hobby', 'paixão',
      'tranças', 'cabelo', 'beleza', 'makeup', 'moda', 'design', 'desenho', 'escrita'
    ]
  };

  // Intensidade de palavras expandida
  const intensityWords = {
    high: [
      'sempre', 'nunca', 'completamente', 'totalmente', 'extremamente', 'muito', 'demais',
      'toda vez', 'direto', 'constantemente', 'todo dia', 'toda hora', 'sem parar'
    ],
    medium: ['às vezes', 'frequentemente', 'geralmente', 'costuma', 'meio', 'de vez em quando'],
    low: ['raramente', 'pouco', 'levemente', 'um pouco', 'quase nunca']
  };

  // Honestidade indicators expandidos
  const honestyIndicators = {
    high: [
      'confesso', 'admito', 'reconheço', 'sei que', 'tenho problema', 'preciso mudar',
      'assumo', 'é verdade', 'não posso negar', 'tá aí', 'real', 'verdade seja dita'
    ],
    medium: ['acho que', 'talvez', 'pode ser que', 'às vezes sinto', 'meio que', 'tipo'],
    low: ['não é bem assim', 'mas', 'justifica', 'porque', 'culpa', 'não é minha culpa']
  };

  // Marcadores de humor brasileiro informal
  const informalMarkers = ['kkk', 'kkkk', 'rsrs', 'haha', 'né', 'cara', 'mano', 'gente'];

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

  // Cálculo do severity score baseado no conteúdo real
  let severityScore = 30; // Base mais baixa para casos leves
  
  // Aumenta significativamente se menciona procrastinação + projeto específico
  if (problemAreas.includes('procrastination') && problemAreas.includes('creativeProjects')) {
    severityScore += 25;
  }
  
  // Aumenta se menciona paralisia criativa
  if (problemAreas.includes('creativeLimbo')) {
    severityScore += 20;
  }
  
  // Aumenta se menciona problemas múltiplos
  severityScore += problemAreas.length * 8;
  
  // Aumenta com palavras de alta intensidade
  intensityWords.high.forEach(word => {
    if (lowerInput.includes(word)) severityScore += 12;
  });
  
  // Diminui com palavras de baixa intensidade
  intensityWords.low.forEach(word => {
    if (lowerInput.includes(word)) severityScore -= 8;
  });

  // Diminui se tem humor (mais leveza no relato)
  let hasHumor = false;
  informalMarkers.forEach(marker => {
    if (lowerInput.includes(marker)) {
      hasHumor = true;
      severityScore -= 5;
    }
  });

  // Ajusta pela extensão da confissão
  if (input.length > 200) severityScore += 10;
  if (input.length > 400) severityScore += 8;

  severityScore = Math.min(100, Math.max(20, severityScore));

  // Cálculo do honesty level melhorado
  let honestyLevel = 50;
  
  honestyIndicators.high.forEach(indicator => {
    if (lowerInput.includes(indicator)) honestyLevel += 15;
  });
  
  honestyIndicators.medium.forEach(indicator => {
    if (lowerInput.includes(indicator)) honestyLevel += 8;
  });
  
  honestyIndicators.low.forEach(indicator => {
    if (lowerInput.includes(indicator)) honestyLevel -= 12;
  });

  // Bonus de honestidade se menciona projetos específicos com detalhes
  if (problemAreas.includes('creativeProjects') && input.length > 50) {
    honestyLevel += 10;
  }

  honestyLevel = Math.min(100, Math.max(10, honestyLevel));

  // Análise de sentimentos melhorada
  const negativeWords = ['ruim', 'péssimo', 'horrível', 'odeio', 'detesto', 'fracasso', 'burro', 'idiota', 'não consigo'];
  const positiveWords = ['quero', 'vou', 'posso', 'conseguir', 'determinado', 'vontade', 'sonho', 'objetivo'];
  
  let sentimentScore = 50;
  negativeWords.forEach(word => {
    if (lowerInput.includes(word)) sentimentScore -= 10;
  });
  positiveWords.forEach(word => {
    if (lowerInput.includes(word)) sentimentScore += 12;
  });

  // Ajuste se tem humor (mais positivo)
  if (hasHumor) sentimentScore += 8;

  sentimentScore = Math.min(100, Math.max(0, sentimentScore));

  // Issues específicas melhoradas
  const specificIssues: string[] = [];
  
  if (problemAreas.includes('creativeProjects')) {
    specificIssues.push('Projetos criativos parados por paralisia de início');
  }
  if (problemAreas.includes('creativeLimbo')) {
    specificIssues.push('Paralisia por não saber por onde começar');
  }
  if (problemAreas.includes('procrastination') && problemAreas.includes('creativeProjects')) {
    specificIssues.push('Procrastinação específica em projetos pessoais');
  }
  if (lowerInput.includes('reunião') || lowerInput.includes('apresentação')) {
    specificIssues.push('Dificuldade em reuniões e apresentações');
  }
  if (lowerInput.includes('prazo') || lowerInput.includes('deadline')) {
    specificIssues.push('Problemas com gestão de prazos');
  }
  if (lowerInput.includes('chefe') || lowerInput.includes('superior')) {
    specificIssues.push('Dificuldades hierárquicas');
  }

  // Estado emocional melhorado
  let emotionalState = 'neutro';
  if (sentimentScore > 70) emotionalState = 'motivado mas travado';
  else if (sentimentScore < 30) emotionalState = 'desesperançoso';
  else if (honestyLevel > 80) emotionalState = 'autocrítico construtivo';
  else if (honestyLevel < 40) emotionalState = 'defensivo';
  else if (hasHumor && problemAreas.length > 0) emotionalState = 'consciente mas descontraído';

  // Self-awareness level
  let selfAwarenessLevel = Math.round((honestyLevel + (problemAreas.length * 12)) / 2);
  
  // Bonus se identificou projetos específicos
  if (problemAreas.includes('creativeProjects')) {
    selfAwarenessLevel += 15;
  }

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
  
  // Insights específicos para projetos criativos
  if (analysis.problemAreas.includes('creativeProjects') && analysis.problemAreas.includes('procrastination')) {
    insights.push('Procrastinação específica em projetos pessoais/criativos detectada');
  }
  
  if (analysis.problemAreas.includes('creativeLimbo')) {
    insights.push('Paralisia por excesso de possibilidades identificada');
  }
  
  // Insights baseados nas áreas problema identificadas
  if (analysis.problemAreas.includes('procrastination')) {
    insights.push('Padrão de procrastinação crônica identificado');
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
