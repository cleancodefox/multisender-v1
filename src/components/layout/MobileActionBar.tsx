
import { Button } from '@/components/ui/button';

interface MobileActionBarProps {
  onPreview: () => void;
  isReady: boolean;
  validRecipientsCount: number;
}

export const MobileActionBar = ({ onPreview, isReady, validRecipientsCount }: MobileActionBarProps) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <Button 
          className="w-full h-14 bg-black hover:bg-gray-800 text-white font-semibold text-base rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onPreview}
          disabled={!isReady}
        >
          {isReady ? `Preview Transfer (${validRecipientsCount})` : 'Add recipients to continue'}
        </Button>
      </div>
    </div>
  );
};
