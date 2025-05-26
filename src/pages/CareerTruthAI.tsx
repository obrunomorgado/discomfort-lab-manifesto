
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUserProgress } from "@/hooks/useUserProgress";
import Header from "@/components/CareerTruthAI/Header";
import TreatmentStatus from "@/components/CareerTruthAI/TreatmentStatus";
import CheckInSection from "@/components/CareerTruthAI/CheckInSection";
import ConfessionForm from "@/components/CareerTruthAI/ConfessionForm";
import DiagnosisResults from "@/components/CareerTruthAI/DiagnosisResults";
import CalendarSync from "@/components/CareerTruthAI/CalendarSync";
import MedicalHistory from "@/components/CareerTruthAI/MedicalHistory";
import SubornModal from "@/components/CareerTruthAI/SubornModal";
import MedicalStatusBar from "@/components/CareerTruthAI/MedicalStatusBar";
import { useCareerTruthHandlers } from "@/components/CareerTruthAI/CareerTruthHandlers";

const CareerTruthAI = () => {
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [showSubornModal, setShowSubornModal] = useState(false);
  
  const { progress } = useUserProgress();
  const { medicalProgress } = progress;

  const {
    userInput,
    setUserInput,
    isAnalyzing,
    analysis,
    checkInMessage,
    handleSubmit,
    handleActionComplete,
    handleDailyCheckIn,
    handleSuborn,
    pendingActions,
    completedToday
  } = useCareerTruthHandlers();

  // Show check-in when analysis is complete
  if (analysis && !showCheckIn) {
    setShowCheckIn(true);
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-gradient-to-b from-dark-bg to-dark-bg/90">
      <div className="max-w-4xl mx-auto">
        <Header isInTreatment={progress.isInTreatment} />
        
        <MedicalStatusBar
          medicalProgress={medicalProgress}
          onShowMedicalHistory={() => setShowMedicalHistory(true)}
          onShowSubornModal={() => setShowSubornModal(true)}
        />
        
        <TreatmentStatus progress={progress} />
        
        <CheckInSection
          showCheckIn={showCheckIn}
          progress={progress}
          checkInMessage={checkInMessage}
          pendingActions={pendingActions}
          completedToday={completedToday}
          onDailyCheckIn={handleDailyCheckIn}
          onActionComplete={handleActionComplete}
        />

        <CalendarSync progress={progress} pendingActions={pendingActions} />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <ConfessionForm
            userInput={userInput}
            setUserInput={setUserInput}
            isAnalyzing={isAnalyzing}
            isInTreatment={progress.isInTreatment}
            onSubmit={handleSubmit}
          />

          <DiagnosisResults
            isAnalyzing={isAnalyzing}
            analysis={analysis}
          />
        </div>

        <Alert className="bg-red-600/10 border-red-600/30 mt-8">
          <AlertDescription className="text-warm-gray font-inter">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <strong className="text-red-400">Aviso Médico:</strong>
                <p className="mt-1">
                  "Este não é coaching motivacional. É tratamento médico para autossabotagem crônica. 
                  Falhas no tratamento resultam em agravamento do quadro. 
                  {medicalProgress.isBlocked && ' Sistema bloqueado após 5 consultas - opções de suborno disponíveis.'}"
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        <MedicalHistory
          progress={progress}
          isOpen={showMedicalHistory}
          onClose={() => setShowMedicalHistory(false)}
        />

        <SubornModal
          isOpen={showSubornModal}
          onClose={() => setShowSubornModal(false)}
          onSuborn={handleSuborn}
          subornsUsed={medicalProgress.subornsUsed}
        />
      </div>
    </div>
  );
};

export default CareerTruthAI;
