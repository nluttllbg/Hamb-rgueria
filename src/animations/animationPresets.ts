import { gsap, ScrollTrigger } from '../lib/gsap';

export const DEFAULT_EASE = 'power3.out';

export const animationPresets = {
  textReveal: (target: gsap.TweenTarget, vars?: gsap.TweenVars) =>
    gsap.fromTo(
      target,
      {
        yPercent: 18,
        opacity: 0,
        clipPath: 'inset(0% 0% 100% 0%)',
      },
      {
        yPercent: 0,
        opacity: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.72,
        ease: DEFAULT_EASE,
        clearProps: 'clipPath,transform',
        ...vars,
      }
    ),

  imageReveal: (target: gsap.TweenTarget, vars?: gsap.TweenVars) =>
    gsap.fromTo(
      target,
      {
        scale: 1.06,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.85,
        ease: DEFAULT_EASE,
        clearProps: 'transform',
        ...vars,
      }
    ),

  clipReveal: (target: gsap.TweenTarget, vars?: gsap.TweenVars) =>
    gsap.fromTo(
      target,
      {
        clipPath: 'inset(0% 0% 100% 0%)',
        opacity: 0,
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 0.75,
        ease: DEFAULT_EASE,
        clearProps: 'clipPath',
        ...vars,
      }
    ),

  fadeUp: (target: gsap.TweenTarget, vars?: gsap.TweenVars) =>
    gsap.fromTo(
      target,
      {
        y: 24,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: DEFAULT_EASE,
        clearProps: 'transform',
        ...vars,
      }
    ),

  fadeIn: (target: gsap.TweenTarget, vars?: gsap.TweenVars) =>
    gsap.fromTo(
      target,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        ease: DEFAULT_EASE,
        ...vars,
      }
    ),

  staggerReveal: (targets: gsap.TweenTarget, vars?: gsap.TweenVars) =>
    gsap.fromTo(
      targets,
      {
        y: 24,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.2,
        ease: DEFAULT_EASE,
        clearProps: 'transform',
        ...vars,
      }
    ),

  scaleReveal: (target: gsap.TweenTarget, vars?: gsap.TweenVars) =>
    gsap.fromTo(
      target,
      {
        scale: 0.94,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: DEFAULT_EASE,
        clearProps: 'transform',
        ...vars,
      }
    ),

  horizontalReveal: (target: gsap.TweenTarget, fromX = -32, vars?: gsap.TweenVars) =>
    gsap.fromTo(
      target,
      {
        x: fromX,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: DEFAULT_EASE,
        clearProps: 'transform',
        ...vars,
      }
    ),

  parallax: (target: gsap.TweenTarget, trigger: Element, yPercent = -8) =>
    gsap.to(target, {
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }),

  scrollPin: (
    trigger: Element,
    options?: {
      start?: string;
      end?: string;
      scrub?: number | boolean;
    }
  ) =>
    ScrollTrigger.create({
      trigger,
      start: options?.start ?? 'top 72px',
      end: options?.end ?? '+=360',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: options?.scrub ?? 0.6,
    }),

  menuTransition: (
    drawer: Element,
    items: gsap.TweenTarget,
    open: boolean,
    onComplete?: () => void
  ) => {
    const tl = gsap.timeline({ onComplete });
    if (open) {
      tl.set(drawer, { display: 'flex', pointerEvents: 'auto' })
        .fromTo(
          drawer,
          { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 0.42,
            ease: DEFAULT_EASE,
          }
        )
        .fromTo(
          items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.38,
            stagger: 0.06,
            ease: DEFAULT_EASE,
            clearProps: 'transform',
          },
          '-=0.22'
        );
    } else {
      tl.to(items, {
        y: -12,
        opacity: 0,
        duration: 0.2,
        stagger: 0.03,
        ease: 'power2.in',
      }).to(
        drawer,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(drawer, { display: 'none', pointerEvents: 'none' });
          },
        },
        '-=0.1'
      );
    }
    return tl;
  },

  buttonInteraction: (element: Element) => {
    const onEnter = () => {
      gsap.to(element, { y: -2, duration: 0.18, ease: DEFAULT_EASE });
    };
    const onLeave = () => {
      gsap.to(element, { y: 0, duration: 0.18, ease: DEFAULT_EASE });
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
      element.removeEventListener('mouseenter', onEnter);
      element.removeEventListener('mouseleave', onLeave);
    };
  },

  sectionTransition: (trigger: Element, targets: gsap.TweenTarget) =>
    gsap.fromTo(
      targets,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.2,
        ease: DEFAULT_EASE,
        clearProps: 'transform',
        scrollTrigger: {
          trigger,
          start: 'top 86%',
          once: true,
        },
      }
    ),
};
