
export const createActionHandlers = (
  completeAction: (actionId: string) => boolean,
  performDailyCheckIn: () => any[],
  setCheckInMessage: (message: string) => void
) => {
  const handleActionComplete = (actionId: string) => {
    const isRecovered = completeAction(actionId);
    if (isRecovered) {
      setCheckInMessage("🏥 ALTA MÉDICA CONCEDIDA! Você zerou sua dívida de autossabotagem!");
    }
  };

  const handleDailyCheckIn = () => {
    const newBadges = performDailyCheckIn();
    setCheckInMessage(`✅ Check-in realizado! ${newBadges.length > 0 ? `Novas badges: ${newBadges.map(b => b.name).join(', ')}` : ''}`);
  };

  return {
    handleActionComplete,
    handleDailyCheckIn
  };
};
