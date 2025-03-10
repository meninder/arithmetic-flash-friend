
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArithmeticQuestion } from '@/utils/arithmeticUtils';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import AnswerInput from './AnswerInput';

interface FlashcardProps {
  question: ArithmeticQuestion;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
  isNewQuestion: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({
  question,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  onCorrectAnswer,
  onWrongAnswer,
  isNewQuestion
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setIsFlipped(false);
    setHasAnswered(false);
  }, [question]);

  const handleFlip = () => {
    if (!isAnimating && !hasAnswered) {
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

  const handleAnswerSubmit = () => {
    setHasAnswered(true);
  };

  const handleFlipFromSubmit = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-center gap-4 w-full mb-6">
        {/* Navigation Controls on the sides of the card */}
        <button
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          className={cn(
            "btn-elegant flex items-center gap-2 px-4 py-2",
            !canGoPrevious && "opacity-50 cursor-not-allowed hover:scale-100"
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        <div 
          className={cn("card-flip-container aspect-[4/3] w-full", hasAnswered && "pointer-events-none")}
          onClick={handleFlip}
        >
          <div className={cn("card-flip w-full h-full", isFlipped && "flipped")}>
            {/* Card Front */}
            <div className="card-front w-full h-full">
              <div className="glass w-full h-full rounded-2xl shadow-soft p-8 flex flex-col items-center justify-center cursor-pointer select-none">
                <div className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
                  {question.questionText}
                </div>
                
                {!hasAnswered && (
                  <div className="text-sm text-muted-foreground mt-2">
                    {isFlipped ? "Tap to see question" : "Tap to see answer"}
                  </div>
                )}
              </div>
            </div>
            
            {/* Card Back */}
            <div className="card-back w-full h-full">
              <div className="glass w-full h-full rounded-2xl shadow-soft p-8 flex flex-col items-center justify-center cursor-pointer select-none">
                <div className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
                  {question.answerText}
                </div>
                
                {!hasAnswered && (
                  <div className="text-sm text-muted-foreground mt-2">
                    Tap to see question
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleNext}
          disabled={!canGoNext || !hasAnswered}
          className={cn(
            "btn-elegant flex items-center gap-2 px-4 py-2",
            (!canGoNext || !hasAnswered) && "opacity-50 cursor-not-allowed hover:scale-100"
          )}
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Answer Input Form */}
      <AnswerInput 
        correctAnswer={question.answer}
        onCorrectAnswer={onCorrectAnswer}
        onWrongAnswer={onWrongAnswer}
        onSubmit={handleAnswerSubmit}
        isNewQuestion={isNewQuestion}
        onFlipCard={handleFlipFromSubmit}
      />
    </div>
  );
};

export default Flashcard;
