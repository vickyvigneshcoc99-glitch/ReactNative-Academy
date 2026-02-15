'use client';

import { useState } from 'react';

type FlexDirection = 'row' | 'column';
type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch';

export function FlexboxVisualizer() {
    const [platform, setPlatform] = useState<'web' | 'native'>('web');
    const [flexDirection, setFlexDirection] = useState<FlexDirection>(
        platform === 'web' ? 'row' : 'column'
    );
    const [justifyContent, setJustifyContent] = useState<JustifyContent>('flex-start');
    const [alignItems, setAlignItems] = useState<AlignItems>('stretch');

    // Update flexDirection when platform changes
    const handlePlatformChange = (newPlatform: 'web' | 'native') => {
        setPlatform(newPlatform);
        setFlexDirection(newPlatform === 'web' ? 'row' : 'column');
    };

    const boxes = [
        { id: 1, color: '#61dafb' },
        { id: 2, color: '#764abc' },
        { id: 3, color: '#f76b1c' }
    ];

    return (
        <div className="glass rounded-3xl p-4 md:p-8 max-w-6xl mx-auto">
            {/* Platform Toggle */}
            <div className="flex justify-center mb-8">
                <div className="inline-flex bg-white/5 rounded-xl p-1">
                    <button
                        onClick={() => handlePlatformChange('web')}
                        className={`px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${platform === 'web'
                            ? 'bg-[#61dafb] text-white shadow-lg'
                            : 'text-[var(--text-secondary)] hover:text-white'
                            }`}
                    >
                        🌐 Web
                    </button>
                    <button
                        onClick={() => handlePlatformChange('native')}
                        className={`px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${platform === 'native'
                            ? 'bg-[#764abc] text-white shadow-lg'
                            : 'text-[var(--text-secondary)] hover:text-white'
                            }`}
                    >
                        📱 Native
                    </button>
                </div>
            </div>

            {/* Key Difference Alert */}
            <div className="bg-gradient-to-r from-[#f76b1c]/10 to-[#f59e0b]/10 border border-[#f76b1c]/30 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-3">
                    <div className="text-3xl">⚠️</div>
                    <div>
                        <h4 className="font-bold text-[#f76b1c] mb-2 text-xl">Critical Difference!</h4>
                        <p className="text-[var(--text-secondary)] text-base md:text-lg">
                            Web: <code className="px-1.5 py-0.5 bg-white/10 rounded text-[#61dafb] font-mono">row</code>
                            <br />
                            Native: <code className="px-1.5 py-0.5 bg-white/10 rounded text-[#764abc] font-mono">column</code>
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Flexbox Properties</h3>

                    {/* Flex Direction */}
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-3">
                            flexDirection
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {(['row', 'column'] as FlexDirection[]).map((dir) => (
                                <button
                                    key={dir}
                                    onClick={() => setFlexDirection(dir)}
                                    className={`px-4 py-3 rounded-xl font-mono text-sm font-semibold transition-all duration-300 ${flexDirection === dir
                                        ? 'bg-gradient-to-r from-[#61dafb] to-[#764abc] text-white shadow-lg'
                                        : 'bg-white/5 text-[var(--text-secondary)] hover:bg-white/10'
                                        }`}
                                >
                                    {dir}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Justify Content */}
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-3">
                            justifyContent (main axis)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {(['flex-start', 'center', 'flex-end', 'space-between', 'space-around'] as JustifyContent[]).map((justify) => (
                                <button
                                    key={justify}
                                    onClick={() => setJustifyContent(justify)}
                                    className={`px-4 py-3 rounded-xl font-mono text-xs font-semibold transition-all duration-300 ${justifyContent === justify
                                        ? 'bg-gradient-to-r from-[#764abc] to-[#f76b1c] text-white shadow-lg'
                                        : 'bg-white/5 text-[var(--text-secondary)] hover:bg-white/10'
                                        }`}
                                >
                                    {justify}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Align Items */}
                    <div>
                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-3">
                            alignItems (cross axis)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {(['flex-start', 'center', 'flex-end', 'stretch'] as AlignItems[]).map((align) => (
                                <button
                                    key={align}
                                    onClick={() => setAlignItems(align)}
                                    className={`px-4 py-3 rounded-xl font-mono text-sm font-semibold transition-all duration-300 ${alignItems === align
                                        ? 'bg-gradient-to-r from-[#f76b1c] to-[#10b981] text-white shadow-lg'
                                        : 'bg-white/5 text-[var(--text-secondary)] hover:bg-white/10'
                                        }`}
                                >
                                    {align}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Code Output */}
                    <div className="bg-[#0a0e27] rounded-xl p-6 border border-white/10">
                        <div className="text-xs text-[var(--text-muted)] mb-2">
                            {platform === 'web' ? 'CSS' : 'React Native StyleSheet'}
                        </div>
                        <pre className="text-sm text-[var(--text-secondary)] font-mono">
                            <code>{`{
  display: 'flex',
  flexDirection: '${flexDirection}',
  justifyContent: '${justifyContent}',
  alignItems: '${alignItems}'
}`}</code>
                        </pre>
                    </div>
                </div>

                {/* Visual Preview */}
                <div>
                    <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Live Preview</h3>

                    <div className="bg-white/5 rounded-2xl p-4 md:p-8 border border-white/10 min-h-[300px] md:min-h-[400px]">
                        <div
                            className="w-full h-full border-2 border-dashed border-white/20 rounded-xl p-4 transition-all duration-500"
                            style={{
                                display: 'flex',
                                flexDirection,
                                justifyContent,
                                alignItems,
                                minHeight: '300px'
                            }}
                        >
                            {boxes.map((box) => (
                                <div
                                    key={box.id}
                                    className="rounded-xl font-bold text-white flex items-center justify-center shadow-lg transition-all duration-500 hover:scale-110"
                                    style={{
                                        backgroundColor: box.color,
                                        width: flexDirection === 'row' ? '60px' : alignItems === 'stretch' ? '100%' : '100px',
                                        height: flexDirection === 'column' ? '60px' : alignItems === 'stretch' ? '100%' : '100px',
                                        minWidth: flexDirection === 'row' ? '60px' : undefined,
                                        minHeight: flexDirection === 'column' ? '60px' : undefined,
                                        maxWidth: flexDirection === 'row' ? '80px' : undefined,
                                        maxHeight: flexDirection === 'column' ? '80px' : undefined
                                    }}
                                >
                                    {box.id}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Axis Labels */}
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="bg-[#61dafb]/10 border border-[#61dafb]/30 rounded-xl p-4">
                            <div className="text-sm font-semibold text-[#61dafb] mb-1">Main Axis</div>
                            <div className="text-xs text-[var(--text-muted)]">
                                {flexDirection === 'row' ? 'Horizontal →' : 'Vertical ↓'}
                            </div>
                            <div className="text-xs text-[var(--text-muted)] mt-1">
                                Controlled by <code className="text-[#61dafb]">justifyContent</code>
                            </div>
                        </div>
                        <div className="bg-[#764abc]/10 border border-[#764abc]/30 rounded-xl p-4">
                            <div className="text-sm font-semibold text-[#764abc] mb-1">Cross Axis</div>
                            <div className="text-xs text-[var(--text-muted)]">
                                {flexDirection === 'row' ? 'Vertical ↓' : 'Horizontal →'}
                            </div>
                            <div className="text-xs text-[var(--text-muted)] mt-1">
                                Controlled by <code className="text-[#764abc]">alignItems</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
