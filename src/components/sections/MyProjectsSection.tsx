import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card } from "@/components/ui/card";

interface Project {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    backgroundImage: string;
}

const projects: Project[] = [
    {
        title: "Work in Progress",
        description: "Coming soon",
        technologies: ["React", "TypeScript", "Tailwind CSS"],
        link: "https://github.com",
        backgroundImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80"
    },
    {
        title: "Work in Progress",
        description: "Coming soon",
        technologies: ["Next.js", "Framer Motion", "Prisma"],
        link: "https://github.com",
        backgroundImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80"
    },
    {
        title: "Work in Progress",
        description: "Coming soon",
        technologies: ["Node.js", "Express", "MongoDB"],
        link: "https://github.com",
        backgroundImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80"
    },
];

export const MyProjectsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Add spring physics for smoother animations
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Create smooth transformations for opacity and blur
    const opacity = useTransform(
        smoothProgress,
        [0, 0.2, 0.8, 1],
        [0, 1, 1, 0]
    );

    const blurFilter = useTransform(
        smoothProgress,
        [0, 0.2, 0.8, 1],
        ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
    );

    // First card animates from 0-30% scroll
    const card1Y = useTransform(scrollYProgress,
        [0, 0.3],
        [0, 0]
    );
    const card1Rotate = useTransform(scrollYProgress,
        [0, 0.3],
        [0, 0]
    );

    // Second card starts when first ends, 30-50% scroll
    const card2Y = useTransform(scrollYProgress,
        [0.3, 0.5],
        [400, 20]
    );
    const card2Rotate = useTransform(scrollYProgress,
        [0.3, 0.5],
        [-10, 0]
    );

    // Third card starts when second ends, 50-70% scroll
    const card3Y = useTransform(scrollYProgress,
        [0.5, 0.8],
        [800, 40]
    );
    const card3Rotate = useTransform(scrollYProgress,
        [0.5, 0.8],
        [10, 0]
    );

    const transforms = [card1Y, card2Y, card3Y];
    const rotations = [card1Rotate, card2Rotate, card3Rotate];

    // Add state for hover effect
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardRect: DOMRect) => {
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        setMousePosition({ x, y });
    };

    return (
        <div ref={containerRef} className="min-h-[300vh]">
            <motion.div
                className="sticky top-0 py-16"
                style={{
                    opacity,
                    filter: blurFilter
                }}
            >
                <div className="container max-w-3xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-16">My Projects</h2>

                    <div className="relative h-[300px]">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    y: transforms[index],
                                    rotate: rotations[index],
                                    zIndex: index,
                                }}
                                transition={{
                                    duration: 1.1,
                                    ease: [0.16, 1, 0.3, 1],
                                    type: "tween"
                                }}
                            >
                                <Card
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onMouseMove={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        handleMouseMove(e, rect);
                                    }}
                                    className={`
                                        relative p-6 
                                        bg-card text-card-foreground
                                        transition-all duration-300
                                        mx-auto max-w-4xl overflow-hidden
                                        shadow-md
                                        group
                                        h-[280px]
                                        border border-black/20 ring-1 ring-black/5 
                                        dark:border-white/10 hover:border-black/30 
                                        hover:ring-black/10 
                                        hover:shadow-[0_8px_20px_rgb(39,39,42,0.6)] 
                                        dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]
                                        hover:-translate-y-1
                                    `}
                                >
                                    <div className="absolute inset-0 w-full h-full">
                                        <img
                                            src={project.backgroundImage}
                                            alt={project.title}
                                            className="w-full h-full object-cover opacity-60 dark:opacity-30 
                                                     transition-all duration-300 
                                                     group-hover:opacity-70 dark:group-hover:opacity-40
                                                     group-hover:scale-105
                                                     group-hover:blur-[2px]"
                                            loading="lazy"
                                        />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background/30
                                                      transition-opacity duration-300
                                                      group-hover:opacity-0"
                                        />
                                    </div>

                                    {/* Hover effect overlay */}
                                    {hoveredIndex === index && (
                                        <div
                                            className="absolute inset-0 z-10 transition-opacity duration-300"
                                            style={{
                                                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`
                                            }}
                                        />
                                    )}

                                    <div className="relative z-20 h-full flex flex-col justify-between">
                                        <div className="space-y-2">
                                            <h3 className="text-lg md:text-xl font-bold group-hover:text-white dark:text-foreground">{project.title}</h3>
                                            <p className="text-sm group-hover:text-white/90 text-muted-foreground line-clamp-2">{project.description}</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-2 py-1 text-[10px] md:text-xs rounded-full bg-primary/10 text-primary group-hover:text-white group-hover:bg-white/10"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-xs md:text-sm text-primary group-hover:text-white hover:underline"
                                                >
                                                    View Project
                                                    <span className="ml-1">→</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}; 