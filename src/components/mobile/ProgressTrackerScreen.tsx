import { useState } from "react";
import { ArrowLeft, Trophy, Star, Gift, Target, TrendingUp, Crown, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface UserProgress {
  level: "Bronze" | "Silver" | "Gold" | "Platinum";
  currentPoints: number;
  pointsToNextLevel: number;
  totalChallengesCompleted: number;
  currentStreak: number;
  stampsCollected: number;
  stampsNeeded: number;
  achievements: Achievement[];
  recentRewards: Reward[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
}

interface Reward {
  id: string;
  type: "points" | "voucher" | "badge" | "product";
  value: string;
  description: string;
  dateEarned: string;
  claimed: boolean;
}

const mockProgress: UserProgress = {
  level: "Silver",
  currentPoints: 1250,
  pointsToNextLevel: 750,
  totalChallengesCompleted: 8,
  currentStreak: 3,
  stampsCollected: 3,
  stampsNeeded: 5,
  achievements: [
    {
      id: "1",
      title: "First Steps",
      description: "Complete your first challenge",
      icon: "👶",
      earned: true
    },
    {
      id: "2", 
      title: "Healthy Habit",
      description: "Complete 5 health challenges",
      icon: "💪",
      earned: true,
      progress: 5,
      maxProgress: 5
    },
    {
      id: "3",
      title: "Social Butterfly",
      description: "Share 10 challenge results",
      icon: "🦋",
      earned: false,
      progress: 3,
      maxProgress: 10
    },
    {
      id: "4",
      title: "Streak Master",
      description: "Complete challenges 7 days in a row",
      icon: "🔥",
      earned: false,
      progress: 3,
      maxProgress: 7
    }
  ],
  recentRewards: [
    {
      id: "1",
      type: "voucher",
      value: "₱100",
      description: "FreshMart Voucher",
      dateEarned: "2024-08-02",
      claimed: false
    },
    {
      id: "2",
      type: "points", 
      value: "150",
      description: "Bonus Points",
      dateEarned: "2024-08-01",
      claimed: true
    },
    {
      id: "3",
      type: "badge",
      value: "Early Bird",
      description: "Achievement Badge",
      dateEarned: "2024-07-30",
      claimed: true
    }
  ]
};

const levelColors = {
  Bronze: "text-yellow-600",
  Silver: "text-gray-400", 
  Gold: "text-yellow-400",
  Platinum: "text-purple-400"
};

const levelIcons = {
  Bronze: Medal,
  Silver: Star,
  Gold: Crown,
  Platinum: Trophy
};

export const ProgressTrackerScreen = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "achievements" | "rewards">("overview");
  const [progress] = useState<UserProgress>(mockProgress);

  const progressPercentage = ((progress.currentPoints) / (progress.currentPoints + progress.pointsToNextLevel)) * 100;
  const stampProgress = (progress.stampsCollected / progress.stampsNeeded) * 100;

  const LevelIcon = levelIcons[progress.level];

  return (
    <div className="mobile-screen">
      {/* Header */}
      <div className="mobile-header">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">My Progress</h1>
        <div></div>
      </div>

      <div className="p-4 space-y-4">
        {/* User Level & Points - Bronze → Silver → Gold Progression */}
        <div className="game-card bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <LevelIcon className={`h-6 w-6 ${levelColors[progress.level]}`} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary">{progress.level} Tier</h2>
                <p className="text-sm text-muted-foreground">Level {progress.level}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-xs text-muted-foreground">Bronze</span>
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-xs font-medium">Silver</span>
                  <div className="w-3 h-3 rounded-full bg-muted border-2 border-muted-foreground"></div>
                  <span className="text-xs text-muted-foreground">Gold</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{progress.currentPoints.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Gold</span>
              <span>{progress.pointsToNextLevel} points to go</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="game-card text-center py-3">
            <div className="text-xl font-bold text-progress-green">{progress.totalChallengesCompleted}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="game-card text-center py-3">
            <div className="text-xl font-bold text-warning">{progress.currentStreak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
          <div className="game-card text-center py-3">
            <div className="text-xl font-bold text-primary">{progress.stampsCollected}/{progress.stampsNeeded}</div>
            <div className="text-xs text-muted-foreground">Stamps</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex rounded-xl bg-muted p-1">
          {[
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "achievements", label: "Badges", icon: Trophy },
            { id: "rewards", label: "Rewards", icon: Gift }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1 ${
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* Stamp Card Progress */}
            <div className="game-card">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Digital Stamp Card</h3>
                <span className="text-sm text-muted-foreground">
                  {progress.stampsCollected}/{progress.stampsNeeded} stamps
                </span>
              </div>
              
              <div className="stamp-card">
                {Array.from({ length: progress.stampsNeeded }, (_, i) => (
                  <div
                    key={i}
                    className={`stamp ${i < progress.stampsCollected ? 'collected' : ''}`}
                  >
                    {i < progress.stampsCollected ? '✓' : i + 1}
                  </div>
                ))}
              </div>
              
              <div className="mt-3">
                <Progress value={stampProgress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1 text-center">
                  {progress.stampsNeeded - progress.stampsCollected} more stamps to unlock bonus reward!
                </p>
              </div>
            </div>

            {/* Snake & Ladder Style Progress */}
            <div className="game-card">
              <h3 className="font-semibold mb-3">Journey Progress</h3>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 15 }, (_, i) => {
                  const position = i + 1;
                  const isCompleted = position <= progress.totalChallengesCompleted;
                  const isCurrent = position === progress.totalChallengesCompleted + 1;
                  
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg border-2 flex items-center justify-center text-xs font-bold ${
                        isCompleted
                          ? "bg-primary border-primary text-primary-foreground"
                          : isCurrent
                          ? "bg-primary/10 border-primary text-primary animate-pulse"
                          : "bg-muted border-muted-foreground/20 text-muted-foreground"
                      }`}
                    >
                      {position}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="space-y-3">
            {progress.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`game-card ${
                  achievement.earned ? "bg-success/5 border-success/20" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`text-2xl ${achievement.earned ? "" : "grayscale opacity-50"}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    
                    {achievement.progress !== undefined && achievement.maxProgress && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-1"
                        />
                      </div>
                    )}
                  </div>
                  {achievement.earned && (
                    <div className="text-success">
                      <Trophy className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "rewards" && (
          <div className="space-y-3">
            {progress.recentRewards.map((reward) => (
              <div key={reward.id} className="game-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-reward-gold/10 rounded-full flex items-center justify-center">
                      <Gift className="h-5 w-5 text-reward-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{reward.value}</h4>
                      <p className="text-sm text-muted-foreground">{reward.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Earned on {new Date(reward.dateEarned).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {!reward.claimed ? (
                    <Button size="sm" variant="outline" className="text-xs">
                      Claim
                    </Button>
                  ) : (
                    <span className="text-xs text-success font-medium">✓ Claimed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};