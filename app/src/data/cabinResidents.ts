import type { CabinOccupantId, GodInfo } from '../types';
import { GODS } from './gods';

/** Deities with a cabin at camp who are never a quiz outcome: Hera and
 * Artemis have no mortal demigod children, and Dionysus is the camp
 * director (only Pollux, his one demigod son, actually lives there). */
const UNCLAIMABLE: Record<'hera' | 'artemis' | 'dionysus', GodInfo> = {
  hera: {
    id: 'hera', name: 'Hera', title: 'Queen of the Gods', cabin: 2,
    domain: 'Marriage, family, loyalty', symbol: 'peacock',
    description: 'Hera has no demigod children, so her cabin sits immaculate and almost always empty — a cool, formal shrine kept pristine out of respect rather than lived in.',
    traits: ['Immaculate', 'Formal', 'Rarely visited'],
    palette: { primary: '#2d2a4a', secondary: '#8a7fc9', accent: '#e8d9ff', glow: '#f3e9ff' },
    unclaimable: true,
  },
  artemis: {
    id: 'artemis', name: 'Artemis', title: 'Goddess of the Hunt', cabin: 8,
    domain: 'The hunt, the moon, wilderness', symbol: 'bow',
    description: 'Eternally a maiden, Artemis has no demigod children either — her cabin stands silver and quiet, used only when the Hunters of Artemis pass through camp.',
    traits: ['Silver-quiet', 'Wild', 'Seasonal'],
    palette: { primary: '#1a2438', secondary: '#7a93b8', accent: '#d8e6f5', glow: '#eef6ff' },
    unclaimable: true,
  },
  dionysus: {
    id: 'dionysus', name: 'Dionysus', title: 'God of Wine & Theatre', cabin: 12,
    domain: 'Wine, theatre, madness', symbol: 'grapes',
    description: 'Mr. D\'s cabin is draped in vines and worn theatre masks — mostly his own quarters as camp director, though his son Pollux calls it home too.',
    traits: ['Eccentric', 'Theatrical', 'Grape-draped'],
    palette: { primary: '#3d1f4a', secondary: '#7a2e6b', accent: '#c98ed6', glow: '#f0c9ff' },
    unclaimable: true,
  },
};

export const CABIN_RESIDENTS: Record<CabinOccupantId, GodInfo> = { ...GODS, ...UNCLAIMABLE };

/** Canonical cabin-number order (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, …, 20). */
export const CABIN_ORDER: CabinOccupantId[] = [
  'zeus', 'hera', 'poseidon', 'demeter', 'ares', 'athena', 'apollo', 'artemis',
  'hephaestus', 'aphrodite', 'hermes', 'dionysus', 'hades', 'hecate',
];
