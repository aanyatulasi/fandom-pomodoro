import { useAppState } from '../../state/AppStateContext';
import { UNIVERSE_COPY } from '../../theme';
import { Icon } from '../common/Icon';
import type { View } from '../../App';

interface SidebarProps {
  view: View;
  setView: (v: View) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const NAV: { view: View; icon: string; label: (worldName: string, quizCta: string) => string }[] = [
  { view: 'timer', icon: 'home', label: (w) => `${w}` },
  { view: 'quiz', icon: 'sparkles', label: (_w, q) => q },
  { view: 'location', icon: 'map', label: () => 'Change Study Location' },
  { view: 'tasks', icon: 'tasks', label: () => 'Tasks' },
  { view: 'stats', icon: 'chart', label: () => 'Study Statistics' },
  { view: 'settings', icon: 'gear', label: () => 'Settings' },
];

export function Sidebar({ view, setView, mobileOpen, onCloseMobile }: SidebarProps) {
  const { state, dispatch } = useAppState();
  const copy = UNIVERSE_COPY[state.universe ?? 'percy-jackson'];

  const go = (v: View) => { setView(v); onCloseMobile(); };

  return (
    <>
      {mobileOpen && <div className="sidebar-drawer-backdrop" onClick={onCloseMobile} />}
      <nav className={`sidebar panel ${mobileOpen ? 'open' : ''}`} aria-label="Main navigation">
        <div className="sidebar-brand">
          <Icon name="sparkles" />
          <span>{copy.worldName}</span>
        </div>
        <div className="sidebar-nav">
          {NAV.map((item) => (
            <button
              key={item.view}
              type="button"
              className={`sidebar-link ${view === item.view ? 'active' : ''}`}
              onClick={() => go(item.view)}
              aria-current={view === item.view}
            >
              <Icon name={item.icon} className="sidebar-icon" />
              <span>{item.label(copy.homeName, copy.quizCta)}</span>
            </button>
          ))}
        </div>
        <div className="sidebar-footer">
          <button type="button" className="sidebar-link" onClick={() => dispatch({ type: 'TOGGLE_DISTRACTION_FREE' })}>
            <Icon name="moon" className="sidebar-icon" />
            <span>{state.distractionFree ? 'Exit distraction-free' : 'Distraction-free mode'}</span>
          </button>
          <button
            type="button"
            className="sidebar-link"
            onClick={() => dispatch({ type: 'SET_UNIVERSE', universe: state.universe === 'percy-jackson' ? 'harry-potter' : 'percy-jackson' })}
          >
            <Icon name="swap" className="sidebar-icon" />
            <span>Switch to {copy.switchTo}</span>
          </button>
        </div>
      </nav>
    </>
  );
}
