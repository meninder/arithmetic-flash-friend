
import React from 'react';

interface CountStepProps {
  count: number;
  onSelectCount: (count: number) => void;
  onStart: () => void;
}

const CountStep: React.FC<CountStepProps> = ({
  count,
  onSelectCount,
  onStart
}) => {
  return (
    <div className="animate-slide-up">
      <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-3 font-medium">
        How many questions?
      </h2>
      <div className="flex flex-col space-y-4">
        <div className="text-center text-4xl font-bold mb-6">{count}</div>
        <input
          type="range"
          min="5"
          max="50"
          step="1"
          value={count}
          onChange={(e) => onSelectCount(parseInt(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>5</span>
          <span>15</span>
          <span>30</span>
          <span>50</span>
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
};

export default CountStep;
