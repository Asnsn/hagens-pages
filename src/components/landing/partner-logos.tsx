import Image from 'next/image';

export const PartnerLogos = () => {
  return (
    <div className="flex items-center justify-center rounded-lg bg-white p-4 shadow-sm h-full">
      <Image 
        src="/logos/Logos-Parceiros.png.webp" 
        alt="Logos dos parceiros: Google Partner Premier 2024, Meta Business Partner, Infobip, Buzzmonitor Partners" 
        width={350} 
        height={252}
        className="object-contain" 
      />
    </div>
  );
};
