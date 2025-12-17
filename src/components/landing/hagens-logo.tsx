import { cn } from "@/lib/utils";

export const HagensLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn("text-white", className)}
      viewBox="0 0 130 25"
      height="25"
      width="130"
      xmlns="http://www.w3.org/2000/svg"
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
      <text x="12" y="19" className="logo-text">
        agens
      </text>
      <path
        d="M0 0 H 10 V 25 H 0 V 0 Z M 2 11 H 8 V 14 H 2 Z"
        fill="currentColor"
      />
      <path d="M 0 11 H 2 V 14 H 0 Z" fill="hsl(var(--accent))" />
    </svg>
  );
};
