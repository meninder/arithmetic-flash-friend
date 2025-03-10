
import React from 'react';
import { cn } from '@/lib/utils';
import { Operation } from '@/utils/arithmeticUtils';

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

export default OperationButton;
