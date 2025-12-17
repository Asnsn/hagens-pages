import Image from 'next/image';

export const PartnerLogos = () => {
  return (
    <div className="flex items-center justify-center rounded-lg bg-white p-4 shadow-sm h-full">
      <Image 
        src="https://firebasestudio.ai/api/image-proxy/user-images/7f8f9038-f9e4-44ed-99b3-4f9e16cdb3e2" 
        alt="Logos dos parceiros: Google Partner Premier 2024, Meta Business Partner, Infobip, Buzzmonitor Partners" 
        width={350} 
        height={252}
        className="object-contain" 
      />
    </div>
  );
};
