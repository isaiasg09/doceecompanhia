import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { FLOATING_LAYERS } from '../data/siteData';
import { buildWhatsAppUrl } from '../utils/cn';
import { ButtonInButton } from './ButtonInButton';

function ParallaxLayerCard({ layer, index, scrollProgress, reducedMotion }) {
  const isEven = index % 2 === 0;
  const rawY = useTransform(
    scrollProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [isEven ? 34 : -26, isEven ? -36 : 30]
  );
  const smoothY = useSpring(rawY, { stiffness: 110, damping: 24 });

  const rawRotate = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    reducedMotion ? [0, 0, 0] : [isEven ? -2 : 2, 0, isEven ? 1.5 : -1.5]
  );

  return (
    <motion.article
      style={{ y: smoothY, rotate: rawRotate }}
      whileHover={reducedMotion ? undefined : { y: -6, scale: 1.015 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-[2rem] bg-white/[0.05] p-1.5 ring-1 ring-manteiga-200/14 shadow-[0_24px_48px_-22px_rgba(0,0,0,0.85)]"
    >
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-[calc(2rem-0.375rem)] bg-espresso-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
        <div data-cursor="ver" className="relative aspect-[4/3] overflow-hidden bg-cacau-800">
          <img
            src={layer.photo}
            alt={layer.alt}
            width={720}
            height={540}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/75 via-transparent to-transparent"
          />
          <span className="absolute top-3 left-3 rounded-full bg-espresso-950/80 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-caramelo-400 ring-1 ring-manteiga-200/20">
            Camada 0{index + 1}
          </span>
        </div>

        <div className="p-5 flex items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-tinta-100 leading-snug">
              {layer.title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-manteiga-200/75 font-light">
              {layer.note}
            </p>
          </div>

          <a
            href={buildWhatsAppUrl(layer.title)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar disponibilidade de ${layer.title} no WhatsApp`}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-framboesa-500/20 text-caramelo-400 hover:bg-framboesa-500 hover:text-tinta-100 ring-1 ring-caramelo-400/25 transition-[background-color,color,transform] duration-300 active:scale-[0.96]"
          >
            <WhatsappLogo className="w-5 h-5" weight="regular" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function FloatingPastryShowcase() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      id="camadas"
      ref={sectionRef}
      className="relative bg-espresso-900 text-tinta-100 py-24 sm:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 sm:mb-16">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block rounded-full bg-white/[0.06] px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] text-caramelo-400 font-medium ring-1 ring-manteiga-200/15">
              Vitrine em profundidade · 2.5D
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08] text-tinta-100">
              Cada camada da nossa mesa tem um{' '}
              <span className="italic font-normal text-caramelo-400">
                motivo para voltar
              </span>
              .
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between gap-4">
            <p className="text-sm sm:text-base text-tinta-100/78 font-light lg:text-right max-w-md">
              Da cuca com farofa dourada ao café servido no bule com bule de leite:
              escolha o que desperta o apetite agora e reserve pelo WhatsApp.
            </p>
            <ButtonInButton
              href={buildWhatsAppUrl('Sabores disponíveis hoje na vitrine')}
              target="_blank"
              rel="noopener noreferrer"
              icon={WhatsappLogo}
              variant="caramel"
              size="sm"
            >
              Consultar vitrine do dia
            </ButtonInButton>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {FLOATING_LAYERS.map((layer, index) => (
            <ParallaxLayerCard
              key={layer.id}
              layer={layer}
              index={index}
              scrollProgress={scrollYProgress}
              reducedMotion={Boolean(shouldReduceMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
