
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useCredits } from "@/hooks/useCredits";
import { Badge as BadgeType } from "@/types/user";
import { Coins, Zap, AlertTriangle, Crown, Target, Star, TrendingUp } from "lucide-react";

const TestPanel = () => {
  const { progress } = useUserProgress();
  const { getTestCost } = useCredits();

  // Define badges for each test
  const testBadges: Record<string, BadgeType> = {
    "career-truth-ai": {
      id: 'excuse-destroyer',
      name: 'Destruidor de Autossabotagem',
      description: 'Completou o Sem Desculpas IA',
      icon: '💼',
      category: 'completion',
      rarity: 'rare',
      points: 300
    },
    "arquiteto-da-verdade": {
      id: 'truth-seeker',
      name: 'Caçador da Verdade', 
      description: 'Completou o Arquiteto da Verdade',
      icon: '🏗️',
      category: 'completion',
      rarity: 'rare',
      points: 300
    },
    "unbreakable-mind": {
      id: 'unbreakable',
      name: 'Mente Inquebrantável',
      description: 'Completou o Unbreakable Mind',
      icon: '⚡',
      category: 'intensity',
      rarity: 'epic',
      points: 500
    }
  };

  // Special badges that can be unlocked
  const specialBadges: BadgeType[] = [
    {
      id: 'first-test',
      name: 'Primeira Batalha',
      description: 'Primeiro teste completado',
      icon: '🎯',
      category: 'completion',
      rarity: 'common',
      points: 100
    },
    {
      id: 'honest-soul',
      name: 'Alma Honesta',
      description: 'Score de honestidade 8.0+',
      icon: '💎',
      category: 'honesty',
      rarity: 'epic',
      points: 400
    },
    {
      id: 'legend',
      name: 'Lenda do Desconforto',
      description: 'Todos os testes completados',
      icon: '👑',
      category: 'special',
      rarity: 'legendary',
      points: 1000
    }
  ];

  const tests = [
    {
      id: "arquiteto-da-verdade",
      title: "Arquiteto da Verdade",
      description: "Desconstrua suas mentiras internas e projete uma nova identidade baseada em verdade, propósito e responsabilidade.",
      difficulty: "INTENSO",
      status: "Disponível",
      link: "/arquiteto-da-verdade",
      xpReward: 300,
      credits: getTestCost("arquiteto-da-verdade"),
      recommended: true,
      icon: "🏗️"
    },
    {
      id: "career-truth-ai",
      title: "Sem Desculpas IA",
      description: "Autópsia brutal dos seus padrões de autossabotagem profissional. Descubra como você sabota sua própria carreira.",
      difficulty: "BRUTAL",
      status: "Disponível",
      link: "/career-truth-ai",
      xpReward: 300,
      credits: getTestCost("career-truth-ai"),
      icon: "💼"
    },
    {
      id: "unbreakable-mind",
      title: "Unbreakable Mind",
      description: "Mentalidade David Goggins. Destrua suas desculpas mentais e forje disciplina de aço. Sem vitimismo permitido.",
      difficulty: "EXTREMO",
      status: "Disponível",
      link: "/unbreakable-mind",
      xpReward: 500,
      credits: getTestCost("unbreakable-mind"),
      icon: "⚡"
    },
    {
      id: "stay-hard-ai",
      title: "Stay Hard AI",
      description: "Coaching estilo Goggins. Sem desculpas: diga sua meta de treino e aceite o castigo.",
      difficulty: "EXTREMO",
      status: "Em breve",
      link: "#",
      xpReward: 500,
      icon: "🔥"
    },
    {
      id: "stoic-snap",
      title: "StoicSnap",
      description: "Conselheiro estoico on-demand. Em 3 frases, o remédio de Sêneca para seu problema.",
      difficulty: "INTENSO",
      status: "Em breve",
      link: "#",
      xpReward: 250,
      icon: "🏛️"
    },
    {
      id: "cold-email-crucible",
      title: "Cold-Email Crucible",
      description: "Autópsia brutal da sua copy. Cole sua linha de assunto: receba tapas & melhorias.",
      difficulty: "SEVERO",
      status: "Em breve",
      link: "#",
      xpReward: 200,
      icon: "📧"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "EXTREMO":
        return "bg-red-500 text-white";
      case "BRUTAL":
        return "bg-warm-yellow text-dark-bg";
      case "SEVERO":
        return "bg-orange-500 text-white";
      case "INTENSO":
        return "bg-yellow-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const isTestCompleted = (testId: string) => {
    return progress.testsCompleted.some(test => test.testId === testId);
  };

  const getRelevantSpecialBadges = (testId: string) => {
    const completedTests = progress.testsCompleted.length;
    const relevant: BadgeType[] = [];

    if (completedTests === 0) {
      relevant.push(specialBadges[0]);
    }

    if (progress.honestyAverage < 8.0) {
      relevant.push(specialBadges[1]);
    }

    const availableTestIds = ["career-truth-ai", "arquiteto-da-verdade", "unbreakable-mind"];
    const completedTestIds = progress.testsCompleted.map(t => t.testId);
    const remainingTests = availableTestIds.filter(id => !completedTestIds.includes(id));
    
    if (remainingTests.length === 1 && remainingTests[0] === testId) {
      relevant.push(specialBadges[2]);
    }

    return relevant;
  };

  const getRecommendedTest = () => {
    const completedTestIds = progress.testsCompleted.map(t => t.testId);
    const availableTests = tests.filter(t => t.status === "Disponível");
    
    if (completedTestIds.length === 0) {
      return availableTests.find(t => t.id === "arquiteto-da-verdade");
    }
    
    return availableTests.find(t => !completedTestIds.includes(t.id));
  };

  const availableTests = tests.filter(t => t.status === "Disponível");
  const upcomingTests = tests.filter(t => t.status !== "Disponível");
  const recommendedTest = getRecommendedTest();

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-dark-bg via-dark-bg to-dark-bg/90">
      <div className="max-w-7xl mx-auto">
        {/* Cleaner Header with integrated credit counter */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-warm-yellow/5 blur-3xl rounded-full"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-6 mb-8">
              <h1 className="text-6xl md:text-7xl font-bebas text-warm-gray tracking-wider">
                TESTES
              </h1>
              <div className="flex items-center space-x-3 bg-warm-yellow/10 px-6 py-3 rounded-xl border border-warm-yellow/30 backdrop-blur-sm">
                <Coins size={24} className="text-warm-yellow" />
                <span className="font-bebas text-warm-yellow text-2xl">
                  {progress.credits}
                </span>
              </div>
            </div>
            <p className="text-xl text-warm-gray/70 font-inter max-w-2xl mx-auto">
              Escolha sua transformação. Cada teste revela uma verdade diferente.
            </p>
          </div>
        </div>

        {/* Smart Status Bar - Only shows when relevant */}
        {(progress.isInTreatment || progress.credits < 3) && (
          <div className="mb-12">
            {progress.isInTreatment && (
              <div className="bg-red-600/10 border border-red-600/30 p-6 rounded-xl flex items-center space-x-4 backdrop-blur-sm">
                <AlertTriangle className="text-red-400" size={24} />
                <div className="flex-1">
                  <span className="text-red-400 font-bebas text-xl">
                    PACIENTE EM TRATAMENTO
                  </span>
                  <p className="text-warm-gray/80">
                    {progress.debtPoints} pontos de dívida • {progress.dailyActions.filter(a => !a.completed).length} ações pendentes
                  </p>
                </div>
              </div>
            )}
            
            {progress.credits < 3 && (
              <div className="bg-warm-yellow/10 border border-warm-yellow/30 p-6 rounded-xl flex items-center space-x-4 backdrop-blur-sm">
                <Coins className="text-warm-yellow" size={24} />
                <div className="flex-1">
                  <span className="text-warm-yellow font-bebas text-xl">
                    CRÉDITOS INSUFICIENTES
                  </span>
                  <p className="text-warm-gray/80">
                    Você precisa de pelo menos 3 créditos para começar um teste
                  </p>
                </div>
                <Button size="lg" className="bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas text-lg px-6">
                  COMPRAR CRÉDITOS
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Recommendation Section */}
        {recommendedTest && progress.credits >= (recommendedTest.credits || 0) && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Star className="text-warm-yellow" size={28} />
                <h2 className="text-3xl font-bebas text-warm-gray">RECOMENDADO PARA VOCÊ</h2>
                <Star className="text-warm-yellow" size={28} />
              </div>
              <p className="text-warm-gray/60 font-inter">Baseado no seu progresso atual</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <Card className="group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl border-warm-yellow/50 bg-gradient-to-br from-warm-yellow/10 to-warm-yellow/5 backdrop-blur-sm">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-warm-yellow text-dark-bg font-bebas animate-pulse">
                    <Crown size={14} className="mr-1" />
                    RECOMENDADO
                  </Badge>
                </div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-6xl">{recommendedTest.icon}</div>
                    <Badge className={`font-bebas ${getDifficultyColor(recommendedTest.difficulty)}`}>
                      {recommendedTest.difficulty}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-3xl font-bebas text-warm-gray group-hover:text-warm-yellow transition-colors">
                    {recommendedTest.title}
                  </CardTitle>
                  
                  {recommendedTest.credits && (
                    <div className="flex items-center space-x-3">
                      <Coins size={18} className="text-warm-yellow" />
                      <span className="text-warm-yellow font-bebas text-lg">
                        {recommendedTest.credits} CRÉDITOS
                      </span>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="text-warm-gray/80 font-inter mb-6 text-lg leading-relaxed">
                    {recommendedTest.description}
                  </CardDescription>

                  <div className="flex items-center justify-between mb-6 p-4 bg-dark-bg/30 rounded-lg border border-warm-yellow/20">
                    <span className="text-warm-gray/70 font-inter">Recompensa XP:</span>
                    <span className="text-warm-yellow font-bebas text-xl">{recommendedTest.xpReward} XP</span>
                  </div>
                  
                  <Link to={recommendedTest.link}>
                    <Button 
                      size="lg"
                      className="w-full font-bebas text-xl tracking-wider py-6 bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 hover:scale-105 transition-all duration-300"
                    >
                      COMEÇAR AGORA
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Available Tests - Redesigned Grid */}
        <div className="mb-16">
          <h2 className="text-4xl font-bebas text-warm-gray mb-8 flex items-center justify-center space-x-3">
            <Zap className="text-warm-yellow" size={32} />
            <span>TODOS OS TESTES</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableTests.map((test) => {
              const isCompleted = isTestCompleted(test.id);
              const hasCredits = progress.credits >= (test.credits || 0);
              const isRecommended = test.id === recommendedTest?.id;
              
              return (
                <Card 
                  key={test.id} 
                  className={`group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl border-dark-border bg-dark-card backdrop-blur-sm ${
                    isRecommended ? 'opacity-50' : ''
                  } ${!hasCredits && !isCompleted ? 'opacity-75' : ''}`}
                >
                  {isCompleted && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-600 text-white font-bebas text-xs">
                        ✓ COMPLETO
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{test.icon}</div>
                      <Badge className={`font-bebas text-xs ${getDifficultyColor(test.difficulty)}`}>
                        {test.difficulty}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-2xl font-bebas text-warm-gray group-hover:text-warm-yellow transition-colors">
                      {test.title}
                    </CardTitle>
                    
                    {test.credits && (
                      <div className="flex items-center space-x-2">
                        <Coins size={16} className="text-warm-yellow" />
                        <span className="text-warm-yellow font-bebas">
                          {test.credits} CRÉDITOS
                        </span>
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <CardDescription className="text-warm-gray/70 font-inter mb-4 leading-relaxed">
                      {test.description}
                    </CardDescription>

                    <div className="mb-4 p-3 bg-dark-bg/50 rounded border border-dark-border/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-warm-gray/60">XP Reward:</span>
                        <span className="text-warm-yellow font-bebas">{test.xpReward} XP</span>
                      </div>
                    </div>
                    
                    <Link to={test.link}>
                      <Button 
                        className={`w-full font-bebas tracking-wider transition-all duration-300 ${
                          isCompleted 
                            ? "bg-green-600 hover:bg-green-700" 
                            : !hasCredits && test.credits > 0
                              ? "bg-gray-600 hover:bg-gray-700"
                              : "bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 hover:scale-105"
                        }`}
                        disabled={!hasCredits && !isCompleted && (test.credits > 0)}
                      >
                        {isCompleted 
                          ? "REFAZER TESTE" 
                          : !hasCredits && test.credits > 0
                            ? "CRÉDITOS INSUFICIENTES"
                            : "INICIAR TESTE"
                        }
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Upcoming Tests - Compact */}
        <div>
          <h2 className="text-3xl font-bebas text-warm-gray mb-8 flex items-center justify-center space-x-3">
            <Target className="text-warm-gray/60" size={28} />
            <span>EM DESENVOLVIMENTO</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingTests.map((test) => (
              <Card key={test.id} className="bg-dark-card/50 border-dark-border/50 opacity-75 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl opacity-60">{test.icon}</div>
                    <Badge variant="outline" className="text-xs font-bebas">
                      EM BREVE
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bebas text-warm-gray/80">
                    {test.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-warm-gray/50 text-sm font-inter">
                    {test.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        {progress.testsCompleted.length > 0 && (
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-warm-yellow/10 to-transparent rounded-xl border border-warm-yellow/20 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <TrendingUp className="text-warm-yellow" size={28} />
              <h3 className="text-2xl font-bebas text-warm-gray">
                SEU PROGRESSO
              </h3>
            </div>
            <p className="text-warm-gray/70 font-inter text-lg">
              {progress.testsCompleted.length} de {availableTests.length} testes completados
            </p>
            <div className="w-full bg-dark-border rounded-full h-3 mt-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-warm-yellow to-warm-yellow/80 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(progress.testsCompleted.length / availableTests.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPanel;
