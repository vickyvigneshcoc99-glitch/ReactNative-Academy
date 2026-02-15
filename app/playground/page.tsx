'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const starterTemplates = [
  {
    id: 'hello-world',
    title: 'Hello World',
    description: 'Basic View and Text components',
    code: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, React Native! 👋</Text>
      <Text style={styles.subtitle}>
        Welcome to your first mobile app
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#61dafb',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#cbd5e1',
    textAlign: 'center',
  },
});`
  },
  {
    id: 'button-press',
    title: 'Interactive Button',
    description: 'Touchable components and state',
    code: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter App</Text>
      <Text style={styles.count}>{count}</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>Tap Me!</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.resetButton]}
        onPress={() => setCount(0)}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#61dafb',
    marginBottom: 20,
  },
  count: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#764abc',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#61dafb',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 12,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#f76b1c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});`
  },
  {
    id: 'flexbox-layout',
    title: 'Flexbox Layout',
    description: 'Understanding column vs row',
    code: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flexbox Demo</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>Column (default):</Text>
        <View style={styles.columnContainer}>
          <View style={[styles.box, { backgroundColor: '#61dafb' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.box, { backgroundColor: '#764abc' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.box, { backgroundColor: '#f76b1c' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Row:</Text>
        <View style={styles.rowContainer}>
          <View style={[styles.box, { backgroundColor: '#61dafb' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.box, { backgroundColor: '#764abc' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.box, { backgroundColor: '#f76b1c' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#61dafb',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    color: '#cbd5e1',
    marginBottom: 10,
  },
  columnContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  box: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});`
  },
  {
    id: 'list-demo',
    title: 'FlatList',
    description: 'Efficient list rendering',
    code: `import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const DATA = [
  { id: '1', title: 'View', description: 'Container component' },
  { id: '2', title: 'Text', description: 'Display text content' },
  { id: '3', title: 'Image', description: 'Show images' },
  { id: '4', title: 'ScrollView', description: 'Scrollable container' },
  { id: '5', title: 'FlatList', description: 'Efficient lists' },
  { id: '6', title: 'TouchableOpacity', description: 'Touchable button' },
];

export default function App() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>React Native Components</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#61dafb',
    marginBottom: 20,
  },
  list: {
    gap: 12,
  },
  item: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(97, 218, 251, 0.3)',
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#764abc',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#cbd5e1',
  },
});`
  }
];

export default function Playground() {
  const [selectedTemplate, setSelectedTemplate] = useState(starterTemplates[0]);
  const [code, setCode] = useState(selectedTemplate.code);

  const handleTemplateChange = (template: typeof starterTemplates[0]) => {
    setSelectedTemplate(template);
    setCode(template.code);
  };

  const getSnackUrl = () => {
    const encodedCode = encodeURIComponent(code);
    return `https://snack.expo.dev/?code=${encodedCode}`;
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  return (
    <main className="min-h-screen py-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 -z-10 w-[600px] h-[600px] bg-[#61dafb]/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        {/* Breadcrumb */}
        <motion.div className="mb-8" variants={variants}>
          <Link
            href="/"
            className="text-[var(--text-muted)] hover:text-[#61dafb] transition-all duration-300 flex items-center gap-2 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div className="glass rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 mb-12 text-center relative overflow-hidden" variants={variants}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#61dafb]/5 to-[#764abc]/5" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md mb-6 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#61dafb] animate-pulse" />
              <span className="text-sm font-mono text-[var(--text-muted)]">Live Sandbox</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-[#61dafb] via-[#764abc] to-[#f76b1c] bg-clip-text text-transparent">
                Interactive Lab
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed font-light">
              Write React Native code and watch it transform into a real mobile experience.
              Experiment, break things, and learn by doing.
            </p>
          </div>
        </motion.div>

        {/* Template Selector */}
        <motion.div className="mb-8" variants={variants}>
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-[var(--text-primary)]">
            Starter Templates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {starterTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateChange(template)}
                className={`glass rounded-xl p-6 text-left transition-all duration-300 hover:scale-105 ${selectedTemplate.id === template.id
                  ? 'border-2 border-[#61dafb] bg-white/10'
                  : 'border border-white/10 hover:bg-white/5'
                  }`}
              >
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  {template.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {template.description}
                </p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Code Editor & Preview */}
        <motion.div className="grid lg:grid-cols-2 gap-8 mb-12" variants={variants}>
          {/* Code Editor */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Code Editor
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setCode(selectedTemplate.code)}
                  className="px-4 py-2 bg-white/5 rounded-lg text-sm text-[var(--text-muted)] hover:bg-white/10 transition-all duration-300"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="bg-[#0a0e27] rounded-xl border border-white/10 overflow-hidden">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[600px] p-4 bg-transparent text-[var(--text-secondary)] font-mono text-sm resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Expo Snack Preview */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Live Preview
              </h3>
              <a
                href={getSnackUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-[#61dafb] to-[#764abc] rounded-lg text-sm text-white font-semibold hover:shadow-lg transition-all duration-300"
              >
                Open in Expo Snack
              </a>
            </div>
            <div className="bg-[#0a0e27] rounded-xl border border-white/10 p-8 h-[600px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-6">📱</div>
                <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  Run on Your Phone
                </h4>
                <p className="text-[var(--text-secondary)] mb-6 max-w-md">
                  Click &quot;Open in Expo Snack&quot; to run this code on your actual device using the Expo Go app
                </p>
                <div className="glass rounded-xl p-6 text-left">
                  <h5 className="font-bold text-[#61dafb] mb-3">Quick Start:</h5>
                  <ol className="space-y-2 text-sm text-[var(--text-muted)]">
                    <li>1. Install Expo Go from App Store/Play Store</li>
                    <li>2. Click &quot;Open in Expo Snack&quot; button</li>
                    <li>3. Scan the QR code with your phone</li>
                    <li>4. See your app running instantly!</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div className="glass rounded-2xl p-6 md:p-8 mb-12" variants={variants}>
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-[var(--text-primary)]">
            How Expo Snack Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">✍️</div>
              <h3 className="text-lg md:text-xl font-bold text-[#61dafb] mb-2">Write Code</h3>
              <p className="text-sm md:text-base text-[var(--text-muted)]">
                Edit React Native code right in your browser
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">☁️</div>
              <h3 className="text-lg md:text-xl font-bold text-[#764abc] mb-2">Cloud Build</h3>
              <p className="text-sm md:text-base text-[var(--text-muted)]">
                Expo compiles your code in the cloud instantly
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-4">📱</div>
              <h3 className="text-lg md:text-xl font-bold text-[#f76b1c] mb-2">Run Native</h3>
              <p className="text-sm md:text-base text-[var(--text-muted)]">
                See your app running on real iOS/Android devices
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div className="grid md:grid-cols-2 gap-6" variants={variants}>
          <div className="glass rounded-2xl p-6 border border-[#61dafb]/30">
            <div className="flex items-start gap-3">
              <div className="text-3xl">💡</div>
              <div>
                <h3 className="text-xl font-bold text-[#61dafb] mb-2">Pro Tip</h3>
                <p className="text-[var(--text-secondary)]">
                  Shake your phone while running the app to open the developer menu.
                  You can enable live reload and fast refresh!
                </p>
              </div>
            </div>
          </div>
          <div className="glass rounded-2xl p-6 border border-[#764abc]/30">
            <div className="flex items-start gap-3">
              <div className="text-3xl">🚀</div>
              <div>
                <h3 className="text-xl font-bold text-[#764abc] mb-2">No Setup Needed</h3>
                <p className="text-[var(--text-secondary)]">
                  Unlike traditional React Native development, you don&apos;t need Xcode or Android Studio.
                  Just install Expo Go and start coding!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
