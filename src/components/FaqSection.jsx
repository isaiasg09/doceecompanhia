import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Plus } from '@phosphor-icons/react';
import { FAQ_ITEMS } from '../data/siteData';
import { cn } from '../utils/cn';

export function FaqSection() {
  const [openId, setOpenId] = useState(FAQ_ITEMS[0].id);
  const shouldReduceMotion = useReducedMotion();

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="duvidas"
      className="relative bg-creme-100 text-tinta-900 py-24 sm:py-32 border-t border-tinta-900/8"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <span className="inline-block rounded-full bg-tinta-900/[0.06] px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] text-framboesa-500 font-semibold ring-1 ring-tinta-900/10">
            Dúvidas frequentes
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.08] text-tinta-900">
            Tudo o que você precisa saber antes de{' '}
            <span className="italic font-normal text-framboesa-500">
              passar por aqui
            </span>
            .
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-btn-${item.id}`;

            return (
              <div
                key={item.id}
                className="rounded-[1.75rem] bg-tinta-900/[0.045] p-1.5 ring-1 ring-tinta-900/10"
              >
                <div className="rounded-[calc(1.75rem-0.375rem)] bg-creme-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] overflow-hidden">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-5 text-left cursor-pointer min-h-[60px]"
                    >
                      <span className="font-display text-lg sm:text-xl font-medium text-tinta-900 leading-snug">
                        {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-creme-100 text-tinta-900 ring-1 ring-tinta-900/12 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
                          isOpen ? 'rotate-45 bg-espresso-950 text-tinta-100' : ''
                        )}
                      >
                        <Plus className="w-4 h-4" weight="regular" />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.28,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="px-5 sm:px-7 pb-6 pt-1"
                      >
                        <p className="text-sm sm:text-base text-tinta-900/80 leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
