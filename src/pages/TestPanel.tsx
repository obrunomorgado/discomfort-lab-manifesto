
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RewardPreview } from "@/components/RewardPreview";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useCredits } from "@/hooks/useCredits";
import { Badge as BadgeType } from "@/types/user";
import { Coins, Zap, AlertTriangle, Crown, Target } from "lucide-react";

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
      relevant.push(specialBadges[0]); // First test badge
    }

    if (progress.honestyAverage < 8.0) {
      relevant.push(specialBadges[1]); // Honest soul badge
    }

    // Legend badge if this completes all tests
    const availableTestIds = ["career-truth-ai", "arquiteto-da-verdade", "unbreakable-mind"];
    const completedTestIds = progress.testsCompleted.map(t => t.testId);
    const remainingTests = availableTestIds.filter(id => !completedTestIds.includes(id));
    
    if (remainingTests.length === 1 && remainingTests[0] === testId) {
      relevant.push(specialBadges[2]); // Legend badge
    }

    return relevant;
  };

  const availableTests = tests.filter(t => t.status === "Disponível");
  const upcomingTests = tests.filter(t => t.status !== "Disponível");

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Simplified Header with integrated credit counter */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-warm-yellow/5 blur-3xl rounded-full"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <h1 className="text-5xl md:text-6xl font-bebas text-warm-gray tracking-wider">
                PAINEL DE TESTES
              </h1>
              <div className="flex items-center space-x-2 bg-warm-yellow/10 px-4 py-2 rounded-lg border border-warm-yellow/30">
                <Coins size={20} className="text-warm-yellow" />
                <span className="font-bebas text-warm-yellow text-lg">
                  {progress.credits} CRÉDITOS
                </span>
              </div>
            </div>
            <p className="text-xl text-warm-gray/60 font-inter max-w-3xl mx-auto">
              Escolha sua forma de sofrimento. Cada teste foi projetado para expor uma fraqueza específica.
            </p>
          </div>
        </div>

        {/* Consolidated Status Bar */}
        {(progress.isInTreatment || progress.credits < 3) && (
          <div className="mb-8 space-y-4">
            {progress.isInTreatment && (
              <div className="bg-red-600/10 border border-red-600/30 p-4 rounded-lg flex items-center space-x-3">
                <AlertTriangle className="text-red-400" size={20} />
                <div className="flex-1">
                  <span className="text-red-400 font-bebas text-lg">
                    PACIENTE EM TRATAMENTO
                  </span>
                  <p className="text-warm-gray/80 text-sm">
                    {progress.debtPoints} pontos de dívida • {progress.dailyActions.filter(a => !a.completed).length} ações pendentes
                  </p>
                </div>
              </div>
            )}
            
            {progress.credits < 3 && (
              <div className="bg-warm-yellow/10 border border-warm-yellow/30 p-4 rounded-lg flex items-center space-x-3">
                <Coins className="text-warm-yellow" size={20} />
                <div className="flex-1">
                  <span className="text-warm-yellow font-bebas text-lg">
                    CRÉDITOS INSUFICIENTES
                  </span>
                  <p className="text-warm-gray/80 text-sm">
                    Você precisa de pelo menos 3 créditos para começar
                  </p>
                </div>
                <Button size="sm" className="bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas">
                  COMPRAR CRÉDITOS
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Available Tests - Redesigned Cards */}
        <div className="mb-12">
          <h2 className="text-3xl font-bebas text-warm-gray mb-6 flex items-center space-x-2">
            <Zap className="text-warm-yellow" size={28} />
            <span>TESTES DISPONÍVEIS</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTests.map((test) => {
              const isCompleted = isTestCompleted(test.id);
              const hasCredits = progress.credits >= (test.credits || 0);
              
              return (
                <Card 
                  key={test.id} 
                  className={`group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl border-dark-border ${
                    test.recommended ? 'ring-2 ring-warm-yellow/50 bg-warm-yellow/5' : 'bg-dark-card'
                  } ${!hasCredits && !isCompleted ? 'opacity-75' : ''}`}
                >
                  {test.recommended && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-warm-yellow text-dark-bg font-bebas text-xs animate-pulse">
                        <Crown size={12} className="mr-1" />
                        RECOMENDADO
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-4xl">{test.icon}</div>
                      <Badge className={`font-bebas text-xs ${getDifficultyColor(test.difficulty)}`}>
                        {test.difficulty}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl font-bebas text-warm-gray group-hover:text-warm-yellow transition-colors">
                      {test.title}
                    </CardTitle>
                    
                    {test.credits && (
                      <div className="flex items-center space-x-2">
                        <Coins size={14} className="text-warm-yellow" />
                        <span className="text-warm-yellow font-bebas text-sm">
                          {test.credits} CRÉDITOS
                        </span>
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <CardDescription className="text-warm-gray/70 font-inter mb-4 text-sm leading-relaxed">
                      {test.description}
                    </CardDescription>

                    {/* Compact reward preview */}
                    <div className="mb-4 p-3 bg-dark-bg/50 rounded border border-dark-border/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-warm-gray/60">Recompensa:</span>
                        <span className="text-warm-yellow font-bebas">{test.xpReward} XP</span>
                      </div>
                    </div>
                    
                    <Link to={test.link}>
                      <Button 
                        className={`w-full font-bebas tracking-wider transition-all duration-300 ${
                          isCompleted 
                            ? "bg-green-600 hover:bg-green-700" 
                            : !hasCredits && test.credits
                              ? "bg-gray-600 hover:bg-gray-700"
                              : "bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 hover:scale-105"
                        }`}
                        disabled={!hasCredits && !isCompleted && test.credits}
                      >
                        {isCompleted 
                          ? "REFAZER TESTE" 
                          : !hasCredits && test.credits
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

        {/* Upcoming Tests - Simplified */}
        <div>
          <h2 className="text-2xl font-bebas text-warm-gray mb-6 flex items-center space-x-2">
            <Target className="text-warm-gray/60" size={24} />
            <span>EM DESENVOLVIMENTO</span>
          </h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {upcomingTests.map((test) => (
              <Card key={test.id} className="bg-dark-card/50 border-dark-border/50 opacity-75">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl opacity-60">{test.icon}</div>
                    <Badge variant="outline" className="text-xs font-bebas">
                      {test.status}
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

        {/* Bottom CTA - Simplified */}
        {progress.credits >= 3 && !progress.testsCompleted.length && (
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-warm-yellow/10 to-transparent rounded-lg border border-warm-yellow/20">
            <h3 className="text-2xl font-bebas text-warm-gray mb-3">
              PRONTO PARA COMEÇAR?
            </h3>
            <p className="text-warm-gray/60 font-inter mb-6">
              Recomendamos começar pelo Arquiteto da Verdade.
            </p>
            <Link to="/arquiteto-da-verdade">
              <Button 
                size="lg" 
                className="font-bebas text-xl px-8 py-6 tracking-wider bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 hover:scale-105 transition-all duration-300"
              >
                COMEÇAR JORNADA
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPanel;
