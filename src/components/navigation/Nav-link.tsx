"use client";

import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
  StaggerDirection,
  AnimationT,
} from "../ui/text-stagger-hover";
import { ArrowUpRight } from "lucide-react";

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
  staggerDirection?: StaggerDirection;
  animationOut?: AnimationT;
  animationIn?: AnimationT;
  showArrow?: boolean;
  target?: string;
  rel?: string;
}

const NavLink = ({
  href,
  label,
  className,
  staggerDirection = "start",
  animationOut = "top",
  animationIn = "bottom",
  showArrow = false,
  target,
  rel,
}: NavLinkProps) => {
  return (
    <a href={href} className={`${className || ""} group`} target={target} rel={rel}>
      <TextStaggerHover as="span">
        <TextStaggerHoverActive
          animation={animationOut}
          className="text-white origin-top"
          staggerDirection={staggerDirection}
        >
          {label}
        </TextStaggerHoverActive>
        <TextStaggerHoverHidden
          animation={animationIn}
          className="origin-bottom"
          charClassName="bg-linear-to-b from-[#ffffff] to-[#323333] bg-clip-text text-transparent"
          staggerDirection={staggerDirection}
        >
          {label}
        </TextStaggerHoverHidden>
      </TextStaggerHover>
      {showArrow && (
        <span className="text-white arrow-icon  transition-transform duration-300 ease-out group-hover:translate-x-1">
          <ArrowUpRight size={14} strokeWidth={2.5} />
        </span>
      )}
    </a>
  );
};

export { NavLink };