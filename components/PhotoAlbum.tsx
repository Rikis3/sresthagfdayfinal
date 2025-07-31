'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const cuteTexts = [
  'You light up my world ✨',
  'Forever yours, love 💕',
  'Sweetest moments 🌸',
  'You + Me = ❤️',
  'Always in my heart 💖',
  'Together is my favorite place 🏡',
  'My sunshine on cloudy days ☀️',
  'Every day with you is magic ✨',
  'Love you to the moon and back 🌙',
  'You make my heart smile 😊',
  "You're my endless adventure 🗺️",
  'Our story is my favorite 📖',
  'With you, forever feels perfect ❤️',
];

const photoUrls = [
  'https://drive.google.com/file/d/1paryYM8pSz1JnQzPbK-m1I4R6AzirJtv/view?usp=sharing',
  'https://drive.google.com/file/d/1paryYM8pSz1JnQzPbK-m1I4R6AzirJtv/view?usp=sharing',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=533&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=533&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=300&h=533&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=533&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=533&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=300&h=533&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=533&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=533&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=533&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=533&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=300&h=533&fit=crop&crop=face',
];

const oceanGradients = [
  'linear-gradient(135deg, #60A5FA 0%, #8B5CF6 50%, #6366F1 100%)',
  'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #6D28D9 100%)',
  'linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #8B5CF6 100%)',
  'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #4F46E5 100%)',
  'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 50%, #8B5CF6 100%)',
  'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
  'linear-gradient(135deg, #F7971E 0%, #FFD200 100%)',
  'linear-gradient(135deg, #5651F7 0%, #F35588 100%)',
  'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
  'linear-gradient(135deg, #43C6AC 0%, #191654 100%)',
  'linear-gradient(135deg, #FDAE61 0%, #FEE08B 100%)',
  'linear-gradient(135deg, #38ef7d 0%, #11998e 100%)',
  'linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)',
];

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function PhotoAlbum() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Animate the parent background for CoverFlow transitions
  useEffect(() => {
    setIsClient(true);
    if (!isClient) return;
    const bg = document.querySelector(
      '.dynamic-background'
    ) as HTMLElement | null;
    if (bg) {
      bg.style.transition = 'background 0.7s cubic-bezier(.44,1.43,.49,.99)';
      bg.style.background = oceanGradients[mod(currentIndex, photoUrls.length)];
    }
  }, [currentIndex, isClient]);

  // Debounced scroll (desktop)
  const scrollLock = useRef(false);
  const onWheel = (e: React.WheelEvent) => {
    const amt = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (!scrollLock.current && Math.abs(amt) > 12) {
      setCurrentIndex((i) => mod(i + (amt > 0 ? 1 : -1), photoUrls.length));
      scrollLock.current = true;
      setTimeout(() => {
        scrollLock.current = false;
      }, 400);
    }
  };

  // Swipe (mobile)
  const tX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    tX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (tX.current == null) return;
    const diff = tX.current - e.changedTouches[0].clientX;
    if (diff > 24) setCurrentIndex((i) => mod(i + 1, photoUrls.length));
    else if (diff < -24) setCurrentIndex((i) => mod(i - 1, photoUrls.length));
    tX.current = null;
  };

  if (!isClient) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-40 min-h-screen"
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
    >
      {/* Caption */}
      <motion.h2
        key={currentIndex}
        className="text-2xl md:text-4xl font-bold text-white px-8 py-3 bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg max-w-xl mx-auto mb-8 transition-all"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.56,
          type: 'spring',
          stiffness: 210,
          damping: 20,
        }}
      >
        {cuteTexts[currentIndex]}
      </motion.h2>

      {/* Globe-style CoverFlow */}
      <div className="relative flex items-center justify-center w-full max-w-3xl h-[380px] md:h-[430px]">
        {photoUrls.map((url, i) => {
          // Compute offset from center slide
          const rel = mod(i - currentIndex, photoUrls.length);
          let x = 0,
            s = 1,
            o = 1,
            blur = '';
          if (rel === 0) {
            x = 0;
            s = 1;
            o = 1;
            blur = 'none';
          } else if (rel === 1 || rel === -photoUrls.length + 1) {
            x = 125;
            s = 0.93;
            o = 0.68;
            blur = 'blur(2px)';
          } else if (rel === photoUrls.length - 1 || rel === -1) {
            x = -125;
            s = 0.93;
            o = 0.68;
            blur = 'blur(2px)';
          } else if (rel === 2 || rel === -photoUrls.length + 2) {
            x = 210;
            s = 0.86;
            o = 0.28;
            blur = 'blur(6px)';
          } else if (rel === photoUrls.length - 2 || rel === -2) {
            x = -210;
            s = 0.86;
            o = 0.28;
            blur = 'blur(6px)';
          } else {
            x = rel < photoUrls.length / 2 ? -360 : 360;
            s = 0.7;
            o = 0;
          }
          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                zIndex: rel === 0 ? 10 : 10 - Math.abs(rel),
                x: `calc(-50% + ${x}px)`,
                y: '-50%',
                scale: s,
                opacity: o,
                filter: blur,
                pointerEvents: rel === 0 ? 'auto' : 'none',
                boxShadow:
                  rel === 0
                    ? '0 10px 38px 0 rgba(40, 40, 85, 0.22), 0 2px 18px rgba(0,0,0,0.12)'
                    : '0 1.8px 11px rgba(0,0,0,0.11)',
                border: rel === 0 ? '2.5px solid #fff' : 'none',
                transition: 'all 0.57s cubic-bezier(.35,1.43,.57,.99)',
              }}
              animate
            >
              <img
                src={url}
                alt=""
                draggable={false}
                className="rounded-xl h-64 md:h-[340px] aspect-[3/5] object-cover shadow-md select-none pointer-events-none"
                style={{ userSelect: 'none', borderRadius: '1.1rem' }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center space-x-2 mt-8">
        {photoUrls.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              i === currentIndex ? 'bg-white shadow' : 'bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* YouTube Link */}
      <div className="mt-8">
        <a
          href="https://www.youtube.com/watch?v=u9raS7-NisU"
          target="_blank"
          rel="noopener noreferrer"
          className="play-song-anim block bg-red-600 text-white px-6 py-3 rounded-lg relative overflow-hidden font-semibold 
             shadow hover:bg-red-700 transition-all backdrop-blur-lg"
        >
          <span className="relative z-10">🎵 Play Our Song</span>
          {/* The animated gradient overlay (covers entire button) */}
          <span className="absolute inset-0 pointer-events-none shimmer"></span>
        </a>
      </div>

      {/* Photo Counter */}
      <div className="mt-4 text-white/80 text-lg">
        {currentIndex + 1} / {photoUrls.length}
      </div>
    </div>
  );
}
