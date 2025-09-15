import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Calendar, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink,
  Edit,
  Plus,
  Star,
  Users,
  Award
} from "lucide-react";

const Profile = () => {
  // Mock user data
  const user = {
    name: "Alexandra Chen",
    username: "@alexandra_chen",
    bio: "Full-stack developer passionate about creating impactful web applications. Computer Science student at Stanford University.",
    avatar: "/api/placeholder/150/150",
    location: "Stanford, CA",
    joinDate: "January 2024",
    email: "alexandra@stanford.edu",
    github: "github.com/alexandra-chen",
    linkedin: "linkedin.com/in/alexandra-chen"
  };

  const skills = [
    { name: "React", level: 90, endorsements: 23 },
    { name: "TypeScript", level: 85, endorsements: 18 },
    { name: "Python", level: 88, endorsements: 31 },
    { name: "UI/UX Design", level: 75, endorsements: 12 },
    { name: "Node.js", level: 82, endorsements: 15 },
    { name: "Machine Learning", level: 70, endorsements: 8 }
  ];

  const projects = [
    {
      title: "EcoTracker App",
      description: "A React Native app helping users track their carbon footprint and suggest eco-friendly alternatives.",
      tech: ["React Native", "Firebase", "Node.js"],
      github: "github.com/project1",
      demo: "demo-link.com",
      image: "/api/placeholder/400/200"
    },
    {
      title: "AI Study Buddy",
      description: "ML-powered study assistant that creates personalized learning paths for students.",
      tech: ["Python", "TensorFlow", "React"],
      github: "github.com/project2",
      demo: "demo-link2.com",
      image: "/api/placeholder/400/200"
    },
    {
      title: "Campus Connect",
      description: "Social platform connecting students with similar academic interests and study groups.",
      tech: ["Next.js", "PostgreSQL", "Prisma"],
      github: "github.com/project3",
      demo: "demo-link3.com",
      image: "/api/placeholder/400/200"
    }
  ];

  const achievements = [
    { title: "Dean's List", description: "Fall 2023 Semester", icon: Award },
    { title: "Hackathon Winner", description: "Stanford TreeHacks 2024", icon: Star },
    { title: "Research Assistant", description: "AI Lab - Stanford CS", icon: Users }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass-card p-8 mb-8 border-white/10">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Avatar & Basic Info */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white/20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="hero"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                  >
                    <Edit size={14} />
                  </Button>
                </div>
                
                <div className="text-center lg:text-left mt-4">
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <p className="text-foreground/60 mb-4">{user.username}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-2 text-sm text-foreground/70">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {user.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      Joined {user.joinDate}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Contact */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">About</h2>
                  <Button variant="ghost" size="sm">
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                </div>
                
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  {user.bio}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a href={`mailto:${user.email}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Mail size={16} />
                    {user.email}
                  </a>
                  <a href={`https://${user.github}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Github size={16} />
                    GitHub
                  </a>
                  <a href={`https://${user.linkedin}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Skills & Achievements */}
          <div className="lg:col-span-1 space-y-8">
            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass-card p-6 border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Skills</h3>
                  <Button variant="ghost" size="sm">
                    <Plus size={16} />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-foreground/60 flex items-center gap-1">
                          <Users size={12} />
                          {skill.endorsements}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card p-6 border-white/10">
                <h3 className="text-xl font-semibold mb-6">Achievements</h3>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <achievement.icon size={16} className="text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-foreground/60">{achievement.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Projects */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Projects</h3>
                <Button variant="hero">
                  <Plus size={16} className="mr-2" />
                  Add Project
                </Button>
              </div>

              <div className="grid gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="glass-card overflow-hidden hover-lift border-white/10">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <div className="h-48 bg-gradient-secondary rounded-lg m-4 flex items-center justify-center">
                            <span className="text-foreground/50">Project Image</span>
                          </div>
                        </div>
                        <div className="md:w-2/3 p-6">
                          <h4 className="text-xl font-semibold mb-3">{project.title}</h4>
                          <p className="text-foreground/70 mb-4">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="secondary" className="glass-card border-white/20">
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-3">
                            <Button variant="outline" size="sm">
                              <Github size={16} className="mr-2" />
                              Code
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ExternalLink size={16} className="mr-2" />
                              Demo
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;