
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArithmeticQuestion } from '@/utils/arithmeticUtils';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface FlashcardProps {
  question: ArithmeticQuestion;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({
  question,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset flip state when question changes
  useEffect(() => {
    setIsFlipped(false);
  }, [question]);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
      setTimeout(() => setIsAnimating(false), 600); // Match animation duration
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canGoNext && !isAnimating) {
      setIsAnimating(true);
      setIsFlipped(false);
      setTimeout(() => {
        onNext();
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canGoPrevious && !isAnimating) {
      setIsAnimating(true);
      setIsFlipped(false);
      setTimeout(() => {
        onPrevious();
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className="card-flip-container aspect-[4/3] w-full"
        onClick={handleFlip}
      >
        <div className={cn("card-flip w-full h-full", isFlipped && "flipped")}>
          {/* Card Front */}
          <div className="card-front w-full h-full">
            <div className="glass w-full h-full rounded-2xl shadow-soft p-8 flex flex-col items-center justify-center cursor-pointer select-none">
              <div className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
                {question.questionText}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Tap to reveal answer
              </div>
            </div>
          </div>
          
          {/* Card Back */}
          <div className="card-back w-full h-full">
            <div className="glass w-full h-full rounded-2xl shadow-soft p-8 flex flex-col items-center justify-center cursor-pointer select-none">
              <div className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
                {question.answerText}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Tap to see question
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          className={cn(
            "btn-elegant flex items-center gap-2 px-4 py-2",
            !canGoPrevious && "opacity-50 cursor-not-allowed hover:scale-100"
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
        
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className={cn(
            "btn-elegant flex items-center gap-2 px-4 py-2",
            !canGoNext && "opacity-50 cursor-not-allowed hover:scale-100"
          )}
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
