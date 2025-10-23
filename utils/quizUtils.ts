
import { Question } from '../types';

/**
 * Shuffles an array in place using the Fisher-Yates (aka Knuth) Shuffle algorithm.
 * @param array The array to shuffle.
 */
function shuffleArray<T,>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Selects a specified number of random questions from a question bank.
 * @param allQuestions The array of all available questions.
 * @param count The number of random questions to select.
 * @returns An array of randomly selected questions.
 */
export function selectRandomQuestions(allQuestions: Question[], count: number): Question[] {
  const shuffled = shuffleArray(allQuestions);
  return shuffled.slice(0, count);
}
