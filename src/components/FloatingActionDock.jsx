import { ListBullets, WhatsappLogo } from '@phosphor-icons/react';
import { useReducedMotion } from 'motion/react';
import { BUSINESS_INFO } from '../data/siteData';

export function FloatingActionDock() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href="#queridinhos"
        aria-label="Ir para o cardápio de queridinhos da casa"
        className="inline-flex items-center gap-2 min-h-[46px] rounded-full bg-espresso-900/90 backdrop-blur-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-tinta-100 ring-1 ring-manteiga-200/20 shadow-[0_14px_30px_-10px_rgba(0,0,0,0.65)] hover:bg-cacau-800 transition-[transform,background-color] duration-300 active:scale-[0.97]"
      >
        <ListBullets className="w-4 h-4 text-caramelo-400" weight="light" />
        <span>Cardápio</span>
      </a>

      <div className="relative flex items-center justify-center">
        {!shouldReduceMotion && (
          <span
            aria-hidden="true"
            className="animate-organic-pulse absolute inset-0 rounded-full bg-framboesa-500/45"
          />
        )}
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pedir pelo WhatsApp agora"
          className="relative inline-flex items-center gap-2.5 min-h-[48px] rounded-full bg-framboesa-500 hover:bg-framboesa-600 px-5 py-2.5 text-sm font-medium text-tinta-100 ring-1 ring-white/20 shadow-[0_16px_35px_-10px_rgba(184,50,74,0.65)] transition-[transform,background-color] duration-300 active:scale-[0.97]"
        >
          <WhatsappLogo className="w-5 h-5" weight="regular" />
          <span className="hidden sm:inline">Pedir no WhatsApp</span>
          <span className="sm:hidden">Pedir</span>
        </a>
      </div>
    </div>
  );
}
