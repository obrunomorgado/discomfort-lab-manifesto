
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, BellOff, TestTube, Smartphone, AlertTriangle } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

const NotificationSettings = () => {
  const {
    isNative,
    permissionsGranted,
    pushToken,
    settings,
    saveSettings,
    sendTestNotification,
    cancelAllNotifications
  } = useNotifications();

  const handleToggle = (key: keyof typeof settings, value: boolean) => {
    saveSettings({
      ...settings,
      [key]: value
    });
  };

  if (!isNative) {
    return (
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-warm-gray">
            <Smartphone size={20} />
            <span>NOTIFICAÇÕES PUSH</span>
          </CardTitle>
          <CardDescription>
            Disponível apenas na versão mobile do app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="mx-auto text-warm-gray/50 mb-4" size={48} />
            <p className="text-warm-gray/70">
              Para receber notificações, instale o app em seu dispositivo móvel
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-warm-gray">
          <div className="flex items-center space-x-2">
            <Bell size={20} />
            <span>CONFIGURAÇÕES DE NOTIFICAÇÃO</span>
          </div>
          <Badge 
            variant={permissionsGranted ? "default" : "destructive"}
            className={permissionsGranted ? "bg-green-600" : "bg-red-600"}
          >
            {permissionsGranted ? "ATIVADO" : "DESATIVADO"}
          </Badge>
        </CardTitle>
        <CardDescription>
          Gerencie seus lembretes e alertas do Sistema de Desconforto
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!permissionsGranted && (
          <div className="p-4 bg-red-900/30 border border-red-500/50 rounded warning-glow">
            <div className="flex items-center space-x-2 text-red-300 mb-2">
              <BellOff size={20} />
              <span className="font-bebas">PERMISSÕES NECESSÁRIAS</span>
            </div>
            <p className="text-red-400 text-sm">
              Ative as notificações nas configurações do dispositivo para receber lembretes importantes.
            </p>
          </div>
        )}

        {/* Check-in Reminders */}
        <div className="flex items-center justify-between p-4 bg-dark-bg/50 rounded border border-dark-border">
          <div>
            <div className="font-medium text-warm-gray mb-1">
              Lembretes de Check-in
            </div>
            <div className="text-sm text-warm-gray/70">
              Notificação diária para não esquecer o check-in
            </div>
          </div>
          <Switch
            checked={settings.checkInReminders}
            onCheckedChange={(checked) => handleToggle('checkInReminders', checked)}
            disabled={!permissionsGranted}
          />
        </div>

        {/* Penalty Alerts */}
        <div className="flex items-center justify-between p-4 bg-dark-bg/50 rounded border border-dark-border">
          <div>
            <div className="font-medium text-warm-gray mb-1">
              Alertas de Penalidade
            </div>
            <div className="text-sm text-warm-gray/70">
              Lembretes sobre tarefas com penalidade financeira ativa
            </div>
          </div>
          <Switch
            checked={settings.penaltyAlerts}
            onCheckedChange={(checked) => handleToggle('penaltyAlerts', checked)}
            disabled={!permissionsGranted}
          />
        </div>

        {/* Emergency Consultations */}
        <div className="flex items-center justify-between p-4 bg-dark-bg/50 rounded border border-dark-border">
          <div>
            <div className="font-medium text-warm-gray mb-1">
              Consultas de Emergência
            </div>
            <div className="text-sm text-warm-gray/70">
              Sugestões quando a dívida está muito alta
            </div>
          </div>
          <Switch
            checked={settings.emergencyConsultations}
            onCheckedChange={(checked) => handleToggle('emergencyConsultations', checked)}
            disabled={!permissionsGranted}
          />
        </div>

        {/* Daily Motivation */}
        <div className="flex items-center justify-between p-4 bg-dark-bg/50 rounded border border-dark-border">
          <div>
            <div className="font-medium text-warm-gray mb-1">
              Motivação Diária
            </div>
            <div className="text-sm text-warm-gray/70">
              Mensagens motivacionais para começar o dia
            </div>
          </div>
          <Switch
            checked={settings.dailyMotivation}
            onCheckedChange={(checked) => handleToggle('dailyMotivation', checked)}
            disabled={!permissionsGranted}
          />
        </div>

        {/* Test Controls */}
        {permissionsGranted && (
          <div className="space-y-3 pt-4 border-t border-dark-border">
            <Button
              onClick={sendTestNotification}
              className="w-full bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas"
            >
              <TestTube className="mr-2" size={16} />
              TESTAR NOTIFICAÇÃO
            </Button>
            
            <Button
              onClick={cancelAllNotifications}
              variant="outline"
              className="w-full border-red-500/50 text-red-300 hover:bg-red-900/30 font-bebas"
            >
              CANCELAR TODAS
            </Button>
          </div>
        )}

        {/* Debug Info */}
        {pushToken && (
          <div className="text-xs text-warm-gray/50 break-all">
            Token: {pushToken.substring(0, 20)}...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
