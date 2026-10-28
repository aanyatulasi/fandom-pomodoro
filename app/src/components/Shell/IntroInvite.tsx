import { useAppState } from '../../state/AppStateContext';
import { UNIVERSE_COPY } from '../../theme';

export function IntroInvite({ onTakeQuiz, onSkip }: { onTakeQuiz: () => void; onSkip: () => void }) {
  const { state } = useAppState();
  const universe = state.universe ?? 'percy-jackson';
  const copy = UNIVERSE_COPY[universe];
  const isPJ = universe === 'percy-jackson';

  return (
    <div className="intro-invite anim-fade-in">
      <div className="panel panel-strong intro-card">
        <p className="world-card-subtitle">Welcome to {copy.worldName}</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>
          {isPJ ? 'Who claimed you?' : 'Which house is yours?'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 480 }}>
          {isPJ
            ? 'Take a short quiz to discover your godly parent, your cabin, and a touch of personality woven through the whole camp experience. Or skip ahead and dive straight into studying.'
            : 'Take the Sorting Ceremony quiz to discover your house, your common room, and a few personal touches throughout the castle. Or skip ahead and dive straight into studying.'}
        </p>
        <div className="row" style={{ marginTop: 10 }}>
          <button type="button" className="btn btn-primary" onClick={onTakeQuiz}>{copy.quizCta}</button>
          <button type="button" className="btn btn-ghost" onClick={onSkip}>Skip for now</button>
        </div>
      </div>
    </div>
  );
}
