import { useState } from 'react';
import { useAppState } from '../../state/AppStateContext';

export function TaskWidget({ onOpenTasks }: { onOpenTasks: () => void }) {
  const { state, dispatch } = useAppState();
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const activeTask = state.tasks.find((t) => t.id === state.timer.activeTaskId) ?? null;
  const openTasks = state.tasks.filter((t) => !t.completed);

  const submitAdd = () => {
    if (title.trim()) {
      dispatch({ type: 'TASK_ADD', title });
      setTitle('');
    }
    setAdding(false);
  };

  return (
    <div className="task-widget panel" role="group" aria-label="Current task">
      {activeTask ? (
        <div className="row-between">
          <span className="task-widget-label">Focusing on <strong>{activeTask.title}</strong></span>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => dispatch({ type: 'TIMER_SET_ACTIVE_TASK', taskId: null })}>Clear</button>
        </div>
      ) : (
        <div className="row-between">
          <span className="task-widget-label" style={{ color: 'var(--text-muted)' }}>No task selected</span>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onOpenTasks}>Manage tasks</button>
        </div>
      )}

      {openTasks.length > 0 && (
        <div className="task-widget-quickpick">
          {openTasks.slice(0, 4).map((t) => (
            <button
              key={t.id}
              type="button"
              className={`task-chip ${t.id === activeTask?.id ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'TIMER_SET_ACTIVE_TASK', taskId: t.id })}
            >
              {t.title}
            </button>
          ))}
        </div>
      )}

      {adding ? (
        <div className="row" style={{ marginTop: 6 }}>
          <input
            type="text" autoFocus value={title} placeholder="New task…"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submitAdd(); if (e.key === 'Escape') setAdding(false); }}
          />
          <button type="button" className="btn btn-primary btn-sm" onClick={submitAdd}>Add</button>
        </div>
      ) : (
        <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: 6, alignSelf: 'flex-start' }} onClick={() => setAdding(true)}>
          + Add a task
        </button>
      )}
    </div>
  );
}
