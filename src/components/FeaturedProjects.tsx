"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TITLE = "FEATURED PROJECTS";
const CHARS = TITLE.split("");

const PROJECTS = [
  {
    name: "Lumina Studio",
    desc: "A creative agency portfolio featuring smooth WebGL transitions and interactive elements.",
    tech: ["React", "Three.js", "GSAP"],
    repo: "github.com",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    name: "E-Commerce OS",
    desc: "A modern shopping experience with high-end editorial aesthetics and fast checkouts.",
    tech: ["Next.js", "Tailwind", "Framer"],
    repo: "github.com",
    video: "https://media.w3.org/2010/05/sintel/trailer.mp4"
  },
  {
    name: "Fintech Dashboard",
    desc: "Real-time data visualization platform for personal finance and budgeting.",
    tech: ["Vue", "D3.js", "Tailwind"],
    repo: "github.com",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Title Entrance Animation
      const chars = titleRefs.current.filter(Boolean);
      gsap.set(chars, { xPercent: 105, opacity: 0, skewX: 3 });

      gsap.to(chars, {
        xPercent: 0,
        opacity: 1,
        skewX: 0,
        duration: 1.4,
        ease: "expo.out",
        stagger: {
          each: 0.035,
          from: "start",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      // 2. Horizontal Scroll Cards Animation
      const cards = cardsRef.current.filter(Boolean);
      
      // Card 1 setup for fade/scale in
      gsap.set(cards[0], { opacity: 0, scale: 0.9, xPercent: 0, rotationY: 0 });
      // Cards 2 and 3 start exactly off-screen to the right
      gsap.set([cards[1], cards[2]], { xPercent: 125, rotationY: -30 });

      // Card 1 Entrance
      gsap.to(cards[0], {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%", // Increased from 200% to stretch out the scroll length and slow down the animation
          pin: true,
          scrub: 1,
        }
      });

      // Brief pause for the user to read the title and see card 1
      tl.to({}, { duration: 0.5 });
      
      // Card 1 goes out left (negative rotation), Card 2 comes in from right (rotates to 0)
      tl.to(cards[0], { xPercent: -135, rotationY: 30, duration: 2, ease: "power1.out" }, "transition1");
      tl.to(cards[1], { xPercent: 0, rotationY: 0, duration: 2, ease: "power1.out" }, "transition1");
      tl.to({}, { duration: 0.5 }); // Stay in middle
      
      // Card 2 goes out left (negative rotation), Card 3 comes in from right (rotates to 0)
      tl.to(cards[1], { xPercent: -135, rotationY: 30, duration: 2, ease: "power1.out" }, "transition2");
      tl.to(cards[2], { xPercent: 0, rotationY: 0, duration: 2, ease: "power1.out" }, "transition2");
      tl.to({}, { duration: 0.5 }); // Stay in middle at the end

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative z-10 w-full h-screen bg-[#080808] overflow-hidden border-b border-orange-800"
    >
      {/* Grid Overlay to match hero style subtly */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px)`,
          backgroundSize: '10vw 100%'
        }}
      />
      {/* Title */}
      <div className="absolute top-10 left-6 md:top-16 md:left-12 z-20 pointer-events-none">
        <h1 className="text-[8vw] md:text-[4vw] font-black uppercase text-white leading-none flex flex-wrap">
          {CHARS.map((ch, i) => {
            if (ch === " ") return <span key={`space-${i}`} className="w-[0.3em]" />;
            return (
              <span key={`${ch}-${i}`} className="relative inline-block overflow-hidden">
                <span
                  ref={(el) => { titleRefs.current[i] = el; }}
                  className="inline-block"
                  style={{ willChange: "transform, opacity" }}
                >
                  {ch}
                </span>
              </span>
            );
          })}
        </h1>
      </div>

      {/* Cards Container */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none mt-16 md:mt-24"
        style={{ perspective: "1500px" }}
      >
        {PROJECTS.map((proj, i) => (
          <div 
            key={i}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="absolute w-[90%] md:w-[75%] max-w-6xl h-[60vh] md:h-[70vh] rounded-4xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] pointer-events-auto bg-black"
            style={{ 
              willChange: "transform",
              WebkitMaskImage: "-webkit-radial-gradient(white, black)",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden"
            }}
          >
            {/* Background Video */}
            <video 
              src={proj.video}
              autoPlay 
              loop 
              muted={true} 
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
            />
            {/* Overlay for contrast */}
            <div className="absolute inset-0 bg-black/30 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

            {/* Content overlay */}
            <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between text-white">
              {/* Top Row: Repo Button */}
              <div className="flex justify-end">
                <a 
                  href={`https://${proj.repo}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-white/90 backdrop-blur-sm text-black px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-white hover:scale-105 transition-all shadow-lg"
                >
                  repo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>

              {/* Bottom Row */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="max-w-2xl">
                  <h3 className="text-4xl md:text-6xl font-black mb-3 tracking-tight">{proj.name}</h3>
                  <p className="text-lg md:text-xl text-gray-200/90 font-medium">{proj.desc}</p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
                  <span className="text-sm font-bold tracking-widest uppercase text-gray-300">tech stack</span>
                  <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                    {proj.tech.map((t, idx) => (
                      <span 
                        key={idx}
                        className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
