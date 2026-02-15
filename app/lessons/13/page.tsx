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
        title: 'Secure Storage',
        web: `/* LocalStorage is NOT secure */
localStorage.setItem('token', '123');`,
        native: `import * as Keychain from 'react-native-keychain';

// Store credentials securely
await Keychain.setGenericPassword(
  'username', 
  'password123'
);`,
        explanation: 'In React Native, sensitive data like Auth Tokens should NEVER be stored in AsyncStorage (the LocalStorage equivalent). Use the Keychain (iOS) or Keystore (Android) for encrypted at-rest storage.'
    },
    {
        title: 'Biometrics',
        web: `/* WebAuthn (complex to setup) */`,
        native: `import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();
const { success } = await rnBiometrics.simplePrompt({
  promptMessage: 'Confirm Identity'
});`,
        explanation: 'Native apps have direct access to FaceID and Fingerprint sensors. This allows for seamless, secure user verification without requiring full passwords for every session.'
    },
    {
        title: 'SSL Pinning',
        web: `/* Handled by the Browser */`,
        native: `/* Use react-native-ssl-pinning */
fetch('https://api.myapp.com', {
  method: 'GET',
  pkPinning: true,
  certs: ['my_cert']
});`,
        explanation: 'To prevent Man-in-the-Middle (MITM) attacks, mobile apps can "pin" specific SSL certificates. This ensures the app only talks to your specific server, even if a user is on a compromised Wi-Fi.'
    }
];

const securityTips = [
    {
        icon: '🔐',
        title: 'No AsyncStorage',
        description: 'AsyncStorage is plain text. Use Keychain/Keystore for tokens, keys, and private data.'
    },
    {
        icon: '🛡️',
        title: 'Obfuscation',
        description: 'Use ProGuard (Android) and JSC/Hermes bytecode (iOS) to make it harder to reverse-engineer your app.'
    },
    {
        icon: '🚫',
        title: 'Jailbreak Detect',
        description: 'Check if a device is rooted or jailbroken. High-security apps (banking) should block access on compromised devices.'
    },
    {
        icon: '🛰️',
        title: 'TLS 1.3',
        description: 'Always enforce HTTPS and use the latest TLS protocols for every API request your app makes.'
    }
];

export default function Lesson13() {
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
            <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-[#ef4444]/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

            <motion.div
                className="max-w-6xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div className="mb-8" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <Link href="/" className="text-[var(--text-muted)] hover:text-[#ef4444] transition-all flex items-center gap-2 group">
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Courses
                    </Link>
                </motion.div>

                <motion.div className="glass rounded-[2rem] p-6 md:p-12 mb-12 text-center" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md mb-6 border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
                        <span className="text-sm font-mono text-[var(--text-muted)]">Lesson 13</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                        <span className="bg-gradient-to-r from-[#ef4444] via-[#764abc] to-[#f76b1c] bg-clip-text text-transparent">
                            Mobile Security
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Fortify your applications. Master encrypted storage, biometric authentication, and network-level security to protect user privacy.
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
                                    <motion.div layoutId="tab13" className="absolute inset-0 bg-gradient-to-r from-[#ef4444] to-[#764abc] z-0" />
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
                                <h3 className="text-xl font-bold text-[#ef4444] mb-4">React Native</h3>
                                <div className="bg-[#0f1122] rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-white/5 group-hover:border-[#ef4444]/30 transition-all">
                                    <pre className="text-sm font-mono text-[var(--text-secondary)] overflow-x-auto"><code>{codeExamples[activeExample].native}</code></pre>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <motion.div className="glass rounded-2xl p-6 bg-gradient-to-r from-[#ef4444]/10 to-[#764abc]/10 border border-[#ef4444]/30" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                        <div className="flex items-start gap-4">
                            <div className="text-3xl">💡</div>
                            <div>
                                <h4 className="font-bold text-[#ef4444] mb-2">Key Insight</h4>
                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{codeExamples[activeExample].explanation}</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>

                <motion.section className="mb-20" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {securityTips.map((tip, i) => (
                            <motion.div key={i} whileHover={{ y: -10 }} className="glass p-6 md:p-8 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tip.icon}</div>
                                <h4 className="font-bold mb-2 text-white">{tip.title}</h4>
                                <p className="text-sm text-[var(--text-muted)]">{tip.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section className="mb-20" variants={{ visible: { opacity: 1, y: 0 }, hidden: itemVariants }}>
                    <div className="glass rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ef4444]/20 via-transparent to-[#764abc]/20 opacity-50" />

                        <div className="relative z-10 text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-black mb-8 text-center">🎓 Graduation Project</h2>
                            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-12 text-center max-w-3xl mx-auto">
                                You've mastered the theory. Now, here is your **Capstone Project**: A fully functional E-Commerce App template with navigation, state, and native styling.
                            </p>

                            <div className="bg-[#0f1122] rounded-[2rem] p-6 md:p-8 border border-white/10 mb-10 text-left">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                                    <h3 className="text-xl font-bold text-[#61dafb]">E-Commerce Elite Template</h3>
                                    <span className="px-3 py-1 bg-[#61dafb]/10 text-[#61dafb] text-xs font-mono rounded-full border border-[#61dafb]/20">Full Project Code</span>
                                </div>
                                <div className="max-h-[300px] md:max-h-[400px] overflow-auto custom-scrollbar rounded-xl bg-black/30 p-4 md:p-6 border border-white/5">
                                    <pre className="text-sm font-mono text-[var(--text-muted)] leading-relaxed">
                                        <code>{`// --- FULL PROJECT ARCHITECTURE ---
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

const PRODUCTS = [
  { id: '1', name: 'Neural Links v2', price: '$299', color: '#61dafb' },
  { id: '2', name: 'Glass Tab Pro', price: '$899', color: '#764abc' },
  { id: '3', name: 'Haptic Glove', price: '$150', color: '#f76b1c' },
];

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>RN ACADEMY STORE</Text>
        <View style={styles.cartBadge}>
          <Text style={styles.cartText}>{cartCount}</Text>
        </View>
      </View>

      {/* Product List */}
      <FlatList
        data={PRODUCTS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.imagePlaceholder, { backgroundColor: item.color }]} />
            <View style={styles.cardInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <TouchableOpacity 
                style={styles.button}
                onPress={() => setCartCount(c => c + 1)}
              >
                <Text style={styles.btnText}>ADD TO CART</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0e27' },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { fontSize: 24, fontWeight: '900', color: '#fff' },
  cartBadge: { backgroundColor: '#61dafb', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 5 },
  cartText: { color: '#000', fontWeight: 'bold' },
  card: { margin: 20, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20, overflow: 'hidden' },
  imagePlaceholder: { height: 200, width: '100%' },
  cardInfo: { padding: 20 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  price: { color: '#61dafb', marginVertical: 10, fontSize: 18 },
  button: { backgroundColor: '#fff', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { fontWeight: '900', color: '#000' }
});`}</code>
                                    </pre>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                <Link
                                    href="/playground"
                                    className="w-full sm:w-auto text-center px-8 md:px-12 py-5 bg-white text-black rounded-2xl font-black text-lg md:text-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                >
                                    Copy to Playground →
                                </Link>
                                <p className="text-[var(--text-muted)] font-mono text-sm uppercase tracking-widest">Mastery Achieved</p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-20">
                    <Link href="/lessons/12" className="w-full sm:w-auto text-center px-10 py-5 glass rounded-2xl font-bold text-[var(--text-primary)] hover:bg-white/10 transition-all">← Lesson 12</Link>
                    <Link href="/" className="w-full sm:w-auto text-center px-10 py-5 bg-gradient-to-r from-[#ef4444] to-[#764abc] rounded-2xl font-bold text-white hover:scale-105 transition-all shadow-[0_0_50px_rgba(239,68,68,0.3)]">Finish Academy & Certify →</Link>
                </div>
            </motion.div>
        </main>
    );
}
