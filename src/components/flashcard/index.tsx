
import React from 'react';
import FlashcardContainer from './FlashcardContainer';
import { ArithmeticQuestion } from '@/utils/arithmeticUtils';

interface FlashcardProps {
  question: ArithmeticQuestion;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
  isNewQuestion: boolean;
}

// This is just a pass-through component to maintain the existing API
const Flashcard: React.FC<FlashcardProps> = (props) => {
  return <FlashcardContainer {...props} />;
};

export default Flashcard;
