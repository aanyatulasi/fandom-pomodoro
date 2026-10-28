import { useAppState } from '../../state/AppStateContext';
import { LOCATIONS } from '../../data/locations';
import { SceneForId } from '../Scenes/SceneRegistry';
import type { LocationInfo, PJLocationId, HPLocationId } from '../../types';

function LocationCard({ loc, locked, active, onSelect, onTakeQuiz }: {
  loc: LocationInfo; locked: boolean; active: boolean; onSelect: () => void; onTakeQuiz?: () => void;
}) {
  return (
    <button
      type="button"
      className={`location-card ${active ? 'active' : ''} ${locked ? 'locked' : ''}`}
      onClick={locked ? onTakeQuiz : onSelect}
    >
      <div className="location-card-scene"><SceneForId sceneId={loc.sceneId} /></div>
      <div className="location-card-overlay" />
      {locked && (
        <div className="location-card-lock">
          <span>🔒 Take the quiz to unlock</span>
        </div>
      )}
      <div className="location-card-content">
        <h3>{loc.name}</h3>
        <p>{loc.tagline}</p>
      </div>
      {active && <span className="location-card-badge">Current</span>}
    </button>
  );
}

export function LocationPicker({ onDone }: { onDone: () => void }) {
  const { state, dispatch } = useAppState();
  const isPJ = state.universe === 'percy-jackson';

  if (isPJ) {
    const campMain = LOCATIONS['camp-main'];
    const cabinId = state.godResult ? `cabin-${state.godResult}` : null;
    const cabin = cabinId ? LOCATIONS[cabinId] : null;

    return (
      <div className="location-picker anim-fade-in">
        <h1 className="screen-title">Choose your study spot</h1>
        <div className="location-grid location-grid-2">
          <LocationCard
            loc={campMain} locked={false} active={state.pjLocationId === 'camp-main'}
            onSelect={() => { dispatch({ type: 'SET_PJ_LOCATION', locationId: 'camp-main' }); onDone(); }}
          />
          {cabin ? (
            <LocationCard
              loc={cabin} locked={false} active={state.pjLocationId === cabinId}
              onSelect={() => { dispatch({ type: 'SET_PJ_LOCATION', locationId: cabinId as PJLocationId }); onDone(); }}
            />
          ) : (
            <div className="location-card locked">
              <div className="location-card-overlay" />
              <div className="location-card-content">
                <h3>Your Godly Parent&apos;s Cabin</h3>
                <p>Take the Godly Parent quiz to unlock your own cabin.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const commonRoomId = state.houseResult ? `common-${state.houseResult}` : null;
  const commonRoom = commonRoomId ? LOCATIONS[commonRoomId] : null;
  const exploreLocations = Object.values(LOCATIONS).filter((l) => l.universe === 'harry-potter' && l.group === 'explore');

  return (
    <div className="location-picker anim-fade-in">
      <h1 className="screen-title">Choose your study spot</h1>
      <h2 className="screen-subtitle">Your common room</h2>
      <div className="location-grid location-grid-2">
        {commonRoom ? (
          <LocationCard
            loc={commonRoom} locked={false} active={state.hpLocationId === commonRoomId}
            onSelect={() => { dispatch({ type: 'SET_HP_LOCATION', locationId: commonRoomId as HPLocationId }); onDone(); }}
          />
        ) : (
          <div className="location-card locked">
            <div className="location-card-overlay" />
            <div className="location-card-content">
              <h3>Your House Common Room</h3>
              <p>Take the Sorting quiz to unlock your common room.</p>
            </div>
          </div>
        )}
      </div>
      <h2 className="screen-subtitle">Or study somewhere else in Hogwarts</h2>
      <div className="location-grid location-grid-3">
        {exploreLocations.map((loc) => (
          <LocationCard
            key={loc.id} loc={loc} locked={false} active={state.hpLocationId === loc.id}
            onSelect={() => { dispatch({ type: 'SET_HP_LOCATION', locationId: loc.id as HPLocationId }); onDone(); }}
          />
        ))}
      </div>
    </div>
  );
}
