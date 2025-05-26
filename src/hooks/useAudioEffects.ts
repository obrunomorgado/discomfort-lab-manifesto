
import { useCallback } from 'react';

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
  | 'chat_message'
  | 'nicotine_hiss'
  | 'flatline'
  | 'stamp_missao';

interface AudioConfig {
  file: string;
  volume: number;
  loop?: boolean;
}

const AUDIO_CONFIGS: Record<SoundType, AudioConfig> = {
  mission_success: { file: '/sounds/mission_success.mp3', volume: 0.6 },
  mission_failure: { file: '/sounds/flatline.wav', volume: 0.7 },
  squad_notification: { file: '/sounds/notification.mp3', volume: 0.4 },
  squad_member_joined: { file: '/sounds/squad_join.mp3', volume: 0.5 },
  squad_member_left: { file: '/sounds/squad_leave.mp3', volume: 0.5 },
  squad_penalty: { file: '/sounds/penalty.mp3', volume: 0.6 },
  squad_bonus: { file: '/sounds/bonus.mp3', volume: 0.5 },
  xp_gained: { file: '/sounds/xp_gain.mp3', volume: 0.4 },
  penalty_applied: { file: '/sounds/penalty_applied.mp3', volume: 0.6 },
  button_click: { file: '/sounds/click.mp3', volume: 0.2 },
  chat_message: { file: '/sounds/chat.mp3', volume: 0.3 },
  nicotine_hiss: { file: '/sounds/nicotine_hiss.mp3', volume: 0.5 },
  flatline: { file: '/sounds/flatline.wav', volume: 0.8 },
  stamp_missao: { file: '/sounds/stamp_missao.wav', volume: 0.7 }
};

// Cache de áudios para performance
const audioCache = new Map<string, HTMLAudioElement>();

export const useAudioEffects = () => {
  const playSound = useCallback((soundType: SoundType) => {
    try {
      const config = AUDIO_CONFIGS[soundType];
      
      let audio = audioCache.get(config.file);
      
      if (!audio) {
        audio = new Audio(config.file);
        audio.volume = config.volume;
        audio.preload = 'auto';
        audioCache.set(config.file, audio);
      }
      
      // Reset audio para permitir múltiplas reproduções
      audio.currentTime = 0;
      audio.volume = config.volume;
      
      if (config.loop) {
        audio.loop = true;
      }
      
      audio.play().catch(error => {
        console.log('Audio playback failed:', error);
        // Fallback para som sintético se arquivo não existir
        fallbackToSyntheticSound(soundType);
      });
      
    } catch (error) {
      console.log('Audio effects not supported');
      fallbackToSyntheticSound(soundType);
    }
  }, []);

  const stopSound = useCallback((soundType: SoundType) => {
    try {
      const config = AUDIO_CONFIGS[soundType];
      const audio = audioCache.get(config.file);
      
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    } catch (error) {
      console.log('Failed to stop audio:', error);
    }
  }, []);

  const preloadSounds = useCallback(() => {
    Object.values(AUDIO_CONFIGS).forEach(config => {
      if (!audioCache.has(config.file)) {
        const audio = new Audio(config.file);
        audio.volume = config.volume;
        audio.preload = 'auto';
        audioCache.set(config.file, audio);
      }
    });
  }, []);

  return { playSound, stopSound, preloadSounds };
};

// Fallback para sons sintéticos quando arquivos não existem
const fallbackToSyntheticSound = (soundType: SoundType) => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Configurações básicas baseadas no tipo de som
    switch (soundType) {
      case 'mission_success':
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        break;
      case 'mission_failure':
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        break;
      default:
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    }
    
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.log('Fallback sound also failed');
  }
};
