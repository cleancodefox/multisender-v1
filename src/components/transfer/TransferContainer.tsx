
import { ReactNode } from 'react';
import { TransferSummary } from './TransferSummary';
import { TransferSummaryData } from '@/types';

interface TransferContainerProps {
  children: ReactNode;
  transferSummary: TransferSummaryData;
  onPreview: () => void;
}

export const TransferContainer = ({ children, transferSummary, onPreview }: TransferContainerProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      <div className="lg:col-span-2 space-y-6">
        {children}
      </div>

      <div className="hidden lg:block lg:col-span-1">
        <div className="sticky top-24">
          <TransferSummary {...transferSummary} onPreview={onPreview} />
        </div>
      </div>
    </div>
  );
};
