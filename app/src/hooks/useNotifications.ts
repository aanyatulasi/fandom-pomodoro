import { useCallback, useState } from 'react';

export function useDesktopNotifications() {
  const supported = typeof window !== 'undefined' && 'Notification' in window;
  const [permission, setPermission] = useState<NotificationPermission>(
    supported ? Notification.permission : 'denied',
  );

  const requestPermission = useCallback(async () => {
    if (!supported) return 'denied' as NotificationPermission;
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch {
      return 'denied' as NotificationPermission;
    }
  }, [supported]);

  const notify = useCallback((title: string, body: string) => {
    if (!supported || permission !== 'granted') return;
    try {
      new Notification(title, { body, silent: true });
    } catch {
      // some browsers throw if called outside a user gesture context in edge cases — safe to ignore
    }
  }, [supported, permission]);

  return { supported, permission, requestPermission, notify };
}
