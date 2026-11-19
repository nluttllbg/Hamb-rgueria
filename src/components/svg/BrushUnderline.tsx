export function BrushUnderline({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Yellow dry-brush stroke */}
      <path
        d="M4 11.5C48 8.2 134 7.8 214 5.5C216.5 5.4 218 7.5 215.5 8.8C178 11.8 82 12.6 7 14.5C3.5 14.6 1.5 11.7 4 11.5Z"
        fill="#F4B41C"
      />
      <path
        d="M12 9.5C55 7.5 148 6.8 206 4.8"
        stroke="#F4B41C"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="140 6 24 4"
      />
      {/* Thinner coral-red underline following upward curve */}
      <path
        d="M16 17.5C74 15.2 149 14.2 212 10.6"
        stroke="#E8463E"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
