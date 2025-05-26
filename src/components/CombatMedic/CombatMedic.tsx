
import React from 'react';

interface CombatMedicProps {
  mode: 'neutral' | 'alert' | 'praise';
  message: string;
  showCharacter?: boolean;
}

const CombatMedic = ({ mode, message, showCharacter = true }: CombatMedicProps) => {
  const getModeStyles = () => {
    switch (mode) {
      case 'alert':
        return 'border-cyber-warning bg-cyber-warning/10';
      case 'praise':
        return 'border-cyber-neon bg-cyber-neon/10';
      default:
        return 'border-cyber-fuchsia bg-cyber-fuchsia/10';
    }
  };

  const getCharacterIcon = () => {
    switch (mode) {
      case 'alert':
        return '🩸';
      case 'praise':
        return '⚕️';
      default:
        return '🚬';
    }
  };

  return (
    <div className={`dr-nicotine-dialogue ${getModeStyles()} relative overflow-hidden`}>
      {/* Smoke overlay animation */}
      <div className="absolute top-0 right-0 opacity-30">
        <div className="animate-smoke-drift text-gray-400 text-xs">
          ░░░
        </div>
      </div>

      <div className="flex items-start space-x-4 relative z-10">
        {showCharacter && (
          <div className="flex-shrink-0">
            <div className="relative">
              {/* Character representation */}
              <div className="w-12 h-12 bg-military-metal rounded-full flex items-center justify-center border-2 border-cyber-fuchsia scanline-overlay">
                <span className="text-xl">{getCharacterIcon()}</span>
              </div>
              
              {/* Animated cigarette ember for neutral/default mode */}
              {mode === 'neutral' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ember-glow"></div>
              )}
            </div>
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-cyber-cyan font-bebas text-sm tracking-wider">
              DR. NICOTINE
            </span>
            <span className="text-military-metal text-xs">
              // MÉDICO DE COMBATE
            </span>
          </div>
          
          <div className="font-consolas text-sm leading-relaxed">
            {message}
          </div>
        </div>
      </div>

      {/* CRT scanline effect */}
      <div className="absolute inset-0 bg-scanlines opacity-40 pointer-events-none"></div>
    </div>
  );
};

export default CombatMedic;
