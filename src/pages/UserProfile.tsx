import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { User, Trophy, CreditCard, Bell, Settings } from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';
import CreditCounter from '@/components/Credits/CreditCounter';
import NotificationSettings from '@/components/Notifications/NotificationSettings';

const UserProfile = () => {
  const { progress, getStats } = useUserProgress();
  const stats = getStats();

  const getBadgesByCategory = (category: string) => {
    return progress.badges.filter(badge => badge.category === category);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-b from-dark-bg to-dark-bg/90">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="bg-dark-card border-dark-border mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-warm-yellow rounded-full flex items-center justify-center">
                <User size={32} className="text-dark-bg" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bebas text-warm-gray">
                  {progress.username || "RECRUTA"}
                </CardTitle>
                <CardDescription className="text-warm-gray/70">
                  Nível {progress.level} • {stats.totalPoints} pontos
                </CardDescription>
              </div>
            </div>
            <CreditCounter credits={progress.credits} />
          </CardHeader>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-dark-card border-dark-border">
            <TabsTrigger value="overview" className="font-bebas">
              VISÃO GERAL
            </TabsTrigger>
            <TabsTrigger value="badges" className="font-bebas">
              BADGES
            </TabsTrigger>
            <TabsTrigger value="notifications" className="font-bebas">
              NOTIFICAÇÕES
            </TabsTrigger>
            <TabsTrigger value="settings" className="font-bebas">
              CONFIGURAÇÕES
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-dark-card border-dark-border">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bebas text-warm-yellow">
                    {stats.testsCompleted}
                  </div>
                  <div className="text-xs text-warm-gray/70">
                    Testes Completos
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-dark-card border-dark-border">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bebas text-green-400">
                    {stats.currentStreak}
                  </div>
                  <div className="text-xs text-warm-gray/70">
                    Sequência Atual
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-dark-card border-dark-border">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bebas text-blue-400">
                    {stats.badgesEarned}
                  </div>
                  <div className="text-xs text-warm-gray/70">
                    Badges Conquistadas
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-dark-card border-dark-border">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bebas text-red-400">
                    {stats.debtPoints}
                  </div>
                  <div className="text-xs text-warm-gray/70">
                    Pontos de Dívida
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Treatment Status */}
            {progress.isInTreatment && (
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle className="text-warm-yellow font-bebas">
                    STATUS DE TRATAMENTO
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-warm-gray">Dívida Total:</span>
                      <span className="text-red-400 font-bebas">{progress.debtPoints} pontos</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-warm-gray">Ações Pendentes:</span>
                      <span className="text-orange-400 font-bebas">{progress.dailyActions.filter(a => !a.completed).length}</span>
                    </div>
                    {progress.treatmentStartDate && (
                      <div className="flex justify-between">
                        <span className="text-warm-gray">Início do Tratamento:</span>
                        <span className="text-warm-gray/70">{formatDate(progress.treatmentStartDate)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-warm-gray">
                  <Trophy size={20} />
                  <span>BADGES DE PROGRESSO</span>
                </CardTitle>
                <CardDescription>
                  Conquistas desbloqueadas ao longo da sua jornada
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Completion Badges */}
                <div>
                  <h3 className="text-lg font-bebas text-warm-yellow mb-2">
                    COMPLETUDE
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getBadgesByCategory('completion').map((badge) => (
                      <Badge key={badge.id} className="bg-green-600 text-dark-bg">
                        {badge.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Consistency Badges */}
                <div>
                  <h3 className="text-lg font-bebas text-blue-400 mb-2">
                    CONSISTÊNCIA
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getBadgesByCategory('consistency').map((badge) => (
                      <Badge key={badge.id} className="bg-blue-600 text-dark-bg">
                        {badge.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Intensity Badges */}
                <div>
                  <h3 className="text-lg font-bebas text-red-400 mb-2">
                    INTENSIDADE
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getBadgesByCategory('intensity').map((badge) => (
                      <Badge key={badge.id} className="bg-red-600 text-dark-bg">
                        {badge.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Honesty Badges */}
                <div>
                  <h3 className="text-lg font-bebas text-orange-400 mb-2">
                    HONESTIDADE
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getBadgesByCategory('honesty').map((badge) => (
                      <Badge key={badge.id} className="bg-orange-600 text-dark-bg">
                        {badge.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Special Badges */}
                <div>
                  <h3 className="text-lg font-bebas text-purple-400 mb-2">
                    ESPECIAIS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getBadgesByCategory('special').map((badge) => (
                      <Badge key={badge.id} className="bg-purple-600 text-dark-bg">
                        {badge.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Recovery Badges */}
                {progress.isInTreatment && (
                  <div>
                    <h3 className="text-lg font-bebas text-red-500 mb-2">
                      RECUPERAÇÃO
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {getBadgesByCategory('recovery').map((badge) => (
                        <Badge key={badge.id} className="bg-red-700 text-dark-bg">
                          {badge.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Badges */}
                <div>
                  <h3 className="text-lg font-bebas text-warm-yellow mb-2">
                    FINANCEIRO
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getBadgesByCategory('payment').map((badge) => (
                      <Badge key={badge.id} className="bg-warm-yellow text-dark-bg">
                        {badge.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Referral Badges */}
                <div>
                  <h3 className="text-lg font-bebas text-green-500 mb-2">
                    REFERÊNCIAS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getBadgesByCategory('referral').map((badge) => (
                      <Badge key={badge.id} className="bg-green-500 text-dark-bg">
                        {badge.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Shame Badges */}
                <div>
                  <h3 className="text-lg font-bebas text-gray-500 mb-2">
                    VERGONHA
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getBadgesByCategory('shame').map((badge) => (
                      <Badge key={badge.id} className="bg-gray-500 text-dark-bg">
                        {badge.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Medical Badges */}
                <div>
                  <h3 className="text-lg font-bebas text-red-600 mb-2">
                    MÉDICO
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getBadgesByCategory('medical').map((badge) => (
                      <Badge key={badge.id} className="bg-red-600 text-dark-bg">
                        {badge.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-warm-gray">
                  <Settings size={20} />
                  <span>CONFIGURAÇÕES GERAIS</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-warm-gray/70">
                    Configurações avançadas em breve...
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
