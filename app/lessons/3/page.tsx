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
        title: 'Button Events',
        web: `<button onClick={() => alert('Hello')}>
  Click Me
</button>`,
        native: `<TouchableOpacity 
  onPress={() => alert('Hello')}
>
  <Text>Click Me</Text>
</TouchableOpacity>`,
        explanation: 'In React Native, we use onPress instead of onClick. The TouchableOpacity component provides automatic feedback by slightly dimming the button when pressed.'
    },
    {
        title: 'Modern Pressable',
        web: `<button className="active:scale-95">
  Interactive
</button>`,
        native: `<Pressable
  style={({ pressed }) => [
    { opacity: pressed ? 0.5 : 1 }
  ]}
>
  <Text>Interactive</Text>
</Pressable>`,
        explanation: 'Pressable is the modern, more customizable alternative to Touchable. It gives you access to the "pressed" state directly in your styles, allowing for web-like "active" states.'
    },
    {
        title: 'Hit Slop',
        web: `/* Hard to hit small buttons */`,
        native: `<TouchableOpacity
  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
>
  <Image source={searchIcon} />
</TouchableOpacity>`,
        explanation: 'Fingers are less precise than mouse cursors. The hitSlop prop allows you to expand the clickable area of a button WITHOUT changing its visual size. A mobile must-have!'
    }
];

const interactionTips = [
    {
        icon: '🎯',
        title: 'Hit Slop',
        description: 'Always add hitSlop to small icons to make them easier to tap on small screens.'
    },
    {
        icon: '📳',
        title: 'Haptic Feedback',
        description: 'Vibrate the device slightly on important actions to give users physical confirmation.'
    },
    {
        icon: '⚡',
        title: 'Responsiveness',
        description: 'Use Pressable for complex interactions that need custom state-driven styling.'
    },
    {
        icon: '🖱️',
        title: 'Double Taps',
        description: 'Mobile users expect multi-tap gestures. Reactive Native handles these via the Gesture Responder System.'
    }
];

export default function Lesson3() {
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
            <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-[#f76b1c]/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

            <motion.div
                className="max-w-6xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div className="mb-8" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <Link href="/" className="text-[var(--text-muted)] hover:text-[#f76b1c] transition-all flex items-center gap-2 group">
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Courses
                    </Link>
                </motion.div>

                <motion.div className="glass rounded-[2rem] p-12 mb-12 text-center" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md mb-6 border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-[#f76b1c] animate-pulse" />
                        <span className="text-sm font-mono text-[var(--text-muted)]">Lesson 3</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-[#f76b1c] via-[#f59e0b] to-[#764abc] bg-clip-text text-transparent">
                            Touchable Components
                        </span>
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Interact with the real world. Learn how to handle touch events, provide feedback, and optimize hit areas for human fingers.
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
                                    <motion.div layoutId="tab3" className="absolute inset-0 bg-gradient-to-r from-[#f76b1c] to-[#f59e0b] z-0" />
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
                                <h3 className="text-xl font-bold text-[#f76b1c] mb-4">React Native</h3>
                                <div className="bg-[#0f1122] rounded-[2rem] p-8 border border-white/5 group-hover:border-[#f76b1c]/30 transition-all">
                                    <pre className="text-sm font-mono text-[var(--text-secondary)] overflow-x-auto"><code>{codeExamples[activeExample].native}</code></pre>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <motion.div className="glass rounded-2xl p-6 bg-gradient-to-r from-[#f76b1c]/10 to-[#764abc]/10 border border-[#f76b1c]/30" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                        <div className="flex items-start gap-4">
                            <div className="text-3xl">💡</div>
                            <div>
                                <h4 className="font-bold text-[#f76b1c] mb-2">Key Insight</h4>
                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{codeExamples[activeExample].explanation}</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>

                <motion.section className="mb-20" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {interactionTips.map((tip, i) => (
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
                        <div className="absolute inset-0 bg-gradient-to-br from-[#f76b1c]/10 to-[#764abc]/10 opacity-50" />
                        <h2 className="text-4xl font-black mb-6 relative z-10">Try It Yourself</h2>
                        <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto relative z-10">
                            Experiment with Touchable feedback and hitSlop in the interactive sandbox.
                        </p>
                        <Link href="/playground" className="inline-block px-12 py-5 bg-gradient-to-r from-[#f76b1c] to-[#764abc] rounded-xl font-bold text-xl text-white shadow-2xl hover:shadow-[0_0_50px_rgba(247,107,28,0.5)] hover:scale-105 transition-all relative z-10">
                            Open Playground
                        </Link>
                    </div>
                </motion.section>

                <div className="flex justify-between items-center mt-20">
                    <Link href="/lessons/2" className="px-10 py-5 glass rounded-2xl font-bold text-[var(--text-primary)] hover:bg-white/10 transition-all">← Lesson 2</Link>
                    <Link href="/lessons/4" className="px-10 py-5 bg-gradient-to-r from-[#f76b1c] to-[#f59e0b] rounded-2xl font-bold text-white hover:scale-105 transition-all">Next Lesson →</Link>
                </div>
            </motion.div>
        </main>
    );
}
