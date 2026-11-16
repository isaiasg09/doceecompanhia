import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { Coffee, Heart, InstagramLogo } from '@phosphor-icons/react';
import { BRAND_ASSETS, BUSINESS_INFO } from '../data/siteData';
import { ButtonInButton } from './ButtonInButton';

export function StoryDonaEdith() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-24, 24]
  );

  return (
    <section
      id="historia"
      ref={containerRef}
      className="relative bg-espresso-950 text-tinta-100 py-24 sm:py-32 overflow-hidden"
    >
      <div aria-hidden="true" className="vignette-story absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Foto Real da Fachada Noturna com Parallax */}
          <div className="lg:col-span-6">
            <motion.div
              style={{ y: imageY }}
              className="rounded-[2.25rem] bg-white/[0.06] p-2 ring-1 ring-manteiga-200/20 shadow-[0_32px_70px_-20px_rgba(0,0,0,0.85)]"
            >
              <div
                data-cursor="ver"
                className="relative overflow-hidden rounded-[calc(2.25rem-0.5rem)] bg-espresso-900 aspect-[16/10]"
              >
                <img
                  src={BRAND_ASSETS.fachada}
                  alt={BRAND_ASSETS.fachadaAlt}
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-espresso-950/88 px-3.5 py-1.5 text-xs text-manteiga-200 ring-1 ring-manteiga-200/20">
                    <Coffee className="w-4 h-4 text-caramelo-400" weight="light" />
                    Casa de Chá e Café · Jardim América
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Storytelling Dona Edith + Assinatura Caveat */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] text-caramelo-400 font-medium ring-1 ring-manteiga-200/15">
              <Heart className="w-3.5 h-3.5 text-framboesa-500" weight="fill" />
              A alma da casa
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08] text-tinta-100">
              Aqui, o carinho da{' '}
              <span className="italic font-normal text-caramelo-400">
                Dona Edith
              </span>{' '}
              transforma cliente em família.
            </h2>

            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-tinta-100/82 font-light">
              <p>
                Quem entra pela porta da Rua 7 de Setembro sente antes mesmo de
                escolher a fatia: o atendimento simpático, o cheiro de cuca recém-assada
                e o ritual acolhedor de servir o café no bule com bule de leite.
              </p>
              <p>
                Não é por acaso que os vídeos da{' '}
                <strong className="font-medium text-manteiga-200">Dona Edith</strong>{' '}
                no Instagram conquistaram Rio do Sul e despertaram elogios espontâneos
                nas avaliações do Google — é o jeito verdadeiro da casa de bairro
                transbordando para fora da vitrine.
              </p>
            </div>

            {/* Assinatura manuscrita exclusiva em Caveat */}
            <div className="pt-4 pb-2 border-t border-manteiga-200/14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <p className="font-script text-3xl sm:text-4xl text-caramelo-400 leading-none">
                  Dona Edith &amp; equipe
                </p>
                <p className="mt-1.5 text-xs uppercase tracking-[0.18em] text-tinta-100/60">
                  Doce &amp; Companhia · Rio do Sul, SC
                </p>
              </div>

              <ButtonInButton
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={InstagramLogo}
                variant="ghostDark"
                size="md"
              >
                Ver vídeos no Instagram
              </ButtonInButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
