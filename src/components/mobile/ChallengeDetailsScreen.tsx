import { useState } from "react";
import { ArrowLeft, Trophy, Clock, Users, Share2, Heart, MapPin, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  store: string;
  price: string;
  image: string;
}

interface Challenge {
  id: string;
  title: string;
  creator: string;
  reward: string;
  participants: number;
  endDate: string;
  image: string;
  category: "health" | "culinary" | "lifestyle" | "wellness";
  difficulty: "easy" | "medium" | "hard";
  points: number;
  description: string;
  howToParticipate: string[];
  products: Product[];
  startDate: string;
  rules: string[];
  participationType: 'purchase' | 'social' | 'scan' | 'task' | 'referral';
  participationDescription: string;
}

const mockChallenge: Challenge = {
  id: "1",
  title: "Healthy Breakfast Challenge",
  creator: "FreshMart",
  reward: "₱500 Voucher + Bonus Points",
  participants: 1247,
  endDate: "2024-08-15",
  startDate: "2024-08-01",
  image: "/api/placeholder/400/250",
  category: "health",
  difficulty: "easy",
  points: 100,
  participationType: 'purchase',
  participationDescription: 'Buy any qualifying healthy breakfast item',
  description: "Start your day right with nutritious breakfast choices! Purchase any qualifying healthy breakfast item and share your morning routine.",
  howToParticipate: [
    "Buy any qualifying product from participating stores",
    "Scan the QR code on your receipt OR upload photo",
    "Play the breakfast spin wheel game",
    "Share your healthy breakfast on social media (optional bonus)"
  ],
  products: [
    {
      id: "1",
      name: "Organic Oatmeal",
      store: "FreshMart",
      price: "₱120",
      image: "/api/placeholder/80/80"
    },
    {
      id: "2", 
      name: "Greek Yogurt",
      store: "FreshMart",
      price: "₱85",
      image: "/api/placeholder/80/80"
    },
    {
      id: "3",
      name: "Avocado Toast Mix",
      store: "Healthy Corner",
      price: "₱95",
      image: "/api/placeholder/80/80"
    },
    {
      id: "4",
      name: "Fresh Fruit Bowl",
      store: "Farm Fresh",
      price: "₱150",
      image: "/api/placeholder/80/80"
    }
  ],
  rules: [
    "One entry per receipt",
    "Purchase must be made during challenge period",
    "Receipt must be clear and readable",
    "Minimum purchase of ₱50 required"
  ]
};

export const ChallengeDetailsScreen = ({ 
  challenge = mockChallenge, 
  onBack, 
  onJoinChallenge 
}: { 
  challenge?: Challenge;
  onBack: () => void;
  onJoinChallenge: (challenge: Challenge) => void;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "products" | "rules">("details");

  const daysLeft = Math.ceil((new Date(challenge.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="mobile-screen">
      {/* Header */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="bg-black/20 text-white hover:bg-black/30 rounded-full w-10 h-10 p-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className="bg-black/20 text-white hover:bg-black/30 rounded-full w-10 h-10 p-0"
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current text-red-500' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/20 text-white hover:bg-black/30 rounded-full w-10 h-10 p-0"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="h-64 bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
          <Trophy className="h-20 w-20 text-primary-foreground/80" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Challenge Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-progress-green/10 text-progress-green">
              {challenge.category}
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              {challenge.difficulty}
            </Badge>
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-1">{challenge.title}</h1>
          <p className="text-muted-foreground">by {challenge.creator}</p>
          
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{challenge.participants.toLocaleString()} joined</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{daysLeft} days left</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{challenge.points} points</span>
            </div>
          </div>
        </div>

        {/* Reward Card */}
        <div className="game-card bg-gradient-to-r from-reward-gold/10 to-reward-gold/5 border-reward-gold/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Reward</p>
              <p className="text-lg font-bold text-reward-gold">{challenge.reward}</p>
            </div>
            <Trophy className="h-8 w-8 text-reward-gold" />
          </div>
        </div>

        {/* Timeline */}
        <div className="game-card">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-progress-green" />
              <span className="text-muted-foreground">Started:</span>
              <span className="font-medium">{new Date(challenge.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-destructive" />
              <span className="text-muted-foreground">Ends:</span>
              <span className="font-medium">{new Date(challenge.endDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex rounded-xl bg-muted p-1">
          {[
            { id: "details", label: "Details" },
            { id: "products", label: "Products" },
            { id: "rules", label: "Rules" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "details" && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">About This Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">{challenge.description}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">How to Participate</h3>
              <div className="space-y-3">
                {challenge.howToParticipate.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="space-y-4">
            <h3 className="font-semibold">Eligible Products ({challenge.products.length})</h3>
            <div className="grid grid-cols-2 gap-3">
              {challenge.products.map((product) => (
                <div key={product.id} className="game-card">
                  <div className="w-full h-20 bg-muted rounded-lg mb-2 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{product.store}</p>
                  <p className="text-sm font-semibold text-primary">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "rules" && (
          <div className="space-y-4">
            <h3 className="font-semibold">Challenge Rules</h3>
            <div className="space-y-3">
              {challenge.rules.map((rule, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                  <p className="text-muted-foreground">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Join Button */}
        <div className="sticky bottom-0 pt-4 pb-2">
          <Button
            onClick={() => onJoinChallenge(challenge)}
            className="game-button w-full"
            size="lg"
          >
            Join Challenge
          </Button>
        </div>
      </div>
    </div>
  );
};