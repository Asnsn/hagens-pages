'use client';

import React, { useRef, useEffect } from 'react';

const ConnectionParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      if (ctx) {
        ctx.fillStyle = 'hsl(0 0% 98%)'; // foreground color from globals.css for light mode
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
            ctx.fillStyle = 'hsl(0 0% 3.9%)'; // background color from globals.css for dark mode
        }
      }
    };

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150,
    };

    window.addEventListener('mousemove', (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;

      constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (!canvas) return;
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        let dx = (mouse.x ?? -1000) - this.x;
        let dy = (mouse.y ?? -1000) - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
          if (this.x < (mouse.x ?? 0) && this.x > this.size * 10) {
            this.x -= 1;
          }
          if (this.x > (mouse.x ?? 0) && this.x < canvas.width - this.size * 10) {
            this.x += 1;
          }
          if (this.y < (mouse.y ?? 0) && this.y > this.size * 10) {
            this.y -= 1;
          }
          if (this.y > (mouse.y ?? 0) && this.y < canvas.height - this.size * 10) {
            this.y += 1;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      if (!canvas) return;
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (window.innerWidth - size * 2) + size * 2;
        let y = Math.random() * (window.innerHeight - size * 2) + size * 2;
        let directionX = Math.random() * 0.4 - 0.2;
        let directionY = Math.random() * 0.4 - 0.2;
        let color = 'hsl(var(--muted-foreground))';
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    function connect() {
        if (!ctx) return;
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance =
            (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) +
            (particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y);
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - distance / 20000;
            const isDark = document.documentElement.classList.contains('dark');
            const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent');
            let [h, s, l] = accentColor.split(' ').map(parseFloat);
            if (isDark) {
                ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${opacityValue * 0.5})`;
            } else {
                 ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${opacityValue * 0.3})`;
            }
            
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    }

    setCanvasSize();
    init();
    animate();

    window.addEventListener('resize', () => {
      setCanvasSize();
      init();
    });

    const handleMouseOut = () => {
        mouse.x = null;
        mouse.y = null;
    }

    window.addEventListener('mouseout', handleMouseOut)


    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', (event: MouseEvent) => {
        mouse.x = event.x;
        mouse.y = event.y;
      });
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 -z-10 w-full h-full" />;
};

export default ConnectionParticles;
