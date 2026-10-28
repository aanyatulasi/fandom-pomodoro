import { useAppState } from '../../state/AppStateContext';
import { LOCATIONS } from '../../data/locations';
import { LazyScene } from '../Scenes/LazyScene';
import { getThemePalette } from '../../theme';
import type { LocationInfo, PJLocationId, HPLocationId, CabinOccupantId } from '../../types';

function LocationCard({ loc, locked, active, mine, onSelect, onTakeQuiz, placeholderColor }: {
  loc: LocationInfo; locked: boolean; active: boolean; mine?: boolean;
  onSelect: () => void; onTakeQuiz?: () => void; placeholderColor?: string;
}) {
  return (
    <button
      type="button"
      className={`location-card ${active ? 'active' : ''} ${locked ? 'locked' : ''}`}
      onClick={locked ? onTakeQuiz : onSelect}
    >
      <div className="location-card-scene"><LazyScene sceneId={loc.sceneId} placeholderColor={placeholderColor} /></div>
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
      {!active && mine && <span className="location-card-badge location-card-badge-mine">Yours</span>}
    </button>
  );
}

export function LocationPicker({ onDone }: { onDone: () => void }) {
  const { state, dispatch } = useAppState();
  const isPJ = state.universe === 'percy-jackson';
  const palette = getThemePalette(state);

  if (isPJ) {
    const grounds = Object.values(LOCATIONS).filter((l) => l.universe === 'percy-jackson' && l.group === 'grounds');
    const cabins = Object.values(LOCATIONS).filter((l) => l.universe === 'percy-jackson' && l.group === 'cabins');
    const special = Object.values(LOCATIONS).filter((l) => l.universe === 'percy-jackson' && l.group === 'special');

    const select = (id: PJLocationId) => { dispatch({ type: 'SET_PJ_LOCATION', locationId: id }); onDone(); };

    return (
      <div className="location-picker anim-fade-in">
        <h1 className="screen-title">Choose your study spot</h1>
        <p className="location-picker-intro">
          Camp is yours to explore — every cabin and corner is open, whether or not it&apos;s the one you were claimed by.
        </p>

        <h2 className="screen-subtitle">The main camp grounds</h2>
        <div className="location-grid location-grid-3">
          {grounds.map((loc) => (
            <LocationCard
              key={loc.id} loc={loc} locked={false} active={state.pjLocationId === loc.id}
              onSelect={() => select(loc.id as PJLocationId)} placeholderColor={palette.primary}
            />
          ))}
        </div>

        <h2 className="screen-subtitle">The cabins</h2>
        <div className="location-grid location-grid-3">
          {cabins.map((loc) => {
            const godId = loc.id.replace('cabin-', '') as CabinOccupantId;
            return (
              <LocationCard
                key={loc.id} loc={loc} locked={false} active={state.pjLocationId === loc.id}
                mine={state.godResult === godId} onSelect={() => select(loc.id as PJLocationId)}
                placeholderColor={palette.primary}
              />
            );
          })}
        </div>

        <h2 className="screen-subtitle">Special &amp; atmospheric locations</h2>
        <div className="location-grid location-grid-3">
          {special.map((loc) => (
            <LocationCard
              key={loc.id} loc={loc} locked={false} active={state.pjLocationId === loc.id}
              onSelect={() => select(loc.id as PJLocationId)} placeholderColor={palette.primary}
            />
          ))}
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
            placeholderColor={palette.primary}
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
            placeholderColor={palette.primary}
          />
        ))}
      </div>
    </div>
  );
}
