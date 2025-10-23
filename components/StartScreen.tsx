
import React from 'react';

interface StartScreenProps {
  onStartQuiz: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartQuiz }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
          Teste de Preparação para Motorista TVDE
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-8">
          Avalie seus conhecimentos sobre as normas, técnicas e relações interpessoais essenciais para ser um motorista de excelência.
        </p>
        <button
          onClick={onStartQuiz}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xl py-4 px-10 rounded-full shadow-lg shadow-cyan-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Começar Novo Teste
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
