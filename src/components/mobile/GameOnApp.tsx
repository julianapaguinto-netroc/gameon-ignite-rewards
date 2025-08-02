import { useState } from "react";
import { ChallengeListScreen } from "./ChallengeListScreen";
import { ChallengeDetailsScreen } from "./ChallengeDetailsScreen";
import { ChallengeJoinScreen } from "./ChallengeJoinScreen";
import { GameInteractionScreen } from "./GameInteractionScreen";
import { ProgressTrackerScreen } from "./ProgressTrackerScreen";
import { RewardDisplayScreen } from "./RewardDisplayScreen";

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
  products: any[];
  startDate: string;
  rules: string[];
}

interface GameReward {
  type: "points" | "voucher" | "badge" | "product";
  value: string;
  description: string;
  icon: string;
}

type Screen = 
  | "challenge-list" 
  | "challenge-details" 
  | "challenge-join" 
  | "game-interaction" 
  | "progress-tracker" 
  | "reward-display";

export const GameOnApp = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("challenge-list");
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [gameReward, setGameReward] = useState<GameReward | null>(null);

  const handleSelectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCurrentScreen("challenge-details");
  };

  const handleJoinChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCurrentScreen("challenge-join");
  };

  const handleVerificationSuccess = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCurrentScreen("game-interaction");
  };

  const handleGameComplete = (challenge: Challenge, reward: GameReward) => {
    setSelectedChallenge(challenge);
    setGameReward(reward);
    setCurrentScreen("reward-display");
  };

  const handleBackToList = () => {
    setCurrentScreen("challenge-list");
    setSelectedChallenge(null);
    setGameReward(null);
  };

  const handleBackToDetails = () => {
    setCurrentScreen("challenge-details");
  };

  const handleBackToJoin = () => {
    setCurrentScreen("challenge-join");
  };

  const handleShowProgress = () => {
    setCurrentScreen("progress-tracker");
  };

  const handleContinuePlaying = () => {
    setCurrentScreen("challenge-list");
    setSelectedChallenge(null);
    setGameReward(null);
  };

  // Mock challenge details for demo
  const mockChallengeDetails = {
    ...selectedChallenge,
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
      }
    ],
    startDate: "2024-08-01",
    rules: [
      "One entry per receipt",
      "Purchase must be made during challenge period",
      "Receipt must be clear and readable",
      "Minimum purchase of ₱50 required"
    ]
  };

  switch (currentScreen) {
    case "challenge-list":
      return (
        <ChallengeListScreen 
          onSelectChallenge={handleSelectChallenge}
        />
      );

    case "challenge-details":
      return (
        <ChallengeDetailsScreen
          challenge={mockChallengeDetails as Challenge}
          onBack={handleBackToList}
          onJoinChallenge={handleJoinChallenge}
        />
      );

    case "challenge-join":
      return (
        <ChallengeJoinScreen
          challenge={selectedChallenge!}
          onBack={handleBackToDetails}
          onVerificationSuccess={handleVerificationSuccess}
        />
      );

    case "game-interaction":
      return (
        <GameInteractionScreen
          challenge={selectedChallenge!}
          onBack={handleBackToJoin}
          onGameComplete={handleGameComplete}
        />
      );

    case "progress-tracker":
      return (
        <ProgressTrackerScreen
          onBack={handleBackToList}
        />
      );

    case "reward-display":
      return (
        <RewardDisplayScreen
          challenge={selectedChallenge!}
          reward={gameReward!}
          onBack={handleBackToList}
          onContinue={handleContinuePlaying}
        />
      );

    default:
      return (
        <ChallengeListScreen 
          onSelectChallenge={handleSelectChallenge}
        />
      );
  }
};