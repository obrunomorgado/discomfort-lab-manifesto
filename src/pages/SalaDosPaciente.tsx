
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
    if (progress.isInTreatment) return 'text-red-500';
    if (pendingActions.length > 0) return 'text-yellow-500';
    return 'text-green-500';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Medical Chart Header */}
        <div className="bg-white rounded-lg border-2 border-gray-300 shadow-lg mb-8">
          <div className="bg-gray-800 text-white p-6 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white text-gray-800 rounded-full p-3">
                  <User size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bebas tracking-wider">
                    PRONTUÁRIO MÉDICO - PACIENTE #{Math.random().toString(36).substring(2, 8).toUpperCase()}
                  </h1>
                  <p className="text-gray-300">
                    Data de Admissão: {new Date().toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xl font-bebas ${getStatusColor()}`}>
                  {getStatusText()}
                </div>
                <div className="text-sm text-gray-300">
                  Nível de Tratamento: {progress.level}
                </div>
              </div>
            </div>
          </div>

          {/* Vital Signs */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bebas text-gray-800 mb-4 flex items-center space-x-2">
              <Activity size={20} />
              <span>SINAIS VITAIS</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-green-50 border border-green-200 rounded p-4 text-center">
                <Heart className="mx-auto text-green-600 mb-2" size={24} />
                <div className="text-2xl font-bebas text-green-700">{progress.credits}</div>
                <div className="text-xs text-green-600">CRÉDITOS</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-center">
                <Target className="mx-auto text-blue-600 mb-2" size={24} />
                <div className="text-2xl font-bebas text-blue-700">{stats.totalPoints}</div>
                <div className="text-xs text-blue-600">PONTOS TOTAIS</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded p-4 text-center">
                <TrendingUp className="mx-auto text-purple-600 mb-2" size={24} />
                <div className="text-2xl font-bebas text-purple-700">{stats.testsCompleted}</div>
                <div className="text-xs text-purple-600">TESTES REALIZADOS</div>
              </div>
              <div className={`${progress.debtPoints > 0 ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'} border rounded p-4 text-center`}>
                <AlertTriangle className={`mx-auto mb-2 ${progress.debtPoints > 0 ? 'text-red-600' : 'text-gray-400'}`} size={24} />
                <div className={`text-2xl font-bebas ${progress.debtPoints > 0 ? 'text-red-700' : 'text-gray-500'}`}>
                  {progress.debtPoints}
                </div>
                <div className={`text-xs ${progress.debtPoints > 0 ? 'text-red-600' : 'text-gray-400'}`}>DÍVIDA</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Current Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emergency Alerts */}
            {(progress.isInTreatment || pendingActions.length > 0) && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader className="bg-red-600 text-white">
                  <CardTitle className="flex items-center space-x-2 font-bebas">
                    <AlertTriangle size={20} />
                    <span>ALERTA MÉDICO</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {progress.isInTreatment && (
                    <div className="mb-4">
                      <div className="text-red-700 font-bebas text-lg">
                        PACIENTE EM TRATAMENTO INTENSIVO
                      </div>
                      <p className="text-red-600">
                        {progress.debtPoints} pontos de dívida acumulados • {daysInTreatment} dias em tratamento
                      </p>
                      <div className="mt-3 p-3 bg-red-100 rounded border border-red-200">
                        <p className="text-sm text-red-700">
                          ⚠️ <strong>PENALIDADE ATIVA:</strong> Cada dia sem check-in = -2 créditos automáticos
                        </p>
                      </div>
                    </div>
                  )}
                  {pendingActions.length > 0 && (
                    <div>
                      <div className="text-orange-700 font-bebas text-lg">
                        {pendingActions.length} AÇÕES PENDENTES
                      </div>
                      <div className="mt-2 space-y-2">
                        {pendingActions.slice(0, 3).map((action) => (
                          <div key={action.id} className="flex items-center justify-between p-2 bg-orange-100 rounded">
                            <span className="text-sm text-orange-800">{action.description}</span>
                            <Badge variant="outline" className="text-xs text-orange-600">
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
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-bebas text-gray-800">
                  <FileText size={20} />
                  <span>DIAGNÓSTICO ATUAL</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Score de Honestidade:</div>
                    <div className="flex items-center space-x-3">
                      <Progress value={(stats.honestyScore / 10) * 100} className="flex-1 h-2" />
                      <span className="font-bebas text-lg">{stats.honestyScore}/10</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Progresso para Próximo Nível:</div>
                    <div className="flex items-center space-x-3">
                      <Progress value={levelProgress.percentage} className="flex-1 h-2" />
                      <span className="font-bebas text-lg">{levelProgress.current}/{levelProgress.needed}</span>
                    </div>
                  </div>
                  {progress.testsCompleted.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Últimos Testes Realizados:</div>
                      <div className="space-y-2">
                        {progress.testsCompleted.slice(-3).reverse().map((test, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">{test.testName}</span>
                            <Badge variant="outline" className="text-xs">
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
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-bebas text-gray-800">
                  <Zap size={20} />
                  <span>PRÓXIMAS AÇÕES</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/testes">
                    <Button className="w-full bg-warm-yellow text-dark-bg hover:bg-warm-yellow/90 font-bebas">
                      REALIZAR TESTE
                    </Button>
                  </Link>
                  {pendingActions.length > 0 ? (
                    <Button variant="outline" className="w-full font-bebas border-red-300 text-red-600 hover:bg-red-50">
                      COMPLETAR AÇÕES ({pendingActions.length})
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full font-bebas">
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
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-bebas text-gray-800">
                  <User size={20} />
                  <span>DADOS DO PACIENTE</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">ID:</span>
                  <span className="font-mono text-sm">#{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Nível:</span>
                  <span className="font-bebas">{progress.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Badges:</span>
                  <span className="font-bebas">{progress.badges.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Última Atividade:</span>
                  <span className="text-sm">{new Date(progress.lastActivity).toLocaleDateString('pt-BR')}</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-bebas text-gray-800">
                  <Calendar size={20} />
                  <span>EVOLUÇÃO CLÍNICA</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {progress.testsCompleted.length > 0 ? (
                  <div className="space-y-3">
                    {progress.testsCompleted.slice(-4).reverse().map((test, index) => (
                      <div key={index} className="border-l-2 border-blue-300 pl-3">
                        <div className="text-sm font-medium">{test.testName}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(test.completedAt).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-xs text-blue-600">
                          Honestidade: {test.honestyScore}/10
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-4">
                    Nenhum registro de evolução ainda
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Treatment Schedule */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-bebas text-gray-800">
                  <Clock size={20} />
                  <span>CRONOGRAMA</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded border border-blue-200">
                    <div className="font-medium text-sm text-blue-800">Check-in Diário</div>
                    <div className="text-xs text-blue-600">Obrigatório - Penalidade: -2 créditos</div>
                  </div>
                  {progress.isInTreatment && (
                    <div className="p-3 bg-red-50 rounded border border-red-200">
                      <div className="font-medium text-sm text-red-800">Ações de Recuperação</div>
                      <div className="text-xs text-red-600">{pendingActions.length} pendentes</div>
                    </div>
                  )}
                  <div className="p-3 bg-green-50 rounded border border-green-200">
                    <div className="font-medium text-sm text-green-800">Próximo Teste</div>
                    <div className="text-xs text-green-600">Disponível agora</div>
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
