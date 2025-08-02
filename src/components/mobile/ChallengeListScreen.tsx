import { useState } from "react";
import { Search, Filter, Trophy, Clock, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
}

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Healthy Breakfast Challenge",
    creator: "FreshMart",
    reward: "₱500 Voucher",
    participants: 1247,
    endDate: "2024-08-15",
    image: "/api/placeholder/300/200",
    category: "health",
    difficulty: "easy",
    points: 100
  },
  {
    id: "2", 
    title: "Coffee Shop Explorer",
    creator: "Bean & Brew",
    reward: "Free Coffee for a Month",
    participants: 856,
    endDate: "2024-08-20",
    image: "/api/placeholder/300/200",
    category: "culinary",
    difficulty: "medium",
    points: 150
  },
  {
    id: "3",
    title: "Fitness Gear Hunt",
    creator: "ActiveLife",
    reward: "₱1000 Sports Gear",
    participants: 432,
    endDate: "2024-08-25",
    image: "/api/placeholder/300/200", 
    category: "wellness",
    difficulty: "hard",
    points: 200
  }
];

const categoryColors = {
  health: "bg-progress-green/10 text-progress-green border-progress-green/20",
  culinary: "bg-warning/10 text-warning border-warning/20", 
  lifestyle: "bg-game-blue/10 text-game-blue border-game-blue/20",
  wellness: "bg-challenge-purple/10 text-challenge-purple border-challenge-purple/20"
};

const difficultyColors = {
  easy: "bg-success/10 text-success",
  medium: "bg-warning/10 text-warning", 
  hard: "bg-destructive/10 text-destructive"
};

export const ChallengeListScreen = ({ onSelectChallenge }: { onSelectChallenge: (challenge: Challenge) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredChallenges = mockChallenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || challenge.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mobile-screen">
      {/* Header */}
      <div className="mobile-header">
        <div>
          <h1 className="text-xl font-semibold text-foreground">GameOn</h1>
          <p className="text-sm text-muted-foreground">Discover Challenges</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Filter className="h-5 w-5" />
          </Button>
          <div className="relative">
            <Trophy className="h-5 w-5 text-reward-gold" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
              <span className="text-[8px] text-primary-foreground font-bold">3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search challenges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl border-muted"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["all", "health", "culinary", "lifestyle", "wellness"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted-dark"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="game-card text-center py-3">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="game-card text-center py-3">
            <div className="text-2xl font-bold text-reward-gold">₱2,450</div>
            <div className="text-xs text-muted-foreground">Earned</div>
          </div>
          <div className="game-card text-center py-3">
            <div className="text-2xl font-bold text-progress-green">8</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
        </div>

        {/* Challenge List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Featured Challenges</h2>
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="game-card cursor-pointer transition-all duration-200 hover:shadow-md active:scale-98"
              onClick={() => onSelectChallenge(challenge)}
            >
              <div className="flex gap-3">
                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-muted-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-foreground line-clamp-1">{challenge.title}</h3>
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">by {challenge.creator}</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`challenge-badge ${categoryColors[challenge.category]}`}>
                      {challenge.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors[challenge.difficulty]}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{challenge.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Ends {new Date(challenge.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-reward-gold">{challenge.reward}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {challenge.points} pts
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};