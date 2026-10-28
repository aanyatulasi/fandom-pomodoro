import type { AppState, Universe } from './types';
import { GODS } from './data/gods';
import { HOUSES } from './data/houses';

export const UNIVERSE_PALETTE: Record<Universe, { primary: string; secondary: string; accent: string; glow: string }> = {
  'percy-jackson': { primary: '#1a6b8a', secondary: '#d4860a', accent: '#e9c98a', glow: '#ffe9a8' },
  'harry-potter': { primary: '#2b2140', secondary: '#740001', accent: '#d3a625', glow: '#f0c75e' },
};

export function getThemePalette(state: AppState) {
  if (state.universe === 'percy-jackson' && state.godResult) return GODS[state.godResult].palette;
  if (state.universe === 'harry-potter' && state.houseResult) return HOUSES[state.houseResult].palette;
  if (state.universe) return UNIVERSE_PALETTE[state.universe];
  return UNIVERSE_PALETTE['percy-jackson'];
}

export const UNIVERSE_COPY: Record<Universe, {
  worldName: string; homeName: string; quizCta: string; quizNoun: string; switchTo: string;
}> = {
  'percy-jackson': {
    worldName: 'Camp Half-Blood', homeName: 'Camp', quizCta: 'Discover Your Godly Parent',
    quizNoun: 'godly parent', switchTo: 'Hogwarts',
  },
  'harry-potter': {
    worldName: 'Hogwarts', homeName: 'Hogwarts', quizCta: 'Discover Your House',
    quizNoun: 'house', switchTo: 'Camp Half-Blood',
  },
};
