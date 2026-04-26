"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarIcon } from "./ui/AboutUi/FlowerIcon";
import { ServiceStep } from "@/types";

const STEPS: ServiceStep[] = [
  {
    num: "01",
    title: "Get in Touch",
    desc: "Let us know your project requirements on X or LinkedIn and we'll get back to you with a proposal.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    num: "02",
    title: "Planning & Proposal",
    desc: "We send you a detailed proposal with a timeline and breakdown of costs. Once you approve, we begin working on your project.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    num: "03",
    title: "Build and Ship",
    desc: "We start building your project and ship it to you in 5-10 business days with unlimited revisions until you're satisfied.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000",
  },
  {
    num: "04",
    title: "Launch and Support",
    desc: "We make your website live and provide ongoing support to ensure everything runs smoothly.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000",
  }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const stepElements = gsap.utils.toArray('.step-item') as HTMLElement[];
      const imgElements = gsap.utils.toArray('.step-img') as HTMLElement[];
      const headlineChars = gsap.utils.toArray('h2 .reveal-char') as HTMLElement[];

      // ─── Headline entrance ───────────────────────────────────────────────
      gsap.set(headlineChars, { xPercent: 105, opacity: 0, skewX: 3 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        }
      });

      tl.to(headlineChars, {
        xPercent: 0,
        opacity: 1,
        skewX: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: { each: 0.025, from: "start" }
      });

      stepElements.forEach((step) => {
        const titleChars = gsap.utils.toArray(step.querySelectorAll('h3 .reveal-char')) as HTMLElement[];
        const desc = step.querySelector('.reveal-desc');

        gsap.set(titleChars, { xPercent: 105, opacity: 0, skewX: 3 });
        gsap.set(desc, { opacity: 0, y: 15 });

        tl.to(titleChars, {
          xPercent: 0,
          opacity: 1,
          skewX: 0,
          duration: 1,
          ease: "expo.out",
          stagger: { each: 0.025, from: "start" }
        }, "-=0.5");

        tl.to(desc, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        }, "-=0.4");
      });

      // ─── FIX 1: Snap scrolling ────────────────────────────────────────────
      // Snaps between each step as user scrolls through the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        snap: {
          snapTo: (progress) => {
            const container = containerRef.current;
            if (!container) return progress;
            const totalScroll = container.offsetHeight - window.innerHeight;
            
            // Calculate exact progress points for each step's center
            const snapPoints = stepElements.map(step => {
              const stepCenter = step.offsetTop + (step.offsetHeight / 2);
              const scrollPos = stepCenter - (window.innerHeight / 2);
              return Math.max(0, Math.min(1, scrollPos / totalScroll));
            });
            
            // Snap to the absolute closest step center
            return snapPoints.reduce((prev, curr) => 
              Math.abs(curr - progress) < Math.abs(prev - progress) ? curr : prev
            );
          },
          duration: { min: 0.6, max: 1.2 }, // Slower, much smoother snapping
          ease: "power3.inOut",             // Premium buttery ease
          delay: 0.1,                       // Wait slightly for user to stop scrolling
        },
      });

      // ─── FIX 2: "Come from inside" image initial state ────────────────────
      // All images start incredibly small + blurred so they emerge from deep inside
      gsap.set(imgElements, {
        scale: 0.01,
        opacity: 0,
        filter: "blur(20px)",
        transformOrigin: "center center",
        zIndex: 0,
      });
      // First image is already open
      gsap.set(imgElements[0], { scale: 1, opacity: 1, filter: "blur(0px)", zIndex: 1 });

      // ─── Sticky image travel ─────────────────────────────────────────────
      gsap.to('.sticky-image-container', {
        y: 450,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });

      // ─── Per-step active states + image swap ─────────────────────────────
      let zCounter = 1;

      stepElements.forEach((step, i) => {
        const icon = step.querySelector('.step-icon');

        const activateImage = (idx: number) => {
          zCounter++;
          
          // Bring the target image to the very front
          gsap.set(imgElements[idx], { zIndex: zCounter });

          // Incoming: emerge from deep inside → full size
          // Added a cinematic twist (rotation) for extra spice
          gsap.fromTo(imgElements[idx],
            { 
              scale: 0.01, 
              opacity: 0, 
              filter: "blur(20px)",
              rotation: idx % 2 === 0 ? -8 : 8, // Alternate slight twist
            },
            {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              rotation: 0,
              duration: 2.0, // Slower, majestic reveal
              ease: "expo.out",
              overwrite: true,
            }
          );
        };

        ScrollTrigger.create({
          trigger: step,
          start: "top center",
          end: "bottom center",

          onEnter: () => {
            gsap.to(step, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", overwrite: true });
            if (icon) gsap.to(icon, { opacity: 1, scale: 1, rotation: 180, duration: 0.8, ease: "back.out(1.5)", overwrite: true });
            activateImage(i);
          },

          onLeave: () => {
            gsap.to(step, { opacity: 0.3, y: 20, duration: 0.8, ease: "power3.inOut", overwrite: true });
            if (icon) gsap.to(icon, { opacity: 0, scale: 0.5, rotation: 0, duration: 0.8, ease: "power3.inOut", overwrite: true });
          },

          onEnterBack: () => {
            gsap.to(step, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", overwrite: true });
            if (icon) gsap.to(icon, { opacity: 1, scale: 1, rotation: 180, duration: 0.8, ease: "back.out(1.5)", overwrite: true });
            activateImage(i);
          },

          onLeaveBack: () => {
            gsap.to(step, { opacity: 0.3, y: -20, duration: 0.8, ease: "power3.inOut", overwrite: true });
            if (icon) gsap.to(icon, { opacity: 0, scale: 0.5, rotation: 0, duration: 0.8, ease: "power3.inOut", overwrite: true });
          },
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="inline-block overflow-hidden leading-[1.2]">
        <span className="inline-block reveal-char will-change-transform">
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  return (
    <section ref={containerRef} className="relative z-10 w-full bg-[#F4F4F4] text-black overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-24">

        {/* Header */}
        <div className="mb-16 md:mb-24 flex justify-between items-center w-full">
          <span className="text-[#FF4500] font-sans font-medium text-sm tracking-widest uppercase">// Process</span>
          <h2 className="text-4xl md:text-6xl font-sans tracking-tight font-medium text-right">
            {splitText("How it works")}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start">

          {/* Left — Scrollable steps */}
          <div className="w-full md:w-1/2 flex flex-col step-list-wrapper">
            <div className="flex flex-col gap-8 md:gap-12 pb-[50vh] pt-[10vh]">
              {STEPS.map((step, i) => (
                <div key={i} className="step-item relative opacity-30 flex gap-6 md:gap-8 transition-opacity">
                  <StarIcon
                    className={`step-icon absolute -left-10 md:-left-12 top-0 w-8 h-8 md:w-10 md:h-10 ${
                      i % 2 === 0 ? 'text-[#FF4500]' : 'text-black'
                    } opacity-0 scale-50`}
                  />
                  <span className="text-zinc-500 font-mono text-lg md:text-xl font-medium mt-1">{step.num}</span>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-3xl md:text-4xl font-sans font-medium text-zinc-900">
                      {splitText(step.title)}
                    </h3>
                    <p className="reveal-desc text-zinc-500 font-sans text-base md:text-lg leading-relaxed max-w-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Sticky image panel */}
          <div className="hidden md:block w-full md:w-1/2 sticky top-[20vh] sticky-image-container">
            {/* overflow-hidden clips the scale(1.15) bleed on outgoing images */}
            <div className="w-full aspect-4/5 relative overflow-hidden bg-zinc-200">
              {STEPS.map((step, i) => (
                <img
                  key={i}
                  src={step.img || undefined}
                  alt={step.title}
                  className="step-img absolute inset-0 w-full h-full object-cover"
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}