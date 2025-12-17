import Image from 'next/image';

export const PartnerLogos = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center justify-center rounded-lg border border-black/10 bg-white p-4 shadow-sm">
        <Image src="/logos/google-partner.svg" alt="Google Partner Premier 2024" width={150} height={70} className="object-contain" />
      </div>
      <div className="flex items-center justify-center rounded-lg border border-black/10 bg-white p-4 shadow-sm">
        <Image src="/logos/meta-partner.svg" alt="Meta Business Partner" width={150} height={70} className="object-contain" />
      </div>
      <div className="flex items-center justify-center rounded-lg border border-black/10 bg-white p-4 shadow-sm">
        <Image src="/logos/infobip-partner.svg" alt="Infobip Partner" width={150} height={70} className="object-contain" />
      </div>
      <div className="flex items-center justify-center rounded-lg border border-black/10 bg-white p-4 shadow-sm">
        <Image src="/logos/buzzmonitor-partner.svg" alt="Buzzmonitor Partners" width={150} height={70} className="object-contain" />
      </div>
    </div>
  );
};
