
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";

interface TestCardProps {
  test: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    status: string;
    link: string;
    xpReward: number;
    credits?: number;
    icon: string;
  };
  isCompleted: boolean;
  hasCredits: boolean;
  isRecommended: boolean;
  getDifficultyColor: (difficulty: string) => string;
}

const TestCard = ({ 
  test, 
  isCompleted, 
  hasCredits, 
  isRecommended, 
  getDifficultyColor 
}: TestCardProps) => {
  return (
    <Card 
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
        <p className="text-warm-gray/70 font-inter mb-4 leading-relaxed">
          {test.description}
        </p>

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
                : !hasCredits && test.credits && test.credits > 0
                  ? "bg-gray-600 hover:bg-gray-700"
                  : "bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 hover:scale-105"
            }`}
            disabled={!hasCredits && !isCompleted && test.credits && test.credits > 0}
          >
            {isCompleted 
              ? "REFAZER TESTE" 
              : !hasCredits && test.credits && test.credits > 0
                ? "CRÉDITOS INSUFICIENTES"
                : "INICIAR TESTE"
            }
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default TestCard;
