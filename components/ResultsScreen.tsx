
import React from 'react';
import { QuizResult, Question, QuestionTopic, UserAnswer } from '../types';
import { CheckCircleIcon, XCircleIcon } from './Icons';

interface ResultsScreenProps {
  result: QuizResult;
  onRestartSameTest: () => void;
  onStartNewTest: () => void;
}

const getStudyTips = (incorrectAnswers: { question: Question; userAnswer: string }[]): string[] => {
    const topicCount: { [key in QuestionTopic]?: number } = {};
    incorrectAnswers.forEach(({ question }) => {
        topicCount[question.topic] = (topicCount[question.topic] || 0) + 1;
    });

    const sortedTopics = Object.entries(topicCount)
        .sort(([, a], [, b]) => b - a)
        .map(([topic]) => topic as QuestionTopic);

    if (sortedTopics.length === 0) return ["Excelente trabalho! Você acertou todas as questões."];
    
    const tips: string[] = [];
    tips.push("Com base nos seus resultados, foque seus estudos nas seguintes áreas:");
    
    sortedTopics.slice(0, 3).forEach(topic => {
        tips.push(`- **${topic}**: Revise as regras e melhores práticas relacionadas a este tópico.`);
    });
    
    return tips;
};


const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, onRestartSameTest, onStartNewTest }) => {
  const { score, totalQuestions, questions, answers } = result;
  const percentage = (score / totalQuestions) * 100;

  const getQuestionById = (id: number): Question | undefined => questions.find(q => q.id === id);
  const getUserAnswerForQuestion = (id: number): UserAnswer | undefined => answers.find(a => a.questionId === id);

  const incorrectAnswers = questions
    .map(q => {
      const userAnswer = getUserAnswerForQuestion(q.id)?.answer;
      return { question: q, userAnswer, isCorrect: userAnswer === q.correctAnswer };
    })
    .filter(item => !item.isCorrect && item.userAnswer)
    .map(item => ({ question: item.question, userAnswer: item.userAnswer! }));


  const studyTips = getStudyTips(incorrectAnswers);

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="text-center bg-slate-800 p-8 rounded-xl shadow-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">Teste Concluído!</h1>
        <p className="text-slate-300 text-lg mb-6">Sua Pontuação Final:</p>
        <div className={`text-6xl font-extrabold mb-4 ${percentage >= 70 ? 'text-green-400' : 'text-red-400'}`}>
          {percentage.toFixed(2)}%
        </div>
        <p className="text-2xl text-slate-200">
          Você acertou <span className="font-bold text-white">{score}</span> de <span className="font-bold text-white">{totalQuestions}</span> questões.
        </p>
      </div>

      <div className="bg-slate-800 p-8 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Recomendações de Estudo</h2>
        <ul className="list-none space-y-2 text-slate-300">
          {studyTips.map((tip, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: tip.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </ul>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <button onClick={onRestartSameTest} className="w-full md:w-auto bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          Repetir Teste
        </button>
        <button onClick={onStartNewTest} className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          Fazer Novo Teste
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-center">Resumo das Respostas</h2>
        <ul className="space-y-4">
          {questions.map((question) => {
            const userAnswer = getUserAnswerForQuestion(question.id);
            const isCorrect = userAnswer?.answer === question.correctAnswer;
            return (
              <li key={question.id} className={`p-4 rounded-lg ${isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                <div className="flex items-start gap-4">
                    {isCorrect ? <CheckCircleIcon className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" /> : <XCircleIcon className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />}
                    <div>
                        <p className="font-semibold text-white">{question.question}</p>
                        {!isCorrect && (
                            <p className="text-sm mt-2">
                                <span className="font-bold text-red-300">Sua resposta: </span>
                                <span className="text-slate-300">{userAnswer?.answer || "Não respondeu"}</span>
                            </p>
                        )}
                        <p className="text-sm mt-1">
                            <span className="font-bold text-green-300">Resposta correta: </span>
                            <span className="text-slate-300">{question.correctAnswer}</span>
                        </p>
                    </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ResultsScreen;
