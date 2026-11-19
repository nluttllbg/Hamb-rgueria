import Lenis from 'lenis';
import { ensureGsapRegistered, gsap, prefersReducedMotion, ScrollTrigger } from './gsap';

export function createSmoothScroll(): {
  lenis: Lenis | null;
  destroy: () => void;
} {
  if (typeof window === 'undefined') {
    return { lenis: null, destroy: () => {} };
  }

  ensureGsapRegistered();

  if (prefersReducedMotion()) {
    return { lenis: null, destroy: () => {} };
  }

  const lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const tick = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return {
    lenis,
    destroy: () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    },
  };
}
