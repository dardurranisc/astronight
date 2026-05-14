import { useSyncExternalStore } from 'react';

const useMatchMedia = (width: string) => {
  const subscribe = (callback: () => void) => {
    const mediaQuery = window.matchMedia(`(max-width:${width})`);

    mediaQuery.addEventListener('change', callback);

    return () => mediaQuery.removeEventListener('change', callback);
  };

  const getSnapshot = () => window.matchMedia(`(max-width:${width})`).matches;

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export default useMatchMedia;
