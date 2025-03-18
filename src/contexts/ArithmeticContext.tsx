
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateQuestions, Operation, Difficulty, ArithmeticQuestion } from '@/utils/arithmeticUtils';

type ArithmeticContextType = {
  step: 'setup' | 'practice' | 'summary';
  setupStep: 'operation' | 'difficulty' | 'count';
  selectedOperation: Operation | null;
  selectedDifficulty: Difficulty | null;
  questionCount: number;
  questions: ArithmeticQuestion[];
  currentQuestionIndex: number;
  isInitialLoad: boolean;
  correctAnswers: number;
  attemptedQuestions: number;
  isNewQuestion: boolean;
  handleSelectOperation: (operation: Operation) => void;
  handleSelectDifficulty: (difficulty: Difficulty) => void;
  handleSelectCount: (count: number) => void;
  handleStartPractice: () => void;
  handleNextQuestion: () => void;
  handleCorrectAnswer: () => void;
  handleWrongAnswer: () => void;
  handleReset: () => void;
  getOperationDisplayName: (op: Operation | null) => string;
  getDifficultyDisplayName: (diff: Difficulty | null) => string;
};

const ArithmeticContext = createContext<ArithmeticContextType | undefined>(undefined);

export const ArithmeticProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      setStep('summary');
      toast({
        title: "Practice completed!",
        description: "Great job! You've completed all the questions.",
      });
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

  const value = {
    step,
    setupStep,
    selectedOperation,
    selectedDifficulty,
    questionCount,
    questions,
    currentQuestionIndex,
    isInitialLoad,
    correctAnswers,
    attemptedQuestions,
    isNewQuestion,
    handleSelectOperation,
    handleSelectDifficulty,
    handleSelectCount,
    handleStartPractice,
    handleNextQuestion,
    handleCorrectAnswer,
    handleWrongAnswer,
    handleReset,
    getOperationDisplayName,
    getDifficultyDisplayName,
  };

  return (
    <ArithmeticContext.Provider value={value}>
      {children}
    </ArithmeticContext.Provider>
  );
};

export const useArithmetic = () => {
  const context = useContext(ArithmeticContext);
  if (context === undefined) {
    throw new Error('useArithmetic must be used within an ArithmeticProvider');
  }
  return context;
};
