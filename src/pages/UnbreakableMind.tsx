
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Zap, Flame, Target } from "lucide-react";
import { Link } from "react-router-dom";

const UnbreakableMind = () => {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    
    // Simulate Goggins' intense response with storytelling
    setTimeout(() => {
      const mockResponse = `🔥 **GOGGINS SURGE DAS SOMBRAS...**

*O ambiente fica tenso. David Goggins caminha lentamente em sua direção, os músculos contraídos, o olhar penetrante como uma lâmina. Ele para a poucos centímetros do seu rosto. O silêncio é ensurdecedor.*

---

**"ENTÃO É ISSO QUE VOCÊ ME TRAZ?"** 

*Goggins crava os olhos nos seus, a voz baixa e controlada, mas carregada de uma intensidade que faz o ar vibrar.*

**"Você quer que eu ouça suas desculpas? Suas justificativas patéticas?"**

*Ele se afasta alguns passos, balançando a cabeça com desprezo.*

---

🎯 **O CONFRONTO BRUTAL**

*Goggins se vira bruscamente para você, apontando o dedo.*

**"ESCUTE BEM, PORQUE VOU FALAR ISSO UMA VEZ SÓ:"**

*"Você chegou até mim porque sua vida virou uma piada. Você se tornou MOLE. Cada dia que você acorda e escolhe o caminho fácil, você está matando quem você poderia ser."*

*Ele caminha em círculos ao seu redor, como um predador.*

**"Você sabe qual é seu maior inimigo? NÃO SOU EU. É a voz na sua cabeça que sussurra 'você não consegue' toda manhã."**

---

⚡ **A REVELAÇÃO IMPLACÁVEL**

*Goggins para diretamente na sua frente, os punhos cerrados.*

**"Você quer saber a VERDADE sobre sua situação?"**

*"Você construiu uma prisão de conforto e chamou de vida. Cada desculpa é mais uma grade. Cada 'amanhã eu começo' é mais um cadeado."*

*Ele bate o punho na mesa com força.*

**"MAS EU VOU TE DAR UMA OPORTUNIDADE!"**

---

🔥 **O DESAFIO EXTREMO - OS PRÓXIMOS 21 DIAS**

*Goggins pega uma folha e começa a escrever com violência, cada palavra uma sentença.*

**"FASE 1 - SEMANA 1: QUEBRAR AS CORRENTES"**
*"Você vai acordar às 4:30 TODOS OS DIAS. Sem negociação. Sem 'só hoje não'. Banho frio obrigatório."*
*"Cada vez que sua mente disser 'não posso', você faz EXATAMENTE o contrário."*

**"FASE 2 - SEMANA 2: CONSTRUIR O GUERREIRO"**
*"Você não vai mais reconhecer a pessoa fraca que era. Cada desafio vai ser encarado de frente."*
*"Pare de pedir aprovação dos outros. Você não precisa de plateia para ser forte."*

**"FASE 3 - SEMANA 3: TORNAR-SE IMPARÁVEL"**
*"Você vai PROCURAR o desconforto. Vai ABRAÇAR a dor. Porque é lá que mora seu verdadeiro eu."*

---

💀 **O ULTIMATO FINAL**

*Goggins se inclina para perto, sussurrando intensamente.*

**"Agora você tem duas opções, e apenas duas:"**

*"Opção 1: Você aceita este desafio e vira o jogo da sua vida nos próximos 21 dias."*

*"Opção 2: Você sai daqui, volta para sua zona de conforto, e continuará sendo a versão fracassada de si mesmo pelo resto da vida."*

*Ele se afasta e cruza os braços.*

**"Eu já transformei homens que choravam como bebês em máquinas imparáveis. Mas só funciona se você REALMENTE quiser parar de ser uma vítima."**

---

*O silêncio pesa no ar. Goggins olha diretamente nos seus olhos, esperando sua decisão.*

**"Então... o que vai ser? Você vai continuar sendo FRACO ou vai descobrir do que é realmente capaz?"**

*"A escolha é sua. Mas saiba que depois desta conversa, você não pode mais fingir que não sabe o que precisa fazer."*

**A GUERRA CONTRA VOCÊ MESMO COMEÇA AGORA.**
      `;
      
      setAiResponse(mockResponse);
      setIsLoading(false);
      setHasStarted(true);
    }, 3000);
  };

  const resetChat = () => {
    setUserInput("");
    setAiResponse("");
    setHasStarted(false);
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-b from-dark-bg via-dark-bg/95 to-red-900/10">
      <div className="max-w-4xl mx-auto">
        {/* Cinematic Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/testes" 
            className="text-warm-gray hover:text-warm-yellow transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div className="relative">
            <div className="absolute inset-0 bg-red-600/10 blur-3xl rounded-full"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-red-600 text-white font-bebas text-xs animate-pulse">
                  CONFRONTO EXTREMO
                </Badge>
                <h1 className="text-4xl font-bebas text-warm-gray tracking-wider">
                  UNBREAKABLE MIND
                </h1>
              </div>
              <p className="text-warm-gray/60 font-inter italic">
                "David Goggins está esperando você na sala. Prepare-se para o confronto da sua vida."
              </p>
            </div>
          </div>
        </div>

        {/* Dramatic Scene Setting */}
        <Card className="bg-gradient-to-r from-red-600/20 via-red-800/10 to-black/30 border-red-600/30 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23dc2626" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
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

        {/* Warning with Character Voice */}
        <Alert className="bg-yellow-600/10 border-yellow-600/30 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/5 to-transparent"></div>
          <AlertDescription className="relative z-10">
            <div className="flex items-start space-x-3">
              <Zap size={24} className="text-yellow-400 animate-pulse" />
              <div>
                <strong className="text-yellow-400 font-bebas">GOGGINS ADVERTE:</strong>
                <p className="text-warm-gray/80 font-inter mt-1">
                  "Eu não sou seu terapeuta. Não sou seu amigo. Sou o espelho que vai mostrar 
                  quem você realmente é. Se veio aqui procurando carinho, pode dar meia volta e sair."
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Main Confrontation Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Confession Section */}
          <Card className="bg-dark-card border-dark-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-warm-yellow to-red-600"></div>
            <CardHeader>
              <CardTitle className="text-2xl font-bebas text-warm-yellow flex items-center space-x-2">
                <Target size={24} />
                <span>SUA CONFISSÃO</span>
              </CardTitle>
              <CardDescription className="text-warm-gray/70 font-inter italic">
                *Goggins bate os dedos na mesa impatientemente.* 
                "Fale logo. Que comportamento patético você quer esmagar hoje?"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!hasStarted ? (
                <div className="space-y-4">
                  <div className="bg-red-600/20 p-4 rounded border border-red-600/50 space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <p className="text-red-300 font-inter font-medium text-sm">
                        GOGGINS ESTÁ GRAVANDO
                      </p>
                    </div>
                    <p className="text-red-200 font-inter text-sm italic">
                      *"Não me venha com meias verdades. Eu quero saber EXATAMENTE 
                      que mentiras você conta para si mesmo todo dia. Que desculpas 
                      você usa para justificar sua mediocridade."*
                    </p>
                  </div>
                  
                  <Textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="*Goggins se inclina para frente, os olhos fixos nos seus* 'Vamos lá. Me conta que comportamento fraco você quer destruir hoje. E não me poupe dos detalhes.'"
                    className="min-h-[150px] bg-dark-bg border-dark-border text-warm-gray font-inter resize-none focus:border-red-500/50 transition-colors"
                    disabled={isLoading}
                  />
                  
                  <Button
                    onClick={handleSubmit}
                    disabled={!userInput.trim() || isLoading}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 font-bebas text-lg py-6 tracking-wider transition-all duration-300 hover:scale-[1.02]"
                  >
                    {isLoading ? "🔥 GOGGINS ESTÁ ANALISANDO..." : "⚡ INICIAR CONFRONTO"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* User Input Display */}
                  <div className="bg-dark-bg/50 p-4 rounded border border-dark-border">
                    <h3 className="text-warm-yellow font-bebas mb-2 flex items-center space-x-2">
                      <span>🎯</span>
                      <span>SEU COMPORTAMENTO ALVO:</span>
                    </h3>
                    <p className="text-warm-gray/80 font-inter">{userInput}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      onClick={resetChat}
                      variant="outline"
                      className="flex-1 border-warm-yellow text-warm-yellow hover:bg-warm-yellow hover:text-dark-bg font-bebas tracking-wider"
                    >
                      NOVO CONFRONTO
                    </Button>
                    <Link to="/testes" className="flex-1">
                      <Button className="w-full bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas tracking-wider">
                        OUTROS TESTES
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Goggins Response Section */}
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
        </div>

        {/* Character Background */}
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
      </div>
    </div>
  );
};

export default UnbreakableMind;
