"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

/** Walk up the DOM until we find an element with a non-transparent background. */
function getEffectiveBg(el: HTMLElement | null): string {
  while (el && el !== document.body) {
    const bg = getComputedStyle(el).backgroundColor;
    // Skip transparent / fully-clear values
    if (
      bg &&
      bg !== "rgba(0, 0, 0, 0)" &&
      bg !== "transparent" &&
      !bg.startsWith("rgba(0, 0, 0, 0)")
    ) {
      return bg;
    }
    el = el.parentElement;
  }
  return getComputedStyle(document.body).backgroundColor;
}

/** Returns true if the rgb string represents a dark colour (luminance < 128). */
function isBgDark(bg: string): boolean {
  const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return false;
  const [, r, g, b] = match.map(Number);
  // Perceived luminance
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum < 100;
}

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const springConfig = { damping: 30, stiffness: 450 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailConfig = { damping: 20, stiffness: 150 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("button") ||
        !!target.closest("a");
      setIsHovering(isInteractive);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <style>{`
        .custom-cursor-ring {
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid #fff;
          mix-blend-mode: difference;
          left: -22px;
          top: -22px;
        }
        .custom-cursor-dot {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          width: 8px;
          height: 8px;
          background: #fff;
          border-radius: 50%;
          mix-blend-mode: difference;
          left: -4px;
          top: -4px;
        }
      `}</style>

      {/* Trailing Ring (Inverts color based on bg) */}
      <motion.div
        style={{
          translateX: trailX,
          translateY: trailY,
        }}
        animate={{
          scale: isHovering ? 1.8 : isMouseDown ? 0.8 : 1,
          opacity: isHovering ? 1 : 0.8,
          borderWidth: isHovering ? "1px" : "1.5px",
        }}
        className="custom-cursor-ring"
      />

      {/* Persistent White Dot (Inverts color based on bg) */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
        }}
        className="custom-cursor-dot"
      />
    </>
  );
}
