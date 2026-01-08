import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { TransitionProvider } from '@/context/TransitionContext';
import PageTransition from '@/components/landing/page-transition';
import FloatingWhatsAppButton from '@/components/landing/floating-whatsapp-button';

export const metadata: Metadata = {
  title: 'Control Alt Dev | Automate, Integrate, Accelerate.',
  description:
    'Control Alt Dev - Automação com Inteligência Artificial e desenvolvimento de sistemas para transformar suas operações e impulsionar o futuro do seu negócio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased text-foreground">
        <TransitionProvider>
          <PageTransition />
          {children}
          <Toaster />
          <FloatingWhatsAppButton />
        </TransitionProvider>
      </body>
    </html>
  );
}
