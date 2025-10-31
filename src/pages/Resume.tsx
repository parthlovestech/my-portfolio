import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';

const resumeData = {
  name: "Parth Thapa Chhetri",
  contact: {
    email: "parth.thapa.chhetri@gmail.com",
    linkedin: "https://www.linkedin.com/in/parth-thapa-chhetri/",
  },
  education: [
    {
      institution: "Colby College",
      degree: "Bachelor of Arts, Computer Science",
      date: "May 2029",
      location: "Waterville, ME",
      courses: ["Computational Thinking", "Calculus"],
    },
    {
      institution: "Premier International IB Continuum School",
      degree: "IB Computer Science HL",
      date: "May 2025",
      location: "Lalitpur, Nepal",
    },
  ],
  experience: [
    {
      title: "Full Stack Developer",
      company: "Khumbu Climbing Centre",
      date: "July 2025 - Present",
      location: "Remote",
      description: [
        "Led end-to-end development of a dynamic educational website, featuring 10+ training modules and a user forum.",
        "Designed a database with Sherpa experts to catalog 15+ training programs, creating a centralized knowledge base for the climbing community in Khumbu.",
      ],
      technologies: ["React", "Node.js", "SQL", "JavaScript"]
    },
    {
      title: "Full Stack Developer",
      company: "Nepal STEM Alliance",
      date: "September 2024 - June 2025",
      location: "New Baneshwor, Nepal",
      description: [
        "Engineered primary website serving 5+ partner schools by collaborating with cross-functional teams to identify and address accessibility needs.",
        "Built data dashboards for computerized reporting, cutting manual data gathering by 10+ hours per week and tracking 5+ key program metrics in real-time.",
      ],
      technologies: ["React", "JavaScript", "HTML/CSS", "Data Visualization"]
    },
    {
      title: "Lead Developer",
      company: "Mero Samaj",
      date: "November 2024 - January 2025",
      location: "Kathmandu, Nepal",
      description: [
        "Created a community reporting platform from concept to deployment, launching to an initial user base of 100+ members and achieving a 90% user satisfaction rating.",
        "Applied creative problem-solving to implement a scalable data collection system that processed hundreds of user submissions.",
      ],
      technologies: ["React", "Node.js", "Project Management", "UI/UX"]
    },
    {
      title: "Automation Engineer",
      company: "Independent Linux Automation Initiative",
      date: "April 2021 - Present",
      location: "Kathmandu, Nepal",
      description: [
        "Designed an automated configuration system for a personal server environment, cutting setup and deployment time for new instances by 40% through scripting.",
        "Engineered a suite of Bash and Python scripts to fully automate routine system operations, including backups and security updates, eliminating 5+ hours of manual maintenance monthly.",
      ],
      technologies: ["Python", "Bash", "Linux", "System Administration"]
    },
  ],
  leadership: [
    {
      title: "Coding Mentor",
      company: "Premier International IB Continuum School",
      date: "May 2023 - May 2025",
      description: [
        "Mentored 30+ students in core programming concepts (Python, HTML/CSS), with 4 students achieving their first freelance developer role.",
        "Guided 5 student teams in developing community-focused projects, including a website for a local business.",
      ]
    },
    {
        title: "Computer Lab Assistant",
        company: "Whitefield Secondary School",
        date: "May 2021 - May 2023",
        description: [
          "Mentored and trained 50+ students and faculty on software applications (MS Office, coding IDEs) and proper use of hardware.",
          "Provided proactive technical support, troubleshooting software conflicts, network issues, and hardware malfunctions.",
        ]
      },
  ],
  skills: {
    "Languages & Databases": ["Python", "SQL", "JavaScript", "HTML/CSS", "MySQL", "Node.js"],
    "Frameworks & Libraries": ["React", "Next.js", "Vite", "TailwindCSS", "Framer Motion"],
    "Tools & Systems": ["Git", "Linux", "Docker", "Bash Scripting", "System Administration"]
  }
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="mb-12"
  >
    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">{title}</h2>
    {children}
  </motion.div>
);

const Resume = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="fixed inset-0 -z-20 bg-aurora"></div>
      
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
          <Button asChild variant="outline" className="rounded-full group">
              <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Home
              </Link>
          </Button>
      </div>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
      >
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight break-words">{resumeData.name}</h1>
          {/* UPDATED: Stack contact info vertically on mobile */}
          <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-x-6 gap-y-2 text-muted-foreground text-sm">
            <a href={`mailto:${resumeData.contact.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail size={16} />
              {resumeData.contact.email}
            </a>
            <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        </header>

        <Separator className="my-12" />

        <Section title="Experience">
          <div className="space-y-8">
            {resumeData.experience.map((job, index) => (
              <div key={index}>
                {/* UPDATED: Responsive flex container stacks vertically on mobile */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-lg font-semibold break-words">{job.title} at <span className="text-primary">{job.company}</span></h3>
                  <p className="text-sm text-muted-foreground font-mono shrink-0 pt-1 sm:pt-0">{job.date}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{job.location}</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {job.description.map((point, i) => <li key={i} className="break-words">{point}</li>)}
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                    {job.technologies?.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Leadership & Civic Engagement">
          <div className="space-y-8">
            {resumeData.leadership.map((role, index) => (
              <div key={index}>
                {/* UPDATED: Responsive flex container stacks vertically on mobile */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-lg font-semibold break-words">{role.title} at <span className="text-primary">{role.company}</span></h3>
                  <p className="text-sm text-muted-foreground font-mono shrink-0 pt-1 sm:pt-0">{role.date}</p>
                </div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {role.description.map((point, i) => <li key={i} className="break-words">{point}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div key={index}>
                {/* UPDATED: Responsive flex container stacks vertically on mobile */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-lg font-semibold break-words">{edu.institution}</h3>
                  <p className="text-sm text-muted-foreground font-mono shrink-0 pt-1 sm:pt-0">{edu.date}</p>
                </div>
                <p className="text-muted-foreground break-words">{edu.degree}</p>
                {edu.courses && <p className="text-sm text-muted-foreground break-words">Relevant Courses: {edu.courses.join(', ')}</p>}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Skills">
          <div className="space-y-4">
            {Object.entries(resumeData.skills).map(([category, skills]) => (
                <div key={category}>
                    <h3 className="font-semibold mb-2">{category}</h3>
                    <motion.div 
                        className="flex flex-wrap gap-2"
                        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        {skills.map(skill => (
                            <motion.div key={skill} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                                <Badge variant="default">{skill}</Badge>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            ))}
          </div>
        </Section>
      </motion.main>
    </div>
  );
};

export default Resume;