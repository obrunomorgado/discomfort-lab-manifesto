
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TestPanel = () => {
  const tests = [
    {
      id: "career-truth-ai",
      title: "CareerTruthAI",
      description: "Autópsia brutal da sua carreira. Descubra seus sabotadores internos e receba um plano de 30-60-90 dias sem açúcar.",
      difficulty: "BRUTAL",
      status: "Disponível",
      link: "/career-truth-ai"
    },
    {
      id: "unbreakable-mind",
      title: "Unbreakable Mind Simulator",
      description: "Mentalidade David Goggins. Destrua suas desculpas mentais e forje disciplina de aço. Sem vitimismo permitido.",
      difficulty: "EXTREMO",
      status: "Disponível",
      link: "/unbreakable-mind"
    },
    {
      id: "stay-hard-ai",
      title: "Stay Hard AI",
      description: "Coaching estilo Goggins. Sem desculpas: diga sua meta de treino e aceite o castigo.",
      difficulty: "EXTREMO",
      status: "Em breve",
      link: "#"
    },
    {
      id: "stoic-snap",
      title: "StoicSnap",
      description: "Conselheiro estoico on-demand. Em 3 frases, o remédio de Sêneca para seu problema.",
      difficulty: "INTENSO",
      status: "Em breve",
      link: "#"
    },
    {
      id: "cold-email-crucible",
      title: "Cold-Email Crucible",
      description: "Autópsia brutal da sua copy. Cole sua linha de assunto: receba tapas & melhorias.",
      difficulty: "SEVERO",
      status: "Em breve",
      link: "#"
    },
    {
      id: "4am-challenge",
      title: "Desafio 4AM",
      description: "Teste de disciplina extrema. Acorde às 4h por 30 dias. Monitore falhas e receba feedback implacável.",
      difficulty: "INSANO",
      status: "Em desenvolvimento",
      link: "#"
    },
    {
      id: "comfort-killer",
      title: "Comfort Killer",
      description: "Identifique e elimine suas fugas. AI que monitora seus padrões de procrastinação e cobra resultados.",
      difficulty: "BRUTAL",
      status: "Em desenvolvimento",
      link: "#"
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

        {/* Warning Banner */}
        <div className="bg-warm-yellow/10 border border-warm-yellow p-6 rounded-lg mb-12 text-center">
          <h2 className="text-2xl font-bebas text-warm-yellow mb-2">AVISO IMPORTANTE</h2>
          <p className="text-warm-gray/80 font-inter">
            Estes testes não são para todos. Se você busca validação ou palavras doces, 
            este não é o lugar. Aqui você encontrará apenas a verdade nua e crua.
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
              </CardHeader>
              <CardContent>
                <CardDescription className="text-warm-gray/70 font-inter mb-6 min-h-[60px]">
                  {test.description}
                </CardDescription>
                
                {test.status === "Disponível" ? (
                  <Link to={test.link}>
                    <Button 
                      className="w-full bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas tracking-wider"
                    >
                      INICIAR TESTE
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    disabled 
                    className="w-full font-bebas tracking-wider"
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
            Recomendamos começar pelo CareerTruthAI. É o teste mais completo e revelador.
          </p>
          <Link to="/career-truth-ai">
            <Button 
              size="lg" 
              className="bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas text-xl px-8 py-6 tracking-wider"
            >
              COMEÇAR COM CAREERTRUTH AI
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  function getDifficultyColor(difficulty: string) {
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
  }

  function getStatusColor(status: string) {
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
  }
};

export default TestPanel;
