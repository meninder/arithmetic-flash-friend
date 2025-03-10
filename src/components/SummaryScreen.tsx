
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface SummaryScreenProps {
  correctAnswers: number;
  totalQuestions: number;
  operation: string;
  difficulty: string;
  onReset: () => void;
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({
  correctAnswers,
  totalQuestions,
  operation,
  difficulty,
  onReset
}) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  let message = "Good effort!";
  if (percentage >= 90) {
    message = "Excellent work!";
  } else if (percentage >= 70) {
    message = "Great job!";
  } else if (percentage >= 50) {
    message = "Good effort!";
  } else {
    message = "Keep practicing!";
  }

  return (
    <div className="animate-scale-up w-full max-w-md mx-auto">
      <div className="glass p-8 rounded-2xl shadow-soft">
        <h2 className="text-2xl font-bold text-center mb-6">Practice Complete!</h2>
        
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-primary mb-2">{percentage}%</div>
          <div className="text-xl font-medium mb-1">{message}</div>
          <div className="text-muted-foreground">
            You got {correctAnswers} out of {totalQuestions} questions correct
          </div>
        </div>
        
        <div className="space-y-2 mb-8">
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Operation:</span>
            <span className="font-medium">{operation}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Difficulty:</span>
            <span className="font-medium">{difficulty}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Questions:</span>
            <span className="font-medium">{totalQuestions}</span>
          </div>
        </div>
        
        <button 
          onClick={onReset}
          className="btn-elegant w-full flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Practice Again</span>
        </button>
      </div>
    </div>
  );
};

export default SummaryScreen;
