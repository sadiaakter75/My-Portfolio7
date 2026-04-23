"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { motion } from "motion/react";
import { Images } from "lucide-react";

const IMAGES = [
  "https://picsum.photos/seed/agency1/1920/1080",
  "https://picsum.photos/seed/agency2/1920/1080",
  "https://picsum.photos/seed/agency3/1920/1080",
  "https://picsum.photos/seed/agency4/1920/1080",
  "https://picsum.photos/seed/agency5/1920/1080",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const prevIndexRef = useRef(0);

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
    <main className="relative min-h-screen w-full bg-[#050505] font-[Helvetica_Neue,Arial,sans-serif] text-white overflow-x-hidden">
      

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
          className="absolute top-0 left-0 w-full h-[65%] border-b border-white/10 opacity-30 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, #111 25%, #161616 25%, #161616 50%, #111 50%, #111 75%, #161616 75%, #161616 100%)',
            backgroundSize: '100px 100px'
          }}
        />
        <div className="absolute top-[86%] left-0 w-full h-[2px] bg-[#FF3E00] shadow-[0_0_20px_#FF3E00] z-20 pointer-events-none" />
        <div className="absolute right-0 top-[20%] w-1px h-[200px] bg-white/20 z-20 pointer-events-none" />

        {/* Big Title Typography (Bottom Left) matching Bold Typography theme padding */}
        <div className="relative z-30 grow flex flex-col justify-end px-6 md:px-[60px] pb-[80px] pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-white text-[115px] max-md:text-6xl font-extrabold uppercase leading-[0.88] tracking-[-4px] m-0"
          >
            {["Website", "Development", "Agency"].map((word, index) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.4 + index * 0.15,
                  }}
                  className={
                    index === 2
                      ? "block text-[#FF3E00]"
                      : "block"
                  }
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </div>

        {/* Meta info component from the theme */}
        <div className="absolute bottom-[80px] right-6 md:right-[60px] flex flex-col items-end gap-[10px] text-right z-30 pointer-events-none">
          <div className="text-[14px] font-bold opacity-40 tracking-[2px]">01 / 05</div>
          <div className="text-[12px] opacity-50 tracking-[4px] uppercase max-w-[200px]">Crafting high-performance digital experiences</div>
        </div>
      </section>
    </main>
  );
}
