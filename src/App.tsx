import { useState } from 'react';
import { SmoothScroll } from './animations/SmoothScroll';
import { Header } from './components/layout/Header';
import { MobileMenu } from './components/layout/MobileMenu';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { DuoCards } from './components/sections/DuoCards';
import { FeatureSection } from './components/sections/FeatureSection';
import { PromoBand } from './components/sections/PromoBand';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-[#F7F1E3] text-[#231E1C]">
        <Header
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        />
        <MobileMenu
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
        <main className="flex-1">
          <Hero />
          <DuoCards />
          <FeatureSection />
          <PromoBand footerSlot={<Footer />} />
        </main>
      </div>
    </SmoothScroll>
  );
}
