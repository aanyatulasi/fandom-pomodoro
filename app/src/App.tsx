import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useAppState } from './state/AppStateContext';
import { ToastProvider, useToast } from './components/common/Toast';
import { UniversePicker } from './components/Landing/UniversePicker';
import { Sidebar } from './components/Shell/Sidebar';
import { IntroInvite } from './components/Shell/IntroInvite';
import { QuizFlow } from './components/Quiz/QuizFlow';
import { LocationPicker } from './components/Locations/LocationPicker';
import { TimerScreen } from './components/Timer/TimerScreen';
import { TasksPanel } from './components/Tasks/TasksPanel';
import { StatsPanel } from './components/Stats/StatsPanel';
import { SettingsPanel } from './components/Settings/SettingsPanel';
import { SceneForId } from './components/Scenes/SceneRegistry';
import { Icon } from './components/common/Icon';
import { getThemePalette, UNIVERSE_COPY } from './theme';
import { usePrefersReducedMotion } from './hooks/useMediaQuery';
import { getCurrentLocation } from './data/locations';
import { useTimerEngine } from './hooks/useTimerEngine';
import { useTabTitle } from './hooks/useTabTitle';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useAmbientSound } from './hooks/useAmbientSound';
import { useDesktopNotifications } from './hooks/useNotifications';
import { playChime } from './utils/chime';

export type View = 'intro' | 'timer' | 'quiz' | 'location' | 'tasks' | 'stats' | 'settings';

function AppShellContent() {
  const { state, dispatch } = useAppState();
  const { show } = useToast();
  const notifications = useDesktopNotifications();
  const [view, setView] = useState<View>('intro');
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastUniverse = useRef<string | null>(null);
  const reducedMotionSystem = usePrefersReducedMotion();

  const hasResult = state.universe === 'percy-jackson' ? !!state.godResult : !!state.houseResult;

  useEffect(() => {
    if (lastUniverse.current !== state.universe) {
      lastUniverse.current = state.universe;
      setView(hasResult ? 'timer' : 'intro');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.universe]);

  // Timer runtime lives at the shell level (not inside TimerScreen) so it keeps
  // running — and the tab title / keyboard shortcuts / ambience keep working —
  // no matter which screen (Settings, Tasks, Stats…) is currently shown.
  const handlePhaseComplete = useCallback(() => {
    dispatch({ type: 'TIMER_PHASE_COMPLETE' });
  }, [dispatch]);
  const engine = useTimerEngine(handlePhaseComplete);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (state.timer.lastCompletedPhase) {
      const was = state.timer.lastCompletedPhase;
      if (was === 'focus') {
        show('Focus session complete — nice work. 🌿');
        notifications.notify('Focus session complete', 'Time for a break.');
      } else {
        show('Break\'s over — back to it.');
        notifications.notify('Break\'s over', 'Ready for your next focus session.');
      }
      if (state.settings.soundEnabled) playChime(0.5);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.timer.completionEventId]);

  useTabTitle(state.timer.phase, engine.remaining, engine.isRunning);
  useKeyboardShortcuts({
    onToggleRun: () => dispatch({ type: 'TIMER_TOGGLE_RUN' }),
    onReset: () => dispatch({ type: 'TIMER_RESET' }),
  });
  useAmbientSound(getCurrentLocation(state).ambientId, state.ambient.enabled, state.ambient.volume);

  const reducedMotion = state.settings.reducedMotionOverride ?? reducedMotionSystem;
  const palette = getThemePalette(state);
  const copy = UNIVERSE_COPY[state.universe ?? 'percy-jackson'];
  const sceneId = getCurrentLocation(state).sceneId;

  const themeVars = useMemo(() => ({
    '--accent-primary': palette.primary,
    '--accent-secondary': palette.secondary,
    '--accent-accent': palette.accent,
    '--accent-glow': palette.glow,
  } as CSSProperties), [palette]);

  return (
    <div
      className={`app-root ${reducedMotion ? 'reduce-motion' : ''}`}
      data-universe={state.universe ?? undefined}
      style={themeVars}
    >
      <div className="scene-layer">
        <SceneForId key={sceneId} sceneId={sceneId} />
        <div className="scene-overlay" />
      </div>

      {!state.distractionFree && (
        <div className="app-content">
          <Sidebar view={view} setView={setView} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
          <div className="main-column">
            <div className="topbar mobile-topbar">
              <button type="button" className="btn btn-icon btn-ghost panel" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                <Icon name="menu" />
              </button>
              <span style={{ fontFamily: 'var(--font-display)' }}>{copy.worldName}</span>
              <span style={{ width: 40 }} />
            </div>

            {view === 'intro' && <IntroInvite onTakeQuiz={() => setView('quiz')} onSkip={() => setView('timer')} />}
            {view === 'quiz' && <QuizFlow onDone={() => setView('location')} />}
            {view === 'location' && <LocationPicker onDone={() => setView('timer')} />}
            {view === 'timer' && <TimerScreen engine={engine} onOpenTasks={() => setView('tasks')} onOpenQuiz={() => setView('quiz')} onOpenLocation={() => setView('location')} />}
            {view === 'tasks' && <TasksPanel />}
            {view === 'stats' && <StatsPanel />}
            {view === 'settings' && <SettingsPanel />}
          </div>
        </div>
      )}

      {state.distractionFree && <DistractionFreeExit />}
      {state.distractionFree && (
        <div className="app-content">
          <div className="main-column" style={{ width: '100%' }}>
            <TimerScreen engine={engine} onOpenTasks={() => {}} onOpenQuiz={() => {}} onOpenLocation={() => {}} minimal />
          </div>
        </div>
      )}
    </div>
  );
}

function DistractionFreeExit() {
  const { dispatch } = useAppState();
  return (
    <button
      type="button"
      className="btn btn-icon btn-ghost panel"
      style={{ position: 'fixed', top: 18, right: 18, zIndex: 5 }}
      onClick={() => dispatch({ type: 'TOGGLE_DISTRACTION_FREE' })}
      aria-label="Exit distraction-free mode"
      title="Exit distraction-free mode"
    >
      <Icon name="close" />
    </button>
  );
}

export default function App() {
  const { state } = useAppState();
  if (!state.universe) {
    return (
      <ToastProvider>
        <UniversePicker />
      </ToastProvider>
    );
  }
  return (
    <ToastProvider>
      <AppShellContent />
    </ToastProvider>
  );
}
