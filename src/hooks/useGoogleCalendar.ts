
import { useState, useCallback } from 'react';

interface CalendarEvent {
  id?: string;
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  colorId?: string;
  recurrence?: string[];
}

export const useGoogleCalendar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const authenticate = useCallback(async () => {
    setIsLoading(true);
    try {
      // For demo purposes, we'll simulate authentication
      // In a real implementation, you'd use Google OAuth2
      const token = localStorage.getItem('google_calendar_token');
      if (token) {
        setAccessToken(token);
        setIsAuthenticated(true);
      } else {
        // Simulate OAuth flow
        const simulatedToken = `demo_token_${Date.now()}`;
        localStorage.setItem('google_calendar_token', simulatedToken);
        setAccessToken(simulatedToken);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (event: CalendarEvent) => {
    if (!isAuthenticated || !accessToken) {
      throw new Error('Not authenticated');
    }

    // Simulate API call
    console.log('Creating calendar event:', event);
    
    // In a real implementation, this would call the Google Calendar API
    const mockEventId = `event_${Date.now()}`;
    return { id: mockEventId, ...event };
  }, [isAuthenticated, accessToken]);

  const updateEvent = useCallback(async (eventId: string, updates: Partial<CalendarEvent>) => {
    if (!isAuthenticated || !accessToken) {
      throw new Error('Not authenticated');
    }

    console.log('Updating calendar event:', eventId, updates);
    return { id: eventId, ...updates };
  }, [isAuthenticated, accessToken]);

  const deleteEvent = useCallback(async (eventId: string) => {
    if (!isAuthenticated || !accessToken) {
      throw new Error('Not authenticated');
    }

    console.log('Deleting calendar event:', eventId);
    return true;
  }, [isAuthenticated, accessToken]);

  const disconnect = useCallback(() => {
    localStorage.removeItem('google_calendar_token');
    setAccessToken(null);
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    authenticate,
    createEvent,
    updateEvent,
    deleteEvent,
    disconnect
  };
};
