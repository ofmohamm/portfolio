import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  driftAngle: number;
  driftSpeed: number;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Config
    const isMobile = window.innerWidth < 768;
    const repelRadius = prefersReducedMotion ? 0 : 150;
    const repelStrength = 0.8;
    const connectDistance = 120;

    // Ambient motion settings
    const ambientSpeed = 0.3;
    const ambientChangeRate = 0.02;

    let particles: Particle[] = [];
    let mouse = { x: null as number | null, y: null as number | null, active: false };
    let animationId: number;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];

      // Calculate particle count based on viewport size
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      const count = isMobile ? 40 : Math.min(Math.max(particleCount, 60), 120);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: 0,
          size: Math.random() * 2 + 2,
          opacity: Math.random() * 0.3 + 0.4,
          driftAngle: angle,
          driftSpeed: ambientSpeed * (0.5 + Math.random() * 0.5),
        });
      }
    };

    // Handle mouse events
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Ambient drift (always active)
        if (Math.random() < ambientChangeRate) {
          p.driftAngle += (Math.random() - 0.5) * 0.5;
        }

        const driftVx = Math.cos(p.driftAngle) * p.driftSpeed;
        const driftVy = Math.sin(p.driftAngle) * p.driftSpeed;

        // Apply ambient drift
        p.vx += driftVx * 0.1;
        p.vy += driftVy * 0.1;

        // Mouse repel (when mouse is active)
        if (mouse.active && mouse.x !== null && mouse.y !== null && repelRadius > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repelRadius) {
            const force = (repelRadius - dist) / repelRadius;
            const angle = Math.atan2(dy, dx);

            p.vx += Math.cos(angle) * force * repelStrength;
            p.vy += Math.sin(angle) * force * repelStrength;
          }
        }

        // Apply velocity with damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;

        // Wrap around edges (seamless looping)
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(107, 107, 107, ${p.opacity})`;
        ctx.fill();

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDistance) {
            const opacity = (1 - dist / connectDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(107, 107, 107, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    setCanvasSize();
    initParticles();

    if (!prefersReducedMotion) {
      animate();
    } else {
      // Draw static particles for reduced motion
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(107, 107, 107, ${p.opacity})`;
        ctx.fill();
      });
    }

    // Event listeners
    window.addEventListener('resize', () => {
      setCanvasSize();
      initParticles();
    });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
