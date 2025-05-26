
import { useState, useEffect } from 'react';
import { SquadChatMessage } from '@/types/squad';
import { useSoundEffects } from './useSoundEffects';

export const useSquadChat = (squadId: string | null) => {
  const [messages, setMessages] = useState<SquadChatMessage[]>([]);
  const { playSound } = useSoundEffects();

  useEffect(() => {
    if (!squadId) return;

    const savedMessages = localStorage.getItem(`squadChat-${squadId}`);
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      setMessages(parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    }
  }, [squadId]);

  const saveMessages = (newMessages: SquadChatMessage[]) => {
    if (!squadId) return;
    setMessages(newMessages);
    localStorage.setItem(`squadChat-${squadId}`, JSON.stringify(newMessages));
  };

  const sendMessage = (message: string, userId: string, username: string) => {
    if (!squadId || !message.trim()) return;

    const newMessage: SquadChatMessage = {
      id: `msg-${Date.now()}`,
      squadId,
      userId,
      username,
      message: message.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    const updatedMessages = [...messages, newMessage];
    saveMessages(updatedMessages);
    
    // Play chat message sound for regular messages
    if (userId !== 'system') {
      playSound('chat_message');
    }
  };

  const sendSystemMessage = (message: string, type: SquadChatMessage['type'] = 'system') => {
    if (!squadId) return;

    const systemMessage: SquadChatMessage = {
      id: `sys-${Date.now()}`,
      squadId,
      userId: 'system',
      username: 'SISTEMA',
      message,
      timestamp: new Date(),
      type
    };

    const updatedMessages = [...messages, systemMessage];
    saveMessages(updatedMessages);
    
    // Play appropriate sound for system messages
    switch (type) {
      case 'mission_complete':
        playSound('mission_success');
        break;
      case 'mission_fail':
        playSound('mission_failure');
        break;
      default:
        playSound('squad_notification');
        break;
    }
  };

  return {
    messages,
    sendMessage,
    sendSystemMessage
  };
};
