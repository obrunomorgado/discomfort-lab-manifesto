
export const createActionHandlers = (
  completeAction: (actionId: string) => boolean,
  performDailyCheckIn: () => Promise<any[]>,
  setCheckInMessage: (message: string) => void
) => {
  const handleActionComplete = (actionId: string) => {
    const isRecovered = completeAction(actionId);
    if (isRecovered) {
      setCheckInMessage("🏥 ALTA MÉDICA CONCEDIDA! Você zerou sua dívida de autossabotagem!");
    }
  };

  const handleDailyCheckIn = async () => {
    try {
      const newBadges = await performDailyCheckIn();
      setCheckInMessage(`✅ Check-in realizado! ${newBadges.length > 0 ? `Novas badges: ${newBadges.map(b => b.name).join(', ')}` : ''}`);
    } catch (error) {
      console.error('Error in daily check-in:', error);
      setCheckInMessage('❌ Erro no check-in. Tente novamente.');
    }
  };

  return {
    handleActionComplete,
    handleDailyCheckIn
  };
};
