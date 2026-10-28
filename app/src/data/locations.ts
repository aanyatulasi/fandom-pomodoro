import type { LocationInfo, GodId, HouseId, AppState } from '../types';
import { GOD_ORDER, GODS } from './gods';
import { HOUSE_ORDER, HOUSES } from './houses';

const godAmbient: Record<GodId, LocationInfo['ambientId']> = {
  poseidon: 'ocean', athena: 'library-hush', apollo: 'birdsong', ares: 'forge',
  aphrodite: 'wind', hermes: 'wind', hephaestus: 'forge', demeter: 'birdsong',
  zeus: 'night-crickets', hades: 'underwater', hecate: 'magic-shimmer',
};

const godCabinLocations: LocationInfo[] = GOD_ORDER.map((god) => ({
  id: `cabin-${god}` as const,
  universe: 'percy-jackson',
  name: `Cabin ${GODS[god].cabin} — ${GODS[god].name}`,
  tagline: GODS[god].domain,
  description: `Your own corner of camp, built for a child of ${GODS[god].name}. ${GODS[god].description}`,
  sceneId: `pj-cabin-${god}`,
  ambientId: godAmbient[god] ?? 'wind',
  requires: { god },
  group: 'personal',
}));

const houseAmbient: Record<HouseId, LocationInfo['ambientId']> = {
  gryffindor: 'fireplace', slytherin: 'underwater', ravenclaw: 'wind', hufflepuff: 'greenhouse-drip',
};

const houseCommonRooms: LocationInfo[] = HOUSE_ORDER.map((house) => ({
  id: `common-${house}` as const,
  universe: 'harry-potter',
  name: `${HOUSES[house].name} Common Room`,
  tagline: `${HOUSES[house].element} · ${HOUSES[house].animal}`,
  description: `The common room behind your house's door. ${HOUSES[house].description}`,
  sceneId: `hp-common-${house}`,
  ambientId: houseAmbient[house],
  requires: { house },
  group: 'personal',
}));

export const LOCATIONS: Record<string, LocationInfo> = Object.fromEntries(
  [
    {
      id: 'camp-main', universe: 'percy-jackson', name: 'Camp Half-Blood — Main Camp',
      tagline: 'The green, the cabins, the hill',
      description: 'The heart of camp: cabins ringing the central green, pine-covered Half-Blood Hill rising behind you, Long Island Sound glittering in the distance.',
      sceneId: 'pj-camp-main', ambientId: 'birdsong', group: 'home',
    },
    ...godCabinLocations,
    {
      id: 'great-hall', universe: 'harry-potter', name: 'The Great Hall',
      tagline: 'Floating candles, enchanted ceiling',
      description: 'Four long tables beneath a ceiling that shows the sky outside, lit by hundreds of drifting candles.',
      sceneId: 'hp-great-hall', ambientId: 'great-hall-murmur', group: 'explore',
    },
    ...houseCommonRooms,
    {
      id: 'library', universe: 'harry-potter', name: 'The Hogwarts Library',
      tagline: 'Towers of books, tall windows',
      description: 'Towering shelves, long wooden tables, and the particular quiet of a thousand years of parchment.',
      sceneId: 'hp-library', ambientId: 'library-hush', group: 'explore',
    },
    {
      id: 'astronomy-tower', universe: 'harry-potter', name: 'The Astronomy Tower',
      tagline: 'Starlight and open sky',
      description: 'The highest point in the castle, open to the night and the stars, with the grounds spread out below.',
      sceneId: 'hp-astronomy-tower', ambientId: 'night-crickets', group: 'explore',
    },
    {
      id: 'room-of-requirement', universe: 'harry-potter', name: 'The Room of Requirement',
      tagline: 'Exactly the study space you need',
      description: 'A room that becomes whatever you need it to be — tonight, a cosy maze of desks, lamps, and borrowed books.',
      sceneId: 'hp-room-of-requirement', ambientId: 'magic-shimmer', group: 'explore',
    },
    {
      id: 'greenhouse', universe: 'harry-potter', name: 'The Greenhouse',
      tagline: 'Glass, vines, warm daylight',
      description: 'Glass ceilings and climbing vines, warm and green and humming quietly with growing things.',
      sceneId: 'hp-greenhouse', ambientId: 'greenhouse-drip', group: 'explore',
    },
    {
      id: 'black-lake', universe: 'harry-potter', name: 'The Black Lake Shore',
      tagline: 'Mist, reflection, quiet water',
      description: 'The castle\'s towers reflected in still water, mist drifting low over the shore.',
      sceneId: 'hp-black-lake', ambientId: 'ocean', group: 'explore',
    },
  ].map((l) => [l.id, l as LocationInfo]),
);

export const PJ_LOCATION_IDS = Object.values(LOCATIONS).filter((l) => l.universe === 'percy-jackson').map((l) => l.id);
export const HP_LOCATION_IDS = Object.values(LOCATIONS).filter((l) => l.universe === 'harry-potter').map((l) => l.id);

export function getCurrentLocation(state: AppState): LocationInfo {
  if (state.universe === 'harry-potter') {
    return LOCATIONS[state.hpLocationId ?? 'great-hall'];
  }
  return LOCATIONS[state.pjLocationId ?? 'camp-main'];
}
