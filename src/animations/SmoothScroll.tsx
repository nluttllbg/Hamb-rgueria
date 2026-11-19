import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type Lenis from 'lenis';
import { createSmoothScroll } from '../lib/lenis';
import { ensureGsapRegistered, ScrollTrigger } from '../lib/gsap';

interface SmoothScrollContextValue {
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  lockScroll: () => void;
  unlockScroll: () => void;
  isReady: boolean;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
  lockScroll: () => {},
  unlockScroll: () => {},
  isReady: false,
});

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    ensureGsapRegistered();
    const { lenis, destroy } = createSmoothScroll();
    lenisRef.current = lenis;
    setIsReady(true);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    // Refresh ScrollTrigger once fonts & images finish initial layout
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, offset = -72) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1.05 });
        return;
      }

      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior: 'auto' });
        }
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'auto' });
      }
    },
    []
  );

  const lockScroll = useCallback(() => {
    lenisRef.current?.stop();
    document.body.style.overflow = 'hidden';
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    lenisRef.current?.start();
  }, []);

  return (
    <SmoothScrollContext.Provider
      value={{ scrollTo, lockScroll, unlockScroll, isReady }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
