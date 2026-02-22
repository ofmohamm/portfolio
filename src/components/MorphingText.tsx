import { useEffect, useState } from 'react';

interface Props {
  words: string[];
  interval?: number;
  className?: string;
}

export default function MorphingText({ words, interval = 3000, className = '' }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Just show the first word if reduced motion is preferred
      return;
    }

    const cycleWords = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 300);
    }, interval);

    return () => clearInterval(cycleWords);
  }, [words, interval]);

  return (
    <span
      className={`morphing-text ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        display: 'inline-block',
      }}
    >
      {words[currentIndex]}

      <style>{`
        .morphing-text {
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
      `}</style>
    </span>
  );
}
