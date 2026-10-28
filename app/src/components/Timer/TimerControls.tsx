import { Icon } from '../common/Icon';

export function TimerControls({ isRunning, onToggleRun, onReset, onSkip }: {
  isRunning: boolean; onToggleRun: () => void; onReset: () => void; onSkip: () => void;
}) {
  return (
    <div className="timer-controls">
      <button type="button" className="btn btn-icon btn-ghost panel" onClick={onReset} aria-label="Reset session" title="Reset (R)">
        <Icon name="reset" />
      </button>
      <button type="button" className="btn btn-primary timer-controls-main" onClick={onToggleRun} aria-label={isRunning ? 'Pause' : 'Start'} title="Start / pause (Space)">
        <Icon name={isRunning ? 'pause' : 'play'} size={22} />
        <span>{isRunning ? 'Pause' : 'Start'}</span>
      </button>
      <button type="button" className="btn btn-icon btn-ghost panel" onClick={onSkip} aria-label="Skip session" title="Skip">
        <Icon name="skip" />
      </button>
    </div>
  );
}
