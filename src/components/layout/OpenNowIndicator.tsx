import { useEffect, useState } from 'react';
import { getOpeningStatus, type OpeningStatus } from '../../utils/hours';

interface OpenNowIndicatorProps {
  className?: string;
}

export function OpenNowIndicator({ className = '' }: OpenNowIndicatorProps) {
  const [status, setStatus] = useState<OpeningStatus>(() => getOpeningStatus());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStatus(getOpeningStatus());
    }, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.02em] ${className}`}
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full shrink-0 ${
          status.isOpen ? 'bg-[#2E9E5B]' : 'bg-[#6B625C]'
        }`}
      />
      <span className={status.isOpen ? 'text-[#F7F1E3]' : 'text-[#E9DFCC]/75'}>
        {status.label}
      </span>
      <span className="text-[#E9DFCC]/55" aria-hidden="true">
        ·
      </span>
      <span className="text-[#E9DFCC]/75">{status.detail}</span>
    </span>
  );
}
