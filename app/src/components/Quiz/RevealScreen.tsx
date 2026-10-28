import type { CSSProperties } from 'react';
import type { GodId, HouseId } from '../../types';
import { GODS } from '../../data/gods';
import { HOUSES } from '../../data/houses';
import { GOD_GLYPH, HOUSE_GLYPH } from '../../data/glyphs';
import { Glyph } from '../Scenes/Glyph';

export function RevealScreen({ result, isPJ, onContinue, onRetake }: {
  result: GodId | HouseId; isPJ: boolean; onContinue: () => void; onRetake: () => void;
}) {
  const info = isPJ ? GODS[result as GodId] : HOUSES[result as HouseId];
  const glyphName = isPJ ? GOD_GLYPH[result as GodId] : HOUSE_GLYPH[result as HouseId];
  const traits = info.traits;

  return (
    <div className="reveal-screen anim-fade-in">
      <div className="panel panel-strong reveal-card anim-pop-in">
        <p className="world-card-subtitle">{isPJ ? 'Claimed by' : 'Sorted into'}</p>
        <div className="reveal-emblem" style={{ '--glow': info.palette.glow, '--accent': info.palette.accent } as CSSProperties}>
          <svg viewBox="0 0 100 100" width={120} height={120}>
            <circle cx={50} cy={50} r={46} fill={info.palette.primary} opacity={0.5} />
            <circle cx={50} cy={50} r={38} fill={info.palette.secondary} opacity={0.6} />
            <Glyph name={glyphName} x={50} y={50} size={22} color={info.palette.accent} />
          </svg>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: info.palette.accent }}>
          {info.name}
        </h1>
        {isPJ && <p style={{ color: 'var(--text-secondary)' }}>{(info as typeof GODS[GodId]).title} · Cabin {(info as typeof GODS[GodId]).cabin}</p>}
        {!isPJ && <p style={{ color: 'var(--text-secondary)' }}>Founded by {(info as typeof HOUSES[HouseId]).founder} · {(info as typeof HOUSES[HouseId]).element}</p>}
        <p style={{ maxWidth: 460, color: 'var(--text-primary)' }}>{info.description}</p>
        <div className="wrap" style={{ justifyContent: 'center' }}>
          {traits.map((t) => <span key={t} className="trait-chip" style={{ borderColor: info.palette.accent }}>{t}</span>)}
        </div>
        <div className="row" style={{ marginTop: 6 }}>
          <button type="button" className="btn btn-primary" onClick={onContinue}>Choose your study location</button>
          <button type="button" className="btn btn-ghost" onClick={onRetake}>Retake quiz</button>
        </div>
      </div>
    </div>
  );
}
