
import { TrendingUp } from "lucide-react";

interface ProgressIndicatorProps {
  testsCompleted: number;
  totalAvailableTests: number;
}

const ProgressIndicator = ({ testsCompleted, totalAvailableTests }: ProgressIndicatorProps) => {
  if (testsCompleted === 0) {
    return null;
  }

  const progressPercentage = (testsCompleted / totalAvailableTests) * 100;

  return (
    <div className="text-center mt-16 p-8 bg-gradient-to-r from-warm-yellow/10 to-transparent rounded-xl border border-warm-yellow/20 backdrop-blur-sm">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <TrendingUp className="text-warm-yellow" size={28} />
        <h3 className="text-2xl font-bebas text-warm-gray">
          SEU PROGRESSO
        </h3>
      </div>
      <p className="text-warm-gray/70 font-inter text-lg">
        {testsCompleted} de {totalAvailableTests} testes completados
      </p>
      <div className="w-full bg-dark-border rounded-full h-3 mt-4 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-warm-yellow to-warm-yellow/80 h-3 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
