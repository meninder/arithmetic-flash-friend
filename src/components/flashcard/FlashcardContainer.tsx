
import React from 'react';
import { ArithmeticQuestion } from '@/utils/arithmeticUtils';
import FlashcardDisplay from './FlashcardDisplay';
import FlashcardControls from './FlashcardControls';
import AnswerInput from '../AnswerInput';

interface FlashcardContainerProps {
  question: ArithmeticQuestion;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
  isNewQuestion: boolean;
}

const FlashcardContainer: React.FC<FlashcardContainerProps> = ({
  question,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  onCorrectAnswer,
  onWrongAnswer,
  isNewQuestion
}) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [hasAnswered, setHasAnswered] = React.useState(false);
  const [userInputValue, setUserInputValue] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Reset state when question changes
  React.useEffect(() => {
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
        <FlashcardDisplay 
          question={question}
          isFlipped={isFlipped}
          hasAnswered={hasAnswered}
          onClick={handleFlip}
        />
        
        <FlashcardControls 
          onSubmit={handleNext}
          isDisabled={isSubmitDisabled}
        />
      </div>

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

export default FlashcardContainer;
