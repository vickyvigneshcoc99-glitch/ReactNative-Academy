'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeExample {
    title: string;
    web: string;
    native: string;
    explanation: string;
}

const codeExamples: CodeExample[] = [
    {
        title: 'Transitions',
        web: `.box {
  transition: transform 0.3s ease;
}
.box:hover {
  transform: scale(1.1);
}`,
        native: `Animated.timing(scaleValue, {
  toValue: 1.1,
  duration: 300,
  useNativeDriver: true,
}).start();`,
        explanation: 'In React Native, animations are imperative. You define animated values and trigger "timing" or "spring" functions. Use useNativeDriver: true to send the animation to the UI thread for 60fps performance.'
    },
    {
        title: 'Spring Physics',
        web: `/* Often requires heavy libraries */`,
        native: `Animated.spring(posValue, {
  toValue: 100,
  friction: 7,
  tension: 40,
  useNativeDriver: true,
}).start();`,
        explanation: 'Native apps rely heavily on physics. The Spring API allows for bouncy, natural-feeling movements that respond to mass and friction, making your app feel high-quality.'
    },
    {
        title: 'Layout Changes',
        web: `/* Browser handles reflow */`,
        native: `LayoutAnimation.configureNext(
  LayoutAnimation.Presets.spring
);
setExpanded(!expanded);`,
        explanation: 'If you want entire components to slide into place when state changes, use LayoutAnimation. It automatically animates any layout change that happens in the next render cycle.'
    }
];

const animationTips = [
    {
        icon: '🏎️',
        title: 'Native Driver',
        description: 'Always use useNativeDriver: true for transform and opacity animations to avoid the JS bridge bottleneck.'
    },
    {
        icon: '💎',
        title: 'Reanimated',
        description: 'For complex gesture-based animations, the "react-native-reanimated" library is the industry standard.'
    },
    {
        icon: '🕹️',
        title: 'Imperative API',
        description: 'Unlike Framer Motion on the web, the core RN API is imperative (value.setValue, value.interpolate).'
    },
    {
        icon: '⏸️',
        title: 'InteractionManager',
        description: 'Schedule heavy tasks to run after animations finish to prevent dropped frames during transitions.'
    }
];

export default function Lesson9() {
    const [activeExample, setActiveExample] = useState(0);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, staggerChildren: 0.1 }
        }
    };

    const itemVariants = { opacity: 0, y: 20 };

    return (
        <main className="min-h-screen py-20 px-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-[#764abc]/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

            <motion.div
                className="max-w-6xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div className="mb-8" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <Link href="/" className="text-[var(--text-muted)] hover:text-[#764abc] transition-all flex items-center gap-2 group">
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Courses
                    </Link>
                </motion.div>

                <motion.div className="glass rounded-[2rem] p-12 mb-12 text-center" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md mb-6 border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-[#764abc] animate-pulse" />
                        <span className="text-sm font-mono text-[var(--text-muted)]">Lesson 9</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-[#764abc] via-[#61dafb] to-[#f76b1c] bg-clip-text text-transparent">
                            Animations
                        </span>
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Bring your UI to life. Master the Animated API, LayoutAnimation, and the physics-based logic that makes mobile apps feel premium.
                    </p>
                </motion.div>

                <motion.section className="mb-20" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="flex gap-3 mb-10 overflow-x-auto pb-4 custom-scrollbar">
                        {codeExamples.map((example, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveExample(index)}
                                className={`px-8 py-4 rounded-2xl font-bold transition-all relative overflow-hidden group ${activeExample === index ? 'text-white' : 'glass text-[var(--text-secondary)]'}`}
                            >
                                {activeExample === index && (
                                    <motion.div layoutId="tab9" className="absolute inset-0 bg-gradient-to-r from-[#764abc] to-[#61dafb] z-0" />
                                )}
                                <span className="relative z-10">{example.title}</span>
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div key={activeExample} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="group">
                                <h3 className="text-xl font-bold text-[#61dafb] mb-4">React Web</h3>
                                <div className="bg-[#0f1122] rounded-[2rem] p-8 border border-white/5 group-hover:border-[#61dafb]/30 transition-all">
                                    <pre className="text-sm font-mono text-[var(--text-secondary)] overflow-x-auto"><code>{codeExamples[activeExample].web}</code></pre>
                                </div>
                            </div>
                            <div className="group">
                                <h3 className="text-xl font-bold text-[#764abc] mb-4">React Native</h3>
                                <div className="bg-[#0f1122] rounded-[2rem] p-8 border border-white/5 group-hover:border-[#764abc]/30 transition-all">
                                    <pre className="text-sm font-mono text-[var(--text-secondary)] overflow-x-auto"><code>{codeExamples[activeExample].native}</code></pre>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <motion.div className="glass rounded-2xl p-6 bg-gradient-to-r from-[#764abc]/10 to-[#f76b1c]/10 border border-[#764abc]/30" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                        <div className="flex items-start gap-4">
                            <div className="text-3xl">💡</div>
                            <div>
                                <h4 className="font-bold text-[#764abc] mb-2">Key Insight</h4>
                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{codeExamples[activeExample].explanation}</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>

                <motion.section className="mb-20" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {animationTips.map((tip, i) => (
                            <motion.div key={i} whileHover={{ y: -10 }} className="glass p-8 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tip.icon}</div>
                                <h4 className="font-bold mb-2 text-white">{tip.title}</h4>
                                <p className="text-sm text-[var(--text-muted)]">{tip.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section className="mb-20" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="glass rounded-3xl p-12 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#764abc]/10 to-[#f76b1c]/10 opacity-50" />
                        <h2 className="text-4xl font-black mb-6 relative z-10">Try It Yourself</h2>
                        <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto relative z-10">
                            Experiment with spring physics and native driver animations in the sandbox.
                        </p>
                        <Link href="/playground" className="inline-block px-12 py-5 bg-gradient-to-r from-[#764abc] to-[#61dafb] rounded-xl font-bold text-xl text-white shadow-2xl hover:shadow-[0_0_50px_rgba(118,74,188,0.5)] hover:scale-105 transition-all relative z-10">
                            Open Playground
                        </Link>
                    </div>
                </motion.section>

                <div className="flex justify-between items-center mt-20">
                    <Link href="/lessons/8" className="px-10 py-5 glass rounded-2xl font-bold text-[var(--text-primary)] hover:bg-white/10 transition-all">← Lesson 8</Link>
                    <Link href="/lessons/10" className="px-10 py-5 bg-gradient-to-r from-[#764abc] to-[#61dafb] rounded-2xl font-bold text-white hover:scale-105 transition-all">Next Lesson →</Link>
                </div>
            </motion.div>
        </main>
    );
}
