import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isInWindow, setIsInWindow] = useState(true);
  const [hoverState, setHoverState] = useState<'default' | 'link' | 'card' | 'logo'>('default');

  useEffect(() => {
    // Check for touch device or reduced motion
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let cursorX = 0;
    let cursorY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animateCursor = () => {
      const ease = 0.25; // More responsive (was 0.15)

      cursorX += (targetX - cursorX) * ease;
      cursorY += (targetY - cursorY) * ease;

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

      requestAnimationFrame(animateCursor);
    };

    // Hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElement = target.closest('a, button, [data-cursor]');

      if (interactiveElement) {
        const isCard = interactiveElement.closest('.project-card') !== null;
        const isLogo = interactiveElement.closest('.logo') !== null ||
                       interactiveElement.querySelector('.logo') !== null;

        if (isCard) {
          setHoverState('card');
        } else if (isLogo) {
          setHoverState('logo');
        } else {
          setHoverState('link');
        }
      } else {
        setHoverState('default');
      }
    };

    // Window leave/enter handlers
    const handleMouseLeave = () => setIsInWindow(false);
    const handleMouseEnter = () => setIsInWindow(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  const getCursorSize = () => {
    switch (hoverState) {
      case 'card': return 56;
      case 'link': return 40;
      case 'logo': return 28;
      default: return 20;
    }
  };

  const size = getCursorSize();
  const isHollow = hoverState === 'link';
  const showViewText = hoverState === 'card';

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          background: isHollow ? 'transparent' : (showViewText ? 'var(--color-green-primary)' : 'var(--color-text-primary)'),
          border: isHollow ? '2px solid var(--color-text-primary)' : 'none',
          opacity: isInWindow ? (hoverState === 'default' ? 0.9 : 1) : 0,
        }}
      >
        {showViewText && (
          <span className="cursor-text">View</span>
        )}
      </div>

      <style>{`
        /* Hide default cursor globally */
        @media (hover: hover) and (pointer: fine) {
          *,
          a,
          button,
          [role="button"],
          input,
          textarea,
          select {
            cursor: none !important;
          }
        }

        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
          transition: width 0.15s ease, height 0.15s ease, background 0.15s ease, border 0.15s ease, opacity 0.15s ease, margin 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cursor-text {
          font-size: 10px;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: var(--font-body);
        }

        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
          .custom-cursor {
            display: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            cursor: auto !important;
          }
          .custom-cursor {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
