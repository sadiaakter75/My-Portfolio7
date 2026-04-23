"use client";

import { useState } from "react";
import Logo from "../Logo";
import Menu from "./Menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-5 flex justify-between items-start z-999 pointer-events-none">
        {/* Left: Logo */}
        <div className="flex pointer-events-auto -mt-1 md:-mt-8">
          <Logo className="w-32 md:w-44 h-auto" />
        </div>

        {/* Center: Navigation Text (Hidden on mobile) */}
        <div 
          className="hidden md:flex gap-10 lg:gap-32 pointer-events-auto text-left font-sans text-[11px] md:text-xs font-semibold leading-[1.3] text-white mix-blend-difference"
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="w-[220px]">
            <p> &nbsp; &nbsp; &nbsp;Cutting-edge web development.</p>
            <p>Driven by performance. Built with</p>
            <p>modern technologies.</p>
          </div>
        </div>

        {/* Right: Menu Toggle */}
        <div className="flex items-center pr-6 md:pr-6 gap-6 text-sm font-sans uppercase font-medium pointer-events-auto">
          <div className="relative" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
            <style>{`
              #menu-checkbox {
                display: none;
              }

              .toggle {
                position: relative;
                width: 34px;
                cursor: pointer;
                margin: auto;
                display: block;
                height: calc(3px * 3 + 8px * 2);
              }

              .bar {
                position: absolute;
                left: 0;
                right: 0;
                height: 3px;
                border-radius: 2px;
                background: ${isMenuOpen ? 'black' : 'white'};
                opacity: 1;
                transition: background-color 0.4s ease, all 0.35s cubic-bezier(.5,-0.35,.35,1.5) 0s;
              }

              .bar--top {
                bottom: calc(50% + 8px + 3px/ 2);
                transition-property: bottom,margin,transform,background-color;
                transition-delay: calc(0s + 0.35s),0s,0s,0s;
              }

              .bar--middle {
                top: calc(50% - 3px/ 2);
                transition-property: top,opacity,background-color;
                transition-duration: 0.35s,0s,0.4s;
                transition-delay: calc(0s + 0.35s * 1.3),calc(0s + 0.35s * 1.3),0s;
              }

              .bar--bottom {
                top: calc(50% + 8px + 3px/ 2);
                transition-property: top,transform,background-color;
                transition-delay: 0s,0s,0s;
              }

              #menu-checkbox:checked + .toggle .bar--top {
                bottom: calc(50% - 8px - 3px);
                margin-bottom: calc(8px + 3px/ 2);
                transform: rotate(45deg);
                transition-delay: calc(0s + 0.35s * .3),calc(0s + 0.35s * 1.3),calc(0s + 0.35s * 1.3),0s;
              }

              #menu-checkbox:checked + .toggle .bar--middle {
                top: calc(50% + 8px);
                opacity: 0;
                transition-duration: 0.35s,0s,0.4s;
                transition-delay: 0s,calc(0s + 0.35s),0s;
              }

              #menu-checkbox:checked + .toggle .bar--bottom {
                top: calc(50% - 3px/ 2);
                transform: rotate(-45deg);
                transition-delay: calc(0s + 0.35s * 1.3),calc(0s + 0.35s * 1.3),0s;
              }
            `}</style>
            <input 
              type="checkbox" 
              id="menu-checkbox" 
              checked={isMenuOpen}
              onChange={() => setIsMenuOpen(!isMenuOpen)}
            />
            <label className="toggle" htmlFor="menu-checkbox">
              <div className="bar bar--top" />
              <div className="bar bar--middle" />
              <div className="bar bar--bottom" />
            </label>
          </div>
        </div>
      </header>
    </>
  );
}
