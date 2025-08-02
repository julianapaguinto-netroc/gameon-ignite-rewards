import { useState } from "react";
import { ArrowLeft, Trophy, Gift, Share2, Download, Copy, ExternalLink, Calendar, MapPin, Star } from "lucide-react";
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

const mockRewardDetails = {
  voucher: {
    code: "GAME2024-ABC123",
    expiryDate: "2024-12-31",
    terms: [
      "Valid at all FreshMart branches",
      "Cannot be combined with other offers",
      "One-time use only",
      "Valid for minimum purchase of ₱200"
    ],
    howToRedeem: [
      "Present this code at checkout",
      "Show this screen to the cashier",
      "Code will be validated automatically"
    ]
  }
};

export const RewardDisplayScreen = ({ 
  challenge,
  reward,
  onBack, 
  onContinue 
}: { 
  challenge: Challenge;
  reward: GameReward;
  onBack: () => void;
  onContinue: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (reward.type === "voucher") {
      navigator.clipboard.writeText(mockRewardDetails.voucher.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareReward = () => {
    if (navigator.share) {
      navigator.share({
        title: `I won ${reward.value} on GameOn!`,
        text: `Just completed the ${challenge.title} challenge and won ${reward.description}!`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="mobile-screen">
      {/* Header */}
      <div className="mobile-header">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Your Reward</h1>
        <Button variant="ghost" size="sm" onClick={shareReward}>
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Celebration Header */}
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-reward-gold to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="text-4xl">{reward.icon}</div>
          </div>
          <h2 className="text-2xl font-bold mb-2">🎉 Congratulations!</h2>
          <p className="text-muted-foreground">
            You successfully completed the challenge and won:
          </p>
        </div>

        {/* Reward Card */}
        <div className="game-card bg-gradient-to-br from-reward-gold/20 via-reward-gold/10 to-transparent border-reward-gold/30">
          <div className="text-center py-6">
            <div className="text-5xl mb-3">{reward.icon}</div>
            <h3 className="text-3xl font-bold text-reward-gold mb-2">{reward.value}</h3>
            <p className="text-lg font-semibold mb-1">{reward.description}</p>
            <p className="text-sm text-muted-foreground">from {challenge.creator}</p>
          </div>
        </div>

        {/* Voucher Details (if applicable) */}
        {reward.type === "voucher" && (
          <div className="space-y-4">
            {/* Voucher Code */}
            <div className="game-card bg-background border-2 border-dashed border-primary">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Voucher Code</p>
                <div className="bg-muted/50 rounded-lg p-3 mb-3">
                  <p className="text-lg font-mono font-bold tracking-wider">
                    {mockRewardDetails.voucher.code}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyCode}
                  className="w-full"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? "Copied!" : "Copy Code"}
                </Button>
              </div>
            </div>

            {/* Expiry & Details */}
            <div className="game-card">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Expires:</span>
                  <span className="font-medium">
                    {new Date(mockRewardDetails.voucher.expiryDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Valid at all FreshMart locations</span>
                </div>
              </div>
            </div>

            {/* How to Redeem */}
            <div className="game-card">
              <h4 className="font-semibold mb-3">How to Redeem</h4>
              <div className="space-y-2">
                {mockRewardDetails.voucher.howToRedeem.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-2 text-sm">Terms & Conditions</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                {mockRewardDetails.voucher.terms.map((term, index) => (
                  <li key={index}>• {term}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Points Reward */}
        {reward.type === "points" && (
          <div className="game-card bg-primary/5 border-primary/20">
            <div className="text-center">
              <Star className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Points Added!</h3>
              <p className="text-muted-foreground">
                +{reward.value} points have been added to your account
              </p>
            </div>
          </div>
        )}

        {/* Badge Reward */}
        {reward.type === "badge" && (
          <div className="game-card bg-challenge-purple/5 border-challenge-purple/20">
            <div className="text-center">
              <Trophy className="h-12 w-12 text-challenge-purple mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Achievement Unlocked!</h3>
              <p className="text-muted-foreground">
                "{reward.value}" badge has been added to your collection
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {reward.type === "voucher" && (
            <Button className="w-full" size="lg" variant="outline">
              <Download className="h-5 w-5 mr-2" />
              Save to Wallet
            </Button>
          )}
          
          <Button className="w-full" size="lg" variant="outline">
            <ExternalLink className="h-5 w-5 mr-2" />
            Find Store Locations
          </Button>
          
          <Button onClick={onContinue} className="game-button w-full" size="lg">
            <Trophy className="h-5 w-5 mr-2" />
            Continue Playing
          </Button>
        </div>

        {/* Challenge Completion Summary */}
        <div className="game-card bg-success/5 border-success/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
              <Trophy className="h-5 w-5 text-success-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-success">Challenge Completed!</h4>
              <p className="text-sm text-muted-foreground">
                You've earned {challenge.points} base points plus your game reward
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};