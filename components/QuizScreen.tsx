
import React, { useState } from 'react';
import { Question, UserAnswer } from '../types';

interface QuizScreenProps {
  questions: Question[];
  onQuizComplete: (answers: UserAnswer[]) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers, { questionId: currentQuestion.id, answer: selectedAnswer }];
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        onQuizComplete(newAnswers);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8">
        {/* Progress Bar and Counter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-cyan-400">Progresso</span>
            <span className="text-sm font-semibold text-slate-300">
              Questão {currentQuestionIndex + 1} de {questions.length}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div
              className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <p className="text-sm text-slate-400 mb-2">Tópico: {currentQuestion.topic}</p>
          <h2 className="text-xl md:text-2xl font-bold leading-tight text-white">{currentQuestion.question}</h2>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-4 mb-8">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === option
                  ? 'bg-cyan-500/20 border-cyan-500 ring-2 ring-cyan-500'
                  : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500'
              }`}
            >
              <span className="font-medium text-slate-100">{option}</span>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <div className="text-right">
          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-cyan-700 transition-colors shadow-md"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Teste'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
