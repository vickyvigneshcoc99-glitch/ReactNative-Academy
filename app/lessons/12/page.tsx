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
        title: 'Console & Logs',
        web: `/* Inspect in Chrome DevTools */
console.log('App Loaded');`,
        native: `/* Inspect in Flipper or Chrome */
console.log('Native App Loaded');
/* Use LogBox to ignore warnings */
LogBox.ignoreAllLogs();`,
        explanation: 'React Native logs can be viewed in the terminal where you start the packager, or in external tools like Flipper. LogBox is a built-in feature that allows you to manage the floating yellow/red boxes that appear during development.'
    },
    {
        title: 'Redbox & Crash',
        web: `/* Blank white screen */`,
        native: `/* Full screen Redbox error */
const throwNativeError = () => {
  throw new Error('Native Crash!');
};`,
        explanation: 'When a fatal error occurs in React Native, the app shows a "Redbox" error screen with a full stack trace. Unlike the web, where the page might just go blank, mobile apps are more vocal about failures in debug mode.'
    },
    {
        title: 'React Testing Library',
        web: `import { render, screen } from '@testing-library/react';`,
        native: `import { render, fireEvent } from '@testing-library/react-native';

test('button click', () => {
  const { getByText } = render(<MyButton />);
  fireEvent.press(getByText('Click me'));
});`,
        explanation: 'Testing looks almost identical to the web! React Native Testing Library allows you to render components and fire events like "press" instead of "click". You can still use Jest as your primary test runner.'
    }
];

const debugTips = [
    {
        icon: '🐬',
        title: 'Flipper',
        description: 'Facebook\'s desktop tool for debugging RN. Inspect the database, network, and layout in real-time.'
    },
    {
        icon: '📸',
        title: 'Snapshots',
        description: 'Native UIs are complex. Snapshot testing ensures your components don\'t change pixel-perfect layout unexpectedly.'
    },
    {
        icon: '🚧',
        title: 'Detox',
        description: 'For end-to-end testing, use Detox. It simulates a real user interacting with your app on a real device.'
    },
    {
        icon: '🧰',
        title: 'React DevTools',
        description: 'You can still use the React component inspector! Connect it to your mobile device to view props and state.'
    }
];

export default function Lesson12() {
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
            <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-[#61dafb]/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

            <motion.div
                className="max-w-6xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div className="mb-8" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <Link href="/" className="text-[var(--text-muted)] hover:text-[#61dafb] transition-all flex items-center gap-2 group">
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Courses
                    </Link>
                </motion.div>

                <motion.div className="glass rounded-[2rem] p-6 md:p-12 mb-12 text-center" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md mb-6 border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-[#61dafb] animate-pulse" />
                        <span className="text-sm font-mono text-[var(--text-muted)]">Lesson 12</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                        <span className="bg-gradient-to-r from-[#61dafb] via-[#f76b1c] to-[#764abc] bg-clip-text text-transparent">
                            Testing & Debugging
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Ship with confidence. Master the specialized tools for debugging the bridge and testing native components in cross-platform environments.
                    </p>
                </motion.div>

                <motion.section className="mb-20" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="flex gap-3 mb-10 overflow-x-auto pb-4 custom-scrollbar">
                        {codeExamples.map((example, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveExample(index)}
                                className={`px-4 md:px-8 py-3 md:py-4 rounded-2xl font-bold transition-all relative overflow-hidden group whitespace-nowrap ${activeExample === index ? 'text-white' : 'glass text-[var(--text-secondary)]'}`}
                            >
                                {activeExample === index && (
                                    <motion.div layoutId="tab12" className="absolute inset-0 bg-gradient-to-r from-[#61dafb] to-[#f76b1c] z-0" />
                                )}
                                <span className="relative z-10">{example.title}</span>
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div key={activeExample} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
                            <div className="group">
                                <h3 className="text-xl font-bold text-[#61dafb] mb-4">React Web</h3>
                                <div className="bg-[#0f1122] rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-white/5 group-hover:border-[#61dafb]/30 transition-all">
                                    <pre className="text-sm font-mono text-[var(--text-secondary)] overflow-x-auto"><code>{codeExamples[activeExample].web}</code></pre>
                                </div>
                            </div>
                            <div className="group">
                                <h3 className="text-xl font-bold text-[#f76b1c] mb-4">React Native</h3>
                                <div className="bg-[#0f1122] rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-white/5 group-hover:border-[#f76b1c]/30 transition-all">
                                    <pre className="text-sm font-mono text-[var(--text-secondary)] overflow-x-auto"><code>{codeExamples[activeExample].native}</code></pre>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <motion.div className="glass rounded-2xl p-6 bg-gradient-to-r from-[#61dafb]/10 to-[#f76b1c]/10 border border-[#61dafb]/30" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                        <div className="flex items-start gap-4">
                            <div className="text-3xl">💡</div>
                            <div>
                                <h4 className="font-bold text-[#61dafb] mb-2">Key Insight</h4>
                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{codeExamples[activeExample].explanation}</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>

                <motion.section className="mb-20" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {debugTips.map((tip, i) => (
                            <motion.div key={i} whileHover={{ y: -10 }} className="glass p-6 md:p-8 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tip.icon}</div>
                                <h4 className="font-bold mb-2 text-white">{tip.title}</h4>
                                <p className="text-sm text-[var(--text-muted)]">{tip.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.div className="flex flex-col items-center gap-8 mt-20" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <h2 className="text-3xl md:text-4xl font-black text-center">Course Complete! 🎉</h2>
                    <p className="text-lg md:text-xl text-[var(--text-secondary)] text-center max-w-2xl">
                        You have mastered the core differences between React Web and React Native. You are ready to build production-grade mobile applications.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                        <Link href="/lessons/11" className="w-full sm:w-auto text-center px-10 py-5 glass rounded-2xl font-bold text-[var(--text-primary)] hover:bg-white/10 transition-all">← Lesson 11</Link>
                        <Link href="/lessons/13" className="w-full sm:w-auto text-center px-10 py-5 glass border-[#61dafb]/30 rounded-2xl font-bold text-[var(--text-primary)] hover:bg-white/10 transition-all">Next Lesson: Security →</Link>
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}
