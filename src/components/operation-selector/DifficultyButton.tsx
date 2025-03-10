
import React from 'react';
import { cn } from '@/lib/utils';
import { Difficulty } from '@/utils/arithmeticUtils';

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

export default DifficultyButton;
