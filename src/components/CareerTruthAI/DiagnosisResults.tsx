
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DiagnosisResultsProps {
  isAnalyzing: boolean;
  analysis: string;
}

const DiagnosisResults = ({ isAnalyzing, analysis }: DiagnosisResultsProps) => {
  return (
    <Card className="bg-dark-card border-dark-border relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600/50 to-transparent"></div>
      <CardHeader>
        <CardTitle className="text-2xl font-bebas text-warm-yellow flex items-center space-x-2">
          <span>📊</span>
          <span>LAUDO MÉDICO</span>
        </CardTitle>
        <CardDescription className="text-warm-gray/70 font-inter italic">
          {analysis ? 
            "Dr. Desculpas termina o diagnóstico e remove as luvas. 'O laudo está pronto.'" : 
            "O laboratório médico aguarda seus sintomas de autossabotagem..."
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
              <div className="absolute inset-0 rounded-full border-2 border-red-600/20"></div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-red-400 font-inter animate-pulse">
                🔬 <em>"Analisando padrões de autossabotagem..."</em>
              </p>
              <p className="text-warm-gray/60 font-inter text-sm">
                Dr. Desculpas examina cada sintoma meticulosamente
              </p>
            </div>
          </div>
        ) : analysis ? (
          <div className="space-y-4">
            <div className="prose prose-invert max-w-none">
              <div 
                className="text-warm-gray/90 font-inter whitespace-pre-line leading-relaxed text-sm"
                dangerouslySetInnerHTML={{ __html: analysis }}
              />
            </div>
            <div className="mt-8 pt-6 border-t border-dark-border space-y-3">
              <div className="bg-red-600/10 p-4 rounded border border-red-600/30">
                <p className="text-red-400 font-inter text-sm font-medium text-center">
                  🏥 "Diagnóstico completo. Seu tratamento está ativo. Check-in diário obrigatório."
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="text-6xl mb-4">🩺</div>
            <p className="text-warm-gray/60 font-inter italic">
              "Dr. Desculpas aguarda pacientemente seus sintomas de autossabotagem profissional. 
              Apenas então o diagnóstico médico poderá começar..."
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DiagnosisResults;
