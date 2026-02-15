'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function GenericLesson() {
    const params = useParams();
    const id = params.id as string;

    const lessonsData: Record<string, { title: string; description: string; topics: string[] }> = {
        '3': {
            title: 'Touchable Components',
            description: 'Handle user interactions with native touch components',
            topics: ['TouchableOpacity', 'Pressable', 'Gestures', 'Events']
        },
        '4': {
            title: 'Lists & ScrollViews',
            description: 'Efficiently render scrollable content and long lists',
            topics: ['ScrollView', 'FlatList', 'SectionList', 'Virtualization']
        },
        '5': {
            title: 'Styling & Theming',
            description: 'Create beautiful UIs with StyleSheet and dynamic themes',
            topics: ['StyleSheet', 'Dimensions', 'Platform Styles', 'Dark Mode']
        },
        '6': {
            title: 'Navigation Patterns',
            description: 'Navigate between screens with React Navigation',
            topics: ['Stack Navigator', 'Tab Navigator', 'Drawer', 'Deep Linking']
        },
        '7': {
            title: 'Forms & Input',
            description: 'Build forms with TextInput and validation',
            topics: ['TextInput', 'Keyboard', 'Validation', 'Form State']
        },
        '8': {
            title: 'Native APIs',
            description: 'Access device features like camera, location, and sensors',
            topics: ['Camera', 'Geolocation', 'Permissions', 'Haptics']
        },
        '9': {
            title: 'Animations',
            description: 'Create smooth 60fps animations with Animated API',
            topics: ['Animated', 'LayoutAnimation', 'Reanimated', 'Gestures']
        },
        '10': {
            title: 'Performance Optimization',
            description: 'Optimize your app for production performance',
            topics: ['Profiling', 'Memoization', 'Image Optimization', 'Bundle Size']
        },
        '11': {
            title: 'Platform-Specific Code',
            description: 'Write custom code for iOS and Android',
            topics: ['Platform API', 'Platform Files', 'Native Modules', 'Bridging']
        },
        '12': {
            title: 'Testing & Debugging',
            description: 'Test and debug React Native applications',
            topics: ['Jest', 'React Native Testing Library', 'Debugging', 'Flipper']
        }
    };

    const lesson = lessonsData[id] || {
        title: 'Coming Soon',
        description: 'This lesson is currently being prepared by our expert instructors.',
        topics: ['React Native', 'Best Practices', 'Architecture']
    };

    return (
        <main className="min-h-screen py-20 px-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-[#61dafb]/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl mx-auto text-center">
                {/* Breadcrumb */}
                <div className="mb-8 text-left">
                    <Link
                        href="/"
                        className="text-[var(--text-muted)] hover:text-[#61dafb] transition-colors duration-300 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                </div>

                <motion.div
                    className="glass rounded-[3rem] p-16 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md mb-6 border border-white/10">
                        <span className="text-sm font-mono text-[var(--text-muted)]">Lesson {id}</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black mb-6">
                        <span className="bg-gradient-to-r from-[#61dafb] via-[#764abc] to-[#f76b1c] bg-clip-text text-transparent">
                            {lesson.title}
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                        {lesson.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
                        {lesson.topics.map((topic, index) => (
                            <div key={index} className="glass p-6 rounded-2xl border border-white/5 transition-all duration-300 hover:bg-white/10 group">
                                <p className="font-bold text-[var(--text-primary)] group-hover:text-[#61dafb]">{topic}</p>
                            </div>
                        ))}
                    </div>

                    <div className="inline-block px-12 py-5 glass border-[#61dafb]/30 rounded-2xl">
                        <span className="text-[#61dafb] font-black text-xl">Module Under Construction 🛠️</span>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
