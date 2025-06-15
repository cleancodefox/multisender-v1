
import { Button } from '@/components/ui/button';

interface MobileActionBarProps {
  onPreview: () => void;
  isReady: boolean;
  validRecipientsCount: number;
}

export const MobileActionBar = ({ onPreview, isReady, validRecipientsCount }: MobileActionBarProps) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <Button 
          className="w-full h-12 bg-black hover:bg-gray-800 text-white font-semibold text-sm rounded-xl"
          onClick={onPreview}
          disabled={!isReady}
        >
          Preview Transfer ({validRecipientsCount})
        </Button>
      </div>
    </div>
  );
};
