
import { useUserProgress } from "@/hooks/useUserProgress";
import { useCredits } from "@/hooks/useCredits";
import { useCareerTruthState } from "@/hooks/useCareerTruthState";
import { handleEmergencyConsultation } from "@/handlers/emergencyConsultationHandler";
import { handleSubmit } from "@/handlers/submitHandler";
import { createActionHandlers } from "@/handlers/actionHandlers";
import { subornDoctor } from "@/hooks/useUserProgress/tests";

export const useCareerTruthHandlers = () => {
  const {
    userInput,
    setUserInput,
    isAnalyzing,
    setIsAnalyzing,
    analysis,
    setAnalysis,
    checkInMessage,
    setCheckInMessage,
    isEmergencyMode,
    setIsEmergencyMode
  } = useCareerTruthState();
  
  const { progress, addTestResult, completeAction, performDailyCheckIn, getPendingActions, getCompletedActionsToday, spendCredits, saveProgress } = useUserProgress();
  const { getTestCost } = useCredits();
  
  const { medicalProgress } = progress;

  const handleEmergencyConsultationClick = () => {
    handleEmergencyConsultation(
      progress,
      spendCredits,
      saveProgress,
      setIsEmergencyMode,
      setCheckInMessage
    );
  };

  const handleSubmitClick = async () => {
    await handleSubmit(
      userInput,
      isEmergencyMode,
      progress,
      getTestCost,
      spendCredits,
      addTestResult,
      setIsAnalyzing,
      setAnalysis,
      setIsEmergencyMode,
      setCheckInMessage
    );
  };

  const { handleActionComplete, handleDailyCheckIn } = createActionHandlers(
    completeAction,
    async () => await performDailyCheckIn(), // Make this async to handle Promise<Badge[]>
    setCheckInMessage
  );

  const handleSuborn = (subornOption: any) => {
    const result = subornDoctor(progress, subornOption);
    if (result.success) {
      saveProgress(result.newProgress);
      setCheckInMessage(`💰 Suborno aceito! Dr. Desculpas sussurra: "Nosso segredinho..." - ${subornOption.unlocks} novas consultas liberadas.`);
    }
  };

  return {
    userInput,
    setUserInput,
    isAnalyzing,
    analysis,
    checkInMessage,
    isEmergencyMode,
    handleSubmit: handleSubmitClick,
    handleActionComplete,
    handleDailyCheckIn,
    handleSuborn,
    handleEmergencyConsultation: handleEmergencyConsultationClick,
    pendingActions: getPendingActions(),
    completedToday: getCompletedActionsToday()
  };
};
