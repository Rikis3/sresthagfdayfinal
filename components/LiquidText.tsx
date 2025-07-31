'use client';
import { useEffect, useState } from 'react';

interface LiquidTextProps {
  stage: string;
}

export default function LiquidText({ stage }: LiquidTextProps) {
  const [isClient, setIsClient] = useState(false);
  const [text, setText] = useState('happy girlfriends day Sre');

  useEffect(() => {
    setIsClient(true);
    setText('Happy Girlfriend Day Srestha❤️');
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <h1
        className={`
          text-4xl md:text-7xl font-bold text-white text-center px-4
          transition-all duration-1000 ease-in-out
          ${isClient ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
          ${stage === 'glow' ? 'animate-pulse' : ''}
        `}
        style={{
          textShadow:
            stage === 'glow'
              ? '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,108,171,0.6)'
              : 'none',
        }}
        suppressHydrationWarning
      >
        {text}
      </h1>
    </div>
  );
}
