'use client';
import { useState, useEffect } from 'react';
import LiquidText from '../components/LiquidText';
import PhotoAlbum from '../components/PhotoAlbum';

export default function Home() {
  const [stage, setStage] = useState('intro');
  const [showAlbum, setShowAlbum] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('glow'), 1500);
    const timer2 = setTimeout(() => setStage('transition'), 4500);
    const timer3 = setTimeout(() => {
      setStage('album');
      setShowAlbum(true);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        className={`absolute inset-0 z-0 transition-all duration-1000 ease-in-out dynamic-background ${
          stage === 'transition' || stage === 'album' ? '' : 'bg-black'
        }`}
        style={{
          background:
            stage === 'transition' || stage === 'album'
              ? 'linear-gradient(135deg, #60A5FA 0%, #8B5CF6 50%, #6366F1 100%)'
              : '#000',
        }}
      />

      {(stage === 'intro' || stage === 'glow') && <LiquidText stage={stage} />}
      {showAlbum && <PhotoAlbum />}

      <style jsx>{`
        .dynamic-background {
          transition: background 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
