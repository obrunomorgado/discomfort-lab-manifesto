
import { useState, useEffect } from 'react';

const ONBOARDING_STORAGE_KEY = 'sala_desconforto_onboarding_completed';

export const useOnboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = () => {
      try {
        const completed = localStorage.getItem(ONBOARDING_STORAGE_KEY);
        if (!completed) {
          setShowOnboarding(true);
        }
      } catch (error) {
        console.log('Error checking onboarding status:', error);
        setShowOnboarding(true);
      } finally {
        setIsLoading(false);
      }
    };

    // Delay para permitir que a app carregue completamente
    const timer = setTimeout(checkOnboardingStatus, 1000);
    return () => clearTimeout(timer);
  }, []);

  const completeOnboarding = () => {
    try {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      setShowOnboarding(false);
    } catch (error) {
      console.log('Error saving onboarding status:', error);
      setShowOnboarding(false);
    }
  };

  const resetOnboarding = () => {
    try {
      localStorage.removeItem(ONBOARDING_STORAGE_KEY);
      setShowOnboarding(true);
    } catch (error) {
      console.log('Error resetting onboarding:', error);
    }
  };

  return {
    showOnboarding,
    isLoading,
    completeOnboarding,
    resetOnboarding
  };
};
