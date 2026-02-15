'use client';

import { useState } from 'react';

interface ComponentMapping {
    web: string;
    native: string;
    purpose: string;
    webExample: string;
    nativeExample: string;
    notes?: string;
}

const componentMappings: ComponentMapping[] = [
    {
        web: '<div>',
        native: '<View>',
        purpose: 'Basic layout container',
        webExample: `<div className="container">
  <p>Hello World</p>
</div>`,
        nativeExample: `<View style={styles.container}>
  <Text>Hello World</Text>
</View>`,
        notes: 'View is the fundamental building block. Flexbox layout by default with flexDirection: column'
    },
    {
        web: '<span>, <p>',
        native: '<Text>',
        purpose: 'Display text content',
        webExample: `<p>Welcome to React</p>
<span>Inline text</span>`,
        nativeExample: `<Text>Welcome to React</Text>
<Text>All text must be wrapped</Text>`,
        notes: 'ALL text must be inside <Text> components. Text cannot be a direct child of <View> without wrapping'
    },
    {
        web: '<img>',
        native: '<Image>',
        purpose: 'Display images',
        webExample: `<img 
  src="/logo.png" 
  alt="Logo" 
/>`,
        nativeExample: `<Image 
  source={require('./logo.png')}
  style={{width: 100, height: 100}}
/>`,
        notes: "Requires explicit width/height. Use source={{ uri: 'url' }} for remote images"
    },
    {
        web: '<button>',
        native: '<TouchableOpacity>',
        purpose: 'Interactive buttons',
        webExample: `<button onClick={handlePress}>
  Click Me
</button>`,
        nativeExample: `<TouchableOpacity onPress={handlePress}>
  <Text>Click Me</Text>
</TouchableOpacity>`,
        notes: 'Use onPress instead of onClick. Must wrap <Text> for button labels'
    },
    {
        web: '<input>',
        native: '<TextInput>',
        purpose: 'Text input fields',
        webExample: `<input 
  type="text"
  value={text}
  onChange={e => setText(e.target.value)}
/>`,
        nativeExample: `<TextInput
  value={text}
  onChangeText={setText}
  style={styles.input}
/>`,
        notes: 'Use onChangeText instead of onChange. No type attribute needed'
    },
    {
        web: 'overflow: scroll',
        native: '<ScrollView>',
        purpose: 'Scrollable content',
        webExample: `<div style={{overflow: 'scroll'}}>
  <p>Content...</p>
</div>`,
        nativeExample: `<ScrollView>
  <Text>Content...</Text>
</ScrollView>`,
        notes: 'Scrolling is NOT automatic. Must explicitly wrap content in ScrollView'
    },
    {
        web: '<ul>, <li>',
        native: '<FlatList>',
        purpose: 'Render lists efficiently',
        webExample: `<ul>
  {items.map(item => 
    <li key={item.id}>{item.name}</li>
  )}
</ul>`,
        nativeExample: `<FlatList
  data={items}
  renderItem={({item}) => <Text>{item.name}</Text>}
  keyExtractor={item => item.id}
/>`,
        notes: 'FlatList is optimized for long lists. Only renders visible items (virtualization)'
    },
    {
        web: '<a>',
        native: '<TouchableOpacity> + Linking',
        purpose: 'Navigation/links',
        webExample: `<a href="/about">
  About Us
</a>`,
        nativeExample: `<TouchableOpacity 
  onPress={() => navigation.navigate('About')}
>
  <Text style={styles.link}>About Us</Text>
</TouchableOpacity>`,
        notes: 'Use React Navigation for in-app navigation. Use Linking API for external URLs'
    }
];

export function ComponentTranslator() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selected = componentMappings[selectedIndex];

    return (
        <div className="glass rounded-3xl p-4 md:p-8 max-w-6xl mx-auto">
            {/* Component Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 mb-8">
                {componentMappings.map((mapping, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedIndex(index)}
                        className={`p-2 sm:p-3 md:p-4 rounded-xl font-mono text-xs md:text-sm font-semibold transition-all duration-300 ${selectedIndex === index
                            ? 'bg-gradient-to-r from-[#61dafb] to-[#764abc] text-white shadow-lg scale-105'
                            : 'bg-white/5 text-[var(--text-secondary)] hover:bg-white/10'
                            }`}
                    >
                        {mapping.web}
                    </button>
                ))}
            </div>

            {/* Translation Display */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 w-full">
                {/* Web Component */}
                <div className="bg-white/5 rounded-2xl p-4 md:p-6 border border-[#61dafb]/30 hover:border-[#61dafb]/60 transition-all duration-300 w-full min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-[#61dafb]"></div>
                        <h3 className="text-xl font-bold text-[#61dafb]">React Web</h3>
                    </div>
                    <div className="mb-4">
                        <code className="text-xl md:text-2xl font-mono font-bold text-white">{selected.web}</code>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] mb-4">{selected.purpose}</p>
                    <div className="bg-[#0a0e27] rounded-xl p-4 border border-white/10">
                        <pre className="text-sm text-[var(--text-secondary)] overflow-x-auto">
                            <code>{selected.webExample}</code>
                        </pre>
                    </div>
                </div>

                {/* Native Component */}
                <div className="bg-white/5 rounded-2xl p-4 md:p-6 border border-[#764abc]/30 hover:border-[#764abc]/60 transition-all duration-300 w-full min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-[#764abc]"></div>
                        <h3 className="text-xl font-bold text-[#764abc]">React Native</h3>
                    </div>
                    <div className="mb-4">
                        <code className="text-xl md:text-2xl font-mono font-bold text-white">{selected.native}</code>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] mb-4">{selected.purpose}</p>
                    <div className="bg-[#0a0e27] rounded-xl p-4 border border-white/10">
                        <pre className="text-sm text-[var(--text-secondary)] overflow-x-auto">
                            <code>{selected.nativeExample}</code>
                        </pre>
                    </div>
                </div>
            </div>

            {/* Important Notes */}
            {selected.notes && (
                <div className="bg-gradient-to-r from-[#f76b1c]/10 to-[#f59e0b]/10 border border-[#f76b1c]/30 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                        <div className="text-2xl">💡</div>
                        <div>
                            <h4 className="font-bold text-[#f76b1c] mb-2">Important Note</h4>
                            <p className="text-[var(--text-secondary)]">{selected.notes}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Arrows */}
            <div className="flex justify-between items-center mt-8">
                <button
                    onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
                    disabled={selectedIndex === 0}
                    className="px-6 py-3 bg-white/5 rounded-xl font-semibold text-[var(--text-primary)] hover:bg-white/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    ← Previous
                </button>

                <div className="text-sm text-[var(--text-muted)]">
                    {selectedIndex + 1} / {componentMappings.length}
                </div>

                <button
                    onClick={() => setSelectedIndex(Math.min(componentMappings.length - 1, selectedIndex + 1))}
                    disabled={selectedIndex === componentMappings.length - 1}
                    className="px-6 py-3 bg-white/5 rounded-xl font-semibold text-[var(--text-primary)] hover:bg-white/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
