import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArithmeticQuestion } from '@/utils/arithmeticUtils';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
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
  const [userInputValue, setUserInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setIsFlipped(false);
    setHasAnswered(false);
    setUserInputValue('');
    setIsSubmitting(false);
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
    
    if (!hasAnswered && userInputValue) {
      // If we haven't answered yet but have input, trigger answer submission first
      setIsSubmitting(true); // Set submitting state to disable button
      const answerInput = document.querySelector('input[type="text"]') as HTMLInputElement;
      const form = answerInput?.form;
      if (form) {
        const formEvent = new Event('submit', { cancelable: true, bubbles: true });
        form.dispatchEvent(formEvent);
        return; // Don't proceed with next question yet
      }
    } 
    
    if (hasAnswered && !isAnimating) {
      // If we've already answered, proceed to next question or summary screen
      setIsSubmitting(true); // Set submitting state to disable button
      setTimeout(() => {
        setIsAnimating(true);
        setIsFlipped(false);
        setTimeout(() => {
          onNext(); // This will navigate to next question or summary screen
          setIsAnimating(false);
          setIsSubmitting(false);
        }, 300);
      }, 1000); // Wait 1 second before moving to the next question
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
    // Automatically trigger the next question after a short delay
    setTimeout(() => {
      setIsSubmitting(true); // Set submitting state to disable button
      setTimeout(() => {
        setIsAnimating(true);
        setIsFlipped(false);
        setTimeout(() => {
          onNext(); // Go to next question or summary screen
          setIsAnimating(false);
          setIsSubmitting(false); // Reset submitting state after animation
        }, 300);
      }, 2000); // Wait 2 seconds before moving to the next question
    }, 0);
  };

  const handleFlipFromSubmit = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handleInputChange = (value: string) => {
    setUserInputValue(value);
  };

  // Determine if the submit button should be disabled
  const isSubmitDisabled = 
    (!hasAnswered && !userInputValue) || // No answer input
    isSubmitting; // Currently submitting

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
          disabled={isSubmitDisabled}
          className={cn(
            "btn-elegant flex items-center gap-2 px-4 py-2",
            isSubmitDisabled ? 
              "opacity-50 cursor-not-allowed hover:scale-100" : 
              "opacity-100 cursor-pointer hover:scale-105"
          )}
        >
          <span className="hidden sm:inline">Submit</span>
          <CheckCircle className="w-4 h-4" />
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
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default Flashcard;
