import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Brain, 
  Terminal,
  MapPin,
  Calendar,
  GraduationCap,
  Target,
  ExternalLink,
  Star,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroBg from '@/assets/hero-bg.jpg';
import profilePic from '@/assets/profile-picture.jpg';

// Typing animation component
const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < text.length) {
          setCurrentText(text.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(text.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);

  return (
    <span className="text-primary">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// ASCII Art component
const ASCIIArt = () => {
  const asciiArt = `
    @@@@@@@@@@@@@@@@
  @@@@@@@@@@@@@@@@@@@@
 @@@@@@@@@@@@@@@@@@@@@@
@@@@@@    @@@@    @@@@@@
@@@@  @@@@@@@@@@@@  @@@@
@@@@  @@@@@@@@@@@@  @@@@
@@@@@@    @@@@    @@@@@@
 @@@@@@@@@@@@@@@@@@@@@@
  @@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@
      @@@@@@@@@@@@
        @@@@@@@@
          @@@@
           @@
  `;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="hidden lg:block absolute right-8 top-1/2 transform -translate-y-1/2 z-10"
    >
      <pre className="text-primary/30 text-xs leading-tight font-mono">
        {asciiArt}
      </pre>
    </motion.div>
  );
};

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i);
  
  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

// Skill badge component
const SkillBadge = ({ skill, delay }: { skill: string; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.1, y: -5 }}
      className="group"
    >
      <Badge 
        variant="outline" 
        className="px-4 py-2 text-sm bg-card/50 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer glow-primary group-hover:shadow-lg"
      >
        {skill}
      </Badge>
    </motion.div>
  );
};

// Project card component
const ProjectCard = ({ 
  title, 
  description, 
  tech, 
  github, 
  live, 
  featured = false 
}: { 
  title: string; 
  description: string; 
  tech: string[]; 
  github?: string; 
  live?: string; 
  featured?: boolean 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`group relative ${featured ? 'md:col-span-2' : ''}`}
    >
      <Card className="h-full bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden">
        {featured && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-accent text-accent-foreground">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}
        
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {title}
            </h3>
            <div className="flex gap-2">
              {github && (
                <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                  <Github className="w-4 h-4" />
                </Button>
              )}
              {live && (
                <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4 flex-grow">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tech.map((item, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Portfolio() {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const skills = {
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'Shadcn UI', 'Framer Motion', 'TypeScript'],
    backend: ['Node.js', 'Express.js', 'Prisma', 'Socket.IO', 'Redis', 'Kafka'],
    database: ['PostgreSQL', 'MongoDB'],
    auth: ['NextAuth.js', 'Google OAuth', 'Auth0'],
    tools: ['Git', 'GitHub', 'Vercel', 'Docker'],
    ai: ['LLMs', 'TTS/STT APIs', 'Google TTS']
  };

  const projects = [
    {
      title: 'Hello - Real-time Chat App',
      description: 'A modern chat application with real-time messaging, built with Socket.IO and Redis for scalability.',
      tech: ['React', 'Socket.IO', 'Redis', 'Node.js', 'PostgreSQL'],
      github: '#',
      live: '#',
      featured: true
    },
    {
      title: 'AI Interview Assistant',
      description: 'Voice-only AI interview preparation app with real-time TTS/STT integration.',
      tech: ['Next.js', 'OpenAI API', 'Google TTS', 'WebRTC'],
      github: '#',
      live: '#'
    },
    {
      title: 'Coaching Center Management',
      description: 'Role-based system for managing students, teachers, and administrative tasks.',
      tech: ['React', 'Prisma', 'NextAuth.js', 'PostgreSQL'],
      github: '#'
    },
    {
      title: 'Resume Builder Pro',
      description: 'Dynamic resume builder with multiple templates and export functionality.',
      tech: ['Next.js', 'Tailwind CSS', 'jsPDF', 'Zustand'],
      github: '#',
      live: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <FloatingParticles />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="text-xl font-bold text-primary"
              whileHover={{ scale: 1.05 }}
            >
              &lt;SumitPandey /&gt;
            </motion.div>
            
            <div className="hidden md:flex space-x-8">
              {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-foreground hover:text-primary transition-colors cursor-pointer"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            <Button className="magnetic-button bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-background/70" />
        <ASCIIArt />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6"
            >
              <div className="relative w-32 h-32 mx-auto">
                <img 
                  src={profilePic} 
                  alt="Sumit Pandey" 
                  className="w-full h-full rounded-full object-cover border-4 border-primary/30 glow-primary"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent" />
              </div>
            </motion.div>
            
            <div className="inline-flex items-center gap-2 bg-card/50 px-4 py-2 rounded-full border border-primary/30 mb-6">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Available for opportunities</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Hi, I'm{' '}
            <span className="text-primary glow-primary">Sumit Pandey</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl mb-8 h-16 flex items-center justify-center"
          >
            <TypewriterText 
              texts={[
                'AI Enthusiast.',
                'Full Stack Builder.',
                'Engineering Minds.'
              ]} 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button size="lg" className="magnetic-button glow-primary">
              <Brain className="w-5 h-5 mr-2" />
              Explore My Work
            </Button>
            <Button variant="outline" size="lg" className="magnetic-button">
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center space-x-6"
          >
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Mail, href: '#', label: 'Email' }
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.2, y: -5 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-primary" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 bg-card/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About <span className="text-primary">Me</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a passionate <strong className="text-foreground">Full Stack Developer</strong> and 
                  <strong className="text-primary"> AI enthusiast</strong> currently pursuing B.Sc. (Hons) 
                  Computer Science at the University of Delhi.
                </p>
                
                <p>
                  My journey in tech started with curiosity about how applications work, 
                  and now I'm building scalable web applications while diving deep into 
                  the world of Artificial Intelligence.
                </p>
                
                <p>
                  As a <strong className="text-foreground">GATE DA aspirant</strong>, I'm working 
                  towards my goal of becoming an AI Engineer, combining my development skills 
                  with cutting-edge AI technologies.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: MapPin, label: 'Delhi, India' },
                  { icon: Calendar, label: 'July 5, 2005' },
                  { icon: GraduationCap, label: 'CS at DU' },
                  { icon: Target, label: 'AI Engineer' }
                ].map(({ icon: Icon, label }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-sm">{label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-card p-8 rounded-2xl border border-border/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
                
                <div className="relative z-10">
                  <Terminal className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-4">Current Focus</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Building scalable web applications</li>
                    <li>• Learning advanced AI/ML concepts</li>
                    <li>• Contributing to open source</li>
                    <li>• Preparing for GATE DA</li>
                    <li>• Exploring emerging technologies</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Skills & <span className="text-primary">Technologies</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit for building modern applications and exploring AI
            </p>
          </motion.div>

          <div className="grid gap-8">
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -100 }}
                animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-card/50 p-6 rounded-xl border border-border/50"
              >
                <h3 className="text-lg font-semibold mb-4 capitalize text-primary">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill, index) => (
                    <SkillBadge 
                      key={skill} 
                      skill={skill} 
                      delay={categoryIndex * 0.1 + index * 0.05} 
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-20 bg-card/30">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my work in web development and AI applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" className="magnetic-button">
              <Github className="w-5 h-5 mr-2" />
              View All Projects
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's <span className="text-primary">Connect</span>
            </h2>
            
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, collaborating on 
              interesting projects, or just having a chat about technology and AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="magnetic-button glow-primary">
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
              
              <Button variant="outline" size="lg" className="magnetic-button">
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>

            <div className="flex justify-center space-x-8 mt-12">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:', label: 'Email' }
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="p-3 bg-card rounded-full border border-border/50 group-hover:border-primary/50 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm">{label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Built with ❤️ using React, Tailwind CSS, and Framer Motion
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © 2024 Sumit Pandey. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}