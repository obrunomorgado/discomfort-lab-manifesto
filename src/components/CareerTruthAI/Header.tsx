
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  isInTreatment: boolean;
}

const Header = ({ isInTreatment }: HeaderProps) => {
  return (
    <div className="text-center mb-12 relative">
      <div className="absolute inset-0 bg-warm-yellow/5 blur-3xl rounded-full"></div>
      <Badge className="bg-red-600 text-white font-bebas mb-4 relative z-10 animate-pulse">
        {isInTreatment ? "EM TRATAMENTO MÉDICO" : "AUTÓPSIA PROFISSIONAL"}
      </Badge>
      <h1 className="text-5xl md:text-6xl font-bebas text-warm-gray mb-6 tracking-wider relative z-10">
        SEM<span className="text-warm-yellow">DESCULPAS</span>IA
      </h1>
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-xl text-warm-gray/80 font-inter mb-4 italic">
          "Uma sala médica fria. Dr. Desculpas ajusta o estetoscópio e analisa os sintomas da sua autossabotagem profissional..."
        </p>
        <p className="text-lg text-warm-gray/60 font-inter">
          <strong className="text-warm-yellow">"Pronto para o diagnóstico da sua disfunção profissional?"</strong>
        </p>
      </div>
    </div>
  );
};

export default Header;
