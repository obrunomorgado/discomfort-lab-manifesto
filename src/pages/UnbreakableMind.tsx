
import { useState } from "react";
import Header from "@/components/UnbreakableMind/Header";
import SceneSetting from "@/components/UnbreakableMind/SceneSetting";
import WarningAlert from "@/components/UnbreakableMind/WarningAlert";
import ConfessionSection from "@/components/UnbreakableMind/ConfessionSection";
import ResponseSection from "@/components/UnbreakableMind/ResponseSection";
import CharacterBackground from "@/components/UnbreakableMind/CharacterBackground";

const UnbreakableMind = () => {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    
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
        <Header />
        <SceneSetting />
        <WarningAlert />
        
        <div className="grid lg:grid-cols-2 gap-8">
          <ConfessionSection 
            userInput={userInput}
            setUserInput={setUserInput}
            isLoading={isLoading}
            hasStarted={hasStarted}
            onSubmit={handleSubmit}
            onReset={resetChat}
          />
          <ResponseSection 
            aiResponse={aiResponse}
            isLoading={isLoading}
          />
        </div>

        <CharacterBackground />
      </div>
    </div>
  );
};

export default UnbreakableMind;
