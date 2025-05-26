
import { useState } from 'react';

export const useModalStates = () => {
  const [showPenaltySetup, setShowPenaltySetup] = useState(false);
  const [showPenaltyManagement, setShowPenaltyManagement] = useState(false);
  const [showMissionSelector, setShowMissionSelector] = useState(false);
  const [showDailyReport, setShowDailyReport] = useState(false);
  const [showDiscomfortCard, setShowDiscomfortCard] = useState(false);
  const [showBettingMachine, setShowBettingMachine] = useState(false);
  const [showSquadManagement, setShowSquadManagement] = useState(false);
  const [showPotLink, setShowPotLink] = useState(false);
  const [showSquadChat, setShowSquadChat] = useState(false);

  return {
    showPenaltySetup,
    setShowPenaltySetup,
    showPenaltyManagement,
    setShowPenaltyManagement,
    showMissionSelector,
    setShowMissionSelector,
    showDailyReport,
    setShowDailyReport,
    showDiscomfortCard,
    setShowDiscomfortCard,
    showBettingMachine,
    setShowBettingMachine,
    showSquadManagement,
    setShowSquadManagement,
    showPotLink,
    setShowPotLink,
    showSquadChat,
    setShowSquadChat
  };
};
