"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagicText } from "./ui/AboutUi/magic-text";
import { StarIcon } from "./ui/AboutUi/FlowerIcon";

const STAR_CONFIGS = [
  { top: "24%",  left: "22%",   color: "#FF4500", size: "w-8 h-8",   side: "left"  },
  { top: "39%", left: "37%",  color: "#000",    size: "w-5 h-5",   side: "left"  },
  { top: "35%", left: "2%",   color: "#000",    size: "w-10 h-10", side: "left"  },
  { top: "42%", left: "11%",  color: "#FF4500", size: "w-6 h-6",   side: "left"  },
  { top: "25%",  left: "77%",  color: "#000",    size: "w-7 h-7",   side: "right" },
  { top: "31%", left: "91%",  color: "#FF4500", size: "w-5 h-5",   side: "right" },
  { top: "32%", left: "66%",  color: "#FF4500", size: "w-10 h-10", side: "right" },
  // { top: "60%", left: "94%",  color: "#000",    size: "w-6 h-6",   side: "right" },
  // { top: "78%", left: "80%",  color: "#000",    size: "w-8 h-8",   side: "right" },
  // { top: "91%", left: "88%",  color: "#FF4500", size: "w-5 h-5",   side: "right" },
];

const NAME = "SADIA AKTER";
const CHARS = NAME.split("");

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frontRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const cloneRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const starRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimatingIn = useRef(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // ── Stars: scrubbed scroll-linked entrance ─────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 10%",
          scrub: true,
          fastScrollEnd: true,
        }
      });

      gsap.set(starRefs.current.filter(Boolean), { force3D: true, z: 0.01 });

      starRefs.current.forEach((star, i) => {
        if (!star) return;
        const isLeft = STAR_CONFIGS[i].side === "left";
        const startX = isLeft ? -300 - Math.random() * 200 : 300 + Math.random() * 200;
        const startY = (Math.random() - 0.5) * 200;
        gsap.set(star, { x: startX, y: startY, rotation: isLeft ? -360 : 360, opacity: 0 });
        tl.to(star, { x: 0, y: 0, rotation: 0, opacity: 1, ease: "none" }, 0);
      });

      // ── Text: smooth staggered page entrance ───────────────────────────
      const fronts = frontRefs.current.filter(Boolean) as HTMLSpanElement[];
      const clones = cloneRefs.current.filter(Boolean) as HTMLSpanElement[];

      gsap.set(fronts, { xPercent: 105, opacity: 0, skewX: 3 });
      gsap.set(clones, { xPercent: -105 });

      gsap.to(fronts, {
        xPercent: 0,
        opacity: 1,
        skewX: 0,
        duration: 1.4,
        ease: "expo.out",
        stagger: {
          each: 0.045,
          from: "start",
        },
        onComplete: () => { isAnimatingIn.current = false; },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Hover: clean synchronized roll ─────────────────────────────────────
  const handleEnter = useCallback((i: number) => {
    if (isAnimatingIn.current) return;

    const front = frontRefs.current[i];
    const clone = cloneRefs.current[i];
    if (!front || !clone) return;

    gsap.killTweensOf([front, clone]);

    // Match entrance: expo.out, skew, and longer duration
    gsap.to(front, { 
      xPercent: 105, 
      skewX: 3, 
      rotation: -9,
      duration: 0.8, 
      ease: "expo.out" 
    });
    gsap.to(clone, { 
      xPercent: 0, 
      skewX: 0, 
      rotation: 0,
      duration: 0.8, 
      ease: "expo.out" 
    });
  }, []);

  const handleLeave = useCallback((i: number) => {
    if (isAnimatingIn.current) return;

    const front = frontRefs.current[i];
    const clone = cloneRefs.current[i];
    if (!front || !clone) return;

    gsap.killTweensOf([front, clone]);

    // Reset to base state with entrance style
    gsap.to(clone, { 
      xPercent: -105, 
      skewX: 0, 
      rotation: -9,
      duration: 0.8, 
      ease: "expo.out" 
    });
    gsap.to(front, { 
      xPercent: 0, 
      skewX: 0, 
      rotation: 0,
      duration: 0.8, 
      ease: "expo.out" 
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full min-h-[120vh] bg-[#F4F4F4] text-black overflow-hidden flex flex-col justify-center py-40 rounded-t-3xl shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.8)]"
    >
      {/* ── Stars ─────────────────────────────────────────────────── */}
      {STAR_CONFIGS.map((cfg, i) => (
        <div
          key={i}
          ref={(el) => { starRefs.current[i] = el; }}
          className="absolute pointer-events-none hidden md:block"
          style={{ top: cfg.top, left: cfg.left, willChange: "transform, opacity" }}
        >
          <StarIcon className={cfg.size} style={{ color: cfg.color }} />
        </div>
      ))}

      {/* ── Big Rolling Name Text ─────────────────────────────────── */}
      <div className="relative z-10 w-full mb-10 px-1">
        <div
          className="flex items-center justify-center flex-wrap leading-none"
          aria-label={NAME}
          role="heading"
          aria-level={2}
        >
          {CHARS.map((ch, i) => {
            if (ch === " ") {
              return (
                <span key={`space-${i}`} style={{ display: "inline-block", width: "0.16em" }} />
              );
            }

            return (
              <span
                key={`${ch}-${i}`}
                className="relative inline-block overflow-hidden cursor-default select-none"
                style={{
                  fontSize: "clamp(3.2rem, 14.5vw, 14.5rem)",
                  lineHeight: 0.88,
                  verticalAlign: "bottom",
                  willChange: "transform",
                }}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
              >
                {/* Front — black, entrance-animated */}
                <span
                  ref={(el) => { frontRefs.current[i] = el; }}
                  className="inline-block font-black uppercase text-[#111111]"
                  style={{ willChange: "transform, opacity" }}
                  aria-hidden="true"
                >
                  {ch}
                </span>

                {/* Clone — black, rolls in on hover */}
                <span
                  ref={(el) => { cloneRefs.current[i] = el; }}
                  className="absolute left-0 top-0 inline-block font-black uppercase text-[#0a0a0a]"
                  style={{ willChange: "transform" }}
                  aria-hidden="true"
                >
                  {ch}
                </span>
              </span>
            );
          })}
        </div>
      </div>

      {/* ── Magic Paragraph — center aligned ────────────────────── */}
      <div className="relative z-10 w-full flex justify-center">
        <MagicText text="I’m A Full Stack Developer Focused On Building Fast, Reliable, And User-Friendly Web Applications — Open To Meaningful Collaborations." />
      </div>
    </section>
  );
}
