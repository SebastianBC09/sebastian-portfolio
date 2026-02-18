'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fires once when the target element enters the viewport.
 * Disconnects the observer after the first intersection to avoid
 * redundant callbacks — ideal for scroll-triggered reveal animations.
 *
 * @param threshold - Fraction of the element that must be visible (0–1)
 * @returns [ref, isVisible] tuple to attach to the target element
 */
export function useInView<T extends Element = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}
