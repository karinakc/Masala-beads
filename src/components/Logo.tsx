export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-label="Masala Beads">
      <defs>
        <linearGradient id="mbring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.15 40)" />
          <stop offset="50%" stopColor="oklch(0.75 0.13 25)" />
          <stop offset="100%" stopColor="oklch(0.55 0.18 350)" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="92" fill="none" stroke="url(#mbring)" strokeWidth="4" />
      <circle cx="100" cy="100" r="82" fill="oklch(0.99 0.005 80)" />
      {/* Mountains */}
      <path
        d="M28 118 L58 78 L82 108 L108 68 L142 112 L172 82 L172 128 L28 128 Z"
        fill="oklch(0.86 0.06 25)"
      />
      <text
        x="100"
        y="152"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontSize="18"
        letterSpacing="2"
        fill="oklch(0.82 0.07 25)"
        fontWeight="600"
      >
        MASALA BEADS
      </text>
    </svg>
  );
}
