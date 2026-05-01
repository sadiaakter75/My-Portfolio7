"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        document.body.style.overflow = '';
      }
    });

    // 1. Initial delay for the bounce animation to play
    tl.to({}, { duration: 2.5 });

    // 2. Fade out the loader
    tl.to(loaderRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "power2.inOut"
    });

    // 3. Animate panels out (reveal the site)
    tl.to(".loading-panel-left", {
      y: "-100%",
      duration: 1.2,
      ease: "expo.inOut"
    }, "-=0.2");

    tl.to(".loading-panel-right", {
      y: "100%",
      duration: 1.2,
      ease: "expo.inOut"
    }, "-=1.2");

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!isLoading) return null;

  return (
    <>
      <style>{`
        .loader-wrapper {
          width: 200px;
          height: 60px;
          position: relative;
          z-index: 10;
        }

        .loader-circle {
          width: 20px;
          height: 20px;
          position: absolute;
          border-radius: 50%;
          background-color: #fff;
          left: 15%;
          transform-origin: 50% 50%;
          will-change: transform;
          animation: circle7124 .5s alternate infinite ease;
        }

        @keyframes circle7124 {
          0% {
            transform: translateY(60px) scaleX(1.7) scaleY(0.4);
          }
          40% {
            transform: translateY(30px) scaleX(1) scaleY(1);
          }
          100% {
            transform: translateY(0%) scaleX(1) scaleY(1);
          }
        }

        .loader-circle:nth-child(2) {
          left: 45%;
          animation-delay: .2s;
        }

        .loader-circle:nth-child(3) {
          left: auto;
          right: 15%;
          animation-delay: .3s;
        }

        .loader-shadow {
          width: 20px;
          height: 4px;
          border-radius: 50%;
          background-color: rgba(255,255,255,0.1);
          position: absolute;
          top: 62px;
          transform-origin: 50%;
          z-index: -1;
          left: 15%;
          filter: blur(1px);
          will-change: transform, opacity;
          animation: shadow046 .5s alternate infinite ease;
        }

        @keyframes shadow046 {
          0% {
            transform: scaleX(1.5);
            opacity: 0.1;
          }
          40% {
            transform: scaleX(1);
            opacity: .7;
          }
          100% {
            transform: scaleX(.2);
            opacity: .4;
          }
        }

        .loader-shadow:nth-child(4) {
          left: 45%;
          animation-delay: .2s
        }

        .loader-shadow:nth-child(5) {
          left: auto;
          right: 15%;
          animation-delay: .3s;
        }
      `}</style>

      <div ref={containerRef} className="fixed inset-0 z-9999 flex items-center justify-center pointer-events-none">
        {/* Background Panels (Initial state: covering the screen) */}
        <div className="absolute inset-0 flex w-full h-full overflow-hidden pointer-events-auto">
          <div className="loading-panel-left w-1/2 h-full bg-zinc-950" style={{ willChange: "transform" }} />
          <div className="loading-panel-right w-1/2 h-full bg-zinc-950" style={{ willChange: "transform" }} />
        </div>

        {/* Loader Content */}
        <div ref={loaderRef} className="loader-wrapper pointer-events-none">
          <div className="loader-circle" />
          <div className="loader-circle" />
          <div className="loader-circle" />
          <div className="loader-shadow" />
          <div className="loader-shadow" />
          <div className="loader-shadow" />
        </div>
      </div>
    </>
  );
}
