
const PATHS: Record<string, string> = {
  home: 'M3 11.5 12 4l9 7.5 M5 10v10h14V10',
  sparkles: 'M12 3v4M12 17v4M4 12h4M16 12h4M6.5 6.5 9 9M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5',
  map: 'M9 3 4 5v16l5-2 6 2 5-2V3l-5 2-6-2Z M9 3v16M15 5v16',
  tasks: 'M4 6h2M4 12h2M4 18h2M9 6h11M9 12h11M9 18h11',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  gear: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M19.4 13a7.6 7.6 0 0 0 .1-2l2-1.5-2-3.5-2.4 1a7.6 7.6 0 0 0-1.7-1L15 3h-6l-.4 2.5a7.6 7.6 0 0 0-1.7 1l-2.4-1-2 3.5 2 1.5a7.6 7.6 0 0 0 0 2l-2 1.5 2 3.5 2.4-1a7.6 7.6 0 0 0 1.7 1L9 21h6l.4-2.5a7.6 7.6 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5Z',
  swap: 'M17 3 21 7l-4 4M3 7h18M7 21 3 17l4-4M21 17H3',
  menu: 'M3 6h18M3 12h18M3 18h18',
  close: 'M5 5l14 14M19 5 5 19',
  play: 'M6 4.5v15l13-7.5Z',
  pause: 'M6 5h4v14H6ZM14 5h4v14h-4Z',
  reset: 'M3 11a9 9 0 1 1 2.6 6.3M3 11V5M3 11h6',
  skip: 'M5 5v14l10-7Zm12-0 v14 M17 5v14',
  moon: 'M20 14.5A8.5 8.5 0 1 1 9.5 4 7 7 0 0 0 20 14.5Z',
  volume: 'M4 9v6h4l5 4V5l-5 4Zm12-2a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14',
  mute: 'M4 9v6h4l5 4V5l-5 4Zm11 2 4 4m0-4-4 4',
  plus: 'M12 5v14M5 12h14',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',
  edit: 'M4 20h4L19.5 8.5a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 16v4Z',
  check: 'M4 12l5 5L20 6',
  chevronDown: 'M6 9l6 6 6-6',
  chevronRight: 'M9 6l6 6-6 6',
  flame: 'M12 3c2 3-3 5-3 9a3 3 0 0 0 6 0c0-1-0.5-1.5-1-2 0 2-2 2-2 0 0-2 2-3 2-5 1 1 3 3 3 6a5 5 0 0 1-10 0c0-5 3-6 5-8Z',
  target: 'M12 2v4M12 18v4M2 12h4M18 12h4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
};

export function Icon({ name, size = 18, className, strokeWidth = 1.8 }: { name: keyof typeof PATHS | string; size?: number; className?: string; strokeWidth?: number }) {
  const d = PATHS[name] ?? PATHS.sparkles;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
