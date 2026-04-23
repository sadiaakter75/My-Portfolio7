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
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000",
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
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1000",
  }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const stepElements = gsap.utils.toArray('.step-item') as HTMLElement[];
      const imgElements = gsap.utils.toArray('.step-img') as HTMLElement[];

      stepElements.forEach((step, i) => {
        const icon = step.querySelector('.step-icon');

        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            gsap.to(step, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", overwrite: true });
            if (icon) gsap.to(icon, { opacity: 1, scale: 1, rotation: 180, duration: 0.6, ease: "back.out(1.5)", overwrite: true });
            if (imgElements[i]) gsap.to(imgElements[i], { opacity: 1, duration: 0.6, ease: "power2.inOut", overwrite: true });
          },
          onLeave: () => {
            gsap.to(step, { opacity: 0.3, y: 10, duration: 0.6, ease: "power2.inOut", overwrite: true });
            if (icon) gsap.to(icon, { opacity: 0, scale: 0.5, rotation: 0, duration: 0.6, ease: "power2.inOut", overwrite: true });
            if (imgElements[i]) gsap.to(imgElements[i], { opacity: 0, duration: 0.6, ease: "power2.inOut", overwrite: true });
          },
          onEnterBack: () => {
            gsap.to(step, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", overwrite: true });
            if (icon) gsap.to(icon, { opacity: 1, scale: 1, rotation: 180, duration: 0.6, ease: "back.out(1.5)", overwrite: true });
            if (imgElements[i]) gsap.to(imgElements[i], { opacity: 1, duration: 0.6, ease: "power2.inOut", overwrite: true });
          },
          onLeaveBack: () => {
            gsap.to(step, { opacity: 0.3, y: 10, duration: 0.6, ease: "power2.inOut", overwrite: true });
            if (icon) gsap.to(icon, { opacity: 0, scale: 0.5, rotation: 0, duration: 0.6, ease: "power2.inOut", overwrite: true });
            if (imgElements[i]) gsap.to(imgElements[i], { opacity: 0, duration: 0.6, ease: "power2.inOut", overwrite: true });
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 w-full bg-[#F4F4F4] text-black">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 flex flex-col md:flex-row gap-10 md:gap-20 items-start">

        {/* Left Column (Scrollable Text) */}
        <div className="w-full md:w-1/2 flex flex-col step-list-wrapper">
          <div className="mb-10 md:mb-12 flex justify-between items-center w-full">
            <h2 className="text-4xl md:text-6xl font-sans tracking-tight font-medium">How it works</h2>
            <span className="text-[#FF4500] font-sans font-medium text-sm tracking-widest uppercase">// Process</span>
          </div>

          <div className="flex flex-col gap-8 md:gap-12 pb-[50vh] pt-[30vh]">
            {STEPS.map((step, i) => (
              <div key={i} className="step-item relative opacity-30 flex gap-6 md:gap-8 transition-opacity">
                <StarIcon className={`step-icon absolute -left-10 md:-left-12 top-0 w-8 h-8 md:w-10 md:h-10 ${i % 2 === 0 ? 'text-[#FF4500]' : 'text-black'} opacity-0 scale-50`} />
                <span className="text-zinc-500 font-mono text-lg md:text-xl font-medium mt-1">{step.num}</span>
                <div className="flex flex-col gap-4">
                  <h3 className="text-3xl md:text-4xl font-sans font-medium text-zinc-900">{step.title}</h3>
                  <p className="text-zinc-500 font-sans text-base md:text-lg leading-relaxed max-w-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Sticky Image) */}
        <div className="hidden md:block w-full md:w-1/2 sticky top-[20vh]">
          <div className="w-full aspect-4/5 relative overflow-hidden bg-zinc-200">
            {STEPS.map((step, i) => (
              <img
                key={i}
                src={step.img}
                alt={step.title}
                className="step-img absolute inset-0 w-full h-full object-cover opacity-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
