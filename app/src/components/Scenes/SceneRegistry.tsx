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

export function SceneForId({ sceneId }: { sceneId: string }) {
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
