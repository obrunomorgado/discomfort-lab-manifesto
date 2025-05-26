
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useToast } from '@/hooks/use-toast';
import { Users, Award, Star, Clock, MessageCircle, Shield } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  level: number;
  specialties: string[];
  successRate: number;
  totalMentored: number;
  rating: number;
  isOnline: boolean;
  lastActivity: string;
  bio: string;
  challenges: string[];
}

interface MentorshipRequest {
  id: string;
  challengeType: string;
  description: string;
  duration: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'matched' | 'active' | 'completed';
}

const ApadrinhaMeuDesafio = () => {
  const { playSound } = useSoundEffects();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'request' | 'mentors' | 'my-requests'>('request');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const mentors: Mentor[] = [
    {
      id: 'mentor-1',
      name: 'Sargento Silva',
      level: 15,
      specialties: ['NoFap', 'Fitness', 'Disciplina'],
      successRate: 92,
      totalMentored: 47,
      rating: 4.8,
      isOnline: true,
      lastActivity: 'Online agora',
      bio: 'Ex-militar com 8 anos lutando contra vícios. Especialista em disciplina e rotinas rígidas.',
      challenges: ['NoFap 2 anos', 'Maratona completa', '365 dias sem álcool']
    },
    {
      id: 'mentor-2', 
      name: 'Capitão Rodrigues',
      level: 22,
      specialties: ['Produtividade', 'Mindset', 'Carreira'],
      successRate: 89,
      totalMentored: 73,
      rating: 4.9,
      isOnline: false,
      lastActivity: '2h atrás',
      bio: 'CEO que superou vício em pornografia e procrastinação. Foco em alta performance.',
      challenges: ['Startup unicórnio', 'NoFap 3 anos', 'Rotina 5am por 5 anos']
    },
    {
      id: 'mentor-3',
      name: 'Major Costa',
      level: 18,
      specialties: ['Relacionamentos', 'Ansiedade', 'Espiritualidade'],
      successRate: 94,
      totalMentored: 31,
      rating: 5.0,
      isOnline: true,
      lastActivity: 'Online agora',
      bio: 'Psicólogo e coach espiritual. Especialista em relacionamentos saudáveis pós-vício.',
      challenges: ['Casamento restaurado', 'Depressão superada', 'Mentor há 4 anos']
    }
  ];

  const myRequests: MentorshipRequest[] = [
    {
      id: 'req-1',
      challengeType: 'NoFap 90 dias',
      description: 'Preciso de ajuda para quebrar ciclo de 15 anos. Já tentei várias vezes sozinho.',
      duration: '3 meses',
      urgency: 'high',
      status: 'pending'
    },
    {
      id: 'req-2',
      challengeType: 'Rotina matinal',
      description: 'Quero estabelecer rotina de acordar 5h e exercitar-me.',
      duration: '1 mês',
      urgency: 'medium',
      status: 'matched'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'border-green-500/50 bg-green-500/10 text-green-400';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400';
      case 'high': return 'border-red-500/50 bg-red-500/10 text-red-400';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400';
      case 'matched': return 'border-blue-500/50 bg-blue-500/10 text-blue-400';
      case 'active': return 'border-green-500/50 bg-green-500/10 text-green-400';
      case 'completed': return 'border-cyber-cyan/50 bg-cyber-cyan/10 text-cyber-cyan';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const requestMentor = (mentor: Mentor) => {
    playSound('squad_notification');
    toast({
      title: "🤝 SOLICITAÇÃO ENVIADA!",
      description: `Pedido de mentoria enviado para ${mentor.name}`,
    });
  };

  const submitChallenge = () => {
    playSound('mission_success');
    toast({
      title: "📋 DESAFIO CADASTRADO!",
      description: "Procuraremos o melhor mentor para você",
    });
  };

  return (
    <Card className="bg-military-card border-cyber-cyan/30 rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-bebas text-cyber-cyan">
          <div className="flex items-center space-x-2">
            <Users size={24} />
            <span>APADRINHA MEU DESAFIO</span>
            <Badge className="bg-cyber-cyan/20 border-cyber-cyan/50 text-cyber-cyan">
              MENTORSHIP
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-cyber-cyan/10 border border-cyber-cyan/30 rounded p-3 mb-6">
          <p className="text-xs text-cyber-cyan font-consolas">
            🤝 Conecte-se com veteranos que já venceram os mesmos desafios que você enfrenta. Mentoria real de quem já passou por isso.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          {[
            { key: 'request', label: 'PEDIR AJUDA', icon: MessageCircle },
            { key: 'mentors', label: 'MENTORES', icon: Shield },
            { key: 'my-requests', label: 'MEUS PEDIDOS', icon: Clock }
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => setActiveTab(key as any)}
              variant={activeTab === key ? 'default' : 'outline'}
              size="sm"
              className={`font-bebas text-xs ${
                activeTab === key 
                  ? 'bg-cyber-cyan text-military-bg' 
                  : 'border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/10'
              }`}
            >
              <Icon size={14} className="mr-1" />
              {label}
            </Button>
          ))}
        </div>

        {/* Request Tab */}
        {activeTab === 'request' && (
          <div className="space-y-4">
            <div className="p-4 bg-military-bg/50 rounded border border-cyber-cyan/20">
              <h3 className="font-bebas text-cyber-cyan mb-3">CRIAR PEDIDO DE MENTORIA</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-warm-gray/70 mb-1 block">Tipo de Desafio</label>
                  <select className="w-full p-2 bg-military-bg border border-cyber-cyan/30 rounded text-warm-gray text-sm">
                    <option>NoFap</option>
                    <option>Fitness/Exercícios</option>
                    <option>Produtividade</option>
                    <option>Relacionamentos</option>
                    <option>Carreira</option>
                    <option>Vícios em geral</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-warm-gray/70 mb-1 block">Descrição do Problema</label>
                  <textarea 
                    className="w-full p-2 bg-military-bg border border-cyber-cyan/30 rounded text-warm-gray text-sm h-20"
                    placeholder="Descreva seu desafio e por que precisa de ajuda..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-warm-gray/70 mb-1 block">Duração</label>
                    <select className="w-full p-2 bg-military-bg border border-cyber-cyan/30 rounded text-warm-gray text-sm">
                      <option>1 semana</option>
                      <option>1 mês</option>
                      <option>3 meses</option>
                      <option>6 meses</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-warm-gray/70 mb-1 block">Urgência</label>
                    <select className="w-full p-2 bg-military-bg border border-cyber-cyan/30 rounded text-warm-gray text-sm">
                      <option>Baixa</option>
                      <option>Média</option>
                      <option>Alta</option>
                    </select>
                  </div>
                </div>
                <Button
                  onClick={submitChallenge}
                  className="w-full bg-cyber-cyan text-military-bg hover:bg-cyber-cyan/90 font-bebas"
                >
                  📋 SOLICITAR MENTORIA
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Mentors Tab */}
        {activeTab === 'mentors' && (
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {mentors.map((mentor) => (
                <div 
                  key={mentor.id}
                  className="p-4 bg-military-bg/50 rounded border border-cyber-cyan/30 hover:border-cyber-cyan/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Shield size={24} className="text-cyber-cyan" />
                        {mentor.isOnline && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-military-bg"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bebas text-cyber-cyan">{mentor.name}</h3>
                        <div className="flex items-center space-x-2 text-xs">
                          <Badge className="bg-cyber-cyan/20 border-cyber-cyan/50 text-cyber-cyan">
                            LVL {mentor.level}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Star size={12} className="text-yellow-400" />
                            <span className="text-yellow-400">{mentor.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-warm-gray/70">{mentor.lastActivity}</div>
                      <div className="text-xs text-cyber-cyan">{mentor.successRate}% sucesso</div>
                    </div>
                  </div>

                  <p className="text-xs text-warm-gray/80 font-consolas mb-3">
                    {mentor.bio}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {mentor.specialties.map((spec) => (
                      <Badge key={spec} className="bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-warm-gray/70">
                      {mentor.totalMentored} pessoas mentoradas
                    </div>
                    <Button
                      onClick={() => requestMentor(mentor)}
                      size="sm"
                      className="bg-cyber-cyan text-military-bg hover:bg-cyber-cyan/90 font-bebas text-xs"
                    >
                      🤝 SOLICITAR
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* My Requests Tab */}
        {activeTab === 'my-requests' && (
          <div className="space-y-4">
            {myRequests.map((request) => (
              <div 
                key={request.id}
                className="p-4 bg-military-bg/50 rounded border border-cyber-cyan/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bebas text-cyber-cyan">{request.challengeType}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getUrgencyColor(request.urgency)} text-xs`}>
                      {request.urgency.toUpperCase()}
                    </Badge>
                    <Badge className={`${getStatusColor(request.status)} text-xs`}>
                      {request.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-warm-gray/80 font-consolas mb-3">
                  {request.description}
                </p>
                <div className="flex items-center justify-between text-xs text-warm-gray/70">
                  <span>Duração: {request.duration}</span>
                  {request.status === 'matched' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-bebas text-xs">
                      💬 CHAT COM MENTOR
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApadrinhaMeuDesafio;
