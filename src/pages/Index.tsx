import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, Easing } from 'framer-motion';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Menu, X, Mail, Linkedin, ArrowRight, Code, Zap, ShieldCheck, Rocket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Engine, MoveDirection, OutMode } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(1, { message: "Message is required." }),
});

// Define types for AnimatedText props
type AnimatedTextProps = {
  text: string;
  el?: React.ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
} & React.HTMLAttributes<HTMLElement>;

// UPDATED: This component now animates word-by-word to prevent awkward line breaks.
const AnimatedText: React.FC<AnimatedTextProps> = ({ text, el: Wrapper = "p", className, stagger = 0.05, delay = 0, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
  const customEase: Easing = [0.22, 1, 0.36, 1];
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: delay + i * stagger, ease: customEase },
    }),
  };

  const words = text.split(" ");

  return (
    <Wrapper ref={ref} className={className} {...props}>
      <span className="sr-only">{text}</span>
      <motion.span initial="hidden" animate={isInView ? "visible" : "hidden"} aria-hidden>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            custom={i}
            variants={variants}
            className="inline-block"
          >
            {word}&nbsp; {/* Render each word with a non-breaking space */}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

// Main page component
const Index = () => {
  const [init, setInit] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("message", data.message);
        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY); 
  
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
  
        const result = await response.json();
  
        if (result.success) {
          toast.success("Your message has been sent successfully!");
          reset();
        } else {
          console.error("Error submitting form:", result);
          toast.error("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        toast.error("An error occurred. Please try again later.");
      }
  }

  const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} onClick={() => setIsMenuOpen(false)} className="block text-4xl md:text-5xl font-bold text-foreground hover:text-primary transition-colors duration-300 py-2 group break-words">
      <span className="relative">
        {children}
        <span className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </span>
    </a>
  );
  
  const expertiseAreas = [
    { icon: Code, title: "Full-Stack Development", description: "Building dynamic, high-performance web applications using React, Node.js, and Python." },
    { icon: Zap, title: "Interactive & Animated UI", description: "Creating fluid, engaging user experiences with Framer Motion and advanced CSS." },
    { icon: ShieldCheck, title: "Automation & System Admin", description: "Writing clean, scalable code and automating workflows for long-term project health." },
    { icon: Rocket, title: "Performance Optimization", description: "Delivering lightning-fast load times and a silky-smooth 60fps user experience." }
  ];
  
  const particlesOptions = {
    background: {
      color: { value: 'transparent' },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
      },
      modes: {
        repulse: {
          distance: 80,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: { value: '#9ca3af' },
      links: {
        color: '#9ca3af',
        distance: 150,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: "bounce" as OutMode,
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: isMobile ? 40 : 80,
      },
      opacity: {
        value: 0.2,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 2 },
      },
    },
    detectRetina: true,
  }

  return (
    <div className="min-h-screen bg-background">
      {init && (
        <Particles id="tsparticles" options={particlesOptions} className="fixed inset-0 -z-10" />
      )}

      <div className="fixed top-6 right-6 z-[100] flex items-center gap-4">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full backdrop-blur-sm bg-card/60 border border-black/10">
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center"
          >
            <nav className="flex flex-col text-center">
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#expertise">Expertise</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-6 relative z-10">
        <section id="home" className="flex flex-col justify-center items-center text-center min-h-screen pt-24 pb-12 md:py-0">
            <div>
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-foreground break-words">
                    <AnimatedText text="Parth Thapa Chhetri" el="span" className="block" />
                </h1>
                <AnimatedText 
                    text="A developer building community-focused digital experiences."
                    el="p" 
                    className="mt-6 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto" 
                    delay={0.6}
                />
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} 
                  className="mt-8 flex flex-wrap justify-center gap-4"
                >
                    <Button asChild size="lg" className="btn-shine rounded-full group bg-primary text-primary-foreground">
                        <a href="#expertise">
                            Explore My Skills <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full group">
                        <Link to="/resume">
                            View Resume
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>

        <section id="about" className="py-16 md:py-24 max-w-3xl mx-auto text-center">
            <AnimatedText text="About Me" el="h2" className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 tracking-tighter break-words" />
            <AnimatedText 
                text="My passion for computer science is rooted in its power to create meaningful change. As a student at Colby College, I've pursued this by building a community platform for users in Nepal and architecting automation for systems, always with a focus on scalability and a great user experience. When I step away from the keyboard, I recharge through hiking, volleyball, and the chaos of a good trivia night." 
                el="p" 
                className="text-base md:text-lg text-muted-foreground" 
                delay={0.3}
            />
        </section>

        <section id="expertise" className="py-16 md:py-24">
          <AnimatedText text="Core Expertise" el="h2" className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 md:mb-12 tracking-tighter text-center break-words" />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {expertiseAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="h-full glass-card hover:border-black/20 transition-all duration-300 flex flex-col p-6">
                  <CardHeader className="p-0 flex flex-row items-center gap-4">
                    <area.icon className="w-8 h-8 text-primary shrink-0"/>
                    <CardTitle className="text-xl md:text-2xl break-words">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-4">
                    <p className="text-muted-foreground text-base">{area.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="cta" className="py-16 md:py-24 text-center">
            <AnimatedText text="Ready to build something amazing?" el="h2" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tighter break-words" />
            <AnimatedText text="Explore my full experience or get in touch to discuss your project." el="p" className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto" delay={0.3}/>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{once: true}} transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="rounded-full group">
                    <a href="/resume">
                        View Full Resume <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full group">
                    <a href="#contact">
                        Get In Touch
                    </a>
                </Button>
            </motion.div>
        </section>

        <section id="contact" className="py-16 md:py-24">
           <AnimatedText text="Contact Me" el="h2" className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-center break-words" />
           <AnimatedText text="Have a project in mind or just want to connect? Send me a message." el="p" className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12 text-center" delay={0.3} />
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                <Card className="max-w-2xl mx-auto glass-card p-6 md:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Input placeholder="Name" {...register("name")} />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{String(errors.name.message)}</p>}
                        </div>
                        <div>
                          <Input type="email" placeholder="Email" {...register("email")} />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{String(errors.email.message)}</p>}
                        </div>
                      </div>
                      <div>
                        <Textarea placeholder="Tell me about your project..." rows={5} {...register("message")} />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{String(errors.message.message)}</p>}
                      </div>
                      <Button type="submit" size="lg" className="w-full btn-shine rounded-full group bg-primary text-primary-foreground" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Inquiry"}
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </form>
                </Card>
            </motion.div>
        </section>

        <footer className="py-12 mt-12 border-t border-black/10 text-center text-muted-foreground">
            <div className="flex justify-center gap-6 mb-4">
                <a href="mailto:pthapa29@colby.edu" aria-label="Email"><Mail className="w-6 h-6 hover:text-primary transition-colors"/></a>
                <a href="https://www.linkedin.com/in/parth-thapa-chhetri/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="w-6 h-6 hover:text-primary transition-colors"/></a>
            </div>
            <p className="text-sm">
                © {new Date().getFullYear()} Parth Thapa Chhetri. All Rights Reserved.
            </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;