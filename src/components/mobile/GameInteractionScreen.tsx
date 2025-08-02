import { useState, useEffect } from "react";
import { ArrowLeft, Trophy, Sparkles, Gift, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Challenge {
  id: string;
  title: string;
  creator: string;
  reward: string;
  points: number;
}

interface GameReward {
  type: "points" | "voucher" | "badge" | "product";
  value: string;
  description: string;
  icon: string;
}

type GameType = "spin" | "scratch" | "flip" | "dice";

const gameRewards: GameReward[] = [
  { type: "points", value: "50", description: "Bonus Points", icon: "⭐" },
  { type: "voucher", value: "₱100", description: "Shopping Voucher", icon: "🎫" },
  { type: "badge", value: "Early Bird", description: "Achievement Badge", icon: "🏆" },
  { type: "product", value: "Free Coffee", description: "Product Reward", icon: "☕" },
  { type: "points", value: "20", description: "Bonus Points", icon: "⭐" },
  { type: "voucher", value: "₱50", description: "Mini Voucher", icon: "🎫" }
];

export const GameInteractionScreen = ({ 
  challenge,
  onBack, 
  onGameComplete 
}: { 
  challenge: Challenge;
  onBack: () => void;
  onGameComplete: (challenge: Challenge, reward: GameReward) => void;
}) => {
  const [gameType] = useState<GameType>("spin");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedReward, setSelectedReward] = useState<GameReward | null>(null);
  const [showResult, setShowResult] = useState(false);

  const spinWheel = () => {
    setIsSpinning(true);
    
    // Calculate random rotation (multiple full spins + random segment)
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const finalRotation = spins * 360 + Math.random() * 360;
    setRotation(prev => prev + finalRotation);
    
    // Determine winning segment based on final position
    setTimeout(() => {
      const segmentAngle = 360 / gameRewards.length;
      const normalizedRotation = finalRotation % 360;
      const winningIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % gameRewards.length;
      
      setSelectedReward(gameRewards[winningIndex]);
      setIsSpinning(false);
      setShowResult(true);
    }, 3000);
  };

  const resetGame = () => {
    setShowResult(false);
    setSelectedReward(null);
    setRotation(0);
  };

  const collectReward = () => {
    if (selectedReward) {
      onGameComplete(challenge, selectedReward);
    }
  };

  return (
    <div className="mobile-screen">
      {/* Header */}
      <div className="mobile-header">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Spin to Win!</h1>
        <div></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Challenge Info */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-3">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-1">Congratulations!</h2>
          <p className="text-muted-foreground">
            You've successfully verified your purchase for
          </p>
          <p className="font-semibold text-primary">{challenge.title}</p>
        </div>

        {/* Spin Wheel Game */}
        <div className="relative">
          <div className="flex items-center justify-center">
            {/* Wheel */}
            <div className="relative">
              <div 
                className="w-80 h-80 rounded-full border-8 border-primary shadow-2xl transition-transform duration-3000 ease-out"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  background: `conic-gradient(from 0deg, 
                    hsl(var(--primary)) 0deg 60deg,
                    hsl(var(--reward-gold)) 60deg 120deg,
                    hsl(var(--progress-green)) 120deg 180deg,
                    hsl(var(--challenge-purple)) 180deg 240deg,
                    hsl(var(--game-blue)) 240deg 300deg,
                    hsl(var(--warning)) 300deg 360deg
                  )`
                }}
              >
                {/* Wheel Segments Content */}
                <div className="absolute inset-0 rounded-full">
                  {gameRewards.map((reward, index) => {
                    const angle = (360 / gameRewards.length) * index;
                    const textAngle = angle + (360 / gameRewards.length) / 2;
                    return (
                      <div
                        key={index}
                        className="absolute w-full h-full flex items-center justify-center"
                        style={{
                          transform: `rotate(${textAngle}deg)`,
                          transformOrigin: '50% 50%'
                        }}
                      >
                        <div 
                          className="text-white font-bold text-center"
                          style={{ 
                            transform: 'translateY(-100px)',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                          }}
                        >
                          <div className="text-2xl">{reward.icon}</div>
                          <div className="text-xs">{reward.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-primary"></div>
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <div className="text-center mt-8">
            {!showResult ? (
              <Button
                onClick={spinWheel}
                disabled={isSpinning}
                className="game-button px-12 py-4 text-lg"
                size="lg"
              >
                {isSpinning ? (
                  <>
                    <RotateCcw className="h-5 w-5 mr-2 animate-spin" />
                    Spinning...
                  </>
                ) : (
                  <>
                    <Trophy className="h-5 w-5 mr-2" />
                    Spin the Wheel
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                {/* Result Display */}
                <div className="game-card bg-gradient-to-r from-reward-gold/20 to-reward-gold/10 border-reward-gold/30">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{selectedReward?.icon}</div>
                    <h3 className="text-xl font-bold text-reward-gold mb-1">
                      You Won!
                    </h3>
                    <p className="text-lg font-semibold">{selectedReward?.value}</p>
                    <p className="text-sm text-muted-foreground">{selectedReward?.description}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={collectReward}
                    className="game-button w-full"
                    size="lg"
                  >
                    <Gift className="h-5 w-5 mr-2" />
                    Collect Reward
                  </Button>
                  <Button
                    onClick={resetGame}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Spin Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Game Rules */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium mb-2 text-sm">🎮 How to Play</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Tap "Spin the Wheel" to start</li>
            <li>• Wait for the wheel to stop spinning</li>
            <li>• Collect your reward!</li>
            <li>• Each verified purchase = 1 spin</li>
          </ul>
        </div>
      </div>
    </div>
  );
};