import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Infinity as InfinityIcon, Clock, Zap } from "lucide-react";
import { usePlatformPass } from "@/hooks/usePlatformPass";
import { PassType } from "@/types";

interface PassOption {
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: React.ReactNode;
  isPopular?: boolean;
  buttonText: string;
  priceSubtext?: string;
  passType: PassType;
}

interface PassCardSectionProps {
  onWalletConnect?: () => void;
  isWalletConnected?: boolean;
  isConnecting?: boolean;
}

export const PassCardSection = ({ 
  onWalletConnect, 
  isWalletConnected = true, 
  isConnecting = false 
}: PassCardSectionProps = {}) => {
  const { purchasePass, isPurchasing, subscriptionStatus } = usePlatformPass();

  const passOptions: PassOption[] = [
    {
      title: "Free",
      description: "Pay per transaction",
      price: "0.0001",
      priceSubtext: "SOL per recipient",
      features: [
        "Pay as you send",
        "No upfront cost",
        "Perfect for testing",
        "Full functionality",
      ],
      icon: <Zap className="h-5 w-5" />,
      buttonText: "Start Free",
      passType: PassType.FREE,
    },
    {
      title: "3 Days Pass",
      description: "Perfect for campaigns",
      price: "8.5",
      priceSubtext: "SOL",
      features: [
        "Unlimited transfers for 3 days",
        "No per-recipient fees",
        "Priority support",
        "Campaign analytics",
      ],
      icon: <Clock className="h-5 w-5" />,
      buttonText: "Get 3-Day Pass",
      isPopular: true,
      passType: PassType.THREE_DAY,
    },
    {
      title: "Lifetime Pass",
      description: "Best value for power users",
      price: "20",
      priceSubtext: "SOL",
      features: [
        "Unlimited transfers forever",
        "Zero per-recipient fees",
        "Premium support",
        "Advanced analytics",
        "Beta feature access",
      ],
      icon: <InfinityIcon className="h-5 w-5" />,
      buttonText: "Get Lifetime Pass",
      passType: PassType.LIFETIME,
    },
  ];

  const handlePurchase = async (passType: PassType) => {
    // If wallet is not connected, trigger wallet connection
    if (!isWalletConnected && onWalletConnect) {
      onWalletConnect();
      return;
    }

    const result = await purchasePass(passType);
    if (result.success && result.mintAddress) {
      console.log(`Pass purchased successfully! Mint: ${result.mintAddress}`);
    }
  };

  const isPassOwned = (passType: PassType) => {
    return isWalletConnected && subscriptionStatus.passType === passType && subscriptionStatus.hasActivePass;
  };

  const getButtonText = (option: PassOption) => {
    if (!isWalletConnected) {
      return isConnecting ? "Connecting..." : "Connect Wallet to Purchase";
    }
    if (isPurchasing) {
      return "Minting...";
    }
    if (isPassOwned(option.passType)) {
      return "Owned";
    }
    return option.buttonText;
  };

  const isButtonDisabled = (option: PassOption) => {
    if (!isWalletConnected) {
      return isConnecting;
    }
    return isPurchasing || isPassOwned(option.passType);
  };

  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="h-5 w-5 text-yellow-500" />
            <Badge variant="outline" className="text-xs font-medium">
              NFT Pass Cards
            </Badge>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Choose Your Pass
          </h3>
          <p className="text-base text-gray-600 px-2 max-w-2xl mx-auto">
            Get an NFT pass for unlimited transfers and special benefits. Own
            your access forever.
            {!isWalletConnected && (
              <span className="block mt-2 text-sm text-orange-600 font-medium">
                💳 Connect your wallet to purchase passes
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {passOptions.map((option, index) => (
            <Card
              key={option.title}
              className={`relative transition-all duration-200 hover:shadow-lg ${
                option.isPopular
                  ? "border-2 border-black shadow-lg scale-105"
                  : "border border-gray-200 hover:border-gray-300"
              }`}
            >
              {option.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-black text-white px-3 py-1 text-xs font-medium">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    option.isPopular
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {option.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {option.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {option.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-6">
                <div className="mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-black text-gray-900">
                      {option.price}
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      {option.priceSubtext}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6 text-left">
                  {option.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-2 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePurchase(option.passType)}
                  disabled={isButtonDisabled(option)}
                  className={`w-full h-11 font-semibold text-sm rounded-xl transition-all duration-200 ${
                    option.isPopular
                      ? "bg-black hover:bg-gray-800 text-white shadow-md hover:shadow-lg"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200"
                  } ${isButtonDisabled(option) ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {getButtonText(option)}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-sm text-gray-500">
            All passes are minted as NFTs on Solana. They're transferable and
            prove your access rights.
          </p>
        </div>
      </div>
    </div>
  );
};
