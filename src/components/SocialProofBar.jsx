import { Heart, MapPin, Sparkle, Star } from '@phosphor-icons/react';
import { BUSINESS_INFO } from '../data/siteData';

const PROOF_ITEMS = [
  {
    icon: Star,
    label: `${BUSINESS_INFO.rating}★ no Google`,
    sub: `+${BUSINESS_INFO.reviewsCount} avaliações reais`,
    filled: true,
  },
  {
    icon: Sparkle,
    label: 'Cucas, Tortas & Folhados',
    sub: 'Vitrine farta de doces e salgados',
  },
  {
    icon: Heart,
    label: 'Alma da Dona Edith',
    sub: 'Atendimento cordial que vira hábito',
  },
  {
    icon: MapPin,
    label: 'Jardim América · Rio do Sul',
    sub: 'Rua 7 de Setembro, 319',
  },
];

export function SocialProofBar() {
  return (
    <section
      aria-label="Destaques de confiança da Doce & Companhia"
      className="relative bg-cacau-800 border-y border-manteiga-200/12 py-6 sm:py-7 text-tinta-100"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {PROOF_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3.5 rounded-2xl bg-espresso-950/35 px-4 py-3 ring-1 ring-manteiga-200/10"
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-caramelo-500/15 text-caramelo-400 ring-1 ring-caramelo-400/25"
                >
                  <Icon
                    className="w-5 h-5"
                    weight={item.filled ? 'fill' : 'light'}
                  />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-sm sm:text-base font-semibold text-tinta-100 leading-tight">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs text-manteiga-200/75 leading-snug">
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
