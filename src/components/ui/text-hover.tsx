"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

export type StaggerDirection = "start" | "end" | "center";
export type AnimationT = any;

function splitText(text: string) {
  const characters: string[] = [];
  const words = text.split(" ");
  words.forEach((word, wordIndex) => {
    characters.push(...word.split(""));
    if (wordIndex < words.length - 1) characters.push(" ");
  });
  return { characters };
}

interface TextStaggerHoverProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  staggerDirection?: StaggerDirection;
}

export const TextStaggerHover = ({
  text,
  staggerDirection = "start",
  className,
  ...props
}: TextStaggerHoverProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const { characters } = splitText(text);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const clones = containerRef.current.querySelectorAll(".clone");
    gsap.set(clones, { xPercent: -115, skewX: 0, rotation: -9 });
  }, []);

  const handleEnter = () => {
    if (!containerRef.current) return;
    const fronts = containerRef.current.querySelectorAll(".front");
    const clones = containerRef.current.querySelectorAll(".clone");

    gsap.killTweensOf(fronts);
    gsap.killTweensOf(clones);

    gsap.to(fronts, {
      xPercent: 115,
      skewX: 3,
      rotation: 0,
      duration: 0.8,
      ease: "expo.out",
      stagger: { each: 0.02, from: staggerDirection }
    });

    gsap.to(clones, {
      xPercent: 0,
      skewX: 0,
      rotation: 0,
      duration: 0.8,
      ease: "expo.out",
      stagger: { each: 0.02, from: staggerDirection }
    });
  };

  const handleLeave = () => {
    if (!containerRef.current) return;
    const fronts = containerRef.current.querySelectorAll(".front");
    const clones = containerRef.current.querySelectorAll(".clone");

    gsap.killTweensOf(fronts);
    gsap.killTweensOf(clones);

    gsap.to(fronts, {
      xPercent: 0,
      skewX: 0,
      rotation: 0,
      duration: 0.8,
      ease: "expo.out",
      stagger: { each: 0.02, from: staggerDirection }
    });

    gsap.to(clones, {
      xPercent: -115,
      skewX: -9,
      rotation: -9,
      duration: 0.8,
      ease: "expo.out",
      stagger: { each: 0.02, from: staggerDirection }
    });
  };

  return (
    <span
      ref={containerRef}
      className={cn("inline-block text-nowrap cursor-pointer", className)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...props}
    >
      {characters.map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="relative inline-block overflow-hidden mr-[2px]"
        >
          {/* Active (Front) Text */}
          <span
            className="front inline-block origin-bottom"
            style={{ willChange: "transform" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>

          {/* Hidden (Clone) Text */}
          <span
            className="clone absolute left-0 top-0 inline-block origin-bottom"
            style={{ willChange: "transform" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
};

export const TextStaggerHoverActive = () => null;
export const TextStaggerHoverHidden = () => null;
