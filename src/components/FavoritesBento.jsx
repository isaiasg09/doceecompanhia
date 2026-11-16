import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { QUERIDINHOS } from '../data/siteData';
import { buildWhatsAppUrl, cn } from '../utils/cn';
import { ButtonInButton } from './ButtonInButton';

const CATEGORIES = ['Todos', 'Doces & Cucas', 'Salgados da Casa', 'Para Acompanhar'];

export function FavoritesBento() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const shouldReduceMotion = useReducedMotion();

  const items =
    activeCategory === 'Todos'
      ? QUERIDINHOS
      : QUERIDINHOS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="queridinhos"
      className="relative bg-creme-50 text-tinta-900 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho + Filtros com layoutId spring pill */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl space-y-4">
            <span className="inline-block rounded-full bg-tinta-900/[0.06] px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] text-framboesa-500 font-semibold ring-1 ring-tinta-900/10">
              Os mais pedidos em Rio do Sul
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.06] text-tinta-900">
              Queridinhos da Casa, escolhidos por quem{' '}
              <span className="italic font-normal text-framboesa-500">
                prova e volta
              </span>
              .
            </h2>
            <p className="text-base sm:text-lg text-tinta-900/75 font-normal max-w-xl">
              Não inventamos promessas: reunimos exatamente os doces, cucas, tortas e
              salgados mais elogiados nas avaliações reais da casa.
            </p>
          </div>

          {/* Tabs acessíveis */}
          <div
            role="tablist"
            aria-label="Filtrar queridinhos da casa por categoria"
            className="inline-flex flex-wrap gap-1.5 rounded-full bg-creme-100 p-1.5 ring-1 ring-tinta-900/10 self-start lg:self-auto"
          >
            {CATEGORIES.map((category) => {
              const selected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 min-h-[40px] cursor-pointer',
                    selected ? 'text-tinta-100' : 'text-tinta-900/75 hover:text-tinta-900'
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="queridinhos-active-tab"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 380, damping: 32 }
                      }
                      className="absolute inset-0 rounded-full bg-espresso-950"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Bento Assimétrico — colapsa para 1 coluna no mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7">
          {items.map((item, idx) => {
            const bentoSpan =
              activeCategory === 'Todos'
                ? item.spanClass
                : items.length === 1
                ? 'lg:col-span-12'
                : 'lg:col-span-6';

            const mediaAspect =
              activeCategory === 'Todos' ? item.aspectClass : 'aspect-[16/10]';

            return (
              <motion.article
                key={item.id}
                layout={!shouldReduceMotion}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.65,
                  delay: shouldReduceMotion ? 0 : Math.min(idx * 0.06, 0.24),
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                className={cn(
                  '@container rounded-[2rem] bg-tinta-900/[0.045] p-1.5 ring-1 ring-tinta-900/8 shadow-[0_22px_50px_-28px_rgba(42,26,18,0.28)]',
                  bentoSpan
                )}
              >
                <div className="group flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] bg-creme-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                  <div
                    data-cursor="ver"
                    className={cn(
                      'relative overflow-hidden bg-manteiga-200',
                      mediaAspect
                    )}
                  >
                    <img
                      src={item.photo}
                      alt={item.alt}
                      width={960}
                      height={720}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-espresso-950/88 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-caramelo-400 font-medium ring-1 ring-manteiga-200/20">
                      {item.tag}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 gap-5">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] uppercase tracking-[0.18em] text-framboesa-500 font-semibold">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-[1.65rem] font-semibold tracking-tight text-tinta-900 leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-sm sm:text-base text-tinta-900/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-tinta-900/10 flex flex-col @sm:flex-row @sm:items-center justify-between gap-3">
                      <p className="text-xs italic text-tinta-900/70 leading-snug max-w-sm">
                        {item.quote}
                      </p>
                      <ButtonInButton
                        href={buildWhatsAppUrl(item.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        icon={WhatsappLogo}
                        variant="primary"
                        size="sm"
                        className="shrink-0 self-start @sm:self-auto"
                      >
                        Pedir este
                      </ButtonInButton>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
