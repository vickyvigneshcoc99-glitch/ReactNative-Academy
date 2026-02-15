'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ComponentTranslator } from './components/ComponentTranslator';
import { FlexboxVisualizer } from './components/FlexboxVisualizer';
import { CurriculumOverview } from './components/CurriculumOverview';
import { FeaturedProjects } from './components/FeaturedProjects';

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom, duration: 0.8, ease: "easeOut" as const }
    })
  };

  const floatAnimation = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-[#61dafb] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            variants={floatAnimation}
            animate="animate"
          />
          <motion.div
            className="absolute top-40 right-10 w-72 h-72 bg-[#764abc] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            variants={floatAnimation}
            animate="animate"
            transition={{ delay: 1 }}
          />
          <motion.div
            className="absolute -bottom-20 left-1/2 w-72 h-72 bg-[#f76b1c] rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            variants={floatAnimation}
            animate="animate"
            transition={{ delay: 2 }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#61dafb] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#61dafb]"></span>
              </span>
              <span className="text-sm font-medium text-[var(--text-secondary)]">Learn Once, Write Anywhere</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-md">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-bold text-green-500 uppercase tracking-tighter">Security Hardened</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-6"
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeInUp}
          >
            <span className="bg-gradient-to-r from-[#61dafb] via-[#764abc] to-[#f76b1c] bg-clip-text text-transparent">
              React Native
            </span>
            <br />
            <span className="text-[var(--text-primary)]">Academy</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-12"
            initial="hidden"
            animate="visible"
            custom={0.4}
            variants={fadeInUp}
          >
            Bridge the gap from <span className="text-[#61dafb] font-semibold">Web Components</span> to{' '}
            <span className="text-[#764abc] font-semibold">Native Primitives</span>.
            Master React Native with interactive lessons, live code playgrounds, and real-world examples.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial="hidden"
            animate="visible"
            custom={0.6}
            variants={fadeInUp}
          >
            <Link
              href="/lessons/1"
              className="group relative px-8 py-4 bg-gradient-to-r from-[#61dafb] to-[#764abc] rounded-xl font-bold text-lg text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Start Learning</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#764abc] to-[#61dafb] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/playground"
              className="px-8 py-4 glass rounded-xl font-bold text-lg text-[var(--text-primary)] hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              Try Playground
            </Link>

            <a
              href="https://github.com/vickyvigneshcoc99-glitch?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 glass rounded-xl font-bold text-lg text-[var(--text-primary)] hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/10"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            custom={0.8}
            variants={fadeInUp}
          >
            <div className="glass p-6 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-[#61dafb] to-[#764abc] bg-clip-text text-transparent mb-2">
                12+
              </div>
              <div className="text-sm text-[var(--text-muted)]">Interactive Lessons</div>
            </div>
            <div className="glass p-6 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-[#764abc] to-[#f76b1c] bg-clip-text text-transparent mb-2">
                50+
              </div>
              <div className="text-sm text-[var(--text-muted)]">Code Examples</div>
            </div>
            <div className="glass p-6 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-[#f76b1c] to-[#10b981] bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-sm text-[var(--text-muted)]">Hands-On</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Component Translator Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#61dafb] to-[#764abc] bg-clip-text text-transparent">
                Component Translation
              </span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Understand the direct mapping between React Web and React Native components
            </p>
          </div>
          <ComponentTranslator />
        </div>
      </section>

      {/* Flexbox Visualizer Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#764abc] to-[#f76b1c] bg-clip-text text-transparent">
                Flexbox Differences
              </span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              React Native uses <code className="px-2 py-1 bg-white/10 rounded text-[#61dafb]">flexDirection: column</code> by default,
              unlike the web's <code className="px-2 py-1 bg-white/10 rounded text-[#f76b1c]">row</code>
            </p>
          </div>
          <FlexboxVisualizer />
        </div>
      </section>

      {/* Curriculum Overview Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#f76b1c] to-[#10b981] bg-clip-text text-transparent">
                Learning Path
              </span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              A structured curriculum designed to take you from React developer to React Native expert
            </p>
          </div>
          <CurriculumOverview />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#10b981] via-[#61dafb] to-[#764abc] bg-clip-text text-transparent">
                Developer Showcase
              </span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Explore real-world React and React Native projects built by our lead instructor
            </p>
          </div>
          <FeaturedProjects />
        </div>
      </section>

      {/* Why React Native Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#10b981] to-[#61dafb] bg-clip-text text-transparent">
                Why React Native?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Learn Once, Write Anywhere',
                description: 'Use your React knowledge to build native iOS and Android apps with a single codebase'
              },
              {
                icon: '🎨',
                title: 'Native Performance',
                description: 'True native components and APIs for smooth, 60fps animations and interactions'
              },
              {
                icon: '🔥',
                title: 'Hot Reloading',
                description: 'See changes instantly without losing app state - faster than web development'
              },
              {
                icon: '📱',
                title: 'Platform-Specific Code',
                description: 'Write custom code for iOS and Android when needed, all in JavaScript'
              },
              {
                icon: '🌐',
                title: 'Huge Ecosystem',
                description: 'Access thousands of npm packages and native modules for any feature'
              },
              {
                icon: '💼',
                title: 'Industry Standard',
                description: 'Used by Facebook, Instagram, Airbnb, Tesla, and thousands of companies'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="glass p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Ready to Build <br />
            <span className="bg-gradient-to-r from-[#61dafb] via-[#764abc] to-[#f76b1c] bg-clip-text text-transparent">
              Native Mobile Apps?
            </span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-12">
            Start your journey from web to mobile development today
          </p>
          <Link
            href="/lessons/1"
            className="inline-block px-12 py-5 bg-gradient-to-r from-[#61dafb] to-[#764abc] rounded-xl font-bold text-xl text-white shadow-2xl hover:shadow-[0_0_50px_rgba(97,218,251,0.5)] hover:scale-105 transition-all duration-300"
          >
            Begin Lesson 1
          </Link>
        </div>
      </section>
    </main>
  );
}
