"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Logo from "../Logo";
import { MenuProps } from "@/types";

export default function Menu({ isOpen, onClose }: MenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.set(overlayRef.current, { pointerEvents: "auto" });
      const tl = gsap.timeline();
      
      tl.to(backdropRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut"
      });

      tl.to(".menu-panel", {
        x: "0%",
        duration: 1.2,
        ease: "power4.inOut",
      }, "-=0.8");

      tl.fromTo(
        ".menu-fade-in",
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, stagger: 0.15, ease: "power3.out" },
        "-=0.6"
      );

      tl.fromTo(
        ".menu-item",
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: "power4.out" },
        "-=0.8"
      );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlayRef.current, { pointerEvents: "none" });
        }
      });

      tl.to(".menu-panel", {
        x: "100%",
        duration: 1.0,
        ease: "power4.inOut",
      });

      tl.to(backdropRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, "-=0.8");
    }
  }, [isOpen]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-80 pointer-events-none overflow-hidden">
      {/* Backdrop */}
      <div 
        ref={backdropRef}
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 opacity-0 cursor-pointer transition-opacity ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} 
      />

      {/* Menu Panel */}
      <div className="menu-panel absolute top-0 right-0 w-full md:w-[600px] h-full bg-white translate-x-full flex flex-col justify-between p-10 md:p-20 text-black shadow-2xl pointer-events-auto">
        
        <div className="flex flex-col gap-2 menu-fade-in">
          <span className="text-zinc-400 text-xs uppercase tracking-widest font-bold">Menu</span>
          <div className="w-10 h-[2px] bg-zinc-200" />
        </div>

        <nav className="flex flex-col gap-6 text-5xl md:text-7xl uppercase font-bold tracking-tighter">
          <div className="overflow-hidden">
            <a href="#projects" onClick={onClose} className="menu-item block hover:text-zinc-500 transition-colors w-fit">Projects</a>
          </div>
          <div className="overflow-hidden">
            <a href="#about" onClick={onClose} className="menu-item block hover:text-zinc-500 transition-colors w-fit">About</a>
          </div>
          <div className="overflow-hidden">
            <a href="#services" onClick={onClose} className="menu-item block hover:text-zinc-500 transition-colors w-fit">Services</a>
          </div>
          <div className="overflow-hidden">
            <a href="#contact" onClick={onClose} className="menu-item block hover:text-zinc-500 transition-colors w-fit">Contact</a>
          </div>
        </nav>

        <div className="flex flex-col gap-10 mt-10 menu-fade-in">
          
          <div className="flex flex-wrap gap-x-8 gap-y-6 text-sm font-sans uppercase font-bold tracking-widest">
            <a href="https://github.com/sadiaakter75" className="hover:text-zinc-500 transition-colors">Github</a>
            <a href="https://x.com/AkterSadia85872" className="hover:text-zinc-500 transition-colors">Twitter</a>
            <a href="https://www.linkedin.com/in/sadia-akter-8a484b3b7/" className="hover:text-zinc-500 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}
