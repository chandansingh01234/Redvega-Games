import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { CustomCursor } from '../components/ui/CustomCursor';
import { ParticleBackground } from '../components/ui/ParticleBackground';

export const metadata: Metadata = {
  metadataBase: new URL('https://redvegagames.com'),
  title: 'Redvega Games | Independent Game Development Studio | Adventure Awaits',
  description:
    'Redvega Games is an independent game development studio creating immersive mobile survival and multiplayer PvP games powered by Unity. Developers of Stone Island: The Apocalypse and Infinity Space.',
  keywords: [
    'Redvega Games',
    'Indie Game Studio',
    'Unity Developer',
    'Stone Island The Apocalypse',
    'Infinity Space',
    'Android Zombie Survival Shooter',
    'Multiplayer PvP Spaceship Game',
    'Mobile Games',
    'C# Unity Engine',
    'Solo Game Dev',
  ],
  authors: [{ name: 'Redvega Games' }],
  creator: 'Redvega Games',
  publisher: 'Redvega Games',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://redvegagames.com',
    siteName: 'Redvega Games',
    title: 'Redvega Games | Creating Unique Gaming Experiences',
    description:
      'Independent game development studio crafting high-performance mobile survival and multiplayer PvP titles powered by Unity.',
    images: [
      {
        url: '/images/games/stone-island-banner.svg',
        width: 1200,
        height: 630,
        alt: 'Redvega Games Showcase Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Redvega Games | Adventure Awaits',
    description:
      'Immersive mobile survival & multiplayer PvP games engineered in Unity. Explore Stone Island and Infinity Space.',
    images: ['/images/games/stone-island-banner.svg'],
    creator: '@redvegagames',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Redvega Games',
  url: 'https://redvegagames.com',
  logo: 'https://redvegagames.com/images/games/stone-island-cover.svg',
  slogan: 'Adventure Awaits.',
  description:
    'Independent solo game development studio creating immersive mobile survival and multiplayer games powered by Unity.',
  sameAs: [
    'https://instagram.com',
    'https://youtube.com',
    'https://github.com',
  ],
  knowsAbout: ['Unity Engine', 'C# Game Architecture', 'Photon Networking', '3D Modeling'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="bg-[#08090D] text-slate-100 antialiased selection:bg-[#E63946] selection:text-white relative min-h-screen flex flex-col">
        {/* Interactive Physics Canvas Background */}
        <ParticleBackground />

        {/* Custom Glowing Red Desktop Cursor */}
        <CustomCursor />

        {/* Sticky Glassmorphic Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow z-10">{children}</main>

        {/* Studio Footer */}
        <Footer />

        {/* Scroll Progress Ring & Back To Top Button */}
        <ScrollToTop />
      </body>
    </html>
  );
}
