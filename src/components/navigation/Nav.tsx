"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Nav.css";
import { NavLink } from "./Nav-link";

const PRIMARY_LINKS = [
  { label: "Home",     href: "#home"     },
  { label: "About",   href: "#about"    },
  { label: "Skills",  href: "#skills"   },
  { label: "Projects",href: "#projects" },
  { label: "Contact", href: "#contact"  },
];

const SOCIAL_LINKS = [
  { label: "Github",   href: "https://github.com/mitu-akter78", target: "_blank", rel: "noopener noreferrer" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sadia-akter-8a484b3b7/", target: "_blank", rel: "noopener noreferrer" },
  { label: "X",        href: "https://x.com/AkterSadia85872", target: "_blank", rel: "noopener noreferrer" },
];

export default function Nav() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect( () => {
    const navToggler = document.querySelector(".nav-toggler");
    const navBgs     = document.querySelectorAll(".nav-bg");
    let isMenuOpen   = false;
    let isAnimating  = false;

    if (!navToggler) return;

    const tl = gsap.timeline({
      paused: true,
      onComplete:        () => { isAnimating = false; },
      onReverseComplete: () => {
        gsap.set(".nav-link-inner", { y: "100%" });
        isAnimating = false;
      },
    });

    const animateLinksIn = () => {
      gsap.fromTo(
        ".nav-link-inner",
        { y: "100%" },
        { y: "0%", duration: 0.7, stagger: 0.07, ease: "power3.out", delay: 0.8 }
      );
    };

    const handleToggle = () => {
      if (isAnimating) return;
      isAnimating = true;
      svgRef.current?.classList.toggle("is-open");

      if (!isMenuOpen) { tl.play(); animateLinksIn(); }
      else             { tl.reverse(); }
      isMenuOpen = !isMenuOpen;
    };

    navToggler.addEventListener("click", handleToggle);
    const backdrop = document.querySelector(".nav-blur-backdrop");
    backdrop?.addEventListener("click", handleToggle);

    const navLinks = document.querySelectorAll(".nav-primary-link, .nav-social-link");
    navLinks.forEach((link) => link.addEventListener("click", () => {
      if (isMenuOpen) handleToggle();
    }));

    tl.to(".nav-blur-backdrop", {
      opacity: 1,
      backdropFilter: "blur(7px)",
      pointerEvents: "auto",
      duration: 0.8,
      ease: "power3.inOut"
    }, 0);
    tl.to(navBgs, { scaleX: 1, duration: 0.75, stagger: 0.1, ease: "power3.inOut" }, 0);
    tl.to(".nav-items", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.75,
      ease: "power3.inOut",
    }, "-=0.6");

    return () => { tl.kill(); };
  }, []);

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-logo">
          <a href="#home"><span>Sadia</span></a>
        </div>

        <button className="nav-toggler">
          <svg ref={svgRef} viewBox="0 0 32 32" className="nav-hamburger-svg">
            <path className="nav-line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"/>
            <path className="nav-line" d="M7 16 27 16"/>
          </svg>
        </button>
      </nav>

      <div className="nav-content">
        <div className="nav-blur-backdrop" />
        <div className="nav-bg" /><div className="nav-bg" />
        <div className="nav-bg" /><div className="nav-bg" />

        <div className="nav-items">
          <div className="nav-column">
            {PRIMARY_LINKS.map(({ label, href }) => (
              <div key={label} className="link-reveal-wrap">
                <div className="nav-link-inner" style={{ transform: "translateY(100%)" }}>
                  <NavLink
                    href={href}
                    label={label}
                    className="nav-primary-link"
                    staggerDirection="start"
                    animationOut="top"
                    animationIn="bottom"
                  />
                </div>
              </div>
            ))}

            <div className="nav-socials-list">
              {SOCIAL_LINKS.map(({ label, href, target, rel }) => (
                <div key={label} className="link-reveal-wrap">
                  <div className="nav-link-inner" style={{ transform: "translateY(100%)" }}>
                    <NavLink
                      href={href}
                      label={label}
                      className="nav-social-link"
                      showArrow={true}
                      target={target}
                      rel={rel}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}