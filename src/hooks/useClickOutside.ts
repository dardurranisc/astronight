import { useEffect, useRef } from 'react';

const useClickOutside = (isOpen: boolean, onClose: () => void) => {
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (refContainer.current && !refContainer.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return refContainer;
};

export default useClickOutside;
