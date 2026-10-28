import type { GodId, QuizQuestion } from '../types';
import { GOD_ORDER } from './gods';

// Deterministic weighted quiz: every option contributes integer weight to 1-2
// candidate gods. Final result = highest total; ties break by GOD_ORDER (fixed,
// canonical) so the outcome is always a pure function of the answers.
export const GODLY_PARENT_QUIZ: QuizQuestion<GodId>[] = [
  {
    id: 'crisis', prompt: 'A huge problem lands on your group with no warning. What\'s your first move?',
    options: [
      { text: 'Charge in and handle it myself.', weights: { ares: 2, zeus: 1 } },
      { text: 'Make a real plan before anyone moves.', weights: { athena: 2, hecate: 1 } },
      { text: 'Check who\'s scared or upset first.', weights: { aphrodite: 2, demeter: 1 } },
      { text: 'Improvise — we\'ll figure it out as we go.', weights: { hermes: 2, apollo: 1 } },
    ],
  },
  {
    id: 'weekend', prompt: 'Your ideal free afternoon looks like...',
    options: [
      { text: 'By the water, doing nothing in particular.', weights: { poseidon: 2, hades: 1 } },
      { text: 'Building or fixing something with my hands.', weights: { hephaestus: 2, demeter: 1 } },
      { text: 'Performing, creating, being seen.', weights: { apollo: 2, aphrodite: 1 } },
      { text: 'Somewhere quiet, reading something strange.', weights: { hecate: 2, athena: 1 } },
    ],
  },
  {
    id: 'argument', prompt: 'How do you handle an argument with someone close to you?',
    options: [
      { text: 'Say exactly what I think, right away.', weights: { ares: 2, zeus: 1 } },
      { text: 'I need space before I can talk calmly.', weights: { hades: 2, poseidon: 1 } },
      { text: 'Try to understand their side before mine.', weights: { demeter: 2, aphrodite: 1 } },
      { text: 'Talk it out until we reach a deal.', weights: { hermes: 2, athena: 1 } },
    ],
  },
  {
    id: 'reputation', prompt: 'People who know you well would call you...',
    options: [
      { text: 'The dependable one.', weights: { demeter: 2, hephaestus: 1 } },
      { text: 'The funny one.', weights: { apollo: 2, hermes: 1 } },
      { text: 'The one with a plan.', weights: { athena: 2, zeus: 1 } },
      { text: 'The intense one.', weights: { ares: 2, hades: 1 } },
    ],
  },
  {
    id: 'strength', prompt: 'What\'s your biggest strength?',
    options: [
      { text: 'I don\'t give up on people.', weights: { poseidon: 2, demeter: 1 } },
      { text: 'I notice things other people miss.', weights: { hecate: 2, athena: 1 } },
      { text: 'I can talk to absolutely anyone.', weights: { aphrodite: 2, hermes: 1 } },
      { text: 'I outwork everyone around me.', weights: { hephaestus: 2, ares: 1 } },
    ],
  },
  {
    id: 'bravery', prompt: 'What does being brave actually mean to you?',
    options: [
      { text: 'Standing your ground even outnumbered.', weights: { ares: 2, zeus: 1 } },
      { text: 'Doing the right thing even unseen.', weights: { hades: 2, demeter: 1 } },
      { text: 'Saying how you really feel, out loud.', weights: { aphrodite: 2, apollo: 1 } },
      { text: 'Trying something you might actually fail at.', weights: { hermes: 2, hephaestus: 1 } },
    ],
  },
  {
    id: 'friend-spiral', prompt: 'A friend is spiraling the night before a huge test. You...',
    options: [
      { text: 'Help them build an actual study plan.', weights: { athena: 2, hecate: 1 } },
      { text: 'Distract them — make them laugh first.', weights: { apollo: 2, hermes: 1 } },
      { text: 'Just sit with them so they\'re not alone.', weights: { demeter: 2, poseidon: 1 } },
      { text: 'Tell them bluntly they\'ve got this, now go.', weights: { ares: 2, zeus: 1 } },
    ],
  },
  {
    id: 'compliment', prompt: 'Which compliment means the most, honestly?',
    options: [
      { text: '"You always know what to say."', weights: { aphrodite: 2, apollo: 1 } },
      { text: '"You\'re the smartest person I know."', weights: { athena: 2, hecate: 1 } },
      { text: '"I trust you completely."', weights: { poseidon: 2, zeus: 1 } },
      { text: '"You never half-ass anything."', weights: { hephaestus: 2, demeter: 1 } },
    ],
  },
  {
    id: 'group-role', prompt: 'Your usual role in a group project?',
    options: [
      { text: 'I take charge and assign the work.', weights: { zeus: 2, athena: 1 } },
      { text: 'I do the actual building or making.', weights: { hephaestus: 2, ares: 1 } },
      { text: 'I keep everyone actually talking to each other.', weights: { hermes: 2, aphrodite: 1 } },
      { text: 'I quietly do my part, and do it well.', weights: { demeter: 2, poseidon: 1 } },
    ],
  },
  {
    id: 'rules', prompt: 'What\'s your real relationship with rules?',
    options: [
      { text: 'I respect them, mostly.', weights: { zeus: 2, demeter: 1 } },
      { text: 'I follow the spirit, not the letter.', weights: { hermes: 2, hecate: 1 } },
      { text: 'I make exceptions for people I love.', weights: { poseidon: 2, aphrodite: 1 } },
      { text: 'I rewrite them if they\'re dumb.', weights: { athena: 2, ares: 1 } },
    ],
  },
  {
    id: 'hard-feeling', prompt: 'Which feeling is hardest for you to shake off?',
    options: [
      { text: 'Being underestimated.', weights: { hephaestus: 2, hades: 1 } },
      { text: 'Being misunderstood.', weights: { hades: 2, hecate: 1 } },
      { text: 'Being powerless to help someone.', weights: { poseidon: 2, demeter: 1 } },
      { text: 'Losing control of a situation.', weights: { zeus: 2, ares: 1 } },
    ],
  },
];

export function scoreGodlyParentQuiz(answers: number[]): GodId {
  const scores: Record<GodId, number> = Object.fromEntries(GOD_ORDER.map((g) => [g, 0])) as Record<GodId, number>;
  answers.forEach((optionIndex, qIndex) => {
    const option = GODLY_PARENT_QUIZ[qIndex]?.options[optionIndex];
    if (!option) return;
    for (const [god, weight] of Object.entries(option.weights)) {
      scores[god as GodId] += weight ?? 0;
    }
  });
  let best: GodId = GOD_ORDER[0];
  for (const god of GOD_ORDER) {
    if (scores[god] > scores[best]) best = god;
  }
  return best;
}
