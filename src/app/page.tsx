import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Services from '@/components/landing/services';
import ClientShowcase from '@/components/landing/client-showcase';
import Testimonials from '@/components/landing/testimonials';
import AiContentGenerator from '@/components/landing/ai-content-generator';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Services />
        <ClientShowcase />
        <Testimonials />
        <AiContentGenerator />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
