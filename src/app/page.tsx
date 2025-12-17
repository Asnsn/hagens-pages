import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Services from '@/components/landing/services';
import ClientShowcase from '@/components/landing/client-showcase';
import Testimonials from '@/components/landing/testimonials';
import AiContentGenerator from '@/components/landing/ai-content-generator';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';
import AnimatedSection from '@/components/landing/animated-section';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <AnimatedSection id="services" className="bg-secondary py-16 sm:py-24">
          <Services />
        </AnimatedSection>
        <AnimatedSection id="projects" className="py-16 sm:py-24">
          <ClientShowcase />
        </AnimatedSection>
        <AnimatedSection id="testimonials" className="bg-secondary py-16 sm:py-24">
          <Testimonials />
        </AnimatedSection>
        <AnimatedSection id="ai-generator" className="py-16 sm:py-24">
          <AiContentGenerator />
        </AnimatedSection>
        <AnimatedSection id="contact" className="bg-secondary py-16 sm:py-24">
          <Contact />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
