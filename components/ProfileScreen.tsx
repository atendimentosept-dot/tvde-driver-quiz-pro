
import React from 'react';
import { UserProfile, QuizResult } from '../types';
import { ChartBarIcon } from './Icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const ProfileScreen: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  const chartData = profile.quizHistory.map((result, index) => ({
    name: `Teste ${index + 1}`,
    Pontuação: (result.score / result.totalQuestions) * 100,
    date: new Date(result.date).toLocaleDateString('pt-PT'),
  })).slice(-10); // Show last 10 tests

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <ChartBarIcon className="w-10 h-10 text-cyan-400" />
        <h1 className="text-3xl md:text-4xl font-bold text-white">Seu Progresso</h1>
      </div>

      {profile.quizHistory.length === 0 ? (
        <div className="text-center p-10 bg-slate-800 rounded-lg shadow-lg">
          <p className="text-slate-400">Você ainda não completou nenhum teste. Comece um agora para ver seu progresso aqui!</p>
        </div>
      ) : (
        <>
          <div className="mb-10 bg-slate-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-cyan-300">Pontuações Recentes</h2>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" unit="%" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                            labelStyle={{ color: '#cbd5e1' }}
                            formatter={(value: number, name: string) => [`${value.toFixed(2)}%`, name]}
                        />
                        <Legend />
                        <Bar dataKey="Pontuação" fill="#22d3ee" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
            <h2 className="text-xl font-semibold p-4 text-cyan-300 border-b border-slate-700">Histórico de Testes</h2>
            <ul className="divide-y divide-slate-700">
              {profile.quizHistory.slice().reverse().map((result, index) => (
                <li key={index} className="p-4 flex justify-between items-center hover:bg-slate-700/50 transition-colors">
                  <div>
                    <p className="font-bold text-lg">
                      Teste #{profile.quizHistory.length - index}
                    </p>
                    <p className="text-sm text-slate-400">
                      {new Date(result.date).toLocaleString('pt-PT')}
                    </p>
                  </div>
                  <div className={`font-bold text-xl px-4 py-2 rounded-md ${
                    (result.score / result.totalQuestions) >= 0.7 ? 'text-green-300 bg-green-500/10' : 'text-red-300 bg-red-500/10'
                  }`}>
                    {((result.score / result.totalQuestions) * 100).toFixed(2)}%
                    <span className="text-sm font-normal ml-2 text-slate-300">({result.score}/{result.totalQuestions})</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
