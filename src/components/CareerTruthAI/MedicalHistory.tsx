
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, TrendingUp, TrendingDown, Minus, FileText, Clock } from 'lucide-react';
import { UserProgress } from '@/types/user';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MedicalHistoryProps {
  progress: UserProgress;
  isOpen: boolean;
  onClose: () => void;
}

const MedicalHistory = ({ progress, isOpen, onClose }: MedicalHistoryProps) => {
  if (!isOpen) return null;

  const careerTests = progress.testsCompleted.filter(t => t.testId === 'career-truth-ai');
  const { medicalProgress } = progress;

  const getTrendIcon = () => {
    switch (medicalProgress.evolutionTrend) {
      case 'improving': return <TrendingUp className="text-green-500" size={20} />;
      case 'declining': return <TrendingDown className="text-red-500" size={20} />;
      default: return <Minus className="text-yellow-500" size={20} />;
    }
  };

  const getTrendColor = () => {
    switch (medicalProgress.evolutionTrend) {
      case 'improving': return 'text-green-500';
      case 'declining': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getTrendText = () => {
    switch (medicalProgress.evolutionTrend) {
      case 'improving': return 'EM MELHORIA';
      case 'declining': return 'EM DECLÍNIO';
      default: return 'ESTÁVEL';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card border border-warm-yellow/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <FileText className="text-warm-yellow" size={28} />
              <h2 className="text-2xl font-bebas text-warm-yellow">PRONTUÁRIO MÉDICO</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-warm-gray hover:text-warm-yellow transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Medical Status Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-dark-bg/50 border-warm-yellow/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-warm-yellow font-bebas text-lg">STATUS MÉDICO</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-warm-gray/70">Consultas:</span>
                    <span className="text-warm-yellow font-bebas">{medicalProgress.totalConsultations}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray/70">Média Score:</span>
                    <span className="text-warm-yellow font-bebas">{Math.round(medicalProgress.averageScore)}/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-warm-gray/70">Tendência:</span>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon()}
                      <span className={`font-bebas text-sm ${getTrendColor()}`}>
                        {getTrendText()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-bg/50 border-warm-yellow/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-warm-yellow font-bebas text-lg">PROGRESSO GERAL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Progress value={(medicalProgress.totalConsultations / 5) * 100} className="mb-2" />
                  <div className="text-center">
                    <div className="text-2xl font-bebas text-warm-yellow">
                      {Math.round((medicalProgress.totalConsultations / 5) * 100)}%
                    </div>
                    <div className="text-xs text-warm-gray/70">
                      {medicalProgress.isPatientCured ? 'PACIENTE CURADO' : 'COMPLETADO'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-bg/50 border-warm-yellow/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-warm-yellow font-bebas text-lg">PRÓXIMA CONSULTA</CardTitle>
              </CardHeader>
              <CardContent>
                {medicalProgress.isBlocked ? (
                  <div className="text-center">
                    <div className="text-red-400 font-bebas mb-2">BLOQUEADO</div>
                    <div className="text-xs text-warm-gray/70">
                      {medicalProgress.canSuborn ? 'Suborno disponível' : 'Tratamento completo'}
                    </div>
                  </div>
                ) : medicalProgress.nextAppointment ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Calendar size={16} className="text-warm-yellow" />
                      <span className="font-bebas text-warm-yellow">
                        {format(medicalProgress.nextAppointment, 'dd/MM/yyyy', { locale: ptBR })}
                      </span>
                    </div>
                    <div className="text-xs text-warm-gray/70">
                      {format(medicalProgress.nextAppointment, 'EEEE', { locale: ptBR })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-warm-yellow font-bebas">DISPONÍVEL</div>
                    <div className="text-xs text-warm-gray/70">Agende sua consulta</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Consultation History */}
          <div className="mb-8">
            <h3 className="text-xl font-bebas text-warm-yellow mb-4 flex items-center space-x-2">
              <Clock size={20} />
              <span>HISTÓRICO DE CONSULTAS</span>
            </h3>
            
            {careerTests.length === 0 ? (
              <Card className="bg-dark-bg/30 border-warm-gray/20">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">🏥</div>
                  <div className="text-warm-gray/70">Nenhuma consulta realizada ainda</div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {careerTests.map((test, index) => (
                  <Card key={test.testId + test.completedAt.toString()} className="bg-dark-bg/30 border-warm-gray/20">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge className="bg-warm-yellow/20 text-warm-yellow font-bebas">
                              CONSULTA #{test.testNumber || index + 1}
                            </Badge>
                            <span className="text-warm-gray/70 text-sm">
                              {format(test.completedAt, 'dd/MM/yyyy - HH:mm', { locale: ptBR })}
                            </span>
                          </div>
                          <div className="text-2xl font-bebas text-warm-yellow">
                            Score: {test.overallScore || 'N/A'}/100
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-warm-gray/70 mb-1">Honestidade</div>
                          <div className="font-bebas text-warm-yellow">{test.honestyScore}/10</div>
                        </div>
                      </div>
                      
                      {test.diagnosis && (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-warm-gray/70">Gravidade:</span>
                            <Badge 
                              className={`font-bebas text-xs ${
                                test.diagnosis.severity === 'mild' ? 'bg-green-600/20 text-green-400' :
                                test.diagnosis.severity === 'moderate' ? 'bg-yellow-600/20 text-yellow-400' :
                                test.diagnosis.severity === 'severe' ? 'bg-orange-600/20 text-orange-400' :
                                'bg-red-600/20 text-red-400'
                              }`}
                            >
                              {test.diagnosis.severity.toUpperCase()}
                            </Badge>
                          </div>
                          
                          {test.diagnosis.improvementAreas.length > 0 && (
                            <div>
                              <div className="text-sm text-warm-gray/70 mb-2">Áreas para Melhoria:</div>
                              <div className="flex flex-wrap gap-2">
                                {test.diagnosis.improvementAreas.map(area => (
                                  <Badge key={area} variant="outline" className="text-xs border-red-500/30 text-red-400">
                                    {area}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {test.diagnosis.strengths.length > 0 && (
                            <div>
                              <div className="text-sm text-warm-gray/70 mb-2">Pontos Fortes:</div>
                              <div className="flex flex-wrap gap-2">
                                {test.diagnosis.strengths.map(strength => (
                                  <Badge key={strength} variant="outline" className="text-xs border-green-500/30 text-green-400">
                                    {strength}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Comparative Analysis */}
          {careerTests.length >= 2 && (
            <div>
              <h3 className="text-xl font-bebas text-warm-yellow mb-4">ANÁLISE COMPARATIVA</h3>
              <Card className="bg-dark-bg/30 border-warm-gray/20">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-lg font-bebas text-warm-yellow mb-3">PRIMEIRA vs. ÚLTIMA CONSULTA</div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-warm-gray/70">Primeira:</span>
                          <span className="font-bebas text-warm-yellow">{careerTests[0].overallScore || 'N/A'}/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-warm-gray/70">Última:</span>
                          <span className="font-bebas text-warm-yellow">{careerTests[careerTests.length - 1].overallScore || 'N/A'}/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-warm-gray/70">Evolução:</span>
                          <span className={`font-bebas ${
                            (careerTests[careerTests.length - 1].overallScore || 0) > (careerTests[0].overallScore || 0) 
                              ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {((careerTests[careerTests.length - 1].overallScore || 0) - (careerTests[0].overallScore || 0)) > 0 ? '+' : ''}
                            {(careerTests[careerTests.length - 1].overallScore || 0) - (careerTests[0].overallScore || 0)} pontos
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-lg font-bebas text-warm-yellow mb-3">RECOMENDAÇÕES MÉDICAS</div>
                      <div className="space-y-2 text-sm text-warm-gray/70">
                        {medicalProgress.evolutionTrend === 'improving' && (
                          <div>✅ Paciente apresenta melhoria consistente</div>
                        )}
                        {medicalProgress.evolutionTrend === 'declining' && (
                          <div>⚠️ Necessário intensificar tratamento</div>
                        )}
                        {medicalProgress.averageScore >= 80 && (
                          <div>🏆 Paciente próximo da alta médica</div>
                        )}
                        {medicalProgress.averageScore < 50 && (
                          <div>🚨 Caso requer atenção especial</div>
                        )}
                        {medicalProgress.subornsUsed > 0 && (
                          <div>💰 Histórico de subornos: {medicalProgress.subornsUsed}x</div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
