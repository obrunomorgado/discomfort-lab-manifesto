
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ExternalLink, DollarSign, Users, Copy, Target } from 'lucide-react';

const PotLink = () => {
  const { toast } = useToast();
  const [potData, setPotData] = useState({
    title: '',
    description: '',
    targetAmount: 100
  });
  const [isCreating, setIsCreating] = useState(false);
  const [activePot, setActivePot] = useState<any>(null);

  const handleCreatePot = async () => {
    if (!potData.title.trim()) {
      toast({
        title: "Título obrigatório",
        description: "Digite um título para o link do pot",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    
    // Simular criação do pot
    const newPot = {
      id: `pot-${Date.now()}`,
      ...potData,
      currentAmount: 0,
      contributors: [],
      isActive: true,
      createdAt: new Date(),
      publicUrl: `https://saladesconforto.com/pot/${Math.random().toString(36).substring(2, 8)}`
    };

    setActivePot(newPot);
    setPotData({ title: '', description: '', targetAmount: 100 });
    setIsCreating(false);

    toast({
      title: "🎯 LINK DO POT CRIADO!",
      description: "Agora seus amigos podem aumentar sua penalidade!",
    });
  };

  const copyPotLink = () => {
    if (activePot?.publicUrl) {
      navigator.clipboard.writeText(activePot.publicUrl);
      toast({
        title: "Link copiado!",
        description: "Compartilhe com seus amigos",
      });
    }
  };

  const mockContributors = [
    { name: "João Silva", amount: 25, message: "Vai que é tua! 💪", contributedAt: new Date() },
    { name: "Maria Santos", amount: 15, message: "Sem desculpas!", contributedAt: new Date() },
    { name: "Pedro Costa", amount: 10, message: "", contributedAt: new Date() }
  ];

  if (activePot) {
    return (
      <Card className="bg-military-card border-cyber-warning/30 rivet-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-bebas text-cyber-warning">
            <Target size={24} />
            <span>LINK DO POT ATIVO</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-military-bg/50 p-4 rounded border border-military-border">
            <h3 className="font-bebas text-xl text-cyber-cyan mb-2">{activePot.title}</h3>
            <p className="text-warm-gray/70 text-sm mb-4">{activePot.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="text-center">
                <div className="text-2xl font-bebas text-cyber-warning">
                  R$ {(activePot.currentAmount + 50).toFixed(2)}
                </div>
                <div className="text-xs text-warm-gray/70">ACUMULADO</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bebas text-cyber-neon">
                  R$ {activePot.targetAmount.toFixed(2)}
                </div>
                <div className="text-xs text-warm-gray/70">META</div>
              </div>
            </div>

            <div className="w-full bg-military-border rounded-full h-2 mb-4">
              <div 
                className="bg-cyber-warning h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.min(((activePot.currentAmount + 50) / activePot.targetAmount) * 100, 100)}%` 
                }}
              />
            </div>
          </div>

          <div className="bg-dark-card/30 p-4 rounded border border-military-border">
            <h4 className="font-bebas text-warm-gray mb-2 flex items-center space-x-2">
              <ExternalLink size={16} />
              <span>LINK PÚBLICO</span>
            </h4>
            <div className="flex items-center space-x-2">
              <Input 
                value={activePot.publicUrl} 
                readOnly 
                className="font-consolas bg-military-bg border-military-border text-cyber-cyan text-sm"
              />
              <Button 
                onClick={copyPotLink}
                variant="outline"
                size="sm"
                className="border-cyber-warning/50 text-cyber-warning hover:bg-cyber-warning/20"
              >
                <Copy size={16} />
              </Button>
            </div>
            <p className="text-xs text-warm-gray/70 mt-2">
              Compartilhe este link para que amigos possam aumentar sua penalidade
            </p>
          </div>

          {mockContributors.length > 0 && (
            <div className="bg-dark-card/30 p-4 rounded border border-military-border">
              <h4 className="font-bebas text-warm-gray mb-3 flex items-center space-x-2">
                <Users size={16} />
                <span>CONTRIBUIÇÕES ({mockContributors.length})</span>
              </h4>
              <div className="space-y-2">
                {mockContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-military-bg/30 rounded">
                    <div>
                      <div className="font-consolas text-warm-gray text-sm">{contributor.name}</div>
                      {contributor.message && (
                        <div className="text-xs text-warm-gray/70 italic">"{contributor.message}"</div>
                      )}
                    </div>
                    <Badge className="bg-cyber-warning/20 border-cyber-warning/50 text-cyber-warning">
                      +R$ {contributor.amount}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button 
            onClick={() => setActivePot(null)}
            variant="outline"
            className="w-full border-military-border text-warm-gray hover:bg-military-border/20 font-bebas"
          >
            DESATIVAR LINK
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-military-card border-cyber-warning/30 rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-bebas text-cyber-warning">
          <Target size={24} />
          <span>CRIAR LINK DO POT</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-cyber-warning/10 border border-cyber-warning/30 rounded p-3">
          <p className="text-xs text-cyber-warning font-consolas">
            💡 O Link do Pot permite que amigos aumentem sua penalidade financeira. 
            Quanto mais gente contribuir, maior a pressão para você não falhar!
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bebas text-warm-gray mb-2">
              TÍTULO DA PENALIDADE
            </label>
            <Input
              placeholder="Ex: Me ajudem a parar de fumar!"
              value={potData.title}
              onChange={(e) => setPotData(prev => ({ ...prev, title: e.target.value }))}
              className="bg-military-bg border-military-border text-warm-gray"
              maxLength={50}
            />
          </div>

          <div>
            <label className="block text-sm font-bebas text-warm-gray mb-2">
              DESCRIÇÃO
            </label>
            <Textarea
              placeholder="Descreva seu objetivo e peça ajuda dos amigos..."
              value={potData.description}
              onChange={(e) => setPotData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-military-bg border-military-border text-warm-gray resize-none"
              rows={3}
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-sm font-bebas text-warm-gray mb-2">
              META INICIAL (R$)
            </label>
            <Input
              type="number"
              min="10"
              max="1000"
              step="10"
              value={potData.targetAmount}
              onChange={(e) => setPotData(prev => ({ ...prev, targetAmount: Number(e.target.value) }))}
              className="bg-military-bg border-military-border text-warm-gray"
            />
            <p className="text-xs text-warm-gray/70 mt-1">
              Amigos poderão contribuir com qualquer valor acima desta meta
            </p>
          </div>
        </div>

        <Button 
          onClick={handleCreatePot}
          disabled={isCreating}
          className="w-full bg-cyber-warning text-military-bg hover:bg-cyber-warning/90 font-bebas"
        >
          <DollarSign size={16} className="mr-2" />
          {isCreating ? 'CRIANDO...' : 'CRIAR LINK DO POT'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PotLink;
