import { InstagramLogo, MapPin, Phone, WhatsappLogo } from '@phosphor-icons/react';
import { BRAND_ASSETS, BUSINESS_INFO, FOTOS } from '../data/siteData';
import { ButtonInButton } from './ButtonInButton';

export function Footer() {
  return (
    <footer className="relative bg-espresso-950 text-tinta-100 pt-24 pb-28 sm:pb-16 overflow-hidden">
      <div aria-hidden="true" className="vignette-espresso absolute inset-0 z-0 opacity-75" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* CTA Final de Conversão */}
        <div className="rounded-[2.25rem] bg-white/[0.05] p-2 ring-1 ring-manteiga-200/18 shadow-[0_32px_70px_-24px_rgba(0,0,0,0.85)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-[calc(2.25rem-0.5rem)] bg-espresso-900 p-6 sm:p-10 lg:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-block rounded-full bg-framboesa-500/20 px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] text-manteiga-200 font-medium ring-1 ring-framboesa-500/40">
                Seu café da tarde começa aqui
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.06] text-tinta-100">
                Bateu vontade de cuca, torta de frango ou{' '}
                <span className="italic font-normal text-caramelo-400">
                  folhado de maçã
                </span>
                ?
              </h2>
              <p className="text-base sm:text-lg text-tinta-100/80 font-light max-w-xl">
                Chame nossa equipe no WhatsApp para saber o que acabou de sair da
                fornada ou passe na Rua 7 de Setembro, 319.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-1">
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
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={MapPin}
                  variant="ghostDark"
                  size="lg"
                >
                  Como chegar no Maps
                </ButtonInButton>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[1.75rem] bg-white/[0.05] p-1.5 ring-1 ring-manteiga-200/15">
                <div
                  data-cursor="ver"
                  className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] aspect-[4/3] bg-cacau-800"
                >
                  <img
                    src={FOTOS[9]}
                    alt="Doces, tortas e salgados artesanais da Doce & Companhia em Rio do Sul"
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé Institucional */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-manteiga-200/12">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <span className="h-12 w-12 rounded-full bg-creme-50 p-0.5 ring-1 ring-caramelo-400/35 overflow-hidden shrink-0">
                <img
                  src={BRAND_ASSETS.logo}
                  alt={BRAND_ASSETS.logoAlt}
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full rounded-full object-cover"
                />
              </span>
              <div>
                <p className="font-display text-xl font-semibold text-tinta-100">
                  {BUSINESS_INFO.name}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-caramelo-400">
                  {BUSINESS_INFO.subtitle}
                </p>
              </div>
            </div>

            <p className="text-sm text-tinta-100/72 leading-relaxed max-w-sm">
              Confeitaria e cafeteria tradicional em Rio do Sul – SC. Nota{' '}
              {BUSINESS_INFO.rating}★ com mais de {BUSINESS_INFO.reviewsCount}{' '}
              avaliações públicas no Google.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-caramelo-400 font-medium">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm text-tinta-100/80">
              <li>
                <a href="#camadas" className="hover:text-caramelo-400 transition-colors">
                  Vitrine em Camadas
                </a>
              </li>
              <li>
                <a href="#queridinhos" className="hover:text-caramelo-400 transition-colors">
                  Queridinhos da Casa
                </a>
              </li>
              <li>
                <a href="#historia" className="hover:text-caramelo-400 transition-colors">
                  História &amp; Dona Edith
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-caramelo-400 transition-colors">
                  Quem prova, volta
                </a>
              </li>
              <li>
                <a href="#visite-nos" className="hover:text-caramelo-400 transition-colors">
                  Endereço &amp; Horários
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-caramelo-400 font-medium">
              Contato &amp; Localização
            </h3>
            <div className="space-y-2.5 text-sm text-tinta-100/80">
              <p>{BUSINESS_INFO.addressFull}</p>
              <p className="text-manteiga-200/80">{BUSINESS_INFO.hoursSummary}</p>
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  aria-label="Ligar para (47) 3521-1227"
                  className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] px-4 py-2 text-xs font-medium ring-1 ring-manteiga-200/15 transition-colors"
                >
                  <Phone className="w-4 h-4 text-caramelo-400" weight="light" />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram oficial da Doce & Companhia"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.12] ring-1 ring-manteiga-200/15 transition-colors"
                >
                  <InstagramLogo className="w-4 h-4 text-caramelo-400" weight="light" />
                </a>
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir localização no Google Maps"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.12] ring-1 ring-manteiga-200/15 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-caramelo-400" weight="light" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-tinta-100/55">
          <p>
            © {new Date().getFullYear()} {BUSINESS_INFO.name} · Todos os direitos
            reservados.
          </p>
          <p>Rua 7 de Setembro, 319 — Jardim América, Rio do Sul – SC</p>
        </div>
      </div>
    </footer>
  );
}
