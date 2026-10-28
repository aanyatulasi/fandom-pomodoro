import type { LocationInfo, CabinOccupantId, HouseId, AppState } from '../types';
import { HOUSE_ORDER, HOUSES } from './houses';
import { CABIN_RESIDENTS, CABIN_ORDER } from './cabinResidents';

const cabinAmbient: Record<CabinOccupantId, LocationInfo['ambientId']> = {
  poseidon: 'ocean', athena: 'library-hush', apollo: 'birdsong', ares: 'forge',
  aphrodite: 'wind', hermes: 'wind', hephaestus: 'forge', demeter: 'birdsong',
  zeus: 'night-crickets', hades: 'underwater', hecate: 'magic-shimmer',
  hera: null, artemis: 'night-crickets', dionysus: 'great-hall-murmur',
};

const cabinLocations: LocationInfo[] = CABIN_ORDER.map((god) => {
  const info = CABIN_RESIDENTS[god];
  return {
    id: `cabin-${god}` as const,
    universe: 'percy-jackson',
    name: `Cabin ${info.cabin} — ${info.name}`,
    tagline: info.domain,
    description: info.unclaimable
      ? info.description
      : `Your own corner of camp, built for a child of ${info.name}. ${info.description}`,
    sceneId: `pj-cabin-${god}`,
    ambientId: cabinAmbient[god] ?? null,
    group: 'cabins',
  };
});

const groundsLocations: LocationInfo[] = [
  {
    id: 'camp-main', universe: 'percy-jackson', name: 'Camp Half-Blood — Main Camp',
    tagline: 'The green, the cabins, the hill',
    description: 'The heart of camp: cabins ringing the central green, pine-covered Half-Blood Hill rising behind you, Long Island Sound glittering in the distance.',
    sceneId: 'pj-camp-main', ambientId: 'birdsong', group: 'grounds',
  },
  {
    id: 'strawberry-fields', universe: 'percy-jackson', name: 'The Strawberry Fields',
    tagline: 'Rows of fruit, warm sun',
    description: 'Rows of strawberry plants stretching toward the hills, fenced in and glowing in warm afternoon light — the Demeter cabin\'s pride and joy.',
    sceneId: 'pj-strawberry-fields', ambientId: 'birdsong', group: 'grounds',
  },
  {
    id: 'campfire-circle', universe: 'percy-jackson', name: 'The Campfire Circle',
    tagline: 'Firelight and log seats',
    description: 'A ring of worn log benches around a campfire that burns taller when the mood is good — cabins glowing faintly in the dark beyond.',
    sceneId: 'pj-campfire-circle', ambientId: 'fireplace', group: 'grounds',
  },
  {
    id: 'canoe-lake', universe: 'percy-jackson', name: 'The Canoe Lake',
    tagline: 'Still water, wooden canoes',
    description: 'A calm lake ringed with trees, a little dock, and a few canoes bobbing by the shore, sky mirrored on the surface.',
    sceneId: 'pj-canoe-lake', ambientId: 'ocean', group: 'grounds',
  },
  {
    id: 'climbing-wall', universe: 'percy-jackson', name: 'The Climbing Wall',
    tagline: 'Rock, lava, nerve',
    description: 'Camp\'s infamous lava wall — rough volcanic rock with molten rivulets threading down between the handholds.',
    sceneId: 'pj-climbing-wall', ambientId: 'forge', group: 'grounds',
  },
  {
    id: 'archery-range', universe: 'percy-jackson', name: 'The Archery Range',
    tagline: 'Targets, grass, bright sun',
    description: 'An open grassy field lined with straw-backed targets, bright and breezy — an Apollo-cabin favorite.',
    sceneId: 'pj-archery-range', ambientId: 'wind', group: 'grounds',
  },
  {
    id: 'arena', universe: 'percy-jackson', name: 'The Arena',
    tagline: 'Sand, weapons, dusty gold light',
    description: 'The sandy sparring arena ringed with stone columns and weapon racks — warm, dusty, and distinctly Greek.',
    sceneId: 'pj-arena', ambientId: 'wind', group: 'grounds',
  },
  {
    id: 'dining-pavilion', universe: 'percy-jackson', name: 'The Dining Pavilion',
    tagline: 'Open-air, columns, camp views',
    description: 'An open-air pavilion of white columns and long tables, looking out over the whole of camp.',
    sceneId: 'pj-dining-pavilion', ambientId: 'great-hall-murmur', group: 'grounds',
  },
];

const specialLocations: LocationInfo[] = [
  {
    id: 'big-house', universe: 'percy-jackson', name: 'The Big House',
    tagline: 'Blue farmhouse, wraparound porch',
    description: 'The camp\'s unmistakable sky-blue farmhouse, porch wrapped around three sides, attic (and a certain ping-pong table) tucked inside.',
    sceneId: 'pj-big-house', ambientId: 'birdsong', group: 'special',
  },
  {
    id: 'pine-tree-hill', universe: 'percy-jackson', name: 'Pine Tree Hill',
    tagline: 'Thalia\'s tree, the whole valley',
    description: 'The hill overlooking camp, crowned by a single tall pine with the faintest golden glint woven through its branches.',
    sceneId: 'pj-pine-tree-hill', ambientId: 'wind', group: 'special',
  },
  {
    id: 'forest', universe: 'percy-jackson', name: 'The Forest',
    tagline: 'Dense canopy, shafts of light',
    description: 'Camp\'s wilder, mysterious woods — dense canopy, shafts of sunlight, and the sense that something is always just out of sight.',
    sceneId: 'pj-forest', ambientId: 'night-crickets', group: 'special',
  },
  {
    id: 'beach', universe: 'percy-jackson', name: 'The Camp\'s Beach',
    tagline: 'Long Island Sound shoreline',
    description: 'A quiet stretch of shoreline on the Sound — gentle waves, warm sand, and an open view of the sky.',
    sceneId: 'pj-beach', ambientId: 'ocean', group: 'special',
  },
  {
    id: 'clifftop-overlook', universe: 'percy-jackson', name: 'The Clifftop Overlook',
    tagline: 'A sweeping sea horizon',
    description: 'A scenic rocky overlook above the water, with distant cliffs and a horizon that goes on forever.',
    sceneId: 'pj-clifftop-overlook', ambientId: 'wind', group: 'special',
  },
];

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
    ...groundsLocations,
    ...cabinLocations,
    ...specialLocations,
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
