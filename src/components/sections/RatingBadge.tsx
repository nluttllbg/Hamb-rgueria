import { Star } from '@phosphor-icons/react';
import { business } from '../../data/business';

export function RatingBadge({ className = '' }: { className?: string }) {
  const formattedRating = business.rating.toFixed(1).replace('.', ',');

  return (
    <div
      id="avaliacoes"
      data-hero-animate
      className={`inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-[14px] py-2 text-[12px] font-medium leading-[1.4] tracking-[0.02em] text-[#F7F1E3]/80 scroll-mt-24 ${className}`}
    >
      <Star
        size={16}
        weight="fill"
        className="text-[#F4B41C] shrink-0"
        aria-hidden="true"
      />
      <span className="tabular-nums">
        <strong className="font-semibold text-white">{formattedRating}</strong> ·{' '}
        {business.reviews} avaliações no Google
      </span>
    </div>
  );
}
