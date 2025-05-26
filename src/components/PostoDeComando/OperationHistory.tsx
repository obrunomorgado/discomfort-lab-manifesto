
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { UserProgress } from '@/types/user';

interface OperationHistoryProps {
  progress: UserProgress;
}

const OperationHistory = ({ progress }: OperationHistoryProps) => {
  return (
    <Card className="bg-military-card border-military-border rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-bebas text-warm-gray">
          <Calendar size={20} className="text-cyber-cyan" />
          <span>HISTÓRICO DE OPERAÇÕES</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {progress.testsCompleted.length > 0 ? (
          <div className="space-y-3">
            {progress.testsCompleted.slice(-4).reverse().map((test, index) => (
              <div key={index} className="border-l-2 border-cyber-cyan/50 pl-3 bg-military-bg/30 p-2 rounded-r">
                <div className="text-sm font-medium text-warm-gray font-consolas">{test.testName}</div>
                <div className="text-xs text-warm-gray/60 font-consolas">
                  {new Date(test.completedAt).toLocaleDateString('pt-BR')}
                </div>
                <div className="text-xs text-cyber-cyan font-consolas">
                  Disciplina: {test.honestyScore}/10
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-warm-gray/60 text-sm text-center py-4 font-consolas">
            Nenhum registro de operação ainda
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default OperationHistory;
