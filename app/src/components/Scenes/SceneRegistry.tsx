import type { GodId, HouseId } from '../../types';
import { PJCampMain } from './scenes/PJCampMain';
import { PJCabin } from './scenes/PJCabin';
import { HPCommonRoom } from './scenes/HPCommonRoom';
import { HPGreatHall } from './scenes/HPGreatHall';
import { HPLibrary } from './scenes/HPLibrary';
import { HPAstronomyTower } from './scenes/HPAstronomyTower';
import { HPRoomOfRequirement } from './scenes/HPRoomOfRequirement';
import { HPGreenhouse } from './scenes/HPGreenhouse';
import { HPBlackLake } from './scenes/HPBlackLake';

export function SceneForId({ sceneId }: { sceneId: string }) {
  if (sceneId === 'pj-camp-main') return <PJCampMain />;
  if (sceneId.startsWith('pj-cabin-')) return <PJCabin god={sceneId.replace('pj-cabin-', '') as GodId} />;
  if (sceneId.startsWith('hp-common-')) return <HPCommonRoom house={sceneId.replace('hp-common-', '') as HouseId} />;
  switch (sceneId) {
    case 'hp-great-hall': return <HPGreatHall />;
    case 'hp-library': return <HPLibrary />;
    case 'hp-astronomy-tower': return <HPAstronomyTower />;
    case 'hp-room-of-requirement': return <HPRoomOfRequirement />;
    case 'hp-greenhouse': return <HPGreenhouse />;
    case 'hp-black-lake': return <HPBlackLake />;
    default: return <PJCampMain />;
  }
}
