
import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnswerInputProps {
  correctAnswer: number;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
  onSubmit: () => void;
  isNewQuestion: boolean;
  onFlipCard: () => void;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  correctAnswer,
  onCorrectAnswer,
  onWrongAnswer,
  onSubmit,
  isNewQuestion,
  onFlipCard
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Reset the component when a new question is shown
  useEffect(() => {
    if (isNewQuestion) {
      setUserAnswer('');
      setIsCorrect(null);
      setHasSubmitted(false);
    }
  }, [isNewQuestion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (hasSubmitted || !userAnswer) return;
    
    const parsed = parseInt(userAnswer, 10);
    const correct = !isNaN(parsed) && parsed === correctAnswer;
    
    setIsCorrect(correct);
    setHasSubmitted(true);
    
    if (correct) {
      onCorrectAnswer();
    } else {
      onWrongAnswer();
    }
    
    onSubmit();
    onFlipCard(); // Flip the card when answer is submitted
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-4">
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => !hasSubmitted && setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
            className={cn(
              "flex-1 p-3 rounded-lg border text-center text-xl font-medium",
              hasSubmitted && isCorrect && "border-green-500 bg-green-50",
              hasSubmitted && !isCorrect && "border-red-500 bg-red-50"
            )}
            disabled={hasSubmitted}
            autoFocus
          />
        </div>
        
        {hasSubmitted && (
          <div className={cn(
            "flex items-center justify-center p-2 rounded-lg mt-2",
            isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}>
            {isCorrect ? (
              <div className="flex items-center">
                <Check className="w-5 h-5 mr-2" />
                <span>Correct!</span>
              </div>
            ) : (
              <div className="flex items-center">
                <X className="w-5 h-5 mr-2" />
                <span>The correct answer is {correctAnswer}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default AnswerInput;
