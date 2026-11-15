export interface Game {
  id: string;
  title: string;
  tagline: string;
  description: string;
  genre: string;
  platform: string;
  status: string;
  releaseDate: string;
  rating?: string;
  downloads?: string;
  coverImage: string;
  bannerImage: string;
  screenshots: string[];
  features: string[];
  googlePlayUrl: string;
  trailerUrl?: string;
  badge?: string;
}

export interface Technology {
  id: string;
  name: string;
  category: 'Engine' | 'Language' | 'Networking' | 'Backend' | 'Asset Pipeline' | 'Tools';
  description: string;
  iconName: string;
  level: string;
  highlight: string;
}

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  tags: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  readTime: string;
  image: string;
  content: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  game: string;
  category: 'Screenshot' | 'Artwork' | 'UI Render' | '3D Model';
  image: string;
  aspectRatio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
  game: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
