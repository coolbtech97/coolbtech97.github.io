import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star,
  Users,
  Github,
  ExternalLink,
  Heart
} from "lucide-react";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  // Mock student data
  const students = [
    {
      id: 1,
      name: "Sarah Johnson",
      username: "@sarah_dev",
      university: "MIT",
      location: "Boston, MA",
      bio: "AI researcher passionate about computer vision and neural networks",
      avatar: "/api/placeholder/100/100",
      skills: ["Python", "TensorFlow", "Computer Vision", "React"],
      projectCount: 12,
      endorsements: 45,
      featured: true
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      username: "@marcus_codes",
      university: "Stanford",
      location: "Palo Alto, CA",
      bio: "Full-stack developer building the next generation of web apps",
      avatar: "/api/placeholder/100/100",
      skills: ["JavaScript", "Node.js", "GraphQL", "AWS"],
      projectCount: 8,
      endorsements: 32,
      featured: false
    },
    {
      id: 3,
      name: "Emily Chang",
      username: "@emily_design",
      university: "Carnegie Mellon",
      location: "Pittsburgh, PA",
      bio: "UX designer creating intuitive and accessible digital experiences",
      avatar: "/api/placeholder/100/100",
      skills: ["UI/UX", "Figma", "React", "TypeScript"],
      projectCount: 15,
      endorsements: 67,
      featured: true
    },
    {
      id: 4,
      name: "David Kim",
      username: "@david_blockchain",
      university: "UC Berkeley",
      location: "Berkeley, CA",
      bio: "Blockchain developer exploring decentralized applications",
      avatar: "/api/placeholder/100/100",
      skills: ["Solidity", "Web3", "JavaScript", "Python"],
      projectCount: 6,
      endorsements: 28,
      featured: false
    },
    {
      id: 5,
      name: "Lisa Wang",
      username: "@lisa_data",
      university: "Harvard",
      location: "Cambridge, MA",
      bio: "Data scientist uncovering insights through machine learning",
      avatar: "/api/placeholder/100/100",
      skills: ["Python", "R", "SQL", "Machine Learning"],
      projectCount: 10,
      endorsements: 53,
      featured: true
    },
    {
      id: 6,
      name: "Alex Thompson",
      username: "@alex_mobile",
      university: "Georgia Tech",
      location: "Atlanta, GA",
      bio: "Mobile app developer creating seamless user experiences",
      avatar: "/api/placeholder/100/100",
      skills: ["React Native", "Swift", "Kotlin", "Flutter"],
      projectCount: 9,
      endorsements: 39,
      featured: false
    }
  ];

  const popularSkills = [
    "React", "Python", "JavaScript", "UI/UX", "Machine Learning",
    "Node.js", "TypeScript", "AWS", "Mobile Development", "Data Science"
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkill = selectedSkill === "" || student.skills.includes(selectedSkill);
    
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Amazing <span className="gradient-text">Students</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Connect with talented students from top universities and explore their incredible projects
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="glass-card p-6 border-white/10">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={20} />
                <Input
                  placeholder="Search students, universities, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass-card border-white/20"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                Filters
              </Button>
            </div>

            {/* Popular Skills Filter */}
            <div>
              <p className="text-sm text-foreground/60 mb-3">Filter by skill:</p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedSkill === "" ? "default" : "secondary"}
                  className={`cursor-pointer hover-lift ${selectedSkill === "" ? "bg-gradient-primary" : "glass-card border-white/20"}`}
                  onClick={() => setSelectedSkill("")}
                >
                  All Skills
                </Badge>
                {popularSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={selectedSkill === skill ? "default" : "secondary"}
                    className={`cursor-pointer hover-lift ${selectedSkill === skill ? "bg-gradient-primary" : "glass-card border-white/20"}`}
                    onClick={() => setSelectedSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <p className="text-foreground/60">
            Showing {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Student Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-card hover-lift cursor-pointer border-white/10 overflow-hidden group relative">
                {student.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="default" className="bg-gradient-primary">
                      <Star size={12} className="mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}

                <div className="p-6">
                  {/* Profile Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-16 h-16 border-2 border-white/20">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {student.name}
                      </h3>
                      <p className="text-sm text-foreground/60 mb-1">{student.username}</p>
                      <p className="text-sm text-foreground/60">{student.university}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-foreground/60 mb-3">
                    <MapPin size={14} />
                    {student.location}
                  </div>

                  {/* Bio */}
                  <p className="text-foreground/80 mb-4 line-clamp-2">
                    {student.bio}
                  </p>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {student.skills.slice(0, 3).map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary" 
                          className="text-xs glass-card border-white/20"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {student.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs glass-card border-white/20">
                          +{student.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-foreground/60">
                        <Github size={14} />
                        {student.projectCount} projects
                      </span>
                      <span className="flex items-center gap-1 text-foreground/60">
                        <Users size={14} />
                        {student.endorsements} endorsements
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="hero" size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Heart size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {filteredStudents.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg">
              Load More Students
            </Button>
          </motion.div>
        )}

        {/* No Results */}
        {filteredStudents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No students found</h3>
            <p className="text-foreground/60 mb-6">
              Try adjusting your search terms or filters
            </p>
            <Button variant="hero" onClick={() => { setSearchTerm(""); setSelectedSkill(""); }}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Explore;