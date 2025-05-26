
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useSquad } from '@/hooks/useSquad';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useToast } from '@/hooks/use-toast';
import { Users, Crown, Copy, UserPlus, LogOut, Shield } from 'lucide-react';

const SquadManagement = () => {
  const { progress } = useUserProgress();
  const { currentSquad, createSquad, joinSquad, leaveSquad, getSquadByUserId } = useSquad();
  const { toast } = useToast();
  const [squadName, setSquadName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const userSquad = currentSquad || getSquadByUserId('current-user');

  const handleCreateSquad = async () => {
    if (!squadName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Digite um nome para o squad",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    try {
      const newSquad = createSquad(squadName.trim(), 'current-user', progress.username || 'Recruta');
      toast({
        title: "🏆 SQUAD CRIADO!",
        description: `Squad "${newSquad.name}" foi estabelecido com sucesso!`,
      });
      setSquadName('');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar squad",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinSquad = async () => {
    if (!inviteCode.trim()) {
      toast({
        title: "Código obrigatório",
        description: "Digite o código do convite",
        variant: "destructive"
      });
      return;
    }

    setIsJoining(true);
    try {
      const success = joinSquad(inviteCode.trim().toUpperCase(), 'current-user', progress.username || 'Recruta');
      if (success) {
        toast({
          title: "🎯 SQUAD CONFIRMADO!",
          description: "Bem-vindo ao esquadrão!",
        });
        setInviteCode('');
      } else {
        toast({
          title: "Código inválido",
          description: "Verifique o código do convite ou se o squad não está lotado",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao entrar no squad",
        variant: "destructive"
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handleLeaveSquad = () => {
    if (!userSquad) return;
    
    const success = leaveSquad(userSquad.id, 'current-user');
    if (success) {
      toast({
        title: "Squad abandonado",
        description: "Você deixou o esquadrão",
        variant: "destructive"
      });
    }
  };

  const copyInviteCode = () => {
    if (userSquad?.inviteCode) {
      navigator.clipboard.writeText(userSquad.inviteCode);
      toast({
        title: "Código copiado!",
        description: "Compartilhe com seus companheiros",
      });
    }
  };

  if (userSquad) {
    const isLeader = userSquad.members.find(m => m.userId === 'current-user')?.isLeader;
    
    return (
      <Card className="bg-military-card border-cyber-fuchsia/30 rivet-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-bebas text-cyber-fuchsia">
            <Shield size={24} />
            <span>ESQUADRÃO ATIVO</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-military-bg/50 p-4 rounded border border-military-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bebas text-xl text-cyber-cyan">{userSquad.name}</h3>
              <Badge className="bg-cyber-neon/20 border-cyber-neon/50 text-cyber-neon">
                XP +{Math.round((userSquad.xpMultiplier - 1) * 100)}%
              </Badge>
            </div>
            
            <div className="space-y-3">
              {userSquad.members.map((member) => (
                <div key={member.userId} className="flex items-center justify-between p-3 bg-dark-card/30 rounded border border-military-border">
                  <div className="flex items-center space-x-3">
                    <Users size={16} className="text-warm-gray" />
                    <span className="font-consolas text-warm-gray">{member.username}</span>
                    {member.isLeader && (
                      <Crown size={16} className="text-cyber-warning" />
                    )}
                  </div>
                  <div className="text-sm text-warm-gray/70">
                    Nível {member.level} • {member.totalPoints} XP
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dark-card/30 p-4 rounded border border-military-border">
            <h4 className="font-bebas text-warm-gray mb-2">CÓDIGO DE CONVITE</h4>
            <div className="flex items-center space-x-2">
              <Input 
                value={userSquad.inviteCode} 
                readOnly 
                className="font-consolas bg-military-bg border-military-border text-cyber-cyan"
              />
              <Button 
                onClick={copyInviteCode}
                variant="outline"
                size="sm"
                className="border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/20"
              >
                <Copy size={16} />
              </Button>
            </div>
            <p className="text-xs text-warm-gray/70 mt-2">
              Compartilhe este código para convidar até {3 - userSquad.members.length} recrutas
            </p>
          </div>

          <div className="flex space-x-3">
            {!isLeader && (
              <Button 
                onClick={handleLeaveSquad}
                variant="outline"
                className="flex-1 border-cyber-warning/50 text-cyber-warning hover:bg-cyber-warning/20 font-bebas"
              >
                <LogOut size={16} className="mr-2" />
                DEIXAR SQUAD
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-military-card border-cyber-fuchsia/30 rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-bebas text-cyber-fuchsia">
          <Users size={24} />
          <span>FORMAR ESQUADRÃO</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-dark-card/30 p-4 rounded border border-military-border">
          <h3 className="font-bebas text-warm-gray mb-2">CRIAR NOVO SQUAD</h3>
          <div className="space-y-3">
            <Input
              placeholder="Nome do esquadrão..."
              value={squadName}
              onChange={(e) => setSquadName(e.target.value)}
              className="bg-military-bg border-military-border text-warm-gray"
              maxLength={30}
            />
            <Button 
              onClick={handleCreateSquad}
              disabled={isCreating}
              className="w-full bg-cyber-fuchsia text-military-bg hover:bg-cyber-fuchsia/90 font-bebas"
            >
              {isCreating ? 'CRIANDO...' : 'FORMAR ESQUADRÃO'}
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-military-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-military-card px-2 text-warm-gray/70">OU</span>
          </div>
        </div>

        <div className="bg-dark-card/30 p-4 rounded border border-military-border">
          <h3 className="font-bebas text-warm-gray mb-2">ENTRAR EM SQUAD</h3>
          <div className="space-y-3">
            <Input
              placeholder="Código do convite..."
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              className="bg-military-bg border-military-border text-warm-gray font-consolas"
              maxLength={6}
            />
            <Button 
              onClick={handleJoinSquad}
              disabled={isJoining}
              variant="outline"
              className="w-full border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/20 font-bebas"
            >
              <UserPlus size={16} className="mr-2" />
              {isJoining ? 'ENTRANDO...' : 'ENTRAR NO SQUAD'}
            </Button>
          </div>
        </div>

        <div className="bg-cyber-warning/10 border border-cyber-warning/30 rounded p-3">
          <p className="text-xs text-cyber-warning font-consolas">
            ⚠️ ATENÇÃO: Em um squad, quando um membro falha na missão, 
            TODOS perdem 20% do XP. Escolha seus companheiros com sabedoria.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SquadManagement;
