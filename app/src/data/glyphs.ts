import type { CabinOccupantId, HouseId } from '../types';
import type { GlyphName } from '../components/Scenes/Glyph';

export const GOD_GLYPH: Record<CabinOccupantId, GlyphName> = {
  poseidon: 'trident', athena: 'owl', apollo: 'lyre', ares: 'spear', aphrodite: 'dove',
  hermes: 'caduceus', hephaestus: 'hammer', demeter: 'wheat', zeus: 'bolt', hades: 'helm', hecate: 'torches',
  hera: 'peacock', artemis: 'bow', dionysus: 'grapes',
};

export const HOUSE_GLYPH: Record<HouseId, GlyphName> = {
  gryffindor: 'lion', slytherin: 'serpent', ravenclaw: 'eagle', hufflepuff: 'badger',
};
