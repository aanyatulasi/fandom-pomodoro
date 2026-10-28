import type { ReactNode, CSSProperties } from 'react';
import { useAppState } from '../../state/AppStateContext';
import { PJCampMain } from '../Scenes/scenes/PJCampMain';
import { HPCastleExterior } from '../Scenes/scenes/HPCastleExterior';
import type { Universe } from '../../types';

function WorldCard({ universe, title, subtitle, blurb, cta, scene, accent }: {
  universe: Universe; title: string; subtitle: string; blurb: string; cta: string;
  scene: ReactNode; accent: string;
}) {
  const { dispatch } = useAppState();
  return (
    <button
      type="button"
      className="world-card anim-fade-in"
      style={{ '--card-accent': accent } as CSSProperties}
      onClick={() => dispatch({ type: 'SET_UNIVERSE', universe })}
    >
      <div className="world-card-scene">{scene}</div>
      <div className="world-card-overlay" />
      <div className="world-card-content">
        <p className="world-card-subtitle">{subtitle}</p>
        <h2 className="world-card-title">{title}</h2>
        <p className="world-card-blurb">{blurb}</p>
        <span className="btn btn-primary world-card-cta">{cta}</span>
      </div>
    </button>
  );
}

export function UniversePicker() {
  return (
    <div className="landing">
      <div className="landing-heading anim-fade-in">
        <p className="landing-kicker">A study sanctuary for</p>
        <h1 className="landing-title">Two Worlds. One Timer.</h1>
        <p className="landing-sub">Choose where you&apos;ll study today — you can switch anytime.</p>
      </div>
      <div className="landing-cards">
        <WorldCard
          universe="percy-jackson"
          subtitle="Percy Jackson and the Olympians"
          title="Camp Half-Blood"
          blurb="Pine-covered hills, salt air off the Sound, and strawberry fields under a warm Long Island sun."
          cta="Enter Camp Half-Blood"
          scene={<PJCampMain />}
          accent="#e9c98a"
        />
        <WorldCard
          universe="harry-potter"
          subtitle="Harry Potter"
          title="Hogwarts"
          blurb="Candlelight, ancient stone, and a sky that never looks the same way twice."
          cta="Enter Hogwarts"
          scene={<HPCastleExterior />}
          accent="#d3a625"
        />
      </div>
    </div>
  );
}
