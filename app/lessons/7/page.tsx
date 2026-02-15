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
        title: 'Input Fields',
        web: `<input 
  type="text" 
  placeholder="Username" 
  onChange={(e) => setValue(e.target.value)}
/>`,
        native: `<TextInput
  placeholder="Username"
  onChangeText={(text) => setValue(text)}
  style={styles.input}
/>`,
        explanation: 'In React Native, we use TextInput. Instead of accessing e.target.value, the onChangeText callback provides the string directly. You must style the input manually; it has no default borders.'
    },
    {
        title: 'Keyboard Types',
        web: `<input type="number" />
<input type="email" />`,
        native: `<TextInput keyboardType="numeric" />
<TextInput keyboardType="email-address" />
<TextInput secureTextEntry={true} /> // Password`,
        explanation: 'Mobile keyboards are specialized. Trigger numeric, email, or phone pads using the keyboardType prop. For passwords, use secureTextEntry instead of type="password".'
    },
    {
        title: 'Keyboard Avoidance',
        web: `/* Browser handles scroll */
<form>
  <input />
</form>`,
        native: `<KeyboardAvoidingView behavior="padding">
  <ScrollView>
    <TextInput />
  </ScrollView>
</KeyboardAvoidingView>`,
        explanation: 'Software keyboards cover the screen. Wrap your forms in a KeyboardAvoidingView to ensure the input field stays visible when the user starts typing.'
    }
];

const formTips = [
    {
        icon: '⌨️',
        title: 'Auto Capitalize',
        description: 'Control the keyboard behavior. Use autoCapitalize="none" for emails and usernames.'
    },
    {
        icon: '✅',
        title: 'Validation',
        description: 'Native validation happens in JavaScript (libraries like Yup or Zod) since there is no HTML5 validation.'
    },
    {
        icon: '📱',
        title: 'Return Key',
        description: 'Change the "Enter" key label (e.g., "Go", "Next", "Search") using the returnKeyType prop.'
    },
    {
        icon: '👆',
        title: 'Focus Management',
        description: 'Use refs to automatically focus the next input field when a user finishes the current one.'
    }
];

export default function Lesson7() {
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

                <motion.div className="glass rounded-[2rem] p-6 md:p-12 mb-12 text-center" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md mb-6 border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                        <span className="text-sm font-mono text-[var(--text-muted)]">Lesson 7</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                        <span className="bg-gradient-to-r from-[#10b981] via-[#61dafb] to-[#764abc] bg-clip-text text-transparent">
                            Forms & Input
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Handle user data gracefully. Master TextInputs, keyboard management, and validation patterns for a smooth mobile experience.
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
                                    <motion.div layoutId="tab7" className="absolute inset-0 bg-gradient-to-r from-[#10b981] to-[#61dafb] z-0" />
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
                                <h3 className="text-xl font-bold text-[#10b981] mb-4">React Native</h3>
                                <div className="bg-[#0f1122] rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-white/5 group-hover:border-[#10b981]/30 transition-all">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {formTips.map((tip, i) => (
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
                        <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/10 to-[#61dafb]/10 opacity-50" />
                        <h2 className="text-3xl md:text-4xl font-black mb-6 relative z-10">Try It Yourself</h2>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto relative z-10">
                            Test interactive forms and keyboard-avoiding layouts in the sandbox.
                        </p>
                        <Link href="/playground" className="inline-block px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-[#10b981] to-[#61dafb] rounded-xl font-bold text-lg md:text-xl text-white shadow-2xl hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:scale-105 transition-all relative z-10">
                            Open Playground
                        </Link>
                    </div>
                </motion.section>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-20">
                    <Link href="/lessons/6" className="w-full sm:w-auto text-center px-10 py-5 glass rounded-2xl font-bold text-[var(--text-primary)] hover:bg-white/10 transition-all">← Lesson 6</Link>
                    <Link href="/lessons/8" className="w-full sm:w-auto text-center px-10 py-5 bg-gradient-to-r from-[#10b981] to-[#61dafb] rounded-2xl font-bold text-white hover:scale-105 transition-all">Next Lesson →</Link>
                </div>
            </motion.div>
        </main>
    );
}
