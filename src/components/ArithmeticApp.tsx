
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import OptionSelector from './OptionSelector';
import Flashcard from './Flashcard';
import ProgressBar from './ProgressBar';
import ScoreDisplay from './ScoreDisplay';
import SummaryScreen from './SummaryScreen';
import { generateQuestions, Operation, Difficulty, ArithmeticQuestion } from '@/utils/arithmeticUtils';

const ArithmeticApp: React.FC = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<'setup' | 'practice' | 'summary'>('setup');
  const [setupStep, setSetupStep] = useState<'operation' | 'difficulty' | 'count'>('operation');
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [questions, setQuestions] = useState<ArithmeticQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [isNewQuestion, setIsNewQuestion] = useState(true);

  useEffect(() => {
    // Set initial load to false after first render
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    setIsNewQuestion(true);
    const timer = setTimeout(() => {
      setIsNewQuestion(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  const handleSelectOperation = (operation: Operation) => {
    setSelectedOperation(operation);
    setSetupStep('difficulty');
  };

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setSetupStep('count');
  };

  const handleSelectCount = (count: number) => {
    setQuestionCount(count);
  };

  const handleStartPractice = () => {
    if (!selectedOperation || !selectedDifficulty) {
      toast({
        title: "Setup incomplete",
        description: "Please select all options to continue",
        variant: "destructive",
      });
      return;
    }

    // Generate questions
    const generatedQuestions = generateQuestions(
      selectedOperation,
      selectedDifficulty,
      questionCount
    );

    setQuestions(generatedQuestions);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setAttemptedQuestions(0);
    setStep('practice');

    toast({
      title: "Practice session started",
      description: `${questionCount} ${selectedOperation} questions at ${selectedDifficulty} level`,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Last question completed
      setStep('summary');
      toast({
        title: "Practice completed!",
        description: "Great job! You've completed all the questions.",
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleCorrectAnswer = () => {
    setCorrectAnswers(prev => prev + 1);
    setAttemptedQuestions(prev => prev + 1);
  };

  const handleWrongAnswer = () => {
    setAttemptedQuestions(prev => prev + 1);
  };

  const handleReset = () => {
    setStep('setup');
    setSetupStep('operation');
    setSelectedOperation(null);
    setSelectedDifficulty(null);
    setQuestionCount(10);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setAttemptedQuestions(0);
  };

  const getOperationDisplayName = (op: Operation | null): string => {
    if (!op) return "";
    switch (op) {
      case 'addition': return 'Addition';
      case 'subtraction': return 'Subtraction';
      case 'multiplication': return 'Multiplication';
      case 'division': return 'Division';
      case 'all': return 'Mixed Operations';
    }
  };

  const getDifficultyDisplayName = (diff: Difficulty | null): string => {
    if (!diff) return "";
    return diff.charAt(0).toUpperCase() + diff.slice(1);
  };

  const setupClasses = isInitialLoad 
    ? "opacity-0" 
    : "animate-scale-up";

  const practiceClasses = isInitialLoad 
    ? "opacity-0"
    : "animate-scale-up";

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Kira's Math Practice</h1>
        <p className="text-muted-foreground">Improve your mental math skills with flashcards</p>
      </header>
      
      {step === 'setup' && (
        <div className={setupClasses}>
          <OptionSelector
            step={setupStep}
            selectedOperation={selectedOperation}
            selectedDifficulty={selectedDifficulty}
            count={questionCount}
            onSelectOperation={handleSelectOperation}
            onSelectDifficulty={handleSelectDifficulty}
            onSelectCount={handleSelectCount}
            onStart={handleStartPractice}
          />
        </div>
      )}

      {step === 'practice' && (
        <div className={practiceClasses}>
          <div className="mb-8">
            <ScoreDisplay 
              correct={correctAnswers} 
              total={attemptedQuestions} 
            />
            
            <ProgressBar
              current={currentQuestionIndex + 1}
              total={questions.length}
              className="mb-8"
            />
            
            {questions.length > 0 && (
              <Flashcard
                question={questions[currentQuestionIndex]}
                onNext={handleNextQuestion}
                onPrevious={handlePreviousQuestion}
                canGoNext={currentQuestionIndex < questions.length - 1}
                canGoPrevious={currentQuestionIndex > 0}
                onCorrectAnswer={handleCorrectAnswer}
                onWrongAnswer={handleWrongAnswer}
                isNewQuestion={isNewQuestion}
              />
            )}
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              onClick={handleReset}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Reset and start over
            </button>
          </div>
        </div>
      )}

      {step === 'summary' && (
        <div className="animate-scale-up">
          <SummaryScreen
            correctAnswers={correctAnswers}
            totalQuestions={questions.length}
            operation={getOperationDisplayName(selectedOperation)}
            difficulty={getDifficultyDisplayName(selectedDifficulty)}
            onReset={handleReset}
          />
        </div>
      )}
    </div>
  );
};

export default ArithmeticApp;
