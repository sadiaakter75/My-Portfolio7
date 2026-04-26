"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Images } from "lucide-react";

const IMAGES = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.jpg",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const prevIndexRef = useRef(0);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Initialize image stack on component mount
    imageRefs.current.forEach((img, i) => {
      if (img) {
        if (i === 0) {
          // First image fully visible
          gsap.set(img, { zIndex: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 });
        } else {
          // Others hidden via clip-path from the bottom
          gsap.set(img, { zIndex: 0, clipPath: "inset(0% 0% 100% 0%)", scale: 1 });
        }
      }
    });

    // Start auto-slider
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4500);

    // Text entrance animation
    const fronts = titleRefs.current.filter(Boolean) as HTMLSpanElement[];
    gsap.set(fronts, { xPercent: 105, opacity: 0, skewX: 3 });
    gsap.to(fronts, {
      xPercent: 0,
      opacity: 1,
      skewX: 0,
      duration: 1.4,
      ease: "expo.out",
      stagger: {
        each: 0.025,
        from: "start",
      },
      delay: 0.4, // Small delay for initial load
    });

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === prevIndexRef.current) return;

    const incomingImg = imageRefs.current[currentIndex];
    const outgoingImg = imageRefs.current[prevIndexRef.current];

    if (incomingImg && outgoingImg) {
      // 1. Bring incoming image to front and hide it via clipPath at the top
      gsap.set(incomingImg, {
        zIndex: 10,
        clipPath: "inset(0% 0% 100% 0%)",
        scale: 1,
      });

      // 2. Ensure outgoing is immediately behind it
      gsap.set(outgoingImg, {
        zIndex: 5,
      });

      const tl = gsap.timeline();

      // Incoming sweeps down smoothly using expo.inOut
      tl.to(incomingImg, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.8,
        ease: "expo.inOut",
      }, 0);

      // Outgoing zooms out slightly for a premium parallax push effect
      tl.to(outgoingImg, {
        scale: 1.05,
        duration: 1.8,
        ease: "expo.inOut",
      }, 0);

      tl.eventCallback("onComplete", () => {
        // Carefully reset to allow infinite uninterrupted zooming and looping
        gsap.set(outgoingImg, { zIndex: 0, scale: 1, clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(incomingImg, { zIndex: 1 });
        prevIndexRef.current = currentIndex;
      });
    }
  }, [currentIndex]);

  return (
    <main className="relative min-h-screen w-full bg-[#050505] font-sans text-white overflow-x-hidden">


      {/* Fixed Hero Section */}
      <section className="fixed inset-0 w-full h-screen overflow-hidden z-0 flex flex-col pointer-events-none">
        {/* Background container per theme */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a] to-[#1a1a1a] z-0" />

        {/* Sweep Animated Background Slider (now layered below theme overlays) */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 opacity-50 mix-blend-screen">
          {IMAGES.map((src, i) => (
            <Image
              key={src}
              ref={(el) => {
                if (el) {
                  imageRefs.current[i] = el;
                }
              }}
              src={src}
              alt={`Web Agency Spotlight ${i + 1}`}
              fill
              priority={true} // Prioritize ALL images so they pre-load for the infinite loop
              className="object-cover object-center absolute inset-0"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>

        {/* Dark Gradient Overlay to match theme bg-layers */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent from-40% to-black/80 z-10 pointer-events-none" />

        {/* Theme specific decorative visuals */}
        <div
          className="absolute top-0 left-0 w-full h-full border-b border-white/10 opacity-25 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, #111 25%, #161616 25%, #161616 50%, #111 50%, #111 75%, #161616 75%, #161616 100%)',
            backgroundSize: '100px 100px'
          }}
        />

        {/* Big Title Typography (Bottom Left) matching Bold Typography theme padding */}
        <div className="big text relative z-30 grow flex flex-col justify-start pt-[120px] items-center text-center md:justify-end md:items-start md:text-left md:pt-0 px-6 md:px-[60px] pb-[80px] pointer-events-none">
          <h1
            className="text-white text-5xl md:text-8xl font-extrabold uppercase leading-[0.90] tracking-[-3px] m-0"
          >
            {["CREATIVE", "DEVELOPER &", "DESIGNER"].map((word, wordIndex) => {
              let baseCharIdx = 0;
              const wordsArray = ["CREATIVE", "DEVELOPER &", "DESIGNER"];
              for (let i = 0; i < wordIndex; i++) {
                baseCharIdx += wordsArray[i].length;
              }

              return (
                <span key={word} className="block">
                  {word.split("").map((ch, charIndex) => {
                    const globalIndex = baseCharIdx + charIndex;
                    if (ch === " ") {
                      return <span key={`space-${wordIndex}-${charIndex}`} style={{ display: "inline-block", width: "0.25em" }} />;
                    }
                    return (
                      <span
                        key={`${ch}-${charIndex}`}
                        className="relative inline-block overflow-hidden"
                      >
                        <span
                          ref={(el) => { titleRefs.current[globalIndex] = el; }}
                          className={`inline-block ${wordIndex === 2 ? "text-[#FF3E00]" : ""}`}
                          style={{ willChange: "transform, opacity" }}
                        >
                          {ch}
                        </span>
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </h1>
          {/* Meta info component - stacked below title on mobile, absolute bottom-right on desktop */}
          <div className="mt-4 md:mt-0 md:absolute md:bottom-[80px] md:right-[60px] flex flex-col items-center md:items-end gap-[10px] text-center md:text-right z-30 pointer-events-none">
            <div className="text-[12px] opacity-50 tracking-[4px] uppercase max-w-[200px]">Crafting high-performance digital experiences</div>
          </div>
        </div>

        {/* Grid Overlay to match hero style subtly */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px)`,
            backgroundSize: '10vw 100%'
          }}
        />
      </section>
    </main>
  );
}
