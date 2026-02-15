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
        title: 'Platform Detection',
        web: `/* Generic JS for all browsers */
const fontSize = 16;
const font = 'Inter, sans-serif';`,
        native: `import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: Platform.OS === 'ios' ? 20 : 16,
    fontFamily: Platform.select({
      ios: 'San Francisco',
      android: 'Roboto',
    }),
  },
});`,
        explanation: 'React Native allows you to write conditional code based on the operating system. Use Platform.select to merge styles together, ensuring your app feels native on both iOS and Android.'
    },
    {
        title: 'Platform Files',
        web: `/* index.js */
import Button from './Button';`,
        native: `/* Button.ios.js */
/* Button.android.js */

// In your screen:
import Button from './Button'; 
// RN automatically picks .ios or .android`,
        explanation: 'If a logic is too complex for simple ternaries, create separate files. React Native automatically imports the .ios.js or .android.js version based on the user device.'
    },
    {
        title: 'Hardware Safe Zones',
        web: `/* Browser handles scroll */
<div style={{ padding: '20px' }}>
  <p>Content</p>
</div>`,
        native: `<SafeAreaView style={{ flex: 1 }}>
  <View style={{ padding: 20 }}>
    <Text>Safe from the Notch!</Text>
  </View>
</SafeAreaView>`,
        explanation: 'Modern phones have notches and speaker "islands." SafeAreaView automatically adds padding to ensure your content is not cut off by physical device hardware.'
    }
];

const platformTips = [
    {
        icon: '',
        title: 'iOS Patterns',
        description: 'Focus on "San Francisco" font, centered headers, and smooth edge-swiping for navigation.'
    },
    {
        icon: '🤖',
        title: 'Android Patterns',
        description: 'Focus on the "Back" button hardware, "Roboto" font, and Material Design elevation ripples.'
    },
    {
        icon: '📁',
        title: 'Naming',
        description: 'Use the dot-notation extensions (.ios.js) for platform-specific assets like icons or complex helper functions.'
    },
    {
        icon: '📐',
        title: 'Status Bar',
        description: 'Use the StatusBar component to control the color of the device clock and battery icons on a per-screen basis.'
    }
];

export default function Lesson11() {
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

                <motion.div className="glass rounded-[2rem] p-6 md:p-12 mb-12 text-center" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md mb-6 border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-[#f76b1c] animate-pulse" />
                        <span className="text-sm font-mono text-[var(--text-muted)]">Lesson 11</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                        <span className="bg-gradient-to-r from-[#f76b1c] via-[#f59e0b] to-[#764abc] bg-clip-text text-transparent">
                            Platform-Specific Code
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Master the "Write Once" philosophy. Learn how to optimize for both iOS and Android while maintaining a single codebase.
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
                                    <motion.div layoutId="tab11" className="absolute inset-0 bg-gradient-to-r from-[#f76b1c] to-[#f59e0b] z-0" />
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {platformTips.map((tip, i) => (
                            <motion.div key={i} whileHover={{ y: -10 }} className="glass p-6 md:p-8 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tip.icon}</div>
                                <h4 className="font-bold mb-2 text-white">{tip.title}</h4>
                                <p className="text-sm text-[var(--text-muted)]">{tip.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section className="mb-20" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="glass rounded-[2rem] md:rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#f76b1c]/10 to-[#764abc]/10 opacity-50" />
                        <h2 className="text-3xl md:text-4xl font-black mb-6 relative z-10">Try It Yourself</h2>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto relative z-10">
                            Experiment with Platform-specific code and see how the UI adapts in the interactive playground.
                        </p>
                        <Link
                            href="/playground"
                            className="inline-block px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-[#f76b1c] to-[#764abc] rounded-xl font-bold text-lg md:text-xl text-white shadow-2xl hover:shadow-[0_0_50px_rgba(247,107,28,0.5)] hover:scale-105 transition-all relative z-10"
                        >
                            Open Playground
                        </Link>
                    </div>
                </motion.section>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-20">
                    <Link href="/lessons/10" className="w-full sm:w-auto text-center px-10 py-5 glass rounded-2xl font-bold text-[var(--text-primary)] hover:bg-white/10 transition-all">← Lesson 10</Link>
                    <Link href="/lessons/12" className="w-full sm:w-auto text-center px-10 py-5 bg-gradient-to-r from-[#f76b1c] to-[#f59e0b] rounded-2xl font-bold text-white hover:scale-105 transition-all">Final Lesson →</Link>
                </div>
            </motion.div>
        </main>
    );
}
