
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas text-warm-gray mb-6 tracking-wider">
            BEM-VINDO À
            <span className="block text-warm-yellow">SALA DO DESCONFORTO</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-warm-gray/80 mb-4 font-inter">
            Aqui sua zona de conforto é revogada.
          </p>
          
          <p className="text-lg text-warm-gray/60 mb-12 max-w-2xl mx-auto font-inter">
            A única plataforma que usa o desconforto como ferramenta de crescimento. 
            Pare de se enganar. Enfrente a verdade sobre você mesmo.
          </p>

          <Link to="/career-truth-ai">
            <Button 
              size="lg" 
              className="bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas text-xl px-8 py-6 tracking-wider warning-glow animate-pulse-warning"
            >
              ENFRENTAR MEUS SABOTADORES →
            </Button>
          </Link>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-16 px-4 bg-dark-card/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bebas text-warm-gray mb-8 text-center">
            O MANIFESTO
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-dark-card border-dark-border p-6 hover-lift">
              <h3 className="text-2xl font-bebas text-warm-yellow mb-4">SEM MIMIMI</h3>
              <p className="text-warm-gray/80 font-inter">
                Você não precisa de mais motivação. Você precisa de confronto. 
                Aqui não existe "pode ser que", "talvez" ou "quando eu estiver pronto".
              </p>
            </Card>
            
            <Card className="bg-dark-card border-dark-border p-6 hover-lift">
              <h3 className="text-2xl font-bebas text-warm-yellow mb-4">SENTA QUE LÁ VEM CHORO</h3>
              <p className="text-warm-gray/80 font-inter">
                Nossa AI não vai passar a mão na sua cabeça. Ela vai mostrar 
                exatamente onde você está se sabotando e por quê.
              </p>
            </Card>
            
            <Card className="bg-dark-card border-dark-border p-6 hover-lift">
              <h3 className="text-2xl font-bebas text-warm-yellow mb-4">CRESCIMENTO VIA DESCONFORTO</h3>
              <p className="text-warm-gray/80 font-inter">
                Todo mundo quer resultado, ninguém quer pagar o preço. 
                Aqui você paga primeiro, se beneficia depois.
              </p>
            </Card>
            
            <Card className="bg-dark-card border-dark-border p-6 hover-lift">
              <h3 className="text-2xl font-bebas text-warm-yellow mb-4">ZERO AÇÚCAR</h3>
              <p className="text-warm-gray/80 font-inter">
                Nada de "você consegue, campeão!". Aqui é "você está falhando, 
                vamos descobrir como consertar isso".
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bebas text-warm-gray mb-6">
            PRONTO PARA A VERDADE?
          </h2>
          
          <p className="text-lg text-warm-gray/60 mb-8 font-inter">
            A maioria das pessoas prefere viver na ilusão. Se você chegou até aqui, 
            talvez você seja diferente. Talvez.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/testes">
              <Button 
                variant="outline" 
                size="lg"
                className="border-warm-yellow text-warm-yellow hover:bg-warm-yellow hover:text-dark-bg font-bebas text-lg px-6 py-4"
              >
                VER TODOS OS TESTES
              </Button>
            </Link>
            
            <Link to="/career-truth-ai">
              <Button 
                size="lg"
                className="bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas text-lg px-6 py-4"
              >
                COMEÇAR AGORA
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
