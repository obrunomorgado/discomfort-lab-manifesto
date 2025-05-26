
import { UserProgress } from "@/types/user";

export const handleEmergencyConsultation = (
  progress: UserProgress,
  spendCredits: (amount: number, testId: string, testName: string) => boolean,
  saveProgress: (progress: UserProgress) => void,
  setIsEmergencyMode: (mode: boolean) => void,
  setCheckInMessage: (message: string) => void
) => {
  const emergencyConsultationCost = 10;
  
  if (progress.credits < emergencyConsultationCost) {
    setCheckInMessage("❌ Créditos insuficientes para consulta de emergência!");
    return;
  }
  
  const success = spendCredits(emergencyConsultationCost, 'career-truth-ai-emergency', 'Consulta de Emergência');
  if (!success) {
    setCheckInMessage("❌ Falha ao processar pagamento da consulta de emergência");
    return;
  }
  
  setIsEmergencyMode(true);
  setCheckInMessage("🚨 CONSULTA DE EMERGÊNCIA ATIVADA! Digite sua confissão profissional abaixo.");
  
  // Resetar o bloqueio temporariamente para permitir o teste
  const newProgress = { ...progress };
  newProgress.medicalProgress.isBlocked = false;
  saveProgress(newProgress);
};
