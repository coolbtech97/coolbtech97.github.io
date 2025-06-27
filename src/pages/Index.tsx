import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Resume from '@/components/Resume';
import Contact from '@/components/Contact';
import ParticleBackground from '@/components/ParticleBackground';

const Index = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    
    // Save theme preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="glass-strong border-t border-white/10 py-8 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2025 Anand. Crafted with ❤️ using React & Tailwind CSS.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Designed with modern web technologies and best practices in mind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
