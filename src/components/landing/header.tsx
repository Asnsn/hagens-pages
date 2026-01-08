'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { gsap } from 'gsap';
import { useTransitionContext } from '@/context/TransitionContext';

const navLinks = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contatos' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { playTransition } = useTransitionContext();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playTransition(href);
  };
  
  const handleMobileLinkClick = (href: string) => {
    setIsMenuOpen(false);
    playTransition(href);
  };

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const links = gsap.utils.toArray<HTMLElement>('.nav-link-item');
    const navBounds = nav.getBoundingClientRect();
    
    const onMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      
      links.forEach(link => {
        const linkBounds = link.getBoundingClientRect();
        const linkCenterX = linkBounds.left + linkBounds.width / 2;
        
        const distance = Math.abs(mouseX - linkCenterX);
        
        const scale = gsap.utils.mapRange(0, navBounds.width / 2, 1.5, 1, distance);
        const y = gsap.utils.mapRange(0, navBounds.width / 2, -10, 0, distance);

        gsap.to(link, {
          scale: scale,
          y: y,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    };

    const onMouseLeave = () => {
      gsap.to(links, {
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
        stagger: 0.05
      });
    };

    nav.addEventListener('mousemove', onMouseMove);
    nav.addEventListener('mouseleave', onMouseLeave);

    // Initial animation for links appearing
    gsap.fromTo(
      links,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.5,
        ease: 'power3.out',
      }
    );

    return () => {
      nav.removeEventListener('mousemove', onMouseMove);
      nav.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={(e) => handleLinkClick(e, '/')}>
          <div className="text-2xl font-bold">
            <span>Control </span>
            <span className="text-accent">Alt</span>
            <span> Dev</span>
          </div>
        </Link>

        <nav ref={navRef} className="hidden items-center gap-8 md:flex">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="nav-link-item group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"
            >
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5 text-muted-foreground" />
            <span className="sr-only">Buscar</span>
          </Button>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <div className="flex flex-col gap-6 p-6">
                <a
                  href="/"
                  className="mb-6 flex items-center gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMobileLinkClick('/');
                  }}
                >
                  <div className="text-2xl font-bold">
                    <span>Control </span>
                    <span className="text-accent">Alt</span>
                    <span> Dev</span>
                  </div>
                </a>
                <nav className="flex flex-col gap-4">
                  {navLinks.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMobileLinkClick(link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                 <Button variant="ghost" size="icon" className="mt-4">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Buscar</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
