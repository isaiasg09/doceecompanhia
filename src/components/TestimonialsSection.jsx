import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Quotes, Star } from '@phosphor-icons/react';
import { BUSINESS_INFO, DEPOIMENTOS } from '../data/siteData';
import { cn } from '../utils/cn';
import { ButtonInButton } from './ButtonInButton';

function StarRow({ count }) {
  return (
    <div className="inline-flex items-center gap-0.5" aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          className={cn(
            'w-4 h-4',
            idx < count ? 'text-caramelo-500' : 'text-tinta-900/20'
          )}
          weight={idx < count ? 'fill' : 'regular'}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="depoimentos"
      className="relative bg-creme-100 text-tinta-900 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho com Nota Verificada */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block rounded-full bg-tinta-900/[0.06] px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] text-framboesa-500 font-semibold ring-1 ring-tinta-900/10">
              Avaliações reais do Google Maps
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.06] text-tinta-900">
              Quem prova,{' '}
              <span className="italic font-normal text-framboesa-500">volta</span> —
              e traz companhia.
            </h2>
          </div>

          {/* Card resumo Double-Bezel */}
          <div className="lg:col-span-5">
            <div className="rounded-[1.75rem] bg-tinta-900/[0.05] p-1.5 ring-1 ring-tinta-900/10">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-[calc(1.75rem-0.375rem)] bg-creme-50 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-3xl font-semibold text-tinta-900">
                      {BUSINESS_INFO.rating}★
                    </span>
                    <StarRow count={5} />
                  </div>
                  <p className="mt-1 text-xs text-tinta-900/70">
                    Média pública em <strong>{BUSINESS_INFO.reviewsCount} avaliações</strong> no Google
                  </p>
                </div>

                <ButtonInButton
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={ArrowUpRight}
                  variant="ghostLight"
                  size="sm"
                >
                  Ver no Google
                </ButtonInButton>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Assimétrico dos 5 Depoimentos Reais */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7">
          {DEPOIMENTOS.map((review, index) => (
            <motion.article
              key={review.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.65,
                delay: shouldReduceMotion ? 0 : index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              className={cn(
                'rounded-[2rem] bg-tinta-900/[0.045] p-1.5 ring-1 ring-tinta-900/8 shadow-[0_20px_45px_-28px_rgba(42,26,18,0.28)]',
                review.spanClass
              )}
            >
              <div className="flex h-full flex-col justify-between rounded-[calc(2rem-0.375rem)] bg-creme-50 p-6 sm:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <StarRow count={review.stars} />
                    <span className="rounded-full bg-caramelo-500/12 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-tinta-900 font-semibold ring-1 ring-caramelo-500/25">
                      {review.highlight}
                    </span>
                  </div>

                  <div className="relative">
                    <Quotes
                      aria-hidden="true"
                      className="w-7 h-7 text-caramelo-500/35 mb-2"
                      weight="fill"
                    />
                    <blockquote className="font-display text-lg sm:text-xl text-tinta-900 leading-relaxed font-normal">
                      “{review.quote}”
                    </blockquote>
                  </div>
                </div>

                <footer className="pt-4 border-t border-tinta-900/10 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-sm text-tinta-900">
                      {review.author}
                    </p>
                    <p className="text-xs text-tinta-900/60">
                      Avaliação verificada no Google
                    </p>
                  </div>
                  <span className="font-display text-sm font-semibold text-framboesa-500">
                    ★{review.stars}
                  </span>
                </footer>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
