import { useUserProgress } from '@/hooks/useUserProgress';
import { usePenaltyContract } from '@/hooks/usePenaltyContract';
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
  Coins,
  DollarSign,
  Shield,
  Crosshair,
  Radio
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PenaltyStatusChip from '@/components/SkinInTheGame/PenaltyStatusChip';
import PenaltySetupModal from '@/components/SkinInTheGame/PenaltySetupModal';
import PenaltyManagement from '@/components/SkinInTheGame/PenaltyManagement';
import CombatMedic from '@/components/CombatMedic/CombatMedic';

const PostoDeComando = () => {
  const { progress, getStats, getPendingActions } = useUserProgress();
  const { activeContract } = usePenaltyContract();
  const [showPenaltySetup, setShowPenaltySetup] = useState(false);
  const [showPenaltyManagement, setShowPenaltyManagement] = useState(false);
  
  const stats = getStats();
  const pendingActions = getPendingActions();

  const getStatusColor = () => {
    if (progress.isInTreatment) return 'text-cyber-warning';
    if (pendingActions.length > 0) return 'text-cyber-fuchsia';
    return 'text-cyber-neon';
  };

  const getStatusText = () => {
    if (progress.isInTreatment) return 'FERIDO EM COMBATE';
    if (pendingActions.length > 0) return 'MISSÕES PENDENTES';
    return 'PRONTO PARA COMBATE';
  };

  const daysInTreatment = progress.treatmentStartDate ? 
    Math.floor((new Date().getTime() - progress.treatmentStartDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  const levelProgress = {
    current: progress.totalPoints - ((progress.level - 1) * 1000),
    needed: 1000,
    percentage: ((progress.totalPoints - ((progress.level - 1) * 1000)) / 1000) * 100
  };

  const getDrNicotineMessage = () => {
    if (progress.isInTreatment) {
      return "🩸 Hemorragia de disciplina detectada. Suturar imediatamente ou sangrar créditos.";
    }
    if (pendingActions.length > 0) {
      return "Selecione seu tormento, soldado. Missões aguardam execução.";
    }
    return "Posto de comando operacional. Aguardando ordens para próxima missão.";
  };

  const getDrNicotineMode = () => {
    if (progress.isInTreatment) return 'alert';
    if (pendingActions.length > 0) return 'neutral';
    return 'praise';
  };

  return (
    <div className="min-h-screen bg-military-bg py-8 px-4 scanline-overlay">
      <div className="max-w-7xl mx-auto">
        {/* Military Command Header */}
        <div className="bg-military-card rounded-lg border-2 border-cyber-fuchsia/30 shadow-2xl mb-8 cyber-glow rivet-border">
          <div className="bg-gradient-to-r from-cyber-fuchsia/20 to-cyber-cyan/20 text-warm-gray p-6 rounded-t-lg metal-brushed">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-military-bg text-cyber-fuchsia rounded-full p-3 border border-cyber-fuchsia">
                  <Shield size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bebas tracking-wider text-cyber-cyan">
                    DOSSIÊ DO RECRUTA - ID#{Math.random().toString(36).substring(2, 8).toUpperCase()}
                  </h1>
                  <p className="text-warm-gray/80 font-consolas">
                    Data de Alistamento: {new Date().toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xl font-bebas ${getStatusColor()}`}>
                  {getStatusText()}
                </div>
                <div className="text-sm text-warm-gray/80 font-consolas">
                  Rank Operacional: {progress.level}
                </div>
              </div>
            </div>
          </div>

          {/* Combat Resources (formerly Vital Signs) */}
          <div className="p-6 border-b border-military-border">
            <h2 className="text-lg font-bebas text-warm-gray mb-4 flex items-center space-x-2">
              <Radio size={20} className="text-cyber-cyan" />
              <span>RECURSOS DE CAMPO</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-cyber-neon/20 to-military-olive/30 border border-cyber-neon/50 rounded p-4 text-center hover-lift hover-glitch">
                <Coins className="mx-auto text-cyber-neon mb-2" size={24} />
                <div className="text-2xl font-bebas text-cyber-neon">{progress.credits}</div>
                <div className="text-xs text-cyber-neon font-consolas">CRÉDITOS</div>
              </div>
              <div className="bg-gradient-to-br from-cyber-cyan/20 to-military-navy/30 border border-cyber-cyan/50 rounded p-4 text-center hover-lift hover-glitch">
                <Target className="mx-auto text-cyber-cyan mb-2" size={24} />
                <div className="text-2xl font-bebas text-cyber-cyan">{stats.totalPoints}</div>
                <div className="text-xs text-cyber-cyan font-consolas">PONTOS XP</div>
              </div>
              <div className="bg-gradient-to-br from-cyber-fuchsia/20 to-military-purple/30 border border-cyber-fuchsia/50 rounded p-4 text-center hover-lift hover-glitch">
                <Crosshair className="mx-auto text-cyber-fuchsia mb-2" size={24} />
                <div className="text-2xl font-bebas text-cyber-fuchsia">{stats.testsCompleted}</div>
                <div className="text-xs text-cyber-fuchsia font-consolas">MISSÕES</div>
              </div>
              <div className={`${progress.debtPoints > 0 ? 'bg-gradient-to-br from-cyber-warning/20 to-red-800/30 border-cyber-warning/50 animate-pulse-warning' : 'bg-gradient-to-br from-military-metal/20 to-gray-700/30 border-military-metal/50'} border rounded p-4 text-center hover-lift hover-glitch`}>
                <AlertTriangle className={`mx-auto mb-2 ${progress.debtPoints > 0 ? 'text-cyber-warning' : 'text-military-metal'}`} size={24} />
                <div className={`text-2xl font-bebas ${progress.debtPoints > 0 ? 'text-cyber-warning' : 'text-military-metal'}`}>
                  {progress.debtPoints}
                </div>
                <div className={`text-xs font-consolas ${progress.debtPoints > 0 ? 'text-cyber-warning' : 'text-military-metal'}`}>DÍVIDA</div>
              </div>
            </div>
          </div>

          {/* Dr. Nicotine Communication */}
          <div className="p-6 border-b border-military-border">
            <CombatMedic 
              mode={getDrNicotineMode()}
              message={getDrNicotineMessage()}
            />
          </div>

          {/* Penalty Status */}
          <div className="p-6 border-b border-military-border">
            <PenaltyStatusChip 
              contract={activeContract}
              onManage={() => setShowPenaltyManagement(true)}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Combat Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emergency Combat Alerts */}
            {(progress.isInTreatment || pendingActions.length > 0) && (
              <Card className="border-cyber-warning/50 bg-gradient-to-br from-cyber-warning/20 to-red-800/20 warning-glow animate-pulse-warning rivet-border">
                <CardHeader className="bg-gradient-to-r from-cyber-warning/30 to-red-700/30 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2 font-bebas">
                    <AlertTriangle size={20} />
                    <span>ALERTA DE COMBATE</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {progress.isInTreatment && (
                    <div className="mb-4">
                      <div className="text-cyber-warning font-bebas text-lg">
                        RECRUTA FERIDO EM AÇÃO
                      </div>
                      <p className="text-red-400 font-consolas">
                        {progress.debtPoints} pontos de dívida acumulados • {daysInTreatment} dias em recuperação
                      </p>
                      <div className="mt-3 p-3 bg-red-900/50 rounded border border-red-500/30">
                        <p className="text-sm text-red-300 font-consolas">
                          ⚠️ <strong>PENALIDADE ATIVA:</strong> Cada dia sem check-in = -2 créditos automáticos
                        </p>
                      </div>
                    </div>
                  )}
                  {pendingActions.length > 0 && (
                    <div>
                      <div className="text-orange-300 font-bebas text-lg">
                        {pendingActions.length} MISSÕES PENDENTES
                      </div>
                      <div className="mt-2 space-y-2">
                        {pendingActions.slice(0, 3).map((action) => (
                          <div key={action.id} className="flex items-center justify-between p-2 bg-orange-900/30 rounded border border-orange-500/30">
                            <span className="text-sm text-orange-200 font-consolas">{action.description}</span>
                            <Badge variant="outline" className="text-xs text-orange-400 border-orange-500/50 font-consolas">
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

            {/* Intel de Missão (formerly Diagnosis) */}
            <Card className="bg-military-card border-military-border rivet-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-bebas text-warm-gray">
                  <FileText size={20} className="text-cyber-cyan" />
                  <span>INTEL DE MISSÃO</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-warm-gray/70 mb-1 font-consolas">Score de Disciplina:</div>
                    <div className="flex items-center space-x-3">
                      <Progress value={(stats.honestyScore / 10) * 100} className="flex-1 h-2" />
                      <span className="font-bebas text-lg text-cyber-fuchsia">{stats.honestyScore}/10</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-warm-gray/70 mb-1 font-consolas">Progresso para Próximo Rank:</div>
                    <div className="flex items-center space-x-3">
                      <Progress value={levelProgress.percentage} className="flex-1 h-2" />
                      <span className="font-bebas text-lg text-cyber-fuchsia">{levelProgress.current}/{levelProgress.needed}</span>
                    </div>
                  </div>
                  {progress.testsCompleted.length > 0 && (
                    <div>
                      <div className="text-sm text-warm-gray/70 mb-2 font-consolas">Últimas Missões Executadas:</div>
                      <div className="space-y-2">
                        {progress.testsCompleted.slice(-3).reverse().map((test, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-military-bg/50 rounded border border-military-border">
                            <span className="text-sm text-warm-gray font-consolas">{test.testName}</span>
                            <Badge variant="outline" className="text-xs text-cyber-neon border-cyber-neon/50 font-consolas">
                              +{test.pointsEarned} XP
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Ordens Imediatas (formerly Quick Actions) */}
            <Card className="bg-military-card border-military-border rivet-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-bebas text-warm-gray">
                  <Zap size={20} className="text-cyber-cyan" />
                  <span>ORDENS IMEDIATAS</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link to="/testes">
                    <Button className="w-full bg-cyber-fuchsia text-military-bg hover:bg-cyber-fuchsia/90 font-bebas hover-lift hover-glitch">
                      SELECIONAR MISSÃO
                    </Button>
                  </Link>
                  {!activeContract || !activeContract.is_active ? (
                    <Button 
                      onClick={() => setShowPenaltySetup(true)}
                      className="w-full bg-cyber-warning text-white hover:bg-cyber-warning/90 font-bebas hover-lift hover-glitch flex items-center space-x-2"
                    >
                      <DollarSign size={16} />
                      <span>ATIVAR PENALIDADE</span>
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setShowPenaltyManagement(true)}
                      variant="outline" 
                      className="w-full font-bebas border-cyber-warning/50 text-cyber-warning hover:bg-cyber-warning/20 hover-lift hover-glitch"
                    >
                      GERENCIAR COMPROMISSO
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recruta Data */}
          <div className="space-y-6">
            {/* Dados do Recruta */}
            <Card className="bg-military-card border-military-border rivet-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-bebas text-warm-gray">
                  <User size={20} className="text-cyber-cyan" />
                  <span>DADOS DO RECRUTA</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-warm-gray/70 font-consolas">ID:</span>
                  <span className="font-mono text-sm text-cyber-fuchsia">#{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-warm-gray/70 font-consolas">Rank:</span>
                  <span className="font-bebas text-cyber-fuchsia">{progress.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-warm-gray/70 font-consolas">Condecorações:</span>
                  <span className="font-bebas text-cyber-fuchsia">{progress.badges.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-warm-gray/70 font-consolas">Última Operação:</span>
                  <span className="text-sm text-warm-gray font-consolas">{new Date(progress.lastActivity).toLocaleDateString('pt-BR')}</span>
                </div>
              </CardContent>
            </Card>

            {/* Histórico de Operações */}
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

            {/* Agenda de Operações */}
            <Card className="bg-military-card border-military-border rivet-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-bebas text-warm-gray">
                  <Clock size={20} className="text-cyber-cyan" />
                  <span>AGENDA DE OPERAÇÕES</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-cyber-cyan/20 rounded border border-cyber-cyan/30">
                    <div className="font-medium text-sm text-cyber-cyan font-bebas">Check-in Diário</div>
                    <div className="text-xs text-cyber-cyan font-consolas">Obrigatório - Penalidade: -2 créditos</div>
                  </div>
                  {progress.isInTreatment && (
                    <div className="p-3 bg-cyber-warning/20 rounded border border-cyber-warning/30 animate-pulse-warning">
                      <div className="font-medium text-sm text-cyber-warning font-bebas">Ações de Recuperação</div>
                      <div className="text-xs text-cyber-warning font-consolas">{pendingActions.length} pendentes</div>
                    </div>
                  )}
                  <div className="p-3 bg-cyber-neon/20 rounded border border-cyber-neon/30">
                    <div className="font-medium text-sm text-cyber-neon font-bebas">Próxima Missão</div>
                    <div className="text-xs text-cyber-neon font-consolas">Disponível agora</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modals */}
        <PenaltySetupModal 
          isOpen={showPenaltySetup}
          onClose={() => setShowPenaltySetup(false)}
        />

        {/* Penalty Management Modal */}
        {showPenaltyManagement && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-military-card border border-cyber-fuchsia/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto rivet-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bebas text-cyber-fuchsia">GERENCIAR PENALIDADES</h2>
                  <Button 
                    onClick={() => setShowPenaltyManagement(false)}
                    variant="outline"
                    size="sm"
                    className="border-military-border text-warm-gray hover:bg-military-border/20"
                  >
                    FECHAR
                  </Button>
                </div>
                <PenaltyManagement />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostoDeComando;
