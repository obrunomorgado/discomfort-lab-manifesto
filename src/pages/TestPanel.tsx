import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RewardPreview } from "@/components/RewardPreview";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useCredits } from "@/hooks/useCredits";
import { Badge as BadgeType } from "@/types/user";
import { Coins } from "lucide-react";

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
      id: "career-truth-ai",
      title: "Sem Desculpas IA",
      description: "Autópsia brutal dos seus padrões de autossabotagem profissional. Descubra como você sabota sua própria carreira e receba um protocolo de 90 dias para eliminar comportamentos autodestrutivos.",
      difficulty: "BRUTAL",
      status: "Disponível",
      link: "/career-truth-ai",
      xpReward: 300,
      credits: getTestCost("career-truth-ai")
    },
    {
      id: "arquiteto-da-verdade",
      title: "Arquiteto da Verdade",
      description: "Desconstrua suas mentiras internas e projete uma nova identidade baseada em verdade, propósito e responsabilidade.",
      difficulty: "INTENSO",
      status: "Disponível",
      link: "/arquiteto-da-verdade",
      xpReward: 300,
      credits: getTestCost("arquiteto-da-verdade")
    },
    {
      id: "unbreakable-mind",
      title: "Unbreakable Mind Simulator",
      description: "Mentalidade David Goggins. Destrua suas desculpas mentais e forje disciplina de aço. Sem vitimismo permitido.",
      difficulty: "EXTREMO",
      status: "Disponível",
      link: "/unbreakable-mind",
      xpReward: 500,
      credits: getTestCost("unbreakable-mind")
    },
    {
      id: "stay-hard-ai",
      title: "Stay Hard AI",
      description: "Coaching estilo Goggins. Sem desculpas: diga sua meta de treino e aceite o castigo.",
      difficulty: "EXTREMO",
      status: "Em breve",
      link: "#",
      xpReward: 500
    },
    {
      id: "stoic-snap",
      title: "StoicSnap",
      description: "Conselheiro estoico on-demand. Em 3 frases, o remédio de Sêneca para seu problema.",
      difficulty: "INTENSO",
      status: "Em breve",
      link: "#",
      xpReward: 250
    },
    {
      id: "cold-email-crucible",
      title: "Cold-Email Crucible",
      description: "Autópsia brutal da sua copy. Cole sua linha de assunto: receba tapas & melhorias.",
      difficulty: "SEVERO",
      status: "Em breve",
      link: "#",
      xpReward: 200
    },
    {
      id: "4am-challenge",
      title: "Desafio 4AM",
      description: "Teste de disciplina extrema. Acorde às 4h por 30 dias. Monitore falhas e receba feedback implacável.",
      difficulty: "INSANO",
      status: "Em desenvolvimento",
      link: "#",
      xpReward: 1000
    },
    {
      id: "comfort-killer",
      title: "Comfort Killer",
      description: "Identifique e elimine suas fugas. AI que monitora seus padrões de procrastinação e cobra resultados.",
      difficulty: "BRUTAL",
      status: "Em desenvolvimento",
      link: "#",
      xpReward: 400
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "INSANO":
        return "bg-red-600 text-white";
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponível":
        return "bg-green-600 text-white";
      case "Em breve":
        return "bg-blue-600 text-white";
      case "Em desenvolvimento":
        return "bg-purple-600 text-white";
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

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bebas text-warm-gray mb-6 tracking-wider">
            PAINEL DE TESTES
          </h1>
          <p className="text-xl text-warm-gray/60 font-inter max-w-3xl mx-auto">
            Escolha sua forma de sofrimento. Cada teste foi projetado para expor uma fraqueza específica. 
            Não há testes fáceis aqui.
          </p>
        </div>

        {/* Credit Status */}
        <div className="bg-warm-yellow/10 border border-warm-yellow p-6 rounded-lg mb-12 text-center">
          <h2 className="text-2xl font-bebas text-warm-yellow mb-2 flex items-center justify-center space-x-2">
            <Coins size={24} />
            <span>SEUS CRÉDITOS: {progress.credits}</span>
          </h2>
          <p className="text-warm-gray/80 font-inter">
            Cada teste consome créditos. Invista em sua transformação.
          </p>
        </div>

        {/* Treatment Status Warning */}
        {progress.isInTreatment && (
          <div className="bg-red-600/10 border border-red-600 p-6 rounded-lg mb-12 text-center">
            <h2 className="text-2xl font-bebas text-red-400 mb-2">🏥 PACIENTE EM TRATAMENTO</h2>
            <p className="text-warm-gray/80 font-inter mb-4">
              Você tem <span className="text-red-400 font-bold">{progress.debtPoints} pontos de dívida</span> de autossabotagem. 
              Complete suas ações diárias para obter alta médica.
            </p>
            <div className="bg-dark-bg/50 p-4 rounded">
              <p className="text-warm-gray/60 font-inter text-sm">
                ⚕️ Check-in obrigatório | 📈 Sequência atual: {progress.checkInStreak} dias | 
                🎯 Ações pendentes: {progress.dailyActions.filter(a => !a.completed).length}
              </p>
            </div>
          </div>
        )}

        {/* Warning Banner */}
        <div className="bg-warm-yellow/10 border border-warm-yellow p-6 rounded-lg mb-12 text-center">
          <h2 className="text-2xl font-bebas text-warm-yellow mb-2">AVISO IMPORTANTE</h2>
          <p className="text-warm-gray/80 font-inter">
            Estes testes não são para todos. Se você busca validação ou palavras doces, 
            este não é o lugar. Aqui você encontrará apenas a verdade nua e crua.
            <span className="block mt-2 text-red-400 font-bold">
              ⚠️ Cada teste gera PONTOS NEGATIVOS que devem ser pagos com ações diárias.
            </span>
          </p>
        </div>

        {/* Tests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <Card 
              key={test.id} 
              className="bg-dark-card border-dark-border hover-lift transition-all duration-300 hover:border-warm-yellow/50"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={`font-bebas text-xs ${getDifficultyColor(test.difficulty)}`}>
                    {test.difficulty}
                  </Badge>
                  <Badge className={`font-inter text-xs ${getStatusColor(test.status)}`}>
                    {test.status}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bebas text-warm-gray">
                  {test.title}
                </CardTitle>
                
                {/* Credit Cost */}
                {test.credits && test.status === "Disponível" && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Coins size={16} className="text-warm-yellow" />
                    <span className="text-warm-yellow font-bebas text-lg">
                      {test.credits} CRÉDITOS
                    </span>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <CardDescription className="text-warm-gray/70 font-inter mb-6 min-h-[60px]">
                  {test.description}
                </CardDescription>

                {/* Show rewards for available tests */}
                {test.status === "Disponível" && testBadges[test.id] && (
                  <RewardPreview
                    xpReward={test.xpReward}
                    testBadge={testBadges[test.id]}
                    specialBadges={getRelevantSpecialBadges(test.id)}
                    isCompleted={isTestCompleted(test.id)}
                  />
                )}
                
                {test.status === "Disponível" ? (
                  <div className="space-y-2">
                    {/* Credit validation */}
                    {test.credits && progress.credits < test.credits && (
                      <div className="text-center p-2 bg-red-600/10 rounded border border-red-600/30">
                        <p className="text-red-400 text-sm font-inter">
                          Créditos insuficientes
                        </p>
                      </div>
                    )}
                    
                    <Link to={test.link}>
                      <Button 
                        className={`w-full font-bebas tracking-wider ${
                          isTestCompleted(test.id) 
                            ? "bg-green-600 hover:bg-green-700" 
                            : test.credits && progress.credits < test.credits
                              ? "bg-gray-600 hover:bg-gray-700 opacity-75"
                              : "bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90"
                        }`}
                      >
                        {isTestCompleted(test.id) 
                          ? "REFAZER TESTE" 
                          : test.credits && progress.credits < test.credits
                            ? "CRÉDITOS INSUFICIENTES"
                            : "INICIAR TESTE"
                        }
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Button 
                    disabled 
                    className="w-full font-bebas tracking-wider mt-4"
                    variant="outline"
                  >
                    {test.status.toUpperCase()}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bebas text-warm-gray mb-4">
            NÃO SABE POR ONDE COMEÇAR?
          </h2>
          <p className="text-warm-gray/60 font-inter mb-6">
            Recomendamos começar pelo Arquiteto da Verdade (3 créditos). É o teste mais acessível para começar sua jornada.
          </p>
          <Link to="/arquiteto-da-verdade">
            <Button 
              size="lg" 
              className={`font-bebas text-xl px-8 py-6 tracking-wider ${
                progress.credits >= 3 
                  ? "bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90"
                  : "bg-gray-600 hover:bg-gray-700"
              }`}
              disabled={progress.credits < 3}
            >
              {progress.credits >= 3 
                ? "COMEÇAR COM ARQUITETO DA VERDADE" 
                : "COMPRE CRÉDITOS PARA COMEÇAR"
              }
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestPanel;
