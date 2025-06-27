
import React from 'react';
import { Code, Database, Globe, Smartphone, Server, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: 'Frontend Development',
      skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
      color: 'from-blue-500 to-cyan-500',
      glowColor: 'shadow-blue-500/30',
      bgGradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10'
    },
    {
      icon: Server,
      title: 'Backend Development',
      skills: ['Node.js', 'Express.js', 'Python', 'REST APIs', 'GraphQL', 'MongoDB', 'PostgreSQL'],
      color: 'from-green-500 to-emerald-500',
      glowColor: 'shadow-green-500/30',
      bgGradient: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10'
    },
    {
      icon: Database,
      title: 'Database & Cloud',
      skills: ['MongoDB', 'PostgreSQL', 'Firebase', 'AWS', 'Docker', 'Git', 'Linux'],
      color: 'from-purple-500 to-violet-500',
      glowColor: 'shadow-purple-500/30',
      bgGradient: 'bg-gradient-to-br from-purple-500/10 to-violet-500/10'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      skills: ['React Native', 'Flutter', 'Android Studio', 'iOS Development', 'Progressive Web Apps'],
      color: 'from-pink-500 to-rose-500',
      glowColor: 'shadow-pink-500/30',
      bgGradient: 'bg-gradient-to-br from-pink-500/10 to-rose-500/10'
    },
    {
      icon: Palette,
      title: 'Design & Tools',
      skills: ['Figma', 'Adobe XD', 'Photoshop', 'UI/UX Design', 'Prototyping', 'Wireframing'],
      color: 'from-orange-500 to-amber-500',
      glowColor: 'shadow-orange-500/30',
      bgGradient: 'bg-gradient-to-br from-orange-500/10 to-amber-500/10'
    },
    {
      icon: Globe,
      title: 'Other Technologies',
      skills: ['Redux', 'Webpack', 'Jest', 'Cypress', 'Agile', 'Scrum', 'DevOps'],
      color: 'from-indigo-500 to-blue-500',
      glowColor: 'shadow-indigo-500/30',
      bgGradient: 'bg-gradient-to-br from-indigo-500/10 to-blue-500/10'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="skills" className="section-padding bg-gradient-to-b from-transparent via-black/10 to-transparent relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-6xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A comprehensive toolkit of modern technologies and frameworks I use to bring ideas to life with cutting-edge solutions.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <TiltCard className="h-full" tiltIntensity={8} glowEffect={true} scale={1.05}>
                <div className={`glass-strong rounded-2xl p-8 h-full backdrop-blur-xl border border-white/10 shadow-2xl ${category.glowColor} hover:shadow-3xl transition-all duration-700 group relative overflow-hidden`}>
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Category Header */}
                  <div className="flex items-center mb-8 relative z-10">
                    <motion.div 
                      className={`p-4 rounded-xl bg-gradient-to-r ${category.color} shadow-lg group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: [0, -5, 5, 0],
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <category.icon className="h-7 w-7 text-white relative z-10" />
                      <motion.div 
                        className="absolute inset-0 bg-white/20"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <h3 className="text-2xl font-bold ml-4 group-hover:text-white transition-colors duration-500 relative z-10">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4 mb-8 relative z-10">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        className="flex items-center justify-between p-4 glass rounded-xl hover:bg-white/10 transition-all duration-500 group/skill relative overflow-hidden"
                        whileHover={{ x: 8, scale: 1.02 }}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: (index * 0.1) + (skillIndex * 0.05) 
                        }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover/skill:opacity-10 transition-opacity duration-300`}
                        />
                        <span className="font-semibold group-hover/skill:text-white transition-colors duration-300 relative z-10">
                          {skill}
                        </span>
                        <div className="flex space-x-1 relative z-10">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                                i < (Math.floor(Math.random() * 2) + 3) 
                                  ? `bg-gradient-to-r ${category.color} shadow-lg`
                                  : 'bg-muted/40'
                              }`}
                              initial={{ scale: 0, rotate: 180 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              transition={{ 
                                duration: 0.4, 
                                delay: (index * 0.1) + (skillIndex * 0.05) + (i * 0.03),
                                type: "spring",
                                stiffness: 200
                              }}
                              whileHover={{ scale: 1.4, rotate: 360 }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced Progress Indicator */}
                  <div className="pt-6 border-t border-white/10 relative z-10">
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                      <span className="font-medium">Overall Proficiency</span>
                      <motion.span 
                        className="font-bold text-white"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                      >
                        Expert
                      </motion.span>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-4 overflow-hidden backdrop-blur-sm">
                      <motion.div 
                        className={`h-4 rounded-full bg-gradient-to-r ${category.color} shadow-lg relative overflow-hidden`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${88 + Math.floor(Math.random() * 12)}%` }}
                        transition={{ 
                          duration: 2, 
                          delay: index * 0.15, 
                          ease: "easeOut" 
                        }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          animate={{ x: [-100, 200] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "linear",
                            delay: index * 0.2
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <TiltCard glowEffect={true} scale={1.03}>
            <div className="glass-strong rounded-3xl p-10 max-w-4xl mx-auto backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-700 relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <motion.h3 
                className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-purple-400 via-blue-500 to-pink-500 bg-clip-text text-transparent relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Continuous Innovation
              </motion.h3>
              <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl mx-auto relative z-10">
                Technology evolves rapidly, and so do I. I'm constantly exploring cutting-edge frameworks, 
                AI/ML integration, Web3 technologies, and advanced system design patterns to deliver 
                next-generation solutions.
              </p>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
