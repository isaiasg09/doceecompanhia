import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Clock, MapPin, NavigationArrow, Phone } from '@phosphor-icons/react';
import { BRAND_ASSETS, BUSINESS_INFO } from '../data/siteData';
import { cn, getOpenStatus } from '../utils/cn';
import { ButtonInButton } from './ButtonInButton';

export function VisitUsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [status] = useState(() => getOpenStatus());

  return (
    <section
      id="visite-nos"
      className="relative bg-creme-50 text-tinta-900 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Informações da Casa */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-7"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-tinta-900/[0.06] px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] text-framboesa-500 font-semibold ring-1 ring-tinta-900/10">
                <MapPin className="w-3.5 h-3.5" weight="light" />
                Visite nossa casa de chá e café
              </span>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.06] text-tinta-900">
                No coração do{' '}
                <span className="italic font-normal text-framboesa-500">
                  Jardim América
                </span>
                , em Rio do Sul.
              </h2>
            </div>

            {/* Card Double-Bezel com endereço e horários */}
            <div className="rounded-[2rem] bg-tinta-900/[0.045] p-1.5 ring-1 ring-tinta-900/10">
              <div className="rounded-[calc(2rem-0.375rem)] bg-creme-100 p-6 sm:p-7 space-y-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                {/* Endereço */}
                <div className="flex items-start gap-3.5">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-espresso-950 text-caramelo-400"
                  >
                    <MapPin className="w-5 h-5" weight="light" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-tinta-900/60 font-medium">
                      Endereço
                    </p>
                    <p className="mt-1 font-medium text-base text-tinta-900 leading-snug">
                      {BUSINESS_INFO.addressFull}
                    </p>
                    <p className="mt-1 text-xs text-tinta-900/70">
                      Estacionamento na rua · Dica: em horários de pico, adiante seu
                      pedido pelo WhatsApp.
                    </p>
                  </div>
                </div>

                {/* Horários dinâmicos */}
                <div className="pt-5 border-t border-tinta-900/10 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-tinta-900/60 font-medium">
                      <Clock className="w-4 h-4 text-framboesa-500" weight="light" />
                      <span>Horário de atendimento</span>
                    </div>
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
                        status.isOpen
                          ? 'bg-pistache-400/25 text-tinta-900 ring-1 ring-pistache-400/50'
                          : 'bg-caramelo-500/18 text-tinta-900 ring-1 ring-caramelo-500/35'
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          status.isOpen ? 'bg-espresso-950' : 'bg-framboesa-500'
                        )}
                      />
                      {status.label}
                    </span>
                  </div>

                  <dl className="space-y-2">
                    {BUSINESS_INFO.hoursList.map((row) => {
                      const isToday = row.keys.includes(status.dayKey);
                      return (
                        <div
                          key={row.day}
                          className={cn(
                            'flex items-center justify-between rounded-xl px-3.5 py-2 text-sm',
                            isToday
                              ? 'bg-creme-50 ring-1 ring-caramelo-500/35 font-medium text-tinta-900'
                              : 'text-tinta-900/80'
                          )}
                        >
                          <dt className="flex items-center gap-2">
                            <span>{row.day}</span>
                            {isToday && (
                              <span className="text-[10px] uppercase tracking-[0.16em] text-framboesa-500 font-semibold">
                                Hoje
                              </span>
                            )}
                          </dt>
                          <dd className={row.closed ? 'text-framboesa-500 font-medium' : ''}>
                            {row.hours}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>

                {/* Telefone & Maps */}
                <div className="pt-5 border-t border-tinta-900/10 flex flex-wrap items-center gap-3">
                  <ButtonInButton
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={NavigationArrow}
                    variant="dark"
                    size="md"
                  >
                    Traçar rota no Google Maps
                  </ButtonInButton>

                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center gap-2 min-h-[48px] rounded-full bg-creme-50 hover:bg-manteiga-200/45 px-5 text-sm font-medium text-tinta-900 ring-1 ring-tinta-900/15 transition-colors duration-300"
                  >
                    <Phone className="w-4 h-4 text-framboesa-500" weight="light" />
                    <span>{BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fachada Real Iluminada */}
          <div className="lg:col-span-6">
            <div className="rounded-[2.25rem] bg-tinta-900/[0.05] p-2 ring-1 ring-tinta-900/10 shadow-[0_28px_65px_-28px_rgba(42,26,18,0.35)]">
              <div
                data-cursor="ver"
                className="relative overflow-hidden rounded-[calc(2.25rem-0.5rem)] bg-espresso-950 aspect-[16/10]"
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
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-espresso-950/10 to-transparent"
                />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-caramelo-400 font-medium">
                      Fachada real · Rio do Sul
                    </p>
                    <p className="mt-1 font-display text-xl sm:text-2xl text-tinta-100">
                      Doce &amp; Companhia — Casa de Chá e Café
                    </p>
                  </div>
                  <a
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-creme-50 px-4 py-2 text-xs font-semibold text-tinta-900 hover:bg-caramelo-400 transition-colors"
                  >
                    Abrir mapa ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
