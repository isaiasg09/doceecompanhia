import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Gera URL do WhatsApp com mensagem pré-preenchida personalizada ou padrão.
 */
export function buildWhatsAppUrl(itemNome) {
  const base = 'https://wa.me/554735211227';
  const text = itemNome
    ? `Olá! Vim pelo site da Doce & Companhia e gostaria de consultar e pedir: ${itemNome}.`
    : 'Olá! Vim pelo site da Doce & Companhia e gostaria de fazer um pedido.';
  return `${base}?text=${encodeURIComponent(text)}`;
}

/**
 * Calcula dinamicamente o status de atendimento no fuso horário America/Sao_Paulo,
 * respeitando: Seg–Sex 08:00–19:00 · Sáb 08:00–18:00 · Dom Fechado.
 */
export function getOpenStatus(now = new Date()) {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon';
    const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 10);
    const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
    const totalMinutes = hour * 60 + minute;

    if (weekday === 'Sun') {
      return {
        isOpen: false,
        dayKey: 'Dom',
        label: 'Abre segunda às 08h',
        shortLabel: 'Fechado hoje',
        scheduleToday: 'Domingo · Fechado',
      };
    }

    const isSaturday = weekday === 'Sat';
    const openMin = 8 * 60; // 08:00
    const closeMin = isSaturday ? 18 * 60 : 19 * 60;
    const closeText = isSaturday ? '18h' : '19h';

    if (totalMinutes >= openMin && totalMinutes < closeMin) {
      return {
        isOpen: true,
        dayKey: weekday,
        label: `Aberto agora · até ${closeText}`,
        shortLabel: 'Aberto agora',
        scheduleToday: isSaturday ? 'Sábado · 08:00–18:00' : 'Seg–Sex · 08:00–19:00',
      };
    }

    if (totalMinutes < openMin) {
      return {
        isOpen: false,
        dayKey: weekday,
        label: 'Abre hoje às 08:00',
        shortLabel: 'Abre às 08h',
        scheduleToday: isSaturday ? 'Sábado · 08:00–18:00' : 'Seg–Sex · 08:00–19:00',
      };
    }

    // Após fechamento
    return {
      isOpen: false,
      dayKey: weekday,
      label: isSaturday ? 'Abre segunda às 08h' : 'Abre amanhã às 08h',
      shortLabel: 'Fechado agora',
      scheduleToday: isSaturday ? 'Sábado · 08:00–18:00' : 'Seg–Sex · 08:00–19:00',
    };
  } catch {
    return {
      isOpen: true,
      dayKey: 'Mon',
      label: 'Aberto agora',
      shortLabel: 'Aberto agora',
      scheduleToday: 'Seg–Sex 08:00–19:00 · Sáb 08:00–18:00',
    };
  }
}
