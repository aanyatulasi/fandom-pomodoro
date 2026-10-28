import { useState } from 'react';
import { useAppState } from '../../state/AppStateContext';
import { Modal } from '../common/Modal';
import { dateKey, lastNDays } from '../../utils/date';

export function StatsPanel() {
  const { state, dispatch } = useAppState();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const today = dateKey();
  const todayStats = state.stats.daily[today] ?? { focusSessions: 0, focusMinutes: 0 };
  const goal = state.settings.dailyGoalSessions;
  const goalProgress = goal > 0 ? Math.min(1, todayStats.focusSessions / goal) : 0;

  const days = lastNDays(7);
  const maxSessions = Math.max(1, ...days.map((d) => state.stats.daily[d]?.focusSessions ?? 0));

  const totalSessions = Object.values(state.stats.daily).reduce((sum, d) => sum + d.focusSessions, 0);
  const totalMinutes = Object.values(state.stats.daily).reduce((sum, d) => sum + d.focusMinutes, 0);

  return (
    <div className="stats-panel anim-fade-in">
      <h1 className="screen-title">Study statistics</h1>

      <div className="stats-grid">
        <div className="panel stat-card">
          <span className="stat-value">{todayStats.focusSessions}</span>
          <span className="stat-label">Sessions today</span>
        </div>
        <div className="panel stat-card">
          <span className="stat-value">{todayStats.focusMinutes}</span>
          <span className="stat-label">Focus minutes today</span>
        </div>
        <div className="panel stat-card">
          <span className="stat-value">{state.stats.currentStreak}</span>
          <span className="stat-label">Day streak</span>
        </div>
        <div className="panel stat-card">
          <span className="stat-value">{totalSessions}</span>
          <span className="stat-label">Lifetime sessions ({totalMinutes} min)</span>
        </div>
      </div>

      <div className="panel stats-goal">
        <div className="row-between">
          <span>Daily goal</span>
          <span>{todayStats.focusSessions} / {goal} sessions</span>
        </div>
        <div className="quiz-progress-track"><div className="quiz-progress-fill" style={{ width: `${goalProgress * 100}%` }} /></div>
      </div>

      <div className="panel stats-history">
        <h2 className="screen-subtitle">Last 7 days</h2>
        <div className="history-bars">
          {days.map((d) => {
            const sessions = state.stats.daily[d]?.focusSessions ?? 0;
            const h = sessions === 0 ? 3 : Math.max(8, (sessions / maxSessions) * 80);
            return (
              <div className="history-bar-col" key={d}>
                <div className="history-bar" style={{ height: `${h}px` }} title={`${sessions} sessions`} />
                <span className="history-bar-label">{d.slice(8)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <button type="button" className="btn btn-danger btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setConfirmOpen(true)}>
        Reset statistics
      </button>

      {confirmOpen && (
        <Modal title="Reset all statistics?" onClose={() => setConfirmOpen(false)}>
          <p style={{ color: 'var(--text-secondary)' }}>This permanently clears your session history, streak, and totals. Tasks and settings are not affected.</p>
          <div className="row">
            <button type="button" className="btn btn-danger" onClick={() => { dispatch({ type: 'STATS_RESET' }); setConfirmOpen(false); }}>Reset</button>
            <button type="button" className="btn btn-ghost" onClick={() => setConfirmOpen(false)}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
