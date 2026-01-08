'use client';

import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FloatingWhatsAppButton() {
  const phoneNumber = '19982836686';
  const message = 'Ol\u00e1! Gostaria de fazer um or\u00e7amento com a Control Alt Dev.';

  const openWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Button
      onClick={openWhatsApp}
      className="fixed bottom-8 right-8 z-50 h-16 w-16 rounded-full bg-green-500 text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-green-600"
    >
      <MessageCircle size={32} />
    </Button>
  );
}
