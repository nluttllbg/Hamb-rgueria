import { useEffect, useRef } from 'react';
import {
  InstagramLogo,
  MapPin,
  WhatsappLogo,
  X,
} from '@phosphor-icons/react';
import { business } from '../../data/business';
import { useSmoothScroll } from '../../animations/SmoothScroll';
import { animationPresets } from '../../animations/animationPresets';
import { gsap, prefersReducedMotion } from '../../lib/gsap';
import { Button } from '../ui/Button';
import { NAV_ITEMS } from './Header';
import { OpenNowIndicator } from './OpenNowIndicator';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { scrollTo, lockScroll, unlockScroll } = useSmoothScroll();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (open) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => {
      unlockScroll();
    };
  }, [open, lockScroll, unlockScroll]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    const items = drawer.querySelectorAll('[data-drawer-item]');

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!open) {
        gsap.set(drawer, { display: 'none', pointerEvents: 'none', opacity: 0 });
      }
      return;
    }

    if (prefersReducedMotion()) {
      if (open) {
        gsap.set(drawer, { display: 'flex', pointerEvents: 'auto', opacity: 1, clipPath: 'none' });
        gsap.set(items, { opacity: 1, y: 0 });
      } else {
        gsap.set(drawer, { display: 'none', pointerEvents: 'none', opacity: 0 });
      }
      return;
    }

    const tl = animationPresets.menuTransition(drawer, items, open);
    return () => {
      tl.kill();
    };
  }, [open]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    onClose();
    // Wait briefly so scroll unlock takes effect before Lenis scrolls
    requestAnimationFrame(() => {
      scrollTo(href, -64);
    });
  };

  return (
    <div
      id="mobile-navigation-drawer"
      ref={drawerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
      aria-hidden={!open}
      className="fixed inset-0 z-50 hidden flex-col justify-between bg-[#231E1C] text-[#F7F1E3] px-6 pt-5 pb-8 overflow-y-auto lg:hidden"
    >
      {/* Top Bar inside Drawer */}
      <div className="flex items-center justify-between">
        <span
          className="text-[18px] leading-none text-white uppercase"
          style={{ fontFamily: 'var(--font-logo)' }}
        >
          BURGER IN CASA
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="inline-flex items-center justify-center w-11 h-11 rounded-full text-[#F7F1E3] hover:text-[#F4B41C] hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#F4B41C] cursor-pointer"
        >
          <X size={26} weight="bold" aria-hidden="true" />
        </button>
      </div>

      {/* Anton 36px Navigation Links */}
      <nav aria-label="Menu mobile" className="my-8 flex flex-col gap-5">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            data-drawer-item
            onClick={(e) => handleLinkClick(e, item.href)}
            className="text-[36px] leading-[1.05] uppercase tracking-normal text-[#F7F1E3] hover:text-[#F4B41C] transition-colors py-1 focus-visible:outline-none focus-visible:text-[#F4B41C]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Actions & Business Info */}
      <div className="flex flex-col gap-5 border-t border-[#3D3532] pt-6">
        <div data-drawer-item className="flex flex-col gap-3">
          <Button
            variant="primary"
            href={business.whatsappOrder}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
            icon={<WhatsappLogo size={18} weight="fill" aria-hidden="true" />}
          >
            PEDIR NO WHATSAPP
          </Button>
          <Button
            variant="outline"
            href={business.menuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11"
          >
            Ver cardápio
          </Button>
        </div>

        <div data-drawer-item className="flex flex-col gap-2 text-[13px] text-[#E9DFCC]/80">
          <OpenNowIndicator />
          <p>{business.address}</p>
          <p>{business.hoursSummary}</p>
        </div>

        <div data-drawer-item className="flex items-center gap-5 pt-1">
          <a
            href={business.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#F4B41C] hover:underline min-h-[44px]"
          >
            <MapPin size={18} weight="fill" aria-hidden="true" />
            <span>Como chegar</span>
          </a>
          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#F7F1E3]/85 hover:text-[#F4B41C] min-h-[44px]"
          >
            <InstagramLogo size={18} weight="fill" aria-hidden="true" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
