import { Button } from "@/components/ui/button";
import { PassCardSection } from "@/components/PassCardSection";
import { FAQSection } from "@/components/FAQSection";
import { WhoIsItForSection } from "@/components/WhoIsItForSection";
import {
  TermsDialog,
  PrivacyDialog,
  RiskDisclaimerDialog,
} from "@/components/LegalDialogs";
import { Send, ArrowRight, Zap, Shield, DollarSign } from "lucide-react";

interface WelcomeScreenProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export const WelcomeScreen = ({
  onConnect,
  isConnecting,
}: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-8 sm:mb-12">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-black rounded-2xl flex items-center justify-center">
              <Send className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Multisent
            </h1>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 sm:mb-8 tracking-tight text-gray-900 leading-none">
            Send to 10,000
            <br />
            wallets in seconds
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 mb-12 sm:mb-16 max-w-2xl mx-auto leading-relaxed px-2">
            The fastest way to distribute tokens on Solana. Ultra-low fees,
            instant transfers.
          </p>

          <Button
            onClick={onConnect}
            disabled={isConnecting}
            className="h-14 sm:h-16 px-8 sm:px-12 bg-black hover:bg-gray-800 text-white font-bold text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isConnecting ? "Connecting..." : "Start Sending"}
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 sm:ml-3" />
          </Button>
        </div>
      </div>

      {/* Why Multisent */}
      <div className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Why Multisent?
            </h3>
            <p className="text-base text-gray-600 px-2">
              Simple. Fast. Reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Lightning Fast
              </h4>
              <p className="text-sm text-gray-600">
                Send to thousands of wallets in seconds
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Ultra Low Fees
              </h4>
              <p className="text-sm text-gray-600">
                Save 95% compared to manual sending
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Non-Custodial
              </h4>
              <p className="text-sm text-gray-600">
                Your wallet, your keys, your control
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Who is it for Section */}
      <WhoIsItForSection />

      {/* Pass Card NFT Section */}
      <PassCardSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Footer */}
      <div className="bg-black py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Ready to get started?
          </h3>
          <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 px-2">
            Connect your wallet and start sending tokens
          </p>

          <Button
            onClick={onConnect}
            disabled={isConnecting}
            className="h-12 sm:h-14 px-6 sm:px-8 bg-white hover:bg-gray-100 text-black font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Disclaimer */}
          <div className="mb-8 p-4 sm:p-6 bg-white rounded-2xl border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              ⚠️ Important Disclaimer
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Multisent is a tool for token distribution on Solana. Users are
              responsible for ensuring compliance with applicable laws and
              regulations. Always verify recipient addresses before sending.
              Transactions on blockchain are irreversible. Use at your own risk.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            {/* Logo and Copyright */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Send className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-gray-900 font-bold text-lg">Multisent</div>
                <div className="text-gray-500 text-xs">
                  © 2024 All rights reserved
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
              <TermsDialog>
                <button className="text-gray-600 hover:text-black transition-colors duration-200 underline">
                  Terms & Conditions
                </button>
              </TermsDialog>

              <PrivacyDialog>
                <button className="text-gray-600 hover:text-black transition-colors duration-200 underline">
                  Privacy Policy
                </button>
              </PrivacyDialog>

              <RiskDisclaimerDialog>
                <button className="text-gray-600 hover:text-black transition-colors duration-200 underline">
                  Risk Disclaimer
                </button>
              </RiskDisclaimerDialog>

              <a
                href="mailto:legal@multisent.xyz"
                className="text-gray-600 hover:text-black transition-colors duration-200 underline"
              >
                Legal Contact
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              Built on Solana • Non-custodial • Open Source
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
