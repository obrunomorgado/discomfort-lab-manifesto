
import { useState, useEffect } from 'react';

const AUDIO_SETTINGS_KEY = 'sala_desconforto_audio_settings';

interface AudioSettings {
  soundEnabled: boolean;
}

const DEFAULT_SETTINGS: AudioSettings = {
  soundEnabled: true
};

export const useAudioSettings = () => {
  const [settings, setSettings] = useState<AudioSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUDIO_SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch (error) {
      console.log('Error loading audio settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSettings = (newSettings: Partial<AudioSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    
    try {
      localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.log('Error saving audio settings:', error);
    }
  };

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  return {
    settings,
    isLoading,
    toggleSound,
    updateSettings
  };
};
