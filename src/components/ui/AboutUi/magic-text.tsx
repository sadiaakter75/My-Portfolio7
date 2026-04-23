"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagicTextProps } from "@/types";

export const MagicText: React.FC<MagicTextProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context((self) => {
      const revealElements = self.selector?.('.word-reveal') as HTMLElement[];
      
      if (revealElements && revealElements.length > 0) {
        gsap.to(revealElements, {
          opacity: 1,
          stagger: {
            each: 0.1,
            from: "start"
          },
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "bottom 35%",
            scrub: true,
            fastScrollEnd: true,
            preventOverlaps: true,
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [words]);

  return (
    <div 
      ref={containerRef} 
      className="relative flex flex-wrap justify-end text-right max-w-2xl leading-[1.15] pr-2 md:pr-10 text-black"
    >
      {words.map((word, i) => (
        <span 
          key={i} 
          className="word-span relative mt-[6px] mr-2 text-2xl md:text-4xl font-bold"
        >
          <span className="absolute opacity-10 pointer-events-none" aria-hidden="true">{word}</span>
          <span 
            className="word-reveal opacity-0" 
            style={{ willChange: "opacity, transform", transform: "translateZ(0)" }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
};
