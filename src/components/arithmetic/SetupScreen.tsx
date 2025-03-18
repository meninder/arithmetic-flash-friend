
import React from 'react';
import { useArithmetic } from '@/contexts/ArithmeticContext';
import OptionSelector from '../OptionSelector';

const SetupScreen: React.FC = () => {
  const {
    setupStep,
    selectedOperation,
    selectedDifficulty,
    questionCount,
    handleSelectOperation,
    handleSelectDifficulty,
    handleSelectCount,
    handleStartPractice,
    isInitialLoad
  } = useArithmetic();

  const setupClasses = isInitialLoad 
    ? "opacity-0" 
    : "animate-scale-up";

  return (
    <div className={setupClasses}>
      <OptionSelector
        step={setupStep}
        selectedOperation={selectedOperation}
        selectedDifficulty={selectedDifficulty}
        count={questionCount}
        onSelectOperation={handleSelectOperation}
        onSelectDifficulty={handleSelectDifficulty}
        onSelectCount={handleSelectCount}
        onStart={handleStartPractice}
      />
    </div>
  );
};

export default SetupScreen;
