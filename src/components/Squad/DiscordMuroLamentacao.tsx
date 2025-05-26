
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, ExternalLink, AlertTriangle, Skull, Settings } from 'lucide-react';

const DiscordMuroLamentacao = () => {
  const { playSound } = useSoundEffects();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const mockFailures = [
    {
      id: '1',
      username: 'Recruta_Silva',
      mission: 'NoFap Dia 15',
      timestamp: '2h atrás',
      shame_level: 'high',
      message: 'Quebrei no dia 15... de novo. Não aguento mais essa situação.'
    },
    {
      id: '2', 
      username: 'Soldado_Costa',
      mission: 'Exercício matinal',
      timestamp: '5h atrás',
      shame_level: 'medium',
      message: 'Dormi até meio-dia. Promessa quebrada mais uma vez.'
    },
    {
      id: '3',
      username: 'Cabo_Rodrigues',
      mission: 'Dieta sem açúcar',
      timestamp: '1 dia atrás',
      shame_level: 'low',
      message: 'Comi uma barra de chocolate. Volto amanhã.'
    }
  ];

  const connectDiscord = () => {
    playSound('squad_notification');
    toast({
      title: "🚧 INTEGRAÇÃO EM DESENVOLVIMENTO",
      description: "Discord Bot será lançado em breve. Cadastre-se na lista de espera!",
    });
  };

  const getShameColor = (level: string) => {
    switch (level) {
      case 'low': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400';
      case 'medium': return 'border-orange-500/50 bg-orange-500/10 text-orange-400';
      case 'high': return 'border-red-500/50 bg-red-500/10 text-red-400 animate-pulse';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  return (
    <Card className="bg-military-card border-purple-500/30 rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-bebas text-purple-400">
          <div className="flex items-center space-x-2">
            <MessageSquare size={24} />
            <span>DISCORD MURO DA LAMENTAÇÃO</span>
            <Badge className="bg-purple-500/20 border-purple-500/50 text-purple-400">
              BETA
            </Badge>
          </div>
          <Button
            onClick={() => setShowSettings(!showSettings)}
            size="sm"
            variant="ghost"
            className="text-purple-400 hover:bg-purple-500/10"
          >
            <Settings size={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-purple-900/20 border border-purple-500/30 rounded p-3 mb-6">
          <p className="text-xs text-purple-400 font-consolas mb-2">
            🤖 Bot Discord que expõe publicamente suas falhas para máxima pressão social
          </p>
          <p className="text-xs text-warm-gray/70 font-consolas">
            Falhou na missão? Será automaticamente postado no canal #muro-da-lamentacao para todos verem.
          </p>
        </div>

        {!isConnected ? (
          <div className="text-center py-8">
            <MessageSquare className="mx-auto text-purple-400/50 mb-4" size={48} />
            <div className="text-warm-gray/70 mb-4">
              Discord não conectado
            </div>
            <Button
              onClick={connectDiscord}
              className="bg-purple-600 text-white hover:bg-purple-700 font-bebas mb-4"
            >
              <ExternalLink size={16} className="mr-2" />
              CONECTAR DISCORD
            </Button>
            <div className="text-xs text-warm-gray/60">
              Requer permissões de administrador no seu servidor
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Connected Status */}
            <div className="p-3 bg-green-900/20 border border-green-500/30 rounded">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-bebas text-sm">CONECTADO</span>
                </div>
                <div className="text-xs text-green-400">#muro-da-lamentacao</div>
              </div>
            </div>

            {/* Recent Shame Posts */}
            <div>
              <h3 className="font-bebas text-purple-400 mb-3">ÚLTIMAS LAMENTAÇÕES PÚBLICAS:</h3>
              <div className="space-y-3">
                {mockFailures.map((failure) => (
                  <div 
                    key={failure.id}
                    className={`p-3 rounded border ${getShameColor(failure.shame_level)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Skull size={16} />
                        <span className="font-bebas text-sm">{failure.username}</span>
                        <Badge className="text-xs bg-black/20">
                          {failure.mission}
                        </Badge>
                      </div>
                      <div className="text-xs opacity-70">{failure.timestamp}</div>
                    </div>
                    <p className="text-xs font-consolas opacity-80">
                      "{failure.message}"
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge className={`${getShameColor(failure.shame_level)} text-xs`}>
                        SHAME: {failure.shame_level.toUpperCase()}
                      </Badge>
                      <div className="text-xs opacity-60">
                        👀 Visto por 247 pessoas
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-6 p-4 bg-military-bg/50 rounded border border-purple-500/30">
            <h3 className="font-bebas text-purple-400 mb-3">CONFIGURAÇÕES DO BOT</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-warm-gray">Auto-post falhas</span>
                <div className="w-12 h-6 bg-purple-600 rounded-full p-1">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-warm-gray">Incluir screenshot</span>
                <div className="w-12 h-6 bg-gray-600 rounded-full p-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-warm-gray">Notificar @everyone</span>
                <div className="w-12 h-6 bg-purple-600 rounded-full p-1">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-red-900/20 border border-red-500/30 rounded p-3">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle size={16} className="text-red-400" />
            <span className="font-bebas text-red-400 text-sm">AVISO EXTREMO</span>
          </div>
          <p className="text-xs text-red-400 font-consolas">
            Esta funcionalidade expõe suas falhas publicamente. Use apenas se realmente quer pressão social máxima.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscordMuroLamentacao;
