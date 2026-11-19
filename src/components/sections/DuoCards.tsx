import { useRef } from 'react';
import { assets } from '../../data/business';
import { useGsap } from '../../hooks/useGsap';
import { animationPresets } from '../../animations/animationPresets';
import { gsap } from '../../lib/gsap';

export function DuoCards() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsap(
    ({ reducedMotion }) => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = section.querySelectorAll('[data-duo-card]');
      if (reducedMotion) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      animationPresets.sectionTransition(section, cards);
    },
    sectionRef,
    []
  );

  return (
    <section
      id="cardapio"
      ref={sectionRef}
      className="bg-[#F7F1E3] pt-10 pb-0 scroll-mt-20"
    >
      <div className="ds-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-stretch">
          {/* Left Card (~55% / 7 cols desktop, 6 cols tablet): Family Table Photo */}
          <article
            data-duo-card
            className="md:col-span-6 lg:col-span-7 overflow-hidden rounded-[16px] shadow-[0_2px_8px_rgba(35,30,28,0.06)] hover:shadow-[0_12px_28px_rgba(35,30,28,0.14)] transition-shadow duration-300 group aspect-[16/10] md:aspect-auto md:h-[240px] lg:h-[260px]"
          >
            <img
              src={assets.mesaFamilia}
              alt="Mesa compartilhada com hambúrguer artesanal, fritas com cheddar e bacon e bebidas geladas"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover transition-transform duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
            />
          </article>

          {/* Right Card (~45% / 5 cols desktop, 6 cols tablet): Yellow Defumados Card */}
          <article
            data-duo-card
            className="md:col-span-6 lg:col-span-5 rounded-[16px] bg-[#F4B41C] p-6 sm:p-8 shadow-[0_2px_8px_rgba(35,30,28,0.06)] hover:shadow-[0_12px_28px_rgba(35,30,28,0.14)] transition-shadow duration-300 md:h-[240px] lg:h-[260px] flex flex-col sm:grid sm:grid-cols-[3fr_2fr] items-center gap-4 overflow-hidden"
          >
            <div className="flex flex-col items-start text-left">
              <h2
                className="text-[#7A1612] uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--fs-display-sm)',
                  lineHeight: 1.05,
                  letterSpacing: '0.01em',
                }}
              >
                DEFUMADOS
              </h2>
              <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.6] text-[#231E1C] max-w-[26ch]">
                Pulled pork e carnes no ponto da fumaça. Sabor de quem leva o
                burger a sério.
              </p>
            </div>

            <div className="relative flex items-center justify-center w-full sm:w-auto">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-2 w-[70%] h-5 rounded-full bg-[#5A3520]/30 blur-md"
              />
              <img
                src={assets.pulledPork}
                alt="Burger de pulled pork suíno defumado com molho barbecue brilhante"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="relative h-[154px] sm:h-[176px] w-auto object-contain blend-on-yellow brightness-[1.09] saturate-[1.05]"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
