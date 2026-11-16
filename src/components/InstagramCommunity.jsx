import { motion, useReducedMotion } from 'motion/react';
import { InstagramLogo, Sparkle } from '@phosphor-icons/react';
import { BUSINESS_INFO, INSTAGRAM_GALLERY } from '../data/siteData';
import { ButtonInButton } from './ButtonInButton';

export function InstagramCommunity() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="instagram"
      className="relative bg-espresso-900 text-tinta-100 py-24 sm:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] bg-white/[0.04] p-2 ring-1 ring-manteiga-200/15 shadow-[0_28px_65px_-25px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-[calc(2.25rem-0.5rem)] bg-espresso-950 p-6 sm:p-10 lg:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            {/* Editorial Invite */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 space-y-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] text-caramelo-400 font-medium ring-1 ring-manteiga-200/15">
                <Sparkle className="w-3.5 h-3.5" weight="light" />
                Comunidade no Instagram
              </span>

              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.08] text-tinta-100">
                Acompanhe a{' '}
                <span className="italic font-normal text-caramelo-400">
                  Dona Edith
                </span>{' '}
                e os bastidores da casa.
              </h2>

              <p className="text-base text-tinta-100/80 font-light leading-relaxed">
                Os vídeos espontâneos com a Dona Edith conquistaram quem já frequenta
                a confeitaria e trouxeram novos amigos para a mesa. Siga para ver as
                fornadas do dia, as cucas saindo quentinhas e os bastidores da equipe.
              </p>

              <div className="rounded-2xl bg-white/[0.04] px-4 py-3.5 ring-1 ring-manteiga-200/12 space-y-1">
                <p className="text-xs uppercase tracking-[0.18em] text-caramelo-400 font-medium">
                  Comunidade &amp; Perfil Oficial
                </p>
                <p className="text-sm font-medium text-tinta-100">
                  {BUSINESS_INFO.instagramHandleCommunity} ·{' '}
                  <span className="text-manteiga-200/80">
                    {BUSINESS_INFO.instagramHandlePrimary}
                  </span>
                </p>
              </div>

              <ButtonInButton
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={InstagramLogo}
                variant="caramel"
                size="lg"
              >
                Seguir no Instagram
              </ButtonInButton>
            </motion.div>

            {/* Grid de Fotos Reais */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-5">
              {INSTAGRAM_GALLERY.map((item, idx) => (
                <motion.a
                  key={item.id}
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.6,
                    delay: shouldReduceMotion ? 0 : idx * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  className="group rounded-[1.75rem] bg-white/[0.05] p-1.5 ring-1 ring-manteiga-200/14 block"
                >
                  <div
                    data-cursor="ver"
                    className="relative overflow-hidden rounded-[calc(1.75rem-0.375rem)] aspect-square bg-cacau-800"
                  >
                    <img
                      src={item.photo}
                      alt={item.alt}
                      width={600}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent"
                    />
                    <span className="absolute bottom-3 left-3 right-3 text-xs font-medium text-tinta-100 leading-snug">
                      {item.caption}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
