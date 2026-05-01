"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript, 
  SiGreensock,
  SiGithub
} from "react-icons/si";
import { HiArrowRight } from "react-icons/hi2";

const TITLE = "FEATURED PROJECTS";
const CHARS = TITLE.split("");

// Tech icon definitions using react-icons
const TECH_ICONS: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  React: {
    color: "#61DAFB",
    label: "React",
    icon: SiReact,
  },
  "Next.js": {
    color: "#ffffff",
    label: "Next.js",
    icon: SiNextdotjs,
  },
  Tailwind: {
    color: "#06B6D4",
    label: "Tailwind",
    icon: SiTailwindcss,
  },
  TailwindCSS: {
    color: "#06B6D4",
    label: "Tailwind",
    icon: SiTailwindcss,
  },
  GSAP: {
    color: "#88CE02",
    label: "GSAP",
    icon: SiGreensock,
  },
  Typescript: {
    color: "#3178C6",
    label: "TypeScript",
    icon: SiTypescript,
  },
  TYPESCRIPT: {
    color: "#3178C6",
    label: "TypeScript",
    icon: SiTypescript,
  },
};

const PROJECTS = [
  {
    name: "Fizzy",
    desc: "An animated e-commerce landing page for the fictional soda brand, Fizzi!",
    tech: ["React", "Tailwind", "Typescript", "GSAP"],
    repo: "https://github.com/mitu-akter78/Fizzy-landing-page",
    images: [
      "/projects-img/card1-img/fizzy/img1.png",
      "/projects-img/card1-img/fizzy/img2.png",
      "/projects-img/card1-img/fizzy/img3.png",
    ]
  },
  {
    name: "Nymbus keyboard",
    desc: "An animated e-commerce website for the fictional keyboard brand, Nymbus!",
    tech: ["Next.js", "Tailwind", "GSAP", "Typescript"],
    repo: "https://github.com/mitu-akter78/Nymbus-keyboard",
    images: [
      "/projects-img/card2-img/keyboard/img-11.png",
      "/projects-img/card2-img/keyboard/img-2.png",
      "/projects-img/card2-img/keyboard/img-3.png",
    ]
  },
  {
    name: "Apple landing page",
    desc: "An animated landing page for apple products.",
    tech: ["React", "GSAP", "TailwindCSS", "TYPESCRIPT"],
    repo: "https://github.com/mitu-akter78/Macbook-landing-page",
    images: [
      "/projects-img/card3.img/img1.png",
      "/projects-img/card3.img/img2.png",
      "/projects-img/card3.img/img3.png",
    ]
  }
];

function ProjectCard({ proj, cardRef }: { proj: typeof PROJECTS[0], cardRef: (el: HTMLDivElement | null) => void }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % proj.images.length);
    }, 4500); // Matching Hero timing for consistency
    return () => clearInterval(timer);
  }, [proj.images.length]);

  useEffect(() => {
    // Initial setup
    imageRefs.current.forEach((img, i) => {
      if (img) {
        if (i === 0) {
          gsap.set(img, { zIndex: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1.05 });
        } else {
          gsap.set(img, { zIndex: 0, clipPath: "inset(100% 0% 0% 0%)", scale: 1 });
        }
      }
    });
  }, []);

  useEffect(() => {
    if (currentImgIndex === prevIndexRef.current) return;

    const incomingImg = imageRefs.current[currentImgIndex];
    const outgoingImg = imageRefs.current[prevIndexRef.current];

    if (incomingImg && outgoingImg) {
      // 1. Prepare incoming image (at the bottom)
      gsap.set(incomingImg, {
        zIndex: 10,
        clipPath: "inset(100% 0% 0% 0%)",
        scale: 1,
      });

      // 2. Put outgoing behind
      gsap.set(outgoingImg, { zIndex: 5 });

      const tl = gsap.timeline();

      // Sweep from bottom to top
      tl.to(incomingImg, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.6,
        ease: "expo.inOut",
      }, 0);

      // Outgoing zooms in slightly or out for parallax
      tl.to(outgoingImg, {
        scale: 1.1,
        duration: 1.6,
        ease: "expo.inOut",
      }, 0);

      tl.to(incomingImg, {
        scale: 1.05,
        duration: 1.6,
        ease: "expo.inOut",
      }, 0);

      tl.eventCallback("onComplete", () => {
        gsap.set(outgoingImg, { zIndex: 0, scale: 1, clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(incomingImg, { zIndex: 1 });
        prevIndexRef.current = currentImgIndex;
      });
    }
  }, [currentImgIndex]);

  return (
    <div 
      ref={cardRef}
      className="absolute w-[90%] md:w-[75%] max-w-6xl h-[60vh] md:h-[70vh] rounded-4xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] pointer-events-auto bg-black"
      style={{ 
        willChange: "transform",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden"
      }}
    >
      {/* Background Images Loop with GSAP Reveal */}
      <div className="absolute inset-0 w-full h-full">
        {proj.images.map((img, idx) => (
          <img
            key={idx}
            ref={(el) => { imageRefs.current[idx] = el; }}
            src={img}
            alt={`${proj.name} screenshot ${idx + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ))}
      </div>
      
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 bg-linear-to-t from-black/90 via-black/20 to-transparent z-20" />

      {/* Content overlay */}
      <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between text-white z-30">
        {/* Top Row: Repo Button */}
        <div className="flex justify-end">
          <a 
            href={proj.repo} 
            target="_blank" 
            rel="noreferrer"
            className="group bg-white/90 backdrop-blur-sm text-black px-3 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-white hover:scale-105 transition-all shadow-lg pointer-events-auto"
          >
            <SiGithub size={18} />
            <span>repo</span>
            <HiArrowRight 
              size={18} 
              className="transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5" 
            />
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
              {proj.tech.map((t, idx) => {
                const techDef = TECH_ICONS[t];
                const Icon = techDef?.icon;
                return (
                  <span
                    key={idx}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap group hover:bg-white/20 transition-colors"
                    style={{ borderColor: techDef ? `${techDef.color}60` : undefined }}
                  >
                    {Icon && <Icon size={16} style={{ color: techDef.color }} />}
                    <span>{techDef ? techDef.label : t}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
          end: "+=400%",
          pin: true,
          scrub: 1,
        }
      });

      tl.to({}, { duration: 0.5 });
      
      tl.to(cards[0], { xPercent: -135, rotationY: 30, duration: 2, ease: "power1.out" }, "transition1");
      tl.to(cards[1], { xPercent: 0, rotationY: 0, duration: 2, ease: "power1.out" }, "transition1");
      tl.to({}, { duration: 0.5 }); 
      
      tl.to(cards[1], { xPercent: -135, rotationY: 30, duration: 2, ease: "power1.out" }, "transition2");
      tl.to(cards[2], { xPercent: 0, rotationY: 0, duration: 2, ease: "power1.out" }, "transition2");
      tl.to({}, { duration: 0.5 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative z-10 w-full h-screen bg-[#080808] overflow-hidden border-b border-orange-800"
    >
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px)`,
          backgroundSize: '10vw 100%'
        }}
      />
      
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

      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none mt-16 md:mt-24"
        style={{ perspective: "1500px" }}
      >
        {PROJECTS.map((proj, i) => (
          <ProjectCard 
            key={i} 
            proj={proj} 
            cardRef={(el) => { cardsRef.current[i] = el; }} 
          />
        ))}
      </div>
    </section>
  );
}
