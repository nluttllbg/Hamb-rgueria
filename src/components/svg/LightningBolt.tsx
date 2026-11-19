export function LightningBolt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Three thick staggered horizontal speed strokes pointing right */}
      <rect x="6" y="8" width="84" height="16" rx="4" fill="#E0661F" />
      <rect x="26" y="32" width="88" height="16" rx="4" fill="#E0661F" />
      <rect x="14" y="56" width="76" height="16" rx="4" fill="#E0661F" />
    </svg>
  );
}
