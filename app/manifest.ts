import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'React Native Academy',
        short_name: 'RN Academy',
        description: 'Master React Native by bridging the gap from Web Components to Native Primitives.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0a0e27',
        theme_color: '#0a0e27',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}
