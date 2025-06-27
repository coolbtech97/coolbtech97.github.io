
import React, { useState } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'fullstack',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative project management tool built with Next.js and Firebase. Real-time updates, team collaboration, and progress tracking.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
      tags: ['Next.js', 'Firebase', 'TypeScript', 'Tailwind'],
      category: 'frontend',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true
    },
    {
      id: 3,
      title: 'Weather Forecast API',
      description: 'RESTful API service providing weather data with caching, rate limiting, and comprehensive documentation. Built with Express.js and Redis.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop',
      tags: ['Express.js', 'Redis', 'API', 'Node.js'],
      category: 'backend',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website with glassmorphism design, smooth animations, and optimized performance.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop',
      tags: ['React', 'Tailwind', 'Framer Motion', 'Vite'],
      category: 'frontend',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false
    },
    {
      id: 5,
      title: 'Chat Application',
      description: 'Real-time messaging app with Socket.io, user authentication, file sharing, and group chat functionality.',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=500&h=300&fit=crop',
      tags: ['Socket.io', 'React', 'Express', 'MongoDB'],
      category: 'fullstack',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true
    },
    {
      id: 6,
      title: 'Learning Management System',
      description: 'Educational platform with course management, progress tracking, quizzes, and video streaming capabilities.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop',
      tags: ['React', 'Node.js', 'PostgreSQL', 'AWS S3'],
      category: 'fullstack',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work, demonstrating my skills in various technologies and problem-solving approaches.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">🌟 Highlighted Work</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group glass-strong rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <Button size="sm" className="glass rounded-full p-2">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs font-medium glass rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass border-primary/50 hover:bg-primary/10 flex-1"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="btn-glow bg-primary hover:bg-primary/90 flex-1"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="glass-strong rounded-full p-2 flex space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group glass rounded-2xl overflow-hidden hover:glass-strong transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {project.featured && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-primary rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs font-medium glass rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs text-muted-foreground">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" className="glass p-2" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="sm" variant="ghost" className="glass p-2" asChild>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="glass-strong rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-gradient">Want to see more?</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              These are just a few highlights from my portfolio. I'm constantly working on new projects 
              and experimenting with emerging technologies. Check out my GitHub for more repositories 
              and contributions to open-source projects.
            </p>
            <Button className="btn-glow bg-primary hover:bg-primary/90" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 mr-2" />
                View All Projects on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
