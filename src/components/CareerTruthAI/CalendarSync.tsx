
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';
import { CalendarSettings, createCheckInEvent, createActionEvent, createWeeklyReviewEvent, createDischargeEvent } from '@/services/calendarSync';
import { UserProgress, DailyAction } from '@/types/user';
import { useToast } from '@/hooks/use-toast';

interface CalendarSyncProps {
  progress: UserProgress;
  pendingActions: DailyAction[];
}

const CalendarSync = ({ progress, pendingActions }: CalendarSyncProps) => {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, authenticate, createEvent, disconnect } = useGoogleCalendar();
  
  const [settings, setSettings] = useState<CalendarSettings>({
    checkInTime: '09:00',
    reminderMinutes: 15,
    enabled: false
  });
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    const savedSettings = localStorage.getItem('calendar_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const saveSettings = (newSettings: CalendarSettings) => {
    setSettings(newSettings);
    localStorage.setItem('calendar_settings', JSON.stringify(newSettings));
  };

  const handleConnect = async () => {
    try {
      await authenticate();
      toast({
        title: '🏥 Calendário Conectado!',
        description: 'Dr. Desculpas agora pode agendar seu tratamento no Google Calendar.',
      });
    } catch (error) {
      toast({
        title: 'Erro na Conexão',
        description: 'Falha ao conectar com Google Calendar. Tente novamente.',
        variant: 'destructive'
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    saveSettings({ ...settings, enabled: false });
    toast({
      title: 'Calendário Desconectado',
      description: 'A sincronização com Google Calendar foi desabilitada.',
    });
  };

  const syncToCalendar = async () => {
    if (!isAuthenticated) return;
    
    setIsSyncing(true);
    try {
      const events = [];
      
      // Create daily check-in events for next 30 days
      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const checkInEvent = createCheckInEvent(date, settings);
        events.push(createEvent(checkInEvent));
      }
      
      // Create events for pending actions
      for (const action of pendingActions) {
        const actionEvent = createActionEvent(action, settings);
        events.push(createEvent(actionEvent));
      }
      
      // Create weekly review events
      const today = new Date();
      const nextSunday = new Date(today);
      nextSunday.setDate(today.getDate() + (7 - today.getDay()));
      
      for (let i = 0; i < 4; i++) {
        const reviewDate = new Date(nextSunday);
        reviewDate.setDate(nextSunday.getDate() + (i * 7));
        const reviewEvent = createWeeklyReviewEvent(reviewDate);
        events.push(createEvent(reviewEvent));
      }
      
      // If patient is recovered, create discharge event
      if (!progress.isInTreatment && progress.debtPoints === 0) {
        const dischargeEvent = createDischargeEvent(new Date());
        events.push(createEvent(dischargeEvent));
      }
      
      await Promise.all(events);
      setLastSync(new Date());
      
      toast({
        title: '📅 Sincronização Completa!',
        description: `${events.length} eventos médicos foram criados no seu Google Calendar.`,
      });
      
    } catch (error) {
      toast({
        title: 'Erro na Sincronização',
        description: 'Falha ao sincronizar eventos. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const getSyncStatus = () => {
    if (!isAuthenticated) return { icon: WifiOff, text: 'Desconectado', color: 'text-red-400' };
    if (isSyncing) return { icon: Clock, text: 'Sincronizando...', color: 'text-yellow-400' };
    if (lastSync) return { icon: CheckCircle, text: 'Sincronizado', color: 'text-green-400' };
    return { icon: AlertCircle, text: 'Aguardando sync', color: 'text-orange-400' };
  };

  const status = getSyncStatus();
  const StatusIcon = status.icon;

  return (
    <Card className="bg-dark-card border-dark-border">
      <CardHeader>
        <CardTitle className="text-warm-yellow font-bebas flex items-center space-x-2">
          <Calendar size={24} />
          <span>GOOGLE CALENDAR</span>
          <Badge className={`${status.color} bg-transparent border-current`}>
            <StatusIcon size={14} className="mr-1" />
            {status.text}
          </Badge>
        </CardTitle>
        <CardDescription className="text-warm-gray/70">
          Sincronize seu tratamento com Google Calendar para lembretes automáticos
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!isAuthenticated ? (
          <div className="text-center py-6 space-y-4">
            <div className="text-4xl mb-2">📅</div>
            <p className="text-warm-gray/60 font-inter">
              <strong>"Dr. Desculpas quer agendar seu tratamento no seu calendário pessoal."</strong>
            </p>
            <Button 
              onClick={handleConnect}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 font-bebas tracking-wider"
            >
              {isLoading ? 'CONECTANDO...' : '📱 CONECTAR GOOGLE CALENDAR'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Alert className="bg-green-600/10 border-green-600/30">
              <AlertDescription className="text-green-400">
                ✅ Conectado com Google Calendar! Configure os horários abaixo.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkin-time" className="text-warm-gray">Horário do Check-in</Label>
                <Input
                  id="checkin-time"
                  type="time"
                  value={settings.checkInTime}
                  onChange={(e) => saveSettings({ ...settings, checkInTime: e.target.value })}
                  className="bg-dark-bg border-dark-border text-warm-gray"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reminder" className="text-warm-gray">Lembrete (minutos)</Label>
                <Input
                  id="reminder"
                  type="number"
                  value={settings.reminderMinutes}
                  onChange={(e) => saveSettings({ ...settings, reminderMinutes: parseInt(e.target.value) })}
                  className="bg-dark-bg border-dark-border text-warm-gray"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-warm-gray font-medium">Sincronização Automática</Label>
                <p className="text-sm text-warm-gray/60">Criar eventos automaticamente</p>
              </div>
              <Switch
                checked={settings.enabled}
                onCheckedChange={(enabled) => saveSettings({ ...settings, enabled })}
              />
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={syncToCalendar}
                disabled={isSyncing}
                className="flex-1 bg-green-600 hover:bg-green-700 font-bebas tracking-wider"
              >
                {isSyncing ? '🔄 SINCRONIZANDO...' : '📅 SINCRONIZAR AGORA'}
              </Button>
              
              <Button 
                onClick={handleDisconnect}
                variant="outline"
                className="border-red-600/30 text-red-400 hover:bg-red-600/10"
              >
                <WifiOff size={16} />
              </Button>
            </div>

            {lastSync && (
              <p className="text-xs text-warm-gray/60 text-center">
                Última sincronização: {lastSync.toLocaleString()}
              </p>
            )}
            
            <div className="bg-warm-yellow/10 p-3 rounded border-l-4 border-warm-yellow">
              <p className="text-warm-yellow font-inter text-sm">
                💡 <strong>Eventos criados:</strong> Check-ins diários, ações pendentes, revisões semanais e alta médica (quando aplicável)
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarSync;
