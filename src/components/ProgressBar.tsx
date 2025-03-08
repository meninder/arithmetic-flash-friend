
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
        <span className="font-medium">{current} of {total}</span>
        <span className="font-medium">{Math.round(percentage)}%</span>
      </div>
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500 ease-spring"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
