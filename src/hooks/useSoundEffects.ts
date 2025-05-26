
import { useCallback } from 'react';
import { useAudioSettings } from './useAudioSettings';

type SoundType = 
  | 'mission_success' 
  | 'mission_failure' 
  | 'squad_notification' 
  | 'squad_member_joined' 
  | 'squad_member_left'
  | 'squad_penalty'
  | 'squad_bonus'
  | 'xp_gained'
  | 'penalty_applied'
  | 'button_click'
  | 'chat_message';

interface SoundConfig {
  frequency: number;
  duration: number;
  type: OscillatorType;
  volume?: number;
}

const SOUND_CONFIGS: Record<SoundType, SoundConfig[]> = {
  mission_success: [
    { frequency: 523, duration: 200, type: 'sine', volume: 0.3 },
    { frequency: 659, duration: 200, type: 'sine', volume: 0.3 },
    { frequency: 784, duration: 400, type: 'sine', volume: 0.3 }
  ],
  mission_failure: [
    { frequency: 220, duration: 300, type: 'sawtooth', volume: 0.4 },
    { frequency: 196, duration: 300, type: 'sawtooth', volume: 0.4 },
    { frequency: 174, duration: 600, type: 'sawtooth', volume: 0.4 }
  ],
  squad_notification: [
    { frequency: 440, duration: 150, type: 'triangle', volume: 0.2 },
    { frequency: 554, duration: 150, type: 'triangle', volume: 0.2 }
  ],
  squad_member_joined: [
    { frequency: 392, duration: 200, type: 'sine', volume: 0.3 },
    { frequency: 523, duration: 300, type: 'sine', volume: 0.3 }
  ],
  squad_member_left: [
    { frequency: 523, duration: 200, type: 'sine', volume: 0.3 },
    { frequency: 392, duration: 300, type: 'sine', volume: 0.3 }
  ],
  squad_penalty: [
    { frequency: 150, duration: 400, type: 'sawtooth', volume: 0.4 },
    { frequency: 130, duration: 400, type: 'sawtooth', volume: 0.4 }
  ],
  squad_bonus: [
    { frequency: 659, duration: 150, type: 'sine', volume: 0.3 },
    { frequency: 784, duration: 150, type: 'sine', volume: 0.3 },
    { frequency: 880, duration: 200, type: 'sine', volume: 0.3 }
  ],
  xp_gained: [
    { frequency: 880, duration: 150, type: 'sine', volume: 0.2 }
  ],
  penalty_applied: [
    { frequency: 200, duration: 400, type: 'square', volume: 0.3 }
  ],
  button_click: [
    { frequency: 800, duration: 50, type: 'sine', volume: 0.1 }
  ],
  chat_message: [
    { frequency: 600, duration: 100, type: 'triangle', volume: 0.1 }
  ]
};

export const useSoundEffects = () => {
  const { settings } = useAudioSettings();

  const playSound = useCallback((soundType: SoundType) => {
    // Check if sound is enabled before playing
    if (!settings.soundEnabled) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const configs = SOUND_CONFIGS[soundType];
      
      configs.forEach((config, index) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(config.frequency, audioContext.currentTime);
          oscillator.type = config.type;
          
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(config.volume || 0.2, audioContext.currentTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + config.duration / 1000);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + config.duration / 1000);
        }, index * 100);
      });
    } catch (error) {
      console.log('Sound effects not supported in this browser');
    }
  }, [settings.soundEnabled]);

  return { playSound };
};
