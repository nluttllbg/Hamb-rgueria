import { InstagramLogo } from '@phosphor-icons/react';
import { business } from '../../data/business';
import { OpenNowIndicator } from './OpenNowIndicator';

export function Footer() {
  return (
    <footer
      id="contato"
      className="relative z-20 w-full bg-[#231E1C] border-t border-[#3D3532] text-[#F7F1E3]"
    >
      <div className="ds-container py-8 xl:py-0 xl:h-[88px] flex flex-col xl:flex-row items-center justify-between gap-4 xl:gap-6 text-center xl:text-left">
        {/* Left: Provisional Script Logo */}
        <a
          href="#topo"
          className="text-[22px] leading-none text-[#E8463E] shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#F4B41C] focus-visible:rounded px-1"
          style={{
            fontFamily: 'var(--font-script)',
            textShadow: '0 1px 0 #F4B41C',
          }}
        >
          {business.shortName}
        </a>

        {/* Center: 3 External Links */}
        <nav
          aria-label="Links de contato e localização"
          className="flex flex-wrap items-center justify-center gap-5 text-[12px] font-medium tracking-[0.02em] text-[#F7F1E3]/75 shrink-0"
        >
          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F4B41C] transition-colors py-1 whitespace-nowrap"
          >
            Instagram
          </a>
          <a
            href={business.whatsappOrder}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F4B41C] transition-colors py-1 whitespace-nowrap"
          >
            WhatsApp
          </a>
          <a
            href={business.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F4B41C] transition-colors py-1 whitespace-nowrap"
          >
            Como chegar
          </a>
        </nav>

        {/* Right: Address, Hours, Live OpenNowIndicator, Copyright & Instagram Yellow Square */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-[12px] leading-[1.4] tracking-[0.02em] text-[#F7F1E3]/75">
          <div className="flex flex-col items-center xl:items-end gap-0.5">
            <div className="flex flex-wrap xl:flex-nowrap items-center justify-center xl:justify-end gap-x-2 gap-y-1 xl:whitespace-nowrap">
              <span>{business.addressShort}</span>
              <span aria-hidden="true">·</span>
              <span>{business.hoursCompact}</span>
              <span aria-hidden="true">·</span>
              <span>© 2026 {business.shortName}</span>
            </div>
            <OpenNowIndicator />
          </div>

          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram oficial da Burger in Casa"
            className="inline-flex items-center justify-center w-7 h-7 rounded-[6px] bg-[#F4B41C] text-[#231E1C] hover:bg-[#E5A40F] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#F4B41C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#231E1C]"
          >
            <InstagramLogo size={18} weight="fill" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
