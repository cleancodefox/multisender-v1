import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Clock, Infinity, Zap } from "lucide-react";
import { SubscriptionStatus, PassType } from "@/types";

interface SubscriptionBannerProps {
  subscriptionStatus: SubscriptionStatus;
  onViewPasses: () => void;
}

export const SubscriptionBanner = ({ subscriptionStatus, onViewPasses }: SubscriptionBannerProps) => {
  if (subscriptionStatus.isLoading) {
    return (
      <Card className="mb-6 bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPassIcon = (passType: PassType | null) => {
    switch (passType) {
      case PassType.THREE_DAY:
        return <Clock className="h-5 w-5" />;
      case PassType.LIFETIME:
        return <Infinity className="h-5 w-5" />;
      case PassType.FREE:
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  const getPassColor = (passType: PassType | null) => {
    switch (passType) {
      case PassType.THREE_DAY:
        return "bg-blue-50 border-blue-200 text-blue-900";
      case PassType.LIFETIME:
        return "bg-purple-50 border-purple-200 text-purple-900";
      case PassType.FREE:
      default:
        return "bg-gray-50 border-gray-200 text-gray-900";
    }
  };

  if (subscriptionStatus.hasActivePass) {
    return (
      <Card className={`mb-6 ${getPassColor(subscriptionStatus.passType)}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center">
                {getPassIcon(subscriptionStatus.passType)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  <span className="font-semibold">
                    {subscriptionStatus.passType?.replace('_', ' ').toUpperCase()} Pass Active
                  </span>
                </div>
                <p className="text-sm opacity-75">
                  {subscriptionStatus.expiryDate
                    ? `Expires: ${subscriptionStatus.expiryDate.toLocaleDateString()}`
                    : "Unlimited access forever"}
                </p>
              </div>
            </div>
            {subscriptionStatus.mintAddress && (
              <Badge variant="outline" className="text-xs">
                NFT Pass
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 bg-yellow-50 border-yellow-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Zap className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-yellow-900">Free Plan</span>
                <Badge variant="outline" className="text-xs border-yellow-300 text-yellow-700">
                  Pay per use
                </Badge>
              </div>
              <p className="text-sm text-yellow-700">
                0.0001 SOL per recipient • Upgrade for unlimited transfers
              </p>
            </div>
          </div>
          <Button
            onClick={onViewPasses}
            size="sm"
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            Upgrade
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 