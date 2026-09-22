import { useEffect } from 'react';

/**
 * Locks vertical body scroll while `active` is true (e.g. the project modal or the
 * mobile menu is open) and keeps horizontal overflow hidden the rest of the time.
 *
 * @param {boolean} active
 */
export function useBodyScrollLock(active) {
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.overflowX = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);
}
