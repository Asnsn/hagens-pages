'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollToPlugin);

interface TransitionContextType {
  isTransitioning: boolean;
  playTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const playTransition = (href: string) => {
    setIsTransitioning(true);

    setTimeout(() => {
        if (href.startsWith('#')) {
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: href, offsetY: 70 },
                ease: 'power2.inOut',
                onComplete: () => setIsTransitioning(false),
            });
        } else {
            router.push(href);
            // In a full page navigation, the state will reset on the new page
            // so we might not even need to set isTransitioning to false
            setTimeout(() => setIsTransitioning(false), 500); // Failsafe
        }
    }, 1100); // Match animation duration (0.8s + 0.3s)
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, playTransition }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransitionContext = () => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('useTransitionContext must be used within a TransitionProvider');
  }
  return context;
};
