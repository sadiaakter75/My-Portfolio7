"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { LiquidMetalButton } from "./ui/li-contact-btn";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Simple cn utility
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" height="1.4em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XTwitterIcon = () => (
  <svg viewBox="0 0 24 24" height="1.4em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.865l4.265 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" height="1.4em" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-bricolage), sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Manual variable definitions since they aren't in globals.css */
  --foreground: 255, 255, 255;
  --background: 0, 0, 0;
  --primary: 255, 69, 0;
  --secondary: 100, 100, 100;
  --destructive: 255, 0, 0;
  
  --pill-bg-1: rgba(var(--foreground), 0.03);
  --pill-bg-2: rgba(var(--foreground), 0.01);
  --pill-shadow: rgba(var(--background), 0.5);
  --pill-highlight: rgba(var(--foreground), 0.1);
  --pill-inset-shadow: rgba(var(--background), 0.8);
  --pill-border: rgba(var(--foreground), 0.08);
  
  --pill-bg-1-hover: rgba(var(--foreground), 0.08);
  --pill-bg-2-hover: rgba(var(--foreground), 0.02);
  --pill-border-hover: rgba(var(--foreground), 0.2);
  --pill-shadow-hover: rgba(var(--background), 0.7);
  --pill-highlight-hover: rgba(var(--foreground), 0.2);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(255, 0, 0, 0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.8)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

// .footer-bg-grid {
//   background-size: 60px 60px;
//   background-image: 
//     linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
//     linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
//   mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
//   -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
// }

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(255, 69, 0, 0.15) 0%, 
    rgba(100, 100, 100, 0.15) 40%, 
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: white;
}

.footer-giant-bg-text {
  font-size: 20vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.05);
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(255,255,255,0.15));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Cutting-edge Web Development</span> <span className="text-[#FF4500]/60">✦</span>
    <span>Transparent Process</span> <span className="text-zinc-500/60">✦</span>
    <span>Next-Gen Performance</span> <span className="text-[#FF4500]/60">✦</span>
    <span>Strategic Design</span> <span className="text-zinc-500/60">✦</span>
    <span>Modern Tech Stack</span> <span className="text-[#FF4500]/60">✦</span>
  </div>
);

export function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Reveal
      gsap.fromTo(
        [headingRef.current, linksRef.current, socialLinksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col overflow-hidden bg-[#080808] text-white cinematic-footer-wrapper">

          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          {/* Grid Overlay to match hero style subtly */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px)`,
              backgroundSize: '10vw 100%'
            }}
          />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className=" footer-giant-bg-text absolute -bottom-[5vh] right-1/2 left-1/2 -translate-x-1/2 w-full whitespace-nowrap z-0 pointer-events-none select-none"
          >
            LET'S TALK
          </div>

          {/* 1. Diagonal Sleek Marquee (Top of footer) */}
          <div className="absolute top-24 left-0 w-full overflow-hidden border-y border-white/10 bg-black/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-zinc-500 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Content */}
          <div className="relative z-10 flex flex-col md:flex-row flex-1 items-center justify-between px-6 mt-42 md:mt-12 w-full max-w-7xl mx-auto gap-12">

            {/* Left Side: Heading and Button */}
            <div className="flex flex-col items-start gap-8 max-w-2xl w-full md:w-auto">
              <h2
                ref={headingRef}
                className="text-3xl md:text-6xl font-black footer-text-glow tracking-tighter text-left"
              >
                Let's Build Something Awesome Together!
              </h2>

              <div ref={linksRef} className="flex flex-col items-start w-full">
                <Link href="https://www.linkedin.com/in/sadia-akter-8a484b3b7/" target="_blank">
                  <LiquidMetalButton label="Get in touch" />
                </Link>
              </div>
            </div>

            {/* Right Side: Social Links */}
            <div ref={socialLinksRef} className="flex flex-col items-start md:items-start md:mt-16 md:mr-24 gap-4 w-full md:w-auto">
              <div className="social-title text-[#b6b5b4] text-xl uppercase font-bold">
                Social Links <span className="social-arrow">↓</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-end" }}>
                <Link href="https://www.linkedin.com/in/sadia-akter-8a484b3b7/" target="_blank">
                  <LiquidMetalButton
                    viewMode="icon"
                    icon={<LinkedInIcon />}
                    hoverLabel="LinkedIn"
                  />
                </Link>
                <Link href="https://x.com/AkterSadia85872" target="_blank">
                  <LiquidMetalButton
                    viewMode="icon"
                    icon={<XTwitterIcon />}
                    hoverLabel="X"
                  />
                </Link>
                <Link href="https://github.com/sadiaakter75" target="_blank">
                  <LiquidMetalButton
                    viewMode="icon"
                    icon={<GitHubIcon />}
                    hoverLabel="GitHub"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between md:gap-0">

            {/* Left Side: Copyright & Privacy */}
            <div className="flex-1 flex items-center justify-between w-full md:w-auto order-2 md:order-1 md:pr-20 lg:pr-32">
              <div className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-widest uppercase">
                © 2026 Sadia. All rights reserved.
              </div>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-[10px] md:text-xs font-semibold tracking-widest uppercase">
                Privacy Policy
              </a>
            </div>

            {/* Center: Credits (Absolute Centered on Desktop) */}
            <div className="footer-glass-pill px-6 py-3 rounded-full flex items-center gap-2 order-1 md:order-2 md:absolute md:left-1/2 md:-translate-x-1/2 cursor-default border-white/10 mb-6 md:mb-0">
              <span className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Crafted with</span>
              <span className="animate-footer-heartbeat text-sm md:text-base text-red-500">❤</span>
              <span className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">by</span>
              <span className="text-white font-black text-xs md:text-sm tracking-normal ml-1">SADIA</span>
            </div>

            {/* Right Side: Terms & Scroll Top */}
            <div className="flex-1 flex items-center justify-between w-full md:w-auto order-3 md:pl-10 lg:pl-62">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-[10px] md:text-xs font-semibold tracking-widest uppercase">
                Terms of Service
              </a>
              <MagneticButton
                as="button"
                onClick={scrollToTop}
                className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-zinc-500 hover:text-white group"
              >
                <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
              </MagneticButton>
            </div>

          </div>
        </footer>
      </div>
    </>
  );
}
