'use client';

import { motion } from 'framer-motion';

interface Project {
    title: string;
    description: string;
    tech: string[];
    link: string;
    type: 'React' | 'React Native';
    icon: string;
}

const projects: Project[] = [
    {
        title: 'Premium Portfolio',
        description: 'Generative Systems Architect portfolio with 3D UI and interactive neural elements.',
        tech: ['React', 'Framer Motion', 'Tailwind CSS'],
        link: 'https://github.com/vickyvigneshcoc99-glitch/My-model-portfolio-',
        type: 'React',
        icon: '💼'
    },
    {
        title: 'Shadow Shift',
        description: 'Full-stack 2D platformer with unique light/shadow dimension-switching mechanics.',
        tech: ['React', 'Vite', 'Express', 'Particles'],
        link: 'https://github.com/vickyvigneshcoc99-glitch/Shadow-Shift-Webapp',
        type: 'React',
        icon: '🌓'
    },
    {
        title: 'BlinkCare',
        description: 'AI-powered communication platform using MediaPipe face/hand tracking for assistive SOS.',
        tech: ['React', 'MediaPipe', 'AI/ML'],
        link: 'https://github.com/vickyvigneshcoc99-glitch/BlinkCare',
        type: 'React',
        icon: '👁️'
    },
    {
        title: 'Floppy Hero',
        description: 'High-octane mobile arcade game with real-time global leaderboards.',
        tech: ['React Native', 'Firebase', 'Firestore'],
        link: 'https://github.com/vickyvigneshcoc99-glitch/Floppy-hero-',
        type: 'React Native',
        icon: '🦸'
    },
    {
        title: 'Rocket Blaze',
        description: 'Survival game featuring hidden terminal gestures and secure owner authentication.',
        tech: ['React Native', 'Firestore', 'Secure Auth'],
        link: 'https://github.com/vickyvigneshcoc99-glitch/Rocket-Blaze-',
        type: 'React Native',
        icon: '🚀'
    },
    {
        title: 'Stickman Runner',
        description: 'Endless runner with double jump and progressive difficulty levels.',
        tech: ['React Native', 'Expo', 'Game Engine'],
        link: 'https://github.com/vickyvigneshcoc99-glitch/Stickman-Runner',
        type: 'React Native',
        icon: '🏃'
    }
];

export function FeaturedProjects() {
    return (
        <div className="space-y-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <a
                        key={index}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/5"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                {project.icon}
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${project.type === 'React'
                                    ? 'bg-[#61dafb]/20 text-[#61dafb] border border-[#61dafb]/30'
                                    : 'bg-[#764abc]/20 text-[#764abc] border border-[#764abc]/30'
                                }`}>
                                {project.type}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[#61dafb] transition-colors">
                            {project.title}
                        </h3>

                        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((t, i) => (
                                <span key={i} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-[var(--text-muted)] border border-white/10">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 text-[#61dafb] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                            View Repository
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                    </a>
                ))}
            </div>

            <div className="text-center">
                <a
                    href="https://github.com/vickyvigneshcoc99-glitch?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 glass rounded-xl font-bold text-[var(--text-primary)] hover:bg-white/10 transition-all hover:scale-105"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    View All Repositories
                </a>
            </div>
        </div>
    );
}
