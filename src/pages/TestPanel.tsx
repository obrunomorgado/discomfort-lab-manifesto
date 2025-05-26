import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useCredits } from "@/hooks/useCredits";
import { Badge as BadgeType } from "@/types/user";
import { Coins, Zap, Target } from "lucide-react";
import TestCard from "@/components/TestPanel/TestCard";
import RecommendedTest from "@/components/TestPanel/RecommendedTest";
import StatusBar from "@/components/TestPanel/StatusBar";
import ProgressIndicator from "@/components/TestPanel/ProgressIndicator";

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
        {/* Header */}
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

        {/* Status Bar */}
        <StatusBar 
          isInTreatment={progress.isInTreatment}
          credits={progress.credits}
          debtPoints={progress.debtPoints}
          dailyActionsCount={progress.dailyActions.filter(a => !a.completed).length}
        />

        {/* Recommendation Section */}
        {recommendedTest && progress.credits >= (recommendedTest.credits || 0) && (
          <RecommendedTest 
            test={recommendedTest}
            getDifficultyColor={getDifficultyColor}
          />
        )}

        {/* Available Tests */}
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
                <TestCard
                  key={test.id}
                  test={test}
                  isCompleted={isCompleted}
                  hasCredits={hasCredits}
                  isRecommended={isRecommended}
                  getDifficultyColor={getDifficultyColor}
                />
              );
            })}
          </div>
        </div>

        {/* Upcoming Tests */}
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
        <ProgressIndicator 
          testsCompleted={progress.testsCompleted.length}
          totalAvailableTests={availableTests.length}
        />
      </div>
    </div>
  );
};

export default TestPanel;
