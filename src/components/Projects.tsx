"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200",
];

export default function InteractiveSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative z-10 w-full bg-zinc-950 text-white pb-32"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 flex flex-col md:flex-row gap-10">
        
        {/* Images Column */}
        <div className="w-full md:w-3/5 grid grid-cols-2 gap-4 md:gap-8">
          {IMAGES.map((src, i) => (
            <div key={i} className="relative w-full aspect-4/5 overflow-hidden group">
              <img 
                src={src || undefined} 
                alt={`Interactive Image ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* Text Column (Sticky) */}
        <div className="w-full md:w-2/5 relative">
          <div 
            ref={textRef}
            className="sticky top-1/3 flex flex-col gap-3 font-sans text-xl md:text-xl leading-relaxed max-w-md mx-auto"
          >
            <h1 className="text-[5vw] md:text-[5vw] font-bold">PROJECTS</h1>
            <p className="opacity-90">
              A selection of our recent work, showcasing practical solutions, clean design, and reliable performance.
            </p>
          </div>
        </div>

      </div>

      {/* Grid Overlay to match hero style subtly */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px)`,
          backgroundSize: '10vw 100%'
        }}
      />
    </section>
  );
}
