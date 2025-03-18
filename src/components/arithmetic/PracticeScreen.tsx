
import React from 'react';
import { useArithmetic } from '@/contexts/ArithmeticContext';
import Flashcard from '../Flashcard';
import ProgressBar from '../ProgressBar';
import ScoreDisplay from '../ScoreDisplay';

const PracticeScreen: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    correctAnswers,
    attemptedQuestions,
    isNewQuestion,
    handleNextQuestion,
    handleCorrectAnswer,
    handleWrongAnswer,
    handleReset,
    isInitialLoad
  } = useArithmetic();

  const practiceClasses = isInitialLoad 
    ? "opacity-0"
    : "animate-scale-up";

  return (
    <div className={practiceClasses}>
      <div className="mb-8">
        <ScoreDisplay 
          correct={correctAnswers} 
          total={attemptedQuestions} 
        />
        
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={questions.length}
          className="mb-8"
        />
        
        {questions.length > 0 && (
          <Flashcard
            question={questions[currentQuestionIndex]}
            onNext={handleNextQuestion}
            onPrevious={() => {}}
            canGoNext={currentQuestionIndex < questions.length - 1}
            canGoPrevious={false}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            isNewQuestion={isNewQuestion}
          />
        )}
      </div>
      
      <div className="flex justify-center mt-8">
        <button
          onClick={handleReset}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Reset and start over
        </button>
      </div>
    </div>
  );
};

export default PracticeScreen;
