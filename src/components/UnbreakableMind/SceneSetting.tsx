
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";

const SceneSetting = () => {
  return (
    <Card className="bg-gradient-to-r from-red-600/20 via-red-800/10 to-black/30 border-red-600/30 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent opacity-30"></div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400 font-bebas relative z-10">
          <Flame size={24} className="animate-pulse" />
          A SALA DO CONFRONTO
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-4 text-warm-gray/90 font-inter">
          <p className="italic text-lg">
            *Uma sala escura. Uma única luz forte no centro. David Goggins está de pé, 
            imóvel como uma estátua de ferro, os braços cruzados. Seus olhos penetram 
            sua alma antes mesmo de você abrir a boca.*
          </p>
          <div className="bg-red-600/20 p-4 rounded border-l-4 border-red-600">
            <p className="text-red-300 font-medium">
              **"Então você veio até mim porque sua vida virou uma zona de conforto patética? 
              Ótimo. Vamos ver se você tem coragem de encarar a verdade."**
            </p>
            <p className="text-red-200/70 text-sm mt-2 italic">
              - David Goggins, ajustando os punhos e olhando diretamente nos seus olhos
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SceneSetting;
