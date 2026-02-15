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
        title: 'Memoization',
        web: `const MyItem = React.memo(({ data }) => (
  <div>{data.name}</div>
));`,
        native: `const ListItem = React.memo(({ item }) => (
  <View><Text>{item.title}</Text></View>
));`,
        explanation: 'Performance on mobile is largely about preventing unnecessary renders in large lists. Memoizing list items is critical for smooth scrolling as the JS thread needs to remain free for the bridge.'
    },
    {
        title: 'Image Loading',
        web: `<img src="large.jpg" loading="lazy" />`,
        native: `<Image 
  source={{ uri: 'large.jpg' }} 
  style={{ width: 100, height: 100 }}
/>`,
        explanation: 'Unsized images can crash mobile apps by consuming all RAM. Always provide dimensions to the Image component, and use libraries like "react-native-fast-image" for advanced caching.'
    },
    {
        title: 'The Bridge',
        web: `/* Direct DOM access */`,
        native: `/* Minimize passes across the bridge */
// Instead of sending 100 small updates:
const data = expensiveLogic(); 
// Send one final state update`,
        explanation: 'Every piece of data sent from JavaScript to Native crosses "The Bridge." High-frequency updates (like scroll positions) should be handled on the Native side whenever possible to avoid lag.'
    }
];

const performanceTips = [
    {
        icon: '🧵',
        title: 'Threads',
        description: 'React Native has two threads: JS and UI. If JS is busy, animations handled by the UI thread will still run smoothly.'
    },
    {
        icon: '📦',
        title: 'Bundle Size',
        description: 'Large JS bundles take longer to parse on low-end Android devices. Use tree-shaking and avoid heavy libraries.'
    },
    {
        icon: '🖼️',
        title: 'Image Sizing',
        description: 'Mobile screens are small. Don\'t load a 4K image into a 100x100 thumbnail; it wastes GPU memory.'
    },
    {
        icon: '📈',
        title: 'Profiling',
        description: 'Use the Perf Monitor (built into the dev menu) to track your frame rates (FPS) in real-time.'
    }
];

export default function Lesson10() {
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
            <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-[#10b981]/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

            <motion.div
                className="max-w-6xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div className="mb-8" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <Link href="/" className="text-[var(--text-muted)] hover:text-[#10b981] transition-all flex items-center gap-2 group">
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Courses
                    </Link>
                </motion.div>

                <motion.div className="glass rounded-[2rem] p-12 mb-12 text-center" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md mb-6 border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                        <span className="text-sm font-mono text-[var(--text-muted)]">Lesson 10</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-[#10b981] via-[#61dafb] to-[#764abc] bg-clip-text text-transparent">
                            Performance Optimization
                        </span>
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Build smooth, professional apps. Master the JS Bridge, virtualization strategies, and memory management for low-end devices.
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
                                    <motion.div layoutId="tab10" className="absolute inset-0 bg-gradient-to-r from-[#10b981] to-[#61dafb] z-0" />
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
                                <h3 className="text-xl font-bold text-[#10b981] mb-4">React Native</h3>
                                <div className="bg-[#0f1122] rounded-[2rem] p-8 border border-white/5 group-hover:border-[#10b981]/30 transition-all">
                                    <pre className="text-sm font-mono text-[var(--text-secondary)] overflow-x-auto"><code>{codeExamples[activeExample].native}</code></pre>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <motion.div className="glass rounded-2xl p-6 bg-gradient-to-r from-[#10b981]/10 to-[#61dafb]/10 border border-[#10b981]/30" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                        <div className="flex items-start gap-4">
                            <div className="text-3xl">💡</div>
                            <div>
                                <h4 className="font-bold text-[#10b981] mb-2">Key Insight</h4>
                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{codeExamples[activeExample].explanation}</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>

                <motion.section className="mb-20" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {performanceTips.map((tip, i) => (
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
                        <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/10 to-[#61dafb]/10 opacity-50" />
                        <h2 className="text-4xl font-black mb-6 relative z-10">Try It Yourself</h2>
                        <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto relative z-10">
                            Monitor memory usage and frame rates in the interactive sandbox environment.
                        </p>
                        <Link href="/playground" className="inline-block px-12 py-5 bg-gradient-to-r from-[#10b981] to-[#61dafb] rounded-xl font-bold text-xl text-white shadow-2xl hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:scale-105 transition-all relative z-10">
                            Open Playground
                        </Link>
                    </div>
                </motion.section>

                <div className="flex justify-between items-center mt-20">
                    <Link href="/lessons/9" className="px-10 py-5 glass rounded-2xl font-bold text-[var(--text-primary)] hover:bg-white/10 transition-all">← Lesson 9</Link>
                    <Link href="/lessons/11" className="px-10 py-5 bg-gradient-to-r from-[#10b981] to-[#61dafb] rounded-2xl font-bold text-white hover:scale-105 transition-all">Next Lesson →</Link>
                </div>
            </motion.div>
        </main>
    );
}
