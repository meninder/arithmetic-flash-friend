
import React from 'react';
import { Operation, Difficulty } from '@/utils/arithmeticUtils';
import OperationStep from './operation-selector/OperationStep';
import DifficultyStep from './operation-selector/DifficultyStep';
import CountStep from './operation-selector/CountStep';

interface OptionSelectorProps {
  step: 'operation' | 'difficulty' | 'count';
  selectedOperation: Operation | null;
  selectedDifficulty: Difficulty | null;
  count: number;
  onSelectOperation: (operation: Operation) => void;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onSelectCount: (count: number) => void;
  onStart: () => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  step,
  selectedOperation,
  selectedDifficulty,
  count,
  onSelectOperation,
  onSelectDifficulty,
  onSelectCount,
  onStart
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      {step === 'operation' && (
        <OperationStep 
          selectedOperation={selectedOperation} 
          onSelectOperation={onSelectOperation} 
        />
      )}
      {step === 'difficulty' && (
        <DifficultyStep 
          selectedDifficulty={selectedDifficulty} 
          onSelectDifficulty={onSelectDifficulty} 
        />
      )}
      {step === 'count' && (
        <CountStep 
          count={count} 
          onSelectCount={onSelectCount} 
          onStart={onStart} 
        />
      )}
    </div>
  );
};

export default OptionSelector;
