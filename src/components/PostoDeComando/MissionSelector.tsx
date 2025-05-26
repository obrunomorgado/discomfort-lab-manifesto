
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Mission } from '@/types/missions';
import { DAILY_MISSIONS } from '@/data/missions';
import { Target, Zap, Clock, AlertTriangle } from 'lucide-react';

interface MissionSelectorProps {
  onMissionSelect: (mission: Mission, isDoubled: boolean) => void;
  selectedMission?: Mission;
  isDoubled?: boolean;
}

const MissionSelector = ({ onMissionSelect, selectedMission, isDoubled = false }: MissionSelectorProps) => {
  const [selectedMissionId, setSelectedMissionId] = useState<string>(selectedMission?.id || '');
  const [doubleRisk, setDoubleRisk] = useState(isDoubled);

  const handleMissionSelect = (mission: Mission) => {
    setSelectedMissionId(mission.id);
    onMissionSelect(mission, doubleRisk);
  };

  const handleDoubleToggle = (checked: boolean) => {
    setDoubleRisk(checked);
    if (selectedMissionId) {
      const mission = DAILY_MISSIONS.find(m => m.id === selectedMissionId);
      if (mission) {
        onMissionSelect(mission, checked);
      }
    }
  };

  const getDifficultyColor = (difficulty: Mission['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-cyber-neon/20 border-cyber-neon/50 text-cyber-neon';
      case 'medium': return 'bg-cyber-cyan/20 border-cyber-cyan/50 text-cyber-cyan';
      case 'hard': return 'bg-cyber-fuchsia/20 border-cyber-fuchsia/50 text-cyber-fuchsia';
      case 'extreme': return 'bg-cyber-warning/20 border-cyber-warning/50 text-cyber-warning';
    }
  };

  const getRiskColor = (risk: Mission['risk']) => {
    switch (risk) {
      case 'low': return 'text-cyber-neon';
      case 'medium': return 'text-cyber-cyan';
      case 'high': return 'text-cyber-warning';
    }
  };

  return (
    <Card className="bg-military-card border-cyber-fuchsia/30 rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-bebas text-cyber-fuchsia">
          <Target size={24} />
          <span>SELECIONAR MISSÃO DIÁRIA</span>
        </CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-warm-gray/70 font-consolas text-sm">
            Escolha sua operação para hoje
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-consolas text-warm-gray">DUPLICAR RISCO/RECOMPENSA</span>
            <Switch 
              checked={doubleRisk}
              onCheckedChange={handleDoubleToggle}
              className="data-[state=checked]:bg-cyber-warning"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {DAILY_MISSIONS.map((mission) => (
            <div
              key={mission.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all hover-lift hover-glitch ${
                selectedMissionId === mission.id
                  ? 'border-cyber-fuchsia bg-cyber-fuchsia/20'
                  : 'border-military-border bg-military-bg/50 hover:border-cyber-cyan/50'
              }`}
              onClick={() => handleMissionSelect(mission)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-bebas text-lg text-warm-gray">{mission.title}</h3>
                  <p className="text-sm text-warm-gray/70 font-consolas mb-2">{mission.description}</p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge className={getDifficultyColor(mission.difficulty)}>
                    {mission.difficulty.toUpperCase()}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <AlertTriangle size={12} className={getRiskColor(mission.risk)} />
                    <span className={`text-xs font-consolas ${getRiskColor(mission.risk)}`}>
                      {mission.risk.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Zap size={16} className="text-cyber-cyan" />
                    <span className="text-sm font-consolas text-cyber-cyan">
                      {doubleRisk ? mission.basePoints * 2 : mission.basePoints} XP
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} className="text-warm-gray/60" />
                    <span className="text-sm font-consolas text-warm-gray/60">
                      {mission.timeEstimate}
                    </span>
                  </div>
                </div>
                
                {doubleRisk && (
                  <Badge className="bg-cyber-warning/20 border-cyber-warning/50 text-cyber-warning animate-pulse-warning">
                    PENALIDADE x2
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedMissionId && (
          <div className="mt-6 p-4 bg-cyber-fuchsia/10 border border-cyber-fuchsia/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bebas text-cyber-fuchsia">MISSÃO SELECIONADA</h4>
                <p className="text-sm font-consolas text-warm-gray">
                  {DAILY_MISSIONS.find(m => m.id === selectedMissionId)?.title}
                </p>
              </div>
              <Button 
                onClick={() => {
                  const mission = DAILY_MISSIONS.find(m => m.id === selectedMissionId);
                  if (mission) onMissionSelect(mission, doubleRisk);
                }}
                className="bg-cyber-fuchsia text-military-bg hover:bg-cyber-fuchsia/90 font-bebas"
              >
                ACEITAR MISSÃO
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MissionSelector;
