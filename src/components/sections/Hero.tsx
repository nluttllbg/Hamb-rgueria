import { useRef } from 'react';
import { CaretDown, WhatsappLogo } from '@phosphor-icons/react';
import { assets, business } from '../../data/business';
import { useGsap } from '../../hooks/useGsap';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { Button } from '../ui/Button';
import { RatingBadge } from './RatingBadge';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useGsap(
    ({ reducedMotion }) => {
      const hero = heroRef.current;
      if (!hero) return;

      const lines = hero.querySelectorAll('[data-hero-line]');
      const items = hero.querySelectorAll('[data-hero-animate]');
      const cue = scrollCueRef.current;
      const bgImg = bgImageRef.current;

      if (reducedMotion) {
        gsap.set([lines, items, cue, bgImg], {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
          clipPath: 'none',
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (bgImg) {
        tl.fromTo(
          bgImg,
          { scale: 1.07, opacity: 0.75 },
          { scale: 1, opacity: 1, duration: 0.95, clearProps: 'transform' },
          0
        );
      }

      if (lines.length) {
        tl.fromTo(
          lines,
          {
            yPercent: 28,
            opacity: 0,
            clipPath: 'inset(0% 0% 100% 0%)',
          },
          {
            yPercent: 0,
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.72,
            stagger: 0.12,
            clearProps: 'clipPath,transform',
          },
          0.12
        );
      }

      if (items.length) {
        tl.fromTo(
          items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.62,
            stagger: 0.12,
            clearProps: 'transform',
          },
          0.32
        );
      }

      if (cue) {
        tl.fromTo(
          cue,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          0.65
        );

        const floatTween = gsap.to(cue.querySelector('[data-scroll-arrow]'), {
          y: 5,
          duration: 1.1,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });

        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: '+=120',
          onUpdate: (self) => {
            const fade = Math.max(0, 1 - self.progress * 2.5);
            gsap.to(cue, {
              opacity: fade,
              y: self.progress * 14,
              duration: 0.2,
              overwrite: 'auto',
            });
          },
        });

        return () => {
          floatTween.kill();
        };
      }
    },
    heroRef,
    []
  );

  return (
    <section
      id="topo"
      ref={heroRef}
      className="relative w-full bg-[#231E1C] overflow-hidden"
    >
      {/* Mobile (<768px): stacked 4:5 vertical hero image on top */}
      <div className="block md:hidden w-full aspect-[4/5] max-h-[70vh] relative overflow-hidden bg-[#231E1C]">
        <img
          src={assets.heroMobile}
          alt="Hambúrguer artesanal duplo com queijo cheddar derretido, bacon crocante, tomate e alface sobre tábua de madeira rústica com fritas"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#231E1C] to-transparent"
        />
      </div>

      {/* Tablet & Desktop (>=768px): Full-bleed asymmetric hero (~100svh / min 640px desktop) */}
      <div className="relative md:h-[560px] lg:h-[calc(100svh-72px)] lg:min-h-[640px] lg:max-h-[820px] flex items-end md:items-center">
        {/* Desktop Full-bleed background photography */}
        <div className="hidden md:block absolute inset-0 overflow-hidden">
          <img
            ref={bgImageRef}
            src={assets.heroDesktop}
            alt="Hambúrguer artesanal duplo com cheddar derretido, bacon e batatas fritas sobre tábua de tronco em ambiente acolhedor"
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-[72%_center] lg:object-right"
          />
          {/* Readability overlay specified in Design System Section 10.3 & 15 */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(20,14,12,0.85) 0%, rgba(20,14,12,0.55) 40%, rgba(20,14,12,0) 65%)',
            }}
          />
          <div
            aria-hidden="true"
            className="block lg:hidden absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(20,14,12,0.90) 0%, rgba(20,14,12,0.60) 45%, rgba(20,14,12,0) 72%)',
            }}
          />
        </div>

        {/* Left-aligned content block (columns 1–5 on 12-col grid, ~55% vertical position on desktop) */}
        <div className="ds-container relative z-10 py-6 md:py-0 lg:pt-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-6 lg:col-span-5 flex flex-col items-start">
              <h1
                className="text-white uppercase tracking-normal"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--fs-display-xl)',
                  lineHeight: 'var(--lh-tight)',
                }}
              >
                <span data-hero-line className="block">
                  SUCULENTO{' '}
                  <span className="text-[#F4B41C]" aria-label="e">
                    &amp;
                  </span>
                </span>
                <span data-hero-line className="block">
                  FEITO EM CASA.
                </span>
              </h1>

              <p
                data-hero-animate
                className="mt-6 max-w-[420px] text-[16px] md:text-[18px] leading-[1.55] text-[#E9DFCC]/75"
              >
                Burgers autorais e defumados feitos com carinho em Cidade
                Ocidental. Todo dia a partir das 18h.
              </p>

              <div data-hero-animate className="mt-8 w-full sm:w-auto">
                <Button
                  variant="primary"
                  href={business.whatsappOrder}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidthMobile
                  icon={<WhatsappLogo size={18} weight="fill" aria-hidden="true" />}
                >
                  PEDIR NO WHATSAPP
                </Button>
              </div>

              <div className="mt-5">
                <RatingBadge />
              </div>
            </div>
          </div>
        </div>

        {/* GSAP-controlled Scroll Indicator (desktop & tablet) */}
        <div
          ref={scrollCueRef}
          aria-hidden="true"
          className="hidden md:flex items-center gap-2 absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#F7F1E3]/70 text-[12px] font-medium uppercase tracking-[0.12em] pointer-events-none"
        >
          <span>Role para explorar</span>
          <CaretDown
            data-scroll-arrow
            size={14}
            weight="bold"
            className="text-[#F4B41C]"
          />
        </div>
      </div>
    </section>
  );
}
