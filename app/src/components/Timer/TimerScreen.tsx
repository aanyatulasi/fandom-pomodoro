import { useAppState } from '../../state/AppStateContext';
import type { TimerEngine } from '../../hooks/useTimerEngine';
import { formatClock } from '../../utils/time';
import { getCurrentLocation } from '../../data/locations';
import { ProgressRing } from './ProgressRing';
import { TimerControls } from './TimerControls';
import { TaskWidget } from './TaskWidget';
import { Icon } from '../common/Icon';

const PHASE_COPY: Record<string, { label: string; hint: string }> = {
  idle: { label: 'Ready to focus', hint: 'Press Start when you\'re ready.' },
  focus: { label: 'Focus session', hint: 'Deep work — you\'ve got this.' },
  short_break: { label: 'Short break', hint: 'Stretch, breathe, look away from the screen.' },
  long_break: { label: 'Long break', hint: 'You\'ve earned a real rest.' },
};

export function TimerScreen({ engine, onOpenTasks, onOpenQuiz, onOpenLocation, minimal = false }: {
  engine: TimerEngine; onOpenTasks: () => void; onOpenQuiz: () => void; onOpenLocation: () => void; minimal?: boolean;
}) {
  const { state, dispatch } = useAppState();
  const location = getCurrentLocation(state);

  const phaseCopy = PHASE_COPY[state.timer.phase] ?? PHASE_COPY.idle;
  const sessionsBeforeLong = state.settings.sessionsBeforeLongBreak;

  return (
    <div className="timer-screen anim-fade-in">
      {!minimal && (
        <div className="timer-screen-header row-between">
          <div>
            <p className="world-card-subtitle">{location.name}</p>
            <h1 className="screen-title">{phaseCopy.label}</h1>
          </div>
          <button type="button" className="btn btn-ghost panel btn-sm" onClick={onOpenLocation}>
            <Icon name="map" size={16} /> Change location
          </button>
        </div>
      )}

      <div className="timer-core">
        <div className="timer-ring-wrap">
          <ProgressRing progress={engine.progress} color="var(--accent-accent)" />
          <div className="timer-readout">
            <span className="timer-clock">{formatClock(engine.remaining)}</span>
            <span className="timer-phase-hint">{phaseCopy.hint}</span>
          </div>
        </div>

        <TimerControls
          isRunning={engine.isRunning}
          onToggleRun={() => dispatch({ type: 'TIMER_TOGGLE_RUN' })}
          onReset={() => dispatch({ type: 'TIMER_RESET' })}
          onSkip={() => dispatch({ type: 'TIMER_SKIP' })}
        />

        <div className="cycle-dots" aria-label={`Session ${state.timer.cyclePosition + 1} of ${sessionsBeforeLong} before a long break`}>
          {Array.from({ length: sessionsBeforeLong }).map((_, i) => (
            <span key={i} className={`cycle-dot ${i < state.timer.cyclePosition ? 'filled' : ''} ${i === state.timer.cyclePosition && state.timer.phase === 'focus' ? 'current' : ''}`} />
          ))}
        </div>

        <TaskWidget onOpenTasks={onOpenTasks} />
      </div>

      {!minimal && !state.godResult && state.universe === 'percy-jackson' && (
        <button type="button" className="btn btn-ghost panel quiz-nudge" onClick={onOpenQuiz}>
          <Icon name="sparkles" size={16} /> Discover your godly parent
        </button>
      )}
      {!minimal && !state.houseResult && state.universe === 'harry-potter' && (
        <button type="button" className="btn btn-ghost panel quiz-nudge" onClick={onOpenQuiz}>
          <Icon name="sparkles" size={16} /> Take the Sorting quiz
        </button>
      )}
    </div>
  );
}
