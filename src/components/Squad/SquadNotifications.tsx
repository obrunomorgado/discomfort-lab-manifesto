
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useSquad } from '@/hooks/useSquad';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { Bell, CheckCircle, AlertTriangle, Users, UserX, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const SquadNotifications = () => {
  const { notifications, markNotificationAsRead, unreadNotifications } = useSquad();
  const { playSound } = useSoundEffects();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'mission_completed':
        return <CheckCircle size={16} className="text-cyber-neon" />;
      case 'mission_failed':
        return <AlertTriangle size={16} className="text-cyber-warning" />;
      case 'member_joined':
        return <Users size={16} className="text-cyber-cyan" />;
      case 'member_left':
        return <UserX size={16} className="text-warm-gray" />;
      case 'xp_penalty':
        return <AlertTriangle size={16} className="text-cyber-warning" />;
      default:
        return <Bell size={16} className="text-cyber-fuchsia" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'mission_completed':
        return 'border-cyber-neon/30 bg-cyber-neon/10';
      case 'mission_failed':
      case 'xp_penalty':
        return 'border-cyber-warning/30 bg-cyber-warning/10';
      case 'member_joined':
        return 'border-cyber-cyan/30 bg-cyber-cyan/10';
      case 'member_left':
        return 'border-warm-gray/30 bg-warm-gray/10';
      default:
        return 'border-cyber-fuchsia/30 bg-cyber-fuchsia/10';
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
    playSound('button_click');
  };

  const markAllAsRead = () => {
    notifications.filter(n => !n.isRead).forEach(n => markNotificationAsRead(n.id));
    playSound('squad_notification');
  };

  if (notifications.length === 0) return null;

  return (
    <Card className="bg-military-card border-cyber-fuchsia/30 rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-bebas text-cyber-fuchsia">
          <div className="flex items-center space-x-2">
            <Bell size={20} />
            <span>NOTIFICAÇÕES DO SQUAD</span>
            {unreadNotifications > 0 && (
              <Badge className="bg-cyber-warning text-military-bg px-2 py-1 rounded text-xs animate-pulse">
                {unreadNotifications}
              </Badge>
            )}
          </div>
          {unreadNotifications > 0 && (
            <Button
              onClick={markAllAsRead}
              size="sm"
              variant="ghost"
              className="text-cyber-cyan hover:bg-cyber-cyan/20 text-xs"
            >
              Ler Todas
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-3">
            {notifications.slice(0, 10).map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded border ${getNotificationColor(notification.type)} ${
                  !notification.isRead ? 'ring-1 ring-cyber-fuchsia/50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-consolas ${!notification.isRead ? 'text-warm-gray font-bold' : 'text-warm-gray/80'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-warm-gray/60 mt-1">
                      {format(notification.timestamp, 'dd/MM HH:mm', { locale: ptBR })}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <Button
                      onClick={() => handleMarkAsRead(notification.id)}
                      size="sm"
                      variant="ghost"
                      className="text-cyber-fuchsia hover:bg-cyber-fuchsia/20 p-1"
                    >
                      <CheckCircle size={14} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SquadNotifications;
