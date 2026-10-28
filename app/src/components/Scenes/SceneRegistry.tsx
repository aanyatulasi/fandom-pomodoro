import type { CabinOccupantId, HouseId } from '../../types';
import { PJCampMain } from './scenes/PJCampMain';
import { PJCabin } from './scenes/PJCabin';
import { PJStrawberryFields } from './scenes/PJStrawberryFields';
import { PJCampfireCircle } from './scenes/PJCampfireCircle';
import { PJCanoeLake } from './scenes/PJCanoeLake';
import { PJClimbingWall } from './scenes/PJClimbingWall';
import { PJArcheryRange } from './scenes/PJArcheryRange';
import { PJArena } from './scenes/PJArena';
import { PJDiningPavilion } from './scenes/PJDiningPavilion';
import { PJBigHouse } from './scenes/PJBigHouse';
import { PJPineTreeHill } from './scenes/PJPineTreeHill';
import { PJForest } from './scenes/PJForest';
import { PJBeach } from './scenes/PJBeach';
import { PJClifftopOverlook } from './scenes/PJClifftopOverlook';
import { HPCommonRoom } from './scenes/HPCommonRoom';
import { HPGreatHall } from './scenes/HPGreatHall';
import { HPLibrary } from './scenes/HPLibrary';
import { HPAstronomyTower } from './scenes/HPAstronomyTower';
import { HPRoomOfRequirement } from './scenes/HPRoomOfRequirement';
import { HPGreenhouse } from './scenes/HPGreenhouse';
import { HPBlackLake } from './scenes/HPBlackLake';
import { PhotoScene } from './PhotoScene';
import { LOCATION_PHOTOS } from '../../data/locationPhotos';
import { GOD_GLYPH, HOUSE_GLYPH } from '../../data/glyphs';
import { CABIN_RESIDENTS } from '../../data/cabinResidents';
import { HOUSES } from '../../data/houses';
import { Glyph } from './Glyph';
import { Stars, Candles, VB_W } from './primitives';

function sceneOverlay(sceneId: string) {
  if (sceneId.startsWith('pj-cabin-')) {
    const god = sceneId.replace('pj-cabin-', '') as CabinOccupantId;
    const info = CABIN_RESIDENTS[god];
    return <Glyph name={GOD_GLYPH[god]} x={VB_W - 16} y={12} size={9} color={info.palette.accent} opacity={0.85} />;
  }
  if (sceneId.startsWith('hp-common-')) {
    const house = sceneId.replace('hp-common-', '') as HouseId;
    const info = HOUSES[house];
    return <Glyph name={HOUSE_GLYPH[house]} x={VB_W - 16} y={12} size={9} color={info.palette.accent} opacity={0.85} />;
  }
  if (sceneId === 'pj-campfire-circle' || sceneId === 'pj-pine-tree-hill' || sceneId === 'hp-astronomy-tower' || sceneId === 'hp-black-lake') {
    return <Stars count={22} seed={sceneId.length} yMax={30} opacity={0.5} />;
  }
  if (sceneId === 'hp-great-hall' || sceneId === 'hp-room-of-requirement') {
    return <Candles count={8} yRange={[8, 22]} seed={sceneId.length} />;
  }
  return undefined;
}

export function SceneForId({ sceneId }: { sceneId: string }) {
  const photo = LOCATION_PHOTOS[sceneId];
  if (photo) {
    return <PhotoScene src={photo.src} objectPosition={photo.objectPosition} overlay={sceneOverlay(sceneId)} />;
  }

  if (sceneId.startsWith('pj-cabin-')) return <PJCabin god={sceneId.replace('pj-cabin-', '') as CabinOccupantId} />;
  if (sceneId.startsWith('hp-common-')) return <HPCommonRoom house={sceneId.replace('hp-common-', '') as HouseId} />;
  switch (sceneId) {
    case 'pj-camp-main': return <PJCampMain />;
    case 'pj-strawberry-fields': return <PJStrawberryFields />;
    case 'pj-campfire-circle': return <PJCampfireCircle />;
    case 'pj-canoe-lake': return <PJCanoeLake />;
    case 'pj-climbing-wall': return <PJClimbingWall />;
    case 'pj-archery-range': return <PJArcheryRange />;
    case 'pj-arena': return <PJArena />;
    case 'pj-dining-pavilion': return <PJDiningPavilion />;
    case 'pj-big-house': return <PJBigHouse />;
    case 'pj-pine-tree-hill': return <PJPineTreeHill />;
    case 'pj-forest': return <PJForest />;
    case 'pj-beach': return <PJBeach />;
    case 'pj-clifftop-overlook': return <PJClifftopOverlook />;
    case 'hp-great-hall': return <HPGreatHall />;
    case 'hp-library': return <HPLibrary />;
    case 'hp-astronomy-tower': return <HPAstronomyTower />;
    case 'hp-room-of-requirement': return <HPRoomOfRequirement />;
    case 'hp-greenhouse': return <HPGreenhouse />;
    case 'hp-black-lake': return <HPBlackLake />;
    default: return <PJCampMain />;
  }
}
