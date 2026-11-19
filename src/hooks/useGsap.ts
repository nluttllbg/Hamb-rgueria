import { useEffect, type DependencyList, type RefObject } from 'react';
import { ensureGsapRegistered, gsap, prefersReducedMotion } from '../lib/gsap';

export function useGsap(
  effect: (ctx: { reducedMotion: boolean }) => void | (() => void),
  scopeRef?: RefObject<HTMLElement | null>,
  deps: DependencyList = []
) {
  useEffect(() => {
    ensureGsapRegistered();
    const reducedMotion = prefersReducedMotion();
    const scope = scopeRef?.current ?? undefined;
    let customCleanup: void | (() => void);

    const ctx = gsap.context(() => {
      customCleanup = effect({ reducedMotion });
    }, scope);

    return () => {
      if (typeof customCleanup === 'function') {
        customCleanup();
      }
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
