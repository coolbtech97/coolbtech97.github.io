
import React, { useEffect, useRef, useMemo } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  originalSize: number;
  pulse: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  const colors = useMemo(() => [
    'rgba(59, 130, 246, 0.8)',   // Blue
    'rgba(139, 92, 246, 0.8)',   // Purple  
    'rgba(236, 72, 153, 0.8)',   // Pink
    'rgba(16, 185, 129, 0.8)',   // Green
    'rgba(245, 158, 11, 0.8)',   // Amber
    'rgba(239, 68, 68, 0.8)',    // Red
    'rgba(34, 197, 94, 0.8)',    // Emerald
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000));
      
      for (let i = 0; i < particleCount; i++) {
        const maxLife = 600 + Math.random() * 400;
        const size = Math.random() * 4 + 2;
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          originalSize: size,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.6 + 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: Math.random() * maxLife,
          maxLife,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    const animate = () => {
      timeRef.current += 0.02;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        particle.life += 1;
        particle.pulse += 0.03;
        
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.speedX = (Math.random() - 0.5) * 0.8;
          particle.speedY = (Math.random() - 0.5) * 0.8;
        }

        // Enhanced mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          const angle = Math.atan2(dy, dx);
          particle.speedX += Math.cos(angle) * force * 0.01;
          particle.speedY += Math.sin(angle) * force * 0.01;
          
          // Increase size when near mouse
          particle.size = particle.originalSize * (1 + force * 0.5);
        } else {
          particle.size += (particle.originalSize - particle.size) * 0.05;
        }

        // Apply wave motion
        particle.x += particle.speedX + Math.sin(timeRef.current + particle.x * 0.01) * 0.5;
        particle.y += particle.speedY + Math.cos(timeRef.current + particle.y * 0.01) * 0.5;
        
        // Apply damping
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;

        // Boundary wrapping with smooth transition
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Enhanced opacity with pulsing effect
        const lifeRatio = particle.life / particle.maxLife;
        const pulseEffect = Math.sin(particle.pulse) * 0.3 + 0.7;
        const currentOpacity = particle.opacity * Math.sin(lifeRatio * Math.PI) * pulseEffect;

        // Draw particle with enhanced effects
        ctx.save();
        ctx.globalAlpha = currentOpacity;
        
        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = particle.color;
        
        // Create gradient for particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(0.7, particle.color.replace('0.8', '0.4'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner bright core
        ctx.shadowBlur = 5;
        ctx.fillStyle = particle.color.replace('0.8', '1');
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        // Enhanced connections with animated lines
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              const opacity = (1 - distance / 120) * 0.3;
              
              ctx.save();
              ctx.globalAlpha = opacity * currentOpacity;
              
              // Animated gradient line
              const gradient = ctx.createLinearGradient(
                particle.x, particle.y, 
                otherParticle.x, otherParticle.y
              );
              gradient.addColorStop(0, particle.color);
              gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
              gradient.addColorStop(1, otherParticle.color);
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 2;
              ctx.shadowBlur = 10;
              ctx.shadowColor = particle.color;
              
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              
              ctx.restore();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        opacity: 0.9,
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default ParticleBackground;
