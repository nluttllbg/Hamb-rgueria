import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'header' | 'outline' | 'ghost';

interface BaseProps {
  variant?: ButtonVariant;
  fullWidthMobile?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-[#E8463E] text-white h-12 px-7 text-[15px] hover:bg-[#D23A33] active:bg-[#B8302A] focus-visible:ring-[#F4B41C]',
  header:
    'bg-[#F4B41C] text-[#7A1612] h-10 px-[22px] text-[14px] hover:bg-[#E5A40F] active:bg-[#D4950A] focus-visible:ring-[#231E1C]',
  outline:
    'bg-transparent text-[#F7F1E3] border-[1.5px] border-[#F4B41C] h-10 px-[22px] text-[14px] hover:bg-[#F4B41C]/10 active:bg-[#F4B41C]/20 focus-visible:ring-[#F4B41C]',
  ghost:
    'bg-transparent text-[#231E1C] border-[1.5px] border-[#231E1C] h-11 px-6 text-[14px] hover:bg-[#231E1C]/5 active:bg-[#231E1C]/10 focus-visible:ring-[#F4B41C]',
};

export function Button({
  variant = 'primary',
  fullWidthMobile = false,
  icon,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const baseClasses = [
    'inline-flex items-center justify-center gap-2 rounded-full',
    'font-extrabold uppercase tracking-[0.06em] leading-none whitespace-nowrap shrink-0',
    'transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]',
    'hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(35,30,28,0.14)]',
    'active:translate-y-0',
    'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
    'disabled:opacity-40 disabled:pointer-events-none',
    'cursor-pointer select-none',
    fullWidthMobile ? 'w-full sm:w-auto' : '',
    VARIANT_CLASSES[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest;
    return (
      <a href={href} className={baseClasses} {...anchorProps}>
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? 'button'} className={baseClasses} {...buttonProps}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
