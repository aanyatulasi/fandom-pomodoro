import { useState } from 'react';
import { useAppState } from '../../state/AppStateContext';
import { Icon } from '../common/Icon';

function TaskRow({ id }: { id: string }) {
  const { state, dispatch } = useAppState();
  const task = state.tasks.find((t) => t.id === id)!;
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const isActive = state.timer.activeTaskId === id;

  const save = () => {
    if (title.trim()) dispatch({ type: 'TASK_EDIT', id, title: title.trim() });
    setEditing(false);
  };

  return (
    <li className={`task-row ${task.completed ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
      <button type="button" className="task-row-check" onClick={() => dispatch({ type: 'TASK_TOGGLE', id })} aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}>
        {task.completed ? <Icon name="check" size={16} /> : null}
      </button>
      {editing ? (
        <input
          type="text" autoFocus value={title} onChange={(e) => setTitle(e.target.value)}
          onBlur={save} onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') { setTitle(task.title); setEditing(false); } }}
          style={{ flex: 1 }}
        />
      ) : (
        <span className="task-row-title" onDoubleClick={() => setEditing(true)}>{task.title}</span>
      )}
      <span className="task-row-meta">{task.focusSessionsSpent > 0 ? `${task.focusSessionsSpent} 🍅` : ''}</span>
      {!task.completed && (
        <button
          type="button" className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => dispatch({ type: 'TIMER_SET_ACTIVE_TASK', taskId: isActive ? null : id })}
        >
          {isActive ? 'Focusing' : 'Focus on this'}
        </button>
      )}
      <button type="button" className="btn btn-icon btn-ghost btn-sm" onClick={() => setEditing(true)} aria-label="Edit task"><Icon name="edit" size={15} /></button>
      <button type="button" className="btn btn-icon btn-ghost btn-sm" onClick={() => dispatch({ type: 'TASK_DELETE', id })} aria-label="Delete task"><Icon name="trash" size={15} /></button>
    </li>
  );
}

export function TasksPanel() {
  const { state, dispatch } = useAppState();
  const [title, setTitle] = useState('');

  const add = () => {
    if (title.trim()) dispatch({ type: 'TASK_ADD', title });
    setTitle('');
  };

  const openTasks = state.tasks.filter((t) => !t.completed);
  const doneTasks = state.tasks.filter((t) => t.completed);

  return (
    <div className="tasks-panel anim-fade-in panel panel-strong">
      <h1 className="screen-title">Tasks</h1>
      <div className="row" style={{ marginTop: 10 }}>
        <input
          type="text" placeholder="What are you working on?" value={title}
          onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()}
          style={{ flex: 1 }}
        />
        <button type="button" className="btn btn-primary" onClick={add}><Icon name="plus" size={16} /> Add</button>
      </div>

      {openTasks.length === 0 && doneTasks.length === 0 && (
        <p style={{ color: 'var(--text-muted)', marginTop: 16 }}>No tasks yet — add one to link it to your next focus session.</p>
      )}

      {openTasks.length > 0 && (
        <ul className="task-list">{openTasks.map((t) => <TaskRow key={t.id} id={t.id} />)}</ul>
      )}
      {doneTasks.length > 0 && (
        <>
          <h2 className="screen-subtitle" style={{ marginTop: 14 }}>Completed</h2>
          <ul className="task-list">{doneTasks.map((t) => <TaskRow key={t.id} id={t.id} />)}</ul>
        </>
      )}
    </div>
  );
}
