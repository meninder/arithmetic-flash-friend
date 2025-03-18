
import React from 'react';
import { ArithmeticProvider } from '@/contexts/ArithmeticContext';
import { useArithmetic } from '@/contexts/ArithmeticContext';
import SetupScreen from './arithmetic/SetupScreen';
import PracticeScreen from './arithmetic/PracticeScreen';
import ResultScreen from './arithmetic/ResultScreen';

// Main content component that uses the context
const ArithmeticContent: React.FC = () => {
  const { step } = useArithmetic();
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Purewal Math Practice</h1>
        <p className="text-muted-foreground">Math is like a muscle, practice makes it stronger</p>
      </header>
      
      {step === 'setup' && <SetupScreen />}
      {step === 'practice' && <PracticeScreen />}
      {step === 'summary' && <ResultScreen />}
    </div>
  );
};

// Wrapper component that provides the context
const ArithmeticApp: React.FC = () => {
  return (
    <ArithmeticProvider>
      <ArithmeticContent />
    </ArithmeticProvider>
  );
};

export default ArithmeticApp;
