import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.innerWidth < 1024) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, select, textarea, .gallery-item")) {
        cursor.classList.add("hovering");
        ring.classList.add("hovering");
      } else {
        cursor.classList.remove("hovering");
        ring.classList.remove("hovering");
      }
    };

    let animFrame: number;
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      animFrame = requestAnimationFrame(animateRing);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    animFrame = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" style={{ display: window.innerWidth < 1024 ? "none" : "block" }} />
      <div ref={ringRef} className="custom-cursor-ring" style={{ display: window.innerWidth < 1024 ? "none" : "block" }} />
    </>
  );
}
