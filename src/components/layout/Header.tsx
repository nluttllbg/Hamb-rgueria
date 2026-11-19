import { useEffect, useState } from 'react';
import { List, X } from '@phosphor-icons/react';
import { business } from '../../data/business';
import { useSmoothScroll } from '../../animations/SmoothScroll';
import { Button } from '../ui/Button';
import { BrushUnderline } from '../svg/BrushUnderline';

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'CARDÁPIO', href: '#cardapio' },
  { label: 'RODÍZIO', href: '#rodizio' },
  { label: 'AVALIAÇÕES', href: '#avaliacoes' },
  { label: 'CONTATO', href: '#contato' },
];

interface HeaderProps {
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export function Header({ mobileMenuOpen, onToggleMobileMenu }: HeaderProps) {
  const { scrollTo } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    scrollTo(href, -72);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-[#231E1C] transition-shadow duration-250 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
        scrolled ? 'shadow-[0_4px_16px_rgba(0,0,0,0.25)]' : ''
      }`}
    >
      <div className="ds-container relative flex h-16 lg:h-[72px] items-center justify-between">
        {/* Left: Provisional Wordmark + Brush Underline */}
        <a
          href="#topo"
          onClick={(e) => {
            e.preventDefault();
            scrollTo(0, 0);
          }}
          aria-label="Burger in Casa — Voltar ao topo"
          className="relative inline-flex flex-col items-start shrink-0 py-1 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#F4B41C] focus-visible:rounded"
        >
          <span
            className="text-[16px] sm:text-[20px] leading-none tracking-[0.02em] text-white uppercase whitespace-nowrap"
            style={{ fontFamily: 'var(--font-logo)' }}
          >
            BURGER IN CASA
          </span>
          <BrushUnderline className="w-[132px] sm:w-[164px] h-[11px] -mt-0.5" />
        </a>

        {/* Center: 4 Navigation Links centered on the page (desktop >= 1024px) */}
        <nav
          aria-label="Navegação principal"
          className="hidden lg:flex items-center gap-6 xl:gap-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="nav-link-underline text-[13px] font-semibold uppercase tracking-[0.08em] leading-none text-[#F7F1E3]/85 hover:text-[#F4B41C] transition-colors duration-200 whitespace-nowrap shrink-0 py-2 focus-visible:outline-none focus-visible:text-[#F4B41C]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Desktop 2 action buttons, Mobile hamburger + compact yellow CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden lg:block">
            <Button
              variant="outline"
              href={business.menuUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver cardápio
            </Button>
          </div>

          <Button
            variant="header"
            href={business.whatsappOrder}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 lg:h-10 px-3.5 sm:px-4 lg:px-[22px] text-[12px] lg:text-[14px]"
          >
            PEÇA AGORA
          </Button>

          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-[#F7F1E3] hover:text-[#F4B41C] hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#F4B41C] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X size={24} weight="bold" aria-hidden="true" />
            ) : (
              <List size={24} weight="bold" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
