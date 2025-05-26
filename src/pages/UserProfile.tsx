
import { useUserProgress } from '@/hooks/useUserProgress';
import { BadgeComponent } from '@/components/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Trophy, Target, Flame, Brain } from 'lucide-react';

const UserProfile = () => {
  const { progress, getStats } = useUserProgress();
  const stats = getStats();

  const getNextLevelPoints = () => {
    const currentLevelPoints = (progress.level - 1) * 1000;
    const nextLevelPoints = progress.level * 1000;
    const progressToNext = progress.totalPoints - currentLevelPoints;
    const pointsNeeded = nextLevelPoints - currentLevelPoints;
    
    return {
      current: progressToNext,
      needed: pointsNeeded,
      percentage: (progressToNext / pointsNeeded) * 100
    };
  };

  const levelProgress = getNextLevelPoints();

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bebas text-warm-gray mb-4 tracking-wider">
            SEU REGISTRO DE GUERRA
          </h1>
          <p className="text-xl text-warm-gray/60 font-inter">
            Histórico de batalhas, conquistas e evolução mental
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <Card className="bg-dark-card border-dark-border">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-warm-yellow mx-auto mb-2" />
              <div className="text-2xl font-bebas text-warm-gray">{stats.totalPoints}</div>
              <div className="text-xs text-warm-gray/60">PONTOS</div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bebas text-warm-gray">{stats.testsCompleted}</div>
              <div className="text-xs text-warm-gray/60">TESTES</div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border">
            <CardContent className="p-4 text-center">
              <Badge className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bebas text-warm-gray">{stats.badgesEarned}</div>
              <div className="text-xs text-warm-gray/60">BADGES</div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border">
            <CardContent className="p-4 text-center">
              <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bebas text-warm-gray">{stats.currentStreak}</div>
              <div className="text-xs text-warm-gray/60">SEQUÊNCIA</div>
            </CardContent>
          </Card>

          <Card className="bg-dark-card border-dark-border">
            <CardContent className="p-4 text-center">
              <Brain className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bebas text-warm-gray">{stats.honestyScore}</div>
              <div className="text-xs text-warm-gray/60">HONESTIDADE</div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="bg-dark-card border-dark-border mb-12">
          <CardHeader>
            <CardTitle className="font-bebas text-warm-gray text-2xl">
              NÍVEL {progress.level}
            </CardTitle>
            <CardDescription className="text-warm-gray/60">
              {levelProgress.current} / {levelProgress.needed} pontos para o próximo nível
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress 
              value={levelProgress.percentage} 
              className="h-3"
            />
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Badges Section */}
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="font-bebas text-warm-gray text-2xl">
                MARCAS DE GUERRA ({progress.badges.length})
              </CardTitle>
              <CardDescription className="text-warm-gray/60">
                Conquistas desbloqueadas em sua jornada
              </CardDescription>
            </CardHeader>
            <CardContent>
              {progress.badges.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {progress.badges.map((badge) => (
                    <BadgeComponent 
                      key={badge.id} 
                      badge={badge} 
                      showDetails={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 text-warm-gray/30 mx-auto mb-4" />
                  <p className="text-warm-gray/60">
                    Complete um teste para ganhar sua primeira marca de guerra
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test History */}
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="font-bebas text-warm-gray text-2xl">
                HISTÓRICO DE BATALHAS
              </CardTitle>
              <CardDescription className="text-warm-gray/60">
                Testes completados e insights obtidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {progress.testsCompleted.length > 0 ? (
                <div className="space-y-4">
                  {progress.testsCompleted.slice(-5).reverse().map((test, index) => (
                    <div key={index} className="border-l-2 border-warm-yellow pl-4">
                      <h4 className="font-bebas text-warm-gray">{test.testName}</h4>
                      <p className="text-sm text-warm-gray/60 mb-2">
                        {new Date(test.completedAt).toLocaleDateString('pt-BR')}
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge className="bg-warm-yellow text-dark-bg text-xs">
                          +{test.pointsEarned} pontos
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Honestidade: {test.honestyScore}/10
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-warm-gray/30 mx-auto mb-4" />
                  <p className="text-warm-gray/60">
                    Nenhuma batalha registrada ainda
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
