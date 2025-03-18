
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface FlashcardControlsProps {
  onSubmit: (e: React.MouseEvent) => void;
  isDisabled: boolean;
}

const FlashcardControls: React.FC<FlashcardControlsProps> = ({
  onSubmit,
  isDisabled
}) => {
  return (
    <button
      onClick={onSubmit}
      disabled={isDisabled}
      className={cn(
        "btn-elegant flex items-center gap-2 px-4 py-2",
        isDisabled ? 
          "opacity-50 cursor-not-allowed hover:scale-100" : 
          "opacity-100 cursor-pointer hover:scale-105"
      )}
    >
      <span className="hidden sm:inline">Submit</span>
      <CheckCircle className="w-4 h-4" />
    </button>
  );
};

export default FlashcardControls;
