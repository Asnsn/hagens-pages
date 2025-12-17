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
    
    const setCanvasSize = () => {
        const parent = canvas.parentElement;
        if(parent) {
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
        }
    };
    
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: (canvas.height / 80) * (canvas.width / 80),
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleMouseOut = () => {
        mouse.x = null;
        mouse.y = null;
    }
    canvas.addEventListener('mouseout', handleMouseOut);

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
        
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
              if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                  this.x += 3;
              }
              if (mouse.x > this.x && this.x > this.size * 10) {
                  this.x -= 3;
              }
              if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                  this.y += 3;
              }
              if (mouse.y > this.y && this.y > this.size * 10) {
                  this.y -= 3;
              }
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      if (!canvas) return;
      setCanvasSize();
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .2) - .1;
        let directionY = (Math.random() * .2) - .1;
        let color = document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    function connect() {
        if (!ctx || !canvas) return;
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance =
            ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
            ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
          
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - (distance / 20000);
            let accentHsl = getComputedStyle(document.documentElement).getPropertyValue('--accent');
            let [h,s,l] = accentHsl.split(' ').map(s => parseFloat(s));
            ctx.strokeStyle = `hsla(${h}, ${s}%, ${l}%, ${opacityValue * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    let animationFrameId: number;
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    }
    
    const handleResize = () => {
        cancelAnimationFrame(animationFrameId);
        init();
        animate();
    };

    window.addEventListener('resize', handleResize);

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 -z-10 w-full h-full" />;
};

export default ConnectionParticles;
