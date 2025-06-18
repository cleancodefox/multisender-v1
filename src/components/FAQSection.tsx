import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQSection = () => {
  const faqItems: FAQItem[] = [
    {
      category: "General",
      question: "What is Multisent?",
      answer:
        "Multisent is a bulk token transfer service on Solana that allows you to send SOL or SPL tokens to multiple recipients efficiently. Perfect for airdrops, payments, and token distributions with automatic batching.",
    },
    {
      category: "Pricing",
      question: "How much does it cost?",
      answer:
        "We charge 0.0001 SOL per recipient plus network fees (0.000005 SOL per transaction). For token transfers, additional fees may apply for creating Associated Token Accounts (0.00203928 SOL per new account).",
    },
    {
      category: "Technical",
      question: "Which wallets and tokens are supported?",
      answer:
        "All major Solana wallets (Phantom, Solflare, Backpack) are supported. You can send SOL and any SPL tokens that appear in your wallet with their current balances.",
    },
    {
      category: "Usage",
      question: "How do I upload recipient lists?",
      answer:
        "You can manually add recipients one by one or upload a CSV file. CSV format: first column for wallet addresses, second column for amounts (optional for equal distribution).",
    },
    {
      category: "Usage",
      question: "How long do transfers take?",
      answer:
        "Transfers complete within seconds thanks to Solana's speed. Large batches are automatically split into multiple transactions of 8 instructions each for optimal processing.",
    },
    {
      category: "Security",
      question: "Is Multisent safe?",
      answer:
        "Yes! Multisent is completely non-custodial. We never access your private keys or funds. All addresses are validated before transfers, and you maintain full control through your wallet.",
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-gray-600" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h3>
          <p className="text-base text-gray-600 px-2 max-w-2xl mx-auto">
            Everything you need to know about using Multisent for your token
            distributions
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-gray-100"
              >
                <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-black">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
