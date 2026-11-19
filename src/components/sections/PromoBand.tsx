import { useRef, type ReactNode } from 'react';
import { assets, business } from '../../data/business';
import { useGsap } from '../../hooks/useGsap';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { LightningBolt } from '../svg/LightningBolt';
import { Button } from '../ui/Button';

interface PromoBandProps {
  footerSlot?: ReactNode;
}

export function PromoBand({ footerSlot }: PromoBandProps) {
  const pinGroupRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const boltRef = useRef<HTMLDivElement>(null);
  const platterRef = useRef<HTMLDivElement>(null);

  useGsap(
    ({ reducedMotion }) => {
      const pinGroup = pinGroupRef.current;
      const section = sectionRef.current;
      if (!pinGroup || !section) return;

      const sequenceItems = section.querySelectorAll('[data-pin-step]');
      const bolt = boltRef.current;
      const platter = platterRef.current;

      if (reducedMotion) {
        gsap.set([sequenceItems, bolt, platter], {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
        return;
      }

      // Mandatory 0.2s staggered power3.out entrance sequence
      gsap.fromTo(
        sequenceItems,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: section,
            start: 'top 86%',
            once: true,
          },
        }
      );

      // Desktop (>= 1024px): pin PromoBand + Footer together so there is zero cream void underneath
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinGroup,
            start: 'bottom bottom',
            end: '+=320',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.6,
          },
        });

        if (bolt) {
          pinTl.fromTo(
            bolt,
            { x: -16, scale: 0.94 },
            { x: 16, scale: 1.05, ease: 'power3.out' },
            0
          );
        }

        if (platter) {
          pinTl.fromTo(
            platter,
            { scale: 0.98, y: 10 },
            { scale: 1.04, y: 0, ease: 'power3.out' },
            0
          );
        }

        return () => {
          pinTl.scrollTrigger?.kill();
          pinTl.kill();
        };
      });

      return () => {
        mm.revert();
        ScrollTrigger.refresh();
      };
    },
    pinGroupRef,
    []
  );

  return (
    <div ref={pinGroupRef} className="relative bg-[#231E1C]">
      <section
        id="rodizio"
        ref={sectionRef}
        className="relative z-10 w-full bg-[#F4B41C] overflow-hidden scroll-mt-[72px]"
      >
        <div className="ds-container pt-12 pb-0 md:py-0 lg:h-[440px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center h-full">
            {/* Zone 1: Left text block (columns 1–5) */}
            <div className="md:col-span-6 lg:col-span-5 flex flex-col items-start md:py-12 lg:py-0">
              <h2
                data-pin-step
                className="text-[#231E1C] uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--fs-display-md)',
                  lineHeight: 'var(--lh-display)',
                }}
              >
                RODÍZIO DE
                <br />
                <span className="text-[#B5221E]">MINI BURGERS</span>
              </h2>

              <p
                data-pin-step
                className="mt-5 max-w-[38ch] text-[16px] md:text-[18px] leading-[1.55] text-[#231E1C]"
              >
                Uma variedade de mini hambúrgueres para provar sem pressa. Chame
                a família e venha com fome.
              </p>

              <div data-pin-step className="mt-7 w-full sm:w-auto">
                <Button
                  variant="primary"
                  href={business.whatsappRodizio}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidthMobile
                >
                  QUERO O RODÍZIO
                </Button>
              </div>
            </div>

            {/* Zone 2: Center orange lightning bolt (desktop >= 1024px) */}
            <div
              ref={boltRef}
              data-pin-step
              className="hidden lg:flex lg:col-span-1 items-center justify-center"
            >
              <LightningBolt className="w-[120px] h-auto shrink-0" />
            </div>

            {/* Zone 3: Right mini burgers wooden board bottom-aligned and cropped cleanly at footer edge */}
            <div
              ref={platterRef}
              data-pin-step
              className="md:col-span-6 lg:col-span-6 self-end flex items-end justify-center lg:justify-end -mb-3 md:-mb-5 lg:-mb-6"
            >
              <img
                src={assets.rodizioTabua}
                alt="Tábua rústica de madeira com cinco mini hambúrgueres artesanais variados"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full max-w-[460px] lg:max-w-[540px] aspect-[4/3] object-contain object-bottom blend-platter-yellow brightness-[1.09] saturate-[1.05]"
              />
            </div>
          </div>
        </div>
      </section>
      {footerSlot}
    </div>
  );
}
