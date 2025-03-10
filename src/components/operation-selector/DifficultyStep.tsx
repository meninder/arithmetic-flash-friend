
import React from 'react';
import { Difficulty } from '@/utils/arithmeticUtils';
import DifficultyButton from './DifficultyButton';

interface DifficultyStepProps {
  selectedDifficulty: Difficulty | null;
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const DifficultyStep: React.FC<DifficultyStepProps> = ({
  selectedDifficulty,
  onSelectDifficulty
}) => {
  return (
    <div className="animate-slide-up">
      <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-medium">
        Select difficulty
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <DifficultyButton
          difficulty="easy"
          label="Easy"
          isSelected={selectedDifficulty === "easy"}
          onClick={() => onSelectDifficulty("easy")}
        />
        <DifficultyButton
          difficulty="medium"
          label="Medium"
          isSelected={selectedDifficulty === "medium"}
          onClick={() => onSelectDifficulty("medium")}
        />
        <DifficultyButton
          difficulty="hard"
          label="Hard"
          isSelected={selectedDifficulty === "hard"}
          onClick={() => onSelectDifficulty("hard")}
        />
      </div>
    </div>
  );
};

export default DifficultyStep;
