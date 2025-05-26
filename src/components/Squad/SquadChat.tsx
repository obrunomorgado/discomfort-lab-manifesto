
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSquadChat } from '@/hooks/useSquadChat';
import { useUserProgress } from '@/hooks/useUserProgress';
import { MessageCircle, Send, Bot } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface SquadChatProps {
  squadId: string;
  isOpen: boolean;
  onToggle: () => void;
}

const SquadChat = ({ squadId, isOpen, onToggle }: SquadChatProps) => {
  const { progress } = useUserProgress();
  const { messages, sendMessage } = useSquadChat(squadId);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    sendMessage(newMessage, 'current-user', progress.username || 'Recruta');
    setNewMessage('');
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'mission_start':
        return 'text-cyber-cyan';
      case 'mission_complete':
        return 'text-cyber-neon';
      case 'mission_fail':
        return 'text-cyber-warning';
      case 'system':
        return 'text-cyber-fuchsia';
      default:
        return 'text-warm-gray';
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'system':
      case 'mission_start':
      case 'mission_complete':
      case 'mission_fail':
        return <Bot size={14} className="text-cyber-fuchsia" />;
      default:
        return null;
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-cyber-fuchsia text-military-bg hover:bg-cyber-fuchsia/90 rounded-full w-14 h-14 z-50"
      >
        <MessageCircle size={24} />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 z-50">
      <Card className="bg-military-card border-cyber-fuchsia/50 rivet-border h-full flex flex-col">
        <CardHeader className="py-3">
          <CardTitle className="flex items-center justify-between font-bebas text-cyber-fuchsia">
            <div className="flex items-center space-x-2">
              <MessageCircle size={20} />
              <span>CHAT DO SQUAD</span>
            </div>
            <Button 
              onClick={onToggle}
              variant="ghost" 
              size="sm"
              className="text-warm-gray hover:text-cyber-fuchsia"
            >
              ✕
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-3 py-2">
              {messages.length === 0 ? (
                <div className="text-center text-warm-gray/70 py-8">
                  <Bot size={32} className="mx-auto mb-2 text-cyber-fuchsia/50" />
                  <p className="font-consolas text-xs">Canal de comunicação ativo</p>
                  <p className="font-consolas text-xs">Coordenem suas missões!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className="text-sm">
                    <div className="flex items-start space-x-2">
                      {getMessageIcon(message.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`font-bebas text-xs ${getMessageTypeColor(message.type)}`}>
                            {message.username}
                          </span>
                          <span className="text-xs text-warm-gray/50 font-consolas">
                            {format(message.timestamp, 'HH:mm', { locale: ptBR })}
                          </span>
                        </div>
                        <p className="text-warm-gray font-consolas text-xs break-words">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="border-t border-military-border p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-military-bg border-military-border text-warm-gray text-sm font-consolas"
                maxLength={200}
              />
              <Button 
                type="submit" 
                size="sm"
                disabled={!newMessage.trim()}
                className="bg-cyber-fuchsia text-military-bg hover:bg-cyber-fuchsia/90"
              >
                <Send size={16} />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SquadChat;
