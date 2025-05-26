
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CharacterBackground = () => {
  return (
    <Card className="bg-dark-card/50 border-dark-border mt-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent rounded-lg"></div>
      <CardHeader>
        <CardTitle className="text-xl font-bebas text-warm-gray relative z-10 flex items-center space-x-2">
          <span>🎭</span>
          <span>SOBRE DAVID GOGGINS</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid md:grid-cols-3 gap-6 text-sm font-inter">
          <div className="space-y-2">
            <h3 className="font-bebas text-red-400 mb-2">🔥 O HOMEM</h3>
            <p className="text-warm-gray/70 italic">
              Ex-Navy SEAL, ultramaratonista, autor de "Can't Hurt Me". 
              Transformou uma vida de 136kg e depressão em máquina imparável.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bebas text-red-400 mb-2">⚡ A FILOSOFIA</h3>
            <p className="text-warm-gray/70 italic">
              "A vida vai te bater. Mas você decide se fica no chão ou se levanta 
              mais forte. Eu escolho me levantar sempre."
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bebas text-red-400 mb-2">💀 O MÉTODO</h3>
            <p className="text-warm-gray/70 italic">
              Confronto brutal com a realidade, eliminação de desculpas, 
              e construção de mentalidade inquebrantável através da dor.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterBackground;
