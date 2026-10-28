import type { HouseId, QuizQuestion } from '../types';
import { HOUSE_ORDER } from './houses';

export const SORTING_QUIZ: QuizQuestion<HouseId>[] = [
  {
    id: 'value', prompt: 'Which matters most to you, really?',
    options: [
      { text: 'Being brave.', weights: { gryffindor: 2 } },
      { text: 'Being clever.', weights: { ravenclaw: 2 } },
      { text: 'Being loyal.', weights: { hufflepuff: 2 } },
      { text: 'Being ambitious.', weights: { slytherin: 2 } },
    ],
  },
  {
    id: 'late-night', prompt: 'It\'s past curfew. What are you actually doing?',
    options: [
      { text: 'Sneaking out to explore somewhere forbidden.', weights: { gryffindor: 2, slytherin: 1 } },
      { text: 'Reading a book you\'re not supposed to have.', weights: { ravenclaw: 2, slytherin: 1 } },
      { text: 'Sitting up with a friend who can\'t sleep.', weights: { hufflepuff: 2, gryffindor: 1 } },
      { text: 'Quietly planning tomorrow\'s advantage.', weights: { slytherin: 2, ravenclaw: 1 } },
    ],
  },
  {
    id: 'locked-door', prompt: 'A locked door is blocking your way forward.',
    options: [
      { text: 'Force it open.', weights: { gryffindor: 2 } },
      { text: 'Study the lock until you understand it.', weights: { ravenclaw: 2 } },
      { text: 'Find another way through for everyone.', weights: { hufflepuff: 2 } },
      { text: 'Find whoever has the key and make a deal.', weights: { slytherin: 2 } },
    ],
  },
  {
    id: 'fear', prompt: 'What scares you most, if you\'re honest?',
    options: [
      { text: 'Being a coward when it counts.', weights: { gryffindor: 2 } },
      { text: 'Being wrong about something important.', weights: { ravenclaw: 2 } },
      { text: 'Betraying someone who trusted you.', weights: { hufflepuff: 2 } },
      { text: 'Being powerless, with no way out.', weights: { slytherin: 2 } },
    ],
  },
  {
    id: 'core-value', prompt: 'Pick the value you\'d defend hardest.',
    options: [
      { text: 'Courage.', weights: { gryffindor: 2 } },
      { text: 'Wisdom.', weights: { ravenclaw: 2 } },
      { text: 'Fairness.', weights: { hufflepuff: 2 } },
      { text: 'Ambition.', weights: { slytherin: 2 } },
    ],
  },
  {
    id: 'cheating', prompt: 'A classmate cheats, and it quietly benefits you too. You...',
    options: [
      { text: 'Call it out immediately, whatever it costs you.', weights: { gryffindor: 2 } },
      { text: 'Report it — it\'s simply the correct thing to do.', weights: { ravenclaw: 2 } },
      { text: 'Feel guilty and confess your part.', weights: { hufflepuff: 2 } },
      { text: 'Stay quiet. It worked out, didn\'t it?', weights: { slytherin: 2 } },
    ],
  },
  {
    id: 'description', prompt: 'People who know you would call you...',
    options: [
      { text: 'Daring.', weights: { gryffindor: 2 } },
      { text: 'Perceptive.', weights: { ravenclaw: 2 } },
      { text: 'Dependable.', weights: { hufflepuff: 2 } },
      { text: 'Shrewd.', weights: { slytherin: 2 } },
    ],
  },
  {
    id: 'free-afternoon', prompt: 'A completely free afternoon. You spend it...',
    options: [
      { text: 'Trying something a little too risky for fun.', weights: { gryffindor: 2 } },
      { text: 'Researching something obscure, for no reason.', weights: { ravenclaw: 2 } },
      { text: 'Tending to something that needs care.', weights: { hufflepuff: 2 } },
      { text: 'Quietly networking toward your next move.', weights: { slytherin: 2 } },
    ],
  },
  {
    id: 'motivator', prompt: 'Your biggest real motivator is...',
    options: [
      { text: 'Proving yourself.', weights: { gryffindor: 2, slytherin: 1 } },
      { text: 'Understanding the truth of things.', weights: { ravenclaw: 2 } },
      { text: 'Not letting people down.', weights: { hufflepuff: 2 } },
      { text: 'Getting ahead.', weights: { slytherin: 2 } },
    ],
  },
  {
    id: 'remembered', prompt: 'How do you want to be remembered, years from now?',
    options: [
      { text: 'As someone who never backed down.', weights: { gryffindor: 2 } },
      { text: 'As someone who was almost always right.', weights: { ravenclaw: 2 } },
      { text: 'As someone who was always there.', weights: { hufflepuff: 2 } },
      { text: 'As someone who won.', weights: { slytherin: 2 } },
    ],
  },
  {
    id: 'hat-whisper', prompt: 'The Sorting Hat is about to decide. What are you silently hoping it says?',
    options: [
      { text: 'Gryffindor.', weights: { gryffindor: 2 } },
      { text: 'Ravenclaw.', weights: { ravenclaw: 2 } },
      { text: 'Hufflepuff.', weights: { hufflepuff: 2 } },
      { text: 'Slytherin.', weights: { slytherin: 2 } },
    ],
  },
];

export function scoreSortingQuiz(answers: number[]): HouseId {
  const scores: Record<HouseId, number> = Object.fromEntries(HOUSE_ORDER.map((h) => [h, 0])) as Record<HouseId, number>;
  answers.forEach((optionIndex, qIndex) => {
    const option = SORTING_QUIZ[qIndex]?.options[optionIndex];
    if (!option) return;
    for (const [house, weight] of Object.entries(option.weights)) {
      scores[house as HouseId] += weight ?? 0;
    }
  });
  let best: HouseId = HOUSE_ORDER[0];
  for (const house of HOUSE_ORDER) {
    if (scores[house] > scores[best]) best = house;
  }
  return best;
}
