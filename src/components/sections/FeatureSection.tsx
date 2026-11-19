import { useRef } from 'react';
import { Fire, Hamburger, Moped, Smiley } from '@phosphor-icons/react';
import { assets } from '../../data/business';
import { useGsap } from '../../hooks/useGsap';
import { animationPresets } from '../../animations/animationPresets';
import { gsap } from '../../lib/gsap';
import { FeatureItem } from './FeatureItem';

const FEATURES = [
  {
    icon: <Hamburger size={24} weight="fill" />,
    title: 'Burgers autorais',
    description: 'Receitas próprias, blend da casa e pão selado na hora.',
  },
  {
    icon: <Fire size={24} weight="fill" />,
    title: 'Defumados',
    description: 'Fumaça lenta e paciência: o sabor que virou marca da casa.',
  },
  {
    icon: <Smiley size={24} weight="fill" />,
    title: 'Espaço kids',
    description: 'Ambiente familiar com espaço para as crianças brincarem.',
  },
  {
    icon: <Moped size={24} weight="fill" />,
    title: 'Delivery',
    description: 'Peça pelo WhatsApp ou on-line e receba quentinho.',
  },
];

export function FeatureSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsap(
    ({ reducedMotion }) => {
      const section = sectionRef.current;
      if (!section) return;

      const product = section.querySelector('[data-feature-product]');
      const heading = section.querySelector('[data-feature-heading]');
      const items = section.querySelectorAll('[data-feature-item]');

      if (reducedMotion) {
        gsap.set([product, heading, items], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      if (product) {
        animationPresets.fadeUp(product, {
          scrollTrigger: {
            trigger: section,
            start: 'top 84%',
            once: true,
          },
        });
      }

      if (heading) {
        animationPresets.textReveal(heading, {
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        });
      }

      if (items.length) {
        animationPresets.staggerReveal(items, {
          scrollTrigger: {
            trigger: section,
            start: 'top 76%',
            once: true,
          },
        });
      }
    },
    sectionRef,
    []
  );

  return (
    <section
      ref={sectionRef}
      className="bg-[#F7F1E3] py-16 md:py-24"
    >
      <div className="ds-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-6 items-center">
          {/* Left: Giant isolated cheeseburger */}
          <div
            data-feature-product
            className="md:col-span-5 lg:col-span-6 relative flex items-center justify-center md:justify-start"
          >
            <div className="relative w-full max-w-[320px] md:max-w-[440px] lg:max-w-[520px] flex items-center justify-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[6%] w-[68%] h-8 rounded-full bg-[#5A3520]/20 blur-xl"
              />
              <img
                src={assets.burgerDestaque}
                alt="Cheeseburger artesanal gigante com pão com gergelim, alface, tomate, carne alta e cheddar derretido"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="relative w-full aspect-square object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* Right: Heading + 2x2 Feature Grid */}
          <div className="md:col-span-7 lg:col-span-6 flex flex-col items-start">
            <h2
              data-feature-heading
              className="text-[#231E1C] uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-display-lg)',
                lineHeight: 'var(--lh-display)',
              }}
            >
              ARTESANAL &amp; FEITO
              <br />
              <span className="text-[#B5221E]">NO PONTO CERTO</span>
            </h2>

            <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 w-full">
              {FEATURES.map((feat) => (
                <FeatureItem
                  key={feat.title}
                  icon={feat.icon}
                  title={feat.title}
                  description={feat.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
