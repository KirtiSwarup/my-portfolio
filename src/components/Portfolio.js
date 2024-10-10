// src/components/portfolio.js
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Brain,
  Cpu,
  MessageSquare,
  BarChart,
  Zap,
  Lightbulb,
  Film,
  Image as ImageIcon,
  Car,
  FileText,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    const particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          color: `hsla(${Math.random() * 360}, 70%, 60%, 0.3)`,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) particle.dx = -particle.dx;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy = -particle.dy;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

const ScrollIndicator = () => {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <ChevronDown className="w-8 h-8 text-[#64ffda]" />
    </motion.div>
  );
};

export default function Portfolio() {
  const [isHovered, setIsHovered] = useState(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { repeat: Infinity, duration: 5 },
    });
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const projects = [
    {
      title: "Movie Finder Pro",
      description: "NLP-based Movie Recommendation System",
      icon: Film,
    },
    {
      title: "Finetuned Diffusion Models",
      description: "Using ControlNets and InstructPix2Pix",
      icon: ImageIcon,
    },
    {
      title: "Conversational AI with LangChain and LLMs",
      description: "Advanced Natural Language Processing",
      icon: MessageSquare,
    },
    {
      title: "Smart Autonomous Vehicle System",
      description: "5G Networks & IoT",
      icon: Car,
    },
  ];

  const skills = [
    { name: "AI", icon: Brain },
    { name: "Machine Learning", icon: Cpu },
    { name: "Deep Learning", icon: Zap },
    { name: "NLP", icon: MessageSquare },
    { name: "Data Analysis", icon: BarChart },
    { name: "Cloud Computing", icon: Lightbulb },
    { name: "Python", icon: Cpu },
    { name: "C++", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#0a192f] text-[#8892b0] relative overflow-hidden">
      <ParticleBackground />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a192f]/80 backdrop-blur-sm">
        <ul className="flex justify-center space-x-6 py-4">
          {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
            <li key={item}>
              <Button
                variant="link"
                className={`text-[#ccd6f6] hover:text-[#64ffda] transition-colors`}
                asChild
              >
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <motion.div
        className="max-w-5xl mx-auto relative z-10 pt-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Home Section */}
        <motion.header
          className="h-screen flex flex-col justify-center items-center text-center mb-12"
          variants={itemVariants}
          id="home"
        >
          <motion.h1
            className="text-7xl font-bold mb-2 text-[#64ffda]"
            animate={controls}
          >
            Kirti Swarup Swain
          </motion.h1>
          <p className="text-3xl text-[#ccd6f6] mb-8">
            AI Engineer & Data Analyst
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Button
              variant="outline"
              size="icon"
              className="bg-[#112240] hover:bg-[#233554] text-[#64ffda] border-[#64ffda]"
              asChild
            >
              <a
                href="https://github.com/kirtiswarup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-[#112240] hover:bg-[#233554] text-[#64ffda] border-[#64ffda]"
              asChild
            >
              <a
                href="https://www.linkedin.com/in/kirtiswarupswain/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-[#112240] hover:bg-[#233554] text-[#64ffda] border-[#64ffda]"
              asChild
            >
              <a href="mailto:swarupkirti52@gmail.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
          <ScrollIndicator />
        </motion.header>

        {/* About Section */}
        <motion.section
          className="mb-24 bg-[#112240] p-8 rounded-lg backdrop-blur-md"
          variants={itemVariants}
          id="about"
        >
          <h2 className="text-4xl font-semibold mb-6 text-[#ccd6f6]">
            About Me
          </h2>
          <div className="text-[#8892b0] text-lg space-y-4">
            <p>
              I am Kirtiswarup Swain, an AI engineer enthusiast and data analyst,
              currently pursuing my BTech in Artificial Intelligence and Machine
              Learning at VIT Chennai. My passion lies in leveraging AI and data
              science to solve complex, real-world problems. With proficiency in
              Python, C++, Data Structures, and Algorithms, I hold certifications
              in AWS and Microsoft Azure, equipping me with strong cloud computing
              skills.
            </p>
            <p>
              My academic projects include Lane Detection for Autonomous Vehicles,
              Conversational AI with LangChain and LLMs, and a Smart Autonomous
              Vehicle system using 5G networks. These experiences have sharpened
              my technical expertise in machine learning, deep learning, and data
              analysis.
            </p>
            <p>
              I am particularly interested in the practical applications of AI
              across industries such as autonomous systems, healthcare, and
              fintech. I continuously seek opportunities to collaborate with AI
              professionals and contribute to innovative projects that drive
              meaningful change.
            </p>
            <p>
              As I work towards completing my degree, I am actively pursuing
              internship opportunities where I can apply my knowledge and grow as
              a professional in the fields of AI and Data Science.
            </p>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section className="mb-24" variants={itemVariants} id="skills">
          <h2 className="text-4xl font-semibold mb-6 text-[#ccd6f6]">
            Expertise
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className="bg-[#112240] hover:bg-[#233554] transition-all duration-300 cursor-pointer overflow-hidden group border-[#64ffda]"
                  onMouseEnter={() => setIsHovered(skill.name)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-[#ccd6f6]">
                      <skill.icon className="h-6 w-6 text-[#64ffda] group-hover:text-[#64ffda] transition-colors duration-300" />
                      <span>{skill.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <motion.div
                    className="h-1 bg-[#64ffda]"
                    initial={{ width: "0%" }}
                    animate={{
                      width: isHovered === skill.name ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section className="mb-24" variants={itemVariants} id="projects">
          <h2 className="text-4xl font-semibold mb-6 text-[#ccd6f6]">
            Innovative Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="bg-[#112240] hover:bg-[#233554] transition-all duration-300 h-full group border-[#64ffda]">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-[#ccd6f6] text-2xl">
                      <project.icon className="h-8 w-8 text-[#64ffda] group-hover:text-[#64ffda] transition-colors duration-300" />
                      <span>{project.title}</span>
                    </CardTitle>
                    <CardDescription className="text-[#8892b0] text-lg">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#8892b0]">
                      {project.title === "Movie Finder Pro"
                        ? "Giving you tailored suggestions to all your Movie requirements."
                        : "Applying cutting-edge AI techniques to solve real-world problems."}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="bg-[#112240] hover:bg-[#233554] text-[#64ffda] border-[#64ffda] transition-all duration-300 transform hover:scale-105"
                    >
                      Explore Project
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section variants={itemVariants} id="contact">
          <h2 className="text-4xl font-semibold mb-6 text-[#ccd6f6]">
              Let&apos;s Connect
          </h2>
          <Card className="bg-[#112240] backdrop-blur-md border-[#64ffda]">
            <CardHeader>
              <CardTitle className="text-[#ccd6f6] text-2xl">
                Get in Touch
              </CardTitle>
              <CardDescription className="text-[#8892b0] text-lg">
                Interested in collaborating or have an internship opportunity?
                Let&apos;s Connect
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium text-[#8892b0] mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md bg-[#0a192f] border-[#64ffda] text-[#ccd6f6] placeholder-[#8892b0] focus:border-[#64ffda] focus:ring focus:ring-[#64ffda] focus:ring-opacity-50 transition-all duration-300 text-lg py-3"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium text-[#8892b0] mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md bg-[#0a192f] border-[#64ffda] text-[#ccd6f6] placeholder-[#8892b0] focus:border-[#64ffda] focus:ring focus:ring-[#64ffda] focus:ring-opacity-50 transition-all duration-300 text-lg py-3"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-lg font-medium text-[#8892b0] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="mt-1 block w-full rounded-md bg-[#0a192f] border-[#64ffda] text-[#ccd6f6] placeholder-[#8892b0] focus:border-[#64ffda] focus:ring focus:ring-[#64ffda] focus:ring-opacity-50 transition-all duration-300 text-lg py-3"
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#64ffda] hover:bg-[#64ffdacc] text-[#0a192f] transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg py-6"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
      <footer className="text-center py-6 text-[#8892b0] bg-[#0a192f]/80 backdrop-blur-sm">
        <p>&copy; 2023 Kirti Swarup Swain. All rights reserved.</p>
      </footer>
    </div>
  );
}
