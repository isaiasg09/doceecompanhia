import { ArrowUpRight } from '@phosphor-icons/react';
import { cn } from '../utils/cn';

/**
 * Arquitetura Button-in-Button com tensão cinética no círculo do ícone.
 */
export function ButtonInButton({
  href,
  onClick,
  children,
  icon: Icon = ArrowUpRight,
  variant = 'primary',
  size = 'md',
  className,
  target,
  rel,
  ariaLabel,
}) {
  const variantStyles = {
    primary:
      'bg-framboesa-500 hover:bg-framboesa-600 text-tinta-100 ring-1 ring-white/15 shadow-[0_14px_34px_-12px_rgba(184,50,74,0.55)]',
    caramel:
      'bg-caramelo-500 hover:bg-caramelo-400 text-espresso-950 ring-1 ring-espresso-950/15 shadow-[0_14px_34px_-12px_rgba(201,138,60,0.45)]',
    dark:
      'bg-espresso-900 hover:bg-cacau-800 text-tinta-100 ring-1 ring-manteiga-200/20',
    light:
      'bg-creme-50 hover:bg-creme-100 text-tinta-900 ring-1 ring-tinta-900/12',
    ghostDark:
      'bg-white/[0.06] hover:bg-white/[0.11] text-tinta-100 ring-1 ring-manteiga-200/20',
    ghostLight:
      'bg-tinta-900/[0.05] hover:bg-tinta-900/[0.1] text-tinta-900 ring-1 ring-tinta-900/15',
  };

  const circleStyles = {
    primary: 'bg-white/15 text-tinta-100',
    caramel: 'bg-espresso-950/12 text-espresso-950',
    dark: 'bg-caramelo-400/15 text-caramelo-400',
    light: 'bg-tinta-900/8 text-tinta-900',
    ghostDark: 'bg-white/10 text-caramelo-400',
    ghostLight: 'bg-tinta-900/8 text-framboesa-500',
  };

  const sizeStyles = {
    sm: 'pl-4 pr-1.5 py-1.5 text-sm gap-2.5 min-h-[44px]',
    md: 'pl-6 pr-2 py-2 text-sm sm:text-base gap-3 min-h-[48px]',
    lg: 'pl-7 pr-2.5 py-2.5 text-base gap-3.5 min-h-[54px]',
  };

  const circleSizes = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9',
    lg: 'w-10 h-10',
  };

  const sharedClass = cn(
    'group inline-flex items-center justify-between rounded-full font-medium tracking-tight',
    'transition-[transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
    'active:scale-[0.98] cursor-pointer select-none',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const innerContent = (
    <>
      <span className="leading-none">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          'rounded-full flex items-center justify-center shrink-0',
          'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          'group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105',
          circleSizes[size],
          circleStyles[variant]
        )}
      >
        <Icon className="w-4 h-4" weight="regular" />
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={sharedClass}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={sharedClass}
    >
      {innerContent}
    </button>
  );
}
