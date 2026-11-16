import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ArrowDownRight,
  Coffee,
  MapPin,
  Star,
  WhatsappLogo,
} from '@phosphor-icons/react';
import { BUSINESS_INFO, FOTOS } from '../data/siteData';
import { getOpenStatus } from '../utils/cn';
import { ButtonInButton } from './ButtonInButton';

const SugarParticlesCanvas = lazy(() => import('./SugarParticlesCanvas'));

function StaticSugarFallback() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-55"
    >
      <span className="absolute top-[18%] left-[12%] h-1.5 w-1.5 rounded-full bg-tinta-100/50 blur-[1px]" />
      <span className="absolute top-[32%] left-[42%] h-2 w-2 rounded-full bg-caramelo-400/40 blur-[1px]" />
      <span className="absolute top-[24%] right-[18%] h-1.5 w-1.5 rounded-full bg-tinta-100/45 blur-[1px]" />
      <span className="absolute bottom-[28%] left-[25%] h-1 w-1 rounded-full bg-tinta-100/50" />
      <span className="absolute bottom-[22%] right-[30%] h-2 w-2 rounded-full bg-caramelo-400/35 blur-[1px]" />
    </div>
  );
}

function CoffeeSteamSvg({ reducedMotion }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none inline-flex items-center gap-2 rounded-full bg-espresso-950/88 px-3.5 py-2 ring-1 ring-manteiga-200/20 shadow-lg"
    >
      <div className="relative h-9 w-9 flex items-center justify-center">
        <svg
          viewBox="0 0 48 48"
          className="h-9 w-9 overflow-visible text-caramelo-400"
          fill="none"
        >
          <defs>
            <filter id="steam-turbulence" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04 0.08"
                numOctaves="2"
                seed="7"
              >
                {!reducedMotion && (
                  <animate
                    attributeName="baseFrequency"
                    dur="7s"
                    values="0.04 0.08;0.06 0.12;0.04 0.08"
                    repeatCount="indefinite"
                  />
                )}
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="3.2" />
            </filter>
          </defs>

          {/* Vapor orgânico subindo do bule */}
          <g filter="url(#steam-turbulence)">
            <path
              d="M19 18 C17 13, 22 10, 19 5"
              stroke="#f6ebdc"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={reducedMotion ? 'opacity-50' : 'animate-steam-a'}
            />
            <path
              d="M26 17 C29 12, 24 9, 27 4"
              stroke="#dba256"
              strokeWidth="1.5"
              strokeLinecap="round"
              className={reducedMotion ? 'opacity-40' : 'animate-steam-b'}
            />
          </g>

          {/* Silhueta do bule de café */}
          <path
            d="M14 23 H31 L33 36 C33.2 38.2 31.4 40 29.2 40 H15.8 C13.6 40 11.8 38.2 12 36 L14 23 Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill="rgba(201,138,60,0.14)"
          />
          <path
            d="M16 23 C16 20 19 18.5 22.5 18.5 C26 18.5 29 20 29 23"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M31.5 26 C35.5 26 37 28.5 36.5 31.5 C36 34 34 35 32.2 35"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M13 26 L9.5 24.5 L12.5 29.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="leading-tight pr-1">
        <span className="block text-[10px] uppercase tracking-[0.18em] text-caramelo-400">
          Servido no bule
        </span>
        <span className="block text-xs font-medium text-tinta-100">
          Café + bule de leite
        </span>
      </div>
    </div>
  );
}

export function HeroSection() {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [enable3D, setEnable3D] = useState(false);
  const [status] = useState(() => getOpenStatus());

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 120, damping: 24 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 120, damping: 24 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const mainPhotoY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -45]);
  const topCardY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -90]);
  const bottomLeftY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 65]);
  const accentRightY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -115]);

  const pointerShiftX = useTransform(smoothPointerX, [-1, 1], [-12, 12]);
  const pointerShiftY = useTransform(smoothPointerY, [-1, 1], [-10, 10]);
  const pointerShiftSlowX = useTransform(smoothPointerX, [-1, 1], [8, -8]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setEnable3D(false);
      return undefined;
    }
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => {
      const lowCores =
        typeof navigator !== 'undefined' &&
        typeof navigator.hardwareConcurrency === 'number' &&
        navigator.hardwareConcurrency <= 2;
      setEnable3D(mq.matches && !lowCores);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [shouldReduceMotion]);

  const handlePointerMove = (event) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    pointerX.set(nx);
    pointerY.set(ny);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const headlineLines = ['Doce de verdade,', 'feito com carinho de casa.'];

  return (
    <section
      id="inicio"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-[100dvh] bg-espresso-950 text-tinta-100 overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 flex items-center"
    >
      {/* Atmosfera e vinheta quente */}
      <div aria-hidden="true" className="vignette-espresso absolute inset-0 z-0" />

      {/* Partículas de açúcar de confeiteiro (R3F lazy em desktop / fallback leve) */}
      {enable3D ? (
        <Suspense fallback={<StaticSugarFallback />}>
          <SugarParticlesCanvas />
        </Suspense>
      ) : (
        <StaticSugarFallback />
      )}

      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Coluna Editorial Esquerda */}
          <div className="lg:col-span-6 space-y-7">
            {/* Badges com stagger */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-tinta-100 ring-1 ring-manteiga-200/20">
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full ${
                    status.isOpen ? 'bg-pistache-400' : 'bg-caramelo-400'
                  }`}
                />
                <span>{status.label}</span>
              </span>

              <a
                href="#depoimentos"
                className="inline-flex items-center gap-1.5 rounded-full bg-caramelo-500/15 px-3.5 py-1.5 text-xs font-medium text-caramelo-400 ring-1 ring-caramelo-400/30 hover:bg-caramelo-500/25 transition-colors duration-300"
              >
                <Star className="w-3.5 h-3.5 text-caramelo-400" weight="fill" />
                <span>
                  {BUSINESS_INFO.rating}★ · +{BUSINESS_INFO.reviewsCount} avaliações no Google
                </span>
              </a>
            </motion.div>

            {/* H1 com Masked Text Reveal */}
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.22em] text-caramelo-400 font-medium">
                Jardim América · Rio do Sul – SC
              </p>

              <h1 className="font-display text-[2.65rem] sm:text-5xl lg:text-[3.75rem] xl:text-[4.2rem] font-semibold tracking-tight leading-[1.03] text-tinta-100">
                {headlineLines.map((line, idx) => (
                  <span key={line} className="block overflow-hidden pb-1">
                    <motion.span
                      className={
                        idx === 1
                          ? 'block italic font-normal text-manteiga-200'
                          : 'block'
                      }
                      initial={shouldReduceMotion ? { y: 0 } : { y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.9,
                        delay: shouldReduceMotion ? 0 : 0.1 + idx * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </div>

            {/* Subtítulo afetivo fiel aos dados reais */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: shouldReduceMotion ? 0 : 0.34,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-xl text-base sm:text-lg leading-relaxed text-tinta-100/82 font-light"
            >
              Cucas de farofa dourada em muitos sabores, torta de frango cremosa,
              folhado de maçã quentinho e a recepção inconfundível da{' '}
              <span className="font-medium text-manteiga-200">Dona Edith</span> e equipe.
              Um refúgio acolhedor na Rua 7 de Setembro para adoçar o seu dia.
            </motion.p>

            {/* CTAs Estratégicos (WhatsApp primário framboesa + Explorar Vitrine) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: shouldReduceMotion ? 0 : 0.44,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <ButtonInButton
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={WhatsappLogo}
                variant="primary"
                size="lg"
              >
                Pedir pelo WhatsApp
              </ButtonInButton>

              <ButtonInButton
                href="#queridinhos"
                icon={ArrowDownRight}
                variant="ghostDark"
                size="lg"
              >
                Ver queridinhos da casa
              </ButtonInButton>
            </motion.div>

            {/* Mini métricas reais abaixo dos CTAs */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: shouldReduceMotion ? 0 : 0.56,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-manteiga-200/12 max-w-xl"
            >
              <div>
                <p className="font-display text-2xl text-caramelo-400 font-semibold">
                  {BUSINESS_INFO.rating}★
                </p>
                <p className="text-xs text-tinta-100/70">
                  +{BUSINESS_INFO.reviewsCount} avaliações reais
                </p>
              </div>
              <div>
                <p className="font-display text-2xl text-tinta-100 font-semibold">
                  08h–19h
                </p>
                <p className="text-xs text-tinta-100/70">Seg–Sex · Sáb até 18h</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-1.5 text-xs text-tinta-100/80 hover:text-caramelo-400 transition-colors"
                >
                  <MapPin className="w-4 h-4 shrink-0 text-caramelo-400 mt-0.5" weight="light" />
                  <span>Rua 7 de Setembro, 319 — Jardim América</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Coluna Direita — Deconstructed Hero / Floating Pastry Layers 2.5D */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-[540px] lg:max-w-none py-4 sm:py-6">
              {/* Glow caramelo sutil atrás da composição */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-full bg-caramelo-500/12 blur-3xl"
              />

              {/* Camada Principal (LCP) — Double-Bezel */}
              <motion.div
                style={{
                  y: mainPhotoY,
                  x: shouldReduceMotion ? 0 : pointerShiftX,
                }}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 rounded-[2.25rem] bg-white/[0.06] p-2 ring-1 ring-manteiga-200/20 shadow-[0_32px_70px_-20px_rgba(0,0,0,0.85)]"
              >
                <div
                  data-cursor="ver"
                  className="relative overflow-hidden rounded-[calc(2.25rem-0.5rem)] bg-espresso-900 aspect-[1080/1066] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]"
                >
                  <img
                    src={FOTOS[0]}
                    alt="Vitrine artesanal de doces, tortas e cucas da Doce & Companhia em Rio do Sul"
                    width={1080}
                    height={1066}
                    decoding="async"
                    {...{ fetchpriority: 'high' }}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/75 via-transparent to-transparent"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-espresso-950/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-caramelo-400 ring-1 ring-manteiga-200/20">
                        <Coffee className="w-3.5 h-3.5" weight="light" />
                        Vitrine do dia
                      </span>
                      <p className="mt-1.5 font-display text-lg sm:text-xl text-tinta-100">
                        Tortas, fatias de bolo &amp; cucas
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Camada Flutuante Superior Direita — Folhado / Cuca */}
              <motion.div
                style={{
                  y: topCardY,
                  x: shouldReduceMotion ? 0 : pointerShiftSlowX,
                }}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, rotate: 3 }}
                animate={{ opacity: 1, y: 0, rotate: 3 }}
                transition={{ duration: 0.85, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="hidden sm:block absolute -top-4 -right-2 lg:-right-4 z-20 w-44 md:w-48 rounded-[1.5rem] bg-espresso-950/75 p-1.5 ring-1 ring-caramelo-400/35 shadow-[0_24px_45px_-15px_rgba(0,0,0,0.8)]"
              >
                <div
                  data-cursor="ver"
                  className="overflow-hidden rounded-[calc(1.5rem-0.375rem)] bg-cacau-800"
                >
                  <img
                    src={FOTOS[2]}
                    alt="Folhado de maçã e quitutes dourados da Doce & Companhia"
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="h-32 w-full object-cover"
                  />
                  <div className="px-3 py-2 bg-espresso-900">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-caramelo-400">
                      Forno da casa
                    </p>
                    <p className="text-xs font-medium text-tinta-100">
                      Folhado de maçã &amp; salgados
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Camada Flutuante Inferior Esquerda — Vapor SVG + Bule */}
              <motion.div
                style={{
                  y: bottomLeftY,
                  x: shouldReduceMotion ? 0 : pointerShiftY,
                }}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 26, rotate: -2.5 }}
                animate={{ opacity: 1, y: 0, rotate: -2.5 }}
                transition={{ duration: 0.85, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
                className="relative sm:absolute mt-4 sm:mt-0 sm:-bottom-6 sm:-left-6 z-20 flex flex-col gap-2.5 max-w-[260px]"
              >
                <CoffeeSteamSvg reducedMotion={Boolean(shouldReduceMotion)} />

                <div className="hidden md:block rounded-[1.5rem] bg-espresso-950/75 p-1.5 ring-1 ring-manteiga-200/20 shadow-[0_24px_45px_-15px_rgba(0,0,0,0.85)]">
                  <div
                    data-cursor="ver"
                    className="flex items-center gap-3 overflow-hidden rounded-[calc(1.5rem-0.375rem)] bg-espresso-900 pr-3"
                  >
                    <img
                      src={FOTOS[1]}
                      alt="Cuca artesanal de vários sabores da Doce & Companhia"
                      width={160}
                      height={90}
                      loading="lazy"
                      decoding="async"
                      className="h-16 w-20 object-cover shrink-0"
                    />
                    <div className="py-1.5">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-pistache-400 font-medium">
                        Campeã de elogios
                      </p>
                      <p className="text-xs font-medium text-tinta-100 leading-snug">
                        Cuca com farofa em muitos sabores
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Camada Flutuante Lateral Direita — Torta / Bolo */}
              <motion.div
                style={{ y: accentRightY }}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: -2 }}
                transition={{ duration: 0.85, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
                className="hidden xl:block absolute bottom-12 -right-8 z-20 w-44 rounded-[1.4rem] bg-espresso-950/80 p-1.5 ring-1 ring-manteiga-200/20 shadow-[0_24px_45px_-15px_rgba(0,0,0,0.8)]"
              >
                <div
                  data-cursor="ver"
                  className="overflow-hidden rounded-[calc(1.4rem-0.375rem)] bg-espresso-900"
                >
                  <img
                    src={FOTOS[3]}
                    alt="Fatias generosas de bolo e leite com chocolate da Doce & Companhia"
                    width={320}
                    height={320}
                    loading="lazy"
                    decoding="async"
                    className="h-24 w-full object-cover"
                  />
                  <p className="px-3 py-2 text-xs font-medium text-manteiga-200">
                    Fatias de bolo generosas
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
