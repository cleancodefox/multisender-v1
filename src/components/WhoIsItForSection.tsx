import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gift, Users, Coins, Target, Building, Gamepad2 } from "lucide-react";

interface UseCase {
  title: string;
  description: string;
  examples: string[];
  icon: React.ReactNode;
}

export const WhoIsItForSection = () => {
  const useCases: UseCase[] = [
    {
      title: "Airdrop Campaigns",
      description: "Mass token distributions to thousands of users",
      examples: [
        "New token launches",
        "Community airdrops",
        "Snapshot-based rewards",
        "Marketing campaigns",
      ],
      icon: <Gift className="h-6 w-6" />,
    },
    {
      title: "Community Rewards",
      description: "Reward your most active community members",
      examples: [
        "Discord/Twitter engagement",
        "NFT holder rewards",
        "Staking rewards",
        "Competition prizes",
      ],
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Team & Partner Payments",
      description: "Streamline payments to teams and partners",
      examples: [
        "Team member salaries",
        "Contractor payments",
        "Partner distributions",
        "Investor payouts",
      ],
      icon: <Building className="h-6 w-6" />,
    },
    {
      title: "Gaming & NFT Projects",
      description: "Perfect for gaming and NFT ecosystems",
      examples: [
        "In-game token rewards",
        "Tournament prizes",
        "NFT mint refunds",
        "Player achievements",
      ],
      icon: <Gamepad2 className="h-6 w-6" />,
    },
    {
      title: "DeFi Protocols",
      description: "Distribute rewards and incentives efficiently",
      examples: [
        "Liquidity provider rewards",
        "Governance token distributions",
        "Yield farming rewards",
        "Protocol incentives",
      ],
      icon: <Coins className="h-6 w-6" />,
    },
    {
      title: "Marketing & Growth",
      description: "Fuel your growth with targeted distributions",
      examples: [
        "Referral rewards",
        "User onboarding incentives",
        "Social media campaigns",
        "Beta tester rewards",
      ],
      icon: <Target className="h-6 w-6" />,
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Who is Multisent for?
          </h3>
          <p className="text-base text-gray-600 px-2 max-w-2xl mx-auto">
            From startups to enterprises, Multisent powers efficient token
            distributions across the Solana ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md"
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  {useCase.icon}
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">
                  {useCase.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {useCase.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {useCase.examples.map((example, exampleIndex) => (
                    <li
                      key={exampleIndex}
                      className="flex items-start gap-2 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600">{example}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <p className="text-sm text-gray-500">
            Join thousands of projects already using Multisent for their token
            distributions
          </p>
        </div>
      </div>
    </div>
  );
};
