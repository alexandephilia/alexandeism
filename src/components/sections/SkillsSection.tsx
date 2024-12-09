// Import necessary dependencies from framer-motion for animations
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
// Import React hooks
import { useRef, useState, useEffect } from 'react';
// Import UI components from shadcn/ui
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Import tooltip components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Import badge component
import { Badge } from "@/components/ui/badge";
// Import icons from react-icons
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiGithub,
  SiVercel,
  SiNetlify,
  SiReplit,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiWebflow,
  SiSupabase,
  SiPython,
  SiOpenai,
  SiFlutter,
  SiNotion,
  SiMarkdown,
  SiAnthropic,
  SiDaisyui,
} from 'react-icons/si';
// Import custom icons
import CursorIcon from '../icons/CursorIcon';
import { RadixIcon } from '../icons/RadixIcon'
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { HiChevronDoubleDown } from 'react-icons/hi';

// Interface defining the structure of a tool/technology
interface Tool {
  icon: React.ElementType;
  name: string;
  level?: string;
  details?: string;
}

// Interface defining the structure of a skill
interface Skill {
  title: string;
  description: string;
  proficiency: number;
  tools: Tool[];
  detailedDescription?: string;
  keyFeatures?: string[];
}

// SkillCard component to display individual skills
const SkillCard: React.FC<Skill & { isExpanded: boolean; onToggle: () => void }> = ({
  title,
  description,
  proficiency,
  tools,
  detailedDescription,
  keyFeatures,
  isExpanded,
  onToggle
}) => {
  const [isNear, setIsNear] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const isNearButton = x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50;

        setIsNear(isNearButton);
        if (isNearButton) {
          setCursorPosition({ x, y });
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <ShimmerButton className="w-full">
      <Card
        onClick={onToggle}
        className={`group hover:shadow-lg transition-all duration-500 cursor-pointer ${
          isExpanded ? 'min-h-[600px]' : 'h-[360px]'
        } flex flex-col dark:bg-black/100 bg-white/[0.1] relative`}
      >
        <CardHeader className="h-[90px] py-4">
          <div className="flex items-center gap-3">
            <div className="w-full">
              <CardTitle className="text-lg md:text-xl mb-2">{title}</CardTitle>
              {/* Progress bar showing skill proficiency */}
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 w-48 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${proficiency}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">{proficiency}%</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2 flex-grow flex flex-col">
          {/* Main content wrapper */}
          <div className="flex-grow space-y-3">
            {/* Description text */}
            <div className="h-[40px] flex items-start overflow-hidden">
              <p className="text-sm text-muted-foreground line-clamp-2 w-full">
                {description}
              </p>
            </div>

            {/* Tools and technologies section */}
            <div className="space-y-3">
              <h4 className="text-sm md:text-base font-medium">Tools & Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 p-2 rounded-md bg-muted hover:bg-accent hover:blur-[2px] transition-all duration-300 cursor-pointer group/tool">
                          <tool.icon className="h-4 w-4 md:h-5 md:w-5 group-hover/tool:scale-110 transition-transform duration-300" />
                          <span className="text-xs md:text-sm">{tool.name}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs md:text-sm">{tool.details}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>

            {/* Expandable content section */}
            <div className="overflow-hidden">
              <AnimatePresence mode="sync" initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: {
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                          mass: 1
                        },
                        opacity: {
                          duration: 0.2,
                          delay: 0.1
                        }
                      }
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: {
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                          mass: 1
                        },
                        opacity: {
                          duration: 0.2
                        }
                      }
                    }}
                    className="pt-4 pb-8 border-t space-y-4"
                  >
                    {/* Detailed description section */}
                    {detailedDescription && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                          mass: 1,
                          delay: 0.1
                        }}
                        className="space-y-2"
                      >
                        <h4 className="text-sm md:text-base font-medium">Overview</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">{detailedDescription}</p>
                      </motion.div>
                    )}

                    {/* Key features section */}
                    {keyFeatures && keyFeatures.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                          mass: 1,
                          delay: 0.2
                        }}
                        className="space-y-2"
                      >
                        <h4 className="text-sm md:text-base font-medium">Key Features</h4>
                        <ul className="list-disc list-inside text-xs md:text-sm text-muted-foreground space-y-1">
                          {keyFeatures.map((feature, index) => (
                            <motion.div
                              key={index}
                              initial={{
                                opacity: 0,
                                y: 10,
                                filter: "blur(12px)",
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                              }}
                              exit={{
                                opacity: 0,
                                y: -10,
                                filter: "blur(12px)",
                              }}
                              transition={{
                                duration: 0.5,
                                delay: 0.1 + index * 0.1,
                                ease: [0.4, 0, 0.2, 1]
                              }}
                              className="relative flex items-center"
                            >
                              <li className="w-full">
                                <span className="relative">
                                  {feature}
                                </span>
                              </li>
                            </motion.div>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {/* Tool proficiency section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        mass: 1,
                        delay: 0.3
                      }}
                      className="space-y-2"
                    >
                      <h4 className="text-sm md:text-base font-medium">Tool Proficiency</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {tools.map((tool, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                              delay: 0.5 + index * 0.15,
                              duration: 0.5
                            }}
                            className="bg-muted p-3 rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <tool.icon className="h-3 w-3 md:h-4 md:w-4" />
                              <span className="text-xs md:text-sm font-medium">{tool.name}</span>
                            </div>
                            {tool.level && (
                              <Badge
                                variant="secondary"
                                className="mt-1 text-[10px] md:text-xs font-normal hover:blur-[2px] transition-all duration-300 bg-muted-foreground/10"
                              >
                                {tool.level}
                              </Badge>
                            )}
                            {tool.details && (
                              <p className="text-[10px] md:text-xs text-muted-foreground mt-2">{tool.details}</p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Arrow icon - position it absolutely at the bottom */}
          <div className={`absolute ${isExpanded ? 'bottom-6' : 'bottom-4'} left-1/2 -translate-x-1/2`}>
            <motion.div
              animate={{
                y: [0, 3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <HiChevronDoubleDown
                className={`h-5 w-5 text-muted-foreground/50 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </ShimmerButton>
  );
};

// Main Skills Section Component
export const SkillsSection: React.FC = () => {
  // State to track expanded skills
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  // Setup scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Add spring physics for smoother animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Create smooth transformations for opacity
  const opacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  // Create smooth transformations for blur effect
  const blurFilter = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  // Function to toggle skill expansion
  const toggleSkill = (title: string) => {
    setExpandedSkills(prev => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  // Define main skills data
  const skills: Skill[] = [
    {
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces.",
      detailedDescription: "Specializing in creating modern, performant web applications with a focus on user experience and accessibility.",
      keyFeatures: [
        "Responsive Design Implementation",
        "State Management",
        "Component Architecture",
        "Performance Optimization",
        "Accessibility (a11y) Integration"
      ],
      proficiency: 90,
      tools: [
        { icon: SiReact, name: "React", level: "Advanced", details: "Context API, Hooks, Custom Hooks" },
        { icon: SiTailwindcss, name: "Tailwind CSS", level: "Advanced", details: "Custom configurations, Responsive design" },
        { icon: SiTypescript, name: "TypeScript", level: "Advanced", details: "Type safety, Interfaces, Generics" },
        { icon: SiNextdotjs, name: "Next.js", level: "Advanced", details: "SSR, ISR, API Routes" },
        { icon: SiHtml5, name: "HTML5", level: "Expert", details: "Semantic markup, SEO best practices" },
        { icon: SiCss3, name: "CSS3", level: "Expert", details: "Animations, Grid, Flexbox" },
        { icon: SiJavascript, name: "JavaScript", level: "Expert", details: "ES6+, Async/Await, DOM manipulation" }
      ]
    },
    {
      title: "Development Tools",
      description: "Utilizing modern development tools and practices for efficient workflows.",
      detailedDescription: "Experienced in using a comprehensive suite of development tools to streamline the development process and ensure code quality.",
      keyFeatures: [
        "Version Control & Collaboration",
        "Continuous Integration/Deployment",
        "Development Environment Setup",
        "Code Quality & Testing",
        "Performance Monitoring"
      ],
      proficiency: 88,
      tools: [
        { icon: SiNodedotjs, name: "Node.js", level: "Advanced", details: "Server-side JavaScript, NPM ecosystem" },
        { icon: SiGithub, name: "GitHub", level: "Advanced", details: "Actions, Projects, Code review" },
        { icon: SiVercel, name: "Vercel", level: "Advanced", details: "Deployment, Edge Functions" },
        { icon: SiNetlify, name: "Netlify", level: "Intermediate", details: "Deployment" },
        { icon: SiReplit, name: "Replit", level: "Intermediate", details: "Collaborative development" },
      ]
    }
  ];

  // Define additional skills data
  const additionalSkills: Tool[] = [
    { icon: SiFramer, name: "Framer", level: "Advanced", details: "Web design and development" },
    { icon: SiWebflow, name: "Webflow", level: "Intermediate", details: "Visual development" },
    { icon: SiFlutter, name: "Flutter", level: "Intermediate", details: "Cross-platform development" },
    { icon: SiNotion, name: "Notion", level: "Advanced", details: "Tracking and Documenting" },
    { icon: SiPython, name: "Python", level: "Intermediate", details: "AI and Local Development" },
    { icon: SiOpenai, name: "OpenAI", level: "Advanced", details: "Prompt engineering" },
    { icon: SiAnthropic, name: "Anthropic", level: "Advanced", details: "Prompt engineering" },
    { icon: SiMarkdown, name: "Markdown", level: "Intermediate", details: "Documentation" },
    { icon: CursorIcon, name: "Cursor", level: "Advanced", details: "AI-powered development" },
    { icon: RadixIcon, name: "RadixUI", level: "Advanced", details: "Headless UI components" },
    { icon: SiVercel, name: "shadcn/ui", level: "Advanced", details: "Component library" },
    { icon: SiDaisyui, name: "DaisyUI", level: "Intermediate", details: "Tailwind component library" }
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="container py-12 space-y-8"
      style={{
        opacity,
        filter: blurFilter
      }}
    >
      {/* Section header */}
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Skills & Expertise</h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Technologies and tools I work to find meaning
        </p>
      </div>

      {/* Main skills grid */}
      <motion.div
        className="grid md:grid-cols-2 gap-6"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3
            }
          }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
                filter: "blur(10px)",
              },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1]
                }
              }
            }}
          >
            <SkillCard
              {...skill}
              isExpanded={expandedSkills.has(skill.title)}
              onToggle={() => toggleSkill(skill.title)}
            />
          </motion.div>
        ))}
      </motion.div>
      {/* Additional Skills Grid */}
      <div className="mt-12">
        <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center md:text-left">Additional Technologies</h3>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {additionalSkills.map((skill, index) => {
            const [isNear, setIsNear] = useState(false);
            const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
            const cardRef = useRef<HTMLDivElement>(null);

            useEffect(() => {
              const handleMouseMove = (e: MouseEvent) => {
                if (cardRef.current) {
                  const rect = cardRef.current.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const isNearButton = x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50;

                  setIsNear(isNearButton);
                  if (isNearButton) {
                    setCursorPosition({ x, y });
                  }
                }
              };

              document.addEventListener('mousemove', handleMouseMove);
              return () => {
                document.removeEventListener('mousemove', handleMouseMove);
              };
            }, []);

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 20,
                    filter: "blur(10px)"
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }
                }}
              >
                <ShimmerButton className="w-full">
                  <Card className="group transition-all duration-300 aspect-square dark:bg-black/100 bg-white/[0.1]">
                    <CardContent className="flex flex-col items-center justify-between h-full p-3">
                      <div className="flex-1 flex items-center">
                        <skill.icon className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center gap-1.5">
                        <p className="text-xs font-medium sm:text-sm">{skill.name}</p>
                        <Badge
                          variant="secondary"
                          className="text-[10px] font-normal bg-muted-foreground/10 px-2 py-0"
                        >
                          {skill.level}
                        </Badge>
                      </div>
                      {skill.details && (
                        <div className="flex-1 flex items-center">
                          <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
                            {skill.details}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </ShimmerButton>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}; 