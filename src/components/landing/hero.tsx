import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Innovate, Create, Elevate</span>
          <span className="block text-primary">Your Digital Presence</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground sm:max-w-xl md:text-xl">
          We are a full-service agency that blends marketing expertise with
          cutting-edge technology to deliver outstanding results.
        </p>
        <div className="mx-auto mt-10 flex max-w-sm flex-col gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <Link href="#contact">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#services">Our Services</Link>
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div
          className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,var(--accent),transparent)]"
          style={{ '--accent': 'hsl(265 100% 68% / 0.2)' } as React.CSSProperties}
        ></div>
      </div>
    </section>
  );
}
