
import React from 'react';
import { GraduationCap, Code, Coffee, Users, Trophy, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const About = () => {
  const stats = [
    { icon: GraduationCap, label: 'Education', value: 'B.Tech CSE', color: 'from-blue-500 to-cyan-500' },
    { icon: Code, label: 'Projects', value: '15+', color: 'from-purple-500 to-pink-500' },
    { icon: Coffee, label: 'Coffee Cups', value: '500+', color: 'from-orange-500 to-red-500' },
    { icon: Users, label: 'Team Projects', value: '8+', color: 'from-green-500 to-emerald-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-6xl md:text-7xl font-black mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <motion.p 
              className="text-2xl text-gray-300 max-w-4xl mx-auto"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Passionate about technology and innovation, crafting the future one line of code at a time.
            </motion.p>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Trophy className="w-8 h-8 text-purple-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Content Section */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <TiltCard className="h-full" tiltIntensity={8} glowEffect={true}>
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="relative z-10">
                  <motion.h3 
                    className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    My Journey
                  </motion.h3>
                  <div className="space-y-6 text-gray-300 leading-relaxed">
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      I'm currently pursuing my B.Tech in Computer Science and Engineering at JBIT Dehradun 
                      (2024–2028). My passion lies in full-stack development, where I enjoy crafting both 
                      beautiful user interfaces and robust backend systems.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      I believe in continuous learning and staying updated with the latest technologies. 
                      Whether it's exploring new frameworks, contributing to open-source projects, or 
                      building innovative solutions, I'm always excited to take on new challenges.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      When I'm not coding, you can find me reading tech blogs, experimenting with new tools, 
                      or collaborating with fellow developers on exciting projects.
                    </motion.p>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Education Card */}
            <motion.div variants={itemVariants}>
              <TiltCard tiltIntensity={6} glowEffect={true}>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  />
                  <div className="relative z-10">
                    <motion.h4 
                      className="text-2xl font-bold mb-4 flex items-center text-white"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 mr-4"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <GraduationCap className="h-6 w-6 text-white" />
                      </motion.div>
                      Education
                    </motion.h4>
                    <div className="space-y-2 text-gray-300">
                      <p className="font-semibold text-lg">Bachelor of Technology - Computer Science</p>
                      <p className="text-gray-400">JBIT Dehradun</p>
                      <p className="text-sm text-gray-500">2024 - 2028 (Expected)</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Professional Avatar */}
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <TiltCard tiltIntensity={12} glowEffect={true} scale={1.1}>
                <div className="relative w-80 h-80 mx-auto">
                  <motion.div 
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-full h-full rounded-3xl bg-black/90 backdrop-blur-xl flex items-center justify-center relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"
                        animate={{ 
                          background: [
                            "linear-gradient(45deg, rgba(59,130,246,0.2), rgba(147,51,234,0.2), rgba(236,72,153,0.2))",
                            "linear-gradient(135deg, rgba(147,51,234,0.2), rgba(236,72,153,0.2), rgba(59,130,246,0.2))",
                            "linear-gradient(225deg, rgba(236,72,153,0.2), rgba(59,130,246,0.2), rgba(147,51,234,0.2))",
                            "linear-gradient(315deg, rgba(59,130,246,0.2), rgba(147,51,234,0.2), rgba(236,72,153,0.2))"
                          ]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                      />
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Code className="w-20 h-20 text-white relative z-10" />
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* Orbiting Icons */}
                  {[GraduationCap, Trophy, Zap].map((Icon, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounde-full flex items-center justify-center rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        transformOrigin: `${100 + i * 30}px center`,
                      }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-6"
              variants={containerVariants}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <TiltCard tiltIntensity={10} glowEffect={true}>
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                      />
                      <div className="relative z-10">
                        <motion.div
                          className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 shadow-lg`}
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: [0, -10, 10, 0],
                            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                          <stat.icon className="h-8 w-8 text-white" />
                        </motion.div>
                        <motion.p 
                          className="text-3xl font-black mb-2 text-white"
                          whileHover={{ scale: 1.1 }}
                        >
                          {stat.value}
                        </motion.p>
                        <p className="text-gray-400 font-medium">{stat.label}</p>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
