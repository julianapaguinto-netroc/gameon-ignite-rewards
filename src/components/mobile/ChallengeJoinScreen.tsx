import { useState } from "react";
import { ArrowLeft, Camera, Upload, QrCode, CheckCircle, AlertCircle, Loader2, Share2, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Challenge {
  id: string;
  title: string;
  creator: string;
  reward: string;
  points: number;
}

type VerificationMethod = "qr" | "receipt" | "social" | "task" | "external" | null;
type VerificationStatus = "idle" | "uploading" | "verifying" | "success" | "error";

export const ChallengeJoinScreen = ({ 
  challenge,
  onBack, 
  onVerificationSuccess 
}: { 
  challenge: Challenge;
  onBack: () => void;
  onVerificationSuccess: (challenge: Challenge) => void;
}) => {
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod>(null);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("idle");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setVerificationStatus("uploading");
      
      // Simulate file upload and verification
      setTimeout(() => {
        setVerificationStatus("verifying");
        setTimeout(() => {
          // Simulate random success/failure for demo
          const success = Math.random() > 0.3;
          if (success) {
            setVerificationStatus("success");
            setTimeout(() => {
              onVerificationSuccess(challenge);
            }, 2000);
          } else {
            setVerificationStatus("error");
          }
        }, 2000);
      }, 1000);
    }
  };

  const handleQRScan = () => {
    setSelectedMethod("qr");
    setVerificationStatus("verifying");
    
    // Simulate QR scanning process
    setTimeout(() => {
      const success = Math.random() > 0.2;
      if (success) {
        setVerificationStatus("success");
        setTimeout(() => {
          onVerificationSuccess(challenge);
        }, 2000);
      } else {
        setVerificationStatus("error");
      }
    }, 3000);
  };

  const resetVerification = () => {
    setSelectedMethod(null);
    setVerificationStatus("idle");
    setUploadedFile(null);
  };

  if (verificationStatus === "verifying") {
    return (
      <div className="mobile-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Verifying Purchase</h2>
          <p className="text-muted-foreground">
            {selectedMethod === "qr" ? "Processing QR code..." : "Checking receipt details..."}
          </p>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Product identified</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Validating purchase date...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === "success") {
    return (
      <div className="mobile-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-success-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-success">Verification Successful!</h2>
          <p className="text-muted-foreground mb-4">
            Your purchase has been verified. Get ready to play!
          </p>
          <div className="bg-success/10 border border-success/20 rounded-lg p-3">
            <p className="text-sm text-success font-medium">
              +{challenge.points} points added to your account
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (verificationStatus === "error") {
    return (
      <div className="mobile-screen">
        <div className="mobile-header">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Verification Failed</h1>
          <div></div>
        </div>

        <div className="p-4 flex items-center justify-center min-h-[500px]">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't verify your purchase. Please check:
            </p>
            <div className="text-left space-y-2 mb-6 text-sm text-muted-foreground">
              <div>• Receipt is clear and readable</div>
              <div>• Product matches challenge requirements</div>
              <div>• Purchase date is within challenge period</div>
              <div>• Receipt hasn't been used before</div>
            </div>
            <div className="space-y-3">
              <Button onClick={resetVerification} className="w-full" variant="outline">
                Try Again
              </Button>
              <Button onClick={onBack} className="w-full" variant="ghost">
                Back to Challenge
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-screen">
      {/* Header */}
      <div className="mobile-header">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Join Challenge</h1>
        <div></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Challenge Info */}
        <div className="game-card">
          <h2 className="font-semibold text-lg mb-1">{challenge.title}</h2>
          <p className="text-muted-foreground text-sm mb-3">by {challenge.creator}</p>
          <div className="flex items-center justify-between">
            <span className="text-reward-gold font-semibold">{challenge.reward}</span>
            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
              {challenge.points} pts
            </span>
          </div>
        </div>

        {/* Verification Methods */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">How to Participate</h3>
          <p className="text-muted-foreground text-sm">
            Choose your preferred method to participate in this challenge.
          </p>

          {/* QR Code Option */}
          <Card 
            className={`p-4 cursor-pointer transition-all border-2 hover:shadow-md ${
              selectedMethod === "qr" ? "border-primary bg-primary/5" : "border-border"
            }`}
            onClick={() => setSelectedMethod("qr")}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Scan QR Code</h4>
                <p className="text-sm text-muted-foreground">
                  Scan QR code from receipt or easter egg
                </p>
              </div>
            </div>
          </Card>

          {/* Photo/Video Upload */}
          <Card 
            className={`p-4 cursor-pointer transition-all border-2 hover:shadow-md ${
              selectedMethod === "receipt" ? "border-primary bg-primary/5" : "border-border"
            }`}
            onClick={() => setSelectedMethod("receipt")}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <Camera className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Submit Photo/Video</h4>
                <p className="text-sm text-muted-foreground">
                  Upload receipt, photo proof, or video with proof
                </p>
              </div>
            </div>
          </Card>

          {/* Social Media Actions */}
          <Card 
            className={`p-4 cursor-pointer transition-all border-2 hover:shadow-md ${
              selectedMethod === "social" ? "border-primary bg-primary/5" : "border-border"
            }`}
            onClick={() => setSelectedMethod("social")}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-challenge-purple/10 rounded-full flex items-center justify-center">
                <Share2 className="h-6 w-6 text-challenge-purple" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Social Media Action</h4>
                <p className="text-sm text-muted-foreground">
                  Like, Follow, Share or Comment on FB
                </p>
              </div>
            </div>
          </Card>

          {/* Task Completion */}
          <Card 
            className={`p-4 cursor-pointer transition-all border-2 hover:shadow-md ${
              selectedMethod === "task" ? "border-primary bg-primary/5" : "border-border"
            }`}
            onClick={() => setSelectedMethod("task")}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-progress-green/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-progress-green" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Complete Task</h4>
                <p className="text-sm text-muted-foreground">
                  Check task done with proof verification
                </p>
              </div>
            </div>
          </Card>

          {/* External API Verification */}
          <Card 
            className={`p-4 cursor-pointer transition-all border-2 hover:shadow-md ${
              selectedMethod === "external" ? "border-primary bg-primary/5" : "border-border"
            }`}
            onClick={() => setSelectedMethod("external")}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                <ExternalLink className="h-6 w-6 text-warning" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Direct Verification</h4>
                <p className="text-sm text-muted-foreground">
                  Automatic verification from external API
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        {selectedMethod === "qr" && (
          <div className="space-y-3">
            <Button onClick={handleQRScan} className="game-button w-full" size="lg">
              <QrCode className="h-5 w-5 mr-2" />
              Scan QR Code
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Point your camera at the QR code on your receipt
            </p>
          </div>
        )}

        {selectedMethod === "receipt" && (
          <div className="space-y-3">
            <label htmlFor="receipt-upload">
              <Button asChild className="game-button w-full" size="lg">
                <div className="cursor-pointer">
                  <Camera className="h-5 w-5 mr-2" />
                  {uploadedFile ? "Change Photo/Video" : "Upload Photo/Video"}
                </div>
              </Button>
            </label>
            <input
              id="receipt-upload"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            {uploadedFile && (
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Uploaded: {uploadedFile.name}
                </p>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground text-center">
              Submit clear receipt, photo proof, or video with proof
            </p>
          </div>
        )}

        {selectedMethod === "social" && (
          <div className="space-y-3">
            <Button className="game-button w-full" size="lg">
              <Heart className="h-5 w-5 mr-2" />
              Connect Social Media
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Complete the required social media actions to proceed
            </p>
          </div>
        )}

        {selectedMethod === "task" && (
          <div className="space-y-3">
            <Button className="game-button w-full" size="lg">
              <CheckCircle className="h-5 w-5 mr-2" />
              Mark Task Complete
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Verify that you've completed the required task
            </p>
          </div>
        )}

        {selectedMethod === "external" && (
          <div className="space-y-3">
            <Button className="game-button w-full" size="lg">
              <ExternalLink className="h-5 w-5 mr-2" />
              Verify Automatically
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Automatic verification through external API
            </p>
          </div>
        )}

        {/* Tips */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium mb-2 text-sm">💡 Verification Tips</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Ensure receipt shows product name and purchase date</li>
            <li>• Receipt must be from the challenge period</li>
            <li>• Each receipt can only be used once</li>
            <li>• Product must match challenge requirements</li>
          </ul>
        </div>
      </div>
    </div>
  );
};