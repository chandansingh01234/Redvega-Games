import React from 'react';
import { Hero } from '../components/home/Hero';
import { AboutSection } from '../components/home/AboutSection';
import { FeaturedGames } from '../components/home/FeaturedGames';
import { TechStack } from '../components/home/TechStack';
import { GallerySection } from '../components/home/GallerySection';
import { ProcessTimeline } from '../components/home/ProcessTimeline';
import { GameRoadmap } from '../components/home/GameRoadmap';
import { NewsSection } from '../components/home/NewsSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FAQSection } from '../components/home/FAQSection';
import { ContactSection } from '../components/home/ContactSection';
export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedGames />
      <TechStack />
      <GallerySection />
      <ProcessTimeline />
      <GameRoadmap />
      <NewsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
} 
