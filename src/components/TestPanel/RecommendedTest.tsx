
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Crown, Coins } from "lucide-react";

interface RecommendedTestProps {
  test: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    link: string;
    xpReward: number;
    credits?: number;
    icon: string;
  };
  getDifficultyColor: (difficulty: string) => string;
}

const RecommendedTest = ({ test, getDifficultyColor }: RecommendedTestProps) => {
  return (
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
              <div className="text-6xl">{test.icon}</div>
              <Badge className={`font-bebas ${getDifficultyColor(test.difficulty)}`}>
                {test.difficulty}
              </Badge>
            </div>
            
            <CardTitle className="text-3xl font-bebas text-warm-gray group-hover:text-warm-yellow transition-colors">
              {test.title}
            </CardTitle>
            
            {test.credits && (
              <div className="flex items-center space-x-3">
                <Coins size={18} className="text-warm-yellow" />
                <span className="text-warm-yellow font-bebas text-lg">
                  {test.credits} CRÉDITOS
                </span>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="pt-0">
            <CardDescription className="text-warm-gray/80 font-inter mb-6 text-lg leading-relaxed">
              {test.description}
            </CardDescription>

            <div className="flex items-center justify-between mb-6 p-4 bg-dark-bg/30 rounded-lg border border-warm-yellow/20">
              <span className="text-warm-gray/70 font-inter">Recompensa XP:</span>
              <span className="text-warm-yellow font-bebas text-xl">{test.xpReward} XP</span>
            </div>
            
            <Link to={test.link}>
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
  );
};

export default RecommendedTest;
