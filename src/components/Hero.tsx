
import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Code, Sparkles, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import TiltCard from './TiltCard';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { 
      href: "https://github.com", 
      icon: Github, 
      color: "hover:text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-black",
      name: "GitHub"
    },
    { 
      href: "https://linkedin.com", 
      icon: Linkedin, 
      color: "hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800",
      name: "LinkedIn"
    },
    { 
      href: "mailto:anand@example.com", 
      icon: Mail, 
      color: "hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600",
      name: "Email"
    }
  ];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Ultra Modern Animated Background */}
      <div className="absolute inset-0">
        {/* Primary Gradient Mesh */}
        <motion.div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 70%, rgba(119, 198, 255, 0.3) 0%, transparent 50%),
              linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.05) 100%)
            `
          }}
          animate={{
            background: [
              `radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
               radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
               radial-gradient(circle at 40% 70%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)`,
              `radial-gradient(circle at 80% 30%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
               radial-gradient(circle at 20% 70%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
               radial-gradient(circle at 60% 20%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)`,
              `radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
               radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
               radial-gradient(circle at 40% 70%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)`
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Dynamic Light Rays */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent"
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 3) * 30}%`,
              transformOrigin: 'center',
            }}
            animate={{
              rotate: [0, 360],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Floating Geometric Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className={`absolute w-4 h-4 ${
              i % 4 === 0 ? 'bg-gradient-to-br from-blue-400 to-purple-600' :
              i % 4 === 1 ? 'bg-gradient-to-br from-purple-400 to-pink-600' :
              i % 4 === 2 ? 'bg-gradient-to-br from-pink-400 to-red-600' :
              'bg-gradient-to-br from-green-400 to-blue-600'
            } ${i % 2 === 0 ? 'rounded-full' : 'rounded-sm rotate-45'}`}
            style={{
              left: `${15 + i * 10}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center px-6">
        {/* Animated Avatar */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <TiltCard tiltIntensity={10} glowEffect={true} scale={1.1}>
            <motion.div 
              className="relative w-40 h-40 mx-auto"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-black/80 backdrop-blur-xl flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <Code className="w-16 h-16 text-white relative z-10" />
                </div>
              </div>
              
              {/* Orbiting Elements */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: `${60 + i * 20}px center`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </motion.div>
          </TiltCard>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h1 
            className="text-7xl md:text-9xl font-black mb-8 leading-none"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <motion.span 
              className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0%', '200%', '0%'],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              Hello
            </motion.span>
            <br />
            <motion.span 
              className="inline-block text-white mt-4"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              I'm{' '}
              <motion.span
                className="inline-block bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.1, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Anand
              </motion.span>
            </motion.span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-8 h-8 text-yellow-400" />
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Full Stack Developer & Tech Innovator
            </motion.h2>

            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
            </motion.div>
          </motion.div>

          <motion.p 
            className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            B.Tech CSE Student at JBIT Dehradun (2024–2028) • Passionate about creating 
            next-generation web experiences with cutting-edge technologies and innovative solutions.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <TiltCard glowEffect={true} scale={1.05}>
            <motion.div
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => scrollToSection('projects')}
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg font-bold rounded-2xl shadow-2xl group border-0"
                size="lg"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  View My Work
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </TiltCard>
          
          <TiltCard glowEffect={true} scale={1.05}>
            <motion.div
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="relative overflow-hidden bg-white/5 backdrop-blur-xl border-2 border-white/20 hover:bg-white/10 text-white px-12 py-4 text-lg font-bold rounded-2xl shadow-2xl group"
                size="lg"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  Get In Touch
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </TiltCard>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="flex justify-center space-x-6 mb-16"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          {socialLinks.map((social, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotate: 180 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <TiltCard tiltIntensity={20} glowEffect={true}>
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 ${social.color} transition-all duration-500 shadow-xl group relative overflow-hidden`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <social.icon className="h-7 w-7 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                </motion.a>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="relative"
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            className="relative p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 hover:bg-white/10 transition-all duration-500 group"
            whileHover={{ scale: 1.2, y: -5 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ 
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.2 },
            }}
          >
            <ArrowDown className="h-6 w-6 text-white group-hover:text-blue-400 transition-colors duration-300" />
            
            {/* Ripple Effect */}
            <motion.div
              className="absolute inset-0 border-2 border-blue-400/30 rounded-full"
              animate={{ 
                scale: [1, 2, 1], 
                opacity: [0.5, 0, 0.5] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeOut" 
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
