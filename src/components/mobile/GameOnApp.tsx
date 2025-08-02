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
  participationType: 'purchase' | 'social' | 'scan' | 'task' | 'referral';
  participationDescription: string;
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
  const mockChallengeDetails = selectedChallenge ? {
    ...selectedChallenge,
    description: selectedChallenge.participationType === 'purchase' 
      ? "Purchase eligible products and verify with QR code or receipt upload to unlock your reward game!"
      : selectedChallenge.participationType === 'social'
      ? "Share this challenge on Facebook to unlock the game and win amazing rewards!"
      : selectedChallenge.participationType === 'scan'
      ? "Find and scan QR codes in participating stores to unlock your reward game!"
      : "Complete the required task to unlock your reward game!",
    howToParticipate: selectedChallenge.participationType === 'purchase' 
      ? [
          "Buy any qualifying product from participating stores",
          "Scan the QR code on your receipt OR upload photo",
          "Play the reward game",
          "Claim your prize!"
        ]
      : selectedChallenge.participationType === 'social'
      ? [
          "Click the Share button below",
          "Share this challenge post on your Facebook",
          "Return to the app to verify",
          "Play the reward game and win!"
        ]
      : selectedChallenge.participationType === 'scan'
      ? [
          "Visit participating stores",
          "Find QR codes on displays or posters",
          "Scan the QR codes with the app",
          "Play the reward game!"
        ]
      : [
          "Complete the required task",
          "Submit proof of completion",
          "Verify your submission",
          "Play the reward game!"
        ],
    products: selectedChallenge.participationType === 'purchase' ? [
      {
        id: "1",
        name: "Coca-Cola Original 330ml",
        store: "7-Eleven",
        price: "₱25",
        image: "/api/placeholder/80/80"
      },
      {
        id: "2",
        name: "Coca-Cola Zero 500ml",
        store: "Ministop", 
        price: "₱35",
        image: "/api/placeholder/80/80"
      }
    ] : [],
    startDate: "2024-08-01",
    rules: [
      "One entry per user per day",
      "Must complete participation requirement",
      "Valid during challenge period only",
      "Follow community guidelines"
    ]
  } : null;

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