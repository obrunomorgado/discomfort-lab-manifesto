
import { DailyAction } from '@/types/user';

export interface CalendarSettings {
  checkInTime: string; // HH:MM format
  reminderMinutes: number;
  enabled: boolean;
}

export const createCheckInEvent = (date: Date, settings: CalendarSettings) => {
  const [hours, minutes] = settings.checkInTime.split(':').map(Number);
  const eventStart = new Date(date);
  eventStart.setHours(hours, minutes, 0, 0);
  
  const eventEnd = new Date(eventStart);
  eventEnd.setMinutes(eventEnd.getMinutes() + 15);

  return {
    summary: '🏥 Check-in Médico - Sem Desculpas IA',
    description: `<strong>"Dr. Desculpas está aguardando seu check-in diário. Não há desculpas aceitas."</strong>\n\n📋 <strong>INSTRUÇÕES MÉDICAS:</strong>\n• Relate o progresso do tratamento\n• Confirme ações completadas\n• Receba novas prescrições se necessário\n\n⚕️ Clique aqui para fazer check-in: ${window.location.origin}/career-truth-ai`,
    start: {
      dateTime: eventStart.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: eventEnd.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    colorId: '11', // Red color
    recurrence: ['RRULE:FREQ=DAILY;COUNT=30'], // 30 days of treatment
  };
};

export const createActionEvent = (action: DailyAction, settings: CalendarSettings) => {
  const eventStart = new Date(action.dueDate);
  eventStart.setHours(12, 0, 0, 0); // Default to noon if no specific time
  
  const eventEnd = new Date(eventStart);
  eventEnd.setHours(eventEnd.getHours() + 1);

  const pointsText = action.completed ? '✅ COMPLETADO' : `+${action.points} pontos`;
  const categoryEmoji = {
    professional: '💼',
    communication: '🗣️',
    behavior: '🎯',
    mindset: '🧠'
  }[action.category] || '📋';

  return {
    summary: `${categoryEmoji} ${action.description}`,
    description: `<strong>PRESCRIÇÃO MÉDICA - Dr. Desculpas</strong>\n\n📋 <strong>Ação:</strong> ${action.description}\n\n💊 <strong>Recompensa:</strong> ${pointsText}\n🏥 <strong>Categoria:</strong> ${action.category}\n\n<strong>"Esta ação é parte do seu tratamento contra autossabotagem. Complete para reduzir sua dívida médica."</strong>\n\nVoltar ao tratamento: ${window.location.origin}/career-truth-ai`,
    start: {
      dateTime: eventStart.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: eventEnd.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    colorId: action.completed ? '10' : '6', // Green if completed, orange if pending
  };
};

export const createWeeklyReviewEvent = (date: Date) => {
  const eventStart = new Date(date);
  eventStart.setHours(18, 0, 0, 0); // 6 PM on the review day
  
  const eventEnd = new Date(eventStart);
  eventEnd.setMinutes(eventEnd.getMinutes() + 30);

  return {
    summary: '📊 Revisão Semanal - Tratamento Autossabotagem',
    description: `<strong>CONSULTA SEMANAL - Dr. Desculpas</strong>\n\n🩺 <strong>Análise do progresso desta semana:</strong>\n• Ações completadas vs. pendentes\n• Redução da dívida de autossabotagem\n• Ajustes no protocolo de tratamento\n\n<strong>"Uma semana de tratamento foi concluída. Hora de avaliar sua evolução e definir os próximos passos."</strong>\n\nAcessar consulta: ${window.location.origin}/career-truth-ai`,
    start: {
      dateTime: eventStart.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: eventEnd.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    colorId: '9', // Blue color
    recurrence: ['RRULE:FREQ=WEEKLY'],
  };
};

export const createDischargeEvent = (date: Date) => {
  const eventStart = new Date(date);
  eventStart.setHours(9, 0, 0, 0);
  
  const eventEnd = new Date(eventStart);
  eventEnd.setMinutes(eventEnd.getMinutes() + 30);

  return {
    summary: '🏥 ALTA MÉDICA - Curado da Autossabotagem!',
    description: `<strong>🎉 PARABÉNS! ALTA MÉDICA CONCEDIDA!</strong>\n\n✅ <strong>Dr. Desculpas anuncia oficialmente:</strong>\n"Paciente completou o tratamento com sucesso. Dívida de autossabotagem foi zerada. Você está oficialmente CURADO!"\n\n🏆 <strong>Conquistas desbloqueadas:</strong>\n• Badge "Curado da Autossabotagem"\n• +2000 pontos de recuperação\n• Status: Ex-paciente exemplar\n\n<strong>"Mantenha os bons hábitos. A recaída é sempre possível para quem volta aos velhos padrões."</strong>\n\nCelebrar vitória: ${window.location.origin}/career-truth-ai`,
    start: {
      dateTime: eventStart.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: eventEnd.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    colorId: '10', // Green color
  };
};
