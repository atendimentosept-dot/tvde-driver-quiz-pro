
import React, { useState, useCallback } from 'react';
import { Question, UserAnswer, QuizResult, UserProfile } from './types';
import { QUESTION_BANK } from './constants/questionBank';
import { selectRandomQuestions } from './utils/quizUtils';
import useLocalStorage from './hooks/useLocalStorage';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import ProfileScreen from './components/ProfileScreen';
import { HomeIcon, UserIcon } from './components/Icons';

type Screen = 'start' | 'quiz' | 'results' | 'profile';

const QUIZ_LENGTH = 30;

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([]);
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);
  const [profile, setProfile] = useLocalStorage<UserProfile>('tvde-quiz-profile', { quizHistory: [] });

  const startNewTest = useCallback(() => {
    const questions = selectRandomQuestions(QUESTION_BANK, QUIZ_LENGTH);
    setCurrentQuizQuestions(questions);
    setScreen('quiz');
  }, []);

  const restartSameTest = useCallback(() => {
    if (currentQuizQuestions.length > 0) {
      setScreen('quiz');
    } else {
      startNewTest();
    }
  }, [currentQuizQuestions, startNewTest]);

  const handleQuizComplete = useCallback((answers: UserAnswer[]) => {
    let score = 0;
    answers.forEach(userAnswer => {
      const question = currentQuizQuestions.find(q => q.id === userAnswer.questionId);
      if (question && question.correctAnswer === userAnswer.answer) {
        score++;
      }
    });

    const result: QuizResult = {
      score,
      totalQuestions: currentQuizQuestions.length,
      date: new Date().toISOString(),
      answers,
      questions: currentQuizQuestions,
    };

    setLastResult(result);
    setProfile({ quizHistory: [...profile.quizHistory, result] });
    setScreen('results');
  }, [currentQuizQuestions, profile, setProfile]);

  const renderScreen = () => {
    switch (screen) {
      case 'quiz':
        return <QuizScreen questions={currentQuizQuestions} onQuizComplete={handleQuizComplete} />;
      case 'results':
        return lastResult && <ResultsScreen result={lastResult} onRestartSameTest={restartSameTest} onStartNewTest={startNewTest} />;
      case 'profile':
        return <ProfileScreen profile={profile} />;
      case 'start':
      default:
        return <StartScreen onStartQuiz={startNewTest} />;
    }
  };

  return (
    <main className="min-h-screen">
       <nav className="absolute top-0 left-0 right-0 p-4 flex justify-end gap-4">
        <button
          onClick={() => setScreen('start')}
          className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          title="Início"
        >
          <HomeIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Início</span>
        </button>
        <button
          onClick={() => setScreen('profile')}
          className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          title="Perfil e Progresso"
        >
          <UserIcon className="w-5 h-5" />
           <span className="hidden sm:inline">Progresso</span>
        </button>
      </nav>
      {renderScreen()}
    </main>
  );
};

export default App;
