
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface ResponseSectionProps {
  aiResponse: string;
  isLoading: boolean;
}

const ResponseSection = ({ aiResponse, isLoading }: ResponseSectionProps) => {
  return (
    <Card className="bg-dark-card border-dark-border relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-black"></div>
      <CardHeader>
        <CardTitle className="text-2xl font-bebas text-red-400 flex items-center space-x-2">
          <Flame size={24} />
          <span>GOGGINS RESPONDE</span>
        </CardTitle>
        <CardDescription className="text-warm-gray/70 font-inter italic">
          {aiResponse ? 
            "*Goggins termina sua análise e olha diretamente nos seus olhos* 'Agora você vai ouvir a verdade.'" : 
            "*Goggins aguarda sua confissão, tamborilando os dedos na mesa...*"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600/30 border-t-red-600"></div>
              <div className="absolute inset-0 rounded-full border-4 border-red-600/10"></div>
            </div>
            <div className="text-center space-y-3">
              <p className="text-red-400 font-inter animate-pulse text-lg">
                🔥 <em>"Analisando suas mentiras internas..."</em>
              </p>
              <p className="text-warm-gray/60 font-inter text-sm italic">
                *Goggins caminha de um lado para o outro, preparando o confronto*
              </p>
            </div>
          </div>
        ) : aiResponse ? (
          <div className="space-y-4">
            <div className="prose prose-invert max-w-none">
              <div className="text-warm-gray/90 font-inter whitespace-pre-line leading-relaxed text-sm">
                {aiResponse}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <div className="text-6xl mb-4">💀</div>
            <p className="text-warm-gray/60 font-inter italic text-lg">
              *David Goggins está de pé, imóvel, esperando você ter coragem 
              de confessar suas fraquezas...*
            </p>
            <p className="text-red-400/60 font-inter text-sm">
              "O confronto só começa quando você parar de fugir da verdade."
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResponseSection;
