
import React from 'react';
import { Download, Eye, Award, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Resume = () => {
  const experiences = [
    {
      title: 'Frontend Developer Intern',
      company: 'Tech Startup Inc.',
      period: 'Jun 2024 - Aug 2024',
      description: 'Developed responsive web components using React and TypeScript. Collaborated with design team to implement pixel-perfect UI designs.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Git']
    },
    {
      title: 'Web Development Freelancer',
      company: 'Self-Employed',
      period: 'Jan 2024 - Present',
      description: 'Built custom websites for local businesses and startups. Managed projects from conception to deployment.',
      skills: ['Full Stack', 'Client Management', 'WordPress', 'SEO']
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Technology - Computer Science',
      institution: 'JBIT Dehradun',
      period: '2024 - 2028 (Expected)',
      gpa: 'CGPA: 8.5/10',
      description: 'Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering, Web Technologies'
    },
    {
      degree: 'Higher Secondary Education',
      institution: 'DAV Public School',
      period: '2022 - 2024',
      gpa: 'Percentage: 92%',
      description: 'Science Stream with Mathematics, Physics, Chemistry, and Computer Science'
    }
  ];

  const achievements = [
    'Winner - College Hackathon 2024',
    'Google Cloud Study Jam Participant',
    'HackerRank 5-star Problem Solver',
    'Contributed to 10+ Open Source Projects',
    'Tech Lead - College Coding Club'
  ];

  const handleDownload = () => {
    // In a real application, this would download the actual PDF
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // This would be the actual resume file
    link.download = 'Anand_Resume.pdf';
    link.click();
  };

  const handlePreview = () => {
    // In a real application, this would open the PDF in a new tab
    window.open('/resume.pdf', '_blank');
  };

  return (
    <section id="resume" className="section-padding bg-gradient-to-b from-transparent to-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gradient">Resume</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A comprehensive overview of my education, experience, and achievements in software development.
          </p>
          
          {/* Download/Preview Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleDownload}
              className="btn-glow bg-primary hover:bg-primary/90 px-8 py-3 text-lg font-medium rounded-full"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Resume
            </Button>
            <Button
              onClick={handlePreview}
              variant="outline"
              className="glass border-primary/50 hover:bg-primary/10 px-8 py-3 text-lg font-medium rounded-full"
            >
              <Eye className="h-5 w-5 mr-2" />
              Preview Resume
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Experience */}
            <div className="glass-strong rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Briefcase className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-2xl font-semibold">Experience</h3>
              </div>
              
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-primary/30">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                    <div className="glass rounded-xl p-4">
                      <h4 className="text-lg font-semibold">{exp.title}</h4>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
                      <p className="text-muted-foreground mb-3">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 text-xs font-medium glass rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-strong rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Award className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-2xl font-semibold">Achievements</h3>
              </div>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center p-3 glass rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                    <span className="font-medium">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Education */}
            <div className="glass-strong rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <GraduationCap className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-2xl font-semibold">Education</h3>
              </div>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-primary/30">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
                    <div className="glass rounded-xl p-4">
                      <h4 className="text-lg font-semibold">{edu.degree}</h4>
                      <p className="text-primary font-medium">{edu.institution}</p>
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-sm text-muted-foreground">{edu.period}</p>
                        <span className="text-sm font-medium text-primary">{edu.gpa}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Summary */}
            <div className="glass-strong rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Core Competencies</h3>
              
              <div className="space-y-4">
                {[
                  { skill: 'Frontend Development', level: 90 },
                  { skill: 'Backend Development', level: 85 },
                  { skill: 'Database Design', level: 80 },
                  { skill: 'UI/UX Design', level: 75 },
                  { skill: 'DevOps & Deployment', level: 70 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.skill}</span>
                      <span className="text-sm text-muted-foreground">{item.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-primary to-blue-600 transition-all duration-1000 ease-out"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="glass-strong rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="w-20 text-muted-foreground">Email:</span>
                  <span className="font-medium">anand@example.com</span>
                </div>
                <div className="flex items-center">
                  <span className="w-20 text-muted-foreground">Phone:</span>
                  <span className="font-medium">+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <span className="w-20 text-muted-foreground">Location:</span>
                  <span className="font-medium">Dehradun, India</span>
                </div>
                <div className="flex items-center">
                  <span className="w-20 text-muted-foreground">LinkedIn:</span>
                  <span className="font-medium text-primary">linkedin.com/in/anand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
