import { motion, useReducedMotion } from 'motion/react';
import {
  ChatCircleText,
  CheckCircle,
  Clock,
  Phone,
  WhatsappLogo,
} from '@phosphor-icons/react';
import { BUSINESS_INFO, FOTOS } from '../data/siteData';
import { ButtonInButton } from './ButtonInButton';

const STEPS = [
  {
    num: '01',
    title: 'Mande um oi no WhatsApp',
    text: 'Clique no botão framboesa para abrir nosso atendimento direto sem formulários.',
  },
  {
    num: '02',
    title: 'Confirme os sabores do dia',
    text: 'Veja quais cucas, fatias de bolo, folhados e tortas salgadas acabaram de sair.',
  },
  {
    num: '03',
    title: 'Retire rápido, sem fila',
    text: 'Seu pedido fica separado na hora certa para uma parada ágil na Rua 7 de Setembro.',
  },
];

export function OrderWithoutLineSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="pedir-sem-fila"
      className="relative bg-cacau-800 text-tinta-100 py-24 sm:py-32 border-y border-manteiga-200/12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] bg-white/[0.04] p-2 ring-1 ring-manteiga-200/15 shadow-[0_28px_65px_-25px_rgba(0,0,0,0.75)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center rounded-[calc(2.25rem-0.5rem)] bg-espresso-950/90 p-6 sm:p-10 lg:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            {/* Texto e Transparência Estratégica */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-framboesa-500/18 px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] text-manteiga-200 font-medium ring-1 ring-framboesa-500/35">
                <Clock className="w-3.5 h-3.5 text-caramelo-400" weight="light" />
                Sem esperar nos horários de pico
              </span>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.8rem] font-semibold tracking-tight leading-[1.08] text-tinta-100">
                Tão querida no bairro que{' '}
                <span className="italic font-normal text-caramelo-400">
                  costuma ter movimento
                </span>{' '}
                — peça antes pelo WhatsApp.
              </h2>

              <p className="text-base sm:text-lg text-tinta-100/80 font-light leading-relaxed max-w-2xl">
                Nossa casa no Jardim América é aconchegante, tem giro constante de
                fornada e vagas na rua. Nos fins de tarde mais movimentados, combinar
                seu pedido antecipadamente pelo WhatsApp garante cucas, tortas e
                salgados separados para você retirar sem pressa e sem espera.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {STEPS.map((step) => (
                  <div
                    key={step.num}
                    className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-manteiga-200/12 space-y-1.5"
                  >
                    <span className="font-display text-sm font-semibold text-caramelo-400">
                      {step.num}
                    </span>
                    <h3 className="font-medium text-sm text-tinta-100">
                      {step.title}
                    </h3>
                    <p className="text-xs text-tinta-100/70 leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <ButtonInButton
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={WhatsappLogo}
                  variant="primary"
                  size="lg"
                >
                  Pedir pelo WhatsApp agora
                </ButtonInButton>

                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2 min-h-[52px] rounded-full bg-white/[0.05] hover:bg-white/[0.1] px-5 text-sm font-medium text-tinta-100 ring-1 ring-manteiga-200/18 transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-caramelo-400" weight="light" />
                  <span>Ligar: {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </motion.div>

            {/* Card Visual Lateral */}
            <div className="lg:col-span-5">
              <div className="rounded-[2rem] bg-white/[0.05] p-1.5 ring-1 ring-manteiga-200/15">
                <div className="overflow-hidden rounded-[calc(2rem-0.375rem)] bg-espresso-900">
                  <div data-cursor="ver" className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={FOTOS[7]}
                      alt="Bolos e doces prontos para retirada na Doce & Companhia"
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-transparent to-transparent"
                    />
                  </div>
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-medium text-pistache-400">
                      <CheckCircle className="w-4 h-4" weight="fill" />
                      <span>Atendimento humano e direto pela equipe da casa</span>
                    </div>
                    <p className="text-sm text-tinta-100/80 leading-relaxed">
                      Dúvida sobre qual sabor de cuca saiu por último ou quer reservar
                      uma torta de frango inteira? Nossa equipe responde pelo
                      WhatsApp.
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs text-caramelo-400">
                      <ChatCircleText className="w-4 h-4" weight="light" />
                      <span>WhatsApp oficial: {BUSINESS_INFO.phoneDisplay}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
