"use client";

import {
  TextStaggerHover,
  StaggerDirection,
  AnimationT,
} from "../ui/text-hover";

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
  target,
  rel,
}: NavLinkProps) => {
  return (
    <a href={href} className={`${className || ""} group`} target={target} rel={rel}>
      <TextStaggerHover 
        text={label} 
        staggerDirection={staggerDirection}
        className="text-white origin-top"
      />
    </a>
  );
};

export { NavLink };