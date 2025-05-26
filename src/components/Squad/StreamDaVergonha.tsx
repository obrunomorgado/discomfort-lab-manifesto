
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSquad } from '@/hooks/useSquad';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useToast } from '@/hooks/use-toast';
import { Youtube, Trophy, Flame, Skull, Crown, ExternalLink } from 'lucide-react';

interface SquadRanking {
  position: number;
  squadName: string;
  totalMissions: number;
  successRate: number;
  totalFailures: number;
  points: number;
  status: 'elite' | 'veteran' | 'rookie' | 'shame';
}

const StreamDaVergonha = () => {
  const { squads } = useSquad();
  const { progress } = useUserProgress();
  const { playSound } = useSoundEffects();
  const { toast } = useToast();
  const [isGeneratingStream, setIsGeneratingStream] = useState(false);

  // Mock ranking data based on squad performance
  const generateRankings = (): SquadRanking[] => {
    const rankings: SquadRanking[] = [
      {
        position: 1,
        squadName: "Punhos de Ferro",
        totalMissions: 45,
        successRate: 89.7,
        totalFailures: 5,
        points: 2847,
        status: 'elite'
      },
      {
        position: 2,
        squadName: "Lobos Solitários",
        totalMissions: 38,
        successRate: 82.4,
        totalFailures: 7,
        points: 2156,
        status: 'veteran'
      },
      {
        position: 3,
        squadName: "Guerreiros da Disciplina",
        totalMissions: 52,
        successRate: 78.8,
        totalFailures: 11,
        points: 1943,
        status: 'veteran'
      },
      {
        position: 4,
        squadName: "Recrutas Determinados",
        totalMissions: 23,
        successRate: 65.2,
        totalFailures: 8,
        points: 892,
        status: 'rookie'
      },
      {
        position: 5,
        squadName: "Esquadrão Fracasso",
        totalMissions: 31,
        successRate: 45.2,
        totalFailures: 17,
        points: 234,
        status: 'shame'
      }
    ];

    // Add user's squad if they have one
    if (squads.length > 0) {
      const userSquad = squads[0];
      rankings.splice(2, 0, {
        position: 3,
        squadName: userSquad.name,
        totalMissions: 12,
        successRate: 75.0,
        totalFailures: 3,
        points: 1200,
        status: 'veteran'
      });
    }

    return rankings;
  };

  const rankings = generateRankings();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'elite':
        return 'bg-cyber-neon/20 border-cyber-neon/50 text-cyber-neon';
      case 'veteran':
        return 'bg-cyber-cyan/20 border-cyber-cyan/50 text-cyber-cyan';
      case 'rookie':
        return 'bg-cyber-warning/20 border-cyber-warning/50 text-cyber-warning';
      case 'shame':
        return 'bg-red-500/20 border-red-500/50 text-red-400';
      default:
        return 'bg-warm-gray/20 border-warm-gray/50 text-warm-gray';
    }
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown size={20} className="text-cyber-neon" />;
      case 2:
        return <Trophy size={20} className="text-cyber-cyan" />;
      case 3:
        return <Trophy size={20} className="text-cyber-warning" />;
      default:
        return <Skull size={20} className="text-warm-gray" />;
    }
  };

  const handleGenerateStream = async () => {
    setIsGeneratingStream(true);
    playSound('squad_notification');
    
    // Simulate stream generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsGeneratingStream(false);
    toast({
      title: "🎥 STREAM GERADO!",
      description: "Ranking público foi atualizado no YouTube! Link copiado para área de transferência.",
    });
    
    // Mock YouTube link
    const mockYouTubeLink = "https://youtube.com/watch?v=ranking-vergonha-" + Date.now();
    navigator.clipboard.writeText(mockYouTubeLink);
  };

  return (
    <Card className="bg-military-card border-red-500/30 rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-bebas text-red-400">
          <div className="flex items-center space-x-2">
            <Youtube size={24} />
            <span>STREAM DA VERGONHA</span>
            <Badge className="bg-red-500/20 border-red-500/50 text-red-400 animate-pulse">
              AO VIVO
            </Badge>
          </div>
          <Button
            onClick={handleGenerateStream}
            disabled={isGeneratingStream}
            size="sm"
            className="bg-red-500 text-white hover:bg-red-600 font-bebas"
          >
            <ExternalLink size={16} className="mr-2" />
            {isGeneratingStream ? 'GERANDO...' : 'PUBLICAR RANKING'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Flame size={16} className="text-red-400" />
            <span className="font-bebas text-red-400">RANKING PÚBLICO DE VERGONHA</span>
          </div>
          <p className="text-xs text-red-300 font-consolas">
            💀 Os fracassos de todos os squads são expostos publicamente no YouTube. 
            Quanto pior o desempenho, maior a vergonha pública!
          </p>
        </div>

        <ScrollArea className="h-80">
          <div className="space-y-3">
            {rankings.map((squad) => (
              <div
                key={squad.position}
                className={`p-4 rounded border transition-all duration-300 ${
                  squad.squadName === squads[0]?.name 
                    ? 'ring-2 ring-cyber-fuchsia/50 bg-cyber-fuchsia/10' 
                    : 'bg-military-bg/30'
                } border-military-border hover:bg-military-border/20`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getPositionIcon(squad.position)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bebas text-lg text-warm-gray">
                          #{squad.position} {squad.squadName}
                        </span>
                        {squad.squadName === squads[0]?.name && (
                          <Badge className="bg-cyber-fuchsia/20 border-cyber-fuchsia/50 text-cyber-fuchsia text-xs">
                            SEU SQUAD
                          </Badge>
                        )}
                      </div>
                      <Badge className={`${getStatusColor(squad.status)} text-xs`}>
                        {squad.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bebas text-xl text-cyber-cyan">
                      {squad.points.toLocaleString()} pts
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm font-bebas text-warm-gray">MISSÕES</div>
                    <div className="text-lg font-consolas text-cyber-cyan">{squad.totalMissions}</div>
                  </div>
                  <div>
                    <div className="text-sm font-bebas text-warm-gray">SUCESSO</div>
                    <div className={`text-lg font-consolas ${
                      squad.successRate >= 80 ? 'text-cyber-neon' : 
                      squad.successRate >= 60 ? 'text-cyber-warning' : 'text-red-400'
                    }`}>
                      {squad.successRate.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bebas text-warm-gray">FRACASSOS</div>
                    <div className="text-lg font-consolas text-red-400 flex items-center justify-center space-x-1">
                      <Skull size={16} />
                      <span>{squad.totalFailures}</span>
                    </div>
                  </div>
                </div>

                {squad.status === 'shame' && (
                  <div className="mt-3 p-2 bg-red-500/20 border border-red-500/30 rounded">
                    <p className="text-xs text-red-300 font-consolas text-center animate-pulse">
                      🔥 ZONA DE VERGONHA PÚBLICA 🔥
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-6 bg-military-bg/50 p-4 rounded border border-military-border">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bebas text-warm-gray">PRÓXIMA ATUALIZAÇÃO</span>
            <span className="text-sm font-consolas text-cyber-cyan">23:59:45</span>
          </div>
          <div className="w-full bg-military-border rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full w-3/4 animate-pulse" />
          </div>
          <p className="text-xs text-warm-gray/70 mt-2 font-consolas">
            O ranking é atualizado a cada 24h e transmitido ao vivo no YouTube
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamDaVergonha;
