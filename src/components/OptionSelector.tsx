import React from 'react';
import { cn } from '@/lib/utils';
import { Operation, Difficulty } from '@/utils/arithmeticUtils';
import { Plus, Minus, X, Divide, Shuffle } from 'lucide-react';

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
  const renderOperationStep = () => (
    <div className="animate-slide-up">
      <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-medium">
        Choose an operation
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <OperationButton 
          operation="addition"
          icon={<Plus className="w-6 h-6" />}
          label="Addition"
          isSelected={selectedOperation === "addition"}
          onClick={() => onSelectOperation("addition")}
        />
        <OperationButton 
          operation="subtraction"
          icon={<Minus className="w-6 h-6" />}
          label="Subtraction"
          isSelected={selectedOperation === "subtraction"}
          onClick={() => onSelectOperation("subtraction")}
        />
        <OperationButton 
          operation="multiplication"
          icon={<X className="w-6 h-6" />}
          label="Multiplication"
          isSelected={selectedOperation === "multiplication"}
          onClick={() => onSelectOperation("multiplication")}
        />
        <OperationButton 
          operation="division"
          icon={<Divide className="w-6 h-6" />}
          label="Division"
          isSelected={selectedOperation === "division"}
          onClick={() => onSelectOperation("division")}
        />
        <OperationButton 
          operation="all"
          icon={<Shuffle className="w-6 h-6" />}
          label="Mixed"
          isSelected={selectedOperation === "all"}
          onClick={() => onSelectOperation("all")}
        />
      </div>
    </div>
  );

  const renderDifficultyStep = () => (
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

  const renderCountStep = () => (
    <div className="animate-slide-up">
      <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-medium">
        How many questions?
      </h2>
      <div className="flex flex-col space-y-4">
        <div className="w-full bg-secondary rounded-full h-1.5 mb-6">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(count / 20) * 100}%` }}
          ></div>
        </div>
        <div className="text-center text-4xl font-bold mb-6">{count}</div>
        <input
          type="range"
          min="5"
          max="20"
          step="5"
          value={count}
          onChange={(e) => onSelectCount(parseInt(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>5</span>
          <span>10</span>
          <span>15</span>
          <span>20</span>
        </div>
        <button 
          className="btn-elegant mt-6 w-full"
          onClick={onStart}
        >
          Start Practice
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto">
      {step === 'operation' && renderOperationStep()}
      {step === 'difficulty' && renderDifficultyStep()}
      {step === 'count' && renderCountStep()}
    </div>
  );
};

interface OperationButtonProps {
  operation: Operation;
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const OperationButton: React.FC<OperationButtonProps> = ({
  operation,
  icon,
  label,
  isSelected,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "glass rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300",
        "border-2 hover:shadow-lg",
        isSelected
          ? "border-primary ring-2 ring-primary/25"
          : "border-transparent hover:border-primary/20"
      )}
    >
      <div className="p-3 rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

interface DifficultyButtonProps {
  difficulty: Difficulty;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const DifficultyButton: React.FC<DifficultyButtonProps> = ({
  difficulty,
  label,
  isSelected,
  onClick
}) => {
  const getColor = () => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/10 text-green-600';
      case 'medium': return 'bg-orange-500/10 text-orange-600';
      case 'hard': return 'bg-red-500/10 text-red-600';
    }
  };

  const getBorderColor = () => {
    switch (difficulty) {
      case 'easy': return 'border-green-500 ring-green-500/25';
      case 'medium': return 'border-orange-500 ring-orange-500/25';
      case 'hard': return 'border-red-500 ring-red-500/25';
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "glass rounded-xl p-6 flex flex-col items-center justify-center gap-2 transition-all duration-300",
        "border-2 hover:shadow-lg",
        isSelected
          ? getBorderColor() + " ring-2"
          : "border-transparent"
      )}
    >
      <div className={cn("p-3 rounded-full", getColor())}>
        <span className="text-lg font-semibold">{difficulty[0].toUpperCase()}</span>
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default OptionSelector;
