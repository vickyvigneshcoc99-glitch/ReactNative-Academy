'use client';

import Link from 'next/link';
import { useState } from 'react';
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

    const filteredLessons = filter === 'all'
        ? curriculum
        : curriculum.filter(lesson => lesson.difficulty === filter);

    return (
        <div className="space-y-8">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
                {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <button
                        key={level}
                        onClick={() => setFilter(level)}
                        className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 relative group overflow-hidden ${filter === level
                            ? 'text-white'
                            : 'glass text-[var(--text-secondary)] hover:bg-white/10'
                            }`}
                    >
                        {filter === level && (
                            <motion.div
                                layoutId="activeFilter"
                                className="absolute inset-0 bg-gradient-to-r from-[#61dafb] to-[#764abc] shadow-lg"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">
                            {level === 'all' ? 'All Lessons' : difficultyLabels[level]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Lessons Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={filter}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                        visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
                        hidden: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                    }}
                >
                    {filteredLessons.length > 0 ? (
                        filteredLessons.map((lesson) => (
                            <motion.div
                                key={lesson.id}
                                layout
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9, y: 20 },
                                    visible: { opacity: 1, scale: 1, y: 0 }
                                }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <Link
                                    href={`/lessons/${lesson.id}`}
                                    className="group block glass rounded-[2rem] p-8 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl h-full border border-white/5"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="text-5xl group-hover:scale-110 transition-transform duration-500">
                                            {lesson.icon}
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg bg-gradient-to-r ${difficultyColors[lesson.difficulty]}`}>
                                            {difficultyLabels[lesson.difficulty]}
                                        </div>
                                    </div>

                                    {/* Lesson Number */}
                                    <div className="text-sm font-mono text-[#61dafb] mb-2 font-bold uppercase tracking-widest">
                                        Lesson {lesson.id}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-black text-[var(--text-primary)] mb-3 group-hover:text-[#61dafb] transition-colors duration-300 leading-tight">
                                        {lesson.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[var(--text-secondary)] mb-6 line-clamp-3 leading-relaxed font-light">
                                        {lesson.description}
                                    </p>

                                    {/* Topics */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {lesson.topics.slice(0, 3).map((topic, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-white/5 rounded-lg text-xs text-[var(--text-muted)] border border-white/5"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                        {lesson.topics.length > 3 && (
                                            <span className="px-3 py-1 bg-white/5 rounded-lg text-xs text-[var(--text-muted)] border border-white/5">
                                                +{lesson.topics.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] font-medium">
                                            <svg className="w-4 h-4 text-[#61dafb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {lesson.duration}
                                        </div>
                                        <div className="flex items-center gap-2 text-[#61dafb] font-black text-sm uppercase translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                            Explore
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            className="col-span-full py-20 text-center glass rounded-[2rem]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p className="text-2xl text-[var(--text-secondary)] font-light">No lessons found in this category 🔍</p>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Progress Indicator */}
            <motion.div
                className="glass rounded-[2rem] p-10 text-center border border-white/10 relative overflow-hidden group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#61dafb]/5 to-[#764abc]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <h3 className="text-3xl font-black mb-6 text-[var(--text-primary)] relative z-10">
                    Your Academy Progress
                </h3>
                <div className="max-w-xl mx-auto relative z-10">
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-1">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#61dafb] via-[#764abc] to-[#f76b1c] rounded-full shadow-[0_0_20px_rgba(97,218,251,0.4)]"
                            initial={{ width: '0%' }}
                            animate={{ width: '92%' }} // 12 of 13
                            transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        <p className="text-[var(--text-muted)] font-medium">
                            12 of {curriculum.length} lessons completed
                        </p>
                        <p className="text-[#61dafb] font-black">
                            92% COMPLETE
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
