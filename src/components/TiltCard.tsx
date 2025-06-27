
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltIntensity?: number;
  glowEffect?: boolean;
  scale?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({ 
  children, 
  className = '', 
  tiltIntensity = 15,
  glowEffect = true,
  scale = 1.02
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]);

  const glowOpacity = useTransform(
    [mouseXSpring, mouseYSpring],
    ([mouseX, mouseY]: [number, number]) => Math.abs(mouseX) + Math.abs(mouseY)
  );

  const shineOpacity = useTransform(
    [mouseXSpring, mouseYSpring], 
    ([x, y]: [number, number]) => Math.min(Math.abs(x) + Math.abs(y), 0.3)
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {glowEffect && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-xl -z-10"
          style={{ opacity: glowOpacity }}
        />
      )}
      
      <div 
        style={{ 
          transform: 'translateZ(50px)',
          position: 'relative',
          zIndex: 1
        }}
        className="relative"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 pointer-events-none rounded-lg"
          style={{ opacity: shineOpacity }}
        />
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard;
