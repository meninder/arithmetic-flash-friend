
export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface ArithmeticQuestion {
  id: number;
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  questionText: string;
  answerText: string;
}

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getDifficultyRange = (
  difficulty: Difficulty,
  operation: Operation
): { min1: number; max1: number; min2: number; max2: number } => {
  switch (operation) {
    case 'addition':
      switch (difficulty) {
        case 'easy': return { min1: 1, max1: 10, min2: 1, max2: 10 };
        case 'medium': return { min1: 10, max1: 50, min2: 10, max2: 50 };
        case 'hard': return { min1: 50, max1: 100, min2: 50, max2: 100 };
      }
      break;
    case 'subtraction':
      switch (difficulty) {
        case 'easy': return { min1: 5, max1: 20, min2: 1, max2: 5 };
        case 'medium': return { min1: 25, max1: 50, min2: 5, max2: 25 };
        case 'hard': return { min1: 50, max1: 100, min2: 25, max2: 50 };
      }
      break;
    case 'multiplication':
      switch (difficulty) {
        case 'easy': return { min1: 1, max1: 5, min2: 1, max2: 5 };
        case 'medium': return { min1: 5, max1: 12, min2: 5, max2: 12 };
        case 'hard': return { min1: 10, max1: 20, min2: 10, max2: 20 };
      }
      break;
    case 'division':
      switch (difficulty) {
        case 'easy': return { min1: 1, max1: 25, min2: 1, max2: 5 };
        case 'medium': return { min1: 20, max1: 50, min2: 2, max2: 10 };
        case 'hard': return { min1: 50, max1: 100, min2: 5, max2: 20 };
      }
      break;
  }
  
  // Default fallback
  return { min1: 1, max1: 10, min2: 1, max2: 10 };
};

const getOperationSymbol = (operation: Operation): string => {
  switch (operation) {
    case 'addition': return '+';
    case 'subtraction': return '−';
    case 'multiplication': return '×';
    case 'division': return '÷';
  }
};

export const generateQuestions = (
  operation: Operation,
  difficulty: Difficulty,
  count: number
): ArithmeticQuestion[] => {
  const questions: ArithmeticQuestion[] = [];
  const range = getDifficultyRange(difficulty, operation);
  
  for (let i = 0; i < count; i++) {
    let num1: number, num2: number, answer: number;
    
    if (operation === 'division') {
      // For division, we want clean results (whole numbers)
      num2 = getRandomNumber(range.min2, range.max2);
      answer = getRandomNumber(1, Math.floor(range.max1 / num2));
      num1 = num2 * answer;
    } else if (operation === 'subtraction') {
      // For subtraction, ensure num1 > num2
      num1 = getRandomNumber(range.min1, range.max1);
      num2 = getRandomNumber(range.min2, Math.min(num1, range.max2));
      answer = num1 - num2;
    } else {
      num1 = getRandomNumber(range.min1, range.max1);
      num2 = getRandomNumber(range.min2, range.max2);
      
      switch (operation) {
        case 'addition':
          answer = num1 + num2;
          break;
        case 'multiplication':
          answer = num1 * num2;
          break;
        default:
          answer = 0; // This should never happen
      }
    }
    
    const symbol = getOperationSymbol(operation);
    
    questions.push({
      id: i + 1,
      num1,
      num2,
      operation,
      answer,
      questionText: `${num1} ${symbol} ${num2} = ?`,
      answerText: `${num1} ${symbol} ${num2} = ${answer}`
    });
  }
  
  return questions;
};
