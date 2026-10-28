import { useAppState } from '../../state/AppStateContext';
import { useDesktopNotifications } from '../../hooks/useNotifications';
import type { SettingsState } from '../../types';

function NumberField({ label, value, onChange, min = 1, max = 180 }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number;
}) {
  return (
    <label className="field">
      {label}
      <input
        type="number" min={min} max={max} value={value}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
        }}
      />
    </label>
  );
}

function ToggleField({ label, hint, checked, onChange }: { label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="row-between settings-toggle">
      <span>
        <span style={{ display: 'block' }}>{label}</span>
        {hint && <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{hint}</span>}
      </span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}

export function SettingsPanel() {
  const { state, dispatch } = useAppState();
  const notifications = useDesktopNotifications();

  const update = (patch: Partial<SettingsState>) => dispatch({ type: 'SETTINGS_UPDATE', patch });

  return (
    <div className="settings-panel anim-fade-in">
      <h1 className="screen-title">Settings</h1>

      <section className="panel settings-section">
        <h2 className="screen-subtitle">Durations (minutes)</h2>
        <div className="wrap">
          <NumberField label="Focus" value={state.settings.focusMinutes} onChange={(v) => update({ focusMinutes: v })} max={120} />
          <NumberField label="Short break" value={state.settings.shortBreakMinutes} onChange={(v) => update({ shortBreakMinutes: v })} max={60} />
          <NumberField label="Long break" value={state.settings.longBreakMinutes} onChange={(v) => update({ longBreakMinutes: v })} max={60} />
          <NumberField label="Sessions before long break" value={state.settings.sessionsBeforeLongBreak} onChange={(v) => update({ sessionsBeforeLongBreak: v })} min={2} max={10} />
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Changes apply to the next phase that hasn&apos;t started yet — an active session keeps running on its original duration.</p>
      </section>

      <section className="panel settings-section">
        <h2 className="screen-subtitle">Automation</h2>
        <ToggleField label="Auto-start breaks" hint="Start the break the moment a focus session ends." checked={state.settings.autoStartBreaks} onChange={(v) => update({ autoStartBreaks: v })} />
        <ToggleField label="Auto-start next focus session" hint="Start focusing again the moment a break ends." checked={state.settings.autoStartNextFocus} onChange={(v) => update({ autoStartNextFocus: v })} />
      </section>

      <section className="panel settings-section">
        <h2 className="screen-subtitle">Notifications</h2>
        <ToggleField label="Sound on completion" hint="A short chime when a session or break ends." checked={state.settings.soundEnabled} onChange={(v) => update({ soundEnabled: v })} />
        <ToggleField
          label="Desktop notifications"
          hint={notifications.supported ? `Browser permission: ${notifications.permission}` : 'Not supported in this browser'}
          checked={state.settings.desktopNotificationsEnabled && notifications.permission === 'granted'}
          onChange={async (v) => {
            if (v && notifications.permission !== 'granted') {
              const result = await notifications.requestPermission();
              update({ desktopNotificationsEnabled: result === 'granted' });
            } else {
              update({ desktopNotificationsEnabled: v });
            }
          }}
        />
      </section>

      <section className="panel settings-section">
        <h2 className="screen-subtitle">Goals &amp; display</h2>
        <NumberField label="Daily session goal" value={state.settings.dailyGoalSessions} onChange={(v) => update({ dailyGoalSessions: v })} min={1} max={30} />
        <label className="field" style={{ marginTop: 10 }}>
          Motion
          <select
            value={state.settings.reducedMotionOverride === null ? 'system' : state.settings.reducedMotionOverride ? 'reduced' : 'full'}
            onChange={(e) => {
              const v = e.target.value;
              update({ reducedMotionOverride: v === 'system' ? null : v === 'reduced' });
            }}
          >
            <option value="system">Follow system setting</option>
            <option value="full">Full animation</option>
            <option value="reduced">Reduced motion</option>
          </select>
        </label>
      </section>

      <section className="panel settings-section">
        <h2 className="screen-subtitle">Ambient sound</h2>
        <ToggleField label="Enable ambient sound" hint="Off by default. Procedurally generated — no files to load." checked={state.ambient.enabled} onChange={(v) => dispatch({ type: 'AMBIENT_UPDATE', patch: { enabled: v } })} />
        <label className="field">
          Volume
          <input
            type="range" min={0} max={1} step={0.05} value={state.ambient.volume}
            onChange={(e) => dispatch({ type: 'AMBIENT_UPDATE', patch: { volume: Number(e.target.value) } })}
          />
        </label>
      </section>
    </div>
  );
}
