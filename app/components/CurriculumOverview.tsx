'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Lesson {
    id: number;
    title: string;
    description: string;
    duration: string;
    topics: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    icon: string;
}

const curriculum: Lesson[] = [
    {
        id: 1,
        title: 'From Div to View',
        description: 'Learn the fundamental shift from HTML elements to React Native primitives',
        duration: '30 min',
        topics: ['View', 'Text', 'Image', 'Basic Styling'],
        difficulty: 'beginner',
        icon: '🎯'
    },
    {
        id: 2,
        title: 'Flexbox: Column vs Row',
        description: 'Master the default flexDirection difference and layout patterns',
        duration: '45 min',
        topics: ['Flexbox', 'Layout', 'Positioning', 'Alignment'],
        difficulty: 'beginner',
        icon: '📐'
    },
    {
        id: 3,
        title: 'Touchable Components',
        description: 'Handle user interactions with native touch components',
        duration: '40 min',
        topics: ['TouchableOpacity', 'Pressable', 'Gestures', 'Events'],
        difficulty: 'beginner',
        icon: '👆'
    },
    {
        id: 4,
        title: 'Lists & ScrollViews',
        description: 'Efficiently render scrollable content and long lists',
        duration: '50 min',
        topics: ['ScrollView', 'FlatList', 'SectionList', 'Virtualization'],
        difficulty: 'intermediate',
        icon: '📜'
    },
    {
        id: 5,
        title: 'Styling & Theming',
        description: 'Create beautiful UIs with StyleSheet and dynamic themes',
        duration: '60 min',
        topics: ['StyleSheet', 'Dimensions', 'Platform Styles', 'Dark Mode'],
        difficulty: 'intermediate',
        icon: '🎨'
    },
    {
        id: 6,
        title: 'Navigation Patterns',
        description: 'Navigate between screens with React Navigation',
        duration: '70 min',
        topics: ['Stack Navigator', 'Tab Navigator', 'Drawer', 'Deep Linking'],
        difficulty: 'intermediate',
        icon: '🧭'
    },
    {
        id: 7,
        title: 'Forms & Input',
        description: 'Build forms with TextInput and validation',
        duration: '45 min',
        topics: ['TextInput', 'Keyboard', 'Validation', 'Form State'],
        difficulty: 'intermediate',
        icon: '📝'
    },
    {
        id: 8,
        title: 'Native APIs',
        description: 'Access device features like camera, location, and sensors',
        duration: '60 min',
        topics: ['Camera', 'Geolocation', 'Permissions', 'Haptics'],
        difficulty: 'advanced',
        icon: '📱'
    },
    {
        id: 9,
        title: 'Animations',
        description: 'Create smooth 60fps animations with Animated API',
        duration: '80 min',
        topics: ['Animated', 'LayoutAnimation', 'Reanimated', 'Gestures'],
        difficulty: 'advanced',
        icon: '✨'
    },
    {
        id: 10,
        title: 'Performance Optimization',
        description: 'Optimize your app for production performance',
        duration: '50 min',
        topics: ['Profiling', 'Memoization', 'Image Optimization', 'Bundle Size'],
        difficulty: 'advanced',
        icon: '⚡'
    },
    {
        id: 11,
        title: 'Platform-Specific Code',
        description: 'Write custom code for iOS and Android',
        duration: '55 min',
        topics: ['Platform API', 'Platform Files', 'Native Modules', 'Bridging'],
        difficulty: 'advanced',
        icon: '🔧'
    },
    {
        id: 12,
        title: 'Testing & Debugging',
        description: 'Test and debug React Native applications',
        duration: '65 min',
        topics: ['Jest', 'React Native Testing Library', 'Debugging', 'Flipper'],
        difficulty: 'advanced',
        icon: '🧪'
    },
    {
        id: 13,
        title: 'Mobile Security',
        description: 'Secure your app with Keychain, TLS, and Bio-authentication',
        duration: '50 min',
        topics: ['Keychain', 'SSL Pinning', 'Biometrics', 'Obfuscation'],
        difficulty: 'advanced',
        icon: '🔒'
    }
];

const difficultyColors = {
    beginner: 'from-[#10b981] to-[#3b82f6]',
    intermediate: 'from-[#f59e0b] to-[#f76b1c]',
    advanced: 'from-[#ef4444] to-[#dc2626]'
};

const difficultyLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced'
};

export function CurriculumOverview() {
    const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
    }, []);

    const filteredLessons = filter === 'all'
        ? curriculum
        : curriculum.filter(lesson => lesson.difficulty === filter);

    if (!mounted) return <div className="min-h-[400px]" />;

    return (
        <div className="space-y-12">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
                {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <button
                        key={level}
                        onClick={() => setFilter(level)}
                        className={`px-4 md:px-8 py-2 md:py-3 rounded-2xl font-bold transition-all duration-300 text-sm md:text-base ${filter === level
                            ? 'bg-gradient-to-r from-[#61dafb] to-[#764abc] text-white shadow-xl scale-105'
                            : 'glass text-[var(--text-secondary)] hover:bg-white/10'
                            }`}
                    >
                        {level === 'all' ? 'All' : difficultyLabels[level]}
                    </button>
                ))}
            </div>

            {/* Lessons Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={filter}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {filteredLessons.length > 0 ? (
                        filteredLessons.map((lesson) => (
                            <motion.div
                                key={lesson.id}
                                whileHover={{ y: -10 }}
                                className="h-full"
                            >
                                <Link
                                    href={`/lessons/${lesson.id}`}
                                    className="group block h-full glass rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-2xl relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-8">
                                            <span className="text-5xl group-hover:scale-110 transition-transform duration-500 block">
                                                {lesson.icon}
                                            </span>
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg bg-gradient-to-r ${difficultyColors[lesson.difficulty]}`}>
                                                {difficultyLabels[lesson.difficulty]}
                                            </span>
                                        </div>

                                        <div className="text-sm font-mono text-[#61dafb] mb-2 font-black uppercase tracking-widest">
                                            Lesson {lesson.id}
                                        </div>

                                        <h3 className="text-2xl font-black text-[var(--text-primary)] mb-4 group-hover:text-[#61dafb] transition-colors duration-300">
                                            {lesson.title}
                                        </h3>

                                        <p className="text-[var(--text-secondary)] mb-8 line-clamp-3 leading-relaxed font-light">
                                            {lesson.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {lesson.topics.slice(0, 3).map((topic, i) => (
                                                <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-xs text-[var(--text-muted)] border border-white/5">
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                                <svg className="w-4 h-4 text-[#61dafb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {lesson.duration}
                                            </div>
                                            <div className="flex items-center gap-2 text-[#61dafb] font-black text-sm uppercase opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                                Start
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center glass rounded-[2rem]">
                            <p className="text-2xl text-[var(--text-secondary)]">No lessons found category 🔍</p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="glass rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 text-center border border-white/10 relative overflow-hidden">
                <div className="max-w-xl mx-auto relative z-10">
                    <h3 className="text-3xl font-black mb-8 text-[var(--text-primary)]">Your Academy Progress</h3>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-1 mb-4">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#61dafb] via-[#764abc] to-[#f76b1c] rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '92%' }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        />
                    </div>
                    <div className="flex justify-between items-center px-2">
                        <span className="text-[var(--text-muted)] font-bold">12 of 13 lessons completed</span>
                        <span className="text-[#61dafb] font-black">92% COMPLETE</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
