// app/blogs/page.tsx
'use client';

import { memo, useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import { FaArrowRight, FaHome, FaBuilding, FaIndustry, FaCity } from 'react-icons/fa';
import { blogsData } from '@/lib/blogData';

interface BlogPageProps {
  params?: any;
  searchParams?: any;
}

// Memoized components
const SliderButton = memo(({ 
  id, 
  direction 
}: { 
  id: string; 
  direction: 'left' | 'right'; 
}) => (
  <motion.button 
    id={id}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex justify-center items-center border border-solid border-blue-900 w-11 h-11 transition-all duration-500 rounded-full bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 hover:from-blue-900 hover:via-blue-950 hover:to-blue-900"
  >
    <svg className="h-6 w-6 text-white transition-colors duration-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {direction === 'left' ? (
        <path d="M20.9999 12L4.99992 12M9.99992 6L4.70703 11.2929C4.3737 11.6262 4.20703 11.7929 4.20703 12C4.20703 12.2071 4.3737 12.3738 4.70703 12.7071L9.99992 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      ) : (
        <path d="M3 12L19 12M14 18L19.2929 12.7071C19.6262 12.3738 19.7929 12.2071 19.7929 12C19.7929 11.7929 19.6262 11.6262 19.2929 11.2929L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      )}
    </svg>
  </motion.button>
));

SliderButton.displayName = 'SliderButton';

const BlogCard = memo(({ 
  blog, 
  index 
}: { 
  blog: typeof blogsData[0]; 
  index: number;
}) => (
  <motion.div 
    key={blog.id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="swiper-slide w-full lg:w-1/2"
  >
    <motion.div 
      className="mb-9"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Image 
        src={blog.cardImage} 
        alt={blog.title} 
        className="rounded-2xl w-full object-cover"
        width={600}
        height={400}
        placeholder="blur"
      />
    </motion.div>
    <Link href={`/blogs/${blog.slug}`} prefetch={false}>
      <motion.h3 
        whileHover={{ color: 'rgb(79, 70, 229)' }}
        transition={{ duration: 0.3 }}
        className="text-xl text-gray-900 font-medium leading-8 mb-4"
      >
        {blog.title}
      </motion.h3>
    </Link>
    <p className="text-gray-500 leading-6 mb-8 text-justify">
      {blog.intro}
    </p>
    <Link 
      href={`/blogs/${blog.slug}`} 
      className="flex items-center gap-2 text-lg text-indigo-600 font-semibold group"
      prefetch={false}
    >
      <span>Read more</span>
      <motion.svg 
        width="15" 
        height="12" 
        viewBox="0 0 15 12" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.3 }}
      >
        <path d="M1.25 6L13.25 6M9.5 10.5L13.4697 6.53033C13.7197 6.28033 13.8447 6.15533 13.8447 6C13.8447 5.84467 13.7197 5.71967 13.4697 5.46967L9.5 1.5" stroke="rgb(79, 70, 229)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </motion.svg>
    </Link>
  </motion.div>
));

BlogCard.displayName = 'BlogCard';

// Custom styles component to prevent recreation
const SwiperStyles = memo(() => (
  <style jsx global>{`
    .swiper-button-prev:after,
    .swiper-rtl .swiper-button-next:after {
      content: '' !important;
    }

    .swiper-button-next:after,
    .swiper-rtl .swiper-button-prev:after {
      content: '' !important;
    }

    .swiper-button-next svg,
    .swiper-button-prev svg {
      width: 24px !important;
      height: 24px !important;
    }

    .swiper-button-next,
    .swiper-button-prev {
      position: relative !important;
    }

    .swiper-slide.swiper-slide-active {
      border-color: rgb(79, 70, 229) !important;
    }
    
    .swiper {
      overflow: hidden !important;
      position: relative !important;
      width: 100% !important;
    }
    
    .swiper-wrapper {
      display: flex !important;
      width: 100% !important;
      box-sizing: content-box !important;
    }
    
    .swiper-slide {
      flex: 0 0 auto !important;
      width: 100% !important;
      padding: 16px !important;
      box-sizing: border-box !important;
      transition: transform 300ms ease !important;
    }

    @media (min-width: 768px) {
      .swiper-slide {
        width: 50% !important;
      }
    }
  `}</style>
));

SwiperStyles.displayName = 'SwiperStyles';

const BlogPage: React.FC<BlogPageProps> = ({ 
  params,
  searchParams 
}) => {
  const [swiperLoaded, setSwiperLoaded] = useState(false);

  // Memoized blogs data
  const displayBlogs = useMemo(() => 
    blogsData.sort((a, b) => a.id - b.id).slice(0, 4), 
  []);

  // Memoized PageHeader data
  const headerSlides = useMemo(() => [
    {
      title: "Latest Insights",
      subtitle: "Discover our latest articles, expert opinions, and industry insights from Digitallink Bahrain",
      headingPart1: "Explore Our",
      headingPart2: "Blog & Insights"
    }
  ], []);

  const headerBenefits = useMemo(() => [
    "Expert Industry Insights",
    "Latest Technology Trends",
    "Practical Tips & Guides",
    "Professional Development",
    "Innovation Updates"
  ], []);

  const headerFeatures = useMemo(() => [
    { icon: FaHome, title: "Home Security", desc: "Latest trends" },
    { icon: FaBuilding, title: "Business Security", desc: "Best practices" },
    { icon: FaIndustry, title: "Industrial Solutions", desc: "Optimization" },
    { icon: FaCity, title: "Smart City", desc: "Innovation" }
  ], []);

  // Swiper initialization
  const initializeSwiper = useCallback(() => {
    if (swiperLoaded && typeof window !== 'undefined' && (window as any).Swiper) {
      const Swiper = (window as any).Swiper;
      new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        speed: 500,
        navigation: {
          nextEl: '#slider-button-right',
          prevEl: '#slider-button-left',
        },
        breakpoints: {
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 }
        }
      });
    }
  }, [swiperLoaded]);

  // Load Swiper resources
  useEffect(() => {
    let link: HTMLLinkElement | null = null;
    let script: HTMLScriptElement | null = null;

    const loadSwiper = () => {
      // Check if already loaded
      if (document.querySelector('link[href*="swiper"]') && document.querySelector('script[src*="swiper"]')) {
        setSwiperLoaded(true);
        return;
      }

      // Load Swiper CSS
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/swiper@11/swiper-bundle.min.css';
      link.media = 'print';
      link.onload = () => {
        if (link) link.media = 'all';
      };
      document.head.appendChild(link);

      // Load Swiper JS
      script = document.createElement('script');
      script.src = 'https://unpkg.com/swiper@11/swiper-bundle.min.js';
      script.defer = true;
      script.onload = () => setSwiperLoaded(true);
      document.body.appendChild(script);
    };

    loadSwiper();

    return () => {
      if (link && document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Initialize Swiper when loaded
  useEffect(() => {
    initializeSwiper();
  }, [initializeSwiper]);

  return (
    <>
      {/* Page Header */}
      <PageHeader
        slides={headerSlides}
        benefits={headerBenefits}
        features={headerFeatures}
        ctaText="Read Latest"
        ctaIcon={FaArrowRight}
      />

      <SwiperStyles />

      {/* Blog Section */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="blog">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
            {/* Left Column */}
            <div className="w-full lg:w-2/5 flex flex-col justify-between">
              <div className="text-center lg:text-left">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-bold text-gray-900 leading-[3.25rem] mb-5"
                >
                  Our latest <span className="text-indigo-600">blogs</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-gray-500 mb-10 max-lg:max-w-xl max-lg:mx-auto"
                >
                  Welcome to our blog section, where knowledge meets inspiration. Explore insightful articles, expert tips, and the latest trends in security solutions.
                </motion.p>
                <motion.a 
                  href="#"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ backgroundColor: 'rgb(243, 244, 246)' }}
                  className="inline-block cursor-pointer border border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 lg:mx-0 mx-auto text-center text-gray-900 font-semibold transition-all duration-300"
                >
                  View All
                </motion.a>
              </div>

              {/* Slider Controls */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center lg:justify-start mt-8 lg:mt-0 gap-8 mb-4 lg:ml-12"
              >
                <SliderButton id="slider-button-left" direction="left" />
                <SliderButton id="slider-button-right" direction="right" />
              </motion.div>
            </div>

            {/* Right Column - Swiper */}
            <div className="w-full lg:w-3/5">
              <div className="swiper mySwiper">
                <div className="swiper-wrapper">
                  {displayBlogs.map((blog, index) => (
                    <BlogCard 
                      key={blog.id}
                      blog={blog}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;