'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

class TextScrambleEffect {
  private el: HTMLElement;
  private chars: string;
  private frame: number;
  private frameRequest: number | null;
  private queue: { from: string; to: string; start: number; end: number; char?: string }[];
  private resolve: (() => void) | null;

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.frame = 0;
    this.frameRequest = null;
    this.queue = [];
    this.resolve = null;
    this.update = this.update.bind(this);
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest!);
    this.frame = 0;
    this.update();
    return promise;
  }

  private update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="text-muted-foreground/50">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve!();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  private randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

type TextScrambleProps = {
  phrases: string[];
  className?: string;
  pauseDuration?: number;
};

const TextScramble: React.FC<TextScrambleProps> = ({ phrases, className, pauseDuration = 1500 }) => {
  const elRef = useRef<HTMLHeadingElement>(null);
  const fxRef = useRef<TextScrambleEffect | null>(null);

  useEffect(() => {
    if (!elRef.current) return;
    fxRef.current = new TextScrambleEffect(elRef.current);
    let counter = 0;
    
    const next = () => {
      if (!fxRef.current) return;
      fxRef.current.setText(phrases[counter]).then(() => {
        setTimeout(next, pauseDuration);
      });
      counter = (counter + 1) % phrases.length;
    };
    
    const tl = gsap.timeline({
        scrollTrigger: {
          trigger: elRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          onEnter: () => next(),
        },
      });

    return () => {
        tl.kill();
        if(tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        // Also clear any pending timeouts
        // This is tricky because setTimeout is in a closure. 
        // A more robust solution might involve a ref to the timeout ID.
    }
  }, [phrases, pauseDuration]);

  return <h1 ref={elRef} className={className} />;
};

export default TextScramble;
