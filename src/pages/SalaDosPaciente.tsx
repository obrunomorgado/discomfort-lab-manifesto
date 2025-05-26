
import { useUserProgress } from '@/hooks/useUserProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  Heart, 
  Target, 
  TrendingUp, 
  User,
  Zap,
  FileText,
  Coins
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SalaDosPaciente = () => {
  const { progress, getStats, getPendingActions } = useUserProgress();
  const stats = getStats();
  const pendingActions = getPendingActions();

  const getStatusColor = () => {
    if (progress.isInTreatment) return 'text-red-400';
    if (pendingActions.length > 0) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getStatusText = () => {
    if (progress.isInTreatment) return 'EM TRATAMENTO INTENSIVO';
    if (pendingActions.length > 0) return 'AÇÕES PENDENTES';
    return 'ESTÁVEL';
  };

  const daysInTreatment = progress.treatmentStartDate ? 
    Math.floor((new Date().getTime() - progress.treatmentStartDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  const levelProgress = {
    current: progress.totalPoints - ((progress.level - 1) * 1000),
    needed: 1000,
    percentage: ((progress.totalPoints - ((progress.level - 1) * 1000)) / 1000) * 100
  };

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Medical Chart Header */}
        <div className="bg-dark-card rounded-lg border-2 border-warm-yellow/30 shadow-2xl mb-8 warning-glow">
          <div className="bg-gradient-to-r from-warm-yellow to-yellow-600 text-dark-bg p-6 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-dark-bg text-warm-yellow rounded-full p-3">
                  <User size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bebas tracking-wider">
                    PRONTUÁRIO MÉDICO - PACIENTE #{Math.random().toString(36).substring(2, 8).toUpperCase()}
                  </h1>
                  <p className="text-dark-bg/80">
                    Data de Admissão: {new Date().toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xl font-bebas ${getStatusColor()}`}>
                  {getStatusText()}
                </div>
                <div className="text-sm text-dark-bg/80">
                  Nível de Tratamento: {progress.level}
                </div>
              </div>
            </div>
          </div>

          {/* Vital Signs */}
          <div className="p-6 border-b border-dark-border">
            <h2 className="text-lg font-bebas text-warm-gray mb-4 flex items-center space-x-2">
              <Activity size={20} />
              <span>SINAIS VITAIS</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 border border-green-500/50 rounded p-4 text-center hover-lift">
                <Heart className="mx-auto text-green-400 mb-2" size={24} />
                <div className="text-2xl font-bebas text-green-300">{progress.credits}</div>
                <div className="text-xs text-green-400">CRÉDITOS</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-500/50 rounded p-4 text-center hover-lift">
                <Target className="mx-auto text-blue-400 mb-2" size={24} />
                <div className="text-2xl font-bebas text-blue-300">{stats.totalPoints}</div>
                <div className="text-xs text-blue-400">PONTOS TOTAIS</div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-500/50 rounded p-4 text-center hover-lift">
                <TrendingUp className="mx-auto text-purple-400 mb-2" size={24} />
                <div className="text-2xl font-bebas text-purple-300">{stats.testsCompleted}</div>
                <div className="text-xs text-purple-400">TESTES REALIZADOS</div>
              </div>
              <div className={`${progress.debtPoints > 0 ? 'bg-gradient-to-br from-red-900/50 to-red-800/30 border-red-500/50 animate-pulse-warning' : 'bg-gradient-to-br from-gray-800/50 to-gray-700/30 border-gray-500/50'} border rounded p-4 text-center hover-lift`}>
                <AlertTriangle className={`mx-auto mb-2 ${progress.debtPoints > 0 ? 'text-red-400' : 'text-gray-400'}`} size={24} />
                <div className={`text-2xl font-bebas ${progress.debtPoints > 0 ? 'text-red-300' : 'text-gray-400'}`}>
                  {progress.debtPoints}
                </div>
                <div className={`text-xs ${progress.debtPoints > 0 ? 'text-red-400' : 'text-gray-400'}`}>DÍVIDA</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Current Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emergency Alerts */}
            {(progress.isInTreatment || pendingActions.length > 0) && (
              <Card className="border-red-500/50 bg-gradient-to-br from-red-900/30 to-red-800/20 warning-glow animate-pulse-warning">
                <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2 font-bebas">
                    <AlertTriangle size={20} />
                    <span>ALERTA MÉDICO</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {progress.isInTreatment && (
                    <div className="mb-4">
                      <div className="text-red-300 font-bebas text-lg">
                        PACIENTE EM TRATAMENTO INTENSIVO
                      </div>
                      <p className="text-red-400">
                        {progress.debtPoints} pontos de dívida acumulados • {daysInTreatment} dias em tratamento
                      </p>
                      <div className="mt-3 p-3 bg-red-900/50 rounded border border-red-500/30">
                        <p className="text-sm text-red-300">
                          ⚠️ <strong>PENALIDADE ATIVA:</strong> Cada dia sem check-in = -2 créditos automáticos
                        </p>
                      </div>
                    </div>
                  )}
                  {pendingActions.length > 0 && (
                    <div>
                      <div className="text-orange-300 font-bebas text-lg">
                        {pendingActions.length} AÇÕES PENDENTES
                      </div>
                      <div className="mt-2 space-y-2">
                        {pendingActions.slice(0, 3).map((action) => (
                          <div key={action.id} className="flex items-center justify-between p-2 bg-orange-900/30 rounded border border-orange-500/30">
                            <span className="text-sm text-orange-200">{action.description}</span>
                            <Badge variant="outline" className="text-xs text-orange-400 border-orange-500/50">
                              -{action.points} pts/dia
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Diagnosis */}
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-bebas text-warm-gray">
                  <FileText size={20} />
                  <span>DIAGNÓSTICO ATUAL</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-warm-gray/70 mb-1">Score de Honestidade:</div>
                    <div className="flex items-center space-x-3">
                      <Progress value={(stats.honestyScore / 10) * 100} className="flex-1 h-2" />
                      <span className="font-bebas text-lg text-warm-yellow">{stats.honestyScore}/10</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-warm-gray/70 mb-1">Progresso para Próximo Nível:</div>
                    <div className="flex items-center space-x-3">
                      <Progress value={levelProgress.percentage} className="flex-1 h-2" />
                      <span className="font-bebas text-lg text-warm-yellow">{levelProgress.current}/{levelProgress.needed}</span>
                    </div>
                  </div>
                  {progress.testsCompleted.length > 0 && (
                    <div>
                      <div className="text-sm text-warm-gray/70 mb-2">Últimos Testes Realizados:</div>
                      <div className="space-y-2">
                        {progress.testsCompleted.slice(-3).reverse().map((test, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-dark-bg/50 rounded border border-dark-border">
                            <span className="text-sm text-warm-gray">{test.testName}</span>
                            <Badge variant="outline" className="text-xs text-green-400 border-green-500/50">
                              +{test.pointsEarned} pts
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-bebas text-warm-gray">
                  <Zap size={20} />
                  <span>PRÓXIMAS AÇÕES</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/testes">
                    <Button className="w-full bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas hover-lift">
                      REALIZAR TESTE
                    </Button>
                  </Link>
                  {pendingActions.length > 0 ? (
                    <Button variant="outline" className="w-full font-bebas border-red-500/50 text-red-400 hover:bg-red-900/30 hover-lift">
                      COMPLETAR AÇÕES ({pendingActions.length})
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full font-bebas border-dark-border text-warm-gray hover:bg-dark-bg/50 hover-lift">
                      CHECK-IN DIÁRIO
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Medical Chart Details */}
          <div className="space-y-6">
            {/* Patient Info */}
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-bebas text-warm-gray">
                  <User size={20} />
                  <span>DADOS DO PACIENTE</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-warm-gray/70">ID:</span>
                  <span className="font-mono text-sm text-warm-yellow">#{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-warm-gray/70">Nível:</span>
                  <span className="font-bebas text-warm-yellow">{progress.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-warm-gray/70">Badges:</span>
                  <span className="font-bebas text-warm-yellow">{progress.badges.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-warm-gray/70">Última Atividade:</span>
                  <span className="text-sm text-warm-gray">{new Date(progress.lastActivity).toLocaleDateString('pt-BR')}</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-bebas text-warm-gray">
                  <Calendar size={20} />
                  <span>EVOLUÇÃO CLÍNICA</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {progress.testsCompleted.length > 0 ? (
                  <div className="space-y-3">
                    {progress.testsCompleted.slice(-4).reverse().map((test, index) => (
                      <div key={index} className="border-l-2 border-blue-500/50 pl-3 bg-dark-bg/30 p-2 rounded-r">
                        <div className="text-sm font-medium text-warm-gray">{test.testName}</div>
                        <div className="text-xs text-warm-gray/60">
                          {new Date(test.completedAt).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-xs text-blue-400">
                          Honestidade: {test.honestyScore}/10
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-warm-gray/60 text-sm text-center py-4">
                    Nenhum registro de evolução ainda
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Treatment Schedule */}
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-bebas text-warm-gray">
                  <Clock size={20} />
                  <span>CRONOGRAMA</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-900/30 rounded border border-blue-500/30">
                    <div className="font-medium text-sm text-blue-300">Check-in Diário</div>
                    <div className="text-xs text-blue-400">Obrigatório - Penalidade: -2 créditos</div>
                  </div>
                  {progress.isInTreatment && (
                    <div className="p-3 bg-red-900/30 rounded border border-red-500/30 animate-pulse-warning">
                      <div className="font-medium text-sm text-red-300">Ações de Recuperação</div>
                      <div className="text-xs text-red-400">{pendingActions.length} pendentes</div>
                    </div>
                  )}
                  <div className="p-3 bg-green-900/30 rounded border border-green-500/30">
                    <div className="font-medium text-sm text-green-300">Próximo Teste</div>
                    <div className="text-xs text-green-400">Disponível agora</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaDosPaciente;
