"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagicText } from "./ui/AboutUi/magic-text";
import { StarIcon } from "./ui/AboutUi/FlowerIcon";

const STAR_CONFIGS = [
  { top: "8%",  left: "6%",   color: "#FF4500", size: "w-8 h-8",   side: "left"  },
  { top: "15%", left: "18%",  color: "#000",    size: "w-5 h-5",   side: "left"  },
  { top: "35%", left: "4%",   color: "#000",    size: "w-10 h-10", side: "left"  },
  { top: "55%", left: "12%",  color: "#FF4500", size: "w-6 h-6",   side: "left"  },
  { top: "72%", left: "7%",   color: "#FF4500", size: "w-9 h-9",   side: "left"  },
  { top: "88%", left: "20%",  color: "#000",    size: "w-5 h-5",   side: "left"  },
  { top: "5%",  left: "78%",  color: "#000",    size: "w-7 h-7",   side: "right" },
  { top: "22%", left: "91%",  color: "#FF4500", size: "w-5 h-5",   side: "right" },
  { top: "42%", left: "85%",  color: "#FF4500", size: "w-10 h-10", side: "right" },
  { top: "60%", left: "94%",  color: "#000",    size: "w-6 h-6",   side: "right" },
  { top: "78%", left: "80%",  color: "#000",    size: "w-8 h-8",   side: "right" },
  { top: "91%", left: "88%",  color: "#FF4500", size: "w-5 h-5",   side: "right" },
];

const NAME = "SADIA AKTER";
const CHARS = NAME.split("");

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frontRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const cloneRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const starRefs   = useRef<(HTMLDivElement | null)[]>([]);

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

      // ── Text: smooth staggered entrance ───────────────────────────
      // Set fronts hidden below slot, clones parked below
      const fronts = frontRefs.current.filter(Boolean) as HTMLSpanElement[];
      const clones = cloneRefs.current.filter(Boolean) as HTMLSpanElement[];

      gsap.set(fronts, { yPercent: 105, opacity: 0, skewY: 4 });
      gsap.set(clones, { yPercent: 105 });

      gsap.to(fronts, {
        yPercent: 0,
        opacity: 1,
        skewY: 0,
        duration: 1.4,
        ease: "expo.out",
        stagger: {
          each: 0.045,
          from: "start",
        },
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
    const front = frontRefs.current[i];
    const clone = cloneRefs.current[i];
    if (!front || !clone) return;

    gsap.killTweensOf([front, clone]);

    // Both move together — front out upward, clone in from below
    gsap.to(front, { yPercent: -100, duration: 0.5, ease: "power2.inOut" });
    gsap.to(clone, { yPercent: 0,    duration: 0.5, ease: "power2.inOut" });
  }, []);

  const handleLeave = useCallback((i: number) => {
    const front = frontRefs.current[i];
    const clone = cloneRefs.current[i];
    if (!front || !clone) return;

    gsap.killTweensOf([front, clone]);

    // Both move together — clone out downward, front back to resting
    gsap.to(clone, { yPercent: 100, duration: 0.5, ease: "power2.inOut" });
    gsap.to(front, { yPercent: 0,   duration: 0.5, ease: "power2.inOut" });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full min-h-[120vh] bg-[#F4F4F4] text-black overflow-hidden flex flex-col justify-center py-40 shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.8)]"
    >
      {/* ── Stars ─────────────────────────────────────────────────── */}
      {STAR_CONFIGS.map((cfg, i) => (
        <div
          key={i}
          ref={(el) => { starRefs.current[i] = el; }}
          className="absolute pointer-events-none"
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
                  fontSize: "clamp(3.8rem, 12.5vw, 14.5rem)",
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

                {/* Clone — orange, rolls in on hover */}
                <span
                  ref={(el) => { cloneRefs.current[i] = el; }}
                  className="absolute left-0 top-0 inline-block font-black uppercase text-[#FF3E00]"
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

      {/* ── Magic Paragraph — right aligned ───────────────────────── */}
      <div className="relative z-10 w-full flex justify-end px-6 md:px-16">
        <MagicText text="We are a web development team focused on building clean, functional, and user-friendly websites. Our goal is to create digital experiences that not only look good but also perform reliably." />
      </div>
    </section>
  );
}
