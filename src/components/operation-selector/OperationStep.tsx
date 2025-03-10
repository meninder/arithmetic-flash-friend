
import React from 'react';
import { Operation } from '@/utils/arithmeticUtils';
import OperationButton from './OperationButton';
import { Plus, Minus, X, Divide, Shuffle } from 'lucide-react';

interface OperationStepProps {
  selectedOperation: Operation | null;
  onSelectOperation: (operation: Operation) => void;
}

const OperationStep: React.FC<OperationStepProps> = ({
  selectedOperation,
  onSelectOperation
}) => {
  return (
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
};

export default OperationStep;
