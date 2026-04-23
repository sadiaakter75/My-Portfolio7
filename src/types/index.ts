import { ReactNode, CSSProperties } from "react";

export interface MagicTextProps {
  text: string;
}

export interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface StarIconProps {
  className?: string;
  style?: CSSProperties;
}

export interface ServiceStep {
  num: string;
  title: string;
  desc: string;
  img: string;
}

export interface SmoothScrollProps {
  children: ReactNode;
}
