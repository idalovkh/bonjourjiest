export function WaveDivider({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
          className="fill-muted/40"
        />
      </svg>
    </div>
  );
}

export function DotPattern({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 -z-10 opacity-[0.03] ${className}`}>
      <svg width="100%" height="100%">
        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" className="fill-foreground" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}
