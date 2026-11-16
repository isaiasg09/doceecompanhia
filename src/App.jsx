import { useEffect } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'motion/react';
import { CustomCursor } from './components/CustomCursor';
import { FaqSection } from './components/FaqSection';
import { FavoritesBento } from './components/FavoritesBento';
import { FloatingActionDock } from './components/FloatingActionDock';
import { FloatingPastryShowcase } from './components/FloatingPastryShowcase';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { InstagramCommunity } from './components/InstagramCommunity';
import { Navbar } from './components/Navbar';
import { OrderWithoutLineSection } from './components/OrderWithoutLineSection';
import { SocialProofBar } from './components/SocialProofBar';
import { StoryDonaEdith } from './components/StoryDonaEdith';
import { TestimonialsSection } from './components/TestimonialsSection';
import { VisitUsSection } from './components/VisitUsSection';

function FilmGrainOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.04]"
    >
      <filter id="editorial-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.78"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#editorial-grain)" />
    </svg>
  );
}

export default function App() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-[100dvh] bg-espresso-950 text-tinta-100">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-creme-50 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-tinta-900"
        >
          Pular para o conteúdo principal
        </a>

        <FilmGrainOverlay />
        <CustomCursor />
        <Navbar />

        <main id="conteudo-principal">
          <HeroSection />
          <SocialProofBar />
          <FloatingPastryShowcase />
          <FavoritesBento />
          <StoryDonaEdith />
          <OrderWithoutLineSection />
          <TestimonialsSection />
          <InstagramCommunity />
          <VisitUsSection />
          <FaqSection />
        </main>

        <Footer />
        <FloatingActionDock />
      </div>
    </MotionConfig>
  );
}
