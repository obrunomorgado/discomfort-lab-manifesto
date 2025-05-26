
import { useState } from "react";

export const useCareerTruthState = () => {
  const [userInput, setUserInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [checkInMessage, setCheckInMessage] = useState("");
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  return {
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
  };
};
