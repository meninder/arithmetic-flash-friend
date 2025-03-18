
import React from 'react';
import { ArrowLeft, RefreshCw, Trophy, Plus, Minus, X, Divide } from 'lucide-react';
import { ArithmeticQuestion } from '@/utils/arithmeticUtils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface SummaryScreenProps {
  correctAnswers: number;
  totalQuestions: number;
  operation: string;
  difficulty: string;
  onReset: () => void;
  questions: ArithmeticQuestion[];
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({
  correctAnswers,
  totalQuestions,
  operation,
  difficulty,
  onReset,
  questions
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

  // Helper function to get the operation icon
  const getOperationIcon = (questionText: string) => {
    if (questionText.includes('+')) return <Plus className="w-4 h-4 text-primary" />;
    if (questionText.includes('-')) return <Minus className="w-4 h-4 text-primary" />;
    if (questionText.includes('×') || questionText.includes('*')) return <X className="w-4 h-4 text-primary" />;
    if (questionText.includes('÷') || questionText.includes('/')) return <Divide className="w-4 h-4 text-primary" />;
    return null;
  };

  return (
    <div className="animate-scale-up w-full max-w-md mx-auto">
      <div className="glass p-8 rounded-2xl shadow-soft">
        <h2 className="text-2xl font-bold text-center mb-6">Practice Complete!</h2>
        
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto bg-primary/10 border-4 border-primary rounded-full flex items-center justify-center mb-4">
            <div className="text-center">
              <Trophy className="w-8 h-8 text-primary mx-auto mb-1" />
              <div className="text-5xl font-bold text-primary">{percentage}%</div>
            </div>
          </div>
          <div className="text-xl font-medium mb-1">{message}</div>
          <div className="text-muted-foreground">
            You got <span className="font-bold text-primary">{correctAnswers}</span> out of <span className="font-medium">{totalQuestions}</span> questions correct
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
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

        <div className="mb-8">
          <h3 className="font-medium text-lg mb-2">Questions Summary</h3>
          <div className="max-h-60 overflow-y-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead className="text-right">Answer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getOperationIcon(question.questionText)}
                        <span>{question.questionText}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{question.answerText}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <button 
          onClick={onReset}
          className="btn-elegant w-full flex items-center justify-center gap-2 py-3"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Practice Again</span>
        </button>
      </div>
    </div>
  );
};

export default SummaryScreen;
