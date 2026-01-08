'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed z-50 transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <span role="img" aria-label="alien" style={{ fontSize: '2rem' }}>
        👾
      </span>
    </div>
  );
}
