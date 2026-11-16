import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  InstagramLogo,
  MapPin,
  WhatsappLogo,
} from '@phosphor-icons/react';
import { BRAND_ASSETS, BUSINESS_INFO } from '../data/siteData';
import { cn, getOpenStatus } from '../utils/cn';
import { ButtonInButton } from './ButtonInButton';

const NAV_LINKS = [
  { label: 'Vitrine em Camadas', href: '#camadas' },
  { label: 'Queridinhos', href: '#queridinhos' },
  { label: 'Dona Edith', href: '#historia' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Visite-nos', href: '#visite-nos' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState(() => getOpenStatus());
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStatus(getOpenStatus());
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-4 sm:top-5 inset-x-0 z-40 px-4 pointer-events-none">
        <nav
          aria-label="Navegação principal"
          className="pointer-events-auto mx-auto max-w-6xl rounded-full bg-espresso-950/82 backdrop-blur-2xl ring-1 ring-manteiga-200/15 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)] px-2.5 py-2 sm:px-3.5 sm:py-2 flex items-center justify-between gap-3"
        >
          {/* Marca com logo circular real */}
          <a
            href="#inicio"
            className="flex items-center gap-2.5 rounded-full pr-2 py-0.5 transition-opacity duration-300 hover:opacity-90 min-h-[44px]"
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-creme-50 p-0.5 ring-1 ring-caramelo-400/35 overflow-hidden">
              <img
                src={BRAND_ASSETS.logo}
                alt={BRAND_ASSETS.logoAlt}
                width={40}
                height={40}
                className="h-full w-full rounded-full object-cover"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-sm sm:text-base font-semibold tracking-tight text-tinta-100">
                {BUSINESS_INFO.name}
              </span>
              <span className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-manteiga-200/80">
                <span
                  aria-hidden="true"
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    status.isOpen ? 'bg-pistache-400' : 'bg-caramelo-400'
                  )}
                />
                <span>{status.shortLabel}</span>
              </span>
            </span>
          </a>

          {/* Links Desktop */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-3.5 py-2 rounded-full text-sm font-normal text-tinta-100/85 hover:text-tinta-100 hover:bg-white/[0.06] transition-[color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Ações direita */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Doce & Companhia"
              className="hidden sm:inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-tinta-100/90 ring-1 ring-white/10 transition-[transform,background-color] duration-300 active:scale-[0.96]"
            >
              <InstagramLogo className="w-5 h-5" weight="light" />
            </a>

            <a
              href={BUSINESS_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Como chegar pelo Google Maps"
              className="hidden sm:inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-tinta-100/90 ring-1 ring-white/10 transition-[transform,background-color] duration-300 active:scale-[0.96]"
            >
              <MapPin className="w-5 h-5" weight="light" />
            </a>

            <div className="hidden md:block">
              <ButtonInButton
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={WhatsappLogo}
                variant="primary"
                size="sm"
              >
                Pedir agora
              </ButtonInButton>
            </div>

            {/* Botão Hamburger Morph */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-overlay"
              aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="lg:hidden relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.08] hover:bg-white/[0.14] ring-1 ring-manteiga-200/20 text-tinta-100 transition-colors duration-300 cursor-pointer"
            >
              <span className="sr-only">Menu</span>
              <span
                aria-hidden="true"
                className={cn(
                  'absolute h-[1.5px] w-5 bg-tinta-100 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  menuOpen ? 'translate-y-0 rotate-45' : '-translate-y-1.5'
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  'absolute h-[1.5px] w-5 bg-tinta-100 rounded-full transition-[transform,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  'absolute h-[1.5px] w-5 bg-tinta-100 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  menuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay Fullscreen Mobile Menu com Staggered Mask Reveal */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Menu da Doce & Companhia"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-espresso-950/94 backdrop-blur-3xl flex flex-col justify-between px-6 pt-28 pb-10 overflow-y-auto"
          >
            <div className="mx-auto w-full max-w-lg">
              <p className="text-[11px] uppercase tracking-[0.22em] text-caramelo-400 font-medium mb-5">
                Casa de Chá e Café · Rio do Sul
              </p>

              <ul className="space-y-2">
                {NAV_LINKS.map((link, index) => (
                  <li key={link.href} className="overflow-hidden">
                    <motion.a
                      href={link.href}
                      onClick={handleNavClick}
                      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.55,
                        delay: shouldReduceMotion ? 0 : 0.06 + index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="block py-2.5 font-display text-3xl sm:text-4xl text-tinta-100 hover:text-caramelo-400 transition-colors duration-300"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mx-auto w-full max-w-lg mt-10 pt-6 border-t border-manteiga-200/15 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-tinta-100/80">
                <span>{BUSINESS_INFO.addressShort}</span>
                <span className="text-pistache-400 font-medium">{status.label}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <ButtonInButton
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={WhatsappLogo}
                  variant="primary"
                  size="lg"
                  className="w-full justify-between"
                >
                  Pedir pelo WhatsApp
                </ButtonInButton>

                <div className="grid grid-cols-2 gap-3 w-full">
                  <a
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-full bg-white/[0.06] ring-1 ring-manteiga-200/15 text-sm text-tinta-100 px-4"
                  >
                    <MapPin className="w-4 h-4 text-caramelo-400" weight="light" />
                    <span>Google Maps</span>
                  </a>
                  <a
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-full bg-white/[0.06] ring-1 ring-manteiga-200/15 text-sm text-tinta-100 px-4"
                  >
                    <InstagramLogo className="w-4 h-4 text-caramelo-400" weight="light" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
