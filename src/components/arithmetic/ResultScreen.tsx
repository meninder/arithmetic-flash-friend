
import React from 'react';
import { useArithmetic } from '@/contexts/ArithmeticContext';
import SummaryScreen from '../SummaryScreen';

const ResultScreen: React.FC = () => {
  const {
    correctAnswers,
    questions,
    selectedOperation,
    selectedDifficulty,
    handleReset,
    getOperationDisplayName,
    getDifficultyDisplayName
  } = useArithmetic();

  return (
    <div className="animate-scale-up">
      <SummaryScreen
        correctAnswers={correctAnswers}
        totalQuestions={questions.length}
        operation={getOperationDisplayName(selectedOperation)}
        difficulty={getDifficultyDisplayName(selectedDifficulty)}
        onReset={handleReset}
        questions={questions}
      />
    </div>
  );
};

export default ResultScreen;
