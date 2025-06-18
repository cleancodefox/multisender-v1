import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface LegalDialogProps {
  children: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const LegalDialog = ({ children, title, content }: LegalDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription>Please read carefully</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 text-sm text-gray-700">{content}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export const TermsDialog = ({ children }: { children: React.ReactNode }) => {
  const content = (
    <>
      <div>
        <h3 className="font-semibold text-base mb-2">1. Acceptance of Terms</h3>
        <p>
          By accessing and using Multisent ("the Service"), you accept and agree
          to be bound by the terms and provision of this agreement.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">2. Service Description</h3>
        <p>
          Multisent is a non-custodial bulk token transfer service on the Solana
          blockchain. We provide tools to facilitate multi-recipient transfers
          but do not control, own, or have access to your funds.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">
          3. User Responsibilities
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            You are responsible for the security of your wallet and private keys
          </li>
          <li>
            You must verify all recipient addresses before executing transfers
          </li>
          <li>
            You are responsible for compliance with applicable laws and
            regulations
          </li>
          <li>
            You must ensure you have sufficient funds for transactions and fees
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">4. Prohibited Uses</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Any illegal activities or money laundering</li>
          <li>Sending tokens to sanctioned addresses or individuals</li>
          <li>Spamming or unsolicited token distributions</li>
          <li>Attempting to circumvent security measures</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">5. Disclaimers</h3>
        <p>
          THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE
          DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY
          AND FITNESS FOR A PARTICULAR PURPOSE.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">
          6. Limitation of Liability
        </h3>
        <p>
          IN NO EVENT SHALL MULTISENT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
          SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF FUNDS.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">7. Changes to Terms</h3>
        <p>
          We reserve the right to modify these terms at any time. Continued use
          of the service constitutes acceptance of modified terms.
        </p>
      </div>

      <div className="text-xs text-gray-500 pt-4 border-t">
        Last updated: December 2024
      </div>
    </>
  );

  return (
    <LegalDialog title="Terms & Conditions" content={content}>
      {children}
    </LegalDialog>
  );
};

export const PrivacyDialog = ({ children }: { children: React.ReactNode }) => {
  const content = (
    <>
      <div>
        <h3 className="font-semibold text-base mb-2">
          1. Information We Collect
        </h3>
        <p>
          Multisent is designed to be privacy-first. We do not collect personal
          information or store your private keys.
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>We do not store wallet addresses or transaction data</li>
          <li>We do not track your browsing behavior</li>
          <li>All processing happens locally in your browser</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">
          2. Blockchain Transparency
        </h3>
        <p>
          All transactions on Solana blockchain are public by design. While we
          don't store your data, blockchain transactions are permanently
          recorded and publicly visible.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">
          3. Third-Party Services
        </h3>
        <p>
          We integrate with third-party services that may have their own privacy
          policies:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Solana RPC providers</li>
          <li>Wallet providers (Phantom, Solflare, etc.)</li>
          <li>Token metadata services</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">4. Analytics</h3>
        <p>
          We may use privacy-focused analytics to understand usage patterns and
          improve our service, but this does not include personal
          identification.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">5. Data Security</h3>
        <p>
          Since we don't store sensitive data, there's minimal risk of data
          breaches. Your private keys never leave your device.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">6. Contact Us</h3>
        <p>
          If you have questions about this Privacy Policy, contact us at
          legal@multisent.xyz
        </p>
      </div>

      <div className="text-xs text-gray-500 pt-4 border-t">
        Last updated: December 2024
      </div>
    </>
  );

  return (
    <LegalDialog title="Privacy Policy" content={content}>
      {children}
    </LegalDialog>
  );
};

export const RiskDisclaimerDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const content = (
    <>
      <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
        <h3 className="font-semibold text-red-900 mb-2">
          ⚠️ High Risk Warning
        </h3>
        <p className="text-red-800 text-sm">
          Cryptocurrency transactions are irreversible and high-risk. Only use
          this service if you understand the risks involved.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">1. Transaction Risks</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Irreversible:</strong> All blockchain transactions are
            permanent and cannot be reversed
          </li>
          <li>
            <strong>Address Validation:</strong> Sending to incorrect addresses
            results in permanent loss
          </li>
          <li>
            <strong>Network Fees:</strong> Transaction fees are consumed
            regardless of success or failure
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">2. Technical Risks</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Network congestion may cause transaction failures</li>
          <li>Smart contract bugs or vulnerabilities</li>
          <li>RPC endpoint failures or downtime</li>
          <li>Wallet compatibility issues</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">3. Financial Risks</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Cryptocurrency prices are highly volatile</li>
          <li>Potential total loss of transferred funds</li>
          <li>Regulatory changes may affect token utility</li>
          <li>No insurance or protection on funds</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">
          4. User Responsibilities
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Verify all recipient addresses multiple times</li>
          <li>Test with small amounts first</li>
          <li>Ensure compliance with local regulations</li>
          <li>Keep private keys secure</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">5. No Liability</h3>
        <p>
          Multisent provides tools only. We are not liable for any losses,
          damages, or consequences resulting from your use of the service.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">
          6. Regulatory Compliance
        </h3>
        <p>
          Users are solely responsible for ensuring their use complies with
          applicable laws, including tax obligations and securities regulations.
        </p>
      </div>

      <div className="text-xs text-gray-500 pt-4 border-t">
        Last updated: December 2024
      </div>
    </>
  );

  return (
    <LegalDialog title="Risk Disclaimer" content={content}>
      {children}
    </LegalDialog>
  );
};
