'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Av from "../../assets/remaining/Av.jpg";
import Elv from "../../assets/remaining/ev.jpg";
import It from "../../assets/remaining/it.jpg";
import Security from "../../assets/remaining/surv.jpg";
import AvMobile from "../../assets/remaining/Av.jpg";
import ElvMobile from "../../assets/remaining/ev.jpg";
import ItMobile from "../../assets/remaining/it.jpg";
import SecurityMobile from "../../assets/remaining/surv.jpg";

interface Solution {
  id: number;
  title: string;
  category: string;
  description: string;
  image: any;
  mobileImage: any;
  href: string;
}

const SOLUTIONS: Solution[] = [
  {
    id: 1,
    title: "Audio Visual Solutions",
    category: "AV",
    description: "Professional AV systems for modern spaces with high-quality audio and visual integration",
    image: Av,
    mobileImage: AvMobile,
    href: "/Solutions/Audio-visual-solutions"
  },
  {
    id: 2,
    title: "ELV Solutions",
    category: "ELV",
    description: "Extra Low Voltage systems integration for smart building automation and control",
    image: Elv,
    mobileImage: ElvMobile,
    href: '/Solutions/Elv-company'
  },
  {
    id: 3,
    title: "IT & AI Solutions",
    category: "IT/AI",
    description: "Smart technology and AI integration for intelligent systems and automation",
    image: It,
    mobileImage: ItMobile,
    href: '/Solutions/It-ai-solutions', 
  },
  {
    id: 4,
    title: "Surveillance Solutions",
    category: "Security",
    description: "Advanced security and monitoring systems for comprehensive protection",
    image: Security,
    mobileImage: SecurityMobile,
    href: '/Solutions/Surveillance-solutions', 
  }
];

const CATEGORIES = ['All', 'AV', 'ELV', 'IT/AI', 'Security'];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    scale: 0.9
  },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.7, 
      ease: [0.22, 0.61, 0.36, 1] 
    }
  },
  exit: { 
    opacity: 0, 
    y: -40, 
    scale: 0.9,
    transition: { 
      duration: 0.4,
      ease: "easeInOut" 
    }
  }
};

export default function SolutionsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);

  const filteredSolutions = useMemo(() => 
    selectedCategory === 'All' 
      ? SOLUTIONS 
      : SOLUTIONS.filter(solution => solution.category === selectedCategory),
    [selectedCategory]
  );

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleMouseEnter = useCallback((id: number) => {
    setHoveredSolution(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredSolution(null);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }} />
      </div>
      
      {/* Security-themed decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-900/20 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-800/20 rounded-full blur-3xl opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 bg-clip-text text-transparent">
              Our Solutions
            </span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            Explore our comprehensive range of security solutions designed for every environment and requirement.
          </motion.p>
        </div>

        {/* Category Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {CATEGORIES.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                selectedCategory === category
                  ? 'bg-blue-800 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSolutions.map((solution, index) => (
              <Link 
                key={solution.id} 
                href={solution.href}
                className="group block"
              >
                <motion.div
                  className="group"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: [0.22, 0.61, 0.36, 1] 
                  }}
                  exit={{ opacity: 0, y: -40, scale: 0.9, transition: { duration: 0.4 } }}
                  layout
                  whileHover={{ y: -15, scale: 1.03, transition: { duration: 0.3 } }}
                  onMouseEnter={() => handleMouseEnter(solution.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer h-full">
                    {/* Solution Image */}
                    <div className="h-48 sm:h-56 relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        {/* Desktop Image - hidden on mobile */}
                        <div className="hidden md:block w-full h-full relative">
                          <Image
                            src={solution.image}
                            alt={solution.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>

                        {/* Mobile Image - hidden on desktop */}
                        <div className="md:hidden w-full h-full relative">
                          <Image
                            src={solution.mobileImage}
                            alt={solution.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                        </div>
                      </motion.div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm z-10">
                        {solution.category}
                      </div>

                      {/* Hover Icon - Extracted Arrow Animation */}
                      <motion.div
                        className="absolute bottom-5 right-5 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: hoveredSolution === solution.id ? 1 : 0, rotate: 0 }}
                        transition={{ duration: 0.4, ease: "backOut" }}
                      >
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.div>
                    </div>
                    
                    {/* Solution Details */}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">{solution.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{solution.description}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </div>

        <motion.div 
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link href="/solutions">
            <motion.button
              className="bg-white text-blue-900 hover:bg-gray-50 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 inline-flex items-center shadow-lg group border border-blue-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore All Solutions
              <motion.svg 
                className="ml-2 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}