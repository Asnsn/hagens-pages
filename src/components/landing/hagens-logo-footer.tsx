import { cn } from '@/lib/utils';

export const HagensLogoFooter = ({ className }: { className?: string }) => {
  return (
    <div className={cn('text-black', className)}>
      <svg
        viewBox="0 0 130 25"
        height="25"
        width="130"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
      >
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap');
            .logo-text {
              font-family: 'Space Grotesk', sans-serif;
              font-weight: 700;
              font-size: 24px;
              fill: currentColor;
            }
          `}
        </style>
        <text x="30" y="19" className="logo-text">
          agens
        </text>
        <path
          d="M0 0 H 22 V 25 H 17 V 14 H 5 V 25 H 0 V 0 H 5 V 11 H 17 V 0 H 22 Z"
          fill="currentColor"
        />
        <path d="M5 11 H 17 V 14 H 5 Z" fill="hsl(var(--accent))" />
      </svg>
      <div className="mt-2 bg-black text-white py-2 px-4 text-center tracking-widest text-sm font-bold">
        THINK. BUILD. DELIVER.
      </div>
    </div>
  );
};
