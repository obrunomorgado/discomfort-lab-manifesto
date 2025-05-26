
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

  return (
    <div className={`dr-nicotine-dialogue ${getModeStyles()} relative overflow-hidden`}>
      {/* Smoke overlay animation */}
      <div className="absolute top-0 right-0 opacity-30">
        <div className="animate-smoke-drift text-gray-400 text-xs">
          ░░░
        </div>
      </div>

      <div className="flex items-start space-x-6 relative z-10">
        {showCharacter && (
          <div className="flex-shrink-0">
            <div className="relative">
              {/* Dr. Nicotine Image */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-cyber-fuchsia scanline-overlay bg-military-metal">
                <img 
                  src="/lovable-uploads/dfa1d651-611f-49ea-b66c-8527e45a1cd6.png"
                  alt="Dr. Nicotine - Médico de Combate"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {/* Animated cigarette ember for neutral/default mode */}
              {mode === 'neutral' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ember-glow"></div>
              )}
            </div>
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-cyber-cyan font-bebas text-lg tracking-wider">
              DR. NICOTINE
            </span>
            <span className="text-military-metal text-sm">
              // MÉDICO DE COMBATE
            </span>
          </div>
          
          <div className="font-consolas text-base leading-relaxed">
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
