
import React from 'react';

interface ScoreDisplayProps {
  correct: number;
  total: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ correct, total }) => {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  
  return (
    <div className="flex items-center justify-between bg-secondary/40 rounded-lg p-3 mb-4">
      <div className="text-sm font-medium">
        Score:
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-primary">{correct}</span>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">{total}</span>
        <span className="text-sm bg-secondary px-2 py-1 rounded-md">{percentage}%</span>
      </div>
    </div>
  );
};

export default ScoreDisplay;
