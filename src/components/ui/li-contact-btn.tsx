import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { Sparkles } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

interface LiquidMetalButtonProps {
  label?: string;
  onClick?: () => void;
  viewMode?: "text" | "icon";
  /** SVG element to render instead of the Sparkles icon */
  icon?: React.ReactNode;
  /** Text that slides out to the right on hover (icon mode only) */
  hoverLabel?: string;
  /** Underline accent colour for the hover label — defaults to gold */
  hoverLabelColor?: string;
}

export function LiquidMetalButton({
  label = "Contact Me",
  onClick,
  viewMode = "text",
  icon,
  hoverLabel,
  hoverLabelColor = "#eeedfa",
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: External library without types
  const shaderMount = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  const dimensions = useMemo(() => {
    if (viewMode === "icon") {
      return {
        width: 52,
        height: 52,
        innerWidth: 48,
        innerHeight: 48,
        shaderWidth: 52,
        shaderHeight: 52,
      };
    } else {
      return {
        width: 142,
        height: 46,
        innerWidth: 138,
        innerHeight: 42,
        shaderWidth: 142,
        shaderHeight: 46,
      };
    }
  }, [viewMode]);

  useEffect(() => {
    const styleId = "shader-canvas-style-exploded";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-exploded canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes ripple-animation {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const loadShader = async () => {
      try {
        if (shaderRef.current) {
          if (shaderMount.current?.destroy) {
            shaderMount.current.destroy();
          }

          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 4,
              u_softness: 0.5,
              u_shiftRed: 0.3,
              u_shiftBlue: 0.3,
              u_distortion: 0,
              u_contour: 0,
              u_angle: 45,
              u_scale: 8,
              u_shape: 1,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.6,
          );
        }
      } catch (error) {
        console.error("[LiquidMetalButton] Failed to load shader:", error);
      }
    };

    loadShader();

    return () => {
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.4);
      setTimeout(() => {
        if (isHovered) {
          shaderMount.current?.setSpeed?.(1);
        } else {
          shaderMount.current?.setSpeed?.(0.6);
        }
      }, 300);
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = { x, y, id: rippleId.current++ };

      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    }

    onClick?.();
  };

  const showHoverLabel = viewMode === "icon" && hoverLabel;

  return (
    /* Outer wrapper — hover state drives both the 3-D button AND the label */
    <div
      className="liquid-metal-btn-root"
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Hover label that slides out to the right ── */}
      {showHoverLabel && (
        <div
          className="lm-label-wrap"
          style={{
            position: "absolute",
            left: `calc(100% + 12px)`,
            top: "50%",
            transform: "translateY(-50%)",
            overflow: "hidden",
            maxWidth: isHovered ? "140px" : "0px",
            opacity: isHovered ? 1 : 0,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            transition: "max-width 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
          }}
        >
          <span
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              fontSize: "18px",
              fontWeight: 600,
              paddingBottom: "3px",
              position: "relative",
              color: "#ffffff",
              textShadow: "0 1px 6px rgba(10,30,80,0.40)",
            }}
          >
            {hoverLabel}
            {/* animated underline */}
            <span
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "2px",
                width: isHovered ? "100%" : "0%",
                borderRadius: "2px",
                background: hoverLabelColor,
                transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </span>
        </div>
      )}

      {/* ── 3-D button stack ── */}
      <div style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}>
        <div
          style={{
            position: "relative",
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            transformStyle: "preserve-3d",
            /* subtle lift on hover */
            transform: isHovered && !isPressed ? "translateY(-3px)" : "none",
            transition:
              "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), width 0.4s ease, height 0.4s ease",
          }}
        >
          {/* Layer: icon / text label */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
              zIndex: 30,
              pointerEvents: "none",
            }}
          >
            {viewMode === "icon" && (
              icon ? (
                <span
                  style={{
                    color: "rgba(216,238,255,0.90)",
                    display: "flex",
                    alignItems: "center",
                    filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.5))",
                  }}
                >
                  {icon}
                </span>
              ) : (
                <Sparkles
                  size={16}
                  style={{
                    color: "#ffffff",
                    filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.5))",
                  }}
                />
              )
            )}
            {viewMode === "text" && (
              <span
                style={{
                  fontSize: "14px",
                  color: "#ffffff",
                  fontWeight: 400,
                  textShadow: "0px 1px 2px rgba(0,0,0,0.5)",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            )}
          </div>

          {/* Layer: dark inner pill */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              transformStyle: "preserve-3d",
              transform: `translateZ(10px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: `${dimensions.innerWidth}px`,
                height: `${dimensions.innerHeight}px`,
                margin: "2px",
                borderRadius: "100px",
                background: "linear-gradient(180deg,#04a2fd 0%,#01064f 100%)",
                boxShadow: isPressed
                  ? "inset 0px 2px 4px rgba(0,0,0,0.4), inset 0px 1px 2px rgba(0,0,0,0.3)"
                  : "none",
                transition: "box-shadow 0.15s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </div>

          {/* Layer: shader ring */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              transformStyle: "preserve-3d",
              transform: `translateZ(0px) ${isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"}`,
              zIndex: 10,
            }}
          >
            <div
              style={{
                height: `${dimensions.height}px`,
                width: `${dimensions.width}px`,
                borderRadius: "100px",
                boxShadow: isPressed
                  ? "0px 0px 0px 1px rgba(0,0,0,0.5), 0px 1px 2px 0px rgba(0,0,0,0.3)"
                  : isHovered
                    ? "0px 20px 30px 0px rgba(0,0,0,0.4), 0px 12px 6px 0px rgba(0,0,0,0.05), 0px 8px 5px 0px rgba(0,0,0,0.1), 0px 4px 4px 0px rgba(0,0,0,0.15), 0px 1px 2px 0px rgba(0,0,0,0.2)"
                    : "0px 0px 0px 1px rgba(0,0,0,0.3), 0px 36px 14px 0px rgba(0,0,0,0.02), 0px 20px 12px 0px rgba(0,0,0,0.08), 0px 9px 9px 0px rgba(0,0,0,0.12), 0px 2px 5px 0px rgba(0,0,0,0.15)",
                transition: "box-shadow 0.15s cubic-bezier(0.4,0,0.2,1)",
                background: "rgb(0 0 0 / 0)",
              }}
            >
              <div
                ref={shaderRef}
                className="shader-container-exploded"
                style={{
                  borderRadius: "100px",
                  overflow: "hidden",
                  position: "relative",
                  width: `${dimensions.shaderWidth}px`,
                  maxWidth: `${dimensions.shaderWidth}px`,
                  height: `${dimensions.shaderHeight}px`,
                }}
              />
            </div>
          </div>

          {/* Invisible click target */}
          <button
            ref={buttonRef}
            onClick={handleClick}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              outline: "none",
              zIndex: 40,
              transformStyle: "preserve-3d",
              transform: "translateZ(25px)",
              overflow: "hidden",
              borderRadius: "100px",
            }}
            aria-label={hoverLabel ?? label}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                style={{
                  position: "absolute",
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
                  pointerEvents: "none",
                  animation: "ripple-animation 0.6s ease-out",
                }}
              />
            ))}
          </button>
        </div>
      </div>
    </div>
  );
}